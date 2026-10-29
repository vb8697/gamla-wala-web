'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/features/cart/cart-context';
import { useAuth } from '@/features/auth/auth-context';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { formatPaise, PincodeInfo, UserAddress } from '@/types/database';
import { SITE } from '@/config/site';
import { checkPincodeMatrix, executeOrderTransaction } from '@/lib/api/botanical-api';
import { fetchUserAddresses, saveUserAddress } from '@/features/profile/address-api';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowRight,
  Clock,
  Lock,
  Tag,
  Check,
  MapPin,
  Sparkles,
  AlertCircle,
  Leaf,
  UserCheck,
} from 'lucide-react';

export default function CartAndCheckoutPage() {
  const router = useRouter();
  const { profile, signInDemoUser } = useAuth();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    pricing,
    holdId,
    holdSecondsLeft,
    isHoldingStock,
    acquireHold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [formData, setFormData] = useState({
    recipient_name: '',
    phone: '',
    line1: '',
    line2: '',
    city: SITE.city,
    state: SITE.state,
    postal_code: '',
    customer_note: '',
    paymentMethod: 'cod',
  });

  const [pincodeInfo, setPincodeInfo] = useState<PincodeInfo | null>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<{
    orderNumber: string;
    orderId?: string;
    totalPaise?: number;
    shippingAddress: typeof formData;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [saveAddressToProfile, setSaveAddressToProfile] = useState(false);

  // Auto-acquire hold when entering checkout if not active
  useEffect(() => {
    if (items.length > 0 && !isHoldingStock) {
      acquireHold();
    }
  }, [items.length, isHoldingStock, acquireHold]);

  // Load saved delivery addresses and auto-fill default
  useEffect(() => {
    if (profile) {
      fetchUserAddresses(profile.id, profile.isDemo).then((addrs) => {
        setSavedAddresses(addrs);
        const defaultAddr = addrs.find((a) => a.is_default) || addrs[0];
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
          setFormData((prev) => ({
            ...prev,
            recipient_name: defaultAddr.recipient_name,
            phone: defaultAddr.phone,
            line1: defaultAddr.line1,
            line2: defaultAddr.line2 || '',
            city: defaultAddr.city,
            state: defaultAddr.state,
            postal_code: defaultAddr.postal_code,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            recipient_name: prev.recipient_name || profile.fullName,
            phone: prev.phone || profile.phone || '',
          }));
        }
      });
    }
  }, [profile]);

  const handleSelectAddress = (addr: UserAddress) => {
    setSelectedAddressId(addr.id);
    setFormData((prev) => ({
      ...prev,
      recipient_name: addr.recipient_name,
      phone: addr.phone,
      line1: addr.line1,
      line2: addr.line2 || '',
      city: addr.city,
      state: addr.state,
      postal_code: addr.postal_code,
    }));
  };

  // Check initial PIN code
  useEffect(() => {
    if (formData.postal_code && formData.postal_code.length === 6) {
      setPincodeLoading(true);
      checkPincodeMatrix(formData.postal_code).then((res) => {
        setPincodeLoading(false);
        if (res.serviceable && res.info) {
          setPincodeInfo(res.info);
          setPincodeError(null);
          setFormData((prev) => ({
            ...prev,
            city: res.info?.city || prev.city,
            state: res.info?.state || prev.state,
          }));
        } else {
          setPincodeInfo(null);
          setPincodeError(res.message || 'We do not deliver to this PIN code yet.');
        }
      });
    } else {
      setPincodeInfo(null);
      setPincodeError(null);
    }
  }, [formData.postal_code]);

  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, postal_code: clean }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT VALIDATION: User must be signed in to place an order
    if (!profile) {
      alert('⚠️ Sign-In Required: Please sign in with Google to place your botanical order.');
      router.push('/login?next=/cart');
      return;
    }

    if (!formData.recipient_name || !formData.phone || !formData.line1 || !formData.postal_code) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    if (!pincodeInfo) {
      alert(pincodeError || `Please enter a valid ${SITE.city} PIN code.`);
      return;
    }

    setSubmitting(true);
    const result = await executeOrderTransaction({
      userId: profile?.id,
      shippingAddress: {
        recipient_name: formData.recipient_name,
        phone: formData.phone,
        line1: formData.line1,
        line2: formData.line2,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postal_code,
      },
      customerNote: formData.customer_note,
      couponCode: appliedCoupon?.code,
      items: items.map((it) => ({
        variantId: it.variant.id,
        quantity: it.quantity,
      })),
      holdId,
    });

    setSubmitting(false);

    if (result.success && result.orderNumber) {
      if (saveAddressToProfile && profile) {
        saveUserAddress(
          profile.id,
          {
            recipient_name: formData.recipient_name,
            phone: formData.phone,
            line1: formData.line1,
            line2: formData.line2 || null,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postal_code,
          },
          profile.isDemo
        ).catch((e) => console.warn('Could not save address to profile:', e));
      }

      setOrderResult({
        orderNumber: result.orderNumber,
        orderId: result.orderId,
        totalPaise: result.totalPaise || pricing.totalPaise,
        shippingAddress: { ...formData },
      });
      clearCart();
    } else {
      alert(result.error || 'Failed to place order. Please try again.');
    }
  };

  const holdMinutes = Math.floor(holdSecondsLeft / 60);
  const holdSeconds = holdSecondsLeft % 60;

  // Order Confirmed Screen
  if (orderResult) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center text-forest-700 mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10 text-sage-600" />
        </div>

        <div>
          <span className="eyebrow block mb-2">
            Har Ghar Hariyali 🌱
          </span>
          <h1 className="text-3xl font-medium font-heading text-forest-950">
            Order Placed Successfully!
          </h1>
          <p className="text-base text-forest-900/80 mt-1">
            Order Reference: <strong className="text-forest-900 font-mono text-lg">{orderResult.orderNumber}</strong>
          </p>
        </div>

        {/* Invoice Summary Card */}
        <div className="bg-white rounded-2xl border border-forest-800/15 p-6 text-left shadow-lg space-y-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between border-b border-forest-800/10 pb-3">
            <span className="text-sm font-bold uppercase tracking-wider text-forest-800">
              Botanical Tax Invoice
            </span>
            <span className="text-sm font-bold text-sage-600 bg-sage-50 border border-sage-200 px-2.5 py-0.5 rounded-full">
              Status: Confirmed
            </span>
          </div>

          <div className="text-sm space-y-2 text-forest-900/80">
            <div className="flex justify-between">
              <span>Delivery To:</span>
              <strong className="text-forest-950">{orderResult.shippingAddress.recipient_name}</strong>
            </div>
            <div className="flex justify-between">
              <span>Address:</span>
              <span className="text-right max-w-[220px]">
                {orderResult.shippingAddress.line1}, {orderResult.shippingAddress.city} - {orderResult.shippingAddress.postal_code}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Contact:</span>
              <span>{orderResult.shippingAddress.phone}</span>
            </div>
            <div className="flex justify-between">
              <span>Fulfillment Hub:</span>
              <span className="text-forest-900 font-semibold">{SITE.city} Nursery</span>
            </div>
            <div className="flex justify-between">
              <span>Logistics Partner:</span>
              <span className="text-forest-900 font-semibold">GamlaWala local delivery</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-forest-800/10 font-bold text-sm text-forest-950">
              <span>Total Paid (5% GST Incl.):</span>
              <span className="font-heading">{formatPaise(orderResult.totalPaise || 0)}</span>
            </div>
          </div>
        </div>

        {/* Next Steps Guidance */}
        <div className="bg-cream-100 rounded-2xl p-5 max-w-lg mx-auto text-sm text-forest-800/80 text-left space-y-2 border border-forest-800/10">
          <h4 className="font-bold text-forest-950 flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-forest-700" /> What Happens Next?
          </h4>
          <p>
            1. Our horticulturists handpick your live plants and inspect root health.
          </p>
          <p>
            2. Packed in <strong>transit-safe breathable cardboard guards</strong> with moisture retention.
          </p>
          <p>
            3. You will receive live WhatsApp updates with your tracking link and personalized plant care guide!
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/shop"
            className="bg-forest-900 hover:bg-forest-800 text-cream-50 font-medium px-8 py-3.5 rounded-xl text-sm transition-colors shadow-md"
          >
            Continue shopping
          </Link>
          <Link
            href="/plant-care"
            className="bg-cream-100 hover:bg-cream-200 text-forest-900 font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors border border-forest-800/10"
          >
            View Plant Care Guides
          </Link>
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center text-forest-800/40 mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-medium font-heading text-forest-950 mb-2">
          Your cart is empty
        </h1>
        <p className="text-sm text-forest-900/70 mb-6">
          Bring home fresh plants and handmade terracotta gamlas.
        </p>
        <Link
          href="/shop"
          className="bg-forest-900 hover:bg-forest-800 text-cream-50 font-semibold px-6 py-3 rounded-xl text-sm transition-colors inline-block"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* 15-Minute Botanical Hold Banner */}
      {isHoldingStock && (
        <div className="mb-6 bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-center justify-between text-amber-950 text-sm shadow-sm">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-700 animate-pulse flex-shrink-0" />
            <div>
              <span className="font-bold block">
                We are holding your plants
              </span>
              <span className="text-[11px] text-amber-800/80">
                Complete your order before the timer ends.
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-4 font-mono font-bold text-base text-amber-900 bg-amber-200/60 px-3 py-1 rounded-xl">
            {String(holdMinutes).padStart(2, '0')}:{String(holdSeconds).padStart(2, '0')}
          </div>
        </div>
      )}

      <div className="mb-8">
        <span className="eyebrow block mb-2">Checkout</span>
        <h1 className="text-4xl font-medium font-heading text-forest-950">Your cart</h1>
        <ol className="flex items-center gap-2 mt-4 text-sm text-forest-900/60">
          <li className="font-semibold text-forest-900">1 Review</li><li>›</li>
          <li className="font-semibold text-forest-900">2 Delivery</li><li>›</li>
          <li>3 Payment</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Items & Delivery Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Selected Items */}
          <div className="bg-white rounded-3xl border border-forest-900/5 shadow-sm p-6 space-y-4 shadow-sm">
            <h2 className="font-heading font-bold text-base text-forest-950 border-b border-forest-800/10 pb-3 flex items-center justify-between">
              <span>Items ({items.length})</span>
              <span className="text-sm text-forest-900/50 font-normal">Free delivery above ₹499</span>
            </h2>

            <div className="divide-y divide-forest-800/10">
              {items.map((item) => (
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
                    <h3 className="font-heading font-bold text-sm text-forest-950 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-sage-600 font-medium">
                      {item.variant.variant_name}
                      {item.variant.pot_size ? ` (${item.variant.pot_size})` : ''}
                    </p>
                    <span className="text-sm font-bold text-forest-900 mt-1 block">
                      {formatPaise(item.variant.price_paise)}
                    </span>
                  </div>

                  <div className="flex items-center border border-forest-800/20 rounded-lg overflow-hidden bg-cream-50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-cream-200 text-forest-900"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-sm font-bold text-forest-950">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-cream-200 text-forest-900"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-terracotta-500/70 hover:text-terracotta-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Google Express Sign-in / Plant Parent Status Card */}
          {profile ? (
            <div className="bg-forest-50 border border-forest-200/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-10 h-10 rounded-full border border-forest-300 object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-forest-900 text-cream-50 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-forest-950">
                      {profile.fullName}
                    </span>
                    <span className="text-[10px] bg-sage-100 text-forest-800 font-bold px-2 py-0.5 rounded-full border border-sage-200 inline-flex items-center gap-1">
                      <Leaf className="w-2.5 h-2.5 text-sage-600" /> Signed in
                    </span>
                  </div>
                  <p className="text-sm text-forest-700/80">{profile.email}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-sage-700 bg-white px-3 py-1 rounded-full border border-forest-200 shadow-2xs hidden sm:inline">
                Ready to order
              </span>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-forest-900 via-forest-900 to-forest-950 text-cream-50 rounded-2xl p-5 border border-forest-800 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-sage-300 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-sage-300 animate-pulse" /> Quick checkout
                  </div>
                  <h3 className="font-heading font-medium text-base text-white">
                    Sign in with Google
                  </h3>
                  <p className="text-sm text-cream-200/80 max-w-md">
                    Fills in your details and lets you track this order.
                  </p>
                  {process.env.NODE_ENV !== 'production' && (
                    <button
                      type="button"
                      onClick={() => signInDemoUser()}
                      className="text-[11px] text-sage-300 hover:text-white underline font-medium block pt-1"
                    >
                      Dev only: test login →
                    </button>
                  )}
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <GoogleSignInButton variant="checkout" redirectPath="/cart" />
                </div>
              </div>
            </div>
          )}

          {/* Delivery Address Form */}
          <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-3xl border border-forest-900/5 shadow-sm p-6 space-y-4 shadow-sm">
            <h2 className="font-heading font-bold text-base text-forest-950 border-b border-forest-800/10 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-forest-700" /> Delivery address
              </span>
              {!profile && (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-700" /> Sign In Required to Submit
                </span>
              )}
            </h2>

            {!profile && (
              <div className="p-3 bg-amber-50/80 border border-amber-200 text-amber-950 text-sm rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>You must sign in with Google to place this order and unlock 100% transit-safe delivery.</span>
                </div>
                <Link
                  href="/login?next=/cart"
                  className="font-bold text-sm underline text-amber-900 hover:text-black flex-shrink-0"
                >
                  Sign In Now →
                </Link>
              </div>
            )}

            {/* Saved Addresses Quick Picker */}
            {profile && savedAddresses.length > 0 && (
              <div className="space-y-2 pb-1 border-b border-forest-800/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-forest-900 uppercase tracking-wider">
                    Select a Saved Delivery Address
                  </span>
                  <Link
                    href="/profile?tab=addresses"
                    className="text-forest-800 hover:text-forest-950 font-semibold underline flex items-center gap-1"
                  >
                    <span>Manage</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {savedAddresses.map((addr) => {
                    const selected = selectedAddressId === addr.id;
                    return (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => handleSelectAddress(addr)}
                        className={`text-left p-3 rounded-2xl border transition-all text-xs ${
                          selected
                            ? 'border-forest-900 bg-forest-900/5 ring-1 ring-forest-900'
                            : 'border-forest-800/15 bg-white hover:border-forest-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-forest-950 capitalize">
                            {addr.address_type || 'Address'} · {addr.recipient_name}
                          </span>
                          {addr.is_default && (
                            <span className="text-[10px] bg-sage-200 text-forest-950 px-1.5 py-0.2 rounded font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-forest-900/70 truncate">{addr.line1}</p>
                        <p className="text-forest-900/60 font-mono text-[11px] mt-0.5">
                          {addr.city} · {addr.postal_code}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-forest-900 block mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.recipient_name}
                  onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                  className="w-full text-sm bg-cream-50 border border-forest-800/15 rounded-xl px-3.5 py-2.5 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-forest-900 block mb-1">
                  WhatsApp / Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-sm bg-cream-50 border border-forest-800/15 rounded-xl px-3.5 py-2.5 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-forest-900 block mb-1">
                House No., Apartment, Street Address *
              </label>
              <input
                type="text"
                required
                placeholder="Flat 402, Green Valley Apartments"
                value={formData.line1}
                onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                className="w-full text-sm bg-cream-50 border border-forest-800/15 rounded-xl px-3.5 py-2.5 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-forest-900 block mb-1">
                  6-Digit PIN Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="110001"
                  value={formData.postal_code}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className="w-full text-sm bg-cream-50 border border-forest-800/15 rounded-xl px-3.5 py-2.5 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-forest-900 block mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-sm bg-cream-50 border border-forest-800/15 rounded-xl px-3.5 py-2.5 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-forest-900 block mb-1">
                  State
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full text-sm bg-cream-50 border border-forest-800/15 rounded-xl px-3.5 py-2.5 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                />
              </div>
            </div>

            {pincodeError && (
              <div className="bg-terracotta-50 border border-terracotta-100 rounded-xl p-3 text-sm text-terracotta-700">
                {pincodeError}
              </div>
            )}

            {/* PIN Code Verification Indicator */}
            {pincodeInfo && (
              <div className="bg-sage-50 border border-sage-200 rounded-xl p-3 text-sm text-forest-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-sage-600" />
                  <span>We deliver to {pincodeInfo.city} ({pincodeInfo.pincode})</span>
                </span>
                <span className="text-[11px] font-bold text-sage-700">
                  Within {pincodeInfo.estimated_delivery_hours}h
                </span>
              </div>
            )}

            {profile && (
              <div className="pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs text-forest-900 font-medium">
                  <input
                    type="checkbox"
                    checked={saveAddressToProfile}
                    onChange={(e) => setSaveAddressToProfile(e.target.checked)}
                    className="w-4 h-4 rounded text-forest-900 focus:ring-forest-800 border-forest-800/30"
                  />
                  <span>Save this delivery address to my profile</span>
                </label>
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-forest-900 block mb-1">
                Special Nursery Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Please leave package with security guard"
                value={formData.customer_note}
                onChange={(e) => setFormData({ ...formData, customer_note: e.target.value })}
                className="w-full text-sm bg-cream-50 border border-forest-800/15 rounded-xl px-3.5 py-2 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2">
              <label className="text-sm font-bold uppercase tracking-wider text-forest-800 block mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formData.paymentMethod === 'razorpay'
                      ? 'border-forest-900 bg-forest-900 text-cream-50 font-semibold'
                      : 'border-forest-800/15 bg-white text-forest-900 hover:border-forest-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1" />
                  <div className="text-sm font-bold">Pay online (UPI, card)</div>
                  <div className={`text-[10px] ${formData.paymentMethod === 'razorpay' ? 'text-sage-200' : 'text-forest-700'}`}>
                    Pay now
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-forest-900 bg-forest-900 text-cream-50 font-semibold'
                      : 'border-forest-800/15 bg-white text-forest-900 hover:border-forest-700'
                  }`}
                >
                  <Banknote className="w-4 h-4 mb-1" />
                  <div className="text-sm font-bold">Cash on Delivery (COD)</div>
                  <div className={`text-[10px] ${formData.paymentMethod === 'cod' ? 'text-sage-200' : 'text-forest-700'}`}>
                    Pay when plants arrive
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-forest-900/5 shadow-sm p-6 space-y-4 shadow-sm sticky top-24">
            <h2 className="font-heading font-bold text-base text-forest-950 border-b border-forest-800/10 pb-3">
              Order summary
            </h2>

            {/* Coupon Code Section */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between text-sm text-sage-700 bg-sage-50 px-3 py-2 rounded-xl border border-sage-200 font-medium">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sage-600" />
                  <span>Promo <strong>{appliedCoupon.code}</strong> Applied</span>
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-[11px] text-terracotta-600 font-bold hover:underline"
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
                      placeholder="HARGHAR100, GREEN10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full text-sm bg-cream-50 border border-forest-800/15 rounded-xl pl-8 pr-3 py-2 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-forest-800 hover:bg-forest-900 text-cream-50 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-terracotta-600 font-medium">{couponError}</p>
                )}
              </form>
            )}

            {/* Price Lines */}
            <div className="space-y-2 text-sm text-forest-900/80 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-forest-950">{formatPaise(pricing.subtotalPaise)}</span>
              </div>

              {pricing.discountPaise > 0 && (
                <div className="flex justify-between text-terracotta-600 font-medium">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span>-{formatPaise(pricing.discountPaise)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>GST (included)</span>
                <span>{formatPaise(pricing.taxPaise)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {pricing.isFreeShipping ? (
                    <strong className="text-sage-600">FREE</strong>
                  ) : (
                    formatPaise(pricing.shippingPaise)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-forest-950 pt-3 border-t border-forest-800/10">
                <span>Total Amount</span>
                <span className="font-heading text-lg text-forest-950">{formatPaise(pricing.totalPaise)}</span>
              </div>
            </div>

            {/* Place Order CTA - Conditional on Authentication */}
            {profile ? (
              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="w-full bg-forest-900 hover:bg-forest-800 text-cream-50 font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm disabled:opacity-50"
              >
                {submitting ? (
                  'Processing Order...'
                ) : (
                  <>
                    Place order <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login?next=/cart"
                  className="w-full bg-white hover:bg-cream-50 text-forest-950 border-2 border-forest-900 font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg text-sm group active:scale-[0.99]"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Sign in with Google to Place Order</span>
                  <Lock className="w-4 h-4 text-forest-700 ml-1" />
                </Link>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-[11px] font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>Please sign in to confirm this order.</span>
                </div>
              </div>
            )}

            {/* Assurance Guarantees */}
            <div className="pt-2 border-t border-forest-800/10 space-y-2 text-[11px] text-forest-800/70">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-forest-700" />
                <span>Delivered in 24h within {SITE.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                <span>7-Day healthy plant replacement warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
