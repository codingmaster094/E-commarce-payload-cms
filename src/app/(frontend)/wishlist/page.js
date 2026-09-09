'use client'

import React from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'
import ProductCard from '../components/ProductCard'

export default function WishlistPage() {
  const { wishlist, products } = useShop()

  const savedProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Saved Seating</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">Your Wishlist</h1>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-neutral-50 rounded-3xl border border-neutral-200 space-y-4">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-rose-500 text-2xl">
            ♥
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-neutral-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Click the heart icon on any chair product card to save your favorite models for later.
          </p>
          <Link
            href="/chairs"
            className="inline-block px-8 py-3.5 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition min-h-[44px]"
          >
            Explore All Chairs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {savedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
