'use client'

import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'

function IconFlame({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 6 8 6 13a6 6 0 0012 0c0-5-6-11-6-11z" />
      <path d="M12 22c-1.5 0-3-1-3-2.5C9 17.5 12 15 12 15s3 2.5 3 4.5C15 21 13.5 22 12 22z" />
    </svg>
  )
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M16 3.13a4 4 0 010 7.75" />
      <path d="M21 21v-2a4 4 0 00-3-3.87" />
    </svg>
  )
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
    </svg>
  )
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

export default function WhySection({ locale = 'en' }: { locale?: Locale }) {
  const t = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  const { ref: headRef, inView: headInView } = useInView()
  const { ref: gridRef, inView: gridInView } = useInView()
  const { ref: stripRef, inView: stripInView } = useInView()

  return (
    <section className="bg-[#F7F8FC] py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div
          ref={headRef}
          className={`mb-14 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-medium">
            <span className="inline-block w-1 h-1 rounded-full bg-[#D4AF37]" />
            Why Chopras
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 mb-6 max-w-4xl leading-[1.4] [letter-spacing:0.02em]">
            {t.home.whyH2}
          </h2>
        </div>

        {/* Asymmetric Bento Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Hero card  -  col-span-7 row-span-2 */}
          <div className="md:col-span-7 md:row-span-2 rounded-[2rem] bg-[#D4AF37]/[0.06] p-2 ring-1 ring-[#D4AF37]/[0.12]">
            <div className="h-full min-h-[300px] md:min-h-[440px] rounded-[calc(2rem-0.5rem)] bg-[#F7F8FC] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-[#D4AF37]/[0.06] blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-8 ring-1 ring-[#D4AF37]/15">
                  <IconFlame className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div className="w-10 h-px bg-[#D4AF37] mb-6" />
                <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] leading-tight max-w-sm">
                  {t.home.why1H3}
                </h3>
                <p className="text-[#1A1A1A]/55 text-base leading-relaxed mt-5 max-w-sm">
                  {t.home.why1P}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-10 relative z-10">
                <span className="text-5xl font-vibes text-[#C7A348]">143</span>
                <span className="text-sm text-[#1A1A1A]/40 leading-tight font-body">Dishes crafted<br />fresh daily</span>
              </div>
            </div>
          </div>

          {/* Card 2  -  col-span-5 upper right */}
          <div className="md:col-span-5 rounded-[2rem] bg-[#D4AF37]/[0.06] p-2 ring-1 ring-[#D4AF37]/[0.12]">
            <div className="h-full min-h-[220px] rounded-[calc(2rem-0.5rem)] bg-[#F7F8FC] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 ring-1 ring-[#D4AF37]/15">
                  <IconUsers className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="w-8 h-px bg-[#D4AF37] mb-4" />
                <h3 className="font-vibes text-2xl text-[#C7A348] leading-tight">
                  {t.home.why2H3}
                </h3>
                <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mt-3">
                  {t.home.why2P}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3  -  col-span-5 lower right */}
          <div className="md:col-span-5 rounded-[2rem] bg-[#D4AF37]/[0.06] p-2 ring-1 ring-[#D4AF37]/[0.12]">
            <div className="h-full min-h-[220px] rounded-[calc(2rem-0.5rem)] bg-[#F7F8FC] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 ring-1 ring-[#D4AF37]/15">
                  <IconCalendar className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="w-8 h-px bg-[#D4AF37] mb-4" />
                <h3 className="font-vibes text-2xl text-[#C7A348] leading-tight">
                  {t.home.why3H3}
                </h3>
                <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mt-3">
                  {t.home.why3P}
                </p>
              </div>
              <Link
                href={`${base}/catering`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/30 px-5 py-2.5 mt-6 self-start text-[#C7A348] text-xs font-semibold uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 active:scale-[0.98]"
              >
                Explore Catering
                <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-[#D4AF37]/15 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div
          ref={stripRef}
          className={`mt-6 transition-all duration-500 delay-150 ease-[cubic-bezier(0.32,0.72,0,1)] ${stripInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div
            className="rounded-2xl p-1.5 ring-1 ring-white/10"
            style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
          >
            <div className="rounded-[calc(1rem-0.375rem)] px-8 py-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between flex-wrap gap-5">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {[
                    { label: '100% Halal Certified', Icon: IconShield },
                    { label: 'Freshly Ground Spices Daily', Icon: IconFlame },
                    { label: 'Open Tue–Sun 16:30–22:30', Icon: IconCalendar },
                  ].map(({ label, Icon }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-white/75 text-xs font-body uppercase tracking-wider">{label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`${base}/contact`}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] pl-6 pr-2 py-2 text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#e8c84a] active:scale-[0.98] whitespace-nowrap"
                >
                  Reserve a Table
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-black/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" strokeWidth="1.5" stroke="currentColor">
                      <path d="M1.5 9.5L9.5 1.5M9.5 1.5H4M9.5 1.5V7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
