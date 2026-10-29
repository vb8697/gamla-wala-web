'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Leaf,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  Copy,
  ChevronRight,
  ChevronDown,
  Phone,
  MapPin,
  Clock,
  Heart,
  Flame,
  ArrowRight,
  Sun,
  Droplets,
  HelpCircle,
} from 'lucide-react';
import { useCart } from '@/features/cart/cart-context';
import { useWishlist } from '@/features/wishlist/wishlist-context';
import { formatPaise, Product } from '@/types/database';
import { GamlaWalaLogo } from '@/components/brand/GamlaWalaLogo';
import { UserNav } from '@/components/UserNav';
import { SITE, PRIMARY_AREA, whatsappLink } from '@/config/site';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, setIsOpen: setCartOpen, pricing } = useCart();
  const { wishlistCount } = useWishlist();

  // Navigation & Drawer States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Promo Coupon State
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Prefetch Catalog Once for Instant Latency-Free Search
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.warn('Product search prefetch error:', err));
  }, []);

  // Global Keyboard Shortcut: Cmd+K or Ctrl+K or / to Focus Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setActiveMegaMenu(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close Popups on Outside Click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Copy Promo Code
  const handleCopyCoupon = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText('HARGHAR100');
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2500);
    }
  };

  // Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Live Filtered Search Results
  const searchResults = searchQuery.trim()
    ? products
        .filter((p) => {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.botanical_name?.toLowerCase().includes(q) ||
            p.categories?.name.toLowerCase().includes(q) ||
            p.tags?.some((t) => t.toLowerCase().includes(q))
          );
        })
        .slice(0, 5)
    : [];

  const trendingTags = [
    'Money Plant',
    'Snake Plant Laurentii',
    'Peace Lily',
    'Monstera Deliciosa',
    'Areca Palm',
    'Terracotta Gamla',
  ];

  // Hover Mega Menu Handlers with Debounce
  const handleMegaMenuEnter = (menuKey: string) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(menuKey);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 180);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-xl border-b border-forest-900/10 transition-all">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BOTANICAL RIBBON (Status, Promo & City Hubs)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-forest-900 text-cream-50 text-[11px] tracking-wide py-2 px-4 border-b border-forest-800/40 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Local delivery indicator */}
          <div className="hidden md:flex items-center gap-2 text-cream-200/90 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-400"></span>
            </span>
            <MapPin className="w-3.5 h-3.5 text-sage-300" />
            <span>Now delivering in {SITE.city}, {SITE.state}</span>
          </div>

          {/* Center: Promo Banner & 1-Click Voucher */}
          <div className="w-full md:w-auto flex items-center justify-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sage-300 animate-pulse flex-shrink-0" />
            <span>
              <strong>Free delivery</strong> in {SITE.city} on orders above ₹499
            </span>
            <span className="hidden sm:inline text-cream-300/50">|</span>
            <span className="hidden sm:inline text-cream-200/90">Use code</span>
            <button
              onClick={handleCopyCoupon}
              className="inline-flex items-center gap-1 bg-forest-800 hover:bg-forest-700 text-sage-200 hover:text-white px-2 py-0.5 rounded-full text-[10px] font-bold border border-forest-600/80 transition-all active:scale-95 shadow-2xs"
              title="Click to copy promo coupon code"
            >
              {copiedCoupon ? (
                <>
                  <Check className="w-2.5 h-2.5 text-sage-300" />
                  <span>COPIED! ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-2.5 h-2.5" />
                  <span>HARGHAR100</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Plant Guarantee & Expert Helpline */}
          <div className="hidden lg:flex items-center gap-4 text-cream-200/90 text-[11px]">
            <Link
              href="/plant-care"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sage-300" />
              <span>7-Day Plant Guarantee</span>
            </Link>
            <a
              href={whatsappLink(`Hi ${SITE.name}! I need help choosing plants.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sage-300 hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-3 h-3" />
              <span>WhatsApp us</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN BRAND & SEARCH COMMAND BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-3 sm:gap-6">
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="flex items-center group py-1 flex-shrink-0 hover:opacity-95 transition-all"
            aria-label="GamlaWala - Har Ghar Hariyali"
          >
            <GamlaWalaLogo variant="horizontal" size="md" />
          </Link>

          {/* Omnisearch Input with Rich Floating Popover */}
          <div className="relative flex-1 max-w-lg hidden md:block" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search botanical plants, terracotta gamlas..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  className="w-full text-xs bg-cream-50/90 hover:bg-cream-100/70 border border-forest-800/20 focus:border-forest-700 focus:bg-white rounded-full pl-9 pr-14 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/10 text-forest-950 placeholder:text-forest-900/50 transition-all shadow-2xs"
                />
                <Search className="w-4 h-4 text-forest-700/60 absolute left-3 top-3 pointer-events-none" />

                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchOpen(false);
                    }}
                    className="absolute right-3 top-2.5 p-0.5 text-forest-800/50 hover:text-forest-950 rounded-full"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden lg:inline-flex items-center gap-0.5 absolute right-3 top-2.5 text-[9px] font-mono text-forest-800/60 bg-white border border-forest-800/15 px-1.5 py-0.5 rounded shadow-2xs pointer-events-none">
                    ⌘K
                  </kbd>
                )}
              </div>
            </form>

            {/* Live Autocomplete Modal */}
            {searchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-forest-900/15 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left overflow-hidden">
                {searchResults.length > 0 ? (
                  <div>
                    <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-600 border-b border-forest-800/10 flex justify-between items-center bg-cream-50/50">
                      <span>Matching Botanical Species</span>
                      <span className="text-forest-500 font-normal">{searchResults.length} results</span>
                    </div>
                    <div className="divide-y divide-forest-800/5">
                      {searchResults.map((product) => {
                        const minPrice =
                          product.product_variants && product.product_variants.length > 0
                            ? Math.min(...product.product_variants.map((v) => v.price_paise))
                            : 29900;
                        return (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-cream-50 transition-colors group"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                product.product_images?.[0]?.storage_path ||
                                'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=100&q=80'
                              }
                              alt={product.name}
                              className="w-11 h-11 rounded-xl object-cover bg-cream-100 flex-shrink-0 border border-forest-800/10 group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-forest-950 truncate group-hover:text-forest-700">
                                {product.name}
                              </h4>
                              <p className="text-[11px] text-forest-600/80 italic truncate font-serif">
                                {product.botanical_name || 'Botanical Species'}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[9px] font-bold bg-sage-100 text-forest-800 px-1.5 py-0.2 rounded-full">
                                  {product.categories?.name || 'Plant'}
                                </span>
                                <span className="text-[10px] text-sage-700 font-semibold">
                                  ★ {product.rating || '4.9'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-xs font-bold text-forest-950 block">
                                {formatPaise(minPrice)}
                              </span>
                              <span className="text-[9px] text-forest-600/70 font-medium">
                                In Stock
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="p-2 border-t border-forest-800/10 bg-cream-50/40 text-center">
                      <Link
                        href={`/shop?q=${encodeURIComponent(searchQuery.trim())}`}
                        onClick={() => setSearchOpen(false)}
                        className="text-xs font-bold text-forest-800 hover:text-forest-950 hover:underline inline-flex items-center gap-1"
                      >
                        <span>View all results for &quot;{searchQuery}&quot;</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-6 text-center text-xs text-forest-900/60">
                    <p>No botanical species found for &quot;{searchQuery}&quot;</p>
                    <Link
                      href="/shop"
                      onClick={() => setSearchOpen(false)}
                      className="text-sage-700 font-bold hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      <span>Explore complete nursery catalog</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 block mb-2">
                      Popular Botanical Searches
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trendingTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSearchQuery(tag);
                            router.push(`/shop?q=${encodeURIComponent(tag)}`);
                            setSearchOpen(false);
                          }}
                          className="text-[11px] bg-cream-50 hover:bg-cream-100 border border-forest-800/10 text-forest-900 px-3 py-1 rounded-full font-medium transition-colors hover:border-forest-700"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Suite */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Delivery city badge (Desktop Compact) */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-semibold text-forest-800 bg-cream-100/80 border border-forest-800/15 px-3 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-sage-600" />
              <span>{SITE.city}</span>
            </div>

            {/* Wishlist Link with Live Counter */}
            <Link
              href="/shop"
              className="hidden lg:flex items-center justify-center relative p-2 rounded-full hover:bg-cream-100 text-forest-900 transition-colors"
              title="Saved Botanical Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-forest-800" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-terracotta-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Google Sign In / User Profile */}
            <UserNav />

            {/* Shopping Cart Pill Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-forest-950 hover:bg-forest-900 text-cream-50 font-bold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group border border-forest-800/30"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-cream-50 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-terracotta-500 text-white font-medium text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-xs">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wide">
                Cart
                {pricing.totalPaise > 0 && (
                  <span className="hidden sm:inline font-mono ml-1 font-bold text-sage-200">
                    · {formatPaise(pricing.totalPaise)}
                  </span>
                )}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-forest-900 rounded-xl hover:bg-cream-100 transition-colors active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTANICAL CATEGORY NAVIGATION BAR (Desktop Explorer Strip)
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:block border-t border-forest-800/10 bg-cream-50/60 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between text-xs font-semibold text-forest-900/90 py-1.5">
            {/* Left Category Links */}
            <div className="flex items-center gap-1 lg:gap-2">
              <Link
                href="/shop"
                className={`px-3 py-1.5 rounded-lg hover:bg-white hover:text-forest-950 transition-all ${
                  pathname === '/shop' ? 'bg-white shadow-2xs text-forest-950 font-bold' : ''
                }`}
              >
                All Plants
              </Link>

              {/* Indoor Plants with Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMegaMenuEnter('indoor')}
                onMouseLeave={handleMegaMenuLeave}
              >
                <Link
                  href="/shop?category=indoor-plants"
                  className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-forest-950 transition-all inline-flex items-center gap-1 group"
                >
                  <span>Indoor Plants</span>
                  <ChevronDown className="w-3 h-3 text-forest-700/60 group-hover:rotate-180 transition-transform duration-200" />
                </Link>

                {/* Indoor Mega Menu Dropdown */}
                {activeMegaMenu === 'indoor' && (
                  <div className="absolute top-full left-0 mt-1.5 w-96 bg-white rounded-2xl shadow-2xl border border-forest-900/15 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600 block mb-1.5">
                          By Light &amp; Space
                        </span>
                        <div className="space-y-1 text-xs">
                          <Link
                            href="/shop?category=indoor-plants&q=low-light"
                            className="block text-forest-900 hover:text-forest-700 hover:translate-x-0.5 transition-transform"
                          >
                            Low Light Heroes
                          </Link>
                          <Link
                            href="/shop?category=indoor-plants&q=desk"
                            className="block text-forest-900 hover:text-forest-700 hover:translate-x-0.5 transition-transform"
                          >
                            Desk &amp; Workstation
                          </Link>
                          <Link
                            href="/shop?category=indoor-plants&q=living-room"
                            className="block text-forest-900 hover:text-forest-700 hover:translate-x-0.5 transition-transform"
                          >
                            Living Room Statements
                          </Link>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600 block mb-1.5">
                          By Lifestyle
                        </span>
                        <div className="space-y-1 text-xs">
                          <Link
                            href="/shop?category=indoor-plants&q=pet-friendly"
                            className="block text-forest-900 hover:text-forest-700 hover:translate-x-0.5 transition-transform"
                          >
                            🐾 Pet-Friendly Plants
                          </Link>
                          <Link
                            href="/shop?category=indoor-plants&q=beginner"
                            className="block text-forest-900 hover:text-forest-700 hover:translate-x-0.5 transition-transform"
                          >
                            🌱 Beginner Friendly
                          </Link>
                          <Link
                            href="/shop?category=indoor-plants&q=bestseller"
                            className="block text-forest-900 hover:text-forest-700 hover:translate-x-0.5 transition-transform"
                          >
                            ⭐ Bestseller Pothos
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* Featured Item Preview */}
                    <Link
                      href="/products/monstera-deliciosa"
                      className="flex items-center gap-3 p-2 bg-cream-50 hover:bg-cream-100 rounded-xl transition-colors border border-forest-800/10 group/feat"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=150&q=80"
                        alt="Monstera Deliciosa"
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-terracotta-600 uppercase tracking-wider block">
                          Featured Plant
                        </span>
                        <h5 className="text-xs font-bold text-forest-950 truncate group-hover/feat:text-forest-700">
                          Monstera Deliciosa
                        </h5>
                        <p className="text-[11px] text-forest-700/80 font-semibold">From ₹899</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Air Purifiers */}
              <Link
                href="/shop?category=air-purifying"
                className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-forest-950 transition-all flex items-center gap-1.5"
              >
                <span>Air Purifiers</span>
                <span className="text-[9px] font-medium bg-sage-100 text-forest-800 px-1.5 py-0.2 rounded-full border border-sage-300">
                  NASA Tested
                </span>
              </Link>

              {/* Handcrafted Pots & Gamlas with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMegaMenuEnter('pots')}
                onMouseLeave={handleMegaMenuLeave}
              >
                <Link
                  href="/shop?category=pots-planters"
                  className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-forest-950 transition-all inline-flex items-center gap-1.5 group"
                >
                  <span>Gamlas &amp; Pots</span>
                  <span className="text-[9px] font-medium bg-terracotta-100 text-terracotta-700 px-1.5 py-0.2 rounded-full border border-terracotta-200">
                    Handmade Clay
                  </span>
                  <ChevronDown className="w-3 h-3 text-forest-700/60 group-hover:rotate-180 transition-transform duration-200" />
                </Link>

                {/* Pots Mega Menu */}
                {activeMegaMenu === 'pots' && (
                  <div className="absolute top-full left-0 mt-1.5 w-80 bg-white rounded-2xl shadow-2xl border border-forest-900/15 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600 block mb-2">
                      Artisan Planters &amp; Materials
                    </span>
                    <div className="space-y-1.5 text-xs mb-3">
                      <Link
                        href="/shop?category=pots-planters&q=terracotta"
                        className="block px-2 py-1.5 rounded-lg hover:bg-cream-50 text-forest-900 hover:text-forest-700"
                      >
                        🏺 Traditional Terracotta Clay (Root Breathing)
                      </Link>
                      <Link
                        href="/shop?category=pots-planters&q=ceramic"
                        className="block px-2 py-1.5 rounded-lg hover:bg-cream-50 text-forest-900 hover:text-forest-700"
                      >
                        🎨 Glazed Artisan Ceramic Planters
                      </Link>
                      <Link
                        href="/shop?category=pots-planters&q=self-watering"
                        className="block px-2 py-1.5 rounded-lg hover:bg-cream-50 text-forest-900 hover:text-forest-700"
                      >
                        💧 Self-Watering Smart Gamlas
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Succulents & Cacti */}
              <Link
                href="/shop?category=succulents"
                className="hidden lg:inline-flex px-3 py-1.5 rounded-lg hover:bg-white hover:text-forest-950 transition-all"
              >
                Succulents &amp; Cacti
              </Link>
            </div>

            {/* Right: Care Guides & Quick WhatsApp Expert */}
            <div className="flex items-center gap-2">
              <Link
                href="/plant-care"
                className="px-3 py-1 rounded-full bg-sage-50 hover:bg-sage-100 border border-sage-300 text-forest-950 font-bold transition-all flex items-center gap-1.5 text-[11px] shadow-2xs hover:shadow-xs"
              >
                <Leaf className="w-3.5 h-3.5 text-sage-600 animate-pulse" />
                <span>Free Care Schedules</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MOBILE SLIDE-OVER NAVIGATION DRAWER
      ───────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-5/6 max-w-sm bg-white h-full shadow-2xl flex flex-col p-4 overflow-y-auto animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-forest-800/10">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <GamlaWalaLogo variant="horizontal" size="sm" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-forest-900 hover:bg-cream-100 rounded-full"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery city bar inside Mobile Drawer */}
            <div className="mt-3 bg-cream-50 rounded-xl p-2.5 border border-forest-800/10 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-forest-950 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sage-600" />
                  <span>{SITE.city}, {SITE.state}</span>
                </span>
                <span className="text-[9px] font-bold bg-sage-100 text-forest-800 px-1.5 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-forest-700/70">{PRIMARY_AREA.deliveryLabel}</p>
            </div>

            {/* Mobile Search Form */}
            <form onSubmit={handleSearchSubmit} className="mt-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plants, gamlas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-cream-50 border border-forest-800/20 rounded-xl pl-9 pr-4 py-2.5 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                />
                <Search className="w-4 h-4 text-forest-700/60 absolute left-3 top-3" />
              </div>
            </form>

            {/* Categories Navigation */}
            <div className="space-y-1 mt-4 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600 px-2 block mb-1">
                Explore Botanical Catalog
              </span>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs font-bold text-forest-950 hover:bg-cream-50 rounded-xl transition-colors"
              >
                <span>🌿 All Nursery Plants</span>
                <ChevronRight className="w-3.5 h-3.5 text-forest-700/40" />
              </Link>
              <Link
                href="/shop?category=indoor-plants"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-forest-900 hover:bg-cream-50 rounded-xl transition-colors"
              >
                <span>🪴 Indoor Plants</span>
                <span className="text-[9px] font-bold text-forest-700 bg-cream-100 px-2 py-0.5 rounded-full">
                  Low Light
                </span>
              </Link>
              <Link
                href="/shop?category=air-purifying"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-forest-900 hover:bg-cream-50 rounded-xl transition-colors"
              >
                <span>✨ Air Purifying Greens</span>
                <span className="text-[9px] font-bold text-sage-800 bg-sage-100 px-2 py-0.5 rounded-full">
                  NASA Rated
                </span>
              </Link>
              <Link
                href="/shop?category=pots-planters"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-forest-900 hover:bg-cream-50 rounded-xl transition-colors"
              >
                <span>🏺 Handcrafted Gamlas &amp; Pots</span>
                <span className="text-[9px] font-bold text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded-full">
                  Terracotta
                </span>
              </Link>
              <Link
                href="/plant-care"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs font-bold text-sage-800 bg-sage-50/80 border border-sage-200/80 rounded-xl mt-2"
              >
                <span className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-sage-600" />
                  <span>Free Plant Care Guides &amp; Doctor</span>
                </span>
                <span className="text-[9px] font-bold bg-sage-200 text-forest-950 px-1.5 py-0.5 rounded-full">
                  Free
                </span>
              </Link>
            </div>

            {/* Guarantees & Hotline */}
            <div className="pt-4 border-t border-forest-800/10 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs text-forest-800/80">
                <ShieldCheck className="w-4 h-4 text-sage-600" />
                <span>7-Day Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-forest-800/80">
                <Truck className="w-4 h-4 text-forest-700" />
                <span>100% Transit Safe Botanical Packing</span>
              </div>
              <a
                href={whatsappLink(`Hi ${SITE.name}! I need help choosing plants.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-forest-900 text-cream-50 text-xs font-bold mt-2 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-sage-300" />
                <span>Chat with Botanical Expert</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
