import React from 'react';
import { Sun, Droplet, Wind, ShieldAlert, Sparkles, Check, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function PlantCarePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-forest-600 block mb-2">
          Horticulture Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-forest-950 mb-3">
          GamlaWala Plant Care Guide 🌱
        </h1>
        <p className="text-xs sm:text-sm text-forest-900/70 leading-relaxed">
          Plants are living companions. With basic awareness of light, soil, and water, anyone can become a thriving plant parent in India.
        </p>
      </div>

      {/* Guide Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl border border-forest-800/10 p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Sun className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-lg text-forest-950">1. Light &amp; Placement</h2>
          <p className="text-xs text-forest-900/70 leading-relaxed">
            Most indoor plants (Snake Plant, Money Plant, Monstera) desire <strong>bright, indirect sunlight</strong>. Keep them within 3-5 feet of an east or north window. Avoid harsh scorching afternoon sun which bleaches leaves.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-forest-800/10 p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Droplet className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-lg text-forest-950">2. The Finger Moisture Test</h2>
          <p className="text-xs text-forest-900/70 leading-relaxed">
            Overwatering is the #1 killer of houseplants. Always insert your index finger 1-2 inches into the soil. If it feels cool and damp, <strong>do not water</strong>. Water only when the top soil layer is completely dry to touch.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-forest-800/10 p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center text-forest-800">
            <Wind className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-lg text-forest-950">3. Indian Weather Adaptation</h2>
          <p className="text-xs text-forest-900/70 leading-relaxed">
            In North Indian dry summers, mist foliage once a week or place pebbles with water below the planter. In Monsoon, decrease watering frequency as ambient humidity stays above 70%.
          </p>
        </div>
      </div>

      {/* Soil Mix Blueprint */}
      <div className="bg-cream-100 rounded-3xl p-8 border border-forest-800/10">
        <h3 className="font-heading font-bold text-xl text-forest-950 mb-3 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-forest-700" /> The GamlaWala Super-Drainage Potting Mix
        </h3>
        <p className="text-xs text-forest-900/80 mb-6 max-w-2xl">
          Every GamlaWala plant is potted in our organic 4-component mixture designed specifically to prevent root rot in plastic and terracotta planters:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-forest-800/10 text-center">
            <span className="text-2xl font-bold font-heading text-forest-800">40%</span>
            <h4 className="text-xs font-semibold text-forest-950 mt-1">Washed Cocopeat</h4>
            <span className="text-[10px] text-forest-900/60">Moisture regulation</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-forest-800/10 text-center">
            <span className="text-2xl font-bold font-heading text-forest-800">30%</span>
            <h4 className="text-xs font-semibold text-forest-950 mt-1">Vermicompost</h4>
            <span className="text-[10px] text-forest-900/60">Slow release nitrogen</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-forest-800/10 text-center">
            <span className="text-2xl font-bold font-heading text-forest-800">20%</span>
            <h4 className="text-xs font-semibold text-forest-950 mt-1">White Perlite</h4>
            <span className="text-[10px] text-forest-900/60">Root aeration</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-forest-800/10 text-center">
            <span className="text-2xl font-bold font-heading text-forest-800">10%</span>
            <h4 className="text-xs font-semibold text-forest-950 mt-1">Neem Khali (Cake)</h4>
            <span className="text-[10px] text-forest-900/60">Anti-fungal shield</span>
          </div>
        </div>
      </div>
    </div>
  );
}
