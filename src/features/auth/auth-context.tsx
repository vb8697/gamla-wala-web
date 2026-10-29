'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export interface PlantParentProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: PlantParentProfile | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  signInWithGoogle: (redirectPath?: string) => Promise<{ success: boolean; error?: string }>;
  signInDemoUser: (details?: { email?: string; name?: string; phone?: string }) => void;
  signOut: () => Promise<void>;
  updateProfile: (updates: { fullName?: string; phone?: string; avatarUrl?: string }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_STORAGE_KEY = 'gamlawala_demo_plant_parent';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PlantParentProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const extractProfile = useCallback((u: User | null): PlantParentProfile | null => {
    if (!u) return null;
    let cached: Partial<PlantParentProfile> = {};
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(`gamlawala_profile_${u.id}`);
        if (item) cached = JSON.parse(item);
      } catch {}
    }
    const meta = u.user_metadata || {};
    return {
      id: u.id,
      email: u.email || 'plantparent@gamlawala.in',
      fullName: cached.fullName || meta.full_name || meta.name || u.email?.split('@')[0] || 'Plant Parent',
      avatarUrl: cached.avatarUrl || meta.avatar_url || meta.picture,
      phone: cached.phone || meta.phone || u.phone,
      isDemo: false,
    };
  }, []);

  // Initialize and listen to Supabase Auth State
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data, error: sessionErr } = await supabase.auth.getSession();
        if (sessionErr) {
          console.warn('Error fetching Supabase auth session:', sessionErr.message);
        }

        if (mounted) {
          if (data?.session?.user) {
            setSession(data.session);
            setUser(data.session.user);
            setProfile(extractProfile(data.session.user));
            // Clear demo storage if real session exists
            if (typeof window !== 'undefined') {
              localStorage.removeItem(DEMO_USER_STORAGE_KEY);
            }
          } else {
            // Check for saved demo session
            if (typeof window !== 'undefined') {
              const savedDemo = localStorage.getItem(DEMO_USER_STORAGE_KEY);
              if (savedDemo) {
                try {
                  const parsed = JSON.parse(savedDemo);
                  setProfile(parsed);
                } catch {
                  localStorage.removeItem(DEMO_USER_STORAGE_KEY);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    // Listen for auth state changes (sign in, sign out, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!mounted) return;
      if (currentSession?.user) {
        setSession(currentSession);
        setUser(currentSession.user);
        setProfile(extractProfile(currentSession.user));
        if (typeof window !== 'undefined') {
          localStorage.removeItem(DEMO_USER_STORAGE_KEY);
        }
      } else {
        setSession(null);
        setUser(null);
        // If not a demo user, clear profile
        if (typeof window !== 'undefined') {
          const savedDemo = localStorage.getItem(DEMO_USER_STORAGE_KEY);
          if (savedDemo) {
            try {
              setProfile(JSON.parse(savedDemo));
            } catch {
              setProfile(null);
            }
          } else {
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [extractProfile, supabase]);

  const signInWithGoogle = async (redirectPath?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(redirectPath || '/cart')}`;

      const { data, error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (oauthErr) {
        console.error('Google OAuth error:', oauthErr);
        setError(oauthErr.message);
        setIsLoading(false);
        return { success: false, error: oauthErr.message };
      }

      // If Supabase returned an OAuth authorize URL, redirect the browser to Google
      if (data?.url) {
        window.location.href = data.url;
        return { success: true };
      }

      return { success: true };
    } catch (err: any) {
      const msg = err?.message || 'Failed to initiate Google sign in';
      setError(msg);
      setIsLoading(false);
      return { success: false, error: msg };
    }
  };

  const signInDemoUser = (details?: { email?: string; name?: string; phone?: string }) => {
    const demoProfile: PlantParentProfile = {
      id: 'demo-plant-parent-01',
      email: details?.email || 'vikash.plantparent@gmail.com',
      fullName: details?.name || 'Vikash (Plant Parent)',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      phone: details?.phone || '+91 98765 43210',
      isDemo: true,
    };

    setProfile(demoProfile);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoProfile));
    }
    setError(null);
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Sign out warning:', e);
    }
    setUser(null);
    setProfile(null);
    setSession(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    }
    setIsLoading(false);
  };

  const updateProfile = async (updates: { fullName?: string; phone?: string; avatarUrl?: string }) => {
    try {
      if (!profile) throw new Error('Not signed in');

      const updated: PlantParentProfile = {
        ...profile,
        ...(updates.fullName !== undefined ? { fullName: updates.fullName.trim() } : {}),
        ...(updates.phone !== undefined ? { phone: updates.phone.trim() } : {}),
        ...(updates.avatarUrl !== undefined ? { avatarUrl: updates.avatarUrl } : {}),
      };

      setProfile(updated);

      if (profile.isDemo) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(updated));
        }
      } else {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`gamlawala_profile_${profile.id}`, JSON.stringify(updated));
        }

        try {
          await supabase.auth.updateUser({
            data: {
              full_name: updated.fullName,
              phone: updated.phone,
              avatar_url: updated.avatarUrl,
            },
          });
        } catch (e) {
          console.warn('Could not update Supabase auth metadata:', e);
        }

        try {
          await supabase.from('profiles').upsert({
            id: profile.id,
            full_name: updated.fullName,
            phone: updated.phone,
            updated_at: new Date().toISOString(),
          });
        } catch (e) {
          console.warn('Could not update Supabase profiles table:', e);
        }
      }

      return { success: true };
    } catch (err: any) {
      const msg = err?.message || 'Failed to update profile';
      return { success: false, error: msg };
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        error,
        clearError,
        signInWithGoogle,
        signInDemoUser,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
