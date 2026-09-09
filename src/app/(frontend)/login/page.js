'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/customers/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.errors?.[0]?.message || data.message || 'Login failed.')
        setLoading(false)
        return
      }
      router.push('/account')
      router.refresh()
    } catch {
      setError('Login failed.')
      setLoading(false)
    }
  }

  return (
    <div className="container py-16 max-w-md">
      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Account</span>
      <h1 className="text-3xl font-extrabold font-outfit text-neutral-900 mb-6">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-xs font-semibold">
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        </label>
        <label className="block text-xs font-semibold">
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        </label>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
        <button disabled={loading} className="w-full py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl min-h-[44px]">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <div className="mt-4 flex justify-between text-xs">
        <Link href="/forgot-password" className="underline">Forgot password</Link>
        <Link href="/register" className="underline">Create account</Link>
      </div>
    </div>
  )
}
