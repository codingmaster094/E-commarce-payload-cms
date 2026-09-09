'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
  const router = useRouter()
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    fetch('/api/customers/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const user = data?.user || data?.doc || data
        if (user?.email) setCustomer(user)
      })
      .catch(() => {})
  }, [])

  const logout = async () => {
    await fetch('/api/customers/logout', { method: 'POST', credentials: 'include' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      <div className="border-b border-neutral-200 pb-6 flex justify-between items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Customer Portal</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">My Account</h1>
          {customer?.email ? <p className="text-xs text-neutral-500 mt-2">{customer.email}</p> : (
            <p className="text-xs text-neutral-500 mt-2">
              <Link href="/login" className="underline">Sign in</Link> to view orders and profile details.
            </p>
          )}
        </div>
        {customer ? (
          <button onClick={logout} className="text-xs underline text-neutral-500">Sign out</button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-bold">📦</div>
          <h2 className="font-bold text-lg font-outfit text-neutral-900">Order History</h2>
          <p className="text-xs text-neutral-500">Track current shipments and review past chair orders.</p>
          <Link href="/account/orders" className="inline-block text-xs font-bold text-neutral-900 underline pt-1">View Orders →</Link>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-bold">♥</div>
          <h2 className="font-bold text-lg font-outfit text-neutral-900">Saved Wishlist</h2>
          <p className="text-xs text-neutral-500">Access saved chair models and custom specs.</p>
          <Link href="/account/wishlist" className="inline-block text-xs font-bold text-neutral-900 underline pt-1">View Saved Products →</Link>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-bold">👤</div>
          <h2 className="font-bold text-lg font-outfit text-neutral-900">Profile</h2>
          <p className="text-xs text-neutral-500">Update your name, phone, and addresses.</p>
          <Link href="/account/profile" className="inline-block text-xs font-bold text-neutral-900 underline pt-1">Edit Profile →</Link>
        </div>
      </div>
    </div>
  )
}
