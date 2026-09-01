'use client'

import { type Locale } from '@/lib/useTranslations'
import { useState } from 'react'

export default function ContactForm({ locale = 'en' }: { locale?: Locale }) {
  const isNl = locale === 'nl'
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
    if (!serviceType) return isNl ? 'Selecteer alstublieft een dienst.' : 'Please select a service type.'
    if (!fullName.trim()) return isNl ? 'Vul alstublieft uw volledige naam in.' : 'Please enter full name.'
    if (!phone.trim()) return isNl ? 'Vul alstublieft uw telefoonnummer in.' : 'Please enter a phone number.'
    if (!email.trim() || !email.includes('@')) return isNl ? 'Vul alstublieft een geldig e-mailadres in.' : 'Please enter a valid email.'
    if (!eventDate) return isNl ? 'Selecteer alstublieft de datum van het evenement.' : 'Please select event date.'

    if (serviceType === 'catering') {
      if (!eventType) return isNl ? 'Selecteer alstublieft het type evenement.' : 'Please select event type.'
      if (!numGuests || Number(numGuests) <= 0) return isNl ? 'Vul het aantal gasten in.' : 'Please enter number of guests.'
      if (!venue.trim()) return isNl ? 'Vul de locatie in.' : 'Please enter event location.'
      if (!vegNonVeg) return isNl ? 'Selecteer vegetarisch/non-vegetarisch voorkeur.' : 'Please select veg/non-veg requirement.'
      if (!cateringType) return isNl ? 'Selecteer het type catering.' : 'Please select catering type.'
    } else if (serviceType === 'feestzaal') {
      if (!eventType) return isNl ? 'Selecteer alstublieft het type evenement.' : 'Please select event type.'
      if (!numGuests || Number(numGuests) <= 0) return isNl ? 'Vul het aantal verwachte gasten in.' : 'Please enter number of guests.'
      if (!preferredTiming.trim()) return isNl ? 'Vul uw gewenste tijden in.' : 'Please enter preferred timing.'
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

    // Build admin notes
    let customizedAdminNotes = `Service Context: ${serviceType.toUpperCase()}\n`
    customizedAdminNotes += `Event Type: ${eventType}\n`
    customizedAdminNotes += `Event Date: ${eventDate}\n`
    customizedAdminNotes += `Expected Guest Count: ${numGuests}\n`

    if (serviceType === 'catering') {
      customizedAdminNotes += `• Venue Address: ${venue}\n`
      customizedAdminNotes += `• Kitchen Setup: ${kitchenSetup || 'N/A'}\n`
      customizedAdminNotes += `• Food Preference: ${vegNonVeg}\n`
      customizedAdminNotes += `• Dietary Needs: ${dietaryRequirements || 'None'}\n`
      customizedAdminNotes += `• Catering Style: ${cateringType}\n`
      customizedAdminNotes += `• Staff Requested: ${staffRequired || 'N/A'}\n`
      customizedAdminNotes += `• Crockery Requested: ${crockeryRequired || 'N/A'}\n`
    } else if (serviceType === 'feestzaal') {
      customizedAdminNotes += `• Preferred Timing: ${preferredTiming}\n`
    }

    if (message) {
      customizedAdminNotes += `• Additional Notes: ${message}\n`
    }

    const adminParams = {
      fullName,
      phone,
      email,
      serviceType: serviceType === 'feestzaal' ? 'Party Hall Enquiry' : 'Catering Request',
      eventDate,
      eventTime: preferredTiming || eventTime || 'Not Specified',
      numGuests,
      venue: venue || 'Chopras Leyweg Event Hall',
      additionalNotes: customizedAdminNotes
    }

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: serviceType === 'feestzaal' ? 'Party Hall Enquiry' : 'Catering Request',
          payload: adminParams
        })
      })

      const resData = await res.json()
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to submit enquiry')
      }

      fetch('/api/whatsapp/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone,
          name: fullName,
          email: email,
          formType: serviceType === 'feestzaal' ? 'Feestzaal Quote' : 'Contact Catering Form',
          eventDate: eventDate,
          eventTime: preferredTiming || eventTime || 'N/A',
          numGuests: numGuests,
          venue: venue || 'Chopras Leyweg Event Hall',
          serviceType: serviceType,
          eventType: eventType,
          additionalNotes: message || ''
        })
      }).catch(err => console.error(err))

      setSuccess(true)
      setServiceType(''); setFullName(''); setPhone(''); setEmail(''); setEventType('')
      setEventDate(''); setEventTime(''); setPreferredTiming(''); setNumGuests('')
      setVenue(''); setKitchenSetup(''); setVegNonVeg(''); setDietaryRequirements('')
      setCateringType(''); setStaffRequired(''); setCrockeryRequired(''); setMessage('')
    } catch (err: any) {
      setError(isNl ? 'Verzenden mislukt. Probeer het opnieuw.' : 'Failed to submit enquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center px-4 md:px-6">
        <p className="text-[#06068a] text-xl font-bold font-heading">
          {isNl ? 'Bedankt voor uw bericht.' : 'Thank you for contacting us.'}
        </p>
        <p className="text-[#1A1A1A]/70 text-sm md:text-base mt-2">
          {isNl ? 'Ons team neemt binnenkort contact met u op.' : 'Our team will reach out to you soon.'}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-6 text-left">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
        {error && <div className="text-red-600 font-medium text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">
            {isNl ? 'Selecteer Type Dienst' : 'Select Service Type'}
          </h4>
          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">
              {isNl ? 'Dienst *' : 'Service Type *'}
            </label>
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required>
              <option value="">{isNl ? 'Selecteer Dienst' : 'Select Service'}</option>
              <option value="catering">{isNl ? 'Catering Aanvraag' : 'Catering Enquiry'}</option>
              <option value="feestzaal">{isNl ? 'Feestzaal Offerte Aanvraag' : 'Feestzaal Quote Enquiry'}</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">
            {isNl ? 'Persoonlijke Gegevens' : 'Personal Details'}
          </h4>
          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">{isNl ? 'Volledige Naam *' : 'Full Name *'}</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={isNl ? 'Volledige Naam' : 'Full Name'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required />
          </div>
          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'Telefoonnummer *' : 'Phone Number *'}</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+31 6 12345678" className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required />
          </div>
          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'E-mailadres *' : 'Email Address *'}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isNl ? 'E-mailadres' : 'Email'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">
            {isNl ? 'Evenement Details' : 'Event Details'}
          </h4>
          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">{isNl ? 'Type Evenement *' : 'Event Type *'}</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required>
              <option value="">{isNl ? 'Selecteer Type Evenement' : 'Select Event Type'}</option>
              <option>{isNl ? 'Bruiloft' : 'Wedding'}</option>
              <option>{isNl ? 'Verjaardag' : 'Birthday'}</option>
              <option>{isNl ? 'Zakelijk' : 'Corporate'}</option>
              <option>{isNl ? 'Thuisfeest' : 'House Party'}</option>
              <option>{isNl ? 'Anders' : 'Other'}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'Datum Evenement *' : 'Event Date *'}</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required />
          </div>
          {serviceType === 'catering' && (
            <div>
              <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'Tijd Evenement' : 'Event Time'}</label>
              <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" />
            </div>
          )}
          {serviceType === 'feestzaal' && (
            <div>
              <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'Gewenste Tijden *' : 'Preferred Timing *'}</label>
              <input type="text" value={preferredTiming} onChange={(e) => setPreferredTiming(e.target.value)} placeholder={isNl ? 'bijv. 18:00 - 22:00' : 'e.g., 6:00 PM - 10:00 PM'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required={serviceType === 'feestzaal'} />
            </div>
          )}
          <div>
            <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">
              {serviceType === 'feestzaal' ? (isNl ? 'Verwacht Aantal Gasten *' : 'Expected Guests *') : (isNl ? 'Aantal Gasten *' : 'Number of Guests *')}
            </label>
            <input type="number" min={1} value={numGuests} onChange={(e) => setNumGuests(e.target.value)} placeholder={isNl ? 'Aantal gasten' : 'Number of guests'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required />
          </div>
        </div>

        {serviceType === 'catering' && (
          <>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">{isNl ? 'Locatie Details' : 'Venue Details'}</h4>
              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">{isNl ? 'Locatie / Adres Evenement *' : 'Event Location / Address *'}</label>
                <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder={isNl ? 'Locatie of volledig adres' : 'Event location or full address'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required />
              </div>
              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'Keuken Voorzieningen Aanwezig?' : 'Kitchen Setup Available?'}</label>
                <select value={kitchenSetup} onChange={(e) => setKitchenSetup(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]">
                  <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
                  <option>{isNl ? 'Ja' : 'Yes'}</option><option>{isNl ? 'Nee' : 'No'}</option><option>{isNl ? 'Niet Zeker' : 'Not Sure'}</option>
                </select>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">{isNl ? 'Maaltijd Voorkeuren' : 'Food Preferences'}</h4>
              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">{isNl ? 'Veg / Non-Veg Voorkeur *' : 'Veg / Non-Veg Requirement *'}</label>
                <select value={vegNonVeg} onChange={(e) => setVegNonVeg(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required>
                  <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
                  <option>{isNl ? 'Alleen Vegetarisch' : 'Vegetarian Only'}</option>
                  <option>{isNl ? 'Alleen Non-Vegetarisch' : 'Non-Vegetarian Only'}</option>
                  <option>{isNl ? 'Mix (Beide)' : 'Mix (Both)'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'Speciale Dieetwensen' : 'Special Dietary Requirements'}</label>
                <input type="text" value={dietaryRequirements} onChange={(e) => setDietaryRequirements(e.target.value)} placeholder={isNl ? 'Veganistisch, Glutenvrij, Allergieën etc.' : 'Vegan, Gluten-Free, Allergies etc.'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" />
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-sm text-[#1A1A1A] mb-4">{isNl ? 'Service Vereisten' : 'Service Requirements'}</h4>
              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2">{isNl ? 'Catering Type *' : 'Catering Type *'}</label>
                <select value={cateringType} onChange={(e) => setCateringType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]" required>
                  <option value="">{isNl ? 'Selecteer Catering Type' : 'Select Catering Type'}</option>
                  <option>{isNl ? 'Buffet' : 'Buffet'}</option>
                  <option>{isNl ? 'Alleen Bezorgen' : 'Drop-off Only'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'Bediening Nodig?' : 'Staff Required?'}</label>
                <select value={staffRequired} onChange={(e) => setStaffRequired(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]">
                  <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
                  <option>{isNl ? 'Ja' : 'Yes'}</option><option>{isNl ? 'Nee' : 'No'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm md:text-xs font-medium text-[#1A1A1A]/70 mb-2 mt-4">{isNl ? 'Servies & Opbouw Nodig?' : 'Crockery & Setup Required?'}</label>
                <select value={crockeryRequired} onChange={(e) => setCrockeryRequired(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a]">
                  <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
                  <option>{isNl ? 'Ja' : 'Yes'}</option><option>{isNl ? 'Nee' : 'No'}</option>
                </select>
              </div>
            </div>
          </>
        )}

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-md text-[#1A1A1A] mb-4">{isNl ? 'Aanvullende Opmerkingen' : 'Additional Notes'}</h4>
          <div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder={isNl ? 'Eventuele speciale verzoeken of extra informatie' : 'Any special requests or additional information'} className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm text-[#111] focus:outline-none focus:border-[#06068a] resize-none" />
          </div>
        </div>

        <div>
          <button type="submit" disabled={submitting} className="w-full bg-[#06068a] text-white rounded-lg px-4 py-3 md:py-2 text-base font-medium hover:bg-[#0000B3] transition-colors disabled:opacity-50 mt-4">
            {submitting ? (isNl ? 'Verzenden...' : 'Sending...') : (isNl ? 'Versturen' : 'Submit')}
          </button>
        </div>
      </form>
    </div>
  )
}