'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MapPin, Banknote, ShieldCheck, Check, Clock } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Locale } from '@/lib/useTranslations'
import { checkOpeningStatus, getAvailablePickupTimes, ALL_PICKUP_TIMES, type OpeningStatus } from '@/lib/openingHours'

function formatPrice(price: number): string {
  return price % 1 === 0 ? `€${price}` : `€${price.toFixed(2)}`
}

export default function CheckoutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const router = useRouter()
  const { items, clearCart, getTotalPrice } = useCartStore()
  const totalPrice = getTotalPrice()
  const base = locale === 'nl' ? '/nl' : ''

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    pickupTime: '',
    instructions: '',
  })
  const [openingStatus, setOpeningStatus] = useState<OpeningStatus>(() => checkOpeningStatus())
  const [availableTimes, setAvailableTimes] = useState<string[]>(() => getAvailablePickupTimes())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    function updateStatus() {
      const status = checkOpeningStatus()
      const times = getAvailablePickupTimes()
      setOpeningStatus(status)
      setAvailableTimes(times)
    }

    updateStatus()
    const timer = setInterval(updateStatus, 30000)
    return () => clearInterval(timer)
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const currentStatus = checkOpeningStatus()
    if (currentStatus.isClosed) {
      setError(locale === 'nl' ? currentStatus.messageNl : currentStatus.messageEn)
      setOpeningStatus(currentStatus)
      return
    }

    if (!form.name.trim() || !form.phone.trim()) {
      setError(
        locale === 'nl'
          ? 'Vul a.u.b. uw naam en telefoonnummer in.'
          : 'Please fill in your name and phone number.'
      )
      return
    }

    if (!form.pickupTime || !ALL_PICKUP_TIMES.includes(form.pickupTime)) {
      setError(
        locale === 'nl'
          ? 'Selecteer a.u.b. een geldige ophaaltijd tussen 16:30 en 22:00.'
          : 'Please select a valid pickup time between 16:30 and 22:00.'
      )
      return
    }

    if (items.length === 0) {
      setError('Your cart is empty.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email,
          pickupTime: form.pickupTime,
          items,
          totalAmount: totalPrice,
          specialInstructions: form.instructions,
          locale,
        }),
      })

      const data = await response.json()

      if (data.success) {
        console.log(data.mailDelivered ? 'Mail delivered successfully' : 'Mail not delivered')
        console.log(data.whatsappDelivered ? 'WhatsApp delivered successfully' : 'WhatsApp not delivered')

        clearCart()
        localStorage.setItem('lastOrder', JSON.stringify(data.order))
        router.push(
          `${base}/order-confirmation?order=${data.orderNumber}&name=${encodeURIComponent(form.name)}`
        )
      } else {
        setError(data.error || (locale === 'nl' ? 'Er is iets misgegaan. Bel ons op +31 6 30645930.' : 'Something went wrong. Please call us on +31 6 30645930.'))
      }
    } catch {
      setError(locale === 'nl' ? 'Er is iets misgegaan. Bel ons op +31 6 30645930.' : 'Something went wrong. Please call us on +31 6 30645930.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* Hero */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #06068a 0%, #0000B3 100%)' }}
      >
        <p className="text-xs uppercase tracking-widest text-white font-medium mb-4">
          {locale === 'nl' ? 'BIJNA KLAAR' : 'ALMOST THERE'}
        </p>
        <h1 className="font-heading text-4xl text-white font-semibold">
          {locale === 'nl' ? 'Rond Uw Bestelling Af' : 'Complete Your Order'}
        </h1>
        <p className="text-[#1A1A1A]/60 mt-3 text-sm text-white/60">
          {locale === 'nl'
            ? 'Vul uw gegevens in en haal op bij Leyweg 986'
            : 'Fill in your details and collect from Leyweg 986'}
        </p>
      </section>

      {/* Progress bar */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="flex items-center justify-center gap-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center">
              <Check className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <span className="text-xs text-[#1A1A1A]/50">{locale === 'nl' ? 'Winkelmand' : 'Your Cart'}</span>
          </div>
          <div className="w-12 h-px btn-gradient" />
          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center ring-4 ring-white/30 animate-pulse">
              <span className="text-xs font-bold text-[#1A1A1A]">2</span>
            </div>
            <span className="text-xs text-[#1A1A1A] font-semibold">{locale === 'nl' ? 'Uw Gegevens' : 'Your Details'}</span>
          </div>
          <div className="w-12 h-px bg-gray-200" />
          {/* Step 3 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-400">3</span>
            </div>
            <span className="text-xs text-[#1A1A1A]/40">{locale === 'nl' ? 'Bevestiging' : 'Confirmation'}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="py-12 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* LEFT: Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-left"
            >
              <h2 className="font-heading text-3xl text-[#06068a]">
                {locale === 'nl' ? 'Uw Gegevens' : 'Your Details'}
              </h2>
              <div className="w-12 h-0.5 btn-gradient mt-2 mb-8" />

              {/* Order Cutoff Banner */}
              {openingStatus.isClosed && (
                <div className="mb-6 bg-amber-50 border border-amber-300 rounded-2xl p-5 text-amber-900 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">
                      {locale === 'nl'
                        ? 'Bestellingen voor vandaag zijn gesloten'
                        : 'Ordering is currently closed'}
                    </p>
                    <p className="text-xs text-amber-800 mt-1">
                      {locale === 'nl' ? openingStatus.messageNl : openingStatus.messageEn}
                    </p>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  {locale === 'nl' ? 'Volledige Naam' : 'Full Name'} <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={locale === 'nl' ? 'Uw volledige naam' : 'Your full name'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#06068a] transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  {locale === 'nl' ? 'Telefoonnummer' : 'Phone Number'} <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+31 6 12345678"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#06068a] transition-colors"
                />
                <p className="text-xs text-[#1A1A1A]/40 mt-1">
                  {locale === 'nl'
                    ? 'We bellen dit nummer als er vragen zijn over uw bestelling'
                    : 'We will call this number if there are any questions about your order'}
                </p>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  {locale === 'nl' ? 'E-mailadres' : 'Email Address'} <span className="text-[#1A1A1A]/40 font-normal">{locale === 'nl' ? '(optioneel)' : '(optional)'}</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={locale === 'nl' ? 'uw@email.nl' : 'your@email.com'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#06068a] transition-colors"
                />
                <p className="text-xs text-[#1A1A1A]/40 mt-1">
                  {locale === 'nl' ? 'Voor uw bestelbevestiging' : 'For your order confirmation'}
                </p>
              </div>

              {/* Pickup Time Dropdown */}
              <div className="mb-6">
                <label htmlFor="pickupTime" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  {locale === 'nl' ? 'Ophaaltijd' : 'Pickup Time'} <span className="text-red-500">*</span>
                </label>
                <select
                  id="pickupTime"
                  name="pickupTime"
                  required
                  disabled={openingStatus.isClosed || availableTimes.length === 0}
                  value={form.pickupTime}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#06068a] transition-colors bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {openingStatus.isClosed || availableTimes.length === 0
                      ? (locale === 'nl' ? '-- Bestellingen Momenteel Gesloten --' : '-- Ordering Currently Closed --')
                      : (locale === 'nl' ? '-- Selecteer Ophaaltijd * --' : '-- Select Pickup Time * --')}
                  </option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-[#1A1A1A]/40 mt-1">
                  {locale === 'nl'
                    ? 'Openingstijden: Dinsdag t/m Zondag van 16:30 tot 22:30 (Bestellen tot 21:30, Laatste ophaaltijd 22:00)'
                    : 'Opening hours: Tuesday to Sunday from 16:30 to 22:30 (Orders until 21:30, Last pickup 22:00)'}
                </p>
              </div>

              {/* Special Instructions */}
              <div className="mb-8">
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2"
                >
                  {locale === 'nl' ? 'Speciale Instructies' : 'Special Instructions'}{' '}
                  <span className="text-[#1A1A1A]/40 font-normal">{locale === 'nl' ? '(optioneel)' : '(optional)'}</span>
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows={3}
                  value={form.instructions}
                  onChange={handleChange}
                  placeholder={
                    locale === 'nl'
                      ? 'Eventuele allergieën, speciale verzoeken of opmerkingen voor de keuken...'
                      : 'Any allergies, special requests, or notes for the kitchen...'
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#06068a] transition-colors resize-none"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <p className="font-medium text-[#1A1A1A] mb-3">
                  {locale === 'nl' ? 'Betaalmethode' : 'Payment Method'}
                </p>

                {/* Payment on pickup */}
                <div className="border-2 border-[#06068a] bg-[#0000B3]/5 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-[#06068a] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full btn-gradient" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">
                      {locale === 'nl' ? 'Betalen bij Afhalen' : 'Payment on Pickup'}
                    </p>
                    <p className="text-sm text-[#1A1A1A]/60 mt-1">
                      {locale === 'nl'
                        ? 'Betaal wanneer u uw bestelling ophaalt op Leyweg 986, Den Haag'
                        : 'Pay when you collect your order at Leyweg 986, Den Haag'}
                    </p>
                  </div>
                </div>

                {/* Online payment coming soon */}
                <div className="border border-gray-200 rounded-2xl p-5 flex items-start gap-4 mt-3 opacity-50 cursor-not-allowed">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#1A1A1A]/50 text-sm">
                        {locale === 'nl' ? 'Online Betaling' : 'Online Payment'}
                      </p>
                      <span className="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                        {locale === 'nl' ? 'Binnenkort' : 'Coming Soon'}
                      </span>
                    </div>
                    <p className="text-sm text-[#1A1A1A]/40 mt-1">
                      {locale === 'nl'
                        ? 'Binnenkort beschikbaar -- pin & iDEAL betalingen'
                        : 'Coming soon -- card and iDEAL payments'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pickup info */}
              <div className="bg-[#EEF0FF] border border-[#1B2B5E]/40 rounded-2xl p-6 flex items-start gap-4 mb-8">
                <MapPin className="text-[#06068a] w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1B2B5E] text-sm">
                    {locale === 'nl' ? 'Ophaallocatie' : 'Pickup Location'}
                  </p>
                  <p className="text-[#1A1A1A]/70 text-sm mt-1">Leyweg 986, 2545 GW Den Haag</p>
                  <p className="text-[#1A1A1A]/50 text-xs mt-1">
                    {locale === 'nl'
                      ? 'Verwachte bereidingstijd: 30 tot 45 minuten na bestelling'
                      : 'Estimated ready time: 30 to 45 minutes after order'}
                  </p>
                  <p className="text-[#1A1A1A]/50 text-xs">
                    {locale === 'nl'
                      ? 'Openingstijden: Dinsdag t/m Zondag, 16:30 tot 22:30 (Bestellen tot 21:30, Laatste ophaaltijd 22:00)'
                      : 'Opening hours: Tuesday to Sunday, 16:30 to 22:30 (Orders until 21:30, Last pickup 22:00)'}
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Closed Warning */}
              {openingStatus.isClosed && (
                <div className="mb-4 bg-amber-50 border border-amber-300 rounded-xl p-4 text-amber-900 text-sm flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <p className="font-medium text-xs md:text-sm">
                    {locale === 'nl'
                      ? 'Bestellingen zijn niet toegestaan na 21:30.'
                      : 'Orders cannot be placed after 9:30 PM (21:30).'}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || openingStatus.isClosed || items.length === 0}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-full border-2 px-6 py-3 font-medium uppercase tracking-wide transition-all duration-200 ease-out ${
                  openingStatus.isClosed || items.length === 0
                    ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed shadow-none'
                    : 'btn-gradient border-white text-white active:scale-[0.98]'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    {locale === 'nl' ? 'Bestelling Plaatsen...' : 'Placing Your Order...'}
                  </>
                ) : openingStatus.isClosed ? (
                  locale === 'nl' ? 'BESTELLEN GESLOTEN' : 'ORDERING CLOSED'
                ) : (
                  locale === 'nl' ? 'BESTELLING PLAATSEN -- BETALEN BIJ AFHALEN' : 'Place Order -- Payment on Pickup'
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4">
                <ShieldCheck className="text-green-500 w-4 h-4" />
                <p className="text-[#1A1A1A]/40 text-xs">
                  {locale === 'nl'
                    ? 'Uw bestelling gaat rechtstreeks naar onze keuken'
                    : 'Your order goes directly to our kitchen'}
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT: Order summary */}
          <div className="md:col-span-2">
            <div className="sticky top-24 self-start">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-left">
                {/* Header */}
                <div
                  className="px-6 py-5"
                  style={{ background: 'linear-gradient(135deg, #06068a 0%, #0000B3 100%)' }}
                >
                  <p className="font-heading text-xl text-white font-bold">
                    {locale === 'nl' ? 'Besteloverzicht' : 'Order Summary'}
                  </p>
                  <p className="text-white/80 text-sm">
                    {items.reduce((s, i) => s + i.quantity, 0)} {locale === 'nl' ? 'items' : 'items'}
                  </p>
                </div>

                {/* Items */}
                <div className="px-6 py-4 space-y-4 max-h-[300px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-white font-heading"
                            style={{ background: 'linear-gradient(135deg, #06068a 0%, #0000B3 100%)' }}
                          >
                            {item.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#1A1A1A] flex-1 leading-tight">
                        {item.name}
                      </p>
                      <span className="bg-[#0000B3]/10 text-[#06068a] font-bold text-xs px-2 py-0.5 rounded-full">
                        x{item.quantity}
                      </span>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="px-6 py-4 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm text-[#1A1A1A]/60">
                    <span>{locale === 'nl' ? 'Subtotaal' : 'Subtotal'}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#1A1A1A]/60">
                    <span>{locale === 'nl' ? 'Afhaalkosten' : 'Pickup fee'}</span>
                    <span>{locale === 'nl' ? 'Gratis' : 'Free'}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-heading text-2xl text-[#1A1A1A]">
                    <span>{locale === 'nl' ? 'Totaal' : 'Total'}</span>
                    <span className="text-[#06068a] font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Payment pill */}
                <div className="mx-6 mb-4">
                  <div className="bg-[#0000B3]/10 border border-[#0000B3]/20 rounded-xl px-4 py-3 flex items-center gap-2">
                    <Banknote className="text-[#06068a] w-4 h-4 flex-shrink-0" />
                    <p className="text-sm text-[#1A1A1A]/70">
                      {locale === 'nl' ? 'Betalen bij afhalen op Leyweg 986' : 'Payment on Pickup at Leyweg 986'}
                    </p>
                  </div>
                </div>

                {/* Edit order */}
                <div className="text-center mb-4">
                  <button
                    onClick={() => router.back()}
                    className="text-[#06068a] text-sm hover:underline font-medium"
                  >
                    {locale === 'nl' ? 'Bestelling wijzigen' : 'Edit your order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
