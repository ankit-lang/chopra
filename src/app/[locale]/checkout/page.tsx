'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MapPin, Banknote, ShieldCheck, Check } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Locale } from '@/lib/useTranslations'

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
    instructions: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please fill in your name and phone number.')
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
          items,
          totalAmount: totalPrice,
          specialInstructions: form.instructions,
          locale,
        }),
      })

      const data = await response.json()

      if (data.success) {
        clearCart()
        localStorage.setItem('lastOrder', JSON.stringify(data.order))
        router.push(
          `${base}/order-confirmation?order=${data.orderNumber}&name=${encodeURIComponent(form.name)}`
        )
      } else {
        setError('Something went wrong. Please call us on +31 6 30645930.')
      }
    } catch {
      setError('Something went wrong. Please call us on +31 6 30645930.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* Hero */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
      >
        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">
          ALMOST THERE
        </p>
        <h1 className="font-heading text-4xl text-white font-semibold">Complete Your Order</h1>
        <p className="text-white/60 mt-3 text-sm">
          Fill in your details and collect from Leyweg 986
        </p>
      </section>

      {/* Progress bar */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="flex items-center justify-center gap-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Check className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <span className="text-xs text-[#1A1A1A]/50">Your Cart</span>
          </div>
          <div className="w-12 h-px bg-[#D4AF37]" />
          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center ring-4 ring-[#D4AF37]/30 animate-pulse">
              <span className="text-xs font-bold text-[#1A1A1A]">2</span>
            </div>
            <span className="text-xs text-[#1A1A1A] font-semibold">Your Details</span>
          </div>
          <div className="w-12 h-px bg-gray-200" />
          {/* Step 3 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-400">3</span>
            </div>
            <span className="text-xs text-[#1A1A1A]/40">Confirmation</span>
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
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="font-vibes text-3xl text-[#C7A348]">Your Details</h2>
              <div className="w-12 h-0.5 bg-[#D4AF37] mt-2 mb-8" />

              {/* Full Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+31 6 12345678"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <p className="text-xs text-[#1A1A1A]/40 mt-1">
                  We will call this number if there are any questions about your order
                </p>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Email Address <span className="text-[#1A1A1A]/40 font-normal">(optional)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <p className="text-xs text-[#1A1A1A]/40 mt-1">For your order confirmation</p>
              </div>

              {/* Special Instructions */}
              <div className="mb-8">
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2"
                >
                  Special Instructions{' '}
                  <span className="text-[#1A1A1A]/40 font-normal">(optional)</span>
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows={3}
                  value={form.instructions}
                  onChange={handleChange}
                  placeholder="Any allergies, special requests, or notes for the kitchen..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <p className="font-medium text-[#1A1A1A] mb-3">Payment Method</p>

                {/* Cash on pickup */}
                <div className="border-2 border-[#D4AF37] bg-[#D4AF37]/5 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">Cash on Pickup</p>
                    <p className="text-sm text-[#1A1A1A]/60 mt-1">
                      Pay when you collect your order at Leyweg 986, Den Haag
                    </p>
                  </div>
                </div>

                {/* Online payment coming soon */}
                <div className="border border-gray-200 rounded-2xl p-5 flex items-start gap-4 mt-3 opacity-50 cursor-not-allowed">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#1A1A1A]/50 text-sm">Online Payment</p>
                      <span className="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm text-[#1A1A1A]/40 mt-1">
                      Coming soon -- card and iDEAL payments
                    </p>
                  </div>
                </div>
              </div>

              {/* Pickup info */}
              <div className="bg-[#EEF0FF] border border-[#1B2B5E]/40 rounded-2xl p-6 flex items-start gap-4 mb-8">
                <MapPin className="text-[#D4AF37] w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1B2B5E] text-sm">Pickup Location</p>
                  <p className="text-[#1A1A1A]/70 text-sm mt-1">Leyweg 986, 2545 GW Den Haag</p>
                  <p className="text-[#1A1A1A]/50 text-xs mt-1">
                    Estimated ready time: 30 to 45 minutes after order
                  </p>
                  <p className="text-[#1A1A1A]/50 text-xs">
                    Opening hours: Tuesday to Sunday, 16:30 to 22:30
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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
                    Placing Your Order...
                  </>
                ) : (
                  'Place Order -- Cash on Pickup'
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4">
                <ShieldCheck className="text-green-500 w-4 h-4" />
                <p className="text-[#1A1A1A]/40 text-xs">
                  Your order goes directly to our kitchen
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT: Order summary */}
          <div className="md:col-span-2">
            <div className="sticky top-24 self-start">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div
                  className="px-6 py-5"
                  style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
                >
                  <p className="font-vibes text-xl text-white">Order Summary</p>
                  <p className="text-white/60 text-sm">
                    {items.reduce((s, i) => s + i.quantity, 0)} items
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
                            className="w-full h-full flex items-center justify-center text-white font-vibes"
                            style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
                          >
                            {item.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#1A1A1A] flex-1 leading-tight">
                        {item.name}
                      </p>
                      <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs px-2 py-0.5 rounded-full">
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
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#1A1A1A]/60">
                    <span>Pickup fee</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-vibes text-2xl text-[#1A1A1A]">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Payment pill */}
                <div className="mx-6 mb-4">
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl px-4 py-3 flex items-center gap-2">
                    <Banknote className="text-[#D4AF37] w-4 h-4 flex-shrink-0" />
                    <p className="text-sm text-[#1A1A1A]/70">Cash on Pickup at Leyweg 986</p>
                  </div>
                </div>

                {/* Edit order */}
                <div className="text-center mb-4">
                  <button
                    onClick={() => router.back()}
                    className="text-[#1B2B5E] text-sm hover:underline"
                  >
                    Edit your order
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
