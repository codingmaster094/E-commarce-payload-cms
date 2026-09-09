'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import { useShop } from '@/context/ShopContext'
import { WHY_CHOOSE_US } from '@/lib/seedData'

export default function HomePageClient({ home = null }) {
  const { products: PRODUCTS, categories: CATEGORIES, collections: COLLECTIONS } = useShop()
  const featuredProducts = PRODUCTS.filter((p) => p.featured || p.bestSeller).slice(0, 4)
  const whyItems = home?.whyChoose?.items?.length ? home.whyChoose.items : WHY_CHOOSE_US
  const [activeErgoTab, setActiveErgoTab] = useState(home?.ergo?.tabs?.[0]?.key || 'lumbar')

  const defaultErgo = {
    lumbar: {
      title: 'Dynamic Lumbar Matrix',
      description: 'Automatically adjusts to your lower spine curvature, actively reducing lumbar disk pressure by up to 40%.',
      image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=800&auto=format&fit=crop',
    },
    armrests: {
      title: '4D Fluid Multidirectional Armrests',
      description: 'Adjust height, width, depth, and pivot angle to eliminate shoulder tension and wrist strain during typing.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
    },
    recline: {
      title: '135° Synchro-Tilt Recline',
      description: 'Seamlessly shift between deep focus and relaxed brainstorming with 4 lockable recline angles.',
      image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=800&auto=format&fit=crop',
    },
    mesh: {
      title: 'Italian Elastomeric Breathable Mesh',
      description: 'Engineered for maximum thermal dissipation, keeping you cool and comfortable even through marathon workdays.',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=800&auto=format&fit=crop',
    },
  }

  const ergoDetails = home?.ergo?.tabs?.length
    ? Object.fromEntries(
        home.ergo.tabs.map((tab) => [
          tab.key,
          { title: tab.title, description: tab.description, image: tab.imageUrl },
        ]),
      )
    : defaultErgo
  const activeErgo = ergoDetails[activeErgoTab] || ergoDetails[Object.keys(ergoDetails)[0]]

  return (
    <div className="space-y-24 sm:space-y-36 pb-24 sm:pb-36">
      <section className="relative bg-neutral-950 text-white overflow-hidden py-20 sm:py-28 md:py-36 lg:py-44">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-900/90 to-transparent z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={home?.hero?.imageUrl || "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=2000&auto=format&fit=crop"}
          alt="Luxury Ergonomic Executive Chair"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105"
        />

        <div className="relative z-20 container">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              {home?.hero?.badge || "Next-Generation Seating Technology"}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-outfit tracking-tight leading-tight text-white">
              {home?.hero?.heading || "Sit Better."} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-amber-200">
                {home?.hero?.headingAccent || "Work Better. Live Better."}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-neutral-300 leading-relaxed font-light">
              {home?.hero?.description ||
                "Engineering state-of-the-art ergonomic chairs, luxury executive leather seating, and high-performance task chairs designed for health, endurance, and refined spaces."}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <Link
                href={home?.hero?.primaryCta?.url || "/chairs"}
                className="px-9 py-4.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-neutral-200 transition shadow-2xl text-center min-h-[48px] flex items-center justify-center"
              >
                {home?.hero?.primaryCta?.label || "Explore All Chairs"}
              </Link>
              <Link
                href={home?.hero?.secondaryCta?.url || "/collections"}
                className="px-9 py-4.5 bg-neutral-900/80 backdrop-blur border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-neutral-800 transition text-center min-h-[48px] flex items-center justify-center"
              >
                {home?.hero?.secondaryCta?.label || "View Collections"}
              </Link>
            </div>

            <div className="pt-8 sm:pt-10 md:pt-12 grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 border-t border-neutral-800 text-xs">
              {(home?.hero?.metrics?.length
                ? home.hero.metrics
                : [
                    { value: "10-Year", label: "Frame Warranty" },
                    { value: "30-Day", label: "Risk-Free Trial" },
                    { value: "Free", label: "Express Delivery" },
                  ]
              ).map((metric) => (
                <div key={metric.label}>
                  <span className="block text-lg sm:text-xl md:text-2xl font-bold font-outfit text-white">{metric.value}</span>
                  <span className="text-neutral-400 text-xs sm:text-sm">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-outfit">
              {home?.categoriesSection?.eyebrow || "Curated Selection"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-neutral-900 tracking-tight">
              {home?.categoriesSection?.heading || "Browse by Chair Category"}
            </h2>
          </div>
          <Link href={home?.categoriesSection?.linkUrl || "/categories"} className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-700 transition">
            {home?.categoriesSection?.linkLabel || "View All Categories →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {cat.productCount} Products Available
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-outfit group-hover:text-amber-200 transition-colors">{cat.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-outfit">
              {home?.productsSection?.eyebrow || "Flagship Seating"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-neutral-900 tracking-tight">
              {home?.productsSection?.heading || "Best-Selling Chairs"}
            </h2>
          </div>
          <Link href={home?.productsSection?.linkUrl || "/chairs"} className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-700 transition">
            {home?.productsSection?.linkLabel || "Explore All Chairs →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-neutral-900 text-white py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="container space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">
              {home?.whyChoose?.eyebrow || "The MEANOVA Standard"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-outfit tracking-tight">
              {home?.whyChoose?.heading || "Engineered Without Compromise"}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              {home?.whyChoose?.description ||
                "Every MEANOVA chair represents hundreds of hours of ergonomic refinement, structural testing, and luxury material selection."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {whyItems.map((item, idx) => (
              <div key={item.title || idx} className="bg-neutral-850 p-8 rounded-3xl border border-neutral-800 space-y-4 hover:border-neutral-700 transition shadow-xl">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 font-bold text-xl font-outfit">
                  0{idx + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-outfit text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-outfit">
            {home?.ergo?.eyebrow || "Precision Engineering"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-neutral-900 tracking-tight">
            {home?.ergo?.heading || "The Anatomy of Perfect Sitting"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            {home?.ergo?.description || "Click below to explore how our chairs protect your spine and maintain optimal energy levels."}
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-5 sm:p-8 md:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center shadow-sm">
          <div className="lg:col-span-4 space-y-3">
            {Object.keys(ergoDetails).map((key) => (
              <button
                key={key}
                onClick={() => setActiveErgoTab(key)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 min-h-[48px] ${
                  activeErgoTab === key
                    ? 'bg-neutral-900 text-white shadow-xl sm:translate-x-2'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                }`}
              >
                {ergoDetails[key].title}
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-center bg-white p-5 sm:p-6 md:p-8 rounded-3xl shadow-md border border-neutral-100">
            <div className="h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeErgo?.image}
                alt={activeErgo?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Featured Technology</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-neutral-900">{activeErgo?.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{activeErgo?.description}</p>
              <Link
                href={home?.ergo?.ctaUrl || "/chairs"}
                className="inline-block px-6 py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition shadow-md"
              >
                {home?.ergo?.ctaLabel || "Find Chairs with This Feature"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-outfit">
            {home?.collectionsSection?.eyebrow || "Signature Lines"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-neutral-900 tracking-tight">
            {home?.collectionsSection?.heading || "Curated Design Collections"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {COLLECTIONS.slice(0, 2).map((col) => (
            <div key={col.id} className="group relative h-72 sm:h-96 md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={col.image}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">{col.tagline}</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold font-outfit">{col.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed">{col.description}</p>
                <Link
                  href={`/collections/${col.slug}`}
                  className="inline-block mt-4 px-7 py-3.5 bg-white text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-2xl hover:bg-neutral-200 transition shadow-lg"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 py-20 sm:py-24 md:py-28 lg:py-32 border-y border-neutral-200">
        <div className="container space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-outfit">
              {home?.testimonials?.eyebrow || "Verified Feedback"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-neutral-900 tracking-tight">
              {home?.testimonials?.heading || "What Chair Owners Say"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {(home?.testimonials?.items?.length
              ? home.testimonials.items
              : [
                  {
                    quote:
                      'As a software architect sitting 10+ hours a day, the ErgoPro Apex completely eliminated my chronic lower back strain within two weeks.',
                    author: 'Dr. Marcus Vance',
                    role: 'Verified Buyer',
                  },
                  {
                    quote:
                      'The Monarch Sovereign leather executive chair is the centerpiece of our boardroom. Meticulous craftsmanship and unbelievable comfort.',
                    author: 'Elena Rostova',
                    role: 'Executive VP',
                  },
                  {
                    quote:
                      'The 30-day risk-free trial gave us total confidence. We ordered 15 AeroMesh chairs for our creative studio and couldn’t be happier.',
                    author: 'David K.',
                    role: 'Studio Director',
                  },
                ]
            ).map((item) => (
              <div key={item.author} className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 space-y-5">
                <div className="flex text-amber-500 text-base">★★★★★</div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-serif italic">
                  “{item.quote}”
                </p>
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-900">{item.author}</span>
                  <span className="text-neutral-400">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">
              {home?.cta?.eyebrow || "Find Your Perfect Fit"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-outfit tracking-tight">
              {home?.cta?.heading || "Ready to Elevate Your Daily Comfort?"}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {home?.cta?.description ||
                "Browse our full chair collection or use our interactive comparison tool to find the exact model for your body and workspace."}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                href={home?.cta?.primaryCta?.url || "/chairs"}
                className="px-9 py-4.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-neutral-200 transition shadow-xl text-center"
              >
                {home?.cta?.primaryCta?.label || "Explore All Chairs"}
              </Link>
              <Link
                href={home?.cta?.secondaryCta?.url || "/contact"}
                className="px-9 py-4.5 bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-neutral-700 transition text-center"
              >
                {home?.cta?.secondaryCta?.label || "Visit Showroom"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
