'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/features/auth/auth-context';
import { UserAddress } from '@/types/database';
import {
  fetchUserAddresses,
  saveUserAddress,
  deleteUserAddress,
  setUserDefaultAddress,
} from '@/features/profile/address-api';
import { AddressCard } from '@/features/profile/AddressCard';
import { AddressForm } from '@/features/profile/AddressForm';
import { EditProfileForm } from '@/features/profile/EditProfileForm';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { SITE, PRIMARY_AREA } from '@/config/site';
import {
  User,
  MapPin,
  Plus,
  ChevronRight,
  ShieldCheck,
  Package,
  Leaf,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Truck,
  Heart,
} from 'lucide-react';

function ProfileContent() {
  const { profile, signInDemoUser, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'addresses' ? 'addresses' : 'profile';

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses'>(initialTab);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Sync tab with URL search parameter if it changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'addresses') {
      setActiveTab('addresses');
    } else if (tab === 'profile') {
      setActiveTab('profile');
    }
  }, [searchParams]);

  // Load addresses when profile changes
  const loadAddresses = async () => {
    if (!profile) return;
    setLoadingAddresses(true);
    try {
      const list = await fetchUserAddresses(profile.id, profile.isDemo);
      setAddresses(list);
    } catch (err) {
      console.error('Error fetching addresses:', err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (profile) {
      loadAddresses();
    }
  }, [profile]);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (addr: UserAddress) => {
    setEditingAddress(addr);
    setIsFormOpen(true);
  };

  const handleSaveAddress = async (data: any) => {
    if (!profile) return;
    const res = await saveUserAddress(profile.id, data, profile.isDemo);
    if (res.success) {
      setIsFormOpen(false);
      setEditingAddress(null);
      await loadAddresses();
      setActionNotice('✓ Delivery address saved successfully!');
      setTimeout(() => setActionNotice(null), 3500);
    } else {
      throw new Error(res.error || 'Failed to save address');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!profile) return;
    if (!confirm('Are you sure you want to remove this delivery address?')) return;
    const res = await deleteUserAddress(profile.id, id, profile.isDemo);
    if (res.success) {
      await loadAddresses();
      setActionNotice('Address removed.');
      setTimeout(() => setActionNotice(null), 3000);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    if (!profile) return;
    const res = await setUserDefaultAddress(profile.id, id, profile.isDemo);
    if (res.success) {
      await loadAddresses();
      setActionNotice('✓ Default delivery address updated.');
      setTimeout(() => setActionNotice(null), 3000);
    }
  };

  // Not signed in state
  if (!authLoading && !profile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-16 h-16 rounded-3xl bg-cream-200/80 border border-forest-800/10 flex items-center justify-center mx-auto text-forest-800">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="eyebrow block mb-2">Account &amp; Addresses</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-medium text-forest-950">
            Sign In to Manage Your Profile
          </h1>
          <p className="text-sm text-forest-900/70 max-w-md mx-auto">
            Save delivery addresses in {SITE.city}, track botanical nursery orders and receive watering reminders.
          </p>
        </div>

        <div className="max-w-sm mx-auto space-y-4 pt-2">
          <GoogleSignInButton variant="checkout" redirectPath="/profile" />

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-forest-800/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-cream-50 px-2 text-forest-800/50 font-semibold tracking-wider">
                or instant preview
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              signInDemoUser({
                name: 'Vikash (Plant Parent)',
                email: 'vikash.plantparent@gmail.com',
                phone: '+91 98765 43210',
              });
            }}
            className="w-full bg-white hover:bg-cream-100 border border-forest-800/20 text-forest-900 font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-2xs active:scale-[0.99]"
          >
            <Leaf className="w-4 h-4 text-sage-600" />
            <span>1-Click Test Plant Parent Login (Vikash)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-forest-800/60">
        <Link href="/" className="hover:text-forest-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-forest-950 font-medium">My Account</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-forest-950 font-semibold capitalize">{activeTab}</span>
      </nav>

      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl border border-forest-800/15 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {profile?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-sage-200 shadow-md bg-cream-100"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-forest-900 text-cream-50 flex items-center justify-center text-xl sm:text-2xl font-bold ring-4 ring-sage-200 shadow-md">
              {profile?.fullName?.charAt(0).toUpperCase() || 'P'}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-heading font-medium text-forest-950">
                {profile?.fullName}
              </h1>
              {profile?.isDemo && (
                <span className="text-[10px] bg-sage-200 text-forest-900 font-semibold px-2 py-0.5 rounded-full">
                  Demo
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-forest-800/70 font-mono mt-0.5">
              {profile?.email} {profile?.phone ? `· ${profile.phone}` : ''}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-forest-900/80 font-medium">
              <span className="inline-flex items-center gap-1 text-sage-700 bg-sage-50 border border-sage-200 px-2.5 py-0.5 rounded-full">
                <Leaf className="w-3 h-3 text-sage-600" /> Plant Parent Member
              </span>
              <span className="inline-flex items-center gap-1 text-forest-800/80">
                <Truck className="w-3.5 h-3.5 text-forest-700" /> {SITE.city} 24h Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-forest-800/10">
          <Link
            href="/cart"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-forest-800/15 text-xs font-semibold text-forest-900 hover:bg-cream-100 transition-colors"
          >
            <Package className="w-4 h-4 text-forest-700" />
            <span>My Orders &amp; Cart</span>
          </Link>
          <Link
            href="/shop"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 text-cream-50 text-xs font-semibold hover:bg-forest-800 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-sage-300" />
            <span>Shop Plants</span>
          </Link>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="p-4 bg-sage-100 border border-sage-300 text-forest-950 text-xs font-semibold rounded-2xl flex items-center justify-between shadow-2xs animate-in fade-in duration-300">
          <span>{actionNotice}</span>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="text-forest-900/60 hover:text-forest-950 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-forest-800/15 pb-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('profile');
            setIsFormOpen(false);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'profile'
              ? 'bg-forest-900 text-cream-50 shadow-sm'
              : 'text-forest-900/70 hover:bg-cream-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>My Profile &amp; Details</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('addresses');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'addresses'
              ? 'bg-forest-900 text-cream-50 shadow-sm'
              : 'text-forest-900/70 hover:bg-cream-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
            {addresses.length}
          </span>
        </button>
      </div>

      {/* TAB CONTENT: PROFILE EDIT */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <EditProfileForm />
        </div>
      )}

      {/* TAB CONTENT: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading font-medium text-forest-950">
                Delivery Addresses
              </h2>
              <p className="text-xs text-forest-900/70 mt-0.5">
                Saved locations for fast one-tap delivery in {SITE.city}.
              </p>
            </div>

            {!isFormOpen && (
              <button
                type="button"
                onClick={handleOpenAdd}
                className="btn-primary py-2.5 px-5 text-xs flex items-center gap-2 self-start sm:self-auto shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            )}
          </div>

          {/* Add / Edit Form Modal / Accordion */}
          {isFormOpen && (
            <AddressForm
              initialData={editingAddress}
              onSave={handleSaveAddress}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingAddress(null);
              }}
            />
          )}

          {/* Addresses Grid */}
          {loadingAddresses ? (
            <div className="py-16 text-center text-forest-800/60 text-xs">
              <div className="w-6 h-6 rounded-full border-2 border-forest-800 border-t-transparent animate-spin mx-auto mb-2" />
              Loading your delivery addresses...
            </div>
          ) : addresses.length === 0 ? (
            <div className="bg-white rounded-3xl border border-forest-800/10 p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-forest-800/40">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-medium text-lg text-forest-950">
                  No Saved Delivery Addresses
                </h3>
                <p className="text-xs text-forest-900/60 max-w-sm mx-auto">
                  Add your home or office address to enable 24-hour botanical delivery in {SITE.city}.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="btn-primary py-2.5 px-6 text-xs inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Address</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={handleOpenEdit}
                  onDelete={handleDeleteAddress}
                  onSetDefault={handleSetDefaultAddress}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-forest-800 border-t-transparent animate-spin" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}

