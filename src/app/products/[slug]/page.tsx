import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/features/products/get-products';
import { productTypeOf } from '@/config/catalog';
import { ProductDetailClient } from './product-detail-client';
import { SITE } from '@/config/site';

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product Not Found | ${SITE.name}`,
    };
  }

  const primaryVariant = product.product_variants?.[0];
  const price = primaryVariant ? (primaryVariant.price_paise / 100).toFixed(0) : '';
  const priceText = price ? `at ₹${price}` : '';
  const primaryImage = product.product_images?.[0]?.storage_path || '/placeholder-plant.png';
  const botanicalInfo = product.botanical_name ? `(${product.botanical_name})` : '';

  const title = `Buy ${product.name} ${botanicalInfo} Online in ${SITE.city} ${priceText} | ${SITE.name}`;
  const description =
    product.description?.slice(0, 160) ||
    `Order fresh ${product.name} with doorstep delivery in ${SITE.city}, ${SITE.state}. High quality nursery plants, potting mix, and terracotta gamlas from ${SITE.name}.`;

  const productUrl = `${SITE.url.replace(/\/$/, '')}/products/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title,
      description,
      url: productUrl,
      type: 'website',
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [primaryImage],
    },
  };
}

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

  const primaryVariant = product.product_variants?.[0];
  const primaryImage = product.product_images?.[0]?.storage_path;
  const productUrl = `${SITE.url.replace(/\/$/, '')}/products/${product.slug}`;

  // Schema.org Product Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: primaryImage ? [primaryImage] : [],
    description: product.description,
    sku: primaryVariant?.sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: primaryVariant ? (primaryVariant.price_paise / 100).toString() : '0',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE.name,
      },
    },
    ...(product.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.review_count || 1,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} pairedPots={pairedPots} />
    </>
  );
}
