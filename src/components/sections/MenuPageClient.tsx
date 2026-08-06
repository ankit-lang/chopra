'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { menuCategories, menuItems } from '@/lib/menu-data'
import type { MenuCategoryEntry } from '@/lib/menu-data'
import type { DietaryTag, MenuItem } from '@/types'
import AddToCartButton from '@/components/cart/AddToCartButton'
import { useInView } from '@/hooks/useInView'

function formatPrice(price: number): string {
  return price % 1 === 0 ? `€${price}` : `€${price.toFixed(2)}`
}

function renderDishTitle(name: string) {
  const match = name.match(/^(.+?)\s*(\([^)]+\))$/)
  if (!match) return name

  const [, mainName, variant] = match
  return (
    <>
      {mainName}{' '}
      <span style={{ fontSize: '0.8em' }}>{variant}</span>
    </>
  )
}

function DietaryBadges({ dietary }: { dietary: DietaryTag[] }) {
  const badges: { symbol: string; label: string; key: DietaryTag }[] = [
    { symbol: 'V', label: 'Vegetarian', key: 'veg' },
    { symbol: '🌱', label: 'Vegan', key: 'vegan' },
    { symbol: 'G', label: 'Gluten Free', key: 'glutenFree' },
    { symbol: 'H', label: 'Halal', key: 'halal' },
    { symbol: '🌶️', label: 'Spicy', key: 'spicy' },
  ]

  const activeBadges = badges.filter((b) => dietary.includes(b.key))

  if (activeBadges.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2 min-h-[20px]">
      {activeBadges.map((badge) => {
        if (badge.key === 'vegan' || badge.key === 'spicy') {
          return (
            <span
              key={badge.key}
              className="inline-flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-base font-light leading-normal min-w-[18px] min-h-[20px] pb-0.5 overflow-visible flex-shrink-0"
              title={badge.label}
            >
              {badge.symbol}
            </span>
          )
        }
        const letter = badge.key === 'veg' ? 'V' : badge.key === 'glutenFree' ? 'G' : 'H'
        return (
          <span
            key={badge.key}
            className="w-4 h-4 rounded-full border border-[#06068a] text-[#06068a] font-semibold text-[10px] flex items-center justify-center flex-shrink-0 leading-none"
            title={badge.label}
          >
            {letter}
          </span>
        )
      })}
    </div>
  )
}

function DishGrid({ dishes }: { dishes: MenuItem[] }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
    >
      {dishes.map((item, index) => {
        return (
          <article
            key={item.id}
            itemScope
            itemType="https://schema.org/MenuItem"
            style={{ transitionDelay: `${(index % 8) * 50}ms` }}
            className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 ease-out group flex flex-col justify-between ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            <div>
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-white">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-vibes text-4xl text-[#06068a]/20">
                    {item.name.charAt(0)}
                  </span>
                </div>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={`${item.name} at Chopras Indian Restaurant Den Haag`}
                    fill
                    className={`object-contain p-2 m-auto group-hover:scale-105 transition-transform duration-500 ${item.image.endsWith('apple-juice.png') ? '!max-w-[30%]' : 'w-full'
                      }`}
                    sizes="(max-width: 640px) 50%, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
              </div>

              {/* Card body */}
              <div className="px-4 pt-2.5 pb-0">
                <h3
                  itemProp="name"
                  className="font-vibes text-xl text-[#06068a] leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {renderDishTitle(item.name)}
                </h3>
                <p className=''>
                  {!item.isDrink && <DietaryBadges dietary={item.dietary} />}
                </p>
                <p
                  itemProp="description"
                  className="text-[#1A1A1A]/70 text-sm mt-2 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300"
                >
                  {(() => {
                    const isNl = typeof window !== 'undefined' && window.location.pathname.startsWith('/nl');
                    return isNl && item.descriptionNl ? item.descriptionNl : item.description;
                  })()}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2 flex items-center justify-between mt-auto">
              <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="priceCurrency" content="EUR" />
                <meta itemProp="price" content={item.price.toString()} />
                <p className="text-[#06068a] text-lg font-sans font-normal">
                  {formatPrice(item.price)}
                </p>
              </div>
              <AddToCartButton
                dish={{
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  category: item.category,
                  image: item.image,
                  isHalal: item.dietary.includes('halal'),
                  isVeg: item.dietary.includes('veg') || item.dietary.includes('vegan'),
                }}
              />
            </div>
          </article>
        )
      })}
    </div>
  )
}

interface MenuPageClientProps {
  categories?: MenuCategoryEntry[]
  items?: MenuItem[]
}

export default function MenuPageClient({ categories, items }: MenuPageClientProps) {
  // Filter out the 'vegan' category profile completely up front
  const activeCategories = (categories ?? menuCategories).filter(category => category.id !== 'vegan')
  const activeItems = items ?? menuItems
  const [activeCategory, setActiveCategory] = useState<string>(activeCategories[0]?.id || '')
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 140
      const sections = activeCategories.map((cat) => ({
        id: cat.id,
        element: document.getElementById(cat.id),
      }))

      let currentCategory: string | undefined = sections[0]?.id

      for (const cat of sections) {
        if (!cat.element) continue
        const rect = cat.element.getBoundingClientRect()
        if (rect.top <= headerOffset + 20) {
          currentCategory = cat.id
        }
      }

      if (currentCategory !== undefined) {
        setActiveCategory(currentCategory)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeCategories])

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = document.getElementById(categoryId)
    if (element) {
      const headerOffset = 140
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const activeLink = nav.querySelector<HTMLElement>(`[data-category="${activeCategory}"]`)
    if (activeLink) {
      const navRect = nav.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      const targetScrollLeft =
        nav.scrollLeft + linkRect.left - navRect.left - (navRect.width - linkRect.width) / 2
      nav.scrollTo({ left: targetScrollLeft, behavior: 'smooth' })
    }
  }, [activeCategory])

  return (
    <div className="bg-[#F7F8FC]">
      {/* Sticky category navigation */}
      <nav
        ref={navRef}
        className="w-full overflow-x-auto border-b border-gray-100 bg-white sticky top-[92px] z-10"
        aria-label="Menu categories"
      >
        <div className="flex items-center gap-1 px-6 py-3 w-max mx-auto">
          {activeCategories.map((category) => {
            const isNl = typeof window !== 'undefined' && window.location.pathname.startsWith('/nl')
            const displayShortLabel = isNl ? (category.shortLabelNl || category.shortLabel) : category.shortLabel
            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                data-category={category.id}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick(category.id)
                }}
                aria-label={`Jump to ${displayShortLabel} section`}
                className={`
                  flex-none whitespace-nowrap px-5 py-2.5 rounded-full
                  text-sm font-medium transition-all duration-200
                  ${activeCategory === category.id
                    ? 'btn-gradient font-semibold shadow-sm'
                    : 'bg-white border border-gray-200 text-[#1A1A1A]/60 hover:border-white/50 hover:text-[#1A1A1A]'
                  }
                `}
              >
                {displayShortLabel}
              </a>
            )
          })}
        </div>
      </nav>

      {/* Menu items by category */}
      <div className="pb-12 pt-6 px-6 md:px-16 max-w-7xl mx-auto space-y-16">
        {activeCategories.map((category) => {
          const categoryDishes = activeItems.filter((item) => item.category === category.id)
          if (categoryDishes.length === 0) return null

          const isNl = typeof window !== 'undefined' && window.location.pathname.startsWith('/nl');
          const categoryHeading = isNl ? category.labelNl : category.label;

          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-44"
              aria-labelledby={`heading-${category.id}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2
                  id={`heading-${category.id}`}
                  className="font-vibes text-3xl md:text-4xl text-[#06068a]"
                >
                  {categoryHeading}
                </h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-gray-200 to-transparent" />
              </div>

              <DishGrid dishes={categoryDishes} />
            </section>
          )
        })}
      </div>
    </div>
  )
}