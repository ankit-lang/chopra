'use client'

import { Star } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { RESTAURANT } from '@/lib/constants'

export default function ReviewsSection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const { ref: headerRef, inView: headerInView } = useInView()
  const { ref: cardsRef, inView: cardsInView } = useInView()

  const reviews = [
    { name: tr.home.review1Name, text: tr.home.review1Text },
    { name: tr.home.review2Name, text: tr.home.review2Text },
    { name: tr.home.review3Name, text: tr.home.review3Text },
  ]

  return (
    <section className="bg-[#F7F8FC] py-24 px-6 md:px-16">
      {/* Header */}
      <div
        ref={headerRef}
        className={`text-center transition-all duration-500 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
          <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">• WHAT OUR GUESTS SAY •</span>
        </div>
        <h2 className="font-semibold text-4xl md:text-5xl mb-6 leading-[1.4] [letter-spacing:0.02em] mt-2">
          {tr.home.reviewsH2}
        </h2>
        <p className="font-body text-[#1A1A1A]/60 mt-3">{tr.home.reviewsSub}</p>

        {/* Aggregate rating */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={20} className="text-[#D4AF37] fill-[#D4AF37]" />
          ))}
          <span className="font-body text-[#1A1A1A]/60 text-sm ml-2">
            4.9 out of 5 &middot; 800+ Google reviews
          </span>
        </div>
      </div>

      {/* Review cards */}
      <div
        ref={cardsRef}
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 transition-all duration-500 ease-out ${cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        {reviews.map((review, i) => (
          <div
            key={review.name}
            className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''}`}
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <p className="font-body text-[#1A1A1A]/80 text-base italic leading-relaxed mt-4">
              &ldquo;{review.text}&rdquo;
            </p>
            <p className="font-body font-semibold text-[#1B2B5E] text-sm mt-6">{review.name}</p>
            <p className="font-body text-[#1A1A1A]/40 text-xs mt-1">Google Review</p>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
        <a
          href={RESTAURANT.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1A1A1A] px-8 py-4 rounded-full font-body font-semibold uppercase tracking-widest text-sm hover:bg-[#F5D36A] transition-all duration-200"
        >
          <Star className="w-4 h-4" />
          Write a Google Review
        </a>
        <a
          href={RESTAURANT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body font-semibold text-sm uppercase tracking-widest text-[#1B2B5E] underline-offset-4 hover:underline"
        >
          {tr.home.reviewsLink}
        </a>
      </div>
    </section>
  )
}
