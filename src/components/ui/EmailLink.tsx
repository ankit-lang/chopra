'use client'

import { useEffect, useState, ReactNode } from 'react'

// Email is stored base64-encoded so the raw address is never present in static HTML.
// btoa('info@chopras.nl') === 'aW5mb0BjaG9wcmFzLm5s'
const ENCODED = 'aW5mb0BjaG9wcmFzLm5s'

interface EmailLinkProps {
  className?: string
  children?: ReactNode
}

export default function EmailLink({ className = 'text-black ', children }: EmailLinkProps) {
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
