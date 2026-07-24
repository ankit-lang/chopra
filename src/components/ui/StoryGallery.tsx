'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, Maximize } from 'lucide-react'

export default function StoryGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && !isFullscreen) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 4000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, isFullscreen, images.length])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length)
    setIsPlaying(false) // pause on manual interaction
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    })
  }

  return (
    <div 
      ref={containerRef}
      className={`group relative overflow-hidden bg-black w-full h-full ${isFullscreen ? '' : 'rounded-[inherit]'}`}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 }
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Gallery image"
            fill
            className="object-cover md:object-contain brightness-[1.35]"
            sizes="100vw"
            quality={95}
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Controls Overlay without dark gradient */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pointer-events-none">
        
        {/* Top bar */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            className="p-3 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors pointer-events-auto"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); paginate(1); }}
            className="p-3 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors pointer-events-auto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Bottom bar (Indicators) */}
        <div className="flex justify-center gap-2 mb-2 pointer-events-auto">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                setDirection(i > currentIndex ? 1 : -1)
                setCurrentIndex(i)
                setIsPlaying(false)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
