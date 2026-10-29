import React from 'react';
import { getProducts } from '@/features/products/get-products';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { SITE } from '@/config/site';
import { CATALOG_GROUPS, productTypeOf, ProductType } from '@/config/catalog';

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string; category?: string; sort?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params?.category;
  const currentType: ProductType | null =
    params?.type === 'plants' || params?.type === 'pots' ? params.type : productTypeOf(currentCategory);
  const searchQuery = params?.q?.trim().toLowerCase();
  const allProducts = await getProducts();

  let filteredProducts = allProducts;
  if (currentType) filteredProducts = filteredProducts.filter((p) => productTypeOf(p.categories?.slug) === currentType);
  if (currentCategory) filteredProducts = filteredProducts.filter((p) => p.categories?.slug === currentCategory);

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) => {
      const name = p.name.toLowerCase();
      const bot = p.botanical_name?.toLowerCase() || '';
      const cat = p.categories?.name.toLowerCase() || '';
      const desc = p.description?.toLowerCase() || '';
      return (
        name.includes(searchQuery) ||
        bot.includes(searchQuery) ||
        cat.includes(searchQuery) ||
        desc.includes(searchQuery)
      );
    });
  }

  if (params?.sort === 'price_asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const pa = a.product_variants?.[0]?.price_paise ?? 0;
      const pb = b.product_variants?.[0]?.price_paise ?? 0;
      return pa - pb;
    });
  } else if (params?.sort === 'price_desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const pa = a.product_variants?.[0]?.price_paise ?? 0;
      const pb = b.product_variants?.[0]?.price_paise ?? 0;
      return pb - pa;
    });
  }

  const subCategories = currentType ? CATALOG_GROUPS[currentType]?.categories || [] : [];

  const sorts = [
    { label: 'Popular', value: '' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];

  const sortHref = (val: string) => {
    const q = new URLSearchParams();
    if (params?.type) q.set('type', params.type);
    if (currentCategory) q.set('category', currentCategory);
    if (params?.q) q.set('q', params.q);
    if (val) q.set('sort', val);
    const qs = q.toString();
    return qs ? `/shop?${qs}` : '/shop';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="mb-8 border-b border-forest-800/10 pb-6">
        <span className="eyebrow block mb-2">
          Shop · Delivered in {SITE.city}
        </span>
        <h1 className="text-3xl font-medium font-heading text-forest-950">
          Plants & Pots
        </h1>
        <p className="text-xs sm:text-sm text-forest-900/70 mt-1 max-w-xl">
          Fresh from our nursery to your door within 24 hours. Free delivery above ₹499.
        </p>
      </div>

      {/* Plants / Pots switch */}
      <div className="flex items-center gap-2 mb-4">
        {[{ label: 'All', href: '/shop', active: !currentType }, ...(Object.keys(CATALOG_GROUPS) as ProductType[]).map((t) => ({
          label: CATALOG_GROUPS[t].label,
          href: `/shop?type=${t}`,
          active: currentType === t,
        }))].map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              t.active ? 'bg-forest-900 text-cream-50' : 'bg-white border border-forest-900/15 text-forest-900 hover:border-forest-700'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Sub-categories */}
      {subCategories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {[{ slug: '', label: 'All' }, ...subCategories].map((c) => {
            const active = (currentCategory || '') === c.slug;
            return (
              <Link
                key={c.slug}
                href={c.slug ? `/shop?type=${currentType}&category=${c.slug}` : `/shop?type=${currentType}`}
                className={`text-sm px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  active ? 'bg-sage-200 text-forest-950 font-semibold' : 'text-forest-900/70 hover:bg-sage-100'
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs text-forest-900/70">
        <span>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          {searchQuery ? <> for &ldquo;{params?.q}&rdquo;</> : null}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="hidden sm:inline">Sort:</span>
          {sorts.map((o) => (
            <Link
              key={o.value}
              href={sortHref(o.value)}
              className={`px-3 py-1.5 rounded-full border transition-colors ${
                (params?.sort || '') === o.value
                  ? 'bg-forest-900 text-cream-50 border-forest-900'
                  : 'bg-white border-forest-800/15 hover:border-forest-600'
              }`}
            >
              {o.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-forest-800/40">
            <Leaf className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-forest-950">
            No plants found
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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
