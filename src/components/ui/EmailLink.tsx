'use client'

import { useEffect, useState, ReactNode } from 'react'

// Email is stored base64-encoded so the raw address is never present in static HTML.
// btoa('info@chopras.nl') === 'aW5mb0BjaG9wcmFzLm5s'
const ENCODED = 'aW5mb0BjaG9wcmFzLm5s'

interface EmailLinkProps {
  className?: string
  children?: ReactNode
}

export default function EmailLink({ className = 'text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold', children }: EmailLinkProps) {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    setEmail(atob(ENCODED))
  }, [])

  if (!email) return null

  return (
    <a href={`mailto:${email}`} className={className}>
      {children || email}
    </a>
  )
}
