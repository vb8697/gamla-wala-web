'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/auth-context';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { GamlaWalaLogo } from '@/components/brand/GamlaWalaLogo';
import { Leaf, ShieldCheck, Truck, Sparkles, ArrowLeft } from 'lucide-react';

function LoginContent() {
  const { profile, user, isLoading, signInDemoUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/cart';

  useEffect(() => {
    if (!isLoading && (profile || user)) {
      router.replace(next);
    }
  }, [profile, user, isLoading, router, next]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-forest-800/15 shadow-xl text-center relative">
        <Link
          href="/"
          className="absolute top-6 left-6 text-forest-700/60 hover:text-forest-900 transition-colors p-1 rounded-full hover:bg-cream-100"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Brand Header */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-center">
            <GamlaWalaLogo variant="horizontal" size="lg" />
          </div>
          <div>
            <span className="eyebrow block mb-2">
              Har Ghar Hariyali 🌱
            </span>
            <h1 className="text-2xl font-medium font-heading text-forest-950">
              Sign in to GamlaWala
            </h1>
            <p className="text-xs text-forest-900/70 mt-1 max-w-sm mx-auto">
              Sign in with Google to place orders, track deliveries and save your favourite plants.
            </p>
          </div>
        </div>

        {/* Benefits Badges */}
        <div className="bg-cream-50 border border-forest-800/10 rounded-2xl p-4 text-left space-y-2.5 text-xs text-forest-900/80">
          <div className="flex items-center gap-2 text-forest-900 font-semibold">
            <Sparkles className="w-4 h-4 text-sage-600 flex-shrink-0" />
            <span>Fast, one-tap checkout</span>
          </div>
          <div className="flex items-center gap-2 text-forest-900 font-semibold">
            <Truck className="w-4 h-4 text-forest-700 flex-shrink-0" />
            <span>Order updates on WhatsApp</span>
          </div>
          <div className="flex items-center gap-2 text-forest-900 font-semibold">
            <Leaf className="w-4 h-4 text-sage-600 flex-shrink-0" />
            <span>Plant care reminders</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <div className="space-y-3 pt-2">
          <GoogleSignInButton variant="checkout" redirectPath={next} />

          {process.env.NODE_ENV !== 'production' && (
            <>
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-forest-800/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-forest-800/50 font-semibold tracking-wider">
                or Instant Testing
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
              router.replace(next);
            }}
            className="w-full bg-cream-100 hover:bg-cream-200 border border-forest-800/20 text-forest-900 font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Leaf className="w-4 h-4 text-sage-600" />
            <span>1-Click Test Plant Parent Login (Vikash)</span>
          </button>

            </>
          )}

          <p className="text-[11px] text-forest-900/60 pt-1">
            By signing in, you agree to GamlaWala&apos;s Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-forest-800/10 flex items-center justify-center gap-1.5 text-xs text-forest-800/70">
          <ShieldCheck className="w-4 h-4 text-sage-600" />
          <span>Secure Google OAuth Authentication</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-forest-800 border-t-transparent animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
