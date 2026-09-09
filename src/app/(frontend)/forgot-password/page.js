'use client'

import React, { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/customers/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (response.ok) setMessage('If that email exists, a reset link has been sent.')
    else setMessage('Unable to send reset email.')
  }

  return (
    <div className="container py-16 max-w-md">
      <h1 className="text-3xl font-extrabold font-outfit text-neutral-900 mb-6">Forgot password</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs" />
        <button className="w-full py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl min-h-[44px]">Send reset link</button>
      </form>
      {message ? <p className="mt-4 text-xs text-neutral-600">{message}</p> : null}
    </div>
  )
}
