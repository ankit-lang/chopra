'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'

type Dish = {
  id: number
  name: string
  image: string
  desktopImage?: string
  link: string
  sideName?: string
  hideOnDesktop?: boolean
  desktopOrderClass?: string
}

function DishCard({ dish, base, index }: { dish: Dish; base: string; index: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>(0.1)

  return (
    <Link
      ref={ref}
      href={`${base}${dish.link}`}
      style={{
        transitionDelay: inView ? `${index * 120}ms` : '0ms',
      }}
      className={`group relative flex flex-col items-center justify-center overflow-hidden 
        h-[180px] md:h-[520px] w-full rounded-none
        transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'}
        hover:scale-[1.02] z-0 hover:z-10 shadow-md
        ${dish.hideOnDesktop ? 'md:hidden' : ''}
        ${dish.desktopOrderClass || ''}
      `}
    >
      {/* Mobile Image */}
      <Image
        src={dish.image}
        alt={dish.name}
        fill
        className={`object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 brightness-110 ${dish.desktopImage ? 'md:hidden' : ''}`}
        sizes="(max-width: 768px) 100vw, 25vw"
      />

      {/* Desktop Image */}
      {dish.desktopImage && (
        <Image
          src={dish.desktopImage}
          alt={dish.name}
          fill
          className="hidden md:block object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 brightness-110"
          sizes="(max-width: 768px) 1px, 20vw"
        />
      )}

      {/* Title at bottom of portrait card */}
      <div className="absolute inset-0 flex flex-col items-start justify-end p-3 pb-4 md:p-4 text-left z-10 w-full overflow-hidden">
        <h3 className="font-body text-xs md:text-sm text-white font-medium tracking-wide whitespace-nowrap truncate w-full [text-shadow:_0_1px_4px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1">
          {dish.name}
        </h3>
      </div>
    </Link>
  )
}

export default function SignatureDishesGrid({
  dishes,
  base,
}: {
  dishes: Dish[]
  base: string
}) {
  return (
    <section className="w-full overflow-hidden">
      <div className="flex flex-col md:grid md:grid-cols-5 md:gap-0 w-full">
        {dishes.map((dish, index) => (
          <DishCard key={dish.id} dish={dish} base={base} index={index} />
        ))}
      </div>
    </section>
  )
}
