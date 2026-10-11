'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Leaf, ShieldCheck, Heart, User, Sparkles } from 'lucide-react';
import { useCart } from '@/features/cart/cart-context';
import { GamlaWalaLogo } from '@/components/brand/GamlaWalaLogo';
import { UserNav } from '@/components/UserNav';

export function Header() {
  const { itemCount, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-forest-800/10 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-forest-900 text-cream-50 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-sage-300 animate-pulse" />
        <span>Har Ghar Hariyali 🌱 Free Express Delivery on botanical orders over ₹999 across India</span>
        <span className="hidden md:inline bg-forest-800 px-2 py-0.5 rounded text-[10px] text-sage-200 border border-forest-700">CODE: HARGHAR100</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Wordmark */}
          <Link href="/" className="flex items-center group py-2 hover:opacity-90 transition-opacity">
            <GamlaWalaLogo variant="horizontal" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-forest-800">
            <Link href="/shop" className="hover:text-forest-600 transition-colors">
              All Plants
            </Link>
            <Link href="/shop?category=indoor-plants" className="hover:text-forest-600 transition-colors">
              Indoor Plants
            </Link>
            <Link href="/shop?category=air-purifying" className="hover:text-forest-600 transition-colors">
              Air Purifiers
            </Link>
            <Link href="/shop?category=pots-planters" className="hover:text-forest-600 transition-colors">
              Gamlas & Pots
            </Link>
            <Link href="/plant-care" className="hover:text-forest-600 transition-colors flex items-center gap-1.5 text-sage-600 font-semibold">
              <Leaf className="w-3.5 h-3.5" /> Plant Care Guides
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="Search plants, gamlas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-cream-100 border border-forest-800/10 rounded-full pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest-700/20 focus:bg-white text-forest-950 placeholder:text-forest-900/40"
              />
              <Search className="w-4 h-4 text-forest-700/50 absolute left-3 top-2.5" />
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-cream-100 text-forest-900 transition-colors flex items-center gap-2 group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 group-hover:text-forest-700 transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-terracotta-600 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold text-xs text-forest-800">
                Cart
              </span>
            </button>

            {/* Google Sign In / User Profile Nav */}
            <div className="flex items-center">
              <UserNav />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-forest-900"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50 border-b border-forest-800/10 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-forest-800/10">
            <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Account</span>
            <UserNav />
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search plants, gamlas..."
              className="w-full text-sm bg-white border border-forest-800/15 rounded-xl pl-9 pr-4 py-2.5"
            />
            <Search className="w-4 h-4 text-forest-700/60 absolute left-3 top-3.5" />
          </div>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-forest-900 hover:bg-forest-100 rounded-lg"
          >
            All Botanical Collection
          </Link>
          <Link
            href="/shop?category=indoor-plants"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-forest-800 hover:bg-forest-100 rounded-lg"
          >
            Indoor Plants
          </Link>
          <Link
            href="/shop?category=air-purifying"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-forest-800 hover:bg-forest-100 rounded-lg"
          >
            Air Purifying Greens
          </Link>
          <Link
            href="/plant-care"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-sage-600 hover:bg-forest-100 rounded-lg"
          >
            🌱 Plant Care Guides
          </Link>
        </div>
      )}
    </header>
  );
}
