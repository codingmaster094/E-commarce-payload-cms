'use client'

import React from 'react'
import Link from 'next/link'

export default function AccountPage() {
  return (
    <div className="container py-10 sm:py-12 space-y-8">
      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Customer Portal</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">My Account</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-bold">📦</div>
          <h2 className="font-bold text-lg font-outfit text-neutral-900">Order History</h2>
          <p className="text-xs text-neutral-500">Track current shipments and review past chair orders.</p>
          <Link href="/account/orders" className="inline-block text-xs font-bold text-neutral-900 underline pt-1">
            View Orders →
          </Link>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-bold">♥</div>
          <h2 className="font-bold text-lg font-outfit text-neutral-900">Saved Wishlist</h2>
          <p className="text-xs text-neutral-500">Access saved chair models and custom specs.</p>
          <Link href="/wishlist" className="inline-block text-xs font-bold text-neutral-900 underline pt-1">
            View Saved Products →
          </Link>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-bold">🛡️</div>
          <h2 className="font-bold text-lg font-outfit text-neutral-900">Warranty & Support</h2>
          <p className="text-xs text-neutral-500">Manage 10-year frame warranty registrations.</p>
          <Link href="/contact" className="inline-block text-xs font-bold text-neutral-900 underline pt-1">
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  )
}
