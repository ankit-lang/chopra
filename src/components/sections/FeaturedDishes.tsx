'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { type Locale } from '@/lib/useTranslations'

type Category = 'All' | 'Starters' | 'Tandoori' | 'Curries' | 'Biryani' | 'Street Food'

type Dish = {
  id: string
  name: string
  category: Exclude<Category, 'All'>
  image: string
  price: string
  isChefsFavourite?: boolean
  isHalal?: boolean
}

const DISHES: Dish[] = [
  { id: 'onion-bhaji', name: 'Onion Bhaji', category: 'Starters', image: '/images/dishes/onion-bhaji.jpg', price: '€8.50' },
  { id: 'veg-samosa', name: 'Samosa', category: 'Starters', image: '/images/dishes/veg-samosa.webp', price: '€7.50' },
  { id: 'pani-puri', name: 'Pani Puri', category: 'Starters', image: '/images/dishes/pani-puri.webp', price: '€8.50' },
  { id: 'chicken-seekh-kebab', name: 'Chicken Seekh Kebab', category: 'Starters', image: '/images/dishes/chicken-seekh-kebab.jpg', price: '€20.50' },
  { id: 'paneer-tikka', name: 'Paneer Tikka', category: 'Tandoori', image: '/images/dishes/paneer-tikka.webp', price: '€18.00', isChefsFavourite: true },
  { id: 'chicken-tikka', name: 'Chicken Tikka', category: 'Tandoori', image: '/images/dishes/chicken-tikka.webp', price: '€20.50' },
  { id: 'tandoori-chicken', name: 'Tandoori Chicken', category: 'Tandoori', image: '/images/dishes/tandoori-chicken.webp', price: '€22.50' },
  { id: 'chicken-malai-tikka', name: 'Chicken Malai Tikka', category: 'Tandoori', image: '/images/dishes/chicken-malai-tikka.webp', price: '€20.50' },
  { id: 'butter-chicken', name: 'Butter Chicken', category: 'Curries', image: '/images/dishes/butter-chicken.webp', price: '€18.50', isChefsFavourite: true },
  { id: 'mutton-rogan-josh', name: 'Mutton Rogan Josh', category: 'Curries', image: '/images/dishes/mutton-rogan-josh.webp', price: '€21.50' },
  { id: 'dal-makhani', name: 'Dal Makhani', category: 'Curries', image: '/images/dishes/dal-makhani.webp', price: '€16.00' },
  { id: 'chilli-paneer', name: 'Chilli Paneer', category: 'Curries', image: '/images/dishes/chilli-paneer.webp', price: '€16.00' },
  { id: 'chicken-biryani', name: 'Chicken Biryani', category: 'Biryani', image: '/images/dishes/chicken-biryani.webp', price: '€18.50' },
  { id: 'lamb-biryani', name: 'Lamb Biryani', category: 'Biryani', image: '/images/dishes/muton-biryani.webp', price: '€21.50', isChefsFavourite: true },
  { id: 'pani-puri-street', name: 'Pani Puri', category: 'Street Food', image: '/images/dishes/pani-puri.webp', price: '€8.50' },
  { id: 'samosa-chaat', name: 'Samosa Chaat', category: 'Street Food', image: '/images/dishes/samosa-chaat.webp', price: '€9.50' },
  { id: 'papdi-chaat', name: 'Papdi Chaat', category: 'Street Food', image: '/images/dishes/papdi-chaat.webp', price: '€9.00' },
  { id: 'aloo-tikki', name: 'Aloo Tikki', category: 'Street Food', image: '/images/dishes/aloo-tikki.webp', price: '€8.50' },
]

const CATEGORIES: Category[] = ['All', 'Starters', 'Tandoori', 'Curries', 'Biryani', 'Street Food']

export default function FeaturedDishes({ locale = 'en' }: { locale?: Locale }) {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const base = locale === 'nl' ? '/nl' : ''
  const { ref: headRef, inView: headInView } = useInView()
  const { ref: scrollRef, inView: scrollInView } = useInView()

  const visibleDishes =
    activeCategory === 'All' ? DISHES : DISHES.filter((d) => d.category === activeCategory)

  return (
    <section
      // style={{ background: 'linear-gradient(135deg, #000066 0%, #0000B3 100%)' }}
      className="py-28 md:py-36 px-5 bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white font-medium mb-5">
              <span className="inline-block w-1 h-1 rounded-full bg-white" />
              From Our Kitchen
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.4] [letter-spacing:0.02em] mt-2 mb-6 max-w-xl text-white">
              Our Most Loved Indian Dishes in Den Haag
            </h2>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span className="text-white/80 text-sm">Butter Chicken Den Haag</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span className="text-white/80 text-sm">Biryani Den Haag</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span className="text-white/80 text-sm">Tandoori Den Haag</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span className="text-white/80 text-sm">143 dishes · made fresh daily</span>
            </div>
          </div>
        </div>

        {/* Category pill bar */}
        <div className="mt-10 mb-1">
          <div className="inline-flex gap-2 rounded-full bg-white/[0.06] p-1.5 ring-1 ring-white/10 overflow-x-auto max-w-full scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap cursor-pointer ${activeCategory === cat
                    ? 'bg-white text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]'
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dish cards  -  double-bezel */}
        <div
          ref={scrollRef}
          className={`flex gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrollInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {visibleDishes.map((dish) => (
            <div key={dish.id} className="flex-none w-52 snap-start">
              <div className="rounded-[1.75rem] bg-white/[0.06] p-1.5 ring-1 ring-white/10 group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-white/20 hover:bg-white/10">
                <div className="relative w-full aspect-square rounded-[calc(1.75rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                  <Image
                    src={dish.image}
                    alt={`${dish.name} at Chopras Indian Restaurant Den Haag`}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    sizes="220px"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  {dish.isChefsFavourite && (
                    <div className="absolute top-2.5 left-2.5 rounded-full bg-[#0000B3]/90 px-3 py-1 text-[9px] text-white font-semibold uppercase tracking-wider backdrop-blur-sm">
                      Chef&apos;s Pick
                    </div>
                  )}
                </div>
                <div className="px-3 py-3">
                  <h3 className="text-white font-medium text-sm leading-tight font-body">{dish.name}</h3>
                  <p className="text-white/70 text-sm font-semibold mt-1 font-body">{dish.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href={`${base}/menu`}
            className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-[#0000B3]/10 pl-7 pr-2 py-2 text-white text-sm font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/60 hover:bg-[#0000B3]/20 active:scale-[0.98]"
          >
            Explore Full Menu
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-[#0000B3]/20 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
