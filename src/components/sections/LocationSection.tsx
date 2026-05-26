'use client'

import Link from 'next/link'
import { RESTAURANT } from '@/lib/constants'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import EmailLink from '@/components/ui/EmailLink'

type HourEntry = {
  day: string
  dayNl: string
  open: boolean
  from?: string
  to?: string
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" />
      <circle cx="12" cy="8" r="2" />
    </svg>
  )
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.99 6.99l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2 4 12 13 22 4" />
    </svg>
  )
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export default function LocationSection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const hours = RESTAURANT.hours as unknown as HourEntry[]
  const { ref, inView } = useInView()

  return (
    <section
      className="py-28 md:py-36 px-5 md:px-12"
      style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        {/* LEFT: Info card  -  double-bezel */}
        <div className="rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
          <div className="rounded-[calc(2rem-0.5rem)] bg-white/[0.03] p-10 md:p-12 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">

            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-medium mb-7">
              <span className="inline-block w-1 h-1 rounded-full bg-[#D4AF37]" />
              Find Us
            </span>

            <h2 className="font-semibold text-4xl md:text-5xl leading-tight mb-10">
              {tr.home.locationH2}
            </h2>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 ring-1 ring-[#D4AF37]/15 mt-0.5">
                  <IconMapPin className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="font-body text-white/70 text-sm leading-relaxed">
                  <p>{RESTAURANT.address.street}</p>
                  <p>{RESTAURANT.address.postcode} {RESTAURANT.address.city}</p>
                  <p>{RESTAURANT.address.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 ring-1 ring-[#D4AF37]/15">
                  <IconPhone className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <a
                  href={`tel:${RESTAURANT.contact.phone}`}
                  className="font-body text-white/70 text-sm hover:text-white transition-colors duration-300"
                >
                  {RESTAURANT.contact.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 ring-1 ring-[#D4AF37]/15">
                  <IconMail className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <EmailLink className="font-body text-white/70 text-sm hover:text-white transition-colors duration-300" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 ring-1 ring-[#D4AF37]/15 mt-0.5">
                  <IconClock className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="space-y-1">
                  {hours.map((hour) => (
                    <div key={hour.day} className="flex gap-4 font-body text-xs text-white/55 py-0.5">
                      <span className="w-24 flex-shrink-0 text-white/40 uppercase tracking-wider">
                        {locale === 'nl' ? hour.dayNl : hour.day}
                      </span>
                      {hour.open ? (
                        <span className="text-white/70">{hour.from} &ndash; {hour.to}</span>
                      ) : (
                        <span className="text-white/25">{tr.common.closed}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-[#D4AF37] pl-7 pr-2 py-2 text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#e8c84a] active:scale-[0.98] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]"
              >
                Reserve a Table
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-black/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
              <a
                href="https://maps.google.com/?q=Leyweg+986+Den+Haag"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/5 pl-7 pr-2 py-2 text-white text-xs uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/30 hover:bg-white/10 active:scale-[0.98]"
              >
                {tr.common.getDirections}
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: Map  -  double-bezel frame */}
        <div className="rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
          <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden min-h-[400px] lg:min-h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.2!2d4.2765!3d52.0583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47890e3caeb27bfd%3A0x8c0b2b2a5c3e4f9a!2sLeyweg%20986%2C%202545%20GW%20Den%20Haag!5e0!3m2!1sen!2snl!4v1680000000000!5m2!1sen!2snl"
              width="100%"
              height="100%"
              className="w-full h-full min-h-[400px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chopras Indian Restaurant locatie in Den Haag op Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
