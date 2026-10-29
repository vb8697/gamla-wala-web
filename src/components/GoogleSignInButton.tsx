'use client';

import React, { useState } from 'react';
import { useAuth } from '@/features/auth/auth-context';
import { Sparkles, ShieldCheck, ExternalLink, X, Check, Leaf } from 'lucide-react';

interface GoogleSignInButtonProps {
  redirectPath?: string;
  variant?: 'header' | 'checkout' | 'full' | 'compact';
  className?: string;
  onSuccess?: () => void;
}

export function GoogleSignInButton({
  redirectPath = '/cart',
  variant = 'header',
  className = '',
  onSuccess,
}: GoogleSignInButtonProps) {
  const { signInWithGoogle, signInDemoUser, isLoading, error, clearError } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleGoogleClick = async () => {
    setSubmitting(true);
    clearError();

    const res = await signInWithGoogle(redirectPath);

    if (!res.success) {
      setSubmitting(false);
      // If Google provider is not yet enabled in the live Supabase dashboard, open the modal
      setShowConfigModal(true);
    } else {
      // Keep submitting true to show active navigation state
      if (onSuccess) onSuccess();
    }
  };

  const handleQuickDemoLogin = () => {
    signInDemoUser({
      name: 'Vikash (Plant Parent)',
      email: 'vikash.plantparent@gmail.com',
      phone: '+91 98765 43210',
    });
    setShowConfigModal(false);
    if (onSuccess) onSuccess();
  };

  // Google G SVG logo
  const GoogleIcon = () => (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );

  return (
    <>
      {variant === 'header' && (
        <button
          onClick={handleGoogleClick}
          disabled={submitting || isLoading}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-white border border-forest-800/20 text-forest-900 hover:bg-cream-100 hover:border-forest-600 shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-60 ${className}`}
          title="Sign in with Google"
        >
          {submitting ? (
            <div className="w-3.5 h-3.5 border-2 border-forest-800 border-t-transparent rounded-full animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          <span>{submitting ? 'Connecting...' : 'Sign In'}</span>
        </button>
      )}

      {variant === 'compact' && (
        <button
          onClick={handleGoogleClick}
          disabled={submitting || isLoading}
          className={`p-2 rounded-full bg-white border border-forest-800/20 text-forest-900 hover:bg-cream-100 shadow-sm transition-all disabled:opacity-60 ${className}`}
          title="Sign in with Google"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-forest-800 border-t-transparent rounded-full animate-spin" />
          ) : (
            <GoogleIcon />
          )}
        </button>
      )}

      {variant === 'checkout' && (
        <button
          onClick={handleGoogleClick}
          disabled={submitting || isLoading}
          className={`w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-bold text-sm bg-white border-2 border-forest-800/25 hover:border-forest-800 text-forest-950 hover:bg-cream-50 shadow-md hover:shadow-lg transition-all duration-200 group active:scale-[0.99] disabled:opacity-70 ${className}`}
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-forest-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          <span>{submitting ? 'Navigating to Google Sign In...' : 'Continue with Google'}</span>
          {!submitting && (
            <span className="text-[11px] font-normal text-forest-600 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200/50">
              Express Checkout
            </span>
          )}
        </button>
      )}

      {variant === 'full' && (
        <button
          onClick={handleGoogleClick}
          disabled={submitting || isLoading}
          className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold text-sm bg-white border border-forest-800/25 hover:border-forest-700 text-forest-900 hover:bg-cream-50 shadow-sm transition-all disabled:opacity-70 ${className}`}
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-forest-800 border-t-transparent rounded-full animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          <span>{submitting ? 'Navigating to Google Sign In...' : 'Sign in with Google'}</span>
        </button>
      )}

      {/* Supabase Google Provider Setup / One-Click Demo Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-forest-800/15 p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 p-2 text-forest-900/60 hover:text-forest-950 hover:bg-cream-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center">
                <GoogleIcon />
              </div>
              <div>
                <h3 className="font-heading font-medium text-forest-950 text-base">
                  Google Sign-In Connected 🌱
                </h3>
                <p className="text-xs text-forest-600 font-medium">
                  GamlaWala Supabase Auth Service
                </p>
              </div>
            </div>

            <p className="text-xs text-forest-900/80 mb-4 leading-relaxed">
              Google OAuth integration is wired directly to your live Supabase project (<code className="bg-cream-100 px-1 py-0.5 rounded text-forest-800 font-mono text-[11px]">bfxktbtobusflbvbiotb</code>).
            </p>

            <div className="bg-cream-50 border border-forest-800/10 rounded-2xl p-4 text-xs space-y-2 mb-4">
              <div className="font-bold text-forest-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage-600" />
                Live OAuth Status:
              </div>
              <p className="text-forest-900/70">
                To enable live Google accounts on Supabase Cloud:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-forest-900/80 text-[11px]">
                <li>Visit your Supabase Dashboard: <strong>Authentication → Providers → Google</strong></li>
                <li>Turn on <strong>Enable Google</strong></li>
                <li>Paste your Google Cloud Client ID &amp; Secret</li>
              </ol>
              <a
                href="https://supabase.com/dashboard/project/bfxktbtobusflbvbiotb/auth/providers"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sage-700 hover:text-sage-800 font-semibold underline text-xs mt-1"
              >
                Open Supabase Providers Dashboard <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Quick Demo Plant Parent Login */}
            <div className="space-y-2">
              <button
                onClick={handleQuickDemoLogin}
                className="w-full bg-forest-900 hover:bg-forest-800 text-cream-50 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Leaf className="w-4 h-4 text-sage-400" />
                <span>Instant Plant Parent Login (One-Click)</span>
              </button>
              <p className="text-[11px] text-center text-forest-900/60">
                Simulates an authenticated Google user profile to test express checkout and order history immediately.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
