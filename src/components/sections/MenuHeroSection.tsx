import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { getTranslations, type Locale } from '@/lib/useTranslations'

export default function MenuHeroSection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <div className="relative h-screen overflow-hidden">

      {/* Background video — same CDN source as homepage */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero/hero-poster.png"
      >
        <source src="https://res.cloudinary.com/dllsnz1uz/video/upload/v1776214380/chopras_video0415_bkyweg.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.50) 100%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-6">
          <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
            • OUR MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
          </span>
        </div>

        <h1
          className="font-vibes font-bold text-[#F7F8FC] leading-none"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
        >
          <span className="block text-5xl md:text-6xl lg:text-8xl">{tr.menu.heroH1}</span>
          <span className="block italic font-light text-3xl md:text-4xl lg:text-5xl mt-2">
            143 dishes · 13 categories
          </span>
        </h1>

        <div className="w-16 h-px bg-[#D4AF37] mx-auto my-6" />

        <p
          className="font-body font-light text-lg text-white/80 max-w-md text-center leading-relaxed"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
        >
          Every spice sourced from India.
          <br />
          Fresh from the tandoor, made with love on Leyweg.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
          >
            Reserve a Table
          </Link>
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
          >
            Browse Menu
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="font-body text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <ChevronDown size={24} className="text-white/50 animate-bounce" />
      </div>
    </div>
  )
}
