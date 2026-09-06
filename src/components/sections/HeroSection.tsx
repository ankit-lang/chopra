'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ShoppingBag } from 'lucide-react'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { RESTAURANT } from '@/lib/constants'

export default function HeroSection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <>
      <div className="relative min-h-[115vh] md:min-h-[1100px] overflow-hidden flex flex-col">

        {/* Video Background */}
        <HeroVideoBackground />

        {/* Bright video overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Hero content */}
        <div className="relative z-10 flex-1 md:-mt-24 lg:-mt-24 xl:-mt-24 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 md:py-24">

          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-5 py-2 text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-white font-bold mb-8 backdrop-blur-md">
            {/* <span className="inline-block w-1.5 h-1.5 rounded-full btn-gradient" /> */}
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
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                textShadow: '0 2px 6px rgba(0,0,0,0.99), 0 6px 24px rgba(0,0,0,0.85)'
              }}
            >
              Chopras Indian Restaurant
            </span>
            {/* font-body */}
            <p
              className="text-lg md:text-2xl text-white/90 font-body font-bold  tracking-[0.1em] uppercase mt-6 mb-8"
              style={{
                textShadow: '0 2px 6px rgba(0,0,0,0.95), 0 4px 18px rgba(0,0,0,0.85)'
              }}
            >
              {locale === 'nl' ? (
                <>
                  Het Beste Indiase Restaurant
                  <br />
                  in Den Haag
                </>
              ) : (
                <>
                  The Best Indian Restaurant
                  <br />
                  in Den Haag
                </>
              )}
            </p>
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="w-10 h-px bg-white/50" />
            <span className="text-white/70 text-sm">✦</span>
            <div className="w-10 h-px bg-white/50" />
          </div>

          {/* Subtitle font-sans  */}
          <p
            className="font-body font-ligt italic   text-base md:text-lg text-white/80 max-w-xl text-center leading-relaxed"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 2px 14px rgba(0,0,0,0.85)' }}
          >
            {locale === 'nl' ? (
              <>
                Op zoek naar authentiek Indiaas eten in Den Haag? Welkom bij Chopras Indian Restaurant, waar elk gerecht wordt bereid volgens traditionele recepten, versgemalen kruiden en generaties aan Indiase culinaire expertise. Geniet van onze beroemde butter chicken Den Haag, rijke dal makhani, langzaam bereide mutton rogan josh, authentieke tandoorigerechten, vers gebakken naan Den Haag en smaakvolle biryani Den Haag. <br /> Of u nu komt dineren, Indiaas afhaalt of kiest voor Indiase maaltijdbezorging Den Haag of halal Indiaas eten Den Haag zoekt: elke maaltijd wordt bereid in onze toegewijde halal-keuken met echte Indiase gastvrijheid.
              </>
            ) : (
              <>
                Looking for authentic Indian food in Den Haag? Welcome to Chopras Indian Restaurant, where
                every dish is prepared using traditional recipes, freshly ground spices and generations of Indian
                culinary expertise. Enjoy our famous butter chicken Den Haag, rich dal makhana, slow-cooked
                mutton rogan josh, authentic tandoori dishes, freshly baked fresh naan Den Haag, and flavourful
                biryani Den Haag. <br /> Whether you're dining in, ordering Indian takeaway, choosing Indian food
                delivery Den Haag, or looking for halal Indian food Den Haag, every meal is prepared in our
                dedicated halal kitchen with genuine Indian hospitality.
              </>
            )}
          </p>

          {/* CTA buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 justify-center max-w-4xl mx-auto">

            {/* Reserve a Table */}
            <Link
              href={`${base}/contact`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/15 px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#06068a] hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-sm"
            >
              <span className="hidden sm:inline">{tr.common.reserve}</span>
              <span className="sm:hidden">{locale === 'nl' ? 'Reserveer' : 'Reserve'}</span>
            </Link>

            {/* View Menu */}
            <Link
              href={`${base}/menu`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/15 px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#06068a] hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-sm"
            >
              <span className="hidden sm:inline">{tr.common.viewMenu}</span>
              <span className="sm:hidden">Menu</span>
            </Link>

            {/* Call Now */}
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/15 px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#06068a] hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-sm"
            >
              <Phone size={16} className="transition-all duration-200" />
              <span className="hidden sm:inline">{locale === 'nl' ? 'Nu Bellen' : 'Call Now'}</span>
              <span className="sm:hidden">{locale === 'nl' ? 'Bellen' : 'Call'}</span>
            </a>

            {/* Order Online — highlighted in blue */}
            <Link
              href={`${base}/menu`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0000B3] btn-gradient px-6 py-3 text-white text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-white hover:border-white hover:shadow-[0_4px_20px_rgba(0,0,255,0.5)] active:scale-[0.98] min-h-[48px] shadow-[0_4px_20px_rgba(0,0,255,0.4)]"
            >
              <ShoppingBag size={16} className="transition-all duration-200" />
              <span className="hidden sm:inline">{locale === 'nl' ? 'Online Bestellen' : 'Order Online'}</span>
              <span className="sm:hidden">{locale === 'nl' ? 'Bestellen' : 'Order'}</span>
            </Link>

          </div>
        </div>

        {/* ── Stats Banner ── */}
        <div className="relative z-20 w-full bg-black/55 backdrop-blur-md border-t border-white/15 shadow-[0_-8px_40px_rgba(0,0,0,0.5)] mt-auto">
          <div className="max-w-5xl mx-auto flex items-stretch divide-x divide-white/10">

            {/* Stat 1: Rating */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 py-2 md:py-3 px-2 md:px-4">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-lg md:text-xl font-bold text-white">4.9</span>
                <span className="text-white text-sm md:text-base">★</span>
              </div>
              <div className="text-[9px] md:text-[10px] text-white/80 tracking-[0.1em] md:tracking-[0.2em] uppercase font-body md:border-l md:border-white/20 md:pl-4 text-center md:text-left">
                {locale === 'nl' ? <>Google<br className="md:hidden" />Beoordeling</> : <>Google<br className="md:hidden" />Rating</>}
              </div>
            </div>

            {/* Stat 2: Reviews */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 py-2 md:py-3 px-2 md:px-4">
              <div className="font-heading text-lg md:text-xl font-bold text-white">1100+</div>
              <div className="text-[9px] md:text-[10px] text-white/80 tracking-[0.1em] md:tracking-[0.2em] uppercase font-body md:border-l md:border-white/20 md:pl-4 text-center md:text-left">
                {locale === 'nl' ? <>Google<br className="md:hidden" />Recensies</> : <>Google<br className="md:hidden" />Reviews</>}
              </div>
            </div>

            {/* Stat 3: Tripadvisor */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 py-2 md:py-3 px-2 md:px-4">
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 32 32" className="w-4 h-4 md:w-5 md:h-5 fill-[#34E0A1] flex-shrink-0"><path d="M28.5 8H3.5A1.5 1.5 0 002 9.5v13A1.5 1.5 0 003.5 24h25a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0028.5 8zM16 21a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" /></svg>
                <span className="font-heading text-base md:text-lg font-bold text-white">{locale === 'nl' ? 'Uitstekend' : 'Excellent'}</span>
              </div>
              <div className="text-[9px] md:text-[10px] text-white/80 tracking-[0.1em] md:tracking-[0.2em] uppercase font-body md:border-l md:border-white/20 md:pl-4 text-center md:text-left">Tripadvisor</div>
            </div>

          </div>
        </div>

      </div >

      {/* Mobile floating CTA */}
      < div className="fixed bottom-4 left-4 right-4 z-50 md:hidden" >
        <div className="rounded-full bg-[#0000B3]/10 p-1.5 ring-1 ring-white/20">
          <Link
            href={`${base}/contact`}
            className="group flex items-center justify-between rounded-full btn-gradient pl-6 pr-2 py-2 text-white text-sm font-semibold uppercase tracking-widest shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] min-h-[48px]"
          >
            {tr.common.reserve}
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-black/10">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div >
    </>
  )
}

function HeroVideoBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0a1a] overflow-hidden">
      {/* Mobile Poster Image for Instant LCP */}
      <div className="md:hidden absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/demy9se9a/video/upload/f_auto,q_auto,w_640,c_limit,so_0/v1785953647/homemobban_plpiio.jpg"
          alt="Chopras Indian Restaurant Den Haag"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-110"
        />
      </div>

      {/* Desktop Poster Image for Instant LCP */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/demy9se9a/video/upload/f_auto,q_auto,w_1280,c_limit,so_0/v1784922887/homevideo_znd8qq.jpg"
          alt="Chopras Indian Restaurant Den Haag"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-110"
        />
      </div>

      {/* Lazy-loaded Video streams after hydration (responsive source selection + preload="none") */}
      {mounted && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="https://res.cloudinary.com/demy9se9a/video/upload/f_auto,q_auto,w_1280,c_limit,so_0/v1784922887/homevideo_znd8qq.jpg"
          className="absolute inset-0 w-full h-full object-cover brightness-110"
        >
          <source
            src="https://res.cloudinary.com/demy9se9a/video/upload/f_auto,q_auto,w_640,c_limit/v1785953647/homemobban_plpiio.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source
            src="https://res.cloudinary.com/demy9se9a/video/upload/f_auto,q_auto,w_1280,c_limit/v1784922887/homevideo_znd8qq.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
        </video>
      )}
    </div>
  )
}
