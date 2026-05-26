'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type ContactFormData = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const field =
    'border border-gray-200 rounded-xl px-5 py-4 text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-all w-full bg-white'
  const lbl = 'text-[#1A1A1A]/70 text-sm font-medium mb-2 block'
  const errMsg = 'text-red-500 text-xs mt-1'

  if (status === 'success') {
    return (
      <div className="text-center py-12 max-w-2xl mx-auto">
        <p className="text-[#C7A348] text-xl font-vibes">
          Thank you for your message. We will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-red-600 text-sm text-center">
            Something went wrong. Please call us directly on +31 6 30645930.
          </p>
        </div>
      )}

      <div>
        <label className={lbl}>Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className={field}
          placeholder="Your name"
        />
        {errors.name && <p className={errMsg}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={lbl}>Email Address</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          className={field}
          placeholder="your@email.com"
        />
        {errors.email && <p className={errMsg}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={lbl}>
          Phone Number{' '}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          {...register('phone')}
          className={field}
          placeholder="+31 6 12345678"
        />
      </div>

      <div>
        <label className={lbl}>Subject</label>
        <select
          {...register('subject', { required: 'Please select a subject' })}
          className={field}
        >
          <option value="">Select a subject</option>
          <option value="Table Reservation">Table Reservation</option>
          <option value="Catering Enquiry">Catering Enquiry</option>
          <option value="Event Booking">Event Booking</option>
          <option value="General Question">General Question</option>
          <option value="Press and Media">Press and Media</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <p className={errMsg}>{errors.subject.message}</p>}
      </div>

      <div>
        <label className={lbl}>Message</label>
        <textarea
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
          })}
          className={`${field} resize-none`}
          rows={5}
          placeholder="How can we help you?"
        />
        {errors.message && <p className={errMsg}>{errors.message.message}</p>}
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] w-full font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] disabled:opacity-60 min-h-[48px]"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
