'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RESTAURANT } from '../../lib/constants'

type FormData = {
  name: string
  phone?: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const field = 'border border-gray-200 rounded-xl px-5 py-4 text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-all w-full bg-white'
  const lbl = 'text-[#1A1A1A]/70 text-sm font-medium mb-2 block'
  const errMsg = 'text-red-500 text-xs mt-1'

  async function onSubmit(data: FormData) {
    setStatus('idle')

    const idempotencyKey = typeof window !== 'undefined' && (window as any).crypto?.randomUUID?.()
    let backendOk = false
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idempotencyKey, payload: data }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus('success')
        backendOk = true
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }

    // Build prefilled WhatsApp message and open it regardless of backend result
    const lines = [
      'Contact request from website:',
      `Name: ${data.name}`,
      data.phone ? `Phone: ${data.phone}` : '',
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      data.message ? `Message: ${data.message}` : '',
    ].filter(Boolean)

    const text = encodeURIComponent(lines.join('\n'))
    const phoneNum = RESTAURANT.contact.phone.replace(/\D/g, '')
    const waUrl = `https://wa.me/${phoneNum}?text=${text}`
    window.open(waUrl, '_blank')

    if (backendOk) reset()
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <p className="text-[#C7A348] text-xl font-vibes">Thank you — we have received your message.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-red-600 text-sm text-center">Something went wrong. Please call us on +31 6 30645930.</p>
        </div>
      )}

      <div>
        <label className={lbl}>Full Name *</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className={field}
          placeholder="Full Name"
        />
        {errors.name && <p className={errMsg}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={lbl}>Phone *</label>
        <input
          type="tel"
          {...register('phone', { required: 'Phone is required' })}
          className={field}
          placeholder="Phone"
        />
        {errors.phone && <p className={errMsg}>{errors.phone.message}</p>}
      </div>

      <div>
        <label className={lbl}>Email *</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
          className={field}
          placeholder="Email"
        />
        {errors.email && <p className={errMsg}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={lbl}>Subject *</label>
        <select {...register('subject', { required: 'Please select a subject' })} className={field}>
          <option value="">Select a subject</option>
          <option value="Table Reservation">Table Reservation</option>
          <option value="Catering Enquiry">Catering Enquiry</option>
          <option value="Event Booking">Event Booking</option>
          <option value="General Question">General Question</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <p className={errMsg}>{errors.subject.message}</p>}
      </div>

      <div>
        <label className={lbl}>Your message</label>
        <textarea {...register('message')} className={`${field} resize-none`} rows={5} placeholder="Your message" />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#1B2B5E] text-white rounded px-4 py-3"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  )
}
