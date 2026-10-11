'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sun, Droplet, Check, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Product, formatPaise } from '@/types/database';
import { useCart } from '@/features/cart/cart-context';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const variants = product.product_variants || [];
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const activeVariant = variants[selectedVariantIndex] || {
    id: 'default',
    variant_name: 'Standard Pot',
    price_paise: 29900,
    compare_at_price_paise: 39900,
  };

  const imageSrc =
    product.product_images?.[0]?.storage_path ||
    'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, activeVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discountPercent =
    activeVariant.compare_at_price_paise &&
    activeVariant.compare_at_price_paise > activeVariant.price_paise
      ? Math.round(
          ((activeVariant.compare_at_price_paise - activeVariant.price_paise) /
            activeVariant.compare_at_price_paise) *
            100
        )
      : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-forest-800/10 hover:border-forest-700/30 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Image Frame */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-cream-100 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_featured && (
            <span className="bg-forest-900/90 backdrop-blur-md text-sage-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              ★ Best Seller
            </span>
          )}
          {discountPercent && (
            <span className="bg-terracotta-600/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm w-fit">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* View Details Quick Arrow */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-forest-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </Link>

      {/* Product Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Chip & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sage-600 block">
              {product.categories?.name || 'Live Botanicals'}
            </span>
            {product.rating && (
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-0.5 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded-md">
                ★ {product.rating} <span className="text-[10px] text-forest-800/60 font-normal">({product.review_count})</span>
              </span>
            )}
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-heading font-bold text-base text-forest-950 group-hover:text-forest-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
            {product.botanical_name && (
              <p className="text-[11px] italic text-forest-800/60 line-clamp-1 -mt-0.5 mb-0.5">
                {product.botanical_name}
              </p>
            )}
          </Link>

          {/* Plant Care Meta Chips */}
          <div className="flex items-center gap-3 my-3 text-[11px] text-forest-800/80">
            {product.care_instructions?.sunlight && (
              <span className="flex items-center gap-1 bg-cream-100 px-2 py-0.5 rounded-md text-forest-900">
                <Sun className="w-3 h-3 text-amber-600" />
                <span className="truncate max-w-[85px]">{product.care_instructions.sunlight}</span>
              </span>
            )}
            {product.care_instructions?.watering && (
              <span className="flex items-center gap-1 bg-cream-100 px-2 py-0.5 rounded-md text-forest-900">
                <Droplet className="w-3 h-3 text-sky-600" />
                <span className="truncate max-w-[85px]">{product.care_instructions.watering}</span>
              </span>
            )}
          </div>

          {/* Variant Selector (if multiple pot sizes) */}
          {variants.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {variants.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`text-[10px] font-medium px-2 py-1 rounded-md border transition-all ${
                    selectedVariantIndex === idx
                      ? 'border-forest-800 bg-forest-900 text-cream-50 font-semibold'
                      : 'border-forest-800/20 bg-cream-50 text-forest-900 hover:border-forest-600'
                  }`}
                >
                  {v.variant_name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-3 border-t border-forest-800/10 flex items-center justify-between mt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold font-heading text-forest-950">
                {formatPaise(activeVariant.price_paise)}
              </span>
              {activeVariant.compare_at_price_paise && (
                <span className="text-xs text-forest-900/40 line-through">
                  {formatPaise(activeVariant.compare_at_price_paise)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-sage-600 font-medium block">
              Inclusive of GST
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm ${
              added
                ? 'bg-sage-500 text-forest-950 scale-95'
                : 'bg-forest-900 hover:bg-forest-800 text-cream-50 hover:shadow-md'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-sage-300" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
