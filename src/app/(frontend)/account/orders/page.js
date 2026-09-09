'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/commerce/account', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .finally(() => setLoaded(true))
  }, [])

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      <div className="border-b border-neutral-200 pb-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Orders</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">Order History</h1>
        </div>
        <Link href="/account" className="text-xs font-bold text-neutral-600 hover:text-neutral-900 underline">← Back to Account</Link>
      </div>

      {!loaded ? <p className="text-xs text-neutral-500">Loading orders…</p> : null}
      {loaded && orders.length === 0 ? (
        <p className="text-xs text-neutral-500">No orders yet. <Link href="/login" className="underline">Sign in</Link> after checkout to see them here.</p>
      ) : null}

      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} href={`/account/orders/${order.id}`} className="p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 block">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-neutral-900">{order.orderNumber}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800">
                  {order.orderStatus}
                </span>
              </div>
              <p className="text-xs text-neutral-500">{order.items?.map((item) => item.productName).join(', ')}</p>
            </div>
            <span className="font-extrabold text-base text-neutral-900">${Number(order.total || 0).toFixed(2)}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
