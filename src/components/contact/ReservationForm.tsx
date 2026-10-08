'use client'

import { useState } from 'react'
import Image from 'next/image'
import { isMondayInAmsterdam, getTodayAmsterdamDate } from '@/lib/openingHours'
import { RESTAURANT } from '@/lib/constants'

interface ReservationFormProps {
  locale?: 'en' | 'nl'
}

export default function ReservationForm({ locale = 'en' }: ReservationFormProps) {
  const isNl = locale === 'nl'
  const [activeTab, setActiveTab] = useState<'thefork' | 'direct'>('thefork')

  // Form states
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

  const minDate = getTodayAmsterdamDate()
  const timeOptions = ['16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

  function handleDateChange(val: string) {
    setDate(val)
    if (isMondayInAmsterdam(val)) {
      setError(
        isNl
          ? 'Wij zijn op maandag gesloten (Nederlandse tijd). Selecteer a.u.b. een andere datum van dinsdag t/m zondag.'
          : 'We are closed on Mondays (Netherlands time). Please select another date from Tuesday to Sunday.'
      )
    } else if (error?.includes('closed on Mondays') || error?.includes('gesloten op maandag')) {
      setError(null)
    }
  }

  function validate() {
    if (!date) return isNl ? 'Selecteer een datum.' : 'Please select a date.'
    if (isMondayInAmsterdam(date)) {
      return isNl
        ? 'Wij zijn op maandag gesloten (Nederlandse tijd). Selecteer a.u.b. een andere datum van dinsdag t/m zondag.'
        : 'We are closed on Mondays (Netherlands time). Please select another date from Tuesday to Sunday.'
    }
    if (!time) return isNl ? 'Selecteer een tijd.' : 'Please select a time.'
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return isNl ? 'Vul een geldig e-mailadres in.' : 'Please enter a valid email.'
    }
    if (!fullName) return isNl ? 'Vul uw volledige naam in.' : 'Please enter full name.'
    if (!phone) return isNl ? 'Vul uw telefoonnummer in.' : 'Please enter a phone number.'
    if (!persons || Number(persons) <= 0) return isNl ? 'Vul het aantal personen in.' : 'Please enter number of persons.'
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
        const whatsappResponse = await fetch('/api/whatsapp/send-lead', {
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
      setError(isNl ? 'Reservering mislukt. Probeer het opnieuw.' : 'Failed to submit reservation. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const theforkUrl = RESTAURANT.social.theforkWidget || 'https://widget.thefork.com/en/1b30051f-4e07-4fe9-8386-b9a1501fdf2a?step=date'
  const googleReserveUrl = RESTAURANT.social.googleReserve || 'https://www.google.com/maps/reserve/v/dine/c/BqdcA6F1JOY'

  return (
    <div className="w-full max-w-2xl mx-auto px-1 md:px-2 py-2">
      
      {/* MINIMAL METHOD SELECTION TABS */}
      <div className="bg-gray-100/80 p-1.5 rounded-2xl mb-6 flex flex-col sm:flex-row gap-2 border border-gray-200/80">
        <button
          type="button"
          onClick={() => setActiveTab('thefork')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2.5 ${
            activeTab === 'thefork'
              ? 'bg-white text-[#06068a] shadow-xs font-semibold border border-gray-200'
              : 'text-gray-600 hover:text-[#06068a]'
          }`}
        >
          <Image
            src="/thefork-logo.png"
            alt="TheFork"
            width={20}
            height={20}
            className="rounded-md object-contain shrink-0"
          />
          <span>{isNl ? 'Boeken via TheFork' : 'Book via TheFork'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('direct')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'direct'
              ? 'bg-white text-[#06068a] shadow-xs font-semibold border border-gray-200'
              : 'text-gray-600 hover:text-[#06068a]'
          }`}
        >
          <span className="text-base">📋</span>
          <span>{isNl ? 'Boeken via Website' : 'Book via Website'}</span>
        </button>
      </div>

      {/* MINIMAL THE FORK RESERVATION CARD */}
      <div className={`transition-all duration-300 ${activeTab === 'thefork' ? 'block' : 'hidden'}`}>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 text-center shadow-xs mb-6">
          
          <div className="w-16 h-16 mx-auto mb-4 p-2 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <Image
              src="/thefork-logo.png"
              alt="TheFork Logo"
              width={48}
              height={48}
              className="rounded-xl object-contain"
            />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-[#06068a] mb-2">
            {isNl ? 'Reserveer via TheFork' : 'Reserve via TheFork'}
          </h3>

          <p className="text-gray-500 text-xs md:text-sm mb-6 max-w-md mx-auto">
            {isNl
              ? 'Klik hieronder om direct uw tafel te boeken op het officiële TheFork platform.'
              : 'Click below to book your table directly on the official TheFork platform.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={theforkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#004F32] hover:bg-[#003823] text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors shadow-xs"
            >
              <Image src="/thefork-logo.png" alt="TheFork" width={20} height={20} className="rounded-md shrink-0" />
              <span>{isNl ? 'Tafel Reserveren via TheFork' : 'Book Table on TheFork'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            <a
              href={googleReserveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-5 py-3.5 rounded-xl text-xs md:text-sm transition-colors"
            >
              <span>Google Reserve</span>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>

        {/* Alternative prompt */}
        <div className="text-center py-1">
          <p className="text-xs text-gray-500">
            {isNl ? 'Liever ons eigen aanvraagformulier invullen?' : 'Prefer to submit a direct enquiry form instead?'}{' '}
            <button
              type="button"
              onClick={() => setActiveTab('direct')}
              className="text-[#06068a] font-semibold underline hover:text-[#0000B3]"
            >
              {isNl ? 'Klik hier voor het formulier' : 'Click here for direct form'}
            </button>
          </p>
        </div>
      </div>

      {/* DIRECT WEBSITE FORM */}
      <div className={`transition-all duration-300 ${activeTab === 'direct' ? 'block' : 'hidden'}`}>
        
        {/* Free Private Parking Notice */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 mb-6 flex items-start gap-3 text-left">
          <div className="w-7 h-7 rounded-full bg-[#06068a] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            🅿️
          </div>
          <div>
            <h4 className="text-[#06068a] font-bold text-sm">
              {isNl ? 'Gratis Privé Parkeren Na 18:00 Uur' : 'Free Private Parking After 6:00 PM'}
            </h4>
            <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
              {isNl
                ? 'Gratis beperkte privé parkeergelegenheid is beschikbaar na 18:00 uur voor dinergasten en afhaalbestellingen. Neem vooraf contact op voor beschikbaarheid.'
                : 'Complimentary limited private parking is available after 6:00 PM for both dine-in guests and takeaway orders. Please contact us in advance to check availability.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'Datum *' : 'Date *'}
            </label>
            <input
              type="date"
              value={date}
              min={minDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a]"
              required
            />
            {date && isMondayInAmsterdam(date) && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                ⚠️ {isNl ? 'Wij zijn op maandag gesloten (Nederlandse tijd). Selecteer een andere datum.' : 'We are closed on Mondays (Netherlands time). Please select another date.'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'Tijd *' : 'Time *'}
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a]"
              required
            >
              <option value="">{isNl ? 'Selecteer tijd' : 'Select time'}</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'E-mailadres *' : 'Email *'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a]"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'Aantal Personen *' : 'Persons *'}
            </label>
            <input
              type="number"
              min={1}
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
              placeholder={isNl ? 'Aantal personen' : 'Number of persons'}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a]"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'Volledige Naam *' : 'Full Name *'}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isNl ? 'Uw naam' : 'Full Name'}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a]"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'Telefoonnummer *' : 'Phone *'}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+31 6 12345678"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a]"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'Hoe heeft u ons gevonden?' : 'How Did You Find Us?'}
            </label>
            <select
              value={foundVia}
              onChange={(e) => setFoundVia(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a]"
            >
              <option value="">{isNl ? 'Selecteer' : 'Select'}</option>
              <option>Google</option>
              <option>TheFork</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>Referral</option>
              <option>Walk-in</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'Geboortedatum (Optioneel)' : 'Date of birth (Optional)'}
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a]"
            />
          </div>

          <div>
            <label className="block text-sm md:text-xs font-medium text-gray-700 mb-2">
              {isNl ? 'Speciale Verzoeken (optioneel)' : 'Special Requests (optional)'}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-[#06068a] resize-none"
            />
          </div>

          {error && <div className="text-red-600 font-medium text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
          {success && (
            <div className="text-green-700 font-medium bg-green-50 p-4 rounded-lg text-sm">
              {isNl ? (
                <>
                  Uw tafel is gereserveerd! <br />
                  Bedankt voor uw gekozen reservering. We kijken uit naar uw komst!
                </>
              ) : (
                <>
                  Your table is booked! <br />
                  Thank you for choosing us. Get ready for great food, good vibes, and a wonderful time ahead!
                </>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={submitting || (!!date && isMondayInAmsterdam(date))}
              className="w-full bg-[#06068a] text-white rounded-lg px-4 py-3 md:py-2 text-base md:text-base font-medium hover:bg-[#0000B3] transition-colors disabled:opacity-50 mt-3"
            >
              {submitting ? (isNl ? 'Verzenden...' : 'Sending...') : (isNl ? 'Aanvraag Verzenden' : 'Submit Request')}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}