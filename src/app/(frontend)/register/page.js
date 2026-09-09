'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setEmail] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const setField = (key, value) => setEmail((prev) => ({ ...prev, [key]: value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          name: `${form.firstName} ${form.lastName}`.trim(),
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.errors?.[0]?.message || data.message || 'Registration failed.')
        setLoading(false)
        return
      }
      await fetch('/api/customers/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      router.push('/account')
      router.refresh()
    } catch {
      setError('Registration failed.')
      setLoading(false)
    }
  }

  return (
    <div className="container py-16 max-w-md">
      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Account</span>
      <h1 className="text-3xl font-extrabold font-outfit text-neutral-900 mb-6">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="First name" value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} className="px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
          <input required placeholder="Last name" value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} className="px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        </div>
        <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setField('email', e.target.value)} className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setField('phone', e.target.value)} className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        <input type="password" required minLength={8} placeholder="Password" value={form.password} onChange={(e) => setField('password', e.target.value)} className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
        <button disabled={loading} className="w-full py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl min-h-[44px]">
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <p className="mt-4 text-xs">Already have an account? <Link href="/login" className="underline">Sign in</Link></p>
    </div>
  )
}
