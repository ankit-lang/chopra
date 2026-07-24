/**
 * Centralised schema.org JSON-LD generators for Chopras Indian Restaurant.
 * All structured data in the project must be generated here and imported
 * into pages - never hardcoded inline.
 *
 * Entity anchor IDs (stable across all pages):
 *   #website       - WebSite entity
 *   #restaurant    - Restaurant / LocalBusiness entity
 *   #arun-chopra   - Person (founder) entity
 */

import { RESTAURANT, SITE_URL } from './constants'

export type Locale = 'en' | 'nl'

// ---------------------------------------------------------------------------
// Shared values
// ---------------------------------------------------------------------------

const OPENING_HOURS: Record<string, unknown>[] = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '16:30',
    closes: '22:30',
  },
]

const SAME_AS = [
  'https://www.tripadvisor.com/Restaurant_Review-g188633-d27464805-Reviews-Chopras_Indian_Restaurant-The_Hague_South_Holland_Province.html',
  `https://www.google.com/maps/place/?q=place_id:${RESTAURANT.googlePlaceId}`,
  'https://www.facebook.com/choprasrestaurant',
  'https://www.instagram.com/choprasrestaurant',
  'https://www.youtube.com/@choprasrestaurant',
]

const AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: '4.9',
  reviewCount: '1100',
  bestRating: '5',
  worstRating: '1',
}

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: RESTAURANT.address.street,
  addressLocality: RESTAURANT.address.city,
  postalCode: RESTAURANT.address.postcode,
  addressCountry: RESTAURANT.address.countryCode,
}

const GEO = {
  '@type': 'GeoCoordinates',
  latitude: RESTAURANT.address.coordinates.lat,
  longitude: RESTAURANT.address.coordinates.lng,
}

// ---------------------------------------------------------------------------
// WebSite schema
// ---------------------------------------------------------------------------

export function getWebSiteSchema(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: RESTAURANT.name,
    url: SITE_URL,
    inLanguage: locale === 'nl' ? 'nl-NL' : 'en-GB',
  }
}

// ---------------------------------------------------------------------------
// Restaurant entity (main LocalBusiness/Restaurant schema)
// ---------------------------------------------------------------------------

export function getRestaurantSchema(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['FoodEstablishment', 'Restaurant'],
    '@id': `${SITE_URL}/#restaurant`,
    name: RESTAURANT.name,
    description: 'Den Haag Indian restaurant serving authentic North Indian food, halal dishes, vegetarian and vegan options, Indian street food, Indo Chinese food, and event catering with a private event hall.',
    image: [
      RESTAURANT.logo,
      `${SITE_URL}/og/home-og.jpg`,
    ],
    url: locale === 'nl' ? `${SITE_URL}/nl` : SITE_URL,
    telephone: RESTAURANT.contact.phone,
    email: RESTAURANT.contact.email,
    address: ADDRESS,
    geo: GEO,
    servesCuisine: ['North Indian', 'Indian Street Food', 'Halal', 'Halal Indian', 'Vegetarian Indian', 'Vegan Indian', 'Indo Chinese', 'Indian Catering'],
    priceRange: RESTAURANT.priceRange,
    openingHoursSpecification: OPENING_HOURS,
    hasMenu: locale === 'nl' ? `${SITE_URL}/nl/menu` : `${SITE_URL}/menu`,
    hasMap: RESTAURANT.googleMapsUrl,
    acceptsReservations: true,
    areaServed: RESTAURANT.serviceAreas,
    aggregateRating: AGGREGATE_RATING,
    logo: {
      '@type': 'ImageObject',
      url: RESTAURANT.logo,
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: RESTAURANT.contact.phone,
      email: RESTAURANT.contact.email,
      contactType: 'reservations',
      availableLanguage: ['English', 'Dutch', 'Hindi'],
    },
    sameAs: SAME_AS,
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#arun-chopra`,
      name: 'Arun Chopra',
      jobTitle: 'Founder',
      url: SITE_URL,
    },
  }
}

// ---------------------------------------------------------------------------
// Restaurant schema - area-served variant for location-specific pages
// ---------------------------------------------------------------------------

export function getLocalRestaurantSchema(
  locale: Locale,
  areas: string[],
  pageUrl: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Restaurant'],
    '@id': `${SITE_URL}/#restaurant`,
    name: RESTAURANT.name,
    description: locale === 'nl'
      ? 'Chopras Indian Restaurant op Leyweg 986, Den Haag, serveert authentieke Noord-Indiase keuken. Volledig halal gecertificeerd, open dinsdag tot zondag van 16:30 tot 22:30.'
      : 'Chopras Indian Restaurant at Leyweg 986, Den Haag, serves authentic North Indian cuisine. Fully halal certified, open Tuesday to Sunday 16:30 to 22:30.',
    url: pageUrl,
    telephone: RESTAURANT.contact.phone,
    email: RESTAURANT.contact.email,
    address: ADDRESS,
    geo: GEO,
    servesCuisine: ['North Indian', 'Indian Street Food', 'Halal', 'Halal Indian'],
    priceRange: RESTAURANT.priceRange,
    openingHoursSpecification: OPENING_HOURS,
    areaServed: areas,
    aggregateRating: AGGREGATE_RATING,
    sameAs: SAME_AS,
  }
}

// ---------------------------------------------------------------------------
// Founder / Person schema
// ---------------------------------------------------------------------------

export function getFounderSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#arun-chopra`,
    name: 'Arun Chopra',
    jobTitle: 'Founder',
    description:
      'Arun Chopra founded Chopras Indian Restaurant in Den Haag in 2023 with the mission to serve authentic North Indian cuisine exactly as it is eaten in India.',
    worksFor: {
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/#restaurant`,
      name: RESTAURANT.name,
      url: SITE_URL,
    },
    url: SITE_URL,
    sameAs: [SITE_URL],
  }
}

// FAQPage schema is used across all pages for AI citation discoverability.
// ChatGPT, Perplexity, and Google AI Overviews extract FAQPage structured data
// regardless of whether Google shows FAQ rich results in traditional SERPs.
// CLAUDE.md mandates this on every page. Do not remove it from any page.
// NOTE: Never add date parameters to getFaqPageSchema - only Article/BlogPosting
// schema types should have datePublished or dateModified.

export function getFaqPageSchema(
  faqs: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ---------------------------------------------------------------------------
// BreadcrumbList schema
// ---------------------------------------------------------------------------

export function getBreadcrumbSchema(
  items: Array<{ name: string; item: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}

// ---------------------------------------------------------------------------
// Menu schema
// ---------------------------------------------------------------------------

export function getMenuSchema(
  locale: Locale,
  sections: Array<{
    name: string
    items: Array<{ name: string; description: string; price: number }>
  }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${locale === 'nl' ? `${SITE_URL}/nl` : SITE_URL}/menu#menu`,
    name: `${RESTAURANT.name} Menu`,
    url: locale === 'nl' ? `${SITE_URL}/nl/menu` : `${SITE_URL}/menu`,
    hasMenuSection: sections.map((section) => ({
      '@type': 'MenuSection',
      name: section.name,
      hasMenuItem: section.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        offers: {
          '@type': 'Offer',
          price: item.price.toFixed(2),
          priceCurrency: 'EUR',
        },
      })),
    })),
  }
}

// ---------------------------------------------------------------------------
// BlogPosting schema
// ---------------------------------------------------------------------------

export function getBlogPostingSchema(
  post: {
    h1: string
    metaDescription: string
    publishedAt: string
    author: string
    slug: string
    image?: string
  },
  locale: Locale,
): Record<string, unknown> {
  const postUrl = locale === 'nl'
    ? `${SITE_URL}/nl/blog/${post.slug}`
    : `${SITE_URL}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.h1,
    description: post.metaDescription,
    inLanguage: locale === 'nl' ? 'nl-NL' : 'en-GB',
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#arun-chopra`,
      name: post.author,
      jobTitle: 'Founder',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: RESTAURANT.name,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: RESTAURANT.logo,
        width: 512,
        height: 512,
      },
    },
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    image: post.image ?? `${SITE_URL}/og/home-og.jpg`,
  }
}

// ---------------------------------------------------------------------------
// CateringService schema
// ---------------------------------------------------------------------------

export function getCateringServiceSchema(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodService',
    name: locale === 'nl'
      ? 'Indiaas Catering Den Haag'
      : 'Indian Catering Den Haag',
    description: locale === 'nl'
      ? 'Authentieke Indiase catering in Den Haag voor bruiloften, verjaardagen en bedrijfsevenementen. Halal gecertificeerd. Vers bereid door Chopras Indian Restaurant op Leyweg 986.'
      : 'Authentic Indian catering in Den Haag for weddings, birthdays and corporate events. Halal certified. Freshly prepared by Chopras Indian Restaurant at Leyweg 986.',
    provider: {
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/#restaurant`,
      name: RESTAURANT.name,
      telephone: RESTAURANT.contact.phone,
      address: ADDRESS,
    },
    areaServed: RESTAURANT.serviceAreas.map((area) => ({ '@type': 'City', name: area })),
  }
}

// ---------------------------------------------------------------------------
// MenuItem schema (primary entity for individual dish pages)
// ---------------------------------------------------------------------------

export function getDishPageSchema(
  locale: Locale,
  dishName: string,
  dishNameNl: string,
  description: string,
  descriptionNl: string,
  suitableForDiet: string[] = ['https://schema.org/HalalDiet'],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    '@id': `${SITE_URL}/#${dishName.toLowerCase().replace(/\s+/g, '-')}`,
    name: locale === 'nl' ? dishNameNl : dishName,
    description: locale === 'nl' ? descriptionNl : description,
    suitableForDiet: suitableForDiet,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }
}

// ---------------------------------------------------------------------------
// Organization schema (for AI discoverability and entity recognition)
// ---------------------------------------------------------------------------

export function getOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: RESTAURANT.name,
    url: SITE_URL,
    logo: RESTAURANT.logo,
    foundingDate: '2023',
    founder: {
      '@type': 'Person',
      name: 'Arun Chopra',
    },
    description: 'Chopras Indian Restaurant is Den Haag\'s best authentic Indian restaurant serving North Indian food, halal dishes, vegetarian and vegan options, Indian street food, Indo Chinese cuisine, and event catering with a private event hall.',
    address: ADDRESS,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: RESTAURANT.contact.phone,
      contactType: 'reservations',
      availableLanguage: ['English', 'Dutch', 'Hindi'],
    },
    sameAs: SAME_AS,
  }
}

// ---------------------------------------------------------------------------
// ContactPage schema
// ---------------------------------------------------------------------------

export function getContactPageSchema(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/${locale === 'nl' ? 'nl/' : ''}contact#contactpage`,
    name: 'Contact Chopras Indian Restaurant Den Haag',
    description: locale === 'nl'
      ? 'Neem contact op met Chopras Indian Restaurant op Leyweg 986, Den Haag. Reserveer een tafel, vraag een catering offerte aan of stuur ons een bericht.'
      : 'Contact Chopras Indian Restaurant at Leyweg 986, Den Haag. Reserve a table, request a catering quote or send us a message.',
    url: `${SITE_URL}/${locale === 'nl' ? 'nl/' : ''}contact`,
    mainEntity: {
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/#restaurant`,
      name: RESTAURANT.name,
      telephone: RESTAURANT.contact.phone,
      email: RESTAURANT.contact.email,
      address: ADDRESS,
    },
  }
}

// ---------------------------------------------------------------------------
// Delivery service schema
// ---------------------------------------------------------------------------

export function getDeliveryServiceSchema(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'nl' ? 'Indiaas Eten Bezorgen Den Haag' : 'Indian Food Delivery Den Haag',
    description: locale === 'nl'
      ? 'Indiase maaltijdbezorging in Den Haag door Chopras Indian Restaurant. Verse curry en biryani bezorgd via Thuisbezorgd en Uber Eats vanuit Leyweg 986.'
      : 'Indian food delivery in Den Haag by Chopras Indian Restaurant. Fresh curry and biryani delivered via Thuisbezorgd and Uber Eats from Leyweg 986.',
    serviceType: locale === 'nl' ? 'Maaltijdbezorging' : 'Food Delivery',
    provider: { '@type': 'Restaurant', '@id': `${SITE_URL}/#restaurant`, name: RESTAURANT.name },
    areaServed: RESTAURANT.serviceAreas.map((area) => ({ '@type': 'City', name: area })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: RESTAURANT.contact.website,
      availableLanguage: ['English', 'Dutch'],
    },
  }
}

// ---------------------------------------------------------------------------
// Takeaway service schema
// ---------------------------------------------------------------------------

export function getTakeawayServiceSchema(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'nl' ? 'Indiaas Eten Afhalen Den Haag' : 'Indian Takeaway Den Haag',
    description: locale === 'nl'
      ? 'Indiaas eten afhalen in Den Haag bij Chopras Indian Restaurant. Bestel online en haal op bij Leyweg 986, 2545 GW Den Haag.'
      : 'Indian takeaway in Den Haag from Chopras Indian Restaurant. Order online and collect from Leyweg 986, 2545 GW Den Haag.',
    serviceType: locale === 'nl' ? 'Afhaalservice' : 'Takeaway',
    provider: { '@type': 'Restaurant', '@id': `${SITE_URL}/#restaurant`, name: RESTAURANT.name },
    areaServed: [{ '@type': 'City', name: 'Den Haag' }],
  }
}

// ---------------------------------------------------------------------------
// Diet-specific FoodEstablishment schema
// ---------------------------------------------------------------------------

export function getDietFoodEstablishmentSchema(
  locale: Locale,
  cuisines: string[] = ['Halal', 'Halal Indian', 'North Indian'],
  pageSlug: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['FoodEstablishment', 'Restaurant'],
    '@id': `${SITE_URL}/#${pageSlug}`,
    name: RESTAURANT.name,
    description: locale === 'nl'
      ? 'Chopras Indian Restaurant op Leyweg 986, Den Haag. Volledig halal gecertificeerd, met vegetarische en veganistische opties. Open dinsdag tot zondag 16:30-22:30.'
      : 'Chopras Indian Restaurant at Leyweg 986, Den Haag. Fully halal certified with vegetarian and vegan options. Open Tuesday to Sunday 16:30 to 22:30.',
    address: ADDRESS,
    telephone: RESTAURANT.contact.phone,
    aggregateRating: AGGREGATE_RATING,
    servesCuisine: cuisines,
    openingHoursSpecification: OPENING_HOURS,
  }
}

// ---------------------------------------------------------------------------
// WebPage Speakable schema (for voice search and AI assistant discoverability)
// ---------------------------------------------------------------------------

export function getSpeakableSchema(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${locale === 'nl' ? `${SITE_URL}/nl` : SITE_URL}/#speakable`,
    url: locale === 'nl' ? `${SITE_URL}/nl` : SITE_URL,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.about-chopras-section'],
    },
  }
}

// ---------------------------------------------------------------------------
// Event schema (for restaurant events like Diwali dinners)
// ---------------------------------------------------------------------------

export function getEventSchema(event: {
  name: string
  description: string
  startDate: string  // ISO 8601, e.g. '2026-10-20T18:30:00'
  endDate: string
  url: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    url: event.url,
    location: {
      '@type': 'Place',
      name: RESTAURANT.name,
      address: ADDRESS,
    },
    organizer: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#restaurant`,
      name: RESTAURANT.name,
      url: SITE_URL,
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    offers: {
      '@type': 'Offer',
      url: event.url,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
    },
  }
}
