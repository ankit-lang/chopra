'use client'

import Link from 'next/link'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import AnimatedContent from '@/components/ui/AnimatedContent'

export default function FinalCta({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <section
      className="relative overflow-hidden py-2 md:py-2 px-5 md:px-12 btn-gradient"
    >
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={true}
        duration={0.8}
        ease="bounce.out"
        initialOpacity={0}
        animateOpacity={true}
        scale={1.2}
        threshold={0.3}
        delay={0.7}
      >
        <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
          <div className="relative overflow-hidden rounded-[calc(2.5rem-0.375rem)] bg-white/[0.06] backdrop-blur-xl px-10 py-4 md:px-16 md:py-4 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            {/* Glass reflection */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

            {/* Ambient inner glow */}
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4 justify-center mb-10">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-white/40" />
              <span className="text-white/80 text-xl">✦</span>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-white/40" />
            </div>

            <h2 className="relative z-10 font-heading font-bold italic text-2xl md:text-2xl lg:text-[3rem] leading-[1.1] tracking-tight text-white">
              {tr.home.ctaH2}
            </h2>

            <p className="relative z-10 font-body text-white/70 text-base md:text-sm mt-6 max-w-xl mx-auto leading-relaxed">
              {tr.home.ctaSub}
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-8">
              <Link
                href={`${base}/contact`}
                className="group inline-flex border border-white items-center justify-center gap-3 rounded-full bg-white px-8 py-3.5 text-white bg-clip-text btn-gradient text-xs font-bold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] active:scale-[0.98] min-h-[52px]"
              >
                Reserve a Table
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-[#0000B3]/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link
                href={`${base}/menu`}
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-white text-xs font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/40 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:scale-[0.98] min-h-[52px]"
              >
                {tr.home.ctaMenu}
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <a
                href="https://www.ubereats.com/nl/store/chopras-indian-restaurant/kFKhBtR-W3OkJyl2f6QmUg?diningMode=PICKUP&rwg_token=AE37R_ghhkKfmgWCe2qjInaOuMXw1I7-NSc1qhAqMmiT-OmziChcPJosGCuLqi6xuYisGAutc7m-qdKhMYFfLrvm-V3WxO8RAQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-white text-xs font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/40 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:scale-[0.98] min-h-[52px]"
              >
                Uber Eats
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a
                href="https://widget.thefork.com/en/1b30051f-4e07-4fe9-8386-b9a1501fdf2a?step=date"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-white text-xs font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/40 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:scale-[0.98] min-h-[52px]"
              >
                TheFork
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a
                href="https://www.thuisbezorgd.nl/menu/chopras-indian-street-food?serviceType=collection&__cf_chl_f_tk=ODykZzR8neqHCVuEAp6QQByBG4nK8MMQtOLYTqyeurE-1782984103-1.0.1.1-iXVInqojN0Xg6RTPME4qxKtw2qj.GmBBLWFVhcYrmw8"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-white text-xs font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/40 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:scale-[0.98] min-h-[52px]"
              >
                Thuisbezorgd
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>


          </div>
        </div>
      </AnimatedContent>
    </section>
  )
}
