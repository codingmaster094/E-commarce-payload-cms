'use client'

import React from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartSubtotal, cartTotalCount, brand } = useShop()

  if (!isCartOpen) return null

  const freeShippingThreshold = brand.policies.freeShippingThreshold
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal)
  const freeShippingPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 overflow-x-hidden">
        <div className="w-full max-w-md bg-white text-neutral-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-xl font-bold font-outfit tracking-tight flex items-center gap-2">
              <span>Shopping Cart</span>
              <span className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-full font-medium">
                {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'}
              </span>
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-neutral-50 p-4 border-b border-neutral-100 text-xs">
            {amountToFreeShipping > 0 ? (
              <p className="text-neutral-600 mb-2">
                Add <span className="font-bold text-neutral-900">${amountToFreeShipping.toFixed(2)}</span> more to qualify for <span className="font-semibold text-emerald-600">Free Delivery</span>!
              </p>
            ) : (
              <p className="text-emerald-700 font-semibold mb-2 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Congratulations! You qualify for Free Delivery.
              </p>
            )}
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-neutral-900 h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-neutral-500">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-neutral-700">Your cart is empty</p>
                <p className="text-xs text-neutral-400 mt-1">Explore our premium chair collection to discover ergonomic perfection.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 min-h-[44px] bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition"
                >
                  Explore Chairs
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 pb-6 border-b border-neutral-100">
                  <div className="w-20 h-20 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-sm text-neutral-900 line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-red-500 transition"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Color: <span className="font-medium text-neutral-700">{item.selectedColor || 'Default'}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 rounded-l-lg min-h-[44px] min-w-[44px]"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 rounded-r-lg min-h-[44px] min-w-[44px]"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-sm text-neutral-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>{amountToFreeShipping === 0 ? <span className="text-emerald-600 font-semibold">Free</span> : 'Calculated at checkout'}</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between text-base font-bold text-neutral-900">
                  <span>Total</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-3 min-h-[44px] flex items-center justify-center bg-neutral-200 text-neutral-900 font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-300 transition"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-3 min-h-[44px] flex items-center justify-center bg-neutral-900 text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
