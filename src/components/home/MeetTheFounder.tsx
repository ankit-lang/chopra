'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

export default function MeetTheFounder() {
  const { ref: photoRef, inView: photoInView } = useInView()
  const { ref: textRef, inView: textInView } = useInView()

  return (
    <section className="bg-[#F7F8FC] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT  -  Photo */}
        <div
          ref={photoRef}
          className={`relative transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${photoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="relative aspect-[3/4] max-w-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/restaurant/arun-chopra.jpg"
              alt="Arun Chopra - Founder of Chopras Indian Restaurant Den Haag"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-heading text-2xl text-white font-semibold">
                Arun Chopra
              </p>
              <p className="text-[#D4AF37] text-sm font-medium mt-1 uppercase tracking-widest">
                Founder · Chopras Indian Restaurant
              </p>
            </div>
          </div>

          {/* Gold quote mark  -  floats outside the photo card */}
          <div className="absolute -top-4 -left-4 w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-lg z-10">
            <span className="font-heading text-3xl text-[#1A1A1A] font-bold leading-none">&ldquo;</span>
          </div>
        </div>

        {/* RIGHT  -  Story */}
        <div
          ref={textRef}
          className={`transition-all duration-[800ms] delay-100 ease-[cubic-bezier(0.32,0.72,0,1)] ${textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Label pill */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • MEET THE FOUNDER •
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold leading-[1.4] [letter-spacing:0.02em] mt-2 mb-6">
            The Man Behind Every Dish
          </h2>

          <blockquote className="font-heading text-xl md:text-2xl text-[#1B2B5E] italic leading-relaxed border-l-4 border-[#D4AF37] pl-6 mt-8 mb-6">
            &ldquo;I did not open a restaurant. I opened a kitchen - the same
            kitchen I grew up watching my mother cook in. The spices are
            the same. The fire is the same. The only thing that changed
            is the address.&rdquo;
          </blockquote>

          <div className="text-[#1A1A1A]/70 text-base leading-relaxed space-y-4 mt-6">
            <p>
              Arun Chopra moved to Den Haag with one obsession: that somewhere
              in this city, someone should be able to eat Indian food the way
              it is actually eaten in India. Not adapted. Not simplified.
              Not made mild for a European palate. The real thing.
            </p>
            <p>
              Every recipe at Chopras Indian Restaurant comes from memory - from kitchens in
              Delhi, from street corners in Mumbai, from family tables in
              Rajasthan. Arun grinds the spices fresh every morning himself
              because he knows that the moment you open a packet, something
              is already lost.
            </p>
            <p>
              When you eat at Chopras Indian Restaurant, you are not eating at a restaurant.
              You are eating at someone&apos;s table. That is the only standard
              Arun has ever cooked to.
            </p>
          </div>

          {/* Stat pills */}
          <div className="flex gap-4 flex-wrap mt-8">
            <span className="bg-[#1B2B5E] text-white rounded-full px-6 py-3 text-sm font-medium">
              Est. 2023 · Leyweg, Den Haag
            </span>
            <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#1B2B5E] rounded-full px-6 py-3 text-sm font-medium">
              North Indian · Street Food · Tandoor
            </span>
          </div>

          {/* Signature line */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#1B2B5E]/10" />
            <p className="text-[#1A1A1A]/40 text-xs uppercase tracking-widest">
              Arun Chopra · Founder, Chopras Indian Restaurant
            </p>
            <div className="h-px flex-1 bg-[#1B2B5E]/10" />
          </div>
        </div>

      </div>
    </section>
  )
}
