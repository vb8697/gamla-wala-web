'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, formatPaise } from '@/types/database';
import { useCart } from '@/features/cart/cart-context';
import {
  Sun,
  Droplet,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingBag,
  Check,
  ChevronRight,
  Sprout,
} from 'lucide-react';

import { PincodeChecker } from '@/components/PincodeChecker';
import { SITE } from '@/config/site';
import { productTypeOf } from '@/config/catalog';
import { resolveProductImageUrl, DEFAULT_PLANT_IMAGE } from '@/lib/images';

export function ProductDetailClient({ product, pairedPots = [] }: { product: Product; pairedPots?: Product[] }) {
  const { addItem } = useCart();
  const variants = product.product_variants || [];
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const activeVariant = variants[selectedVariantIndex] || {
    id: 'default',
    variant_name: 'Standard Pot',
    price_paise: 29900,
    compare_at_price_paise: 39900,
  };

  const primaryImg =
    product.product_images?.find((img) => img.is_primary)?.storage_path ||
    product.product_images?.[0]?.storage_path;
  const [imageSrc, setImageSrc] = useState(resolveProductImageUrl(primaryImg));

  const isPlant = productTypeOf(product.categories?.slug) === 'plants';

  const handleAddToCart = () => {
    addItem(product, activeVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-forest-800/60 mb-6">
        <Link href="/" className="hover:text-forest-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-forest-900">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-forest-950 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-cream-100 border border-forest-800/10 shadow-lg relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={product.name}
              onError={() => setImageSrc(DEFAULT_PLANT_IMAGE)}
              className="w-full h-full object-cover"
            />
            {product.is_featured && (
              <span className="absolute top-4 left-4 bg-forest-900 text-sage-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                ★ Best Seller
              </span>
            )}
          </div>
        </div>

        {/* Right Product Buy Section */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-600 block">
                {product.categories?.name || 'Live Botanicals'}
              </span>
              {product.rating && (
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  ★ {product.rating} <span className="text-forest-800/60 font-normal">({product.review_count || 100}+ reviews)</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-medium font-heading text-forest-950 leading-tight">
              {product.name}
            </h1>
            {product.botanical_name && (
              <p className="text-sm italic text-forest-800/70 mt-1">
                Botanical species: <strong>{product.botanical_name}</strong>
              </p>
            )}
          </div>

          {/* Price Block */}
          <div className="bg-cream-100 p-5 rounded-2xl border border-forest-800/10 flex items-baseline gap-4">
            <span className="text-3xl font-medium font-heading text-forest-950">
              {formatPaise(activeVariant.price_paise)}
            </span>
            {activeVariant.compare_at_price_paise && (
              <span className="text-base text-forest-900/40 line-through">
                {formatPaise(activeVariant.compare_at_price_paise)}
              </span>
            )}
            <span className="text-xs text-sage-600 font-bold ml-auto bg-sage-100 px-2.5 py-1 rounded-md">
              Inclusive of GST
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-forest-900/80 leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-forest-800 block">
                Choose size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {variants.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedVariantIndex === idx
                        ? 'border-forest-900 bg-forest-900 text-cream-50 shadow-md font-semibold'
                        : 'border-forest-800/15 bg-white text-forest-900 hover:border-forest-700'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{v.variant_name}</div>
                    {v.pot_size && (
                      <div className={`text-[10px] mt-0.5 ${selectedVariantIndex === idx ? 'text-sage-200' : 'text-forest-800/60'}`}>
                        Pot: {v.pot_size} {v.height_approx ? `· ${v.height_approx}` : ''}
                      </div>
                    )}
                    <div className={`text-xs mt-1.5 font-bold ${selectedVariantIndex === idx ? 'text-sage-300' : 'text-forest-800'}`}>
                      {formatPaise(v.price_paise)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Delivery PIN Code Checker */}
          <PincodeChecker />

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-forest-800/20 rounded-xl overflow-hidden bg-white h-12">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3.5 hover:bg-cream-100 text-forest-900 font-bold"
              >
                -
              </button>
              <span className="px-3 text-sm font-bold text-forest-950 min-w-[28px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3.5 hover:bg-cream-100 text-forest-900 font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${
                added
                  ? 'bg-sage-500 text-forest-950'
                  : 'bg-forest-900 hover:bg-forest-800 text-cream-50'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-sage-300" /> Add to Cart
                </>
              )}
            </button>
          </div>

          {isPlant && (
            <p className="text-sm text-forest-900/70 bg-cream-100 rounded-2xl px-4 py-3">
              Delivered in a simple nursery pot. Decorative pots are sold separately.
            </p>
          )}

          {isPlant && pairedPots.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-lg text-forest-950">Add a pot (optional)</h3>
              <div className="space-y-2">
                {pairedPots.map((pot) => {
                  const v = pot.product_variants?.[0];
                  if (!v) return null;
                  return (
                    <div key={pot.id} className="flex items-center gap-3 bg-white rounded-2xl border border-forest-900/5 shadow-sm p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveProductImageUrl(pot.product_images?.[0]?.storage_path)}
                        alt={pot.name}
                        className="w-14 h-14 rounded-xl object-cover bg-cream-100"
                      />
                      <Link href={`/products/${pot.slug}`} className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-forest-950 truncate">{pot.name}</span>
                        <span className="text-xs text-forest-900/60">
                          {v.variant_name} · {formatPaise(v.price_paise)}
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => addItem(pot, v, 1)}
                        className="text-xs font-semibold border border-forest-900/25 hover:bg-forest-900 hover:text-cream-50 rounded-full px-4 py-2 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Plant Care Details Card */}
          {isPlant && (
          <div className="bg-white rounded-3xl border border-forest-900/5 shadow-sm p-5 space-y-4">
            <h3 className="font-heading font-bold text-sm text-forest-950 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-forest-700" /> Plant Care Requirements
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Sun className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-forest-950 block">Sunlight</span>
                  <span className="text-forest-800/70">{product.care_instructions?.sunlight || 'Bright indirect'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Droplet className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-forest-950 block">Watering</span>
                  <span className="text-forest-800/70">{product.care_instructions?.watering || 'When topsoil dries'}</span>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Shipping & Guarantee */}
          <div className="grid grid-cols-2 gap-3 text-xs text-forest-800/80 pt-2">
            <div className="flex items-center gap-2 bg-cream-100 p-3 rounded-xl border border-forest-800/10">
              <Truck className="w-4 h-4 text-forest-700" />
              <span>Delivered fresh in {SITE.city} within 24h</span>
            </div>
            <div className="flex items-center gap-2 bg-cream-100 p-3 rounded-xl border border-forest-800/10">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <span>7-day replacement if it arrives unhealthy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
