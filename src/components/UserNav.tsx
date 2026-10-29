'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/auth-context';
import { User, LogOut, Package, Leaf, ChevronDown, CheckCircle2, Sparkles, Heart, MapPin } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
  </svg>
);

export function UserNav() {
  const { profile, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!profile) {
    return (
      <Link
        href="/login?next=/cart"
        className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 text-xs font-bold rounded-full bg-white hover:bg-cream-50 border border-forest-800/20 text-forest-950 shadow-2xs hover:shadow-xs transition-all active:scale-95 group"
        title="Sign in with Google - Instant Access"
      >
        <GoogleIcon />
        <span className="font-semibold text-xs text-forest-950">Sign In</span>
        <span className="hidden lg:inline-flex text-[9px] bg-sage-100 text-forest-800 font-medium px-1.5 py-0.2 rounded-full border border-sage-200">
          ₹100 Off
        </span>
      </Link>
    );
  }

  // First name for compact display
  const firstName = profile.fullName.split(' ')[0] || 'Parent';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-cream-100/80 hover:bg-cream-200/80 border border-forest-800/15 text-forest-950 transition-all active:scale-95 text-xs font-semibold group shadow-2xs"
        aria-label="User Account Menu"
      >
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="w-6 h-6 rounded-full object-cover ring-2 ring-sage-400/80 ring-offset-1"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-forest-900 text-cream-50 flex items-center justify-center text-[11px] font-bold ring-2 ring-sage-400/80 ring-offset-1">
            {firstName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="hidden sm:inline max-w-[85px] truncate font-bold text-forest-950">
          {firstName}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-forest-700/60 transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-forest-800/15 py-2.5 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Profile Card */}
          <div className="px-4 py-2 border-b border-forest-800/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-heading font-medium text-sm text-forest-950 truncate block">
                {profile.fullName}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 flex-shrink-0" />
            </div>
            <p className="text-xs text-forest-800/60 truncate">{profile.email}</p>
            <div className="mt-2 inline-flex items-center gap-1 text-[10px] bg-forest-50 border border-forest-200 text-forest-700 px-2 py-0.5 rounded-full font-bold">
              <Leaf className="w-2.5 h-2.5 text-sage-600" />
              Verified Plant Parent 🌱
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-forest-900 hover:bg-cream-100 transition-colors"
            >
              <User className="w-4 h-4 text-forest-700" />
              <span>My Profile &amp; Account</span>
            </Link>
            <Link
              href="/profile?tab=addresses"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-forest-900 hover:bg-cream-100 transition-colors"
            >
              <MapPin className="w-4 h-4 text-sage-600" />
              <span>Saved Delivery Addresses</span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-forest-900 hover:bg-cream-100 transition-colors"
            >
              <Package className="w-4 h-4 text-forest-700" />
              <span>My Cart &amp; Confirmed Orders</span>
            </Link>
            <Link
              href="/plant-care"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-forest-900 hover:bg-cream-100 transition-colors"
            >
              <Leaf className="w-4 h-4 text-sage-600" />
              <span>Plant Care &amp; Watering Schedule</span>
            </Link>
            <Link
              href="/shop"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-forest-900 hover:bg-cream-100 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-terracotta-600" />
              <span>Explore New Plant Arrivals</span>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="border-t border-forest-800/10 pt-1 mt-1">
            <button
              onClick={() => {
                setDropdownOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-terracotta-700 hover:bg-terracotta-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
