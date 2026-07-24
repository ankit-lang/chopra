'use client';

import React from 'react';
import StoryGallery from '@/components/ui/StoryGallery';
import { type Locale } from '@/lib/useTranslations';

const galleryImages = [
  "/feeztal/1.png",
  "/feeztal/2.png",
  "/feeztal/3.png",
  "/feeztal/4.png",
  "/feeztal/5.png",
  "/feeztal/6.png"
];

export default function GallerySection({ locale = 'en' }: { locale?: Locale }) {
  const isNl = locale === 'nl';
  return (
    <section className="py-12 bg-white">
      <div className="w-full">
        <div className="flex flex-col items-center mb-8 px-5">
          <h2 className="text-center text-3xl md:text-[2.5rem] font-heading text-[#06068a] font-bold">
            {isNl ? 'Fotogalerij' : 'Photo Gallery'}
          </h2>
        </div>

        <div className="w-full max-w-[1488px] mx-auto h-[350px] sm:h-[450px] md:h-[637px] overflow-hidden shadow-2xl md:rounded-2xl">
          <StoryGallery images={galleryImages} />
        </div>
      </div>
    </section>
  );
}
