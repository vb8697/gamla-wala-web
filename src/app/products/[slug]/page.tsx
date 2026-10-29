import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/features/products/get-products';
import { productTypeOf } from '@/config/catalog';
import { ProductDetailClient } from './product-detail-client';

export const revalidate = 30;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allProducts = await getProducts();
  const product =
    allProducts.find((p) => p.slug === slug) ?? (await getProductBySlug(slug));

  if (!product) {
    notFound();
  }

  // Plants and pots are separate products: suggest pots on a plant page.
  const pairedPots =
    productTypeOf(product.categories?.slug) === 'plants'
      ? allProducts
          .filter((p) => productTypeOf(p.categories?.slug) === 'pots')
          .slice(0, 3)
      : [];

  return <ProductDetailClient product={product} pairedPots={pairedPots} />;
}
