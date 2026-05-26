'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Leaf } from 'lucide-react'
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

function VegetarianBadge() {
  return (
    <Leaf
      size={24}
      className="text-green-500"
      strokeWidth={2.5}
      fill="currentColor"
    />
  )
}

function VeganBadge() {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Leaf
        size={24}
        className="text-[#2D7A2D]"
        strokeWidth={2.5}
        fill="currentColor"
      />
      <span className="absolute text-white text-xs font-bold inset-0 flex items-center justify-center">
        V
      </span>
    </div>
  )
}

function getDietBadge(dietary: DietaryTag[]): 'vegan' | 'vegetarian' | null {
  if (dietary.includes('vegan')) {
    return 'vegan'
  }
  if (dietary.includes('veg')) {
    return 'vegetarian'
  }
  return null
}

function DietBadgeComponent({ type }: { type: 'vegan' | 'vegetarian' }) {
  switch (type) {
    case 'vegan':
      return <VeganBadge />
    case 'vegetarian':
      return <VegetarianBadge />
  }
}

function DishGrid({ dishes }: { dishes: MenuItem[] }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {dishes.map((item, index) => {
        const dietBadge = !item.isDrink ? getDietBadge(item.dietary) : null
        return (
          <article
            key={item.id}
            itemScope
            itemType="https://schema.org/MenuItem"
            style={{ transitionDelay: `${(index % 8) * 50}ms` }}
            className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 ease-out group ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Image */}
            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#1B2B5E]/5 to-[#D4AF37]/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-vibes text-4xl text-[#C7A348]/20">
                  {item.name.charAt(0)}
                </span>
              </div>
              {item.image && (
                <Image
                  src={item.image}
                  alt={`${item.name} at Chopras Indian Restaurant Den Haag`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              )}
              {dietBadge && (
                <div className="absolute top-3 left-3">
                  <DietBadgeComponent type={dietBadge} />
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="p-5">
              <h3
                itemProp="name"
                className="font-vibes text-xl text-[#1A1A1A] leading-tight whitespace-nowrap"
              >
                {renderDishTitle(item.name)}
              </h3>
              <p
                itemProp="description"
                className="text-[#1A1A1A]/60 text-sm mt-1 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300"
              >
                {item.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="EUR" />
                  <meta itemProp="price" content={item.price.toString()} />
                  <p className="text-[#D4AF37] text-lg font-vibes">
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
  const activeCategories = categories ?? menuCategories
  const activeItems = items ?? menuItems
  const [activeCategory, setActiveCategory] = useState<string>(activeCategories[0].id)
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
      // Scroll only the nav container horizontally — never touch vertical page scroll
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
          {activeCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              data-category={category.id}
              onClick={(e) => {
                e.preventDefault()
                handleCategoryClick(category.id)
              }}
              aria-label={`Jump to ${category.shortLabel} section`}
              className={`
                flex-none whitespace-nowrap px-5 py-2.5 rounded-full
                text-sm font-medium transition-all duration-200
                ${
                  activeCategory === category.id
                    ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold shadow-sm'
                    : 'bg-white border border-gray-200 text-[#1A1A1A]/60 hover:border-[#D4AF37]/50 hover:text-[#1A1A1A]'
                }
              `}
            >
              {category.shortLabel}
            </a>
          ))}
        </div>
      </nav>

      {/* Category sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-16">
        {activeCategories.map((category) => {
          const dishes =
            category.id === 'vegan'
              ? activeItems.filter((item) => item.dietary.includes('vegan'))
              : activeItems.filter((item) => item.category === category.id)

          return (
            <section
              key={category.id}
              id={category.id}
              aria-label={`${category.label} - Chopras Indian Restaurant Den Haag`}
              itemScope
              itemType="https://schema.org/MenuSection"
              className="scroll-mt-36"
            >
              {/* Section header */}
              <div className="py-10">
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-3">
                  {category.shortLabel}
                </p>
                <h2
                  itemProp="name"
                  className="font-vibes text-4xl md:text-5xl text-[#C7A348]"
                >
                  {category.label}
                </h2>
                <div className="border-b-2 border-[#D4AF37] w-16 mt-4" />
              </div>

              {/* Dish grid */}
              <DishGrid dishes={dishes} />
            </section>
          )
        })}
      </div>
    </div>
  )
}
