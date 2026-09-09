'use client'

import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

function ResetForm() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/customers/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
    if (response.ok) {
      setMessage('Password updated. You can sign in.')
      router.push('/login')
    } else setMessage('Reset failed. The link may have expired.')
  }

  return (
    <div className="container py-16 max-w-md">
      <h1 className="text-3xl font-extrabold font-outfit text-neutral-900 mb-6">Reset password</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        <button className="w-full py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl min-h-[44px]">Update password</button>
      </form>
      {message ? <p className="mt-4 text-xs text-neutral-600">{message}</p> : null}
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="container py-16 text-xs">Loading…</div>}>
      <ResetForm />
    </Suspense>
  )
}
