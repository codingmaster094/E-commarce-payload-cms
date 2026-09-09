'use client'

import React from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'

export default function CollectionsPage() {
  const { collections: COLLECTIONS } = useShop()
  return (
    <div className="container py-10 sm:py-12 space-y-8 sm:space-y-12">
      <div className="border-b border-neutral-200 pb-6 sm:pb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Editorial Lines</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-neutral-900 tracking-tight">Curated Seating Collections</h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl">
          Handcrafted collections designed around specific work styles, executive environments, esports performance, and architectural lounges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        {COLLECTIONS.map((col) => (
          <div key={col.id} className="group relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-xl flex flex-col justify-end p-6 sm:p-8 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={col.image}
              alt={col.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 space-y-2 sm:space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">{col.tagline}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit">{col.name}</h2>
              <p className="text-xs text-neutral-300 max-w-md leading-relaxed">{col.description}</p>
              <Link
                href={`/collections/${col.slug}`}
                className="inline-block mt-3 px-6 py-3 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition min-h-[44px]"
              >
                Explore Collection →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
