'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'

export default function StorySection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const { ref: imgRef, inView: imgInView } = useInView()
  const { ref: textRef, inView: textInView } = useInView()

  return (
    <section className="bg-[#F7F8FC] py-28 md:py-36 px-5 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT: Double-bezel image */}
        <div
          ref={imgRef}
          className={`block md:sticky md:top-[108px] self-start transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${imgInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Outer shell */}
          <div className="rounded-[2rem] bg-[#1B2B5E]/[0.04] p-2 ring-1 ring-[#1B2B5E]/[0.07]">
            {/* Inner core */}
            <div className="relative aspect-[4/5] rounded-[calc(2rem-0.5rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
              <Image
                src="/images/restaurant/people-enjoying-food---best.png"
                alt="Guests enjoying dinner at Chopras Indian Restaurant Den Haag"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1B2B5E]/30 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating dish  -  double-bezel */}
          <div className="absolute -bottom-5 -right-3 rounded-[1.25rem] bg-[#F7F8FC]/80 p-1.5 ring-1 ring-[#1B2B5E]/10 shadow-lg backdrop-blur-sm">
            <div className="relative w-28 h-28 rounded-[calc(1.25rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
              <Image
                src="/images/dishes/butter-chicken.webp"
                alt="Butter Chicken at Chopras Indian Restaurant"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
          </div>

          {/* Editorial year stamp */}
          <div className="hidden md:flex absolute -left-3 top-8 rounded-full bg-[#D4AF37]/10 px-4 py-2 ring-1 ring-[#D4AF37]/25 backdrop-blur-sm">
            <span className="font-body text-[10px] text-[#D4AF37] uppercase tracking-[0.2em]">Est. 2023</span>
          </div>
        </div>

        {/* RIGHT: Story copy */}
        <div
          ref={textRef}
          className={`transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] delay-100 ${textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-medium mb-6">
            <span className="inline-block w-1 h-1 rounded-full bg-[#D4AF37]" />
            Our Story
          </span>

          <h2 className="font-semibold text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.4] [letter-spacing:0.02em] mt-2 mb-6">
            {tr.home.storyH2}
          </h2>

          <div className="font-body text-[#1A1A1A]/70 text-base leading-relaxed mt-7 space-y-4">
            <p>{tr.home.storyP1}</p>
            <p>{tr.home.storyP2}</p>
            <p>{tr.home.storyP3}</p>
            <p>{tr.home.storyP4}</p>
            <p>{tr.home.storyP5}</p>
          </div>

          {/* Stat pills  -  double-bezel chip */}
          <div className="flex flex-wrap gap-3 mt-9">
            <div className="rounded-full bg-[#1B2B5E]/[0.04] p-1 ring-1 ring-[#1B2B5E]/10">
              <span className="block rounded-full bg-[#1B2B5E] text-white px-5 py-2 font-body text-xs uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                Opened 2023 · Leyweg, Den Haag
              </span>
            </div>
            <div className="rounded-full bg-[#D4AF37]/[0.08] p-1 ring-1 ring-[#D4AF37]/20">
              <span className="block rounded-full bg-[#F7F8FC] text-[#1B2B5E] px-5 py-2 font-body text-xs uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                143 Dishes · 12 Categories
              </span>
            </div>
            <div className="rounded-full bg-[#D4AF37]/[0.08] p-1 ring-1 ring-[#D4AF37]/20">
              <span className="block rounded-full bg-[#F7F8FC] text-[#1B2B5E] px-5 py-2 font-body text-xs uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                Indian Street Food Den Haag
              </span>
            </div>
          </div>

          {/* Pill CTA with button-in-button */}
          <Link
            href={`${base}/menu`}
            className="group inline-flex items-center gap-3 rounded-full border border-[#1B2B5E]/15 pl-6 pr-2 py-2 mt-9 text-[#1B2B5E] text-xs font-semibold uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#1B2B5E]/40 hover:bg-[#1B2B5E]/5 active:scale-[0.98]"
          >
            Discover Our Full Menu
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#1B2B5E]/8 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
