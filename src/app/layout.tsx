import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { RouteProgressBar } from '@/components/RouteProgressBar';
import { SITE } from '@/config/site';
import { CartProvider } from '@/features/cart/cart-context';
import { WishlistProvider } from '@/features/wishlist/wishlist-context';
import { AuthProvider } from '@/features/auth/auth-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins', // keeps the existing font-heading token name
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `GamlaWala 🌱 — Nursery Plants & Gamlas Delivered in ${SITE.city}`,
    template: '%s | GamlaWala',
  },
  description: `Buy indoor plants, air-purifying greens and handmade terracotta gamlas online in ${SITE.city}, ${SITE.state}. Fresh nursery delivery to your doorstep within 24 hours.`,
  keywords: [
    'GamlaWala',
    'Har Ghar Hariyali',
    `plants in ${SITE.city}`,
    `buy plants online ${SITE.city}`,
    `plant nursery ${SITE.city}`,
    `gamla shop ${SITE.city}`,
    `plant delivery ${SITE.city}`,
    'indoor plants',
    'air purifying plants',
    'terracotta gamla',
    'ceramic planter',
    'snake plant',
    'money plant',
  ],
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: `GamlaWala 🌱 — Plants & Pots Delivered in ${SITE.city}`,
    description: 'Fresh nursery plants and handmade gamlas at your door. Har Ghar Hariyali.',
    url: SITE.url,
    siteName: 'GamlaWala',
    locale: 'en_IN',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GardenStore',
    name: SITE.name,
    description: `Fresh nursery plants and handmade terracotta gamlas delivered in ${SITE.city}, ${SITE.state}.`,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-50 font-body">
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
