import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getTakeawayServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const isNl = locale === 'nl'
  const title = isNl
    ? 'Indiaas Afhalen Den Haag | Vers & Snel Afhalen | Chopras'
    : 'Indian Takeaway Den Haag | Fresh & Fast Pickup | Chopras'
  const description = isNl
    ? 'Zoekt u Indiaas eten om af te halen in Den Haag? Chopras Indian Restaurant op Leyweg 986 biedt 143 authentieke halal gerechten. Binnen 20-25 minuten vers bereid en warm verpakt. Bestel direct online.'
    : 'Looking for Indian takeaway in Den Haag? Chopras Indian Restaurant at Leyweg 986 offers 143 authentic halal dishes freshly prepared and packed hot in 20-25 minutes. Order online for pickup.'

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-takeaway-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'indian-takeaway-den-haag'),
        nl: getLocalizedUrl('nl', 'indian-takeaway-den-haag'),
        'x-default': getLocalizedUrl('en', 'indian-takeaway-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'indian-takeaway-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Indiaas Afhalen Den Haag Chopras Indian Restaurant' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/home-og.jpg'],
    },
  }
}

const faqsEn = [
  {
    question: 'How do I place an Indian takeaway order at Chopras in Den Haag?',
    answer: 'You can order takeaway directly through our website menu or call us at +31 6 30645930. Pickup is at Leyweg 986, 2545 GW Den Haag.',
  },
  {
    question: 'How long does a takeaway order take to prepare?',
    answer: 'Most takeaway orders are ready in 20 to 25 minutes.',
  },
]

const faqsNl = [
  {
    question: 'Hoe plaats ik een Indiase afhaalbestelling bij Chopras in Den Haag?',
    answer: 'U kunt een afhaalbestelling rechtstreeks plaatsen via ons websitemenu of bellen op +31 6 30645930. Afhalen is bij Leyweg 986, 2545 GW Den Haag.',
  },
  {
    question: 'Hoe lang duurt het voordat een afhaalbestelling klaar is?',
    answer: 'De meeste afhaalbestellingen zijn binnen 20 tot 25 minuten klaar.',
  },
]

export default function IndianTakeawayPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag', 'Rijswijk', 'Delft'], getLocalizedUrl(locale, 'indian-takeaway-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Afhalen Den Haag' : 'Indian Takeaway Den Haag', item: getLocalizedUrl(locale, 'indian-takeaway-den-haag') },
      ])} />
      <JsonLd data={getTakeawayServiceSchema(locale)} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* Hero */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              FAST TAKEAWAY · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl
              ? 'Indiaas Afhalen Den Haag - Vers & Snel Op te Haalt'
              : 'Indian Takeaway Den Haag - Fresh & Fast Pickup'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? '143 authentieke halal gerechten vers bereid in 20-25 minuten. Afhalen bij Leyweg 986, Den Haag.'
              : '143 authentic halal dishes cooked fresh in 20-25 minutes. Pickup at Leyweg 986, Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Copy */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Snel en Vers Indiaas Afhalen in Den Haag'
              : 'Fast and Fresh Indian Takeaway in Den Haag'}
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              {isNl
                ? 'Wilt u genieten van authentiek Indiaas eten bij u thuis of op kantoor? Chopras Indian Restaurant op Leyweg 986 in Den Haag biedt snelle afhaalservice voor al onze 143 halal gerechten.'
                : 'Want to enjoy authentic Indian dining in the comfort of your home or office? Chopras Indian Restaurant at Leyweg 986, Den Haag offers quick takeaway pickup for all 143 halal dishes.'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Indiaas Afhalen' : 'Frequently Asked Questions About Indian Takeaway'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>
    </>
  )
}
