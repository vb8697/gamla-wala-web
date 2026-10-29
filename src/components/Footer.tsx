import React from 'react';
import Link from 'next/link';
import { Leaf, MapPin, Phone, Clock, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { GamlaWalaLogo, GamlaWalaSeal } from '@/components/brand/GamlaWalaLogo';
import { SITE, whatsappLink } from '@/config/site';

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
              <p className="text-xs text-cream-200/60">Free replacement if it arrives unhealthy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-800 flex items-center justify-center text-sage-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Nursery Fresh Plants</h4>
              <p className="text-xs text-cream-200/60">Handpicked at our nursery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-800 flex items-center justify-center text-sage-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Local Delivery & COD</h4>
              <p className="text-xs text-cream-200/60">Delivering in {SITE.city}, {SITE.state}</p>
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
              GamlaWala brings fresh, nursery-grown plants to homes in {SITE.city}.
              From sacred Tulsi and air-filtering Snake Plants to handcrafted earthen gamlas,
              our mission is: <strong className="text-sage-300">Har Ghar Hariyali</strong>.
            </p>
            <div className="text-xs text-cream-200/60 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sage-400" /> {SITE.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sage-400" />
                <a href={whatsappLink(`Hi ${SITE.name}!`)} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  {SITE.phoneDisplay} (WhatsApp)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-sage-400" /> {SITE.hours}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sage-300 mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/70">
              <li><Link href="/shop?type=plants" className="hover:text-white transition-colors">All Plants</Link></li>
              <li><Link href="/shop?type=plants&category=indoor-plants" className="hover:text-white transition-colors">Indoor Plants</Link></li>
              <li><Link href="/shop?type=plants&category=outdoor-plants" className="hover:text-white transition-colors">Outdoor &amp; Balcony</Link></li>
              <li><Link href="/shop?type=plants&category=succulents" className="hover:text-white transition-colors">Succulents</Link></li>
              <li><Link href="/shop?type=pots" className="hover:text-white transition-colors">Pots &amp; Gamlas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sage-300 mb-4">
              Plant Care & Help
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/70">
              <li><Link href="/plant-care" className="hover:text-white transition-colors">Watering & Sunlight Guide</Link></li>
              <li><Link href="/plant-care" className="hover:text-white transition-colors">Repotting & Soil Mix Tips</Link></li>
              <li><Link href="/plant-care" className="hover:text-white transition-colors">Organic Neem Pest Control</Link></li>
              <li><a href={whatsappLink(`Hi ${SITE.name}, I want to track my order.`)} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Track Your Order (WhatsApp)</a></li>
              <li><Link href="/plant-care" className="hover:text-white transition-colors">7-Day Plant Health Warranty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sage-300 mb-4">
              Delivery Area
            </h4>
            <p className="text-xs text-cream-200/70 mb-3">
              We currently deliver across {SITE.city}. Other cities are coming soon — message us and
              we&apos;ll let you know when we reach yours.
            </p>
            <a
              href={whatsappLink(`Hi ${SITE.name}! Please notify me when you start delivering in my city.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-sage-500 hover:bg-sage-400 text-forest-950 font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
            >
              Notify me for my city
            </a>
            {SITE.gstin && (
              <p className="text-[10px] text-cream-200/50 mt-3">GSTIN: {SITE.gstin}</p>
            )}
          </div>
        </div>

        {/* Copyright & Official Seal */}
        <div className="pt-8 border-t border-forest-900 text-xs text-cream-200/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <GamlaWalaSeal className="w-14 h-14 flex-shrink-0" />
            <div>
              <p className="text-white font-semibold text-xs">GamlaWala · {SITE.city}</p>
              <p>© {new Date().getFullYear()} GamlaWala. All rights reserved.</p>
            </div>
          </div>
          <p className="text-sage-400 font-medium tracking-wider uppercase text-xs">Har Ghar Hariyali 🌱</p>
        </div>
      </div>
    </footer>
  );
}
