/**
 * Plants and pots are separate products. Every category slug belongs to exactly one group.
 * Add a new category slug here to place it under Plants or Pots.
 */
export type ProductType = 'plants' | 'pots';

export const CATALOG_GROUPS: Record<
  ProductType,
  { label: string; blurb: string; categories: { slug: string; label: string }[] }
> = {
  plants: {
    label: 'Plants',
    blurb: 'Healthy nursery plants, sold on their own.',
    categories: [
      { slug: 'indoor-plants', label: 'Indoor' },
      { slug: 'air-purifying', label: 'Air Purifying' },
      { slug: 'outdoor-plants', label: 'Outdoor & Balcony' },
      { slug: 'succulents', label: 'Succulents' },
    ],
  },
  pots: {
    label: 'Pots & Gamlas',
    blurb: 'Handmade terracotta and ceramic pots, sold separately.',
    categories: [{ slug: 'pots-planters', label: 'All Pots' }],
  },
};

export function productTypeOf(categorySlug?: string | null): ProductType | null {
  if (!categorySlug) return null;
  for (const [type, g] of Object.entries(CATALOG_GROUPS)) {
    if (g.categories.some((c) => c.slug === categorySlug)) return type as ProductType;
  }
  return null;
}

export const isPot = (categorySlug?: string | null) => productTypeOf(categorySlug) === 'pots';
