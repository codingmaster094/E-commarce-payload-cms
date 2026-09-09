'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AccountProfilePage() {
  const [customer, setCustomer] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', name: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/customers/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const user = data?.user || data
        if (!user?.id) return
        setCustomer(user)
        setForm({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || '',
          name: user.name || '',
        })
      })
  }, [])

  if (!customer) {
    return (
      <div className="container py-16 text-xs">
        Please <Link href="/login" className="underline">sign in</Link> to edit your profile.
      </div>
    )
  }

  const save = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/customers/${customer.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setMessage(response.ok ? 'Profile updated.' : 'Unable to update profile.')
  }

  return (
    <div className="container py-10 max-w-lg space-y-6">
      <h1 className="text-2xl font-extrabold font-outfit">Profile</h1>
      <form onSubmit={save} className="space-y-3">
        <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="First name" className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Last name" className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        <button className="w-full py-3 bg-neutral-900 text-white text-xs font-bold uppercase rounded-xl">Save</button>
      </form>
      {message ? <p className="text-xs text-neutral-600">{message}</p> : null}
    </div>
  )
}
