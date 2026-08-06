'use client'

import AnimatedContent from '@/components/ui/AnimatedContent'
import OrderOnlineButton from '@/components/ui/OrderOnlineButton'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MenuOverviewSection({ locale }: { locale: string }) {
  const base = `/${locale}`

  const items = [
    "Authentic North Indian curries",
    "Indo Chinese menu Den Haag",
    "Fresh Indo Chinese dishes",
    "Traditional tandoori specialities",
    "Vegetarian Indian food Den Haag",
    "Complete vegetarian and vegan menu",
    "Dedicated vegan menu",
    "Fresh naan",
    "Biryanis",
    "Street food",
    "Desserts"
  ]

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-[#0000B3]/5 to-transparent rounded-bl-full opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-[#06068a]/5 to-transparent rounded-tr-full opacity-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Side: Content */}
          <div className="space-y-8">
            <AnimatedContent direction="horizontal" distance={40} delay={0.1}>
              <span className="inline-flex justify-center items-center rounded-full border border-[#06068a]/20 bg-[#0000B3]/5 px-4 py-1.5 text-[12px] uppercase tracking-[0.22em] text-[#06068a] font-semibold mb-6">
                Our Menu
              </span>
              <div className="flex flex-col items-start text-left">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] text-[#06068a] leading-[1.1] tracking-tight">
                  <span className="font-bold">143 Dishes, 13 Categories,</span> <br className="hidden md:block" />
                  <span className="italic">One Consistent Standard</span>
                </h2>

                {/* Decorative rule */}
                <div className="flex items-center justify-start gap-4 mt-6">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#06068a]/40" />
                  <span className="text-[#06068a]/60 text-lg">✦</span>
                  <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#06068a]/40" />
                </div>
              </div>
            </AnimatedContent>

            <AnimatedContent direction="horizontal" distance={40} delay={0.2}>
              <p className="font-body text-[#1A1A1A] text-base md:text-lg leading-relaxed">
                Discover one of the largest Indian menus in the Netherlands, featuring 143 authentic dishes across 13 carefully curated categories. From our famous butter chicken Den Haag and aromatic Biryani Den Haag to sizzling dishes prepared in our traditional 400-degree tandoor, every meal is made fresh using premium ingredients and authentic Indian recipes.
              </p>
            </AnimatedContent>

            <AnimatedContent direction="horizontal" distance={40} delay={0.3}>
              <p className="font-body text-[#1B2B5E] font-semibold text-lg mb-4">
                Explore our complete selection including:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0000B3] shrink-0 mt-0.5" />
                    <span className="font-body text-[#1A1A1A]/80">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedContent>

            <AnimatedContent direction="horizontal" distance={40} delay={0.4}>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed italic border-l-4 border-[#06068a]/20 pl-4 py-1 my-8">
                Whether you&apos;re dining with family, ordering takeaway, choosing delivery, enjoying our halal-certified menu, booking our private event hall for hire in Den Haag, or arranging Indian catering services or Indian wedding catering Den Haag, Chopras has something for every occasion.
              </p>
            </AnimatedContent>

            <AnimatedContent direction="horizontal" distance={40} delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start pt-4">
                <OrderOnlineButton href={`${base}/menu`} className="w-full sm:w-auto text-center" />
              </div>
              <p className="text-sm text-[#1A1A1A]/50 font-body mt-4 text-center sm:text-left">
                Explore the full 143-dish menu or reserve a table at Leyweg 986 today.
              </p>
            </AnimatedContent>
          </div>

          {/* Right Side: Image/Visual */}
          <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square">
            <AnimatedContent delay={0.3} className="h-full w-full relative z-10">
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                <Image
                  src="/images/dishes/tandoori-dishes.webp"
                  alt="Authentic Indian Menu at Chopras Den Haag"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                  <Link href={`${base}/contact`} className="custom-animated-order-btn shrink-0 shadow-xl shadow-[#0000cc]/30">
                    <span className="custom-btn-content">
                      RESERVE TABLE
                    </span>
                  </Link>
                </div>
              </div>
            </AnimatedContent>

            {/* Decorative Elements */}
            <AnimatedContent delay={0.6} distance={20} className="absolute -top-6 -right-6 z-0 hidden md:block">
              <div className="w-24 h-24 bg-[#E5E5F2] rounded-full opacity-60 blur-xl" />
            </AnimatedContent>
            <AnimatedContent delay={0.7} distance={20} className="absolute -bottom-8 -left-8 z-20 hidden md:block">
              <div className="bg-white shadow-xl rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-[#0000B3]/10 w-12 h-12 rounded-full flex items-center justify-center text-[#06068a] font-bold text-xl">
                  13
                </div>
                <div>
                  <p className="font-body text-xs text-[#1A1A1A]/50 uppercase tracking-widest">Categories</p>
                  <p className="font-heading text-lg font-semibold text-[#06068a]">To Choose From</p>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  )
}
