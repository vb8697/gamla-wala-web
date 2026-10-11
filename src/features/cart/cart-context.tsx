'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product, ProductVariant, Coupon } from '@/types/database';
import {
  calculateBotanicalPricing,
  PricingBreakdown,
  createBotanicalHold,
  releaseBotanicalHold,
  validateCouponCode,
} from '@/lib/api/botanical-api';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  itemCount: number;

  // 15-Minute Botanical Hold Engine
  holdId: string | null;
  holdExpiresAt: string | null;
  holdSecondsLeft: number;
  isHoldingStock: boolean;
  acquireHold: () => Promise<boolean>;
  releaseHold: () => Promise<void>;

  // Coupon & Pricing Breakdown
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<{ valid: boolean; error?: string }>;
  removeCoupon: () => void;
  pricing: PricingBreakdown;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Hold State
  const [holdId, setHoldId] = useState<string | null>(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState<string | null>(null);
  const [holdSecondsLeft, setHoldSecondsLeft] = useState<number>(0);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gamlawala_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedHold = localStorage.getItem('gamlawala_hold');
      if (savedHold) {
        const parsed = JSON.parse(savedHold);
        if (new Date(parsed.expires_at) > new Date()) {
          setHoldId(parsed.id);
          setHoldExpiresAt(parsed.expires_at);
        } else {
          localStorage.removeItem('gamlawala_hold');
        }
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gamlawala_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  // Hold Countdown Timer
  useEffect(() => {
    if (!holdExpiresAt) {
      setHoldSecondsLeft(0);
      return;
    }

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((new Date(holdExpiresAt).getTime() - Date.now()) / 1000));
      setHoldSecondsLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
        setHoldId(null);
        setHoldExpiresAt(null);
        localStorage.removeItem('gamlawala_hold');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [holdExpiresAt]);

  const subtotalPaise = items.reduce(
    (sum, item) => sum + item.variant.price_paise * item.quantity,
    0
  );

  const pricing = calculateBotanicalPricing(subtotalPaise, appliedCoupon);

  const acquireHold = useCallback(async (): Promise<boolean> => {
    if (items.length === 0) return false;

    const payload = items.map((it) => ({
      variantId: it.variant.id,
      quantity: it.quantity,
    }));

    const result = await createBotanicalHold(payload);
    if (result.success && result.hold) {
      setHoldId(result.hold.id);
      setHoldExpiresAt(result.hold.expires_at);
      localStorage.setItem('gamlawala_hold', JSON.stringify(result.hold));
      return true;
    }
    return false;
  }, [items]);

  const releaseHold = useCallback(async () => {
    if (holdId) {
      await releaseBotanicalHold(holdId);
      setHoldId(null);
      setHoldExpiresAt(null);
      localStorage.removeItem('gamlawala_hold');
    }
  }, [holdId]);

  const addItem = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const selectedVariant = variant || product.product_variants?.[0];
    if (!selectedVariant) return;

    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.variant.id === selectedVariant.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: `${product.id}-${selectedVariant.id}-${Date.now()}`,
          product,
          variant: selectedVariant,
          quantity,
        },
      ];
    });

    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    releaseHold();
    localStorage.removeItem('gamlawala_cart');
  };

  const applyCoupon = async (code: string) => {
    const res = await validateCouponCode(code, subtotalPaise);
    if (res.valid && res.coupon) {
      setAppliedCoupon(res.coupon);
      return { valid: true };
    }
    return { valid: false, error: res.error || 'Invalid coupon' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        itemCount,
        holdId,
        holdExpiresAt,
        holdSecondsLeft,
        isHoldingStock: Boolean(holdId && holdSecondsLeft > 0),
        acquireHold,
        releaseHold,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        pricing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
