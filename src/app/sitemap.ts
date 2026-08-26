import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { SITE_URL } from '@/lib/constants'

const locales = ['en', 'nl'] as const
const dutchOnlySlugs = new Set([
  'beste-indiaas-restaurant-den-haag',
  'bruiloft-catering-den-haag',
  'zaal-huren-den-haag',
  'evenementenruimte-den-haag',
])

interface SitemapPage {
  slug: string
  lastMod: string
  priority: number
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

const staticPages: SitemapPage[] = [
  // Core pages
  { slug: '', lastMod: '2026-04-21', priority: 1.0, changeFreq: 'weekly' },
  { slug: 'menu', lastMod: '2026-04-21', priority: 0.9, changeFreq: 'monthly' },
  { slug: 'catering', lastMod: '2026-04-21', priority: 0.9, changeFreq: 'monthly' },
  { slug: 'contact', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'monthly' },
  { slug: 'vacancy', lastMod: '2026-04-21', priority: 0.6, changeFreq: 'weekly' },

  // Dish pages
  { slug: 'halal-food-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'biryani-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'butter-chicken-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'tandoori-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'dal-makhani-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'mutton-rogan-josh-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'naan-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'chaat-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'pani-puri-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'soya-chaap-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },

  // Service pages
  { slug: 'indian-takeaway-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-buffet-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-food-delivery-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'feestzaal-den-haag', lastMod: '2026-05-21', priority: 0.9, changeFreq: 'weekly' },

  // Event and catering pages
  { slug: 'corporate-events-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-wedding-catering-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-birthday-catering-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'diwali-dinner-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'bruiloft-catering-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'zaal-huren-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'evenementenruimte-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-restaurant-in-the-hague-for-private-events', lastMod: '2026-08-18', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'best-indian-restaurant-in-den-haag-for-family-dining-parties-corporate-events', lastMod: '2026-08-26', priority: 0.8, changeFreq: 'weekly' },

  // Location pages
  { slug: 'indian-restaurant-delft', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-restaurant-rijswijk', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-restaurant-voorburg', lastMod: '2026-04-16', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-restaurant-leidschendam', lastMod: '2026-04-16', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-restaurant-westland', lastMod: '2026-04-16', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-restaurant-zoetermeer', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-food-netherlands', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'halal-indian-restaurant-netherlands', lastMod: '2026-04-17', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-restaurant-near-peace-palace-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indian-restaurant-near-den-haag-centraal', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },

  // About page
  { slug: 'about', lastMod: '2026-04-16', priority: 0.7, changeFreq: 'monthly' },

  // Trust and legal pages
  { slug: 'privacy-policy', lastMod: '2026-04-21', priority: 0.3, changeFreq: 'yearly' },
  { slug: 'terms', lastMod: '2026-04-21', priority: 0.3, changeFreq: 'yearly' },

  // Landing pages
  { slug: 'beste-indiaas-restaurant-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'family-restaurant-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'indo-chinese-restaurant-den-haag', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },

  // Menu pages
  { slug: 'halal-menu', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'vegan-menu', lastMod: '2026-04-21', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'gluten-free-menu', lastMod: '2026-06-09', priority: 0.8, changeFreq: 'weekly' },
  { slug: 'vegetarian-menu', lastMod: '2026-06-09', priority: 0.8, changeFreq: 'weekly' },

  // Blog index
  { slug: 'blog', lastMod: '2026-04-21', priority: 0.7, changeFreq: 'weekly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // All static pages × both locales
  // English pages live at root (https://chopras.nl/slug), Dutch at /nl/
  const sitemapStaticPages = locales.flatMap((locale) =>
    staticPages
    .filter(({ slug }) => locale === 'nl' || !dutchOnlySlugs.has(slug))
    .map(({ slug, lastMod, priority, changeFreq }) => {
      let url: string
      if (locale === 'nl') {
        url = slug ? `${SITE_URL}/nl/${slug}` : `${SITE_URL}/nl`
      } else {
        url = slug ? `${SITE_URL}/${slug}` : SITE_URL
      }
      return {
        url,
        lastModified: new Date(lastMod),
        priority,
        changeFrequency: changeFreq,
      }
    })
  )

  // Blog posts with priority 0.7
  // English blog posts at /blog/slug, Dutch at /nl/blog/slug
  const blogPages = blogPosts.map((post) => ({
    url: post.language === 'nl'
      ? `${SITE_URL}/nl/blog/${post.slug}`
      : `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  return [...sitemapStaticPages, ...blogPages]
}
