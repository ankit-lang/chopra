'use client'

import Link from 'next/link'
import { Phone, ShoppingBag } from 'lucide-react'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { RESTAURANT } from '@/lib/constants'

export default function HeroSection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <>
      <div className="relative h-[100vh] md:h-[100vh] overflow-hidden">

        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/hero-poster.png"
        >
          <source src="https://res.cloudinary.com/dllsnz1uz/video/upload/v1776214380/chopras_video0415_bkyweg.mp4" type="video/mp4" />
        </video>

        {/* Layer 1: Base darkening */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Layer 2: Bottom-heavy vignette for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Layer 3: Subtle navy tint at top for brand identity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000066]/40 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 pt-[-30px] flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">

          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-5 py-2 text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-white font-bold mb-8 backdrop-blur-md">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
            {tr.home.heroLabel} &middot; Est. 2023
          </span>

          {/* Main heading */}
          <h1
            className="font-heading leading-[1.15] max-w-5xl mx-auto"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.99), 0 4px 20px rgba(0,0,0,0.9), 0 8px 50px rgba(0,0,0,0.75)',
            }}
          >
            <span
              className="block font-bold text-white text-[2.2rem] lg:text-[4.2rem] tracking-normal mb-1"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.99), 0 6px 24px rgba(0,0,0,0.85)' }}
            >
              Chopras Indian Restaurant
            </span>
            <span
              className="block font-medium italic text-white/95 text-[1.5rem] lg:text-[2.8rem] mt-3 md:mt-5"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.95), 0 4px 18px rgba(0,0,0,0.85)' }}
            >
              Real Indian Taste
            </span>
            <span
              className="block font-medium italic text-white/90 text-[1.2rem] lg:text-[2rem] mt-2 md:mt-3"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.95), 0 4px 18px rgba(0,0,0,0.85)' }}
            >
              Crafted with Heart
            </span>
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="w-10 h-px bg-white/50" />
            <span className="text-white/70 text-sm">✦</span>
            <div className="w-10 h-px bg-white/50" />
          </div>

          {/* Subtitle */}
          <p
            className="font-body font-light text-base md:text-lg text-white/95 max-w-xl text-center leading-relaxed"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 2px 14px rgba(0,0,0,0.85)' }}
          >
            Looking for authentic Indian food in The Hague? Chopras Indian Restaurant serves
            traditional North Indian cuisine, including butter chicken, tandoori dishes, and
            vegetarian specialties — all freshly prepared with rich Indian spices.
          </p>

          {/* CTA buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 justify-center max-w-4xl mx-auto">

            {/* Reserve a Table */}
            <Link
              href={`${base}/contact`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/15 px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#000066] hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-sm"
            >
              <span className="hidden sm:inline">Reserve a Table</span>
              <span className="sm:hidden">Reserve</span>
            </Link>

            {/* View Menu */}
            <Link
              href={`${base}/menu`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/15 px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#000066] hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-sm"
            >
              <span className="hidden sm:inline">{tr.common.viewMenu}</span>
              <span className="sm:hidden">Menu</span>
            </Link>

            {/* Call Now */}
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/15 px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#000066] hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-sm"
            >
              <Phone size={16} className="transition-all duration-200" />
              <span className="hidden sm:inline">Call Now</span>
              <span className="sm:hidden">Call</span>
            </a>

            {/* Order Online — highlighted in blue */}
            <Link
              href={`${base}/menu`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0000B3] bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] px-6 py-3 text-white text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#000066] hover:border-white hover:shadow-[0_4px_20px_rgba(0,0,255,0.5)] active:scale-[0.98] min-h-[48px] shadow-[0_4px_20px_rgba(0,0,255,0.4)]"
            >
              <ShoppingBag size={16} className="transition-all duration-200" />
              <span className="hidden sm:inline">Order Online</span>
              <span className="sm:hidden">Order</span>
            </Link>

          </div>
        </div>

        {/* ── Stats Banner — desktop ── */}
        <div className="absolute hidden md:block bottom-0 left-0 right-0 z-20 w-full bg-black/55 backdrop-blur-md border-t border-white/15 shadow-[0_-8px_40px_rgba(0,0,0,0.5)]">
          <div className="max-w-5xl mx-auto flex items-stretch divide-x divide-white/10">

            {/* Stat 1: Rating */}
            <div className="flex-1 flex items-center justify-center gap-4 py-3 px-4">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-xl font-bold text-white">4.8</span>
                <span className="text-white text-base">★</span>
              </div>
              <div className="text-[9px] text-white/50 tracking-[0.2em] uppercase font-body border-l border-white/20 pl-4">Google Rating</div>
            </div>

            {/* Stat 2: Reviews */}
            <div className="flex-1 flex items-center justify-center gap-4 py-3 px-4">
              <div className="font-heading text-xl font-bold text-white">1000+</div>
              <div className="text-[9px] text-white/50 tracking-[0.2em] uppercase font-body border-l border-white/20 pl-4">GOOGLE REVIEWS</div>
            </div>

            {/* Stat 3: Tripadvisor */}
            <div className="flex-1 flex items-center justify-center gap-4 py-3 px-4">
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 32 32" className="w-5 h-5 fill-[#34E0A1] flex-shrink-0"><path d="M28.5 8H3.5A1.5 1.5 0 002 9.5v13A1.5 1.5 0 003.5 24h25a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0028.5 8zM16 21a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" /></svg>
                <span className="font-heading text-lg font-bold text-white">Excellent</span>
              </div>
              <div className="text-[9px] text-white/50 tracking-[0.2em] uppercase font-body border-l border-white/20 pl-4">Tripadvisor</div>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile floating CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="rounded-full bg-[#0000B3]/10 p-1.5 ring-1 ring-white/20">
          <Link
            href={`${base}/contact`}
            className="group flex items-center justify-between rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] pl-6 pr-2 py-2 text-white text-sm font-semibold uppercase tracking-widest shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            {tr.common.reserve}
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-black/10">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}
