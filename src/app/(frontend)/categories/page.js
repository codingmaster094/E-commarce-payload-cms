'use client'

import React from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'

export default function CategoriesPage() {
  const { categories: CATEGORIES } = useShop()
  return (
    <div className="container py-10 sm:py-12 space-y-8 sm:space-y-12">
      <div className="border-b border-neutral-200 pb-6 sm:pb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Seating Architecture</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-neutral-900 tracking-tight">Chair Categories</h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl">
          Discover specialized chairs tailored for executive offices, ergonomic posture correction, high-performance gaming, conference rooms, and lounge environments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="group relative bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
            <div className="relative h-60 sm:h-64 overflow-hidden bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                {cat.productCount} Models
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-outfit text-neutral-900 group-hover:text-amber-700 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-neutral-600 line-clamp-3 mt-2 leading-relaxed">{cat.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <Link
                  href={`/categories/${cat.slug}`}
                  className="w-full text-center py-3.5 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl block hover:bg-neutral-800 transition min-h-[44px]"
                >
                  Explore {cat.name} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
