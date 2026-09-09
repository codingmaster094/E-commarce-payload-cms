'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CategoryItem, CollectionItem, ProductItem, PRODUCTS } from '@/lib/seedData'
import { brandConfig } from '@/lib/brand'
import type { BrandConfig } from '@/lib/mapCms'

export interface CartItem {
  product: ProductItem
  quantity: number
  selectedColor?: string
}

interface ShopContextType {
  products: ProductItem[]
  categories: CategoryItem[]
  collections: CollectionItem[]
  brand: BrandConfig
  // Cart
  cart: CartItem[]
  addToCart: (product: ProductItem, quantity?: number, selectedColor?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  cartSubtotal: number
  cartTotalCount: number

  // Wishlist
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  wishlistCount: number

  // Compare
  compareList: string[]
  toggleCompare: (productId: string) => void
  isInCompare: (productId: string) => boolean
  clearCompare: () => void
  isCompareOpen: boolean
  setIsCompareOpen: (open: boolean) => void

  // Quick View Modal
  quickViewProduct: ProductItem | null
  setQuickViewProduct: (product: ProductItem | null) => void

  // Toast Notification
  toastMessage: string | null
  showToast: (msg: string) => void
}

const ShopContext = createContext<ShopContextType | undefined>(undefined)

export const ShopProvider: React.FC<{
  children: React.ReactNode
  products?: ProductItem[]
  categories?: CategoryItem[]
  collections?: CollectionItem[]
  brand?: BrandConfig
}> = ({
  children,
  products = PRODUCTS,
  categories = [],
  collections = [],
  brand = brandConfig,
}) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [compareList, setCompareList] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('meanova_cart')
      if (savedCart) setCart(JSON.parse(savedCart))

      const savedWishlist = localStorage.getItem('meanova_wishlist')
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist))

      const savedCompare = localStorage.getItem('meanova_compare')
      if (savedCompare) setCompareList(JSON.parse(savedCompare))
    } catch (e) {
      console.error('Failed to load shop state from localStorage', e)
    }
  }, [])

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('meanova_cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('meanova_wishlist', JSON.stringify(wishlist))
    } catch {}
  }, [wishlist])

  useEffect(() => {
    try {
      localStorage.setItem('meanova_compare', JSON.stringify(compareList))
    } catch {}
  }, [compareList])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const addToCart = (product: ProductItem, quantity: number = 1, selectedColor?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          selectedColor: selectedColor || updated[existingIndex].selectedColor,
        }
        return updated
      }
      return [...prev, { product, quantity, selectedColor: selectedColor || product.colors[0]?.name }]
    })
    showToast(`Added "${product.name}" to your cart.`)
    setIsCartOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
    showToast('Item removed from cart.')
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      const targetProduct = products.find((p) => p.id === productId)
      const name = targetProduct?.name || 'Product'

      if (exists) {
        showToast(`Removed "${name}" from your wishlist.`)
        return prev.filter((id) => id !== productId)
      } else {
        showToast(`Added "${name}" to your wishlist.`)
        return [...prev, productId]
      }
    })
  }

  const isInWishlist = (productId: string) => wishlist.includes(productId)

  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      const exists = prev.includes(productId)
      const targetProduct = products.find((p) => p.id === productId)
      const name = targetProduct?.name || 'Product'

      if (exists) {
        showToast(`Removed "${name}" from comparison.`)
        return prev.filter((id) => id !== productId)
      } else {
        if (prev.length >= 4) {
          showToast('You can compare up to 4 products at a time.')
          return prev
        }
        showToast(`Added "${name}" to comparison.`)
        setIsCompareOpen(true)
        return [...prev, productId]
      }
    })
  }

  const isInCompare = (productId: string) => compareList.includes(productId)

  const clearCompare = () => {
    setCompareList([])
  }

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        collections,
        brand,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartTotalCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-700 animate-bounce">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </ShopContext.Provider>
  )
}

export const useShop = () => {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
}
