'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Feature {
  icon: string
  title: string
  desc: string
  href: string
}

export default function TasteOfIndiaFeatures({ features }: { features: Feature[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "center 0.55"]
  })

  // Apply a spring wrapper for a bold, snappy feel even when scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 20,
    mass: 0.5
  })

  return (
    <div ref={containerRef} className="lg:col-span-2 space-y-4">
      {features.map(({ icon, title, desc, href }, i) => {
        // Stagger each card's animation progress based on its index
        const start = i * 0.15
        const end = start + 0.4
        
        // Bold mapping: large slide distance, scale punch, and opacity
        const opacity = useTransform(smoothProgress, [start, end], [0, 1])
        const x = useTransform(smoothProgress, [start, end], [-120, 0])
        const scale = useTransform(smoothProgress, [start, end], [0.85, 1])

        return (
          <motion.div
            key={title}
            style={{ opacity, x, scale }}
          >
            <Link 
              href={href}
              className="group block rounded-[1.5rem] bg-[#0000B3]/[0.04] p-1.5 ring-1 ring-[#1B2B5E]/[0.07] hover:ring-[#0000B3]/20 transition-colors duration-300"
            >
              <div className="rounded-[calc(1.5rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] px-5 py-4 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="font-heading text-[#1B2B5E] font-semibold text-base group-hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] transition-colors duration-200">{title}</p>
                  <p className="font-body text-[#1A1A1A]/55 text-sm leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
