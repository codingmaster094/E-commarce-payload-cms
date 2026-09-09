'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, brand, coupon, applyCouponCode, removeCoupon } = useShop()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [couponInput, setCouponInput] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
  })

  const shippingFee = cartSubtotal >= brand.policies.freeShippingThreshold ? 0 : 25
  const estimatedTax = cartSubtotal * 0.08
  const discount = coupon?.discount || 0
  const grandTotal = Math.max(0, cartSubtotal - discount + shippingFee + estimatedTax)

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/commerce/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            color: item.selectedColor,
          })),
          shipping: shippingFee,
          tax: estimatedTax,
          couponCode: coupon?.code,
          shippingMethod: 'standard',
          paymentMethod: 'manual',
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            street: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          billingSameAsShipping: true,
        }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) {
        setError(data.error || 'Unable to place order.')
        setSubmitting(false)
        return
      }
      setOrderNumber(data.orderNumber)
      setOrderPlaced(true)
      clearCart()
    } catch {
      setError('Unable to place order.')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="container py-16 sm:py-20 text-center space-y-6 max-w-3xl">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
          ✓
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-neutral-900">Order Placed Successfully!</h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Thank you for choosing <strong className="text-neutral-900">{brand.brandName}</strong>. Order confirmation {orderNumber} has been recorded.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            href="/account/orders"
            className="px-6 py-3.5 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition min-h-[44px] flex items-center justify-center"
          >
            View Order Status
          </Link>
          <Link
            href="/chairs"
            className="px-6 py-3.5 bg-neutral-200 text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-300 transition min-h-[44px] flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-neutral-900">Your cart is currently empty.</h1>
        <Link href="/chairs" className="inline-block px-6 py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl">
          Return to Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Checkout</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">Complete Your Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Customer & Delivery Details Form */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold font-outfit text-neutral-900">1. Customer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <h3 className="text-base sm:text-lg font-bold font-outfit text-neutral-900">2. Shipping Address</h3>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Street Address *</label>
              <input
                type="text"
                required
                placeholder="Building, street name, suite..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method Notice */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <h3 className="text-base sm:text-lg font-bold font-outfit text-neutral-900">3. Payment Provider</h3>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <span className="font-bold">E-Commerce Ready Mode:</span>
              <p>Payment is modular. This order is stored in Payload with payment status pending until a provider is connected.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={async () => {
                  const message = await applyCouponCode(couponInput)
                  setError(message.includes('applied') ? '' : message)
                }}
                className="px-4 py-3 bg-neutral-900 text-white text-xs font-bold uppercase rounded-xl"
              >
                Apply
              </button>
            </div>
            {coupon ? (
              <button type="button" onClick={removeCoupon} className="text-xs underline text-neutral-500">
                Remove coupon {coupon.code}
              </button>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:bg-neutral-800 transition min-h-[48px] disabled:opacity-60"
          >
            {submitting ? 'Placing order…' : `Place Order — $${grandTotal.toFixed(2)}`}
          </button>
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </form>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 bg-neutral-50 p-6 rounded-3xl border border-neutral-200 space-y-6">
          <h3 className="text-base sm:text-lg font-bold font-outfit text-neutral-900">Order Items ({cart.length})</h3>

          <div className="space-y-4 divide-y divide-neutral-200 max-h-96 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.product.id} className="pt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-200 rounded-lg overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900 line-clamp-1">{item.product.name}</h4>
                    <p className="text-[11px] text-neutral-500">Qty: {item.quantity} × ${item.product.price}</p>
                  </div>
                </div>
                <span className="font-bold text-xs text-neutral-900">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs text-neutral-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? <strong className="text-emerald-700">Free</strong> : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount {coupon?.code ? `(${coupon.code})` : ''}</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-extrabold text-neutral-900">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
