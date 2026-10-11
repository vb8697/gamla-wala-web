import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/features/products/get-products';
import { ProductDetailClient } from './product-detail-client';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
