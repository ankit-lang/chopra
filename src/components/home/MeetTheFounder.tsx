'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

export default function MeetTheFounder() {
  const { ref: photoRef, inView: photoInView } = useInView()
  const { ref: textRef, inView: textInView } = useInView()

  return (
    <section className="bg-[#F7F8FC] py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Section label ── */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#0000B3]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-medium">
            <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
            Meet the Founder
          </span>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ══ LEFT — Photo ══ */}
          <div
            ref={photoRef}
            className={`block md:sticky md:top-[108px] self-start relative transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${photoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Double-bezel card — matches site pattern */}
            <div className="rounded-[2rem] bg-[#1B2B5E]/[0.04] p-2 ring-1 ring-[#1B2B5E]/[0.07]">
              <div className="relative aspect-[3/4] rounded-[calc(2rem-0.5rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                <Image
                  src="/images/restaurant/arun-chopra.jpg"
                  alt="Arun Chopra – Founder of Chopras Indian Restaurant Den Haag"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-52 " />

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-heading text-2xl text-white font-semibold">
                    Arun Chopra
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-[2px] bg-[#4955f5] rounded-full shrink-0" />
                    <p className="text-white text-[11px] font-medium uppercase tracking-[0.2em] leading-none mt-[1px]">
                      Founder · Chopras Indian Restaurant
                    </p>
                  </div>
                </div>

                {/* Blue quote badge top-left */}
                {/* <div className="absolute top-5 left-5 bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg shadow-[#0000B3]/30 ring-1 ring-white/20">
                  <span className="font-heading text-2xl text-white font-bold leading-none">&ldquo;</span>
                </div> */}
              </div>
            </div>

            {/* Floating Est. chip — matches site's editorial year stamp style */}

          </div>

          {/* ══ RIGHT — Story ══ */}
          <div
            ref={textRef}
            className={`transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] delay-100 ${textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Heading */}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.3] [letter-spacing:0.01em] text-[#1B2B5E] mb-8">
              A Kitchen,{' '}
              <span className="italic font-normal text-[#1B2B5E]/60">Not a Restaurant</span>
            </h2>

            {/* Pull quote — double-bezel style matching site cards */}
            <div className="rounded-[1.5rem] bg-[#0000B3]/[0.06] p-2 ring-1 ring-white/[0.12] mb-8">
              <blockquote className="rounded-[calc(1.5rem-0.5rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] px-8 py-7 border-l-4 border-[#0000B3]">
                <p className="font-heading text-lg md:text-xl text-[#1B2B5E] italic leading-relaxed">
                  &ldquo;I did not open a restaurant. I opened a kitchen — the same kitchen I grew up watching my mother cook in. The spices are the same. The fire is the same. The only thing that changed is the address.&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-2">
                  <div className="w-6 h-px bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Arun Chopra, Founder
                  </span>
                </footer>
              </blockquote>
            </div>

            {/* Body copy */}
            <div className="font-body text-[#1A1A1A]/70 text-base leading-relaxed space-y-4">
              <p>
                Arun Chopra moved to Den Haag with one clear purpose — to serve Indian food the way it is truly eaten in India. Not adapted. Not simplified. Not made mild for a European palate. But{' '}
                <span className="text-[#1A1A1A] font-medium">real, bold, and authentic Indian cooking.</span>
              </p>
              <p>
                At Chopras Indian Restaurant, every recipe comes from memory — from the kitchens of Delhi, the street food culture of Mumbai, and the family tables of Rajasthan. These are not recreated dishes; they are lived experiences carried across continents and preserved with intention.
              </p>
              <p>
                Every morning, spices are ground fresh because Arun Chopra believes that once spices are pre-packed, something essential is lost —{' '}
                <span className="text-[#1A1A1A] font-medium">aroma, depth, and soul.</span>{' '}
                Cooking here is not rushed. It is layered, patient, and deeply personal, just like in a traditional Indian home kitchen.
              </p>
              <p>
                When you dine at Chopras Indian Restaurant in The Hague, you are not just eating at a restaurant. You are sitting at someone&apos;s table — a table built on memory, heritage, and care. What is served is what would be served to family.{' '}
                <span className="text-[#1A1A1A] font-medium">That is the only standard that has ever existed here.</span>
              </p>
            </div>

            {/* Closing statement — accent card */}
            <div className="mt-8 rounded-2xl bg-[#0000B3]/[0.06] p-2 ring-1 ring-white/[0.12]">
              <div className="rounded-[calc(1rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] px-6 py-5">
                <p className="font-body text-[#1A1A1A]/60 text-sm">This is not Indian-inspired cuisine.</p>
                <p className="font-heading text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-lg italic font-semibold mt-1">
                  This is Indian cooking, as it was meant to be.
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
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#1B2B5E]/10" />
              <p className="text-[#1A1A1A]/30 text-[10px] uppercase tracking-[0.25em] whitespace-nowrap">
                Arun Chopra · Founder, Chopras Indian Restaurant
              </p>
              <div className="h-px flex-1 bg-[#1B2B5E]/10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
