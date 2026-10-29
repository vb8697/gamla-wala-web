import { UserAddress } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { SITE, PRIMARY_AREA } from '@/config/site';

const STORAGE_PREFIX = 'gamlawala_saved_addresses_';

function getLocalAddresses(userId: string): UserAddress[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to parse local addresses:', e);
  }

  // Provide an initial realistic Karnal starter address for quick preview
  const initial: UserAddress[] = [
    {
      id: 'addr-default-karnal-01',
      user_id: userId,
      recipient_name: 'Vikash Bhatnagar',
      phone: '+91 98765 43210',
      line1: 'House No. 142, Sector 13 Urban Estate',
      line2: 'Near Community Center',
      city: SITE.city,
      state: SITE.state,
      postal_code: PRIMARY_AREA.pincodes[0] || '132001',
      country_code: 'IN',
      address_type: 'home',
      is_default: true,
      created_at: new Date().toISOString(),
    },
  ];

  try {
    localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify(initial));
  } catch {}

  return initial;
}

function setLocalAddresses(userId: string, addresses: UserAddress[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify(addresses));
  } catch (e) {
    console.warn('Failed to persist local addresses:', e);
  }
}

export async function fetchUserAddresses(userId: string, isDemo = false): Promise<UserAddress[]> {
  if (isDemo || typeof window === 'undefined') {
    return getLocalAddresses(userId);
  }

  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      // Fallback to local storage if table is not yet set up or empty
      const local = getLocalAddresses(userId);
      return local;
    }

    // Cache to local storage
    setLocalAddresses(userId, data as UserAddress[]);
    return data as UserAddress[];
  } catch (e) {
    console.warn('Supabase fetchUserAddresses error, using local fallback:', e);
    return getLocalAddresses(userId);
  }
}

export async function saveUserAddress(
  userId: string,
  input: {
    id?: string;
    recipient_name: string;
    phone: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    address_type?: 'home' | 'work' | 'other';
    is_default?: boolean;
  },
  isDemo = false
): Promise<{ success: boolean; address?: UserAddress; error?: string }> {
  try {
    const addresses = getLocalAddresses(userId);
    const isFirst = addresses.length === 0;
    const shouldBeDefault = input.is_default !== undefined ? input.is_default : isFirst;

    let updatedList: UserAddress[] = [];
    let savedAddress: UserAddress;

    if (input.id) {
      // Editing existing address
      savedAddress = {
        id: input.id,
        user_id: userId,
        recipient_name: input.recipient_name.trim(),
        phone: input.phone.trim(),
        line1: input.line1.trim(),
        line2: input.line2?.trim() || null,
        city: input.city.trim(),
        state: input.state.trim(),
        postal_code: input.postal_code.trim(),
        country_code: 'IN',
        address_type: input.address_type || 'home',
        is_default: shouldBeDefault,
        created_at: new Date().toISOString(),
      };

      updatedList = addresses.map((a) => {
        if (a.id === input.id) {
          return savedAddress;
        }
        return shouldBeDefault ? { ...a, is_default: false } : a;
      });
    } else {
      // Creating new address
      savedAddress = {
        id: `addr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        user_id: userId,
        recipient_name: input.recipient_name.trim(),
        phone: input.phone.trim(),
        line1: input.line1.trim(),
        line2: input.line2?.trim() || null,
        city: input.city.trim(),
        state: input.state.trim(),
        postal_code: input.postal_code.trim(),
        country_code: 'IN',
        address_type: input.address_type || 'home',
        is_default: shouldBeDefault,
        created_at: new Date().toISOString(),
      };

      if (shouldBeDefault) {
        updatedList = [savedAddress, ...addresses.map((a) => ({ ...a, is_default: false }))];
      } else {
        updatedList = [...addresses, savedAddress];
      }
    }

    setLocalAddresses(userId, updatedList);

    // Sync with Supabase if not demo
    if (!isDemo) {
      try {
        const supabase = createClient();
        if (shouldBeDefault) {
          await supabase.from('addresses').update({ is_default: false }).eq('user_id', userId);
        }

        const payload = {
          ...(input.id ? { id: input.id } : {}),
          user_id: userId,
          recipient_name: savedAddress.recipient_name,
          phone: savedAddress.phone,
          line1: savedAddress.line1,
          line2: savedAddress.line2,
          city: savedAddress.city,
          state: savedAddress.state,
          postal_code: savedAddress.postal_code,
          country_code: 'IN',
          is_default: shouldBeDefault,
        };

        await supabase.from('addresses').upsert(payload);
      } catch (e) {
        console.warn('Could not sync address to Supabase:', e);
      }
    }

    return { success: true, address: savedAddress };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to save address' };
  }
}

export async function deleteUserAddress(
  userId: string,
  addressId: string,
  isDemo = false
): Promise<{ success: boolean; error?: string }> {
  try {
    const addresses = getLocalAddresses(userId);
    const toDelete = addresses.find((a) => a.id === addressId);
    let remaining = addresses.filter((a) => a.id !== addressId);

    // If deleted address was default, make the first remaining address default
    if (toDelete?.is_default && remaining.length > 0) {
      remaining[0] = { ...remaining[0], is_default: true };
    }

    setLocalAddresses(userId, remaining);

    if (!isDemo) {
      try {
        const supabase = createClient();
        await supabase.from('addresses').delete().eq('id', addressId).eq('user_id', userId);
        if (toDelete?.is_default && remaining.length > 0) {
          await supabase.from('addresses').update({ is_default: true }).eq('id', remaining[0].id);
        }
      } catch (e) {
        console.warn('Supabase delete error:', e);
      }
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete address' };
  }
}

export async function setUserDefaultAddress(
  userId: string,
  addressId: string,
  isDemo = false
): Promise<{ success: boolean; error?: string }> {
  try {
    const addresses = getLocalAddresses(userId);
    const updated = addresses.map((a) => ({
      ...a,
      is_default: a.id === addressId,
    }));

    setLocalAddresses(userId, updated);

    if (!isDemo) {
      try {
        const supabase = createClient();
        await supabase.from('addresses').update({ is_default: false }).eq('user_id', userId);
        await supabase.from('addresses').update({ is_default: true }).eq('id', addressId).eq('user_id', userId);
      } catch (e) {
        console.warn('Supabase setDefault error:', e);
      }
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to set default address' };
  }
}

