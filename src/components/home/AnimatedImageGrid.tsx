'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function AnimatedImageGrid({ className }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        "relative w-full h-full min-h-[350px] md:min-h-[420px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5",
        className
      )}
    >
      <div className="flex w-full h-full">
        {/* Left Image */}
        <motion.div
          className="relative w-1/2 h-full overflow-hidden cursor-pointer group"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Image
            src="/images/dishes/tandoori-dishes.webp"
            alt="Authentic Indian Cuisine"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Hover overlay with text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div className="text-white">
              {/* <p className="text-sm uppercase tracking-widest opacity-80">Our Kitchen</p>
              <p className="text-xl font-serif italic mt-1">Flavors of India</p> */}
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative w-1/2 h-full overflow-hidden cursor-pointer group"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Image
            src="/images/restaurant/arun-chopra.jpg"
            alt="Chef Arun Chopra"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Hover overlay with text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div className="text-white">
              {/* <p className="text-sm uppercase tracking-widest opacity-80">Meet the Chef</p>
              <p className="text-xl font-serif italic mt-1">Crafted with Passion</p> */}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle center accent line */}
      <div className="absolute left-1/2 top-4 bottom-4 w-px bg-amber-400/30 hidden md:block" />
    </motion.div>
  )
}