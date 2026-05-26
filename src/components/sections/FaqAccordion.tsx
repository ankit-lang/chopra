'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { Locale } from '@/lib/useTranslations'

const INITIAL_COUNT = 8

export default function FaqAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }>; locale?: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_COUNT)

  return (
    <div className="max-w-3xl mx-auto">
      {visibleFaqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-100 py-5">
          <button
            type="button"
            className="flex justify-between items-center w-full text-left cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-body font-medium text-[#1A1A1A] text-base pr-4">
              {faq.question}
            </span>
            {openIndex === index ? (
              <Minus size={18} className="text-[#D4AF37] flex-shrink-0 transition-transform duration-200" />
            ) : (
              <Plus size={18} className="text-[#D4AF37] flex-shrink-0 transition-transform duration-200" />
            )}
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: openIndex === index ? '500px' : '0px' }}
          >
            <div className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed pt-3 pb-1">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}

      {!showAll && faqs.length > INITIAL_COUNT && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="font-body font-semibold text-sm uppercase tracking-widest text-[#1B2B5E] border border-[#1B2B5E]/30 px-8 py-3 hover:bg-[#1B2B5E] hover:text-white transition-all duration-300 cursor-pointer"
          >
            Show More Questions
          </button>
        </div>
      )}
    </div>
  )
}
