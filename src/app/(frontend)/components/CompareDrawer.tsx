'use client'

import React from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'

export default function CompareDrawer() {
  const { compareList, toggleCompare, clearCompare, products } = useShop()

  if (compareList.length === 0) return null

  const comparedProducts = products.filter((p) => compareList.includes(p.id))

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-neutral-900 text-white border-t border-neutral-800 shadow-2xl transition-transform duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-neutral-300 whitespace-nowrap">Comparing Chairs:</span>
            <span className="bg-neutral-800 text-amber-400 text-xs px-2 py-0.5 rounded-full font-semibold">
              {compareList.length}/4
            </span>
          </div>

          {/* Product Thumbnails */}
          <div className="hidden sm:flex items-center gap-3">
            {comparedProducts.map((p) => (
              <div key={p.id} className="relative flex items-center gap-2 bg-neutral-800 rounded-lg p-1.5 pr-3 text-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.thumbnail} alt={p.name} className="w-8 h-8 rounded object-cover" />
                <span className="truncate max-w-[100px] font-medium text-neutral-200">{p.name}</span>
                <button
                  onClick={() => toggleCompare(p.id)}
                  className="text-neutral-400 hover:text-white ml-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={clearCompare}
            className="text-xs text-neutral-400 hover:text-white underline font-medium min-h-[44px] px-2"
          >
            Clear All
          </button>
          <Link
            href="/compare"
            className="px-4 py-2 bg-white text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-100 transition min-h-[44px] flex items-center justify-center whitespace-nowrap"
          >
            Compare Now →
          </Link>
        </div>
      </div>
    </div>
  )
}
