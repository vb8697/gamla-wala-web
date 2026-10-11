'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Check, Clock, Lock } from 'lucide-react';
import { useCart } from '@/features/cart/cart-context';
import { useAuth } from '@/features/auth/auth-context';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { formatPaise } from '@/types/database';

export function CartDrawer() {
  const { profile } = useAuth();
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    itemCount,
    holdSecondsLeft,
    isHoldingStock,
    acquireHold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    pricing,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [holdingLoading, setHoldingLoading] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD_PAISE = 49900; // ₹499.00
  const progressPercent = Math.min(
    100,
    Math.round((pricing.subtotalPaise / FREE_SHIPPING_THRESHOLD_PAISE) * 100)
  );

  const holdMinutes = Math.floor(holdSecondsLeft / 60);
  const holdSeconds = holdSecondsLeft % 60;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = await applyCoupon(couponInput);
    if (!res.valid) {
      setCouponError(res.error || 'Invalid coupon');
    } else {
      setCouponInput('');
    }
  };

  const handleAcquireHold = async () => {
    setHoldingLoading(true);
    await acquireHold();
    setHoldingLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-forest-800/10 flex items-center justify-between bg-cream-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest-800" />
              <h2 className="font-heading font-bold text-lg text-forest-950">
                Your Botanical Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-forest-700 hover:text-forest-950 rounded-full hover:bg-cream-200"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 15-Minute Botanical Hold Banner */}
          {isHoldingStock ? (
            <div className="bg-amber-50 border-b border-amber-200 text-amber-950 px-5 py-2.5 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>
                  Nursery Stock Locked: <strong>{String(holdMinutes).padStart(2, '0')}:{String(holdSeconds).padStart(2, '0')}</strong>
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full">
                15-Min Live Hold 🌱
              </span>
            </div>
          ) : (
            items.length > 0 && (
              <div className="bg-forest-950 text-cream-100 px-5 py-2 text-xs flex items-center justify-between">
                <span className="text-cream-200/80 text-[11px]">
                  Lock nursery stock for 15 mins
                </span>
                <button
                  onClick={handleAcquireHold}
                  disabled={holdingLoading}
                  className="bg-sage-500 hover:bg-sage-400 text-forest-950 font-bold text-[10px] px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  {holdingLoading ? 'Locking...' : 'Lock Stock'}
                </button>
              </div>
            )
          )}

          {/* Free Shipping Progress Bar */}
          <div className="bg-forest-900 text-cream-50 px-5 py-3 text-xs">
            {pricing.isFreeShipping ? (
              <div className="flex items-center gap-2 text-sage-300 font-medium">
                <Sparkles className="w-4 h-4" />
                <span>You’ve unlocked <strong>FREE Express Delivery</strong> (Orders &gt; ₹499)!</span>
              </div>
            ) : (
              <div>
                <p className="mb-1.5 text-cream-200">
                  Add <strong>{formatPaise(FREE_SHIPPING_THRESHOLD_PAISE - pricing.subtotalPaise)}</strong> more for <strong>FREE Delivery</strong>
                </p>
                <div className="w-full bg-forest-950/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-sage-400 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-forest-800/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-forest-900/60">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mb-4 text-forest-800/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-forest-950 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-forest-800/70 max-w-xs mb-6">
                  Bring home green positivity! Explore our curated indoor air purifiers and handcrafted terracotta pots.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-forest-900 text-cream-50 font-semibold text-xs px-6 py-3 rounded-xl hover:bg-forest-800 transition-colors"
                >
                  Start Plant Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      item.product.product_images?.[0]?.storage_path ||
                      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=200&q=80'
                    }
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-cream-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-sm text-forest-950 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-sage-600 font-medium">
                      {item.variant.variant_name}
                      {item.variant.pot_size ? ` (${item.variant.pot_size})` : ''}
                    </p>
                    <div className="text-xs font-bold text-forest-900 mt-1">
                      {formatPaise(item.variant.price_paise)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-forest-800/20 rounded-lg overflow-hidden bg-cream-50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 hover:bg-cream-200 text-forest-900"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold text-forest-950 min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 hover:bg-cream-200 text-forest-900"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-terracotta-500/70 hover:text-terracotta-700 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-forest-800/10 bg-cream-50 space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between text-xs text-sage-700 bg-sage-50 px-3 py-2 rounded-lg border border-sage-200 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sage-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-terracotta-600 font-bold hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-forest-700/50 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Promo code (HARGHAR100, GREEN10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full text-xs bg-white border border-forest-800/15 rounded-lg pl-8 pr-3 py-2 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800 uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[10px] text-terracotta-600 font-medium">{couponError}</p>
                  )}
                </form>
              )}

              {/* Subtotal, GST, & Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-forest-900/80 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-forest-950">{formatPaise(pricing.subtotalPaise)}</span>
                </div>
                {pricing.discountPaise > 0 && (
                  <div className="flex justify-between text-terracotta-600 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPaise(pricing.discountPaise)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>5% Botanical GST</span>
                  <span>{formatPaise(pricing.taxPaise)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transit-Safe Shipping</span>
                  <span>
                    {pricing.isFreeShipping ? (
                      <strong className="text-sage-600">FREE</strong>
                    ) : (
                      formatPaise(pricing.shippingPaise)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-forest-950 pt-2 border-t border-forest-800/10">
                  <span>Final Total</span>
                  <span className="text-base text-forest-900 font-heading">{formatPaise(pricing.totalPaise)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="w-full bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Express Google Sign-in */}
              {!profile ? (
                <div className="pt-2">
                  <GoogleSignInButton
                    variant="full"
                    redirectPath="/cart"
                    onSuccess={() => setIsOpen(false)}
                  />
                </div>
              ) : (
                <div className="text-center pt-1">
                  <span className="text-[11px] text-forest-700/80 font-medium">
                    Signed in as <strong className="text-forest-900">{profile.fullName}</strong>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
