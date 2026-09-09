'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '../../components/ProductCard'
import { useShop } from '@/context/ShopContext'

export default function CollectionDetailPage({ params }) {
  const resolvedParams = use(params)
  const { collections: COLLECTIONS, products: PRODUCTS } = useShop()
  const collection = COLLECTIONS.find((c) => c.slug === resolvedParams.slug)

  if (!collection) {
    return notFound()
  }

  const collectionProducts = PRODUCTS.filter((p) => p.collectionSlug === collection.slug)

  return (
    <div className="container py-10 sm:py-12 space-y-8 sm:space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-12 lg:p-16 min-h-[300px] sm:min-h-[350px] flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        />
        <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
          <nav className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-white">Collections</Link>
            <span>/</span>
            <span className="text-white font-bold">{collection.name}</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">{collection.tagline}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit tracking-tight">{collection.name}</h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{collection.description}</p>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="space-y-6">
        <h2 className="text-lg sm:text-2xl font-bold font-outfit text-neutral-900">
          Products in this Collection ({collectionProducts.length})
        </h2>

        {collectionProducts.length === 0 ? (
          <div className="text-center py-16 text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-200">
            <p>No products currently tagged under this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectionProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
