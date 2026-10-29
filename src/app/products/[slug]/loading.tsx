import React from 'react';
import { Leaf } from 'lucide-react';

export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-forest-900/10 rounded" />
        <div className="h-4 w-4 bg-forest-900/10 rounded" />
        <div className="h-4 w-20 bg-forest-900/10 rounded" />
        <div className="h-4 w-4 bg-forest-900/10 rounded" />
        <div className="h-4 w-32 bg-forest-900/15 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Product Image Gallery Skeleton */}
        <div>
          <div className="aspect-square w-full rounded-3xl bg-forest-900/10 border border-forest-800/10 flex items-center justify-center mb-4">
            <Leaf className="w-16 h-16 text-forest-800/20 animate-bounce" />
          </div>
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-xl bg-forest-900/10 border border-forest-800/10"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details Skeleton */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            {/* Category tag */}
            <div className="h-5 w-28 bg-forest-900/15 rounded-full" />

            {/* Title & Botanical name */}
            <div className="h-9 w-4/5 bg-forest-900/20 rounded-xl" />
            <div className="h-4 w-1/2 bg-forest-900/10 rounded" />

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1">
              <div className="h-4 w-24 bg-forest-900/15 rounded" />
              <div className="h-4 w-16 bg-forest-900/10 rounded" />
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-2">
              <div className="h-8 w-28 bg-forest-900/25 rounded-lg" />
              <div className="h-5 w-20 bg-forest-900/15 rounded" />
              <div className="h-5 w-16 bg-forest-900/15 rounded-full" />
            </div>

            {/* Pot / Variant Selector */}
            <div className="pt-4 space-y-2">
              <div className="h-4 w-32 bg-forest-900/15 rounded" />
              <div className="flex flex-wrap gap-2">
                {[120, 150, 140].map((w, i) => (
                  <div
                    key={i}
                    className="h-12 bg-forest-900/10 rounded-xl border border-forest-800/10"
                    style={{ width: `${w}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Care specs skeleton */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="h-16 rounded-2xl bg-forest-900/5 border border-forest-800/10 p-3" />
              <div className="h-16 rounded-2xl bg-forest-900/5 border border-forest-800/10 p-3" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 space-y-3">
            <div className="h-14 w-full bg-forest-900/20 rounded-2xl" />
            <div className="h-12 w-full bg-forest-900/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
