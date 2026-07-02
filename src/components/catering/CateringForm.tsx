'use client'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function CateringForm() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [eventType, setEventType] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [numGuests, setNumGuests] = useState('')
  const [venue, setVenue] = useState('')
  const [kitchenSetup, setKitchenSetup] = useState('')
  const [vegNonVeg, setVegNonVeg] = useState('')
  const [dietaryRequirements, setDietaryRequirements] = useState('')
  const [cateringType, setCateringType] = useState('')
  const [staffRequired, setStaffRequired] = useState('')
  const [crockeryRequired, setCrockeryRequired] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function validate() {
    if (!fullName) return 'Please enter full name.'
    if (!phone) return 'Please enter a phone number.'
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please enter a valid email.'
    if (!eventType) return 'Please select event type.'
    if (!eventDate) return 'Please select event date.'
    if (!numGuests || Number(numGuests) <= 0) return 'Please enter number of guests.'
    if (!venue) return 'Please enter event location.'
    if (!vegNonVeg) return 'Please select veg/non-veg requirement.'
    if (!cateringType) return 'Please select catering type.'
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

    const templateParams = {
      fullName,
      phone,
      email,
      eventType,
      eventDate,
      eventTime,
      numGuests,
      venue,
      kitchenSetup,
      vegNonVeg,
      dietaryRequirements,
      cateringType,
      staffRequired,
      crockeryRequired,
      additionalNotes,
      source: 'website-catering-form',
    }

    try {
      await emailjs.send(
        'service_di4ue46',
        'template_z546bio',
        templateParams,
        'tlV8x_1C8JV1P63yT'
      )

      setSuccess(true)

      setFullName('')
      setPhone('')
      setEmail('')
      setEventType('')
      setEventDate('')
      setEventTime('')
      setNumGuests('')
      setVenue('')
      setKitchenSetup('')
      setVegNonVeg('')
      setDietaryRequirements('')
      setCateringType('')
      setStaffRequired('')
      setCrockeryRequired('')
      setAdditionalNotes('')

    } catch (err: any) {
      console.error('EmailJS Execution Error:', err)
      setError('Failed to submit enquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-6">
      <h3 className="text-2xl md:text-lg font-semibold mb-6 md:mb-4">Catering Enquiry</h3>
      <p className="text-sm md:text-xs text-[#1A1A1A]/70 mb-6">Thank you for your interest in our catering services. Kindly share the following details so our team can assist you better.</p>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
        {/* PERSONAL DETAILS */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm md:text-xs text-[#1A1A1A] mb-4">Personal Details</h4>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Full Name *</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Phone Number *</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+31 6 12345678" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Email Address *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
          </div>
        </div>

        {/* EVENT DETAILS */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm md:text-xs text-[#1A1A1A] mb-4">Event Details</h4>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Event Type *</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required>
              <option value="">Select Event Type</option>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Corporate</option>
              <option>House Party</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Event Date *</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Event Time</label>
            <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Number of Guests *</label>
            <input type="number" min={1} value={numGuests} onChange={(e) => setNumGuests(e.target.value)} placeholder="Number of guests" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
          </div>
        </div>

        {/* VENUE DETAILS */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm md:text-xs text-[#1A1A1A] mb-4">Venue Details</h4>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Event Location/Address *</label>
            <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Event location or full address" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Kitchen Setup Available?</label>
            <select value={kitchenSetup} onChange={(e) => setKitchenSetup(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>Not Sure</option>
            </select>
          </div>
        </div>

        {/* FOOD PREFERENCES */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm md:text-xs text-[#1A1A1A] mb-4">Food Preferences</h4>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Veg/Non-Veg Requirement *</label>
            <select value={vegNonVeg} onChange={(e) => setVegNonVeg(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required>
              <option value="">Select</option>
              <option>Vegetarian Only</option>
              <option>Non-Vegetarian Only</option>
              <option>Mix (Both)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Special Dietary Requirements</label>
            <input type="text" value={dietaryRequirements} onChange={(e) => setDietaryRequirements(e.target.value)} placeholder="Vegan, Gluten-Free, Allergies etc." className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" />
          </div>
        </div>

        {/* SERVICE REQUIREMENTS */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm md:text-xs text-[#1A1A1A] mb-4">Service Requirements</h4>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Catering Type *</label>
            <select value={cateringType} onChange={(e) => setCateringType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white" required>
              <option value="">Select Catering Type</option>
              <option>Buffet</option>
              <option>Drop-off Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Staff Required?</label>
            <select value={staffRequired} onChange={(e) => setStaffRequired(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Crockery & Setup Required?</label>
            <select value={crockeryRequired} onChange={(e) => setCrockeryRequired(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        {/* ADDITIONAL NOTES */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm md:text-xs text-[#1A1A1A] mb-4">Additional Notes / Special Requests</h4>

          <div>
            <textarea value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} rows={4} placeholder="Any special requests or additional information" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-white resize-none" />
          </div>
        </div>

        {error && <div className="text-red-600 font-medium text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}
        {success && <div className="text-green-700 font-medium bg-green-50 p-4 rounded-lg text-sm border border-green-200">Your catering enquiry has been submitted successfully! <br />
          Our team will contact you soon to discuss your event details.
          <br /> Thank you for choosing Chopras Indian Restaurant!</div>}

        <div>
          <button type="submit" disabled={submitting} className="w-full bg-[#1B2B5E] text-white rounded-lg px-4 py-3 md:py-2 text-base md:text-base font-medium hover:bg-[#0F1F4B] transition-colors disabled:opacity-50 mt-4">
            {submitting ? 'Sending...' : 'Submit Enquiry'}
          </button>
        </div>
      </form>
    </div>
  )
}
