'use client'

import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'

export default function FinalCta({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const { ref, inView } = useInView()

  return (
    <section
      className="py-28 md:py-36 px-5 md:px-12"
      style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
    >
      {/* Double-bezel outer shell */}
      <div
        ref={ref}
        className={`max-w-4xl mx-auto rounded-[2.5rem] bg-white/[0.04] p-2 ring-1 ring-white/10 transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-white/[0.03] px-10 py-16 md:px-20 md:py-20 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">

          <div className="flex items-center gap-4 justify-center mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#D4AF37]/60 text-lg">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>

          <h2
            className={`font-semibold italic text-5xl md:text-6xl lg:text-7xl leading-tight transition-all duration-[900ms] delay-100 ease-[cubic-bezier(0.32,0.72,0,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {tr.home.ctaH2}
          </h2>

          <p
            className={`font-body text-white/55 text-lg md:text-xl mt-6 max-w-xl mx-auto leading-relaxed transition-all duration-[900ms] delay-150 ease-[cubic-bezier(0.32,0.72,0,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {tr.home.ctaSub}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center mt-12 flex-wrap transition-all duration-[900ms] delay-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Link
              href={`${base}/contact`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Reserve a Table
            </Link>
            <Link
              href={`${base}/menu`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.home.ctaMenu}
            </Link>
          </div>

          <p
            className={`font-body text-white/30 text-xs mt-10 tracking-wider transition-all duration-[900ms] delay-[250ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${inView ? 'opacity-100' : 'opacity-0'}`}
          >
            Open Tuesday to Sunday &middot; 16:30 to 22:30 &middot; Leyweg 986, Den Haag
          </p>
        </div>
      </div>
    </section>
  )
}
