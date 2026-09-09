'use client'

import React from 'react'
import Link from 'next/link'

export default function CustomerOrdersPage() {
  const sampleOrders = [
    {
      orderNumber: 'MNV-849201',
      date: 'Sep 02, 2026',
      total: 899.0,
      status: 'Shipped',
      items: ['ErgoPro Apex Executive (Graphite Black)'],
    },
    {
      orderNumber: 'MNV-710394',
      date: 'Aug 14, 2026',
      total: 1299.0,
      status: 'Delivered',
      items: ['Monarch Sovereign Leather Executive'],
    },
  ]

  return (
    <div className="container py-10 sm:py-12 space-y-8">
      <div className="border-b border-neutral-200 pb-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Orders</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-neutral-900">Order History</h1>
        </div>
        <Link href="/account" className="text-xs font-bold text-neutral-600 hover:text-neutral-900 underline">
          ← Back to Account
        </Link>
      </div>

      <div className="space-y-4">
        {sampleOrders.map((order) => (
          <div key={order.orderNumber} className="p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-neutral-900">{order.orderNumber}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-neutral-500">Ordered on {order.date}</p>
              <p className="text-xs font-medium text-neutral-700">{order.items.join(', ')}</p>
            </div>

            <div className="text-right">
              <span className="font-extrabold text-base text-neutral-900">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
