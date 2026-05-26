'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'

export default function CateringBanner({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const { ref, inView } = useInView()

  return (
    <section className="relative py-32 md:py-44 px-5 md:px-12 overflow-hidden">
      <Image
        src="/images/catering/wedding-celebrations---2.png"
        alt="Indian event catering and private hall at Chopras Den Haag"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B2B5E]/90 via-[#1B2B5E]/80 to-[#0F1040]/85" />

      {/* Double-bezel content container */}
      <div
        ref={ref}
        className={`relative z-10 max-w-2xl mx-auto transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
          <div className="rounded-[calc(2rem-0.5rem)] bg-white/[0.04] px-10 py-12 md:px-14 md:py-14 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">

            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-medium mb-7">
              <span className="inline-block w-1 h-1 rounded-full bg-[#D4AF37]" />
              Events &amp; Catering
            </span>

            <h2 className="font-semibold italic text-4xl md:text-5xl lg:text-6xl leading-[1.4] [letter-spacing:0.02em] mt-2 mb-6">
              Indian Catering Den Haag
              <br />
              <span className="text-[#D4AF37]/90"> - Plan Your Event</span>
            </h2>

            <p className="font-body text-white/70 text-base md:text-lg mt-7 leading-relaxed max-w-lg mx-auto">
              {tr.home.cateringP.split('.')[0]}.
            </p>
            <p className="font-body text-white/45 text-sm mt-2">
              {tr.home.cateringP.split('.').slice(1, 2).join('.').trim()}.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                href={`${base}/catering`}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D4AF37] pl-7 pr-2 py-2 text-[#1A1A1A] text-sm font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#e8c84a] active:scale-[0.98]"
              >
                {tr.home.cateringCta}
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-black/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
              <Link
                href={`${base}/feestzaal-den-haag`}
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 pl-7 pr-2 py-2 text-white text-sm uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
              >
                Feestzaal Huren
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-9">
              {['Indian Buffet Den Haag', 'Party Venue Den Haag', 'Halal Certified', '25–80 Guests'].map((fact) => (
                <span key={fact} className="font-body text-white/40 text-xs uppercase tracking-wider">{fact}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
