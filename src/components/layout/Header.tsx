'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ShoppingBag, ShoppingCart } from 'lucide-react'
import { RESTAURANT } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { useCartStore } from '@/store/cartStore'

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  function getLocalePath(newLocale: Locale): string {
    const withoutEnglishPrefix = pathname.replace(/^\/en(?=\/|$)/, '')
    const slug = withoutEnglishPrefix.startsWith('/nl') ? withoutEnglishPrefix.slice(3) : withoutEnglishPrefix
    const clean = slug || '/'
    return newLocale === 'nl' ? `/nl${clean === '/' ? '' : clean}` : clean
  }

  return (
    <div className="flex items-center bg-white/[0.08] rounded-full p-0.5">
      <a
        href={getLocalePath('en')}
        aria-label="Switch to English"
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
          locale === 'en'
            ? 'bg-white text-[#1B2B5E] shadow-sm'
            : 'text-white/60 hover:text-white'
        )}
      >
        EN
      </a>
      <a
        href={getLocalePath('nl')}
        aria-label="Switch to Nederlands"
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
          locale === 'nl'
            ? 'bg-white text-[#1B2B5E] shadow-sm'
            : 'text-white/60 hover:text-white'
        )}
      >
        NL
      </a>
    </div>
  )
}

export default function Header({ locale }: { locale: Locale }) {
  const tr = getTranslations(locale)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = getTotalItems()

  const base = locale === 'nl' ? '/nl' : ''

  // Plain links (no dropdown)
  const HOME_LINK = { label: tr.common.nav.home, href: base || '/' }
  const BLOG_LINK = { label: tr.common.nav.blog, href: `${base}/blog` }
  const VAC_LINK = { label: tr.common.nav.vacancy, href: `${base}/vacancy` }
  const CONT_LINK = { label: tr.common.nav.contact, href: `${base}/contact` }
  const FEESTZAAL_LINK = { label: 'Feestzaal', href: `${base}/feestzaal-den-haag` }

  const cateringLinks = locale === 'nl'
    ? [
      { label: 'Indiaas Catering Den Haag', href: `${base}/catering` },
      { label: 'Bruiloft Catering', href: `${base}/bruiloft-catering-den-haag` },
      { label: 'Zaal Huren Den Haag', href: `${base}/zaal-huren-den-haag` },
      { label: 'Evenementenruimte Den Haag', href: `${base}/evenementenruimte-den-haag` },
      { label: 'Verjaardag Catering', href: `${base}/indian-birthday-catering-den-haag` },
      { label: 'Corporate Events', href: `${base}/corporate-events-den-haag` },
      { label: 'Diwali Dinner', href: `${base}/diwali-dinner-den-haag` },
      { label: 'Indian Buffet Den Haag', href: `${base}/indian-buffet-den-haag` },
    ]
    : [
      { label: 'Indian Catering Den Haag', href: `${base}/catering` },
      { label: 'Wedding Catering', href: `${base}/indian-wedding-catering-den-haag` },
      { label: 'Birthday Catering', href: `${base}/indian-birthday-catering-den-haag` },
      { label: 'Corporate Events', href: `${base}/corporate-events-den-haag` },
      { label: 'Diwali Dinner', href: `${base}/diwali-dinner-den-haag` },
      { label: 'Indian Buffet Den Haag', href: `${base}/indian-buffet-den-haag` },
    ]

  // Ordered: Menu → Catering → Our Dishes → Near You
  const DROPDOWNS = [
    {
      key: 'menu',
      label: 'Menu',
      links: [
        { label: 'Full Menu', href: `${base}/menu` },
        { label: 'Halal Menu', href: `${base}/halal-menu` },
        { label: 'Vegan Menu', href: `${base}/vegan-menu` },
        { label: 'Vegetarian Menu', href: `${base}/vegetarian-menu` },
        { label: 'Gluten-Free Menu', href: `${base}/gluten-free-menu` },
      ],
    },
    {
      key: 'catering',
      label: tr.common.nav.catering,
      links: cateringLinks,
    },
    {
      key: 'dishes',
      label: tr.common.nav.dishes,
      links: [
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
      ],
    },
    {
      key: 'nearYou',
      label: tr.common.nav.nearYou,
      links: [
        { label: 'Indian Restaurant Delft', href: `${base}/indian-restaurant-delft` },
        { label: 'Indian Restaurant Rijswijk', href: `${base}/indian-restaurant-rijswijk` },
        { label: 'Indian Restaurant Zoetermeer', href: `${base}/indian-restaurant-zoetermeer` },
        { label: 'Near Peace Palace', href: `${base}/indian-restaurant-near-peace-palace-den-haag` },
        { label: 'Near Den Haag Centraal', href: `${base}/indian-restaurant-near-den-haag-centraal` },
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    return () => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current) }
  }, [])

  function handleMouseEnter(key: string) {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpenDropdown(key)
  }

  function handleMouseLeave() {
    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 300)
  }

  return (
    <>
      {/* ─── Fixed Header Bar ─── */}
      <header
        className={cn(
          'fixed top-9 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-sm border-b border-white/[0.08] bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]',
          scrolled ? 'h-14 shadow-lg shadow-black/20' : 'h-16'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">

          {/* GROUP 1  -  Logo */}
          <Link href={base || '/'} className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <Image
              src={RESTAURANT.logo}
              alt={`${RESTAURANT.name} logo`}
              width={176}
              height={66}
              className="h-11 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          {/* GROUP 2  -  Nav (lg+)
              Order: Home | Menu↓ | Feestzaal | Catering↓ | Our Dishes↓ | Near You↓ | Blog | Vacancy | Contact
          */}
          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">

            {/* 1. Home */}
            {[HOME_LINK].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap',
                  pathname === href ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                )}
              >
                {label}
              </Link>
            ))}

            {/* 2–5. Dropdowns: Menu, Feestzaal (plain), Catering, Our Dishes, Near You */}
            {DROPDOWNS.map(({ key, label, links }, idx) => {
              const isActive = links.some((l) => pathname.startsWith(l.href))
              const isOpen = openDropdown === key
              return (
                <>
                  {/* Insert Feestzaal between Menu (idx=0) and Catering (idx=1) */}
                  {idx === 1 && (
                    <Link
                      key="feestzaal"
                      href={FEESTZAAL_LINK.href}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap',
                        pathname === FEESTZAAL_LINK.href ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                      )}
                    >
                      {FEESTZAAL_LINK.label}
                    </Link>
                  )}
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      aria-expanded={isOpen}
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap',
                        isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                      )}
                    >
                      {label}
                      <ChevronDown className={cn('w-3.5 h-3.5 text-white/50 transition-transform duration-200', isOpen && 'rotate-180')} />
                    </button>
                    <div
                      className={cn(
                        'absolute top-full left-0 mt-0 pt-2 min-w-[200px] z-50 transition-all duration-200',
                        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-1 pointer-events-none invisible'
                      )}
                    >
                      <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent" />
                      <div className="bg-[#1B2B5E] border border-white/10 rounded-2xl shadow-2xl shadow-black/30 py-2">
                        {links.map(({ label: ll, href: lh }) => (
                          <Link key={lh} href={lh} className="flex items-center px-4 py-2.5 mx-1 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-150 whitespace-nowrap">
                            {ll}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )
            })}

            {/* 6–8. Blog | Vacancy | Contact */}
            {[BLOG_LINK, VAC_LINK, CONT_LINK].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap',
                  pathname === href ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* GROUP 3  -  Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* EN/NL  -  desktop */}
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} />
            </div>

            {/* Order Online  -  desktop */}
            <Link
              href={`${base}/menu`}
              className="hidden lg:flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/15 transition-all duration-200 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-white/70" />
              Order Online
            </Link>

            {/* Cart  -  desktop */}
            <button
              onClick={openCart}
              aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
              className="relative p-2 cursor-pointer hidden lg:block"
            >
              <ShoppingCart className="w-5 h-5 text-white/70 hover:text-white transition-colors duration-150" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Reserve a Table  -  desktop */}
            <Link
              href={`${base}/contact`}
              className="hidden lg:inline-flex items-center bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-[1.05] transition-all border border-gray  duration-200 whitespace-nowrap"
            >
              {tr.common.reserve}
            </Link>

            {/* Cart  -  mobile */}
            <button
              onClick={openCart}
              aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
              className="relative p-2 cursor-pointer lg:hidden"
            >
              <ShoppingCart className="w-5 h-5 text-white/70" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger  -  mobile */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile: dark backdrop ─── */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ─── Mobile: side panel ─── */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 flex flex-col bg-[#1B2B5E] transition-transform duration-300 ease-in-out lg:hidden'
          , mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Panel header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <Link href={base || '/'} onClick={() => setMobileOpen(false)}>
            <Image
              src={RESTAURANT.logo}
              alt={`${RESTAURANT.name} logo`}
              width={140}
              height={52}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable nav list — order: Home | Menu | Feestzaal | Catering | Our Dishes | Near You | Blog | Vacancy | Contact */}
        <div className="flex-1 overflow-y-auto px-4 py-4">

          {/* 1. Home */}
          <Link
            href={HOME_LINK.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'block px-4 py-3 text-base font-medium rounded-xl transition-all duration-150 border-b border-white/5',
              pathname === HOME_LINK.href ? 'text-white' : 'text-white hover:bg-white/[0.08]'
            )}
          >
            {HOME_LINK.label}
          </Link>

          {/* 2. Menu dropdown */}
          {DROPDOWNS.filter(d => d.key === 'menu').map(({ key, label: groupLabel, links }) => (
            <div key={key} className="mt-1">
              <p className="px-4 pt-5 pb-2 text-white text-xs uppercase tracking-widest font-medium">{groupLabel}</p>
              {links.map(({ label: ll, href: lh }) => (
                <Link key={lh} href={lh} onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all duration-150">
                  {ll}
                </Link>
              ))}
            </div>
          ))}

          {/* 3. Feestzaal */}
          <Link
            href={FEESTZAAL_LINK.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'block px-4 py-3 text-base font-medium rounded-xl transition-all duration-150 border-b border-white/5',
              pathname === FEESTZAAL_LINK.href ? 'text-white' : 'text-white hover:bg-white/[0.08]'
            )}
          >
            {FEESTZAAL_LINK.label}
          </Link>

          {/* 4. Catering | 5. Our Dishes | 6. Near You (dropdowns) */}
          {DROPDOWNS.filter(d => d.key !== 'menu').map(({ key, label: groupLabel, links }) => (
            <div key={key} className="mt-1">
              <p className="px-4 pt-5 pb-2 text-white text-xs uppercase tracking-widest font-medium">{groupLabel}</p>
              {links.map(({ label: ll, href: lh }) => (
                <Link key={lh} href={lh} onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all duration-150">
                  {ll}
                </Link>
              ))}
            </div>
          ))}

          {/* 7. Blog | 8. Vacancy | 9. Contact */}
          {[BLOG_LINK, VAC_LINK, CONT_LINK].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-4 py-3 text-base font-medium rounded-xl transition-all duration-150 border-b border-white/5',
                pathname === href ? 'text-white' : 'text-white hover:bg-white/[0.08]'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Panel footer CTAs */}
        <div className="border-t border-white/10 px-4 py-5 space-y-3 flex-shrink-0">
          <Link
            href={`${base}/menu`}
            onClick={() => setMobileOpen(false)}
            className="block w-full border border-white/20 text-white py-3 rounded-xl text-sm font-medium text-center hover:bg-white/[0.08] transition-all duration-150"
          >
            Order Online
          </Link>
          <Link
            href={`${base}/contact`}
            onClick={() => setMobileOpen(false)}
            className="block w-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-white py-3 rounded-xl text-sm font-semibold text-center hover:scale-[1.05] transition-all duration-150"
          >
            {tr.common.reserve}
          </Link>
          <div className="flex justify-center pt-1 pb-2">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </>
  )
}
