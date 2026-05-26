import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { blogPosts } from '@/lib/blog-data'
import { RESTAURANT, SITE_URL } from '@/lib/constants'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema } from '@/lib/schema'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Food Blog Den Haag | Chopras Indian Restaurant',
    nl: 'Indiaas Eten Blog Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian food blog by Chopras Indian Restaurant Den Haag. Guides and tips on halal Indian food, catering and street food. Read our latest articles now.',
    nl: 'Ontdek Indiase voedselsverhalen, restaurantgidsen, cateringstips en streetfoodgidsen van Chopras Indiaas Restaurant in Den Haag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'blog'),
      languages: {
        en: getLocalizedUrl('en', 'blog'),
        nl: getLocalizedUrl('nl', 'blog'),
        'x-default': getLocalizedUrl('en', 'blog'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'blog'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description: descriptions[locale],
      images: ['/og/home-og.jpg'],
    },
  }
}

function formatDate(dateStr: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'nl' ? 'nl-NL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export default function LocaleBlogPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const localePosts = blogPosts.filter(post => post.language === locale)

  const blogListingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: locale === 'nl' ? 'Indiaas Eten Blog Den Haag - Chopras Indian Restaurant' : 'Indian Food Blog Den Haag - Chopras Indian Restaurant',
    description: locale === 'nl' ? 'Blog over authentiek Indiaas eten in Den Haag van Chopras Indian Restaurant.' : 'Blog about authentic Indian food in Den Haag by Chopras Indian Restaurant.',
    url: locale === 'nl' ? `${SITE_URL}/nl/blog` : `${SITE_URL}/blog`,
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: RESTAURANT.name },
  }

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: tr.common.nav.blog, item: getLocalizedUrl(locale, 'blog') },
      ])} />
      <JsonLd data={blogListingSchema} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • BLOG · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1
            className="font-vibes text-4xl md:text-5xl text-white mb-4 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {tr.blog.heroH1}
          </h1>
          <p
            className="text-white/70 text-lg"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {tr.blog.heroSub}
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-vibes text-3xl text-[#C7A348] text-center mb-12">
            {tr.blog.latestH2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localePosts.map((post) => (
              <article
                key={post.slug}
                className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`h-2 ${post.language === 'nl' ? 'bg-[#D4AF37]' : 'bg-[#1B2B5E]'}`} />
                <span className="absolute top-6 right-4 bg-[#D4AF37] text-[#1B2B5E] text-xs font-bold px-2 py-1 rounded">
                  {post.language === 'nl' ? 'NL' : 'EN'}
                </span>
                <div className="p-6">
                  <p className="text-gray-400 text-xs mb-2">{formatDate(post.publishedAt, locale)}</p>
                  <h3 className="font-vibes text-xl text-[#1A1A1A] leading-tight mb-3">{post.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="inline-block bg-[#1B2B5E]/10 text-[#1B2B5E] text-xs px-3 py-1 rounded-full">
                    {post.primaryKeyword}
                  </span>
                  <div className="mt-4">
                    <Link
                      href={`${base}/blog/${post.slug}`}
                      className="text-[#1B2B5E] font-semibold text-sm hover:text-[#D4AF37] transition-colors"
                    >
                      {tr.blog.readArticle}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {locale === 'nl' ? 'Chopras Indiaas Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {locale === 'nl' ? 'Voor catering en evenementen, zie ons' : 'For catering and events, see our'} <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">{locale === 'nl' ? 'cateringmogelijkheden' : 'catering options'}</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
