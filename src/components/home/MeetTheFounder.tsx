'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import type { Locale } from '@/lib/useTranslations'

export default function MeetTheFounder({ locale = 'en' }: { locale?: Locale }) {
  const { ref: headingRef, inView: headingInView } = useInView()
  const { ref: photoRef, inView: photoInView } = useInView()
  const { ref: textRef, inView: textInView } = useInView()

  return (
    <section className="bg-[#F7F8FC] py-12 md:py-12 px-5 md:px-12 overflow-clip">
      <div className="max-w-7xl mx-auto">


        {/* Global Heading */}
        <div
          ref={headingRef}
          className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${headingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-12`}
        >
          <h2 className="text-center font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.3] [letter-spacing:0.01em] text-[#06068a]">
            {locale === 'nl' ? <>Ons <span className="">Verhaal</span></> : <>Our <span className="">Story</span></>}
          </h2>

        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">

          {/* ══ LEFT — Photo ══ */}
          <div className="block md:sticky md:top-[15vh] self-start relative z-10 w-full max-w-[500px] mx-auto lg:mx-0">
            <div
              ref={photoRef}
              className={`relative transition-all duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${photoInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
            >
              <div className="relative aspect-[3/4] max-w-[420px] rounded-3xl overflow-hidden shadow-2xl mx-auto lg:mx-0">
                <Image
                  src="/images/restaurant/arun-chopra.jpg"
                  alt="Arun Chopra - Founder of Chopras Indian Restaurant Den Haag"
                  fill
                  className="object-cover object-center brightness-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-heading text-2xl text-white font-semibold">
                    {/* Arun Chopra */}
                  </p>
                  <p className="text-[#D4AF37] text-sm font-medium mt-1 uppercase tracking-widest">
                    {/* Founder · Chopras Indian Restaurant */}
                  </p>
                </div>
              </div>

              {/* Gold quote mark  -  floats outside the photo card */}
              {/* <div className="absolute -top-4 -left-4 md:-left-8 w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-lg z-10">
                <span className="font-heading text-3xl text-[#1A1A1A] font-bold leading-none">&ldquo;</span>
              </div> */}
            </div>
          </div>

          {/* ══ RIGHT — Story ══ */}
          <div
            ref={textRef}
            className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.32,0.72,0,1)] delay-100 ${textInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
          >

            {/* Pull quote — double-bezel style matching site cards */}
            <div className="rounded-[1.5rem] bg-[#0000B3]/[0.06] p-2 ring-1 ring-white/[0.12] mb-8">
              <blockquote className="rounded-[calc(1.5rem-0.5rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] px-8 py-7 border-l-4 border-[#0000B3]">
                <p className="font-heading text-lg md:text-xl text-[#06068a] italic leading-relaxed">
                  {locale === 'nl'
                    ? '“Bij Chopras Indian Restaurant vertelt elk gerecht een verhaal van authenticiteit. Wij doen nooit concessies aan verse ingrediënten, superieure kwaliteit of echte gastvrijheid. Van vers gebakken naan rechtstreeks uit onze traditionele tandoor tot de levendige Indiase street food: elke maaltijd wordt met zorg bereid.”'
                    : '“At Chopras Indian Restaurant, every dish tells a story of authenticity. We never compromise on fresh ingredients, premium quality, or genuine hospitality. From freshly baked naan straight out of our traditional tandoor to the vibrant Indian street food we were proud to introduce to the Netherlands, every meal is prepared fresh with care, passion, and attention to every guest.”'}
                </p>
                <footer className="mt-4 flex items-center gap-2">
                  <div className="w-6 h-px btn-gradient" />
                  <span className="text-transparent bg-clip-text btn-gradient text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Arun Chopra, {locale === 'nl' ? 'Oprichter' : 'Founder'}
                  </span>
                </footer>
              </blockquote>
            </div>

            {/* Body copy */}
            <div className="font-body text-[#1A1A1A] text-base leading-relaxed space-y-4">
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
            </div>

            {/* Closing statement — accent card */}
            <div className="mt-8 rounded-2xl bg-[#0000B3]/[0.06] p-2 ring-1 ring-white/[0.12]">
              <div className="rounded-[calc(1rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] px-6 py-5">
                <p className="font-body text-[#1A1A1A] text-sm">{locale === 'nl' ? 'Dit is geen Indiaas-geïnspireerde keuken.' : 'This is not Indian-inspired cuisine.'}</p>
                <p className="font-heading text-transparent bg-clip-text btn-gradient text-lg italic font-semibold mt-1">
                  {locale === 'nl'
                    ? 'Dit is authentiek Indiaas koken — bereid met traditie, passie en de smaken van India zoals ze bedoeld zijn.'
                    : 'This is authentic Indian cooking—prepared with tradition, passion, and the flavours of India as they were meant to be.'}
                </p>
              </div>
            </div>

            {/* Tag pills — matching site's double-bezel chip style */}
            {/* <div className="flex flex-wrap gap-3 mt-8">
              {['Delhi Kitchens', 'Mumbai Street Food', 'Rajasthan Heritage', 'Fresh-Ground Spices', '100% Halal'].map((tag) => (
                <div key={tag} className="rounded-full bg-[#0000B3]/[0.08] p-1 ring-1 ring-white/20">
                  <span className="block rounded-full bg-[#F7F8FC] text-[#1B2B5E] px-4 py-1.5 font-body text-[10px] uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                    {tag}
                  </span>
                </div>
              ))}
            </div> */}

            {/* Signature divider */}
            {/* <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#1B2B5E]/10" />
              <p className="text-[#1A1A1A]/30 text-[10px] uppercase tracking-[0.25em] whitespace-nowrap">
                Arun Chopra · Founder, Chopras Indian Restaurant
              </p>
              <div className="h-px flex-1 bg-[#1B2B5E]/10" />
            </div> */}
          </div>

        </div>
      </div>
    </section>
  )
}
