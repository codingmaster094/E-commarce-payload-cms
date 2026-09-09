'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { use } from 'react'

export default function OrderDetailPage({ params }) {
  const { id } = use(params)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetch('/api/commerce/account', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setOrder((data.orders || []).find((item) => String(item.id) === String(id))))
  }, [id])

  if (!order) {
    return (
      <div className="container py-16 text-xs text-neutral-500">
        Order not found. <Link href="/account/orders" className="underline">Back to orders</Link>
      </div>
    )
  }

  return (
    <div className="container py-10 space-y-6">
      <Link href="/account/orders" className="text-xs underline">← Orders</Link>
      <h1 className="text-2xl font-extrabold font-outfit">{order.orderNumber}</h1>
      <p className="text-xs text-neutral-500">Status: {order.orderStatus} · Payment: {order.paymentStatus}</p>
      <div className="space-y-3">
        {(order.items || []).map((item, index) => (
          <div key={index} className="flex justify-between text-xs border-b border-neutral-100 pb-2">
            <span>{item.productName} × {item.quantity}</span>
            <span>${Number(item.unitPrice * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <p className="font-bold">Total ${Number(order.total || 0).toFixed(2)}</p>
    </div>
  )
}
