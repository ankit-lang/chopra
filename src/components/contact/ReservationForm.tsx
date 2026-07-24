'use client'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

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

    // 1. Construct dynamic rows and headers for the unified Customer Template
    const mailHeader = 'BOOKING CONFIRMED!'
    const mailSubtitle = 'Thank you for booking with Chopras Indian Restaurant. Your reservation has been successfully confirmed. We look forward to welcoming you!'
    const mailRows = `
      <tr><td style="padding: 6px 0; width: 40%;"><b>Email:</b></td><td style="padding: 6px 0; color: #111111;">${email}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Phone:</b></td><td style="padding: 6px 0; color: #111111;">${phone}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Date:</b></td><td style="padding: 6px 0; color: #111111;">${date}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Time:</b></td><td style="padding: 6px 0; color: #111111;">${time}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Persons:</b></td><td style="padding: 6px 0; color: #111111;">${persons}</td></tr>
    `

    const customerParams = {
      fullName: fullName,
      email: email,
      mailHeader: mailHeader,
      mailSubtitle: mailSubtitle,
      mailRows: mailRows
    }

    // 2. Structural parameters for your Admin Template
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
      // Dispatch Copy 1: To Customer
      await emailjs.send(
        'service_di4ue46',
        'template_jjbx1xs',
        customerParams,
        'tlV8x_1C8JV1P63yT'
      )

      // Dispatch Copy 2: To Admin (info@chopras.nl)
      await emailjs.send(
        'service_di4ue46',
        'template_z546bio',
        adminParams,
        'tlV8x_1C8JV1P63yT'
      )
      console.log('Mail delivered successfully')
      setSuccess(true)

      try {
        const whatsappResponse = await fetch('https://whatsapp-0gwb.onrender.com/api/v1/send-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, phone, date, time, persons, foundVia, dob, notes }),
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
      <h3 className="text-2xl md:text-lg font-semibold text-[#06068a] mb-6 md:mb-4">Reserve Your Table</h3>
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