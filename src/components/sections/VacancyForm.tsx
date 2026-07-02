'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import EmailLink from '@/components/ui/EmailLink'

type VacancyFormData = {
  name: string
  email: string
  phone?: string
  position: string
  languages?: string
  message?: string
}

export default function VacancyForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [idempotencyKey] = useState(() => {
    try {
      return (window as any).crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
    } catch {
      return `${Date.now()}-${Math.random().toString(36).slice(2)}`
    }
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VacancyFormData>()

  async function onSubmit(data: VacancyFormData) {
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idempotencyKey, type: 'job', payload: data }),
      })
      const json = await res.json()
      setStatus(json.success ? 'success' : 'error')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const field =
    'bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-white'
  const lbl = 'text-white/80 text-sm font-medium mb-1 block'
  const errMsg = 'text-red-300 text-xs mt-1'

  if (status === 'success') {
    return (
      <div className="text-center py-12 max-w-2xl mx-auto">
        <p className="text-white text-xl font-vibes">
          Thank you for your application! We will be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-5">
      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3">
          <p className="text-red-300 text-sm text-center">
            Something went wrong. Please email us at <EmailLink />.
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
        <label className={lbl}>Position Applying For</label>
        <select
          {...register('position', { required: 'Please select a position' })}
          className={field}
        >
          <option value="" className="bg-[#1B2B5E] text-white">
            Select a position
          </option>
          <option value="Kitchen Chef" className="bg-[#1B2B5E] text-white">
            Kitchen Chef
          </option>
          <option value="Front-of-House Server" className="bg-[#1B2B5E] text-white">
            Front-of-House Server
          </option>
          <option value="Event and Catering Assistant" className="bg-[#1B2B5E] text-white">
            Event and Catering Assistant
          </option>
        </select>
        {errors.position && <p className={errMsg}>{errors.position.message}</p>}
      </div>

      <div>
        <label className={lbl}>
          Languages Spoken{' '}
          <span className="text-white/40 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          {...register('languages')}
          className={field}
          placeholder="e.g. Dutch, English, Hindi"
        />
      </div>

      <div>
        <label className={lbl}>
          Cover Note{' '}
          <span className="text-white/40 font-normal">(optional)</span>
        </label>
        <textarea
          {...register('message')}
          className={`${field} resize-none`}
          rows={5}
          placeholder="Tell us a little about yourself and why you want to work at Chopras"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] disabled:opacity-60 backdrop-blur-[10px] w-full md:w-auto"
        >
          {isSubmitting ? 'Sending...' : 'Send My Application'}
        </button>
      </div>
    </form>
  )
}
