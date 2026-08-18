'use client'
import { useState } from 'react'

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

  const timeOptions = ['16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

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

    const adminParams = {
      fullName: fullName,
      email: email,
      phone: phone,
      date: date,
      time: time,
      persons: persons,
      subject: 'Table Reservation Request',
      FoundVia: foundVia || 'Direct',
      Source: 'website-reservation-form',
      message: `Date of Birth: ${dob || 'Not Provided'}\nSpecial Requests: ${notes || 'None'}`,
    }

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Table Reservation', payload: adminParams })
      })

      const resData = await res.json()
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to submit reservation')
      }

      console.log('Mail delivered successfully')
      setSuccess(true)

      try {
        const whatsappResponse = await fetch('https://whatsapp-0gwb.onrender.com/api/v1/send-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            fullName: fullName,
            email: email,
            phone: phone,
            serviceType: 'Table Reservation',
            eventType: 'Table Reservation',
            formType: 'Table Reservation Form',
            eventDate: date,
            date: date,
            eventTime: time,
            time: time,
            numGuests: persons,
            guests: persons,
            persons: persons,
            foundVia: foundVia || 'Direct',
            additionalNotes: `Date of Birth: ${dob || 'Not Provided'} | Special Requests: ${notes || 'None'}`,
            notes: notes || 'None',
            message: `Date: ${date} | Time: ${time} | Persons: ${persons} | DOB: ${dob || 'Not Provided'} | Found via: ${foundVia || 'Direct'} | Special Requests: ${notes || 'None'}`
          }),
        })

        if (whatsappResponse.ok) {
          console.log('WhatsApp delivered successfully')
        } else {
          console.error('WhatsApp not delivered', {
            status: whatsappResponse.status,
            statusText: whatsappResponse.statusText,
          })
        }
      } catch (waErr) {
        console.error('WhatsApp not delivered:', waErr)
      }
      setDate('')
      setTime('')
      setEmail('')
      setPersons('')
      setFullName('')
      setPhone('')
      setFoundVia('')
      setDob('')
      setNotes('')
    } catch (err: any) {
      console.error('Mail not delivered:', err)
      setError('Failed to submit reservation. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-6">
      <h3 className="text-2xl md:text-lg font-semibold text-[#06068a] mb-4">Reserve Your Table</h3>

      {/* Free Private Parking Notice */}
      <div className="bg-[#0000B3]/5 border border-[#0000B3]/15 rounded-2xl p-4 mb-6 flex items-start gap-3 text-left">
        <div className="w-8 h-8 rounded-full bg-[#06068a] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
          🅿️
        </div>
        <div>
          <h4 className="text-[#06068a] font-bold text-sm">
            Free Private Parking After 6:00 PM
          </h4>
          <p className="text-[#1A1A1A]/80 text-xs mt-0.5 leading-relaxed">
            Complimentary limited private parking is available after 6:00 PM for both dine-in guests and takeaway orders. Please contact us in advance to check availability.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
        <div>
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Date *</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
        </div>

        <div>
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Time *</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required>
            <option value="">Select time</option>
            {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Email *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
        </div>

        <div>
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Persons *</label>
          <input type="number" min={1} value={persons} onChange={(e) => setPersons(e.target.value)} placeholder="Number of persons" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
        </div>

        <div>
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Full Name *</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
        </div>

        <div>
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Phone *</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+31 6 12345678" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
        </div>

        <div>
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">How Did You Find Us?</label>
          <select value={foundVia} onChange={(e) => setFoundVia(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white">
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
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Date of birth (Optional)</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" />
        </div>

        <div>
          <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Special Requests (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white resize-none" />
        </div>

        {error && <div className="text-red-600 font-medium text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
        {success && <div className="text-green-700 font-medium bg-green-50 p-4 rounded-lg text-sm">Your table is booked! <br />
          Thank you for choosing us.
          <br /> Get ready for great food, good vibes, and a wonderful time ahead!</div>}

        <div>
          <button type="submit" disabled={submitting} className="w-full bg-[#06068a] text-white rounded-lg px-4 py-3 md:py-2 text-base md:text-base font-medium hover:bg-[#0000B3] transition-colors disabled:opacity-50 mt-3">
            {submitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}