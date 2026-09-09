'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '../../components/ProductCard'
import { useShop } from '@/context/ShopContext'

export default function CategoryDetailPage({ params }) {
  const resolvedParams = use(params)
  const { categories: CATEGORIES, products: PRODUCTS } = useShop()
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug)

  if (!category) {
    return notFound()
  }

  const categoryProducts = PRODUCTS.filter((p) => p.categorySlug === category.slug)

  return (
    <div className="container py-10 sm:py-12 space-y-8 sm:space-y-12">
      {/* Category Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-12 lg:p-16 min-h-[250px] sm:min-h-[300px] flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
          <nav className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white">Categories</Link>
            <span>/</span>
            <span className="text-white font-bold">{category.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit tracking-tight">{category.name}</h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{category.description}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
          <h2 className="text-lg sm:text-xl font-bold font-outfit text-neutral-900">
            Available Models ({categoryProducts.length})
          </h2>
          <Link href="/chairs" className="text-xs font-bold text-neutral-600 hover:text-neutral-900 underline">
            View All Chairs →
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16 text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-200">
            <p>No products currently listed under this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
