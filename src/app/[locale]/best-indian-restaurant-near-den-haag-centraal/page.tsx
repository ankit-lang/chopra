import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import LocaleBlogPostPage from '../blog/[slug]/page'

const SLUG = 'how-to-find-the-best-indian-restaurant-near-me-in-den-haag-centraal'
const CANONICAL_SLUG = 'how-to-find-the-best-indian-restaurant-near-me-in-den-haag-centraal'

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
      canonical: `https://chopras.nl/${locale === 'nl' ? 'nl/' : ''}${CANONICAL_SLUG}`,
      languages: {
        en: `https://chopras.nl/${CANONICAL_SLUG}`,
        nl: `https://chopras.nl/nl/${CANONICAL_SLUG}`,
        'x-default': `https://chopras.nl/${CANONICAL_SLUG}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://chopras.nl/${locale === 'nl' ? 'nl/' : ''}${CANONICAL_SLUG}`,
      images: [{ url: post.image || '', width: 1200, height: 630, alt: title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image || ''],
    },
  }
}

export default function StandaloneBestIndianRestaurantNearDenHaagCentraalPage({ params }: Props) {
  return <LocaleBlogPostPage params={{ locale: params.locale, slug: SLUG }} />
}
