import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { getTranslations, type Locale } from '@/lib/useTranslations'

export default function MenuHeroSection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <div className="relative h-screen overflow-hidden">

      {/* Mobile background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover block md:hidden brightness-105"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://res.cloudinary.com/demy9se9a/video/upload/so_0/v1784923037/menumob_ngkax0.jpg"
      >
        <source src="https://res.cloudinary.com/demy9se9a/video/upload/v1784923037/menumob_ngkax0.mp4" type="video/mp4" />
      </video>

      {/* Desktop background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block brightness-105"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://res.cloudinary.com/demy9se9a/video/upload/so_0/v1784923097/menudesktop_wp5olf.jpg"
      >
        <source src="https://res.cloudinary.com/demy9se9a/video/upload/v1784923097/menudesktop_wp5olf.mp4" type="video/mp4" />
      </video>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
          <span className="text-white text-xs font-medium uppercase tracking-widest">
            {locale === 'nl' ? 'ONS MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG' : 'OUR MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG'}
          </span>
        </div>

        <h1
          className="font-heading font-bold text-white leading-[1.15] max-w-5xl mx-auto"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            textShadow:
              '0 2px 4px rgba(0,0,0,0.95), 0 4px 16px rgba(0,0,0,0.85), 0 8px 40px rgba(0,0,0,0.7)',
          }}
        >

          <span className="block font-bold text-white text-[2.2rem] lg:text-[4.2rem] tracking-normal mb-1">
            {tr.menu.heroH1}
          </span>
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
          <span className="text-white/90 text-lg">✦</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
        </div>



        <p
          className="font-body font-light text-lg text-white/80 max-w-md text-center leading-relaxed"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
        >
          {locale === 'nl' ? (
            <>
              Elke specerij afkomstig uit India.
              <br />
              Vers uit de tandoor, met liefde gemaakt aan de Leyweg.
            </>
          ) : (
            <>
              Every spice sourced from India.
              <br />
              Fresh from the tandoor, made with love in Leyweg.
            </>
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 ease-out  active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
          >
            {tr.common.reserve}
          </Link>
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 ease-out  active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
          >
            {locale === 'nl' ? 'Bekijk Menu' : 'Browse Menu'}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="font-body text-xs text-white/40 uppercase tracking-widest">{locale === 'nl' ? 'Scrollen' : 'Scroll'}</span>
        <ChevronDown size={24} className="text-white/50 animate-bounce" />
      </div>
    </div>
  )
}
