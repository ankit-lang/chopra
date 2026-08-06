'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Gift, Check, Sparkles } from 'lucide-react'

export default function DiscountPopupModal({ locale = 'en' }: { locale?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const isNl = locale === 'nl'

  useEffect(() => {
    // Check if user has already dismissed popup in this session
    const dismissed = sessionStorage.getItem('discount_popup_dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.getItem('discount_popup_dismissed') || sessionStorage.setItem('discount_popup_dismissed', 'true')
  }

  if (!isOpen) return null

  const base = isNl ? '/nl' : ''

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-amber-200 transform transition-all duration-300 scale-100">
        
        {/* Header background with gradient & close button */}
        <div className="relative bg-gradient-to-r from-[#000066] via-[#0000B3] to-[#0000FF] p-6 text-center text-white">
          <button
            onClick={handleClose}
            aria-label="Close popup"
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {isNl ? 'Exclusieve Aanbieding' : 'Exclusive Offer'}
          </div>

          <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
            🍛 {isNl ? 'Online Bestellen & Besparen!' : 'Order Online & Save!'}
          </h3>
          <p className="text-white/80 text-sm mt-1">
            {isNl
              ? 'Sla de wachttijd over. Geniet van exclusieve korting!'
              : 'Skip the wait. Enjoy exclusive savings!'}
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 md:p-8 text-left space-y-5">
          <p className="font-body text-[#1A1A1A] text-sm md:text-base leading-relaxed">
            {isNl
              ? 'Plaats uw bestelling online en haal het zelf op bij Chopras Indian Restaurant.'
              : 'Place your order online and collect it yourself from Chopras Indian Restaurant.'}
          </p>

          {/* Offer Highlight Card */}
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-4 md:p-5 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <p className="font-heading text-amber-950 font-bold text-base md:text-lg leading-snug">
                🎁 {isNl ? 'Ontvang 5% KORTING op alle afhaalbestellingen boven €50.' : 'Get 5% OFF on all self-collection orders above €50.'}
              </p>
              <p className="font-body text-amber-900 text-xs md:text-sm mt-1.5 leading-relaxed">
                {isNl
                  ? 'Plaats uw bestelling online, haal uw eten op en geniet van 5% korting bij betaling in het restaurant.'
                  : 'Simply place your order online, collect your food, and enjoy your 5% discount while making payment at the restaurant.'}
              </p>
            </div>
          </div>

          {/* Features Checklist */}
          <ul className="space-y-2.5 pt-1">
            {[
              isNl ? 'Vers bereid' : 'Freshly prepared',
              isNl ? 'Handig afhalen' : 'Convenient pickup',
              isNl ? 'Exclusieve afhaalaanbieding' : 'Exclusive self-collection offer',
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-sm font-medium text-[#1A1A1A]">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Action Button */}
          <div className="pt-3">
            <Link
              href={`${base}/menu`}
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3.5 text-white font-semibold uppercase tracking-wide transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
              {isNl ? 'Bestel Nu Online & Bespaar!' : 'Order Online Now & Save!'}
            </Link>
          </div>

          {/* Terms Disclaimer Footer */}
          <p className="text-[11px] text-[#1A1A1A]/50 text-center leading-relaxed pt-2">
            {isNl
              ? 'Aanbieding geldig op online afhaalbestellingen van €50 of meer. Korting wordt toegepast in het restaurant tijdens de betaling. Voorwaarden van toepassing.'
              : 'Offer valid on online self-collection orders of €50 or more. Discount will be applied at the restaurant during payment. Terms and conditions apply.'}
          </p>
        </div>

      </div>
    </div>
  )
}
