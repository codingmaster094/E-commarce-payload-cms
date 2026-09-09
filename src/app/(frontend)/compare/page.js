'use client'

import React from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'
export default function ProductComparisonPage() {
  const { compareList, toggleCompare, clearCompare, addToCart, products } = useShop()

  const comparedProducts = products.filter((p) => compareList.includes(p.id))

  if (comparedProducts.length === 0) {
    return (
      <div className="container py-16 sm:py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 text-3xl">
          ⇄
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">No Chairs Selected for Comparison</h1>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Browse our chair catalog and click the comparison icon (⇄) on any product card to compare specs side-by-side.
        </p>
        <Link
          href="/chairs"
          className="inline-block px-8 py-3.5 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition min-h-[44px]"
        >
          Explore Chairs Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Decision Tool</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900 tracking-tight">Side-by-Side Chair Comparison</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={clearCompare}
            className="text-xs text-neutral-500 hover:text-neutral-900 underline font-medium"
          >
            Clear All
          </button>
          <Link
            href="/chairs"
            className="px-4 py-2.5 bg-neutral-100 text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition min-h-[44px] flex items-center justify-center"
          >
            + Add More Chairs
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto border border-neutral-200 rounded-3xl bg-white shadow-sm scrollbar-none">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="p-4 sm:p-6 w-1/5 text-xs font-bold uppercase tracking-wider text-neutral-400">Feature</th>
              {comparedProducts.map((p) => (
                <th key={p.id} className="p-4 sm:p-6 text-center border-l border-neutral-200 relative">
                  <button
                    onClick={() => toggleCompare(p.id)}
                    className="absolute top-2 right-2 text-neutral-400 hover:text-red-500 text-sm p-1"
                    title="Remove from comparison"
                  >
                    ×
                  </button>
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-xl overflow-hidden mb-3 bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold font-outfit text-xs sm:text-sm text-neutral-900 line-clamp-1">{p.name}</h3>
                  <span className="text-[10px] sm:text-[11px] text-neutral-500">{p.categoryName}</span>
                  <div className="mt-2 font-extrabold text-sm sm:text-base text-neutral-900">${p.price}</div>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="mt-3 w-full py-2 bg-neutral-900 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition min-h-[36px]"
                  >
                    Add to Cart
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200 text-xs">
            {/* Rating */}
            <tr>
              <td className="p-4 font-bold text-neutral-800 bg-neutral-50">Rating</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-center border-l border-neutral-200 font-semibold text-amber-600">
                  ★ {p.rating} ({p.reviewCount} reviews)
                </td>
              ))}
            </tr>

            {/* Lumbar Support */}
            <tr>
              <td className="p-4 font-bold text-neutral-800 bg-neutral-50">Lumbar Support</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-center border-l border-neutral-200 font-medium text-neutral-700">
                  {p.features.find((f) => f.toLowerCase().includes('lumbar')) || 'Standard Lumbar Support'}
                </td>
              ))}
            </tr>

            {/* Recline Angle */}
            <tr>
              <td className="p-4 font-bold text-neutral-800 bg-neutral-50">Recline Mechanism</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-center border-l border-neutral-200 font-medium text-neutral-700">
                  {p.specifications.find((s) => s.name.toLowerCase().includes('recline'))?.value || 'Synchro-Tilt (135°)'}
                </td>
              ))}
            </tr>

            {/* Main Materials */}
            <tr>
              <td className="p-4 font-bold text-neutral-800 bg-neutral-50">Primary Materials</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-center border-l border-neutral-200 font-medium text-neutral-700">
                  {p.materials.join(', ')}
                </td>
              ))}
            </tr>

            {/* Max Load */}
            <tr>
              <td className="p-4 font-bold text-neutral-800 bg-neutral-50">Maximum Load</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-center border-l border-neutral-200 font-bold text-neutral-900">
                  {p.maxLoad}
                </td>
              ))}
            </tr>

            {/* Warranty */}
            <tr>
              <td className="p-4 font-bold text-neutral-800 bg-neutral-50">Warranty Period</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-center border-l border-neutral-200 font-bold text-emerald-700">
                  {p.warranty}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
