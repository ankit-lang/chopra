'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Use multiple methods to guarantee scroll to top
    // works across all browsers and all edge cases
    const scrollToTop = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Fire immediately
    scrollToTop()

    // Fire again after a short delay to catch any
    // client-side hydration that might restore scroll
    const timer1 = setTimeout(scrollToTop, 50)
    const timer2 = setTimeout(scrollToTop, 150)
    const timer3 = setTimeout(scrollToTop, 300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [pathname])

  return null
}
