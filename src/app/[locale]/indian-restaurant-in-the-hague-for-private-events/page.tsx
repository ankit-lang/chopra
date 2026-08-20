import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import LocaleBlogPostPage from '../blog/[slug]/page'

const SLUG = 'indian-restaurant-in-the-hague-for-private-events'

type Props = { params: { locale: 'en' | 'nl' } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === SLUG)
  if (!post) return {}
  const { locale } = params
  const title = (locale === 'nl' && post.metaTitleNl) || post.metaTitle
  const description = (locale === 'nl' && post.metaDescriptionNl) || post.metaDescription
  
  return {
    title,
    description,
    keywords: post.keywords || [post.primaryKeyword],
    alternates: {
      canonical: `https://chopras.nl/${locale === 'nl' ? 'nl/' : ''}${SLUG}`,
      languages: {
        en: `https://chopras.nl/${SLUG}`,
        nl: `https://chopras.nl/nl/${SLUG}`,
        'x-default': `https://chopras.nl/${SLUG}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://chopras.nl/${locale === 'nl' ? 'nl/' : ''}${SLUG}`,
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/home-og.jpg'],
    },
  }
}

export default function StandalonePrivateEventsBlogPage({ params }: Props) {
  return <LocaleBlogPostPage params={{ locale: params.locale, slug: SLUG }} />
}
