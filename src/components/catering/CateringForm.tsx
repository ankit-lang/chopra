'use client'
import { type Locale } from '@/lib/useTranslations'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function CateringForm({ locale = 'en' }: { locale?: Locale }) {
  const isNl = locale === 'nl'
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
    if (!fullName.trim()) return isNl ? 'Vul alstublieft uw volledige naam in.' : 'Please enter your full name.'
    if (!phone.trim()) return isNl ? 'Vul alstublieft uw telefoonnummer in.' : 'Please enter your phone number.'
    if (!email.trim() || !email.includes('@')) return isNl ? 'Vul alstublieft een geldig e-mailadres in.' : 'Please enter a valid email address.'
    if (!eventType) return isNl ? 'Selecteer alstublieft een type evenement.' : 'Please select an event type.'
    if (!eventDate) return isNl ? 'Selecteer alstublieft de datum van het evenement.' : 'Please select an event date.'
    if (!numGuests || Number(numGuests) < 1) return isNl ? 'Vul een geldig aantal gasten in.' : 'Please enter a valid number of guests.'
    if (!venue.trim()) return isNl ? 'Vul alstublieft de locatie of het adres in.' : 'Please enter the event location or address.'
    if (!vegNonVeg) return isNl ? 'Selecteer alstublieft uw voorkeur voor vegetarisch/non-vegetarisch.' : 'Please select your veg/non-veg preference.'
    if (!cateringType) return isNl ? 'Selecteer alstublieft het type catering.' : 'Please select a catering type.'
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
    const mailHeader = 'CATERING ENQUIRY RECEIVED!'
    const mailSubtitle = 'Thank you for contacting Chopras Indian Restaurant regarding your catering request. Our team is currently reviewing your event details.'
    const mailRows = `
      <tr><td style="padding: 6px 0; width: 40%;"><b>Full Name:</b></td><td style="padding: 6px 0; color: #111;">${fullName}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Phone Number:</b></td><td style="padding: 6px 0; color: #111;">${phone}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Email Address:</b></td><td style="padding: 6px 0; color: #111;">${email}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Event Type:</b></td><td style="padding: 6px 0; color: #111;">${eventType}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Event Date:</b></td><td style="padding: 6px 0; color: #111;">${eventDate}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Event Time:</b></td><td style="padding: 6px 0; color: #111;">${eventTime || 'N/A'}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Number of Guests:</b></td><td style="padding: 6px 0; color: #111;">${numGuests}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Location / Address:</b></td><td style="padding: 6px 0; color: #111;">${venue}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Kitchen Setup:</b></td><td style="padding: 6px 0; color: #111;">${kitchenSetup || 'N/A'}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Food Preference:</b></td><td style="padding: 6px 0; color: #111;">${vegNonVeg}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Dietary Requirements:</b></td><td style="padding: 6px 0; color: #111;">${dietaryRequirements || 'None'}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Catering Type:</b></td><td style="padding: 6px 0; color: #111;">${cateringType}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Staff Required:</b></td><td style="padding: 6px 0; color: #111;">${staffRequired || 'N/A'}</td></tr>
      <tr><td style="padding: 6px 0;"><b>Crockery Required:</b></td><td style="padding: 6px 0; color: #111;">${crockeryRequired || 'N/A'}</td></tr>
      ${additionalNotes ? `<tr><td style="padding: 6px 0;"><b>Additional Notes:</b></td><td style="padding: 6px 0; color: #111;">${additionalNotes}</td></tr>` : ''}
    `

    const templateParams = {
      customer_name: fullName,
      customer_email: email,
      customer_phone: phone,
      event_type: eventType,
      event_date: eventDate,
      event_time: eventTime || 'N/A',
      num_guests: numGuests,
      venue: venue,
      service_type: 'Catering Enquiry',
      mail_header: mailHeader,
      mail_subtitle: mailSubtitle,
      mail_rows: mailRows,
      kitchen_setup: kitchenSetup || 'N/A',
      veg_non_veg: vegNonVeg,
      dietary_requirements: dietaryRequirements || 'None',
      catering_type: cateringType,
      staff_required: staffRequired || 'N/A',
      crockery_required: crockeryRequired || 'N/A',
      additional_notes: additionalNotes || 'None'
    }

    try {
      // Send Auto-Reply to Customer
      await emailjs.send(
        'service_h7g2zls',
        'template_jjbx1xs',
        templateParams,
        'X4zEaO59vJ2l3L64E'
      )

      // Send Alert to Admin
      await emailjs.send(
        'service_h7g2zls',
        'template_z546bio',
        templateParams,
        'X4zEaO59vJ2l3L64E'
      )

      fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Catering Enquiry', payload: templateParams })
      }).catch(err => console.error(err))

      // Trigger WhatsApp Pipeline Lead API
      fetch('https://whatsapp-0gwb.onrender.com/api/v1/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone,
          name: fullName,
          email: email,
          formType: 'Catering Enquiry',
          eventDate: eventDate,
          eventTime: eventTime || 'N/A',
          numGuests: numGuests,
          venue: venue,
          serviceType: 'Catering Enquiry',
          eventType: eventType,
          cateringType: cateringType,
          vegNonVeg: vegNonVeg,
          additionalNotes: additionalNotes || ''
        })
      })
      .then(res => res.json())
      .then(data => console.log('WhatsApp Lead Response:', data))
      .catch(err => console.error('WhatsApp Lead Error:', err))

      setSuccess(true)
      // Reset form
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
      setError(isNl ? 'Verzenden mislukt. Probeer het opnieuw.' : 'Failed to submit enquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-6 text-left">
      <h3 className="text-2xl md:text-xl font-semibold text-white mb-3 text-center md:text-left">
        {isNl ? 'Catering Aanvraag' : 'Catering Enquiry'}
      </h3>
      <p className="text-sm md:text-base text-white/90 mb-6 text-center md:text-left">
        {isNl
          ? 'Bedankt voor uw interesse in onze cateringdiensten. Deel de volgende gegevens zodat ons team u zo goed mogelijk van dienst kan zijn.'
          : 'Thank you for your interest in our catering services. Kindly share the following details so our team can assist you better.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
        {/* PERSONAL DETAILS */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-base md:text-sm text-white mb-4">
            {isNl ? 'Persoonlijke Gegevens' : 'Personal Details'}
          </h4>

          <div>
            <label className="block text-sm font-medium text-white mb-2">{isNl ? 'Volledige Naam *' : 'Full Name *'}</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={isNl ? 'Volledige Naam' : 'Full Name'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'Telefoonnummer *' : 'Phone Number *'}</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+31 6 12345678" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'E-mailadres *' : 'Email Address *'}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isNl ? 'E-mailadres' : 'Email'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required />
          </div>
        </div>

        {/* EVENT DETAILS */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-base md:text-sm text-white mb-4">
            {isNl ? 'Evenement Details' : 'Event Details'}
          </h4>

          <div>
            <label className="block text-sm font-medium text-white mb-2">{isNl ? 'Type Evenement *' : 'Event Type *'}</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required>
              <option value="">{isNl ? 'Selecteer Type Evenement' : 'Select Event Type'}</option>
              <option>{isNl ? 'Bruiloft' : 'Wedding'}</option>
              <option>{isNl ? 'Verjaardag' : 'Birthday'}</option>
              <option>{isNl ? 'Zakelijk' : 'Corporate'}</option>
              <option>{isNl ? 'Thuisfeest' : 'House Party'}</option>
              <option>{isNl ? 'Anders' : 'Other'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'Datum Evenement *' : 'Event Date *'}</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'Tijd Evenement' : 'Event Time'}</label>
            <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'Aantal Gasten *' : 'Number of Guests *'}</label>
            <input type="number" min={1} value={numGuests} onChange={(e) => setNumGuests(e.target.value)} placeholder={isNl ? 'Aantal gasten' : 'Number of guests'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required />
          </div>
        </div>

        {/* VENUE DETAILS */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-base md:text-sm text-white mb-4">
            {isNl ? 'Locatie Details' : 'Venue Details'}
          </h4>

          <div>
            <label className="block text-sm font-medium text-white mb-2">{isNl ? 'Locatie / Adres Evenement *' : 'Event Location/Address *'}</label>
            <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder={isNl ? 'Locatie of volledig adres' : 'Event location or full address'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'Keuken Voorzieningen Aanwezig?' : 'Kitchen Setup Available?'}</label>
            <select value={kitchenSetup} onChange={(e) => setKitchenSetup(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white">
              <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
              <option>{isNl ? 'Ja' : 'Yes'}</option>
              <option>{isNl ? 'Nee' : 'No'}</option>
              <option>{isNl ? 'Niet Zeker' : 'Not Sure'}</option>
            </select>
          </div>
        </div>

        {/* FOOD PREFERENCES */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-base md:text-sm text-white mb-4">
            {isNl ? 'Maaltijd Voorkeuren' : 'Food Preferences'}
          </h4>

          <div>
            <label className="block text-sm font-medium text-white mb-2">{isNl ? 'Veg/Non-Veg Voorkeur *' : 'Veg/Non-Veg Requirement *'}</label>
            <select value={vegNonVeg} onChange={(e) => setVegNonVeg(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required>
              <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
              <option>{isNl ? 'Alleen Vegetarisch' : 'Vegetarian Only'}</option>
              <option>{isNl ? 'Alleen Non-Vegetarisch' : 'Non-Vegetarian Only'}</option>
              <option>{isNl ? 'Mix (Beide)' : 'Mix (Both)'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'Speciale Dieetwensen' : 'Special Dietary Requirements'}</label>
            <input type="text" value={dietaryRequirements} onChange={(e) => setDietaryRequirements(e.target.value)} placeholder={isNl ? 'Veganistisch, Glutenvrij, Allergieën etc.' : 'Vegan, Gluten-Free, Allergies etc.'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" />
          </div>
        </div>

        {/* SERVICE REQUIREMENTS */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-base md:text-sm text-white mb-4">
            {isNl ? 'Service Vereisten' : 'Service Requirements'}
          </h4>

          <div>
            <label className="block text-sm font-medium text-white mb-2">{isNl ? 'Catering Type *' : 'Catering Type *'}</label>
            <select value={cateringType} onChange={(e) => setCateringType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white" required>
              <option value="">{isNl ? 'Selecteer Catering Type' : 'Select Catering Type'}</option>
              <option>{isNl ? 'Buffet' : 'Buffet'}</option>
              <option>{isNl ? 'Alleen Bezorgen' : 'Drop-off Only'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'Bediening Nodig?' : 'Staff Required?'}</label>
            <select value={staffRequired} onChange={(e) => setStaffRequired(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white">
              <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
              <option>{isNl ? 'Ja' : 'Yes'}</option>
              <option>{isNl ? 'Nee' : 'No'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">{isNl ? 'Servies & Opbouw Nodig?' : 'Crockery & Setup Required?'}</label>
            <select value={crockeryRequired} onChange={(e) => setCrockeryRequired(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white">
              <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
              <option>{isNl ? 'Ja' : 'Yes'}</option>
              <option>{isNl ? 'Nee' : 'No'}</option>
            </select>
          </div>
        </div>

        {/* ADDITIONAL NOTES */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-base md:text-sm text-white mb-4">
            {isNl ? 'Aanvullende Opmerkingen / Verzoeken' : 'Additional Notes / Special Requests'}
          </h4>

          <div>
            <textarea value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} rows={4} placeholder={isNl ? 'Eventuele speciale verzoeken of extra informatie' : 'Any special requests or additional information'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-white resize-none" />
          </div>
        </div>

        {error && <div className="text-red-600 font-medium text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}
        {success && <div className="text-green-700 font-medium bg-green-50 p-4 rounded-lg text-sm border border-green-200">
          {isNl ? (
            <>Uw catering aanvraag is succesvol verzonden! <br />Ons team neemt binnenkort contact met u op om uw wensen te bespreken. <br />Bedankt voor het kiezen van Chopras Indian Restaurant!</>
          ) : (
            <>Your catering enquiry has been submitted successfully! <br />Our team will contact you soon to discuss your event details. <br />Thank you for choosing Chopras Indian Restaurant!</>
          )}
        </div>}

        <div>
          <button type="submit" disabled={submitting} className="w-full btn-gradient text-white rounded-full px-6 py-3.5 text-base font-semibold uppercase tracking-wider transition-all disabled:opacity-50 mt-4 shadow-md hover:scale-[1.01] active:scale-[0.98]">
            {submitting ? (isNl ? 'Verzenden...' : 'Sending...') : (isNl ? 'Verstuur Catering Aanvraag' : 'Submit Enquiry')}
          </button>
        </div>
      </form>
    </div>
  )
}
