'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ProductItem } from '@/lib/seedData'
import { useShop } from '@/context/ShopContext'

interface ProductCardProps {
  product: ProductItem
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare, setQuickViewProduct } = useShop()
  const [activeColor, setActiveColor] = useState<string>(product.colors[0]?.name || '')
  const [isHovered, setIsHovered] = useState(false)

  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const mainImage = product.thumbnail
  const hoverImage = product.images[1] || product.thumbnail

  return (
    <div
      className="group relative bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges & Actions Overlay */}
      <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.bestSeller && (
            <span className="bg-neutral-950/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
              Best Seller
            </span>
          )}
          {product.newArrival && (
            <span className="bg-emerald-700/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-600/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Actions (Wishlist & Compare) */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all ${
              inWishlist ? 'bg-rose-500 text-white scale-110' : 'bg-white/90 text-neutral-700 hover:bg-neutral-950 hover:text-white'
            }`}
            title="Add to Wishlist"
          >
            <svg className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all text-sm font-bold ${
              inCompare ? 'bg-neutral-950 text-white scale-110' : 'bg-white/90 text-neutral-700 hover:bg-neutral-950 hover:text-white'
            }`}
            title="Compare Chair"
          >
            ⇄
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/chairs/${product.slug}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isHovered ? hoverImage : mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick View & Quick Add */}
        <div className="absolute inset-x-4 bottom-4 z-10 flex gap-2.5 sm:transform sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-3 bg-white/95 backdrop-blur-md text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-2xl shadow-xl hover:bg-neutral-950 hover:text-white transition min-h-[48px] flex items-center justify-center"
          >
            Quick View
          </button>
          <button
            onClick={() => addToCart(product, 1, activeColor)}
            className="p-3 bg-neutral-950 text-white text-xs font-bold rounded-2xl shadow-xl hover:bg-neutral-800 transition flex items-center justify-center min-h-[48px] min-w-[48px]"
            title="Add to Cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="uppercase font-bold tracking-widest text-[11px] text-amber-600 font-outfit">{product.categoryName}</span>
            <div className="flex items-center gap-1 font-semibold text-neutral-800">
              <span className="text-amber-500">★</span> <span>{product.rating}</span>
            </div>
          </div>

          <Link href={`/chairs/${product.slug}`} className="block group-hover:text-neutral-600 transition">
            <h3 className="font-extrabold font-outfit text-lg sm:text-xl text-neutral-950 tracking-tight leading-snug">{product.name}</h3>
          </Link>
          <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 leading-relaxed">{product.shortDescription}</p>
        </div>

        {/* Color Swatches & Price */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.colors.slice(0, 4).map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveColor(c.name)}
                className={`w-4 h-4 rounded-full border transition ${
                  activeColor === c.name ? 'ring-2 ring-neutral-950 ring-offset-2 scale-110' : 'border-neutral-300'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold font-outfit text-lg text-neutral-950">${product.price.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-xs line-through text-neutral-400 font-medium">${product.compareAtPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
