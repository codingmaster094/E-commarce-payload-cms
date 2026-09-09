'use client'

import React, { useState } from 'react'
import { useShop } from '@/context/ShopContext'

export default function ContactPage() {
  const { showToast, brand } = useShop()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    showToast('Your message has been sent to our showroom team.')
  }

  return (
    <div className="container py-10 sm:py-12 space-y-8 sm:space-y-12">
      <div className="border-b border-neutral-200 pb-6 sm:pb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-outfit">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-neutral-900 tracking-tight">Contact & Showroom</h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl">
          Have questions about chair fit, bulk office seating quotes, ergonomic consultation, or warranty services? Reach out to our seating specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6 bg-neutral-900 text-white p-6 sm:p-8 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-white">Showroom & Headquarters</h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {brand.contactIntro}
          </p>

          <div className="space-y-4 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
            <div>
              <strong className="block text-white mb-1">Address:</strong>
              <p>{brand.address}</p>
            </div>
            <div>
              <strong className="block text-white mb-1">Direct Support:</strong>
              <p>Email: {brand.contactEmail}</p>
              <p>Phone: {brand.phone}</p>
            </div>
            <div>
              <strong className="block text-white mb-1">Hours:</strong>
              <p>{brand.hoursWeekday}</p>
              <p>{brand.hoursSaturday}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-neutral-900">Send us a Message</h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 space-y-2">
              <h3 className="font-bold text-base">Thank you for reaching out!</h3>
              <p className="text-xs">A {brand.brandName} seating specialist will respond within 24 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium"
                >
                  <option value="General Inquiry">General Chair Inquiry</option>
                  <option value="Bulk Order">Bulk / Office Seating Quote</option>
                  <option value="Ergonomic Consultation">Ergonomic Consultation</option>
                  <option value="Warranty Claim">Warranty Claim</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="How can we assist your seating needs?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:bg-neutral-800 transition min-h-[48px]"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
