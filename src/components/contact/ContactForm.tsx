'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const [serviceType, setServiceType] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [eventType, setEventType] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [preferredTiming, setPreferredTiming] = useState('')
  const [numGuests, setNumGuests] = useState('')
  const [venue, setVenue] = useState('')
  const [kitchenSetup, setKitchenSetup] = useState('')
  const [vegNonVeg, setVegNonVeg] = useState('')
  const [dietaryRequirements, setDietaryRequirements] = useState('')
  const [cateringType, setCateringType] = useState('')
  const [staffRequired, setStaffRequired] = useState('')
  const [crockeryRequired, setCrockeryRequired] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function validate() {
    if (!serviceType) return 'Please select a service type.'
    if (!fullName) return 'Please enter full name.'
    if (!phone) return 'Please enter a phone number.'
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please enter a valid email.'
    if (!eventDate) return 'Please select event date.'

    if (serviceType === 'catering') {
      if (!eventType) return 'Please select event type.'
      if (!numGuests || Number(numGuests) <= 0) return 'Please enter number of guests.'
      if (!venue) return 'Please enter event location.'
      if (!vegNonVeg) return 'Please select veg/non-veg requirement.'
      if (!cateringType) return 'Please select catering type.'
    } else if (serviceType === 'feestzaal') {
      if (!eventType) return 'Please select event type.'
      if (!numGuests || Number(numGuests) <= 0) return 'Please enter number of guests.'
      if (!preferredTiming) return 'Please enter preferred timing.'
    }
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

    // 1. Build Dynamic Variables for Customer Email Template
    let mailHeader = ''
    let mailSubtitle = ''
    let mailRows = ''

    if (serviceType === 'feestzaal') {
      mailHeader = 'FEESTZAAL REPLY FORM'
      mailSubtitle = 'Thank you for your interest in our Feestzaal (Party Hall). We have successfully received your enquiry and our team is currently reviewing your requirements.'
      mailRows = `
      <tr><td style="padding: 6px 0; width: 40%;"><b>Event Type:</b></td><td style="padding: 6px 0; color: #111;">${eventType}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Event Date:</b></td><td style="padding: 6px 0; color: #111;">${eventDate}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Guests:</b></td><td style="padding: 6px 0; color: #111;">${numGuests}</td></tr>
    `
    } else if (serviceType === 'catering') {
      mailHeader = 'REPLY to CATERING FORM'
      mailSubtitle = 'Thank you for contacting Chopras Indian Restaurant. We have received your catering inquiry and are reviewing the details.'
      mailRows = `
      <tr><td style="padding: 6px 0; width: 40%;"><b>Event Type:</b></td><td style="padding: 6px 0; color: #111;">${eventType}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Event Date:</b></td><td style="padding: 6px 0; color: #111;">${eventDate}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Number of Guests:</b></td><td style="padding: 6px 0; color: #111;">${numGuests}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Event Location:</b></td><td style="padding: 6px 0; color: #111;">${venue}</td></tr>
    `
    }

    const customerParams = {
      fullName,
      email,
      mailHeader,
      mailSubtitle,
      mailRows
    }

    // 2. Build Structural Package for Admin Email Template
    let customizedAdminNotes = `Service Context: ${serviceType.toUpperCase()}\n`
    customizedAdminNotes += `Event Type: ${eventType}\n`
    customizedAdminNotes += `Event Date: ${eventDate}\n`
    customizedAdminNotes += `Expected Guest Count: ${numGuests}\n`

    if (serviceType === 'catering') {
      customizedAdminNotes += `• Venue Address: ${venue}\n`
      customizedAdminNotes += `• Kitchen Setup: ${kitchenSetup || 'N/A'}\n`
      customizedAdminNotes += `• Menu Preference: ${vegNonVeg}\n`
      customizedAdminNotes += `• Dietary Requirements: ${dietaryRequirements || 'None'}\n`
      customizedAdminNotes += `• Catering Type: ${cateringType}\n`
      customizedAdminNotes += `• Staff Required: ${staffRequired || 'No'}\n`
      customizedAdminNotes += `• Crockery Required: ${crockeryRequired || 'No'}\n`
    } else {
      customizedAdminNotes += `• Preferred Timing Window: ${preferredTiming}\n`
    }
    customizedAdminNotes += `\nAdditional Message:\n${message || 'None'}`

    const adminParams = {
      fullName,
      email,
      phone,
      date: eventDate,
      time: serviceType === 'catering' ? eventTime : preferredTiming,
      persons: numGuests,
      subject: `New ${serviceType.toUpperCase()} Request`,
      FoundVia: 'Website Contact Page',
      Source: `contact-form-${serviceType}`,
      message: customizedAdminNotes
    }

    try {
      // Fire to Customer
      await emailjs.send(
        'service_di4ue46',
        'template_jjbx1xs', // 👈 Put your Customer Template ID here
        customerParams,
        'tlV8x_1C8JV1P63yT'
      )

      // Fire to Admin Queue (info@chopras.nl)
      await emailjs.send(
        'service_di4ue46',
        'template_z546bio', // 👈 Put your Admin Template ID here
        adminParams,
        'tlV8x_1C8JV1P63yT'
      )

      setSuccess(true)

      // WhatsApp Pipeline - Send only non-null states
      try {
        const whatsappData: Record<string, any> = {}

        if (serviceType) whatsappData.serviceType = serviceType
        if (fullName) whatsappData.fullName = fullName
        if (phone) whatsappData.phone = phone
        if (email) whatsappData.email = email
        if (eventType) whatsappData.eventType = eventType
        if (eventDate) whatsappData.eventDate = eventDate
        if (eventTime) whatsappData.eventTime = eventTime
        if (preferredTiming) whatsappData.preferredTiming = preferredTiming
        if (numGuests) whatsappData.numGuests = numGuests
        if (venue) whatsappData.venue = venue
        if (kitchenSetup) whatsappData.kitchenSetup = kitchenSetup
        if (vegNonVeg) whatsappData.vegNonVeg = vegNonVeg
        if (dietaryRequirements) whatsappData.dietaryRequirements = dietaryRequirements
        if (cateringType) whatsappData.cateringType = cateringType
        if (staffRequired) whatsappData.staffRequired = staffRequired
        if (crockeryRequired) whatsappData.crockeryRequired = crockeryRequired
        if (message) whatsappData.message = message

        await fetch('https://itzankitrajput-whatsapp.hf.space/api/v1/send-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(whatsappData),
        })
      } catch (waErr) {
        console.error('WhatsApp Pipeline Fault:', waErr)
      }
      // Clear out Form States
      setServiceType('')
      setFullName('')
      setPhone('')
      setEmail('')
      setEventType('')
      setEventDate('')
      setEventTime('')
      setPreferredTiming('')
      setNumGuests('')
      setVenue('')
      setKitchenSetup('')
      setVegNonVeg('')
      setDietaryRequirements('')
      setCateringType('')
      setStaffRequired('')
      setCrockeryRequired('')
      setMessage('')
    } catch (err: any) {
      console.error('EmailJS Form Pipeline Error:', err)
      setError('Failed to submit enquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }


  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center px-4 md:px-6">
        <p className="text-[#C7A348] text-xl font-vibes">Thank you for contacting us.</p>
        <p className="text-[#1A1A1A]/70 text-sm md:text-xs mt-2">Our team will reach out to you soon.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-6">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
        {error && <div className="text-red-600 font-medium text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}

        {/* SERVICE TYPE SELECTOR */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">Select Service Type</h4>
          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Service Type *</label>
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required>
              <option value="">Select Service</option>
              <option value="catering">Catering Enquiry</option>
              <option value="feestzaal">Feestzaal Quote Enquiry</option>
            </select>
          </div>
        </div>

        {/* PERSONAL DETAILS - SHOWN FOR BOTH */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">Personal Details</h4>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Full Name *</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Phone Number *</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+31 6 12345678" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Email Address *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required />
          </div>
        </div>

        {/* EVENT DETAILS - SHOWN FOR BOTH */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">Event Details</h4>

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Event Type *</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required>
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
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required />
          </div>

          {serviceType === 'catering' && (
            <div>
              <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Event Time</label>
              <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
          )}

          {serviceType === 'feestzaal' && (
            <div>
              <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Preferred Timing *</label>
              <input type="text" value={preferredTiming} onChange={(e) => setPreferredTiming(e.target.value)} placeholder="e.g., 6:00 PM - 10:00 PM" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required={serviceType === 'feestzaal'} />
            </div>
          )}

          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{serviceType === 'feestzaal' ? 'Expected' : 'Number of'} Guests *</label>
            <input type="number" min={1} value={numGuests} onChange={(e) => setNumGuests(e.target.value)} placeholder="Number of guests" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required />
          </div>
        </div>

        {/* CATERING-SPECIFIC FIELDS */}
        {serviceType === 'catering' && (
          <>
            {/* VENUE DETAILS */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">Venue Details</h4>

              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Event Location / Address *</label>
                <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Event location or full address" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required />
              </div>

              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Kitchen Setup Available?</label>
                <select value={kitchenSetup} onChange={(e) => setKitchenSetup(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]">
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Not Sure</option>
                </select>
              </div>
            </div>

            {/* FOOD PREFERENCES */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">Food Preferences</h4>

              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Veg / Non-Veg Requirement *</label>
                <select value={vegNonVeg} onChange={(e) => setVegNonVeg(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required>
                  <option value="">Select</option>
                  <option>Vegetarian Only</option>
                  <option>Non-Vegetarian Only</option>
                  <option>Mix (Both)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Special Dietary Requirements</label>
                <input type="text" value={dietaryRequirements} onChange={(e) => setDietaryRequirements(e.target.value)} placeholder="Vegan, Gluten-Free, Allergies etc." className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>

            {/* SERVICE REQUIREMENTS */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">Service Requirements</h4>

              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">Catering Type *</label>
                <select value={cateringType} onChange={(e) => setCateringType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]" required>
                  <option value="">Select Catering Type</option>
                  <option>Buffet</option>
                  <option>Drop-off Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Staff Required?</label>
                <select value={staffRequired} onChange={(e) => setStaffRequired(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]">
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">Crockery & Setup Required?</label>
                <select value={crockeryRequired} onChange={(e) => setCrockeryRequired(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]">
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* ADDITIONAL NOTES */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-md text-[#1A1A1A] mb-4">Additional Notes</h4>

          <div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder={serviceType === 'feestzaal' ? 'Any special requests or additional information' : 'Any special requests or additional information'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#D4AF37] resize-none" />
          </div>
        </div>

        <div>
          <button type="submit" disabled={submitting} className="w-full bg-[#1B2B5E] text-white rounded-lg px-4 py-3 md:py-2 text-base md:text-base font-medium hover:bg-[#0F1F4B] transition-colors disabled:opacity-50 mt-4">
            {submitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}