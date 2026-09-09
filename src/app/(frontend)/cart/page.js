'use client'

import React from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartSubtotal, brand } = useShop()

  const freeShippingThreshold = brand.policies.freeShippingThreshold
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 25
  const estimatedTax = cartSubtotal * 0.08
  const grandTotal = cartSubtotal + shippingFee + estimatedTax

  if (cart.length === 0) {
    return (
      <div className="container py-16 sm:py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 text-3xl">
          🛒
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">Your Shopping Cart is Empty</h1>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Look through our premium seating selection to add luxury ergonomic chairs to your cart.
        </p>
        <Link
          href="/chairs"
          className="inline-block px-8 py-3.5 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition min-h-[44px]"
        >
          Browse All Chairs
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Your Order</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">Shopping Cart</h1>
        </div>
        <button onClick={clearCart} className="text-xs text-neutral-500 hover:text-red-600 underline font-medium">
          Clear Entire Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="p-4 sm:p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{item.product.categoryName}</span>
                <h3 className="font-bold font-outfit text-sm sm:text-base text-neutral-900">{item.product.name}</h3>
                <p className="text-xs text-neutral-500">Color: <span className="font-semibold text-neutral-700">{item.selectedColor || 'Default'}</span></p>
                <p className="text-xs text-neutral-500">SKU: {item.product.sku}</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-xs font-bold hover:bg-neutral-100 min-h-[36px]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-xs font-bold hover:bg-neutral-100 min-h-[36px]"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <span className="font-extrabold text-sm sm:text-base text-neutral-900 sm:w-20 text-right">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-neutral-400 hover:text-red-500 p-1 font-bold text-lg"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-neutral-50 p-6 rounded-3xl border border-neutral-200 space-y-6">
          <h3 className="text-lg font-bold font-outfit text-neutral-900">Order Summary</h3>

          <div className="space-y-3 text-xs text-neutral-700">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? <strong className="text-emerald-700">Free Delivery</strong> : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-extrabold text-neutral-900">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl block text-center shadow-xl hover:bg-neutral-800 transition min-h-[48px] flex items-center justify-center"
          >
            Proceed to Checkout →
          </Link>
        </div>
      </div>
    </div>
  )
}
