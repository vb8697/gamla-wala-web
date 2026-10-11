import React from 'react';
import Link from 'next/link';
import { Leaf, MapPin, Phone, Mail, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { GamlaWalaLogo, GamlaWalaSeal } from '@/components/brand/GamlaWalaLogo';

export function Footer() {
  return (
    <footer className="bg-forest-950 text-cream-100 pt-16 pb-12 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-forest-800/80 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-800 flex items-center justify-center text-sage-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Transit-Safe Packaging</h4>
              <p className="text-xs text-cream-200/60">Multi-layer protective cardboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-800 flex items-center justify-center text-sage-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">7-Day Healthy Guarantee</h4>
              <p className="text-xs text-cream-200/60">Free replacement for transit shock</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-800 flex items-center justify-center text-sage-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Nursery Fresh Plants</h4>
              <p className="text-xs text-cream-200/60">Handpicked by horticulturists</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-800 flex items-center justify-center text-sage-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">All India Shipping & COD</h4>
              <p className="text-xs text-cream-200/60">Delivering across 19,000+ PIN codes</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <GamlaWalaLogo variant="inverted" size="md" />
            </div>
            <p className="text-xs text-cream-200/70 leading-relaxed mb-4">
              GamlaWala brings lush, nursery-grown botanical living into Indian homes.
              From sacred Tulsi and air-filtering Snake Plants to handcrafted earthen gamlas,
              our mission is: <strong className="text-sage-300">Har Ghar Hariyali</strong>.
            </p>
            <div className="text-xs text-cream-200/60 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sage-400" /> Connaught Place Nursery, New Delhi
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sage-400" /> +91 11 2345 6789
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sage-300 mb-4">
              Plant Collection
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/70">
              <li><Link href="/shop?category=indoor-plants" className="hover:text-white transition-colors">Indoor Air Purifiers</Link></li>
              <li><Link href="/shop?category=outdoor-plants" className="hover:text-white transition-colors">Balcony & Outdoor Greens</Link></li>
              <li><Link href="/shop?category=flowering-plants" className="hover:text-white transition-colors">Flowering Botanicals</Link></li>
              <li><Link href="/shop?category=pots-planters" className="hover:text-white transition-colors">Handmade Terracotta Pots</Link></li>
              <li><Link href="/shop?category=succulents" className="hover:text-white transition-colors">Cacti & Succulents</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sage-300 mb-4">
              Plant Care & Help
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/70">
              <li><Link href="/plant-care" className="hover:text-white transition-colors">Watering & Sunlight Guide</Link></li>
              <li><Link href="/plant-care#repotting" className="hover:text-white transition-colors">Repotting & Soil Mix Tips</Link></li>
              <li><Link href="/plant-care#pests" className="hover:text-white transition-colors">Organic Neem Pest Control</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Track Your Plant Shipment</Link></li>
              <li><Link href="/plant-care" className="hover:text-white transition-colors">7-Day Plant Health Warranty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sage-300 mb-4">
              Green Newsletter
            </h4>
            <p className="text-xs text-cream-200/70 mb-3">
              Subscribe for weekly plant care tips and exclusive ₹100 discount coupons.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-forest-900 border border-forest-800 text-xs rounded-lg px-3 py-2 text-white placeholder:text-cream-200/40 focus:outline-none focus:border-sage-400 flex-1"
              />
              <button className="bg-sage-500 hover:bg-sage-400 text-forest-950 font-semibold text-xs px-3 py-2 rounded-lg transition-colors">
                Join
              </button>
            </div>
            <p className="text-[10px] text-cream-200/50 mt-2">
              GST Registration: 07AAAAA0000A1Z5 · Made with <Heart className="w-2.5 h-2.5 inline text-terracotta-500 fill-terracotta-500" /> for India
            </p>
          </div>
        </div>

        {/* Copyright & Official Seal */}
        <div className="pt-8 border-t border-forest-900 text-xs text-cream-200/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <GamlaWalaSeal className="w-14 h-14 flex-shrink-0" />
            <div>
              <p className="text-white font-semibold text-xs">Official Botanical Nursery Seal</p>
              <p>© {new Date().getFullYear()} GamlaWala Private Limited. All rights reserved.</p>
            </div>
          </div>
          <p className="text-sage-400 font-medium tracking-wider uppercase text-xs">Har Ghar Hariyali 🌱</p>
        </div>
      </div>
    </footer>
  );
}
