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

        <h2 className="font-heading font-semibold text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.4] [letter-spacing:0.02em] mt-2">
          {tr.home.reviewsH2}
        </h2>
        <p className="font-body text-[#1A1A1A]/60 mt-3">{tr.home.reviewsSub}</p>

        {/* Aggregate rating */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${headerInView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <Star size={20} className="text-white fill-[#0000B3]" />
            </div>
          ))}
          <span className="font-body text-[#1A1A1A]/60 text-sm ml-2">
            4.9  &middot; 1100+ Google reviews
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
                <Star key={j} size={14} className="text-white fill-[#0000B3]" />
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 overflow-hidden px-4">
        <a
          href={RESTAURANT.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center bg-[#0000e6] text-white px-10 h-[48px] rounded-full font-body font-semibold uppercase tracking-widest text-sm hover:bg-[#0000B3] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${cardsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'}`}
        >
          Review Us On Google
        </a>
        <a
          href={RESTAURANT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center bg-[#0000e6] text-white px-10 h-[48px] rounded-full font-body font-semibold uppercase text-xs md:text-sm hover:bg-[#0000B3] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] delay-100 ${cardsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'}`}
        >
          Read all reviews on Google &rarr;
        </a>
      </div>

      <style>{`
        .custom-animated-reviews-btn {
          height: 48px;
          min-width: 320px;
          border: none;
          border-radius: 9999px;
          background: linear-gradient(to right, #4955f5, #06068a, #4955f5, #06068a, #4955f5, #06068a);
          background-size: 250%;
          background-position: left;
          color: white;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          text-decoration: none;
        }

        .custom-animated-reviews-btn:hover {
          background-position: right;
        }

        .custom-reviews-btn-content {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          border-radius: 9999px;
          background-color: #0000cc;
          z-index: 1;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 0.875rem;
          transition: background-color 0.3s ease;
        }

        .custom-animated-reviews-btn:hover .custom-reviews-btn-content {
          background-color: #0000b3;
        }
      `}</style>
    </section>
  )
}
