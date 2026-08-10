'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, Maximize } from 'lucide-react'

export default function StoryGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload all gallery images in browser cache upon mount
  useEffect(() => {
    if (!images || images.length === 0) return
    images.forEach((src) => {
      if (src) {
        const img = new window.Image()
        img.src = src
      }
    })
  }, [images])

  // Update base image index after slide transition completes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPrevIndex(currentIndex)
    }, 400)
    return () => clearTimeout(timeout)
  }, [currentIndex])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && !isFullscreen && images.length > 1) {
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
      opacity: 0
    }),
    center: {
      zIndex: 2,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 1,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  }

  if (!images || images.length === 0) return null

  return (
    <div 
      ref={containerRef}
      className={`group relative overflow-hidden bg-slate-900 w-full h-full ${isFullscreen ? '' : 'rounded-[inherit]'}`}
    >
      {/* Hidden preloader for Next.js image optimization cache */}
      <div className="hidden" aria-hidden="true">
        {images.map((src, i) => (
          <Image key={`preload-${i}-${src}`} src={src} alt="" width={1} height={1} priority />
        ))}
      </div>

      {/* Ambient blurred backdrop layer (prevents pitch-black background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <Image
          src={images[currentIndex] || images[0]}
          alt=""
          fill
          className="object-cover blur-2xl opacity-40 scale-110 transition-all duration-700 brightness-90"
          aria-hidden="true"
          quality={20}
        />
      </div>

      {/* Base static layer under transitions (prevents black flash during slide) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images[prevIndex] || images[0]}
          alt="Gallery base"
          fill
          className="object-cover brightness-105"
          sizes="100vw"
          quality={90}
          priority
        />
      </div>

      {/* Active animated slide layer */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 260, damping: 28 },
            opacity: { duration: 0.35, ease: "easeInOut" }
          }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={images[currentIndex]}
            alt="Gallery image"
            fill
            className="object-cover brightness-105"
            sizes="100vw"
            quality={95}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Controls Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none">
        
        {/* Top bar */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
            title="Toggle fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
            title={isPlaying ? "Pause autoplay" : "Play autoplay"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors pointer-events-auto shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); paginate(1); }}
            className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors pointer-events-auto shadow-lg"
            aria-label="Next slide"
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
              className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-6 shadow-md' : 'bg-white/50 hover:bg-white/80 w-2'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

