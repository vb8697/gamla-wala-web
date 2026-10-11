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
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-500">
            404 — Plant Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-forest-950">
            This Branch Doesn&apos;t Exist
          </h1>
          <p className="text-sm text-forest-900/70">
            The page you are looking for might have been repotted, pruned, or temporarily moved.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-900 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-cream-100 hover:bg-cream-200 text-forest-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors border border-forest-800/10"
          >
            <ArrowLeft className="w-4 h-4" /> Shop Plants
          </Link>
        </div>
      </div>
    </div>
  );
}
