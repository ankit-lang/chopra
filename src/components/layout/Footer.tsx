'use client'

import Link from 'next/link'
import Image from 'next/image'
import { RESTAURANT } from '@/lib/constants'
import type { Locale } from '@/lib/useTranslations'

export default function Footer({ locale }: { locale: Locale }) {
  const base = locale === 'nl' ? '/nl' : ''

  const DISHES_LINKS = [
    { label: 'Biryani Den Haag', href: `${base}/biryani-den-haag` },
    { label: 'Butter Chicken Den Haag', href: `${base}/butter-chicken-den-haag` },
    { label: 'Tandoori Den Haag', href: `${base}/tandoori-den-haag` },
    { label: 'Dal Makhani Den Haag', href: `${base}/dal-makhani-den-haag` },
    { label: 'Mutton Rogan Josh', href: `${base}/mutton-rogan-josh-den-haag` },
    { label: 'Naan Den Haag', href: `${base}/naan-den-haag` },
    { label: 'Chaat Den Haag', href: `${base}/chaat-den-haag` },
    { label: 'Pani Puri Den Haag', href: `${base}/pani-puri-den-haag` },
    { label: 'Soya Chaap Den Haag', href: `${base}/soya-chaap-den-haag` },
    { label: 'Indo Chinese Food', href: `${base}/indo-chinese-restaurant-den-haag` },
    { label: 'Indian Buffet', href: `${base}/indian-buffet-den-haag` },
  ]

  const MENU_LINKS = [
    { label: 'Full Menu', href: `${base}/menu` },
    { label: 'Halal Menu', href: `${base}/halal-menu` },
    { label: 'Vegan Menu', href: `${base}/vegan-menu` },
    { label: 'Halal Indian Restaurant Netherlands', href: `${base}/halal-indian-restaurant-netherlands` },
    { label: 'Indian Food Netherlands', href: `${base}/indian-food-netherlands` },
  ]

  const CATERING_LINKS = locale === 'nl'
    ? [
        { label: 'Indiaas Catering', href: `${base}/catering` },
        { label: 'Bruiloft Catering', href: `${base}/bruiloft-catering-den-haag` },
        { label: 'Verjaardag Catering', href: `${base}/indian-birthday-catering-den-haag` },
        { label: 'Corporate Events', href: `${base}/corporate-events-den-haag` },
        { label: 'Diwali Dinner', href: `${base}/diwali-dinner-den-haag` },
      ]
    : [
        { label: 'Indian Catering', href: `${base}/catering` },
        { label: 'Wedding Catering', href: `${base}/indian-wedding-catering-den-haag` },
        { label: 'Birthday Catering', href: `${base}/indian-birthday-catering-den-haag` },
        { label: 'Corporate Events', href: `${base}/corporate-events-den-haag` },
        { label: 'Diwali Dinner', href: `${base}/diwali-dinner-den-haag` },
      ]

  const FEESTZAAL_LINKS = locale === 'nl'
    ? [
        { label: 'Feestzaal Huren Den Haag', href: `${base}/feestzaal-den-haag` },
        { label: 'Zaal Huren Den Haag', href: `${base}/zaal-huren-den-haag` },
        { label: 'Evenementenruimte Den Haag', href: `${base}/evenementenruimte-den-haag` },
        { label: 'Party Venue Den Haag', href: `${base}/feestzaal-den-haag` },
      ]
    : [
        { label: 'Private Event Hall', href: `${base}/feestzaal-den-haag` },
        { label: 'Wedding Catering', href: `${base}/indian-wedding-catering-den-haag` },
        { label: 'Birthday Catering', href: `${base}/indian-birthday-catering-den-haag` },
        { label: 'Corporate Events', href: `${base}/corporate-events-den-haag` },
      ]

  const NEAR_YOU_LINKS = [
    { label: 'Indian Restaurant Delft', href: `${base}/indian-restaurant-delft` },
    { label: 'Indian Restaurant Rijswijk', href: `${base}/indian-restaurant-rijswijk` },
    { label: 'Indian Restaurant Voorburg', href: `${base}/indian-restaurant-voorburg` },
    { label: 'Indian Restaurant Leidschendam', href: `${base}/indian-restaurant-leidschendam` },
    { label: 'Indian Restaurant Westland', href: `${base}/indian-restaurant-westland` },
    { label: 'Indian Restaurant Zoetermeer', href: `${base}/indian-restaurant-zoetermeer` },
    { label: 'Near Peace Palace', href: `${base}/indian-restaurant-near-peace-palace-den-haag` },
    { label: 'Near Den Haag Centraal', href: `${base}/indian-restaurant-near-den-haag-centraal` },
  ]

  const ORDER_EXPLORE_LINKS = [
    { label: 'Indian Food Delivery', href: `${base}/indian-food-delivery-den-haag` },
    { label: 'Indian Takeaway', href: `${base}/indian-takeaway-den-haag` },
    { label: 'Beste Indiaas Restaurant', href: `${base}/beste-indiaas-restaurant-den-haag` },
    { label: 'Family Restaurant Den Haag', href: `${base}/family-restaurant-den-haag` },
  ]

  return (
    <footer className="relative text-white overflow-hidden bg-[#000066]" style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}>
      {/* Decorative top border with glowing effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C7A348] to-transparent opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#C7A348] opacity-20 blur-sm" />

      {/* Main content */}
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
            
            {/* SECTION 1 - Brand Column */}
            <div className="lg:col-span-4 flex flex-col gap-8 pr-0 lg:pr-8">
              {/* Logo */}
              <Link href={base} className="inline-block transform hover:scale-105 transition-transform duration-500 origin-left">
                <Image
                  src={RESTAURANT.logo}
                  alt="Chopras Indian Restaurant logo"
                  width={160}
                  height={60}
                  className="h-14 w-auto object-contain drop-shadow-lg"
                />
              </Link>

              {/* Tagline */}
              <div className="flex flex-col gap-1">
                <p className="text-white/90 text-base leading-relaxed font-light tracking-wide">
                  Den Haag&apos;s Most Authentic <span className="text-[#C7A348] font-medium">Indian Restaurant</span>
                </p>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Address Block */}
                <address className="not-italic flex flex-col gap-1 text-sm font-light">
                  <p className="text-white/80">{RESTAURANT.address.street}</p>
                  <p className="text-white/80">{RESTAURANT.address.postcode} {RESTAURANT.address.city}</p>
                  <div className="flex items-center gap-3 pt-3 mt-3 border-t border-white/10">
                    <a
                      href={`tel:${RESTAURANT.contact.phone}`}
                      className="text-white hover:text-[#C7A348] transition-colors duration-300 font-medium"
                    >
                      {RESTAURANT.contact.phoneDisplay}
                    </a>
                    <div className="w-1 h-1 rounded-full bg-[#C7A348]/50" />
                    <a
                      href="https://wa.me/31630645930"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#C7A348] transition-colors duration-300 flex items-center gap-2"
                      aria-label="WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.967 1.523.505.505 0 00-.223.579l1.514 3.885a.498.498 0 00.596.28 8.88 8.88 0 014.487-1.228h.004c4.896 0 8.876 3.98 8.876 8.877 0 4.897-3.98 8.877-8.877 8.877-4.896 0-8.877-3.98-8.877-8.877v-.004a8.877 8.877 0 011.34-4.585.498.498 0 00-.051-.595l-1.511-3.884a.505.505 0 00-.58-.225 11.88 11.88 0 00-6.024 6.73.503.503 0 00.071.615l3.838 3.16c.142.118.338.104.456 0 2.03-2.049 4.896-3.206 7.82-3.206 6.335 0 11.5 5.165 11.5 11.5S18.84 22.6 12.503 22.6s-11.5-5.165-11.5-11.5c0-3.026 1.159-5.864 3.256-7.982a.502.502 0 00-.039-.636L.84 1.062a.505.505 0 00-.568-.075 11.88 11.88 0 006.024 6.73z" />
                      </svg>
                      <span className="text-xs uppercase tracking-wider">WhatsApp</span>
                    </a>
                  </div>
                </address>

                {/* Opening Hours */}
                <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                  <p className="text-[10px] font-bold text-[#C7A348] uppercase tracking-[0.2em]">Opening Hours</p>
                  <div className="flex flex-col gap-1 text-sm font-light text-white/80">
                    <div className="flex justify-between items-center">
                      <span>Tue - Sun</span>
                      <span className="text-white font-medium">16:30 - 22:30</span>
                    </div>
                    <div className="flex justify-between items-center text-white/50">
                      <span>Monday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={RESTAURANT.social.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-5 py-3 w-fit transition-all duration-300"
                >
                  <span className="text-[#C7A348] text-xl leading-none">★</span>
                  <span className="text-sm font-medium tracking-wide">TripAdvisor Reviewed</span>
                </a>
                <p className="text-xs text-white/50 px-2 font-light tracking-wide">
                  Rated <span className="text-white font-medium">4.9 ★</span> on Google · 800+ reviews
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={RESTAURANT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chopras Indian Restaurant on Instagram"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-[#C7A348]/20 border border-white/10 hover:border-[#C7A348]/40 text-white/60 hover:text-[#C7A348] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href={RESTAURANT.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chopras Indian Restaurant on YouTube"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-[#C7A348]/20 border border-white/10 hover:border-[#C7A348]/40 text-white/60 hover:text-[#C7A348] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href={RESTAURANT.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chopras Indian Restaurant on X"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-[#C7A348]/20 border border-white/10 hover:border-[#C7A348]/40 text-white/60 hover:text-[#C7A348] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* SECTION 2 - Navigation Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 pt-2 lg:pt-0">
              
              {/* Column 1 - Our Dishes */}
              <div className="flex flex-col">
                <h3 className="font-serif text-[#C7A348] text-xl font-medium mb-8 relative inline-block w-fit">
                  Our Dishes
                  <span className="absolute -bottom-3 left-0 w-1/2 h-px bg-gradient-to-r from-[#C7A348] to-transparent"></span>
                </h3>
                <ul className="flex flex-col gap-4">
                  {DISHES_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="group flex items-center text-sm font-light text-white/70 hover:text-white transition-all duration-300">
                        <span className="w-0 h-px bg-[#C7A348] mr-0 opacity-0 group-hover:w-4 group-hover:mr-3 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 - Menu & Order */}
              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="font-serif text-[#C7A348] text-xl font-medium mb-8 relative inline-block w-fit">
                    Menu
                    <span className="absolute -bottom-3 left-0 w-1/2 h-px bg-gradient-to-r from-[#C7A348] to-transparent"></span>
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {MENU_LINKS.map(({ label, href }) => (
                      <li key={href}>
                        <Link href={href} className="group flex items-center text-sm font-light text-white/70 hover:text-white transition-all duration-300">
                          <span className="w-0 h-px bg-[#C7A348] mr-0 opacity-0 group-hover:w-4 group-hover:mr-3 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-[#C7A348] text-xl font-medium mb-8 relative inline-block w-fit">
                    Explore
                    <span className="absolute -bottom-3 left-0 w-1/2 h-px bg-gradient-to-r from-[#C7A348] to-transparent"></span>
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {ORDER_EXPLORE_LINKS.map(({ label, href }) => (
                      <li key={href}>
                        <Link href={href} className="group flex items-center text-sm font-light text-white/70 hover:text-white transition-all duration-300">
                          <span className="w-0 h-px bg-[#C7A348] mr-0 opacity-0 group-hover:w-4 group-hover:mr-3 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3 - Catering & Feestzaal */}
              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="font-serif text-[#C7A348] text-xl font-medium mb-8 relative inline-block w-fit">
                    Catering
                    <span className="absolute -bottom-3 left-0 w-1/2 h-px bg-gradient-to-r from-[#C7A348] to-transparent"></span>
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {CATERING_LINKS.map(({ label, href }) => (
                      <li key={href}>
                        <Link href={href} className="group flex items-center text-sm font-light text-white/70 hover:text-white transition-all duration-300">
                          <span className="w-0 h-px bg-[#C7A348] mr-0 opacity-0 group-hover:w-4 group-hover:mr-3 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-[#C7A348] text-xl font-medium mb-8 relative inline-block w-fit">
                    Events
                    <span className="absolute -bottom-3 left-0 w-1/2 h-px bg-gradient-to-r from-[#C7A348] to-transparent"></span>
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {FEESTZAAL_LINKS.map(({ label, href }) => (
                      <li key={href}>
                        <Link href={href} className="group flex items-center text-sm font-light text-white/70 hover:text-white transition-all duration-300">
                          <span className="w-0 h-px bg-[#C7A348] mr-0 opacity-0 group-hover:w-4 group-hover:mr-3 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 4 - Near You */}
              <div className="flex flex-col">
                <h3 className="font-serif text-[#C7A348] text-xl font-medium mb-8 relative inline-block w-fit">
                  Near You
                  <span className="absolute -bottom-3 left-0 w-1/2 h-px bg-gradient-to-r from-[#C7A348] to-transparent"></span>
                </h3>
                <ul className="flex flex-col gap-4">
                  {NEAR_YOU_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="group flex items-center text-sm font-light text-white/70 hover:text-white transition-all duration-300">
                        <span className="w-0 h-px bg-[#C7A348] mr-0 opacity-0 group-hover:w-4 group-hover:mr-3 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/10 backdrop-blur-md">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-light tracking-wide text-white/50">
              © {new Date().getFullYear()} Chopras Indian Restaurant Den Haag. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs font-light text-white/50">
              <Link href={`${base}/privacy-policy`} className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link href={`${base}/terms`} className="hover:text-white transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
