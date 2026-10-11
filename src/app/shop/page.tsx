import React from 'react';
import { getProducts } from '@/features/products/get-products';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { Filter, SlidersHorizontal, Leaf } from 'lucide-react';

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params?.category;
  const allProducts = await getProducts();

  const filteredProducts = currentCategory
    ? allProducts.filter((p) => p.categories?.slug === currentCategory)
    : allProducts;

  const categories = [
    { label: 'All Plants', slug: '' },
    { label: 'Indoor Plants', slug: 'indoor-plants' },
    { label: 'Air Purifying', slug: 'air-purifying' },
    { label: 'Outdoor Plants', slug: 'outdoor-plants' },
    { label: 'Gamlas & Pots', slug: 'pots-planters' },
    { label: 'Succulents', slug: 'succulents' },
    { label: 'Soil & Nutrition', slug: 'seeds-gardening' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="mb-8 border-b border-forest-800/10 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-forest-600 block mb-1">
          Catalog · Har Ghar Hariyali
        </span>
        <h1 className="text-3xl font-extrabold font-heading text-forest-950">
          Nursery Botanical Collection
        </h1>
        <p className="text-xs sm:text-sm text-forest-900/70 mt-1 max-w-xl">
          Hand-nurtured plants and planters, inspected by professional horticulturists before safe door dispatch.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((c) => {
          const isActive = (!currentCategory && !c.slug) || currentCategory === c.slug;
          return (
            <Link
              key={c.slug}
              href={c.slug ? `/shop?category=${c.slug}` : '/shop'}
              className={`text-xs px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-forest-900 text-cream-50 shadow-sm'
                  : 'bg-white border border-forest-800/15 text-forest-800 hover:border-forest-600 hover:bg-cream-100'
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-forest-800/40">
            <Leaf className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-forest-950">
            No plants found in this category
          </h3>
          <p className="text-xs text-forest-900/60 mt-1">
            Check back soon or explore our complete nursery range.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-4 text-xs font-bold text-forest-800 underline"
          >
            View all plants
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
