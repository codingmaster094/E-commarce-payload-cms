'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useShop()
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)

  if (!quickViewProduct) return null

  const p = quickViewProduct
  const images = p.images && p.images.length > 0 ? p.images : [p.thumbnail]
  const currentColor = selectedColor || (p.colors[0]?.name ?? '')

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-y-auto overflow-x-hidden max-h-[90vh] z-10 grid grid-cols-1 md:grid-cols-2">
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 shadow-md transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Gallery */}
          <div className="bg-neutral-100 p-6 flex flex-col justify-between">
            <div className="w-full h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden mb-4 bg-white shadow-inner relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeImageIndex]}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-neutral-900 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span className="uppercase tracking-wider font-semibold text-neutral-400">{p.categoryName}</span>
                <span>SKU: {p.sku}</span>
              </div>
              <h2 className="text-xl font-bold font-outfit text-neutral-900 mb-2">{p.name}</h2>
              
              {/* Price & Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-neutral-900">${p.price.toFixed(2)}</span>
                  {p.compareAtPrice && (
                    <span className="text-sm line-through text-neutral-400">${p.compareAtPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-semibold px-2 py-1 rounded-md">
                  ★ {p.rating} ({p.reviewCount})
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-6">{p.shortDescription}</p>

              {/* Color Swatches */}
              {p.colors && p.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                    Color: <span className="font-bold text-neutral-900">{currentColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {p.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition relative ${
                          currentColor === c.name ? 'border-neutral-900 scale-110 shadow-md' : 'border-neutral-200'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-neutral-200 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm font-semibold hover:bg-neutral-100 min-h-[44px] min-w-[44px]"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-sm font-semibold hover:bg-neutral-100 min-h-[44px] min-w-[44px]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <button
                  onClick={() => {
                    addToCart(p, quantity, currentColor)
                    setQuickViewProduct(null)
                  }}
                  className="col-span-3 py-3 bg-neutral-900 text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className={`col-span-1 min-h-[44px] border rounded-xl flex items-center justify-center transition ${
                    isInWishlist(p.id) ? 'bg-rose-50 border-rose-300 text-rose-600' : 'border-neutral-200 hover:border-neutral-900 text-neutral-600'
                  }`}
                  title="Wishlist"
                >
                  ♥
                </button>
                <button
                  onClick={() => toggleCompare(p.id)}
                  className={`col-span-1 min-h-[44px] border rounded-xl flex items-center justify-center transition text-xs font-semibold ${
                    isInCompare(p.id) ? 'bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-900 text-neutral-600'
                  }`}
                  title="Compare"
                >
                  ⇄
                </button>
              </div>

              <Link
                href={`/chairs/${p.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="block text-center text-xs text-neutral-500 hover:text-neutral-900 underline font-medium"
              >
                View Full Product Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
