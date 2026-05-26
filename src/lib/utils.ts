import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SITE_URL } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `€${price.toFixed(0)}`
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Returns the canonical URL for a given locale and slug.
 * English pages live at root (https://chopras.nl/slug).
 * Dutch pages live at /nl/ (https://chopras.nl/nl/slug).
 */
export function getLocalizedUrl(locale: string, slug: string = ''): string {
  const path = slug ? `/${slug}` : ''
  if (locale === 'nl') {
    return `${SITE_URL}/nl${path}`
  }
  return `${SITE_URL}${path}`
}
