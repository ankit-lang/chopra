import React from 'react'
import { type Locale } from '@/lib/useTranslations'
import StoryGallery from '@/components/ui/StoryGallery'

export default function GallerySection({ locale = 'en' }: { locale?: Locale }) {
  const isNl = locale === 'nl'

  return (
    <section className="pt-24 pb-0 bg-[#F7F8FC]">
      <div className="w-full">
        <div className="flex flex-col items-center mb-12 px-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0000B3]/20 bg-[#0000B3]/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-transparent bg-clip-text btn-gradient font-medium mb-4">
            {isNl ? 'Een Kijkje Binnen' : 'A Glimpse Inside'}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#06068a] text-center leading-tight">
            {isNl ? 'Fotogalerij' : 'Photo Gallery'}
          </h2>
        </div>
        <div className="w-full max-w-[1488px] mx-auto h-[350px] sm:h-[450px] md:h-[637px] overflow-hidden shadow-2xl md:rounded-2xl">
          <StoryGallery
            images={[
              "/feeztal/8.png",
              "/gal/7.png",
              "/gal/5.png",
              "/gal/6.png",
              "/gal/3.png",
              "/gal/4.png?v=2",
            ]}
          />
        </div>
      </div>
    </section>
  )
}
