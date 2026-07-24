'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'

export default function StorySection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const { ref: imgRef, inView: imgInView } = useInView()
  const { ref: textRef, inView: textInView } = useInView()

  return (
    <section className="bg-[#F7F8FC] py-28 md:py-36 px-5 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT: Double-bezel image */}
        <div
          ref={imgRef}
          className={`block md:sticky md:top-[108px] self-start transition-all duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${imgInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Outer shell */}
          <div className="rounded-[2rem] bg-[#1B2B5E]/[0.04] p-2 ring-1 ring-[#1B2B5E]/[0.07]">
            {/* Inner core */}
            <div className="relative aspect-[4/5] rounded-[calc(2rem-0.5rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
              <Image
                src="/images/restaurant/mango-lassi-cheers-at-chopras.png"
                alt="Guests enjoying dinner at Chopras Indian Restaurant Den Haag"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1B2B5E]/30 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating dish  -  double-bezel */}
          <div className="absolute -bottom-5 -right-3 rounded-[1.25rem] bg-[#F7F8FC]/80 p-1.5 ring-1 ring-[#1B2B5E]/10 shadow-lg backdrop-blur-sm">
            <div className="relative w-28 h-28 rounded-[calc(1.25rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
              <Image
                src="/images/dishes/butter-chicken.webp"
                alt="Butter Chicken at Chopras Indian Restaurant"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
          </div>

          {/* Editorial year stamp */}
          <div className="hidden md:flex absolute -left-3 top-8 rounded-full bg-[#0000B3]/10 px-4 py-2 ring-1 ring-white/25 backdrop-blur-sm">
            <span className="font-body text-[10px] text-white uppercase tracking-[0.2em]">Est. 2023</span>
          </div>
        </div>

        {/* RIGHT: Story copy */}
        <div
          ref={textRef}
          className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] delay-100 ${textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0000B3]/20 bg-[#0000B3]/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#0000B3] font-medium mb-6">
            <span className="inline-block w-1 h-1 rounded-full btn-gradient" />
            {locale === 'nl' ? 'Ons Verhaal' : 'Our Story'}
          </span>

          <h2 className="font-semibold text-[#1B2B5E] text-3xl md:text-4xl lg:text-5xl leading-[1.3] [letter-spacing:0.02em] mt-2 mb-6">
            {locale === 'nl' ? (
              <>
                Het Verhaal Achter Chopras Indian Restaurant <br />
                <span className="text-[#0000B3] italic text-2xl md:text-3xl lg:text-4xl">Authentieke Indiase Smaken in Den Haag</span>
              </>
            ) : (
              <>
                The Story Behind Chopras Indian Restaurant <br />
                <span className="text-[#0000B3] italic text-2xl md:text-3xl lg:text-4xl">Authentic Indian Flavours in Den Haag</span>
              </>
            )}
          </h2>

          <div className="font-body text-[#1A1A1A]/80 text-base leading-relaxed mt-7 space-y-5">
            {locale === 'nl' ? (
              <>
                <p>Chopras Indian Restaurant, opgericht door Arun Chopra, werd gecreëerd met één duidelijk doel: authentieke Indiase gerechten naar Nederland brengen zonder te compenseren in smaak of kwaliteit.</p>
                <p>Gevestigd in Den Haag is Chopras meer dan een restaurant: het is een viering van India's rijke culinaire erfgoed, waarin traditionele recepten, regionale smaken, verse ingrediënten en de warmte van Indiase gastvrijheid samenkomen.</p>
                <p>Elk gerecht op ons menu is geïnspireerd op authentieke familietradities, diverse regionale keukens en de dagelijkse maaltijden die Indiase families al generaties lang samenbrengen. Van de levendige streetfood-cultuur in Delhi tot de rijke en aromatische smaken van Punjab, elk recept vertelt een verhaal van thuis, traditie en samenhorigheid.</p>
                <p>Onze ingrediënten zijn zorgvuldig geselecteerd. Verse specerijen worden elke ochtend gemalen om aroma en smaak optimaal te behouden. Elke curry wordt met geduld langzaam gekookt, elk tandoori gerecht wordt gemarineerd met authentieke specerijen, en elke biryani wordt met zorg opgebouwd voor de perfecte balans in smaak en textuur.</p>
              </>
            ) : (
              <>
                <p>Founded by Arun Chopra, Chopras Indian Restaurant was created with one clear purpose: to bring authentic Indian cuisine to the Netherlands without compromise.</p>
                <p>Located in Den Haag (The Hague), Chopras is more than a restaurant—it is a celebration of India’s rich culinary heritage, bringing together traditional recipes, regional flavours, fresh ingredients, and the warmth of Indian hospitality.</p>
                <p>Every dish on our menu is inspired by genuine family traditions, diverse regional cuisines, and the everyday meals that have brought Indian families together for generations. From the vibrant street food culture of Delhi to the rich and aromatic flavours of Punjab, every recipe carries a story of home, tradition, and togetherness.</p>
                <p>Many of our signature dishes are inspired by memories of Indian kitchens—from comforting family recipes shared around the dining table to the colourful flavours found in India’s bustling streets. These are not simply Indian-inspired creations; they are authentic recipes prepared with respect for their origins and passed forward with pride.</p>
                <p>At Chopras, quality begins with the finest ingredients. Fresh spices are carefully selected and ground to preserve their aroma and flavour. Every curry is slow-cooked with patience, every tandoori dish is marinated with authentic Indian spices, and every biryani is thoughtfully layered to create the perfect balance of fragrance, texture, and taste.</p>
                <p>As one of the pioneers bringing authentic Indian street food culture to the Netherlands, Chopras proudly serves a unique experience where traditional Indian flavours meet modern dining. From freshly prepared street food favourites to naan baked fresh in our traditional tandoor, every dish is crafted with passion and attention to detail.</p>
                <p>Dining at Chopras Indian Restaurant in Den Haag is not just about enjoying great Indian food—it is about experiencing true Indian hospitality. Every guest is welcomed like family, every meal is prepared with care, and every flavour reflects our commitment to authenticity, quality, and tradition.</p>
              </>
            )}

            <h3 className="font-heading font-bold text-xl text-[#1B2B5E] mt-8 mb-2">{locale === 'nl' ? 'Onze Belofte' : 'Our Promise'}</h3>
            <p className="italic font-medium text-[#0000B3]">{locale === 'nl' ? 'Dit is geen Indiaas-geïnspireerde keuken.' : 'This is not Indian-inspired cuisine.'}</p>
            <p className="font-semibold text-[#1B2B5E]">
              {locale === 'nl'
                ? 'Dit is authentiek Indiaas koken — bereid met traditie, passie en de smaken van India zoals ze bedoeld zijn.'
                : 'This is authentic Indian cooking—prepared with tradition, passion, and the flavours of India as they were meant to be.'}
            </p>
          </div>

          {/* Quote Block */}
          <div className="mt-8 rounded-2xl bg-white p-6 md:p-8 border-l-4 border-[#0000B3] shadow-sm relative">
            <div className="text-4xl text-[#0000B3]/20 absolute top-4 left-4 font-serif">"</div>
            <p className="font-body text-[#1A1A1A]/80 text-lg italic leading-relaxed relative z-10 pl-6">
              {locale === 'nl'
                ? 'Bij Chopras Indian Restaurant vertelt elk gerecht een verhaal van authenticiteit. Van vers gebakken naan rechtstreeks uit onze traditionele tandoor tot de levendige Indiase street food: elke maaltijd wordt vers en met zorg bereid voor al onze gasten.'
                : 'At Chopras Indian Restaurant, every dish tells a story of authenticity. We never compromise on fresh ingredients, premium quality, or genuine hospitality. From freshly baked naan straight out of our traditional tandoor to the vibrant Indian street food we were proud to introduce to the Netherlands, every meal is prepared fresh with care, passion, and attention to every guest.'}
            </p>
            <p className="font-heading font-bold text-[#1B2B5E] mt-4 pl-6">— Arun Chopra, {locale === 'nl' ? 'Oprichter' : 'Founder'}</p>
          </div>

          {/* Stat pills  -  double-bezel chip */}
          <div className="flex flex-wrap gap-3 mt-9">
            <div className="rounded-full bg-[#1B2B5E]/[0.04] p-1 ring-1 ring-[#1B2B5E]/10">
              <span className="block rounded-full bg-[#1B2B5E] text-white px-5 py-2 font-body text-xs uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                {locale === 'nl' ? 'Geopend in 2023 · Leyweg, Den Haag' : 'Opened 2023 · Leyweg, Den Haag'}
              </span>
            </div>
            <div className="rounded-full bg-[#0000B3]/[0.08] p-1 ring-1 ring-white/20">
              <span className="block rounded-full bg-[#F7F8FC] text-[#1B2B5E] px-5 py-2 font-body text-xs uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                {locale === 'nl' ? '143 Gerechten · 12 Categorieën' : '143 Dishes · 12 Categories'}
              </span>
            </div>
            <div className="rounded-full bg-[#0000B3]/[0.08] p-1 ring-1 ring-white/20">
              <span className="block rounded-full bg-[#F7F8FC] text-[#1B2B5E] px-5 py-2 font-body text-xs uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                Indian Street Food Den Haag
              </span>
            </div>
          </div>

          {/* Pill CTA with button-in-button */}
          <Link
            href={`${base}/menu`}
            className="group inline-flex items-center gap-3 rounded-full border border-[#1B2B5E]/15 pl-6 pr-2 py-2 mt-9 text-[#1B2B5E] text-xs font-semibold uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#1B2B5E]/40 hover:bg-[#1B2B5E]/5 active:scale-[0.98]"
          >
            {locale === 'nl' ? 'Ontdek Ons Volledige Menu' : 'Discover Our Full Menu'}
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#1B2B5E]/8 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
