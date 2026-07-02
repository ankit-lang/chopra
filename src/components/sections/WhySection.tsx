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
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0000B3]/20 bg-[#0000B3]/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-medium">
            <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
            Why Chopras
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#1B2B5E] leading-[1.15] tracking-tight mt-6 mb-6 max-w-4xl">
            {t.home.whyH2}
          </h2>
        </div>

        {/* Asymmetric Bento Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Hero card  -  col-span-7 row-span-2 */}
          <div className="md:col-span-7 md:row-span-2 group rounded-[2rem] bg-[#0000B3]/[0.04] p-1.5 ring-1 ring-[#1B2B5E]/[0.07] hover:ring-[#0000B3]/20 transition-all duration-500">
            <div className="h-full min-h-[300px] md:min-h-[440px] rounded-[calc(2rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-[#0000B3]/[0.04] blur-2xl pointer-events-none transition-all duration-700 group-hover:bg-[#0000B3]/[0.08] group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#0000B3]/5 flex items-center justify-center mb-8 ring-1 ring-[#0000B3]/10 transition-transform duration-500 group-hover:-translate-y-1">
                  <IconFlame className="w-7 h-7 text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
                </div>
                <div className="w-10 h-[2px] bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6" />
                <h3 className="font-heading font-bold text-3xl md:text-4xl text-[#1B2B5E] leading-tight max-w-sm">
                  {t.home.why1H3}
                </h3>
                <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed mt-5 max-w-sm">
                  {t.home.why1P}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-10 relative z-10">
                <span className="text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] tracking-tight">143</span>
                <span className="text-sm text-[#1B2B5E]/50 leading-snug font-body font-medium uppercase tracking-wider">Dishes crafted<br />fresh daily</span>
              </div>
            </div>
          </div>

          {/* Card 2  -  col-span-5 upper right */}
          <div className="md:col-span-5 group rounded-[2rem] bg-[#0000B3]/[0.04] p-1.5 ring-1 ring-[#1B2B5E]/[0.07] hover:ring-[#0000B3]/20 transition-all duration-500">
            <div className="h-full min-h-[220px] rounded-[calc(2rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#0000B3]/[0.03] blur-xl pointer-events-none transition-all duration-700 group-hover:bg-[#0000B3]/[0.06] group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#0000B3]/5 flex items-center justify-center mb-6 ring-1 ring-[#0000B3]/10 transition-transform duration-500 group-hover:-translate-y-1">
                  <IconUsers className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
                </div>
                <div className="w-8 h-[2px] bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4" />
                <h3 className="font-heading font-bold text-2xl text-[#1B2B5E] leading-tight">
                  {t.home.why2H3}
                </h3>
                <p className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed mt-3">
                  {t.home.why2P}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3  -  col-span-5 lower right */}
          <div className="md:col-span-5 group rounded-[2rem] bg-[#0000B3]/[0.04] p-1.5 ring-1 ring-[#1B2B5E]/[0.07] hover:ring-[#0000B3]/20 transition-all duration-500">
            <div className="h-full min-h-[220px] rounded-[calc(2rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-[#0000B3]/[0.03] blur-xl pointer-events-none transition-all duration-700 group-hover:bg-[#0000B3]/[0.06] group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#0000B3]/5 flex items-center justify-center mb-6 ring-1 ring-[#0000B3]/10 transition-transform duration-500 group-hover:-translate-y-1">
                  <IconCalendar className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
                </div>
                <div className="w-8 h-[2px] bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4" />
                <h3 className="font-heading font-bold text-2xl text-[#1B2B5E] leading-tight">
                  {t.home.why3H3}
                </h3>
                <p className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed mt-3">
                  {t.home.why3P}
                </p>
              </div>
              <Link
                href={`${base}/catering`}
                className="group/btn inline-flex items-center gap-2.5 rounded-full border border-[#1B2B5E]/20 px-5 py-2.5 mt-6 self-start text-[#1B2B5E] text-xs font-semibold uppercase tracking-wider transition-all duration-500 hover:border-[#0000B3] hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:bg-[#0000B3]/5 active:scale-[0.98] relative z-10"
              >
                Explore Catering
                <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-[#0000B3]/10 transition-all duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px">
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
          className={`mt-8 transition-all duration-500 delay-150 ease-[cubic-bezier(0.32,0.72,0,1)] ${stripInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div
            className="rounded-[2rem] p-1.5 ring-1 ring-[#1B2B5E]/[0.07]"
            style={{ background: 'linear-gradient(135deg, #000066 0%, #0000B3 100%)' }}
          >
            <div className="rounded-[calc(2rem-0.375rem)] px-8 py-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] relative overflow-hidden">
              {/* Glass reflection */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between flex-wrap gap-5 relative z-10">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {[
                    { label: '100% Halal Certified', Icon: IconShield },
                    { label: 'Freshly Ground Spices Daily', Icon: IconFlame },
                    { label: 'Open Tue–Sun 16:30–22:30', Icon: IconCalendar },
                  ].map(({ label, Icon }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-white/80 text-xs font-body uppercase tracking-wider font-medium">{label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`${base}/contact`}
                  className="group inline-flex items-center gap-3 rounded-full bg-white pl-6 pr-2 py-2 text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-xs font-bold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_4px_16px_rgba(0,0,255,0.3)] active:scale-[0.98] whitespace-nowrap"
                >
                  Reserve a Table
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-[#0000B3]/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
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
