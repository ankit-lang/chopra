'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Utensils, Leaf, BadgeCheck, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

export type FeatureIcon = 'utensils' | 'leaf' | 'badge-check' | 'trophy'

interface Feature {
  icon: FeatureIcon
  title: string
  desc: string
  href: string
}

const ICON_MAP = {
  utensils: Utensils,
  leaf: Leaf,
  'badge-check': BadgeCheck,
  trophy: Trophy,
}

export default function TasteOfIndiaFeatures({ features, className }: { features: Feature[], className?: string }) {
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
    <div ref={containerRef} className={cn("space-y-4", className)}>
      {features.map(({ icon, title, desc, href }, i) => {
        const IconComponent = ICON_MAP[icon] || Utensils
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
              className="group block rounded-[1.5rem] bg-[#06068a]/[0.04] p-1.5 ring-1 ring-[#1B2B5E]/[0.07] hover:ring-[#06068a]/20 transition-colors duration-300"
            >
              <div className="rounded-[calc(1.5rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] px-5 py-4 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5 text-[#06068a]">
                  <IconComponent className="w-6 h-6" />
                </span>
                <div>
                  <p className="font-heading text-[#06068a] font-semibold text-base group-hover:text-[#06068a]/80 transition-colors duration-200">{title}</p>
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
