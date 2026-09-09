'use client'

import React, { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import { useShop } from '@/context/ShopContext'

export default function ChairsListingPage() {
  const { products: PRODUCTS, categories: CATEGORIES } = useShop()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState(2000)
  const [minRating, setMinRating] = useState(0)
  const [selectedMaterial, setSelectedMaterial] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [gridCols, setGridCols] = useState(4)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Extract unique materials
  const allMaterials = useMemo(() => {
    const set = new Set()
    PRODUCTS.forEach((p) => p.materials.forEach((m) => set.add(m)))
    return Array.from(set)
  }, [PRODUCTS])

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = p.name.toLowerCase().includes(q)
        const matchesCategory = p.categoryName.toLowerCase().includes(q)
        const matchesDesc = p.shortDescription.toLowerCase().includes(q)
        if (!matchesName && !matchesCategory && !matchesDesc) return false
      }

      // Category
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false
      }

      // Price
      if (p.price > maxPrice) {
        return false
      }

      // Rating
      if (p.rating < minRating) {
        return false
      }

      // Material
      if (selectedMaterial !== 'all' && !p.materials.includes(selectedMaterial)) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'newest') return b.newArrival ? 1 : -1
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    })
  }, [PRODUCTS, searchQuery, selectedCategory, maxPrice, minRating, selectedMaterial, sortBy])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setMaxPrice(2000)
    setMinRating(0)
    setSelectedMaterial('all')
    setSortBy('featured')
  }

  const FilterForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm uppercase tracking-wider font-outfit text-neutral-900">Filters</h3>
        <button onClick={resetFilters} className="text-xs text-neutral-400 hover:text-neutral-900 underline font-medium">
          Reset All
        </button>
      </div>

      {/* Search Box */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-neutral-700">Search Products</label>
        <input
          type="text"
          placeholder="e.g. Executive, Mesh..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-neutral-700">Category</label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
              selectedCategory === 'all' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            All Categories ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex justify-between ${
                selectedCategory === cat.slug ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <span>{cat.name}</span>
              <span className="opacity-60">({cat.productCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-neutral-700">Max Price:</span>
          <span className="text-neutral-900 font-bold">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="300"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-neutral-900 cursor-pointer"
        />
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-neutral-700">Minimum Rating</label>
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full px-3.5 py-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium"
        >
          <option value="0">All Ratings</option>
          <option value="4.5">★ 4.5 & Above</option>
          <option value="4.8">★ 4.8 & Above</option>
          <option value="5.0">★ 5.0 Only</option>
        </select>
      </div>

      {/* Material Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-neutral-700">Material</label>
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium"
        >
          <option value="all">All Materials</option>
          {allMaterials.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
    </div>
  )

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 sm:pb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Catalog</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-neutral-900 tracking-tight">All Chairs & Seating</h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl">
          Explore our complete collection of precision-engineered ergonomic chairs, executive leather seating, task chairs, and luxury lounge furniture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between bg-neutral-100 p-4 rounded-xl border border-neutral-200">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>{mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          <span className="text-xs text-neutral-500 font-medium">{filteredProducts.length} items</span>
        </div>

        {/* Mobile Filter Collapsible */}
        {mobileFiltersOpen && (
          <div className="lg:hidden p-5 bg-neutral-50 rounded-2xl border border-neutral-200">
            <FilterForm />
          </div>
        )}

        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 border-r border-neutral-200 pr-6">
          <FilterForm />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
            <span className="text-xs text-neutral-600 font-medium">
              Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> chair products
            </span>

            <div className="flex items-center gap-4">
              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>

              {/* Grid Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-lg border border-neutral-200">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded text-xs font-bold ${gridCols === 3 ? 'bg-neutral-900 text-white' : 'text-neutral-400'}`}
                  title="3 Columns"
                >
                  3 Col
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded text-xs font-bold ${gridCols === 4 ? 'bg-neutral-900 text-white' : 'text-neutral-400'}`}
                  title="4 Columns"
                >
                  4 Col
                </button>
              </div>
            </div>
          </div>

          {/* Grid Output */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
              <p className="text-base font-bold text-neutral-700">No matching chair products found</p>
              <p className="text-xs text-neutral-400">Try loosening your search query or reset filters.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-5 sm:gap-6`}>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
