import React from 'react';
import { Leaf } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center mb-4">
        {/* Animated pulsing glow circle */}
        <div className="w-16 h-16 rounded-full bg-forest-800/10 animate-ping absolute" />
        <div className="w-14 h-14 rounded-2xl bg-forest-900 text-cream-50 flex items-center justify-center shadow-md relative z-10">
          <Leaf className="w-7 h-7 text-sage-300 animate-bounce" />
        </div>
      </div>
      <p className="text-sm font-semibold text-forest-900 tracking-wide">
        GamlaWala 🌱
      </p>
      <p className="text-xs text-forest-800/60 mt-1 animate-pulse">
        Nurturing your plants...
      </p>
    </div>
  );
}

