import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const title = 'Zaal Huren Den Haag | Feestzaal voor 25-80 Personen | Chopras'
  const description = 'Zaal huren in Den Haag voor bruiloften, verjaardagen en feesten. Privézaal bij Chopras Indian Restaurant op Leyweg 986 voor 25 tot 80 personen met 100% halal catering. Reserveer direct.'
  return {
    title,
    description,
    robots: locale === 'en' ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: getLocalizedUrl(locale, 'zaal-huren-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'zaal-huren-den-haag'),
        nl: getLocalizedUrl('nl', 'zaal-huren-den-haag'),
        'x-default': getLocalizedUrl('en', 'zaal-huren-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'zaal-huren-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Zaal Huren Den Haag Chopras Feestzaal' }],
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

const faqs = [
  {
    question: 'Hoeveel personen passen er in de zaal bij Chopras Den Haag?',
    answer: 'Onze privézaal op Leyweg 986 is geschikt voor gezelschappen van 25 tot 80 personen.',
  },
  {
    question: 'Is catering inbegrepen bij het huren van de zaal?',
    answer: 'Ja. Wij bieden arrangementen inclusief ons volledige 100% halal Indiase buffet of uitgeserveerd diner.',
  },
]

export default function ZaalHurenPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'zaal-huren-den-haag'))} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
          { name: 'Zaal Huren Den Haag', item: getLocalizedUrl(locale, 'zaal-huren-den-haag') },
        ])}
      />
      <JsonLd data={getFaqPageSchema(faqs)} />

      {/* Hero */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              FEESTZAAL · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Zaal Huren Den Haag
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sfeervolle privézaal op Leyweg 986 voor 25 tot 80 personen. Inclusief 100% halal catering op maat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Offerte Aanvragen
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Privé Feestzaal Huren in Den Haag op Leyweg 986
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              Zoekt u een sfeervolle zaal in Den Haag voor een verjaardag, bruiloft, familiefeest of zakelijk diner? De privézaal van Chopras Indian Restaurant op Leyweg 986 biedt de ideale uitkomst.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Veelgestelde Vragen over Zaal Huren in Den Haag
          </h2>
          <FaqAccordion faqs={faqs} locale={locale} />
        </div>
      </section>
    </>
  )
}
