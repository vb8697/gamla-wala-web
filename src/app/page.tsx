import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/features/products/get-products';
import { ProductCard } from '@/components/ProductCard';
import { Leaf, Sparkles, ShieldCheck, HeartHandshake, ArrowRight, Sun, Droplet, Sprout } from 'lucide-react';
import {
  IndoorPlantsIcon,
  OutdoorPlantsIcon,
  PotsPlantersIcon,
  SeedsGardeningIcon,
} from '@/components/brand/CategoryIcons';
import { GamlaWalaSeal } from '@/components/brand/GamlaWalaLogo';

export default async function HomePage() {
  const products = await getProducts();
  const featuredPlants = products.filter((p) => p.is_featured);

  const categories = [
    {
      name: 'Indoor Air Purifiers',
      slug: 'indoor-plants',
      count: '24+ Varieties',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
      description: 'Shade-tolerant greens for desks & bedrooms',
    },
    {
      name: 'Handmade Gamlas',
      slug: 'pots-planters',
      count: '38+ Designs',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
      description: 'Raw earthen terracotta & ceramic pots',
    },
    {
      name: 'Flowering & Balcony',
      slug: 'outdoor-plants',
      count: '18+ Varieties',
      image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
      description: 'Sun-loving blooms, Tulsi & Bougainvillea',
    },
    {
      name: 'Hardy Succulents',
      slug: 'succulents',
      count: '15+ Varieties',
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
      description: 'Thrive on minimal water & neglect',
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-800 text-cream-50 pt-12 pb-20 md:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#52b788_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-forest-800/80 border border-sage-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sage-300">
                <Sparkles className="w-3.5 h-3.5 text-sage-400" />
                <span>India&apos;s Trusted Botanical Nursery · Har Ghar Hariyali</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
                Bring Living Calm into Every Indian Home.
              </h1>

              <p className="text-base sm:text-lg text-cream-200/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                GamlaWala delivers nursery-grown, oxygen-rich indoor plants and handcrafted earthen planters safely to your doorstep. Free transit protection across 19,000+ PIN codes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto bg-sage-500 hover:bg-sage-400 text-forest-950 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-sm"
                >
                  Explore Plant Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/plant-care"
                  className="w-full sm:w-auto bg-forest-900/60 hover:bg-forest-900 border border-forest-700 text-cream-100 font-semibold px-6 py-4 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Leaf className="w-4 h-4 text-sage-400" /> Plant Care Guide
                </Link>
              </div>

              {/* Quick Nursery Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-forest-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-bold font-heading text-white">100%</div>
                  <div className="text-xs text-cream-200/60">Transit Safe Gurantee</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">50k+</div>
                  <div className="text-xs text-cream-200/60">Green Homes Built</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">4.9★</div>
                  <div className="text-xs text-cream-200/60">Plant Parent Rating</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-forest-700/40 bg-forest-900 aspect-[4/5] max-w-md mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=85"
                  alt="Lush Monstera Deliciosa by GamlaWala"
                  className="w-full h-full object-cover"
                />

                {/* Floating Micro Card 1 */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-forest-950 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-forest-800/10">
                  <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center text-forest-800">
                    <Sprout className="w-5 h-5 text-forest-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight">Monstera Deliciosa</span>
                    <span className="text-[10px] text-sage-600 font-medium">₹899 · Includes Gamla</span>
                  </div>
                </div>

                {/* Floating Micro Card 2 */}
                <div className="absolute bottom-6 right-6 bg-forest-950/90 backdrop-blur-md text-cream-50 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-forest-700/50">
                  <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-sage-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold block">7-Day Healthy Plant Guarantee</span>
                    <span className="text-[10px] text-cream-200/70">Or free replacement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Brand Category Navigation Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-forest-800/10 p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/shop?category=indoor-plants"
            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-cream-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-forest-800/10 flex items-center justify-center text-forest-800 group-hover:bg-forest-800 group-hover:text-cream-50 transition-all shadow-sm">
              <IndoorPlantsIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-forest-950 group-hover:text-forest-700 transition-colors">
                Indoor Plants
              </h4>
              <p className="text-[11px] text-forest-900/60 font-medium">Low light & air purifiers</p>
            </div>
          </Link>

          <Link
            href="/shop?category=outdoor-plants"
            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-cream-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-forest-800/10 flex items-center justify-center text-forest-800 group-hover:bg-forest-800 group-hover:text-cream-50 transition-all shadow-sm">
              <OutdoorPlantsIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-forest-950 group-hover:text-forest-700 transition-colors">
                Outdoor Plants
              </h4>
              <p className="text-[11px] text-forest-900/60 font-medium">Balcony & sunny greens</p>
            </div>
          </Link>

          <Link
            href="/shop?category=pots-planters"
            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-cream-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-terracotta-500/15 flex items-center justify-center text-terracotta-600 group-hover:bg-terracotta-500 group-hover:text-white transition-all shadow-sm">
              <PotsPlantersIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-forest-950 group-hover:text-terracotta-600 transition-colors">
                Pots & Planters
              </h4>
              <p className="text-[11px] text-forest-900/60 font-medium">Handcrafted gamlas</p>
            </div>
          </Link>

          <Link
            href="/shop?category=seeds-gardening"
            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-cream-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-sage-500/20 flex items-center justify-center text-forest-800 group-hover:bg-forest-800 group-hover:text-cream-50 transition-all shadow-sm">
              <SeedsGardeningIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-forest-950 group-hover:text-forest-700 transition-colors">
                Seeds & Gardening
              </h4>
              <p className="text-[11px] text-forest-900/60 font-medium">Organic soil & potting</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Botanical Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600 block mb-1">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
              Find the Perfect Green for Your Space
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-forest-800 hover:text-forest-600 flex items-center gap-1 group"
          >
            Browse All Categories <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-forest-800/10 hover:border-forest-700/30 hover:shadow-xl transition-all duration-300 flex flex-col aspect-[4/5]"
            >
              <div className="relative flex-1 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-forest-950 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {cat.count}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-cream-50">
                  <h3 className="font-heading font-bold text-lg leading-tight mb-1 group-hover:text-sage-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-cream-200/80 line-clamp-1">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Botanical Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600 block mb-1">
              Top Rated by Indian Plant Parents
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
              Nursery Best Sellers 🌱
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-forest-800 hover:text-forest-600 flex items-center gap-1 group"
          >
            View Complete Catalog <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* GamlaWala Nursery Assurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-cream-50 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-forest-800/40 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sage-400">
                The GamlaWala Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                Why 50,000+ Indian Homes Choose GamlaWala
              </h2>
              <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
                Unlike generic couriers, every plant leaves our greenhouse potted in proprietary organic potting soil (cocopeat, neem cake, perlite & vermicompost) in breathable packaging that lets plants breathe while protecting leaves from transit shock.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-sage-400 flex-shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">Acclimatized Plants</h4>
                    <p className="text-xs text-cream-200/60">Grown for Indian weather and apartment lighting</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-sage-400 flex-shrink-0">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">Ready-to-Place</h4>
                    <p className="text-xs text-cream-200/60">Arrives pre-watered in premium pot with drainage</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-cream-50 hover:bg-cream-100 text-forest-950 font-bold px-6 py-3.5 rounded-xl text-xs transition-colors shadow-md"
                >
                  Shop Nursery Plants <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Official Nursery Stamp Badge */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="p-4 rounded-3xl bg-forest-950/60 border border-forest-800/80 backdrop-blur-md shadow-2xl flex flex-col items-center text-center gap-3">
                <GamlaWalaSeal className="w-36 h-36" />
                <span className="text-xs font-semibold text-sage-300">Har Ghar Hariyali Guarantee</span>
                <p className="text-[11px] text-cream-200/60 max-w-[200px]">
                  100% Transit Safe Botanical Nursery Certification
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
