'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '../components/ProductCard'
import { useShop } from '@/context/ShopContext'

function SearchContent() {
  const searchParams = useSearchParams()
  const { products } = useShop()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q))
        )
      })
    : products

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      <div className="border-b border-neutral-200 pb-6 sm:pb-8 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Product Search</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">
          {query.trim() ? `Search Results for "${query}"` : 'Global Chair Search'}
        </h1>

        <div className="max-w-xl">
          <input
            type="text"
            placeholder="Search by name, SKU, material, category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium"
          />
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs text-neutral-500 font-semibold">
          Found <strong className="text-neutral-900">{results.length}</strong> matching chairs
        </p>

        {results.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
            <p className="text-sm font-bold text-neutral-700">No chairs found matching your query.</p>
            <p className="text-xs text-neutral-400 mt-1">Try searching for keywords like &quot;Ergonomic&quot;, &quot;Leather&quot;, &quot;Mesh&quot;, &quot;Gaming&quot;.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-neutral-500">Loading Search Results...</div>}>
      <SearchContent />
    </Suspense>
  )
}
