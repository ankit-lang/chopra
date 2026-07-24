'use client'
import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    // Wait 400ms before starting to observe
    // This gives ScrollToTop time to reset position
    // so animations only fire when user actually scrolls
    const initTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        },
        { threshold, rootMargin: '0px 0px -30px 0px' }
      )
      if (ref.current) observer.observe(ref.current)
    }, 400)

    return () => {
      clearTimeout(initTimer)
    }
  }, [threshold])

  return { ref, inView }
}
