import React from 'react';
import Link from 'next/link';
import { GamlaWalaLogo } from '@/components/brand/GamlaWalaLogo';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <GamlaWalaLogo variant="stacked" size="lg" />
        </div>
        <div className="space-y-2">
          <span className="eyebrow">
            404 — Plant Not Found
          </span>
          <h1 className="text-3xl font-medium text-forest-950">
            This Branch Doesn&apos;t Exist
          </h1>
          <p className="text-sm text-forest-900/70">
            The page you are looking for might have been repotted, pruned, or temporarily moved.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-cream-50 font-medium px-6 py-3 rounded-full text-sm transition-colors"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-forest-900/25 hover:bg-forest-900 hover:text-cream-50 text-forest-900 font-medium px-6 py-3 rounded-full text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Shop Plants
          </Link>
        </div>
      </div>
    </div>
  );
}
