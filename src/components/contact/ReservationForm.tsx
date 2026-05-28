'use client'
import { useState } from 'react'
import { RESTAURANT } from '../../lib/constants'

export default function ReservationForm() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [email, setEmail] = useState('')
  const [persons, setPersons] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [foundVia, setFoundVia] = useState('')
  const [dob, setDob] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [idempotencyKey] = useState(() => {
    try {
      return (window as any).crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
    } catch {
      return `${Date.now()}-${Math.random().toString(36).slice(2)}`
    }
  })

  const timeOptions = ['16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

  function validate() {
    if (!date) return 'Please select a date.'
    if (!time) return 'Please select a time.'
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please enter a valid email.'
    if (!fullName) return 'Please enter full name.'
    if (!phone) return 'Please enter a phone number.'
    if (!persons || Number(persons) <= 0) return 'Please enter number of persons.'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setSubmitting(true)

    const payload = {
      date,
      time,
      email,
      persons,
      fullName,
      phone: `+31${phone}`, // Combines country code with phone input
      foundVia,
      dob,
      notes,
      source: 'website-reservation-form',
    }

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idempotencyKey, type: 'reservation', payload }),
      })

      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json?.error || 'Failed to submit reservation')
      } else {
        setSuccess(true)
        // Reset form states on success
        setDate('')
        setTime('')
        setEmail('')
        setPersons('')
        setFullName('')
        setPhone('')
        setFoundVia('')
        setDob('')
        setNotes('')
      }
    } catch (err) {
      console.error('Submit error', err)
      setError('Failed to submit reservation')
    } finally {
      setSubmitting(false)
    }

    // Build prefilled WhatsApp message and open it regardless of backend result
    const messageLines = [
      'Reservation request from website:',
      `Date: ${date}`,
      `Time: ${time}`,
      `Name: ${fullName}`,
      `Phone: +31${phone}`,
      `Email: ${email}`,
      `Persons: ${persons}`,
      dob ? `Date of birth: ${dob}` : '',
      foundVia ? `Found via: ${foundVia}` : '',
      notes ? `Notes: ${notes}` : '',
    ].filter(Boolean)

    const text = encodeURIComponent(messageLines.join('\n'))
    const phoneNum = RESTAURANT.contact.phone.replace(/\D/g, '')
    const waUrl = `https://wa.me/${phoneNum}?text=${text}`
    window.open(waUrl, '_blank')
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4">Reserve Your Table</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Date *</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm mb-1">Time *</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full border rounded px-3 py-2" required>
            <option value="">Select time</option>
            {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Email *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm mb-1">Persons *</label>
          <input type="number" min={1} value={persons} onChange={(e) => setPersons(e.target.value)} placeholder="Number of persons" className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm mb-1">Full Name *</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone *</label>
          <div className="flex gap-2">
            <div className="flex items-center px-3 border rounded">+31</div>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="6 12345678" className="flex-1 border rounded px-3 py-2" required />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">How Did You Find Us?</label>
          <select value={foundVia} onChange={(e) => setFoundVia(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="">Select</option>
            <option>Google</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Referral</option>
            <option>Walk-in</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Date of birth (Optional)</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Special Requests (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="w-full border rounded px-3 py-2" />
        </div>

        {error && <div className="text-red-600 font-medium">{error}</div>}
        {success && <div className="text-green-700 font-medium bg-green-50 p-3 rounded">Reservation submitted successfully!</div>}

        <div>
          <button type="submit" disabled={submitting} className="w-full bg-[#1B2B5E] text-white rounded px-4 py-2 disabled:opacity-50">
            {submitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}