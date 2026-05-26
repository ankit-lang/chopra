import en from '@/i18n/en.json'
import nl from '@/i18n/nl.json'

export type Locale = 'en' | 'nl'

const translations = { en, nl }

export function getTranslations(locale: Locale) {
  return translations[locale] as typeof en
}

export function t(locale: Locale, path: string): string {
  const keys = path.split('.')
  let value: unknown = translations[locale]
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      // Fallback to English if key missing in locale
      value = translations['en']
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k]
        }
      }
      break
    }
  }
  return typeof value === 'string' ? value : path
}
