'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, MapPin, Clock, Banknote, Hash } from 'lucide-react'
import type { Locale } from '@/lib/useTranslations'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface LastOrder {
  orderNumber: string
  customerName: string
  customerPhone: string
  customerEmail: string
  items: OrderItem[]
  totalAmount: number
  paymentMethod: string
  specialInstructions: string
  estimatedPickup: string
  restaurantAddress: string
  createdAt: string
}

function formatPrice(price: number): string {
  return price % 1 === 0 ? `€${price}` : `€${price.toFixed(2)}`
}

function OrderConfirmationContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') ?? ''
  const customerName = searchParams.get('name') ?? 'valued customer'
  const base = locale === 'nl' ? '/nl' : ''

  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('lastOrder')
      if (raw) {
        setLastOrder(JSON.parse(raw))
      }
    } catch {
      // localStorage unavailable or corrupted, fallback to URL params only
    }
  }, [])

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)',
      }}
    >
      <div className="bg-white rounded-3xl p-10 md:p-14 max-w-lg w-full mx-auto text-center shadow-2xl">
        {/* Success animation */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-green-500/30 animate-ping animation-delay-150" />
          <div className="relative w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle className="text-white w-10 h-10" />
          </div>
        </div>

        <h1 className="font-vibes text-4xl text-[#C7A348] mt-6 leading-[1.3]">
          Order Confirmed!
        </h1>

        {/* Order number pill */}
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-6 py-3 mt-4">
          <Hash className="text-[#D4AF37] w-4 h-4" />
          <span className=" text-[#1A1A1A] text-lg font-vibes">
            Order {orderNumber}
          </span>
        </div>

        {/* Confirmation message */}
        <p className="mt-6 text-[#1A1A1A]/60 text-base leading-relaxed">
          Thank you, {lastOrder?.customerName ?? customerName}! Your order has been received by our
          kitchen. Please come to collect it at Leyweg 986, Den Haag. Estimated ready time is 30 to
          45 minutes.
        </p>

        {/* Order items breakdown */}
        {lastOrder && lastOrder.items && lastOrder.items.length > 0 && (
          <div className="mt-6 bg-[#F7F8FC] rounded-2xl p-5 text-left">
            <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/40 mb-3 font-medium">
              Your Order
            </p>
            <div className="space-y-2">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2">
                  <span className="text-sm text-[#1A1A1A]/80 flex-1 leading-snug">
                    {item.name}
                    <span className="text-[#1A1A1A]/40 ml-1">x{item.quantity}</span>
                  </span>
                  <span className="text-sm font-semibold text-[#1A1A1A] whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
              <span className="font-vibes text-base text-[#1A1A1A]">Total</span>
              <span className="font-vibes text-base text-[#1A1A1A]">
                {formatPrice(lastOrder.totalAmount)}
              </span>
            </div>
          </div>
        )}

        {/* Info pills */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 bg-[#F7F8FC] rounded-xl px-5 py-4 text-left">
            <MapPin className="text-[#D4AF37] w-5 h-5 flex-shrink-0" />
            <p className="text-sm text-[#1A1A1A]/70">
              {lastOrder?.restaurantAddress ?? 'Leyweg 986, 2545 GW Den Haag'}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#F7F8FC] rounded-xl px-5 py-4 text-left">
            <Clock className="text-[#D4AF37] w-5 h-5 flex-shrink-0" />
            <p className="text-sm text-[#1A1A1A]/70">
              Ready in {lastOrder?.estimatedPickup ?? '30 to 45 minutes'}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#F7F8FC] rounded-xl px-5 py-4 text-left">
            <Banknote className="text-[#D4AF37] w-5 h-5 flex-shrink-0" />
            <p className="text-sm text-[#1A1A1A]/70">
              Payment: {lastOrder?.paymentMethod ?? 'Cash on Pickup'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 my-8" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            href={`${base}/menu`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98]"
          >
            Order Again
          </Link>
          <Link
            href={base}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98]"
          >
            Back to Home
          </Link>
        </div>

        <p className="text-[#1A1A1A]/40 text-xs mt-6">Questions? Call us on +31 6 30645930</p>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage({ params }: { params: { locale: Locale } }) {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
        >
          <div className="text-white font-vibes text-2xl">Loading...</div>
        </div>
      }
    >
      <OrderConfirmationContent locale={params.locale} />
    </Suspense>
  )
}
