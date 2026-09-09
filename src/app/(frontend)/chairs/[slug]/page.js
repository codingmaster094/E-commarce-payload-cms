'use client'

import React, { useState, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '../../components/ProductCard'
import { useShop } from '@/context/ShopContext'

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params)
  const { products: PRODUCTS, addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare, showToast } = useShop()
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '')
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  if (!product) {
    return notFound()
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail]
  const relatedProducts = PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4)

  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor)
    window.location.href = '/checkout'
  }

  return (
    <div className="container py-10 sm:py-12 space-y-12 sm:space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium overflow-x-auto pb-1">
        <Link href="/" className="hover:text-neutral-900 whitespace-nowrap">Home</Link>
        <span>/</span>
        <Link href="/chairs" className="hover:text-neutral-900 whitespace-nowrap">Chairs</Link>
        <span>/</span>
        <Link href={`/categories/${product.categorySlug}`} className="hover:text-neutral-900 whitespace-nowrap">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold whitespace-nowrap">{product.name}</span>
      </nav>

      {/* Top Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="w-full h-80 sm:h-[450px] lg:h-[550px] bg-neutral-100 rounded-3xl overflow-hidden shadow-inner border border-neutral-200 relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {product.bestSeller && (
              <span className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx ? 'border-neutral-900 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="uppercase tracking-widest font-bold text-amber-600">{product.categoryName}</span>
              <span>SKU: {product.sku}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-outfit text-neutral-900 tracking-tight">{product.name}</h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <span className="text-xs font-bold text-neutral-900">{product.rating}</span>
              <span className="text-neutral-300">•</span>
              <a href="#reviews" className="text-xs text-neutral-500 hover:text-neutral-900 underline font-medium">
                {product.reviewCount} customer reviews
              </a>
            </div>
          </div>

          {/* Price */}
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-sm sm:text-base line-through text-neutral-400">${product.compareAtPrice.toFixed(2)}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md ml-auto">
                  Save ${(product.compareAtPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{product.shortDescription}</p>

          {/* Colors Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Color Variant: <span className="text-neutral-900">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 transition relative flex items-center justify-center min-h-[44px] min-w-[44px] ${
                      selectedColor === c.name ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-2 scale-110 shadow-md' : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">Quantity</label>
            <div className="inline-flex items-center border border-neutral-300 rounded-xl bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 text-base font-bold text-neutral-600 hover:bg-neutral-100 rounded-l-xl min-h-[44px]"
              >
                -
              </button>
              <span className="px-5 text-sm font-bold text-neutral-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2.5 text-base font-bold text-neutral-600 hover:bg-neutral-100 rounded-r-xl min-h-[44px]"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => addToCart(product, quantity, selectedColor)}
              className="w-full py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:bg-neutral-800 transition min-h-[48px]"
            >
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition min-h-[44px]"
              >
                Buy Now
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 border rounded-xl flex items-center justify-center gap-1 text-xs font-bold transition min-h-[44px] ${
                    inWishlist ? 'bg-rose-50 border-rose-300 text-rose-600' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  ♥ {inWishlist ? 'Saved' : 'Wishlist'}
                </button>

                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`flex-1 border rounded-xl flex items-center justify-center gap-1 text-xs font-bold transition min-h-[44px] ${
                    inCompare ? 'bg-neutral-900 text-white' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  ⇄ Compare
                </button>
              </div>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-neutral-200 text-center text-[10px] sm:text-[11px] text-neutral-600">
            <div className="space-y-1">
              <span className="block font-bold text-neutral-900">10-Yr Warranty</span>
              <span>Full Frame Cover</span>
            </div>
            <div className="space-y-1">
              <span className="block font-bold text-neutral-900">30-Day Trial</span>
              <span>100% Risk Free</span>
            </div>
            <div className="space-y-1">
              <span className="block font-bold text-neutral-900">Free Express</span>
              <span>Doorstep Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Tabs (Description, Features, Specs, Shipping, Reviews) */}
      <div className="border-t border-neutral-200 pt-10 sm:pt-12 space-y-8">
        <div className="flex flex-wrap border-b border-neutral-200 gap-3 sm:gap-8 overflow-x-auto">
          {[
            { id: 'description', label: 'Description' },
            { id: 'features', label: 'Ergonomic Features' },
            { id: 'specs', label: 'Specifications' },
            { id: 'shipping', label: 'Shipping & Warranty' },
            { id: 'reviews', label: `Reviews (${product.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition relative whitespace-nowrap min-h-[44px] ${
                activeTab === tab.id ? 'text-neutral-900 font-extrabold' : 'text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-100 shadow-sm">
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <h3 className="text-lg sm:text-xl font-bold font-outfit text-neutral-900">Designed for Superior Performance</h3>
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">{feat}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-3xl space-y-6">
              <h3 className="text-base sm:text-lg font-bold font-outfit text-neutral-900">Technical Specifications</h3>
              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="py-3 grid grid-cols-2 text-xs">
                    <span className="font-semibold text-neutral-500">{spec.name}</span>
                    <span className="font-bold text-neutral-900">{spec.value}</span>
                  </div>
                ))}
                <div className="py-3 grid grid-cols-2 text-xs">
                  <span className="font-semibold text-neutral-500">Dimensions (W × D × H)</span>
                  <span className="font-bold text-neutral-900">
                    {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height}
                  </span>
                </div>
                <div className="py-3 grid grid-cols-2 text-xs">
                  <span className="font-semibold text-neutral-500">Seat Height</span>
                  <span className="font-bold text-neutral-900">{product.dimensions.seatHeight}</span>
                </div>
                <div className="py-3 grid grid-cols-2 text-xs">
                  <span className="font-semibold text-neutral-500">Weight & Max Load</span>
                  <span className="font-bold text-neutral-900">{product.weight} (Max Load: {product.maxLoad})</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <h3 className="text-base sm:text-lg font-bold font-outfit text-neutral-900">Free Express Delivery & Guarantee</h3>
              <p>
                All MEANOVA chairs ship free via insured freight. Orders placed before 2:00 PM EST are dispatched same-day and typically arrive within 2–4 business days.
              </p>
              <h4 className="font-bold text-neutral-900 pt-2">30-Day Risk-Free Trial</h4>
              <p>
                Try your chair for 30 days in your home or office. If you are not completely satisfied with your posture and comfort, contact our support team for a free pickup and full refund.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl" id="reviews">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-outfit text-neutral-900">Customer Reviews</h3>
                  <p className="text-xs text-neutral-500">Based on {product.reviewCount} verified purchases</p>
                </div>
                <button
                  onClick={() => showToast('Review submission form submitted successfully.')}
                  className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition min-h-[44px]"
                >
                  Write a Review
                </button>
              </div>

              {/* Sample Review */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">Jonathan S. — Verified Buyer</span>
                  <span className="text-amber-500 font-bold">★★★★★</span>
                </div>
                <p className="text-neutral-700">
                  “Absolutely worth every penny. The lumbar matrix support cured my neck stiffness after long engineering design sprints.”
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-10 sm:pt-12 border-t border-neutral-200">
          <h2 className="text-2xl font-extrabold font-outfit text-neutral-900 tracking-tight">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
