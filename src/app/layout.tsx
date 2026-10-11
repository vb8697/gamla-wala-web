import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/features/cart/cart-context';
import { AuthProvider } from '@/features/auth/auth-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GamlaWala 🌱 — Har Ghar Hariyali | Premium Plants & Pots in India',
  description:
    'GamlaWala delivers nursery-fresh indoor plants, air-purifiers, and handcrafted terracotta gamlas directly to your doorstep with 100% transit-safe packaging.',
  keywords: [
    'GamlaWala',
    'buy plants online india',
    'indoor plants delhi',
    'terracotta gamla',
    'money plant',
    'snake plant',
    'har ghar hariyali',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-50 font-body">
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
