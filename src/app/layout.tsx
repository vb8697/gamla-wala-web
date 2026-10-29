import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
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
  title: {
    default: `GamlaWala — Plants & Pots Delivered in ${SITE.city}`,
    template: '%s | GamlaWala',
  },
  description: `Buy indoor plants, flowering plants and handmade terracotta gamlas online in ${SITE.city}, ${SITE.state}. Fresh from the nursery, delivered to your door within 24 hours.`,
  keywords: [
    'GamlaWala',
    `plants in ${SITE.city}`,
    `buy plants online ${SITE.city}`,
    `plant nursery ${SITE.city}`,
    `plant delivery ${SITE.city}`,
    'indoor plants',
    'terracotta gamla',
    'money plant',
    'snake plant',
  ],
  openGraph: {
    title: `GamlaWala — Plants & Pots Delivered in ${SITE.city}`,
    description: 'Fresh nursery plants and handmade gamlas at your door. Har Ghar Hariyali.',
    locale: 'en_IN',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-50 font-body">
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
