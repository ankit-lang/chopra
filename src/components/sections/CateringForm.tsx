'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type CateringFormData = {
  name: string
  email: string
  phone?: string
  eventType: string
  eventDate: string
  guestCount: number
  dietary?: string
  message?: string
}

export default function CateringForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CateringFormData>()

  const todayStr = new Date().toISOString().split('T')[0]

  async function onSubmit(data: CateringFormData) {
    try {
      const res = await fetch('/api/catering-enquiry', {
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
    'bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all w-full'
  const lbl = 'text-white/70 text-sm font-medium mb-2 block'
  const errMsg = 'text-red-300 text-xs mt-1'

  if (status === 'success') {
    return (
      <div className="text-center py-12 max-w-2xl mx-auto">
        <p className="text-white text-xl font-vibes">
          Thank you! We will be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-5">
      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3">
          <p className="text-red-300 text-sm text-center">
            Something went wrong. Please call us on +31 6 30645930.
          </p>
        </div>
      )}

      <div>
        <label className={lbl}>Full Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className={field}
          placeholder="Your full name"
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
          <span className="text-white/40 font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          {...register('phone')}
          className={field}
          placeholder="+31 6 12345678"
        />
      </div>

      <div>
        <label className={lbl}>Event Type</label>
        <select
          {...register('eventType', { required: 'Please select an event type' })}
          className={field}
        >
          <option value="" className="bg-[#1B2B5E] text-white">
            Select event type
          </option>
          <option value="Wedding" className="bg-[#1B2B5E] text-white">
            Wedding
          </option>
          <option value="Birthday Party" className="bg-[#1B2B5E] text-white">
            Birthday Party
          </option>
          <option value="Corporate Event" className="bg-[#1B2B5E] text-white">
            Corporate Event
          </option>
          <option value="Diwali / Festival" className="bg-[#1B2B5E] text-white">
            Diwali / Festival
          </option>
          <option value="Baby Shower" className="bg-[#1B2B5E] text-white">
            Baby Shower
          </option>
          <option value="Community Event" className="bg-[#1B2B5E] text-white">
            Community Event
          </option>
          <option value="Other" className="bg-[#1B2B5E] text-white">
            Other
          </option>
        </select>
        {errors.eventType && <p className={errMsg}>{errors.eventType.message}</p>}
      </div>

      <div>
        <label className={lbl}>Event Date</label>
        <input
          type="date"
          {...register('eventDate', { required: 'Event date is required' })}
          min={todayStr}
          className={field}
        />
        {errors.eventDate && <p className={errMsg}>{errors.eventDate.message}</p>}
      </div>

      <div>
        <label className={lbl}>Number of Guests</label>
        <input
          type="number"
          {...register('guestCount', {
            required: 'Guest count is required',
            min: { value: 10, message: 'Minimum 10 guests' },
            max: { value: 500, message: 'Maximum 500 guests' },
            valueAsNumber: true,
          })}
          min={10}
          max={500}
          className={field}
          placeholder="e.g. 50"
        />
        {errors.guestCount && <p className={errMsg}>{errors.guestCount.message}</p>}
      </div>

      <div>
        <label className={lbl}>
          Dietary Requirements{' '}
          <span className="text-white/40 font-normal">(optional)</span>
        </label>
        <textarea
          {...register('dietary')}
          className={`${field} resize-none`}
          rows={3}
          placeholder="e.g. 50 halal, 20 vegetarian, 5 vegan"
        />
      </div>

      <div>
        <label className={lbl}>
          Message{' '}
          <span className="text-white/40 font-normal">(optional)</span>
        </label>
        <textarea
          {...register('message')}
          className={`${field} resize-none`}
          rows={4}
          placeholder="Any other details about your event..."
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] disabled:opacity-60 backdrop-blur-[10px] min-h-[48px]"
        >
          {isSubmitting ? 'Sending...' : 'Send My Catering Enquiry'}
        </button>
      </div>
    </form>
  )
}
