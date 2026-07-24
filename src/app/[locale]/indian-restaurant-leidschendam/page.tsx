import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDietFoodEstablishmentSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const isNl = locale === 'nl'
  const title = isNl
    ? 'Indiaas Restaurant bij Leidschendam | Chopras Indian Restaurant'
    : 'Indian Restaurant Near Leidschendam | Chopras Indian Restaurant'
  const description = isNl
    ? 'Zoekt u een Indiaas restaurant bij Leidschendam? Chopras op Leyweg 986 in Den Haag ligt op slechts 12-15 minuten. 143 authentieke halal gerechten, tandoori kleioven, 4.9 sterren van 1100+ reviews. Reserveer online.'
    : 'Searching for an Indian restaurant near Leidschendam? Chopras at Leyweg 986, Den Haag is just 12-15 minutes away. 143 authentic halal dishes, 400° tandoor clay oven, 4.9 stars from 1100+ reviews. Reserve a table.'

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-leidschendam'),
      languages: {
        en: getLocalizedUrl('en', 'indian-restaurant-leidschendam'),
        nl: getLocalizedUrl('nl', 'indian-restaurant-leidschendam'),
        'x-default': getLocalizedUrl('en', 'indian-restaurant-leidschendam'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'indian-restaurant-leidschendam'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Indiaas Restaurant bij Leidschendam Chopras Indian Restaurant' }],
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
    question: 'How far is Chopras Indian Restaurant from Leidschendam?',
    answer: 'Chopras Indian Restaurant at Leyweg 986, Den Haag is approximately 12-15 minutes by car from Leidschendam via the S107 or A4/A12 route. It is also directly accessible by public transit via RandstadRail/tram.',
  },
  {
    question: 'Is all meat at Chopras halal certified for guests coming from Leidschendam?',
    answer: 'Yes. Chopras Indian Restaurant is 100% halal certified. Every chicken, lamb, and mutton dish is sourced exclusively from certified halal suppliers, with zero non-halal meat on premises and zero cross-contamination risk.',
  },
  {
    question: 'Does Chopras deliver Indian food to Leidschendam?',
    answer: 'Yes. We deliver to Leidschendam and surrounding areas via Thuisbezorgd.nl and Uber Eats. You can also order ahead for takeaway pickup at Leyweg 986.',
  },
]

const faqsNl = [
  {
    question: 'Hoe ver is Chopras Indian Restaurant verwijderd van Leidschendam?',
    answer: 'Chopras Indian Restaurant op Leyweg 986, Den Haag ligt op ongeveer 12-15 minuten rijden van Leidschendam via de S107 of A4/A12. Het is ook rechtstreeks bereikbaar met het openbaar vervoer via RandstadRail/tram.',
  },
  {
    question: 'Is al het vlees bij Chopras halal gecertificeerd voor gasten uit Leidschendam?',
    answer: 'Ja. Chopras Indian Restaurant is 100% halal gecertificeerd. Elk kip-, lams- en schapenvleesgerecht is uitsluitend afkomstig van gecertificeerde halal-leveranciers, zonder niet-halal vlees op locatie en zonder risico op kruisbesmetting.',
  },
  {
    question: 'Bezorgt Chopras Indiaas eten in Leidschendam?',
    answer: 'Ja. Wij bezorgen in Leidschendam en omgeving via Thuisbezorgd.nl en Uber Eats. U kunt ook vooraf bestellen voor afhalen bij Leyweg 986.',
  },
]

export default function IndianRestaurantLeidschendamPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const restaurantSchema = getLocalRestaurantSchema(
    locale,
    ['Leidschendam', 'Voorburg', 'Den Haag', 'South Holland'],
    getLocalizedUrl(locale, 'indian-restaurant-leidschendam'),
  )

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Restaurant bij Leidschendam' : 'Indian Restaurant Near Leidschendam', item: getLocalizedUrl(locale, 'indian-restaurant-leidschendam') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Halal', 'Halal Indian', 'North Indian'], 'indian-restaurant-leidschendam')} />

      {/* Hero */}
      <section className="btn-gradient py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              12-15 MINUTES FROM LEIDSCHENDAM · CHOPRAS DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl
              ? 'Indiaas Restaurant bij Leidschendam - Authentiek & 100% Halal'
              : 'Indian Restaurant Near Leidschendam - Authentic & 100% Halal'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? 'Slechts 12-15 minuten rijden van Leidschendam. 143 Noord-Indiase gerechten bereid in 400° kleioven met dagelijks vers gemalen specerijen.'
              : 'Just 12-15 minutes drive from Leidschendam. 143 North Indian dishes cooked in a 400° clay oven with daily freshly ground spices.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Authentiek Indiaas Eten Vlakbij Leidschendam'
              : 'Authentic Indian Food Just Minutes from Leidschendam'}
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              {isNl
                ? 'Woont u in Leidschendam of omgeving en zoekt u een authentiek Indiaas restaurant met 100% halal gecertificeerde gerechten? Chopras Indian Restaurant op Leyweg 986 in Den Haag is gemakkelijk en snel te bereiken.'
                : 'Living in Leidschendam or surrounding areas and looking for an authentic Indian restaurant serving 100% halal certified dishes? Chopras Indian Restaurant at Leyweg 986, Den Haag is quick and convenient to reach.'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen voor Gasten uit Leidschendam' : 'Frequently Asked Questions for Guests from Leidschendam'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>
    </>
  )
}
