'use client'

import Link from 'next/link'
import Image from 'next/image'
import { RESTAURANT } from '@/lib/constants'
import type { Locale } from '@/lib/useTranslations'
import EmailLink from '../ui/EmailLink'

type HourEntry = {
  day: string
  dayNl: string
  open: boolean
  from?: string
  to?: string
}

export default function Footer({ locale }: { locale: Locale }) {
  const base = locale === 'nl' ? '/nl' : ''
  const hours = RESTAURANT.hours as unknown as HourEntry[]

  const MENU_LINKS = [
    { label: 'Full Menu', href: `${base}/menu` },
    { label: 'Halal Menu', href: `${base}/halal-menu` },
    { label: 'Vegan Menu', href: `${base}/vegan-menu` },
    { label: 'Catering', href: `${base}/catering` },
    { label: 'Private Events', href: `${base}/feestzaal-den-haag` },
  ]

  return (
    <footer className="relative btn-gradient text-white overflow-hidden pt-24 border-t border-white/10">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[1100px] h-[1100px] bg-[#06068a]/50 rounded-full blur-[180px] pointer-events-none" />

      {/* Massive Brand Watermark */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.03] select-none z-0">
        <span className="font-heading font-bold text-[22vw] leading-none whitespace-nowrap tracking-tighter uppercase">
          Chopras
        </span>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* 1. Brand & Contact */}
          <div className="bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/[0.08] transition-colors duration-500 flex flex-col group">
            <Link href={base} className="block transform group-hover:scale-105 transition-transform duration-500  mb-8 -ml-[34px] md:-ml-[57px] ">
              <Image
                src={RESTAURANT.logo}
                alt="Chopras Indian Restaurant logo"
                width={280}
                height={170}
                className="h-20 md:h-32 w-auto object-contain object-left drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              />
            </Link>

            <div className="flex flex-col gap-6 text-white/90 font-body font-light text-[15px] mt-auto">
              <address className="not-italic flex flex-col gap-1">
                <p className='text-white font-medium tracking-wide'>{RESTAURANT.address.street}</p>
                <p className='text-white font-medium tracking-wide'>{RESTAURANT.address.postcode} {RESTAURANT.address.city}</p>
              </address>
              <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                <a href={`tel:${RESTAURANT.contact.phone}`} className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </span>
                  +31 630 64 59 30
                </a>
                <a href="https://wa.me/31630645930" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <svg className="w-4 h-4 translate-x-[0.5px]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </span>
                  +31 630 64 59 30
                </a>
                <EmailLink className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </span>
                  info@chopras.nl
                </EmailLink>
              </div>
            </div>
          </div>

          {/* 2. Hours */}
          <div className="bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/[0.08] transition-colors duration-500 flex flex-col">
            <h3 className="font-heading text-white text-2xl font-bold tracking-wide mb-10">
              Opening Hours
            </h3>
            <div className="flex flex-col gap-5 font-body font-light text-[15px] text-white/90">
              <div className="flex justify-between items-center bg-white/10 rounded-xl p-4 border border-white/10">
                <span className="tracking-wide">Tue - Sun</span>
                <span className="text-[#06068a] font-bold bg-white px-3 py-1 rounded-full text-sm">16:30 - 22:30</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-white/60 tracking-wide">Monday</span>
                <span className="text-white/50 font-medium uppercase text-xs tracking-widest">Closed</span>
              </div>
            </div>
          </div>

          {/* 3. Menu Links */}
          <div className="bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/[0.08] transition-colors duration-500 flex flex-col">
            <h3 className="font-heading text-white text-2xl font-bold tracking-wide mb-10">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {MENU_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="group flex items-center justify-between text-[15px] font-light text-white/80 hover:text-white transition-all duration-300 bg-white/[0.05] hover:bg-white/20 border border-transparent hover:border-white/20 rounded-xl p-3">
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">{label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-white">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Social & Badges */}
          <div className="bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/[0.08] transition-colors duration-500 flex flex-col">
            <h3 className="font-heading text-white text-2xl font-bold tracking-wide mb-10">Connect</h3>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a href={RESTAURANT.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-[#06068a] hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href={RESTAURANT.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-[#06068a] hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href={RESTAURANT.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-[#06068a] hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg>
              </a>
              <a href={RESTAURANT.social.x} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-[#06068a] hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <a
                href={RESTAURANT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-1.5 bg-white/10 border border-white/20 rounded-2xl p-4 transition-all duration-500 hover:bg-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] text-center"
              >
                <div className="flex text-white group-hover:text-[#06068a] text-2xl tracking-widest leading-none transition-colors duration-300">★★★★★</div>
                <div className="flex flex-col relative z-10">
                  <span className="text-sm font-bold tracking-wide text-white group-hover:text-[#06068a] transition-colors duration-300">Google Reviews</span>
                  <span className="text-[10px] text-white/80 group-hover:text-[#06068a]/80 uppercase tracking-widest transition-colors duration-300 mt-1">Based on 1100+ Reviews</span>
                </div>
              </a>

              <a
                href={RESTAURANT.social.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-1.5 bg-white/10 border border-white/20 rounded-2xl p-4 transition-all duration-500 hover:bg-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] text-center"
              >
                <div className="flex text-white group-hover:text-[#06068a] text-2xl tracking-widest leading-none transition-colors duration-300">★★★★★</div>
                <div className="flex flex-col relative z-10">
                  <span className="text-sm font-bold tracking-wide text-white group-hover:text-[#06068a] transition-colors duration-300">TripAdvisor</span>
                  <span className="text-[10px] text-white/80 group-hover:text-[#06068a]/80 uppercase tracking-widest transition-colors duration-300 mt-1">Rated Excellent</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 btn-gradient  backdrop-blur-xl relative z-20">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light tracking-wide text-white/70">
            © {new Date().getFullYear()} Chopras Indian Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs font-light text-white/70">
            <Link href={`${base}/privacy-policy`} className="hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Privacy Policy</Link>
            <Link href={`${base}/terms`} className="hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
