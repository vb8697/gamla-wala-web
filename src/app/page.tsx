import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/features/products/get-products';
import { ProductCard } from '@/components/ProductCard';
import { Leaf, ShieldCheck, ArrowRight, Sun, Droplet, Sprout, MapPin, Truck, Wallet, PackageCheck } from 'lucide-react';
import { SITE, PRIMARY_AREA } from '@/config/site';
import {
  IndoorPlantsIcon,
  OutdoorPlantsIcon,
  PotsPlantersIcon,
  SeedsGardeningIcon,
} from '@/components/brand/CategoryIcons';

export const revalidate = 30;

export default async function HomePage() {
  const products = await getProducts();
  const featuredPlants = products.filter((p) => p.is_featured);

  const categories = [
    {
      name: 'Indoor Air Purifiers',
      slug: 'indoor-plants',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
      description: 'Shade-tolerant greens for desks & bedrooms',
    },
    {
      name: 'Handmade Gamlas',
      slug: 'pots-planters',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
      description: 'Raw earthen terracotta & ceramic pots',
    },
    {
      name: 'Flowering & Balcony',
      slug: 'outdoor-plants',
      image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
      description: 'Sun-loving blooms, Tulsi & Bougainvillea',
    },
    {
      name: 'Hardy Succulents',
      slug: 'succulents',
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
      description: 'Thrive on minimal water & neglect',
    },
  ];

  return (
    <div className="space-y-20 md:space-y-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-100">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-sage-200/50 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 eyebrow">
                <MapPin className="w-3.5 h-3.5" /> Now delivering in {SITE.city}, {SITE.state}
              </span>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-medium leading-[1.05] text-forest-950">
                Living green,
                <br />
                <em className="font-normal text-forest-700">delivered fresh.</em>
              </h1>
              <p className="text-base sm:text-lg text-forest-900/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Hand-picked indoor plants and handmade terracotta gamlas from our {SITE.city} nursery, at your door within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Link href="/shop" className="btn-primary w-full sm:w-auto group">
                  Shop plants
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 pt-4 text-sm text-forest-900/70">
                <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-forest-700" /> 24h delivery</li>
                <li className="flex items-center gap-2"><Wallet className="w-4 h-4 text-forest-700" /> Cash on delivery</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-forest-700" /> 7-day guarantee</li>
              </ul>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative max-w-md mx-auto lg:max-w-none lg:ml-auto lg:w-[88%]">
                <div className="aspect-[4/5] rounded-t-[999px] rounded-b-3xl overflow-hidden bg-sage-100 shadow-2xl shadow-forest-900/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=85"
                    alt="Lush Monstera Deliciosa in a terracotta gamla"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -left-2 sm:-left-8 bottom-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-forest-900/5">
                  <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-forest-700" />
                  </div>
                  <div>
                    <p className="text-sm font-heading font-medium text-forest-950 leading-tight">Monstera Deliciosa</p>
                    <p className="text-xs text-forest-900/60">Comes in a handmade gamla</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botanical Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="eyebrow block mb-2">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-forest-950">
              Plants &amp; pots, sold separately
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-forest-800 hover:text-forest-600 flex items-center gap-1 group"
          >
            Browse everything <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative rounded-[28px] overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col aspect-[3/4]"
            >
              <div className="relative flex-1 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
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
            <span className="eyebrow block mb-2">
              Popular in {SITE.city}
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-forest-950">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-forest-800 hover:text-forest-600 flex items-center gap-1 group"
          >
            View Complete Catalog <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow block mb-2">Simple &amp; local</span>
          <h2 className="text-3xl sm:text-4xl font-medium font-heading text-forest-950">How ordering works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { icon: Sprout, title: 'Pick your plants', text: 'Browse the shop and add your favourites to the cart.' },
            { icon: PackageCheck, title: 'We pack it fresh', text: 'Each plant is checked and packed carefully at our nursery.' },
            { icon: Truck, title: `Delivered in ${SITE.city}`, text: PRIMARY_AREA.deliveryLabel + '. Free above ₹499.' },
            { icon: Wallet, title: 'Pay your way', text: 'UPI, card or cash on delivery.' },
          ].map((step, i) => (
            <div key={step.title} className="bg-white rounded-3xl border border-forest-900/5 shadow-sm p-7 relative">
              <span className="absolute top-4 right-5 text-3xl font-heading font-medium text-forest-800/10">{i + 1}</span>
              <div className="w-11 h-11 rounded-xl bg-sage-100 text-forest-800 flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-forest-950 mb-1">{step.title}</h3>
              <p className="text-sm text-forest-900/70 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GamlaWala Nursery Assurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-cream-50 rounded-[32px] p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-forest-800/40 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sage-400">
                The GamlaWala Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium font-heading text-white">
                Why {SITE.city} Chooses GamlaWala
              </h2>
              <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
                We are local, so your plant travels hours, not days. No long courier journeys and no transit shock. Every plant is potted in a healthy organic soil mix and delivered by us, and if anything arrives unhealthy within 7 days we replace it.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-sage-400 flex-shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">Acclimatized Plants</h4>
                    <p className="text-xs text-cream-200/60">Chosen for Haryana heat, winters and home lighting</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-sage-400 flex-shrink-0">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">Ready-to-Place</h4>
                    <p className="text-xs text-cream-200/60">Arrives potted, watered and ready to place</p>
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

            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="p-6 rounded-3xl bg-forest-950/60 border border-forest-800/80 backdrop-blur-md shadow-2xl flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-forest-800 flex items-center justify-center text-sage-300">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <span className="text-sm font-semibold text-sage-300">7-Day Plant Guarantee</span>
                <p className="text-xs text-cream-200/60 max-w-[200px]">
                  Message us a photo within 7 days and we&apos;ll replace plants that arrive unhealthy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl sm:text-4xl font-medium font-heading text-forest-950 text-center mb-8">Common questions</h2>
        <div className="space-y-3">
          {[
            { q: `Which areas of ${SITE.city} do you deliver to?`, a: `We deliver across ${SITE.city}. Enter your PIN code on any product page to confirm. ` },
            { q: 'How fast is delivery?', a: `${PRIMARY_AREA.deliveryLabel}. Orders placed before 4 PM are usually delivered the next morning.` },
            { q: 'Can I pay cash on delivery?', a: 'Yes. You can pay by UPI, card or cash when the plant reaches you.' },
            { q: 'What if my plant arrives damaged?', a: 'Send us a photo within 7 days and we will replace it free of charge.' },
            { q: 'I am new to plants. What should I buy?', a: 'Start with a Snake Plant or Money Plant. They are hard to kill and need very little light. ' },
          ].map((item) => (
            <details key={item.q} className="group bg-white rounded-3xl border border-forest-900/5 shadow-sm px-5 py-4 open:shadow-md">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-heading font-semibold text-sm text-forest-950">
                {item.q}
                <span className="text-forest-700 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-forest-900/70 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
