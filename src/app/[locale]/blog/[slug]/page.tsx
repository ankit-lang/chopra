import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blog-data'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { getLocalizedUrl } from '@/lib/utils'
import JsonLd from '@/components/seo/JsonLd'
import { getBlogPostingSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'

type Props = { params: { locale: Locale; slug: string } }

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    locale: post.language,
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  const { locale } = params
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: getLocalizedUrl(locale, `blog/${post.slug}`),
      languages: {
        [post.language]: getLocalizedUrl(post.language, `blog/${post.slug}`),
        'x-default': getLocalizedUrl(post.language, `blog/${post.slug}`),
      },
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: getLocalizedUrl(locale, `blog/${post.slug}`),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: post.title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: ['/og/home-og.jpg'],
    },
  }
}

function formatDate(dateStr: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'nl' ? 'nl-NL' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(dateStr))
}

function localizeInternalLinks(html: string, locale: Locale): string {
  return html.replace(
    /href="https:\/\/chopras\.nl(\/[^"#?]*)?([#?][^"]*)?"/g,
    (_match, path = '/', suffix = '') => {
      if (locale === 'nl') {
        const localizedPath = path.startsWith('/nl') ? path : `/nl${path === '/' ? '' : path}`
        return `href="${localizedPath}${suffix}"`
      }

      return `href="${path}${suffix}"`
    },
  )
}

export default function LocaleBlogPostPage({ params }: Props) {
  const { locale, slug } = params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const localizedContent = localizeInternalLinks(post.content, locale)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.language === locale)
    .slice(0, 2)

  return (
    <>
      <JsonLd data={getBlogPostingSchema(post, locale)} />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd data={getFaqPageSchema(post.faqs)} />
      )}
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: tr.common.nav.blog, item: getLocalizedUrl(locale, 'blog') },
        { name: post.title, item: getLocalizedUrl(locale, `blog/${post.slug}`) },
      ])} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-white/50 text-sm mb-6" aria-label="Breadcrumb">
            <Link href={base} className="hover:text-white/80 transition-colors">{tr.common.nav.home}</Link>
            <span className="mx-2">/</span>
            <Link href={`${base}/blog`} className="hover:text-white/80 transition-colors">{tr.common.nav.blog}</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70 line-clamp-1">{post.title}</span>
          </nav>

          {post.language === 'nl' && (
            <span className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]">
              {tr.blog.nlBadge}
            </span>
          )}

          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • BLOG · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] max-w-4xl leading-tight mb-4">
            {post.h1}
          </h1>

          <p className="text-white/60 text-sm mb-6">By {post.author} · Founder, Chopras Indian Restaurant</p>

          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <span>{formatDate(post.publishedAt, locale)}</span>
            <span className="bg-[#0000B3]/20 text-white text-xs px-3 py-1 rounded-full">
              {post.primaryKeyword}
            </span>
            <span>{post.readingTime} {tr.blog.minRead}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <article
              className="flex-1 prose prose-lg max-w-none
                prose-headings:font-vibes prose-headings:text-white prose-headings:leading-[1.3]
                prose-p:text-[#1A1A1A]/70 prose-p:leading-relaxed
                prose-a:text-white prose-a:hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] prose-a:no-underline prose-a:font-semibold
                prose-strong:text-[#1A1A1A]
                prose-ul:text-gray-700
                prose-img:block prose-img:md:float-right prose-img:md:ml-6 prose-img:mb-4 prose-img:w-full prose-img:md:w-auto
                [&_img]:block [&_img]:md:float-right [&_img]:md:ml-6 [&_img]:mb-4
                [&_.est-badge]:hidden [&_.est-badge]:md:block
                [&_[class*='sticky']]:relative [&_[class*='sticky']]:md:sticky
                [&_[class*='absolute']]:relative [&_[class*='absolute']]:md:absolute
                overflow-hidden"
              dangerouslySetInnerHTML={{ __html: localizedContent }}
            />

            <aside className="hidden lg:block w-full lg:w-80">
              <div className="sticky top-24 bg-[#1B2B5E] rounded-2xl p-6 text-white overflow-visible">
                <p className="font-vibes text-xl mb-4 leading-snug">{tr.blog.enjoySidebar}</p>
                <p className="text-white/70 text-sm mb-1">Leyweg 986</p>
                <p className="text-white/70 text-sm mb-1">2545 GW Den Haag</p>
                <p className="text-white/70 text-sm mb-6">+31 6 30645930</p>
                <Link
                  href={`${base}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] w-full backdrop-blur-[10px] mb-3"
                >
                  {tr.common.reserve}
                </Link>
                <Link
                  href={`${base}/menu`}
                  className="block text-center text-white/70 text-sm hover:text-white transition-colors"
                >
                  {tr.common.viewMenu} →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F7F8FC] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-8">{tr.blog.relatedH2}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`${base}/blog/${related.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow block"
                >
                  <p className="text-gray-400 text-xs mb-2">{formatDate(related.publishedAt, locale)}</p>
                  <h3 className="font-vibes text-lg text-[#1A1A1A] leading-tight mb-2">{related.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{related.excerpt}</p>
                  <span className="inline-block mt-3 text-[#1B2B5E] font-semibold text-sm">
                    {tr.blog.readArticle}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INTERNAL LINKS SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {locale === 'nl' ? 'Chopras Indiaas Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {locale === 'nl' ? 'Voor catering en evenementen, zie ons' : 'For catering and events, see our'} <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">{locale === 'nl' ? 'cateringmogelijkheden' : 'catering options'}</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
