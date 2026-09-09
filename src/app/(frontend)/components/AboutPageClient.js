'use client'

import React from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'

export default function AboutPageClient({ about = null }) {
  const { brand } = useShop()

  const pillars = about?.pillars?.length
    ? about.pillars
    : [
        { icon: '⚡', title: 'Spine Alignment', description: 'Active lumbar matrix adapting to natural curvature.' },
        { icon: '🌱', title: 'Thermal Comfort', description: 'Breathable mesh for zero heat retention.' },
        { icon: '🛡️', title: '10-Year Guarantee', description: 'Heavy-duty structural integrity confidence.' },
        { icon: '🎨', title: 'Sculptural Form', description: 'Architectural elegance elevating any space.' },
      ]

  const paragraphs = about?.storyParagraphs?.length
    ? about.storyParagraphs.map((item) => item.text)
    : [
        'Founded with a commitment to eliminate desk fatigue, every model in our collection undergoes rigorous BIFMA load testing, spine biomechanics alignment, and luxury material selection.',
        'From Italian elastomeric mesh to top-grain Nappa leathers and die-cast aluminum frames, our chairs are built to endure decades of intense daily performance.',
      ]

  return (
    <div className="space-y-24 sm:space-y-36 pb-24 sm:pb-36">
      <section className="bg-neutral-950 text-white py-24 sm:py-32">
        <div className="container max-w-3xl text-center space-y-6 sm:space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">
            {about?.heroEyebrow || 'Our Philosophy'}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-outfit tracking-tight">
            {about?.heroHeading || 'Designed for the Way You Sit.'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-light leading-relaxed">
            {about?.heroDescription ||
              `At ${brand.brandName}, we believe seating is not merely furniture — it is the essential interface between human physiology, focused intellect, and architectural design.`}
          </p>
        </div>
      </section>

      <section className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 sm:gap-16 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-outfit">
            {about?.storyEyebrow || 'Craftsmanship & Science'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-neutral-900 tracking-tight">
            {about?.storyHeading || 'Precision Ergonomics Meets Luxury Aesthetics'}
          </h2>
          {paragraphs.map((text) => (
            <p key={text} className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {text}
            </p>
          ))}
        </div>

        <div className="h-80 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={about?.storyImageUrl || 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1200&auto=format&fit=crop'}
            alt="Handcrafting luxury chair leather"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="container space-y-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-neutral-900 text-center">
            {about?.pillarsHeading || 'Our Four Design Pillars'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="p-8 bg-white rounded-3xl border border-neutral-100 space-y-3 shadow-sm">
                <span className="text-3xl">{pillar.icon}</span>
                <h3 className="font-bold text-base font-outfit text-neutral-900">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-neutral-900">
          {about?.ctaHeading || 'Experience the MEANOVA Difference'}
        </h2>
        <Link
          href={about?.ctaUrl || '/chairs'}
          className="inline-block px-9 py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-neutral-800 transition min-h-[48px] shadow-lg"
        >
          {about?.ctaLabel || 'Explore All Chairs Catalog'}
        </Link>
      </section>
    </div>
  )
}
