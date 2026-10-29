'use client';

import React, { useState } from 'react';
import { useAuth } from '@/features/auth/auth-context';
import { User, Phone, Mail, Check, Sparkles, AlertCircle, Camera, ShieldCheck } from 'lucide-react';

const BOTANICAL_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
];

export function EditProfileForm() {
  const { profile, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || BOTANICAL_AVATARS[0]);

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!profile) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Full name cannot be empty');
      return;
    }

    setSaving(true);
    const res = await updateProfile({
      fullName: fullName.trim(),
      phone: phone.trim(),
      avatarUrl,
    });
    setSaving(false);

    if (res.success) {
      setSuccessMessage('✓ Profile information updated successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      setErrorMessage(res.error || 'Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-forest-800/15 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-forest-800/10 gap-3">
        <div>
          <h3 className="text-xl font-heading font-medium text-forest-950">
            Plant Parent Profile
          </h3>
          <p className="text-xs text-forest-900/60 mt-0.5">
            Manage your personal details and contact numbers for plant care delivery updates.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-forest-900 text-xs font-semibold self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-sage-600" />
          <span>Active Plant Parent</span>
        </div>
      </div>

      {successMessage && (
        <div className="p-3.5 bg-sage-50 border border-sage-200 text-sage-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-sage-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-terracotta-50 border border-terracotta-200 text-terracotta-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-terracotta-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Avatar Section */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-forest-900 uppercase tracking-wider block">
          Profile Avatar
        </label>
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-sage-200 shadow-md bg-cream-100"
          />

          <div className="space-y-1.5">
            <span className="text-xs text-forest-900/70 block">Select a plant parent avatar:</span>
            <div className="flex items-center gap-2">
              {BOTANICAL_AVATARS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatarUrl(url)}
                  className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                    avatarUrl === url
                      ? 'border-forest-900 scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-forest-700/50" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-forest-900 block mb-1.5">
            Contact Mobile Number (WhatsApp)
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-forest-700/50" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-800/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 bg-cream-50/50"
            />
          </div>
        </div>
      </div>

      {/* Email (Readonly Google Account) */}
      <div>
        <label className="text-xs font-semibold text-forest-900 block mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-forest-700/40" />
          <input
            type="email"
            readOnly
            disabled
            value={profile.email}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-800/10 text-sm bg-cream-100/60 text-forest-900/60 cursor-not-allowed"
          />
        </div>
        <p className="text-[11px] text-forest-800/60 mt-1 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
          <span>Connected via Google OAuth security</span>
        </p>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-forest-800/10 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2 shadow-sm"
        >
          {saving ? (
            <span>Saving changes...</span>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

