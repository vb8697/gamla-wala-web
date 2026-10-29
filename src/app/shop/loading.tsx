import React from 'react';
import { Leaf } from 'lucide-react';

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-forest-900/15" />
          <div className="h-4 w-32 bg-forest-900/15 rounded-full" />
        </div>
        <div className="h-8 w-64 bg-forest-900/20 rounded-lg mb-2" />
        <div className="h-4 w-96 max-w-full bg-forest-900/10 rounded-md" />
      </div>

      {/* Filter Tabs skeleton */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[80, 100, 120, 95].map((w, i) => (
          <div
            key={i}
            className="h-10 bg-forest-900/10 rounded-full"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Subcategory pills skeleton */}
      <div className="flex gap-2 overflow-hidden mb-8">
        {[90, 110, 100, 85, 120].map((w, i) => (
          <div
            key={i}
            className="h-8 bg-forest-900/10 rounded-full shrink-0"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Product Grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden p-3 sm:p-4 flex flex-col justify-between"
          >
            <div>
              {/* Product Image placeholder */}
              <div className="aspect-square w-full rounded-xl bg-forest-900/10 mb-3 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-forest-800/15 animate-bounce" />
              </div>

              {/* Title & category placeholder */}
              <div className="h-3 w-20 bg-forest-900/15 rounded mb-2" />
              <div className="h-5 w-3/4 bg-forest-900/20 rounded mb-2" />
              <div className="h-3 w-1/2 bg-forest-900/10 rounded" />
            </div>

            {/* Price and CTA */}
            <div className="mt-4 pt-3 border-t border-forest-800/10 flex items-center justify-between">
              <div className="h-6 w-16 bg-forest-900/20 rounded" />
              <div className="h-8 w-20 bg-forest-900/15 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
