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
    ? 'Halal Eten Den Haag | 100% Gecertificeerd Halal Restaurant | Chopras'
    : 'Halal Food Den Haag | 100% Certified Halal Restaurant | Chopras'
  const description = isNl
    ? 'Zoekt u 100% halal eten in Den Haag? Chopras Indian Restaurant op Leyweg 986 biedt een volledig halal gecertificeerd menu met 143 gerechten. Geen alcohol in het eten, geen kruisbesmetting. 4.9 sterren van 1100+ reviews. Reserveer online.'
    : 'Looking for 100% certified halal food in Den Haag? Chopras Indian Restaurant at Leyweg 986 serves an entire menu of 143 halal dishes. No alcohol in cooking, zero cross-contamination. 4.9 stars from 1100+ reviews. Book online.'

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(locale, 'halal-food-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'halal-food-den-haag'),
        nl: getLocalizedUrl('nl', 'halal-food-den-haag'),
        'x-default': getLocalizedUrl('en', 'halal-food-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'halal-food-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Halal Eten Den Haag Chopras Indian Restaurant' }],
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
    question: 'Is all the meat served at Chopras Indian Restaurant halal certified?',
    answer: 'Yes. Every single meat dish served at Chopras Indian Restaurant - chicken, lamb, and mutton - is sourced exclusively from certified halal suppliers. The entire kitchen operates to strict halal standards.',
  },
  {
    question: 'Is there any risk of cross-contamination with non-halal meat at Chopras?',
    answer: 'No. There is zero risk of cross-contamination because Chopras does not carry, store, or cook any non-halal meat on the premises. The entire kitchen and food preparation area is dedicated strictly to halal ingredients.',
  },
  {
    question: 'Is alcohol used in any food preparation at Chopras?',
    answer: 'No. Alcohol is never used as an ingredient or cooking agent in any of our marinades, curries, gravies, or desserts.',
  },
  {
    question: 'Where is Chopras Indian Restaurant located in Den Haag?',
    answer: 'Chopras Indian Restaurant is located at Leyweg 986, 2545 GW Den Haag. It is easily reachable by car (paid parking nearby) and public transport (tram line 2, Leyweg stop).',
  },
  {
    question: 'What halal dishes are most popular at Chopras in Den Haag?',
    answer: 'Our most popular halal dishes include our signature butter chicken, saffron chicken and lamb biryani, mutton rogan josh, tandoori chicken tikka, and freshly baked garlic naan from our 400-degree clay oven.',
  },
]

const faqsNl = [
  {
    question: 'Is al het vlees bij Chopras Indian Restaurant halal gecertificeerd?',
    answer: 'Ja. Elk vleesgerecht dat bij Chopras Indian Restaurant geserveerd wordt - kip, lamsvlees en schapenvlees - is uitsluitend afkomstig van gecertificeerde halal-leveranciers. De gehele keuken werkt volgens strikte halal-normen.',
  },
  {
    question: 'Is er risico op kruisbesmetting met niet-halal vlees bij Chopras?',
    answer: 'Nee. Er is nul risico op kruisbesmetting omdat Chopras geen niet-halal vlees op het terrein heeft of verwerkt. De gehele keuken en voorbereidingsruimte is uitsluitend bestemd voor halal ingrediënten.',
  },
  {
    question: 'Wordt er alcohol gebruikt in de bereiding van het eten bij Chopras?',
    answer: 'Nee. Alcohol wordt nooit gebruikt als ingrediënt of kookmiddel in onze marinades, curry’s, sauzen of desserts.',
  },
  {
    question: 'Waar is Chopras Indian Restaurant gevestigd in Den Haag?',
    answer: 'Chopras Indian Restaurant is gevestigd op Leyweg 986, 2545 GW Den Haag. Het is uitstekend bereikbaar met de auto (betaald parkeren nabij) en openbaar vervoer (tramlijn 2, halte Leyweg).',
  },
  {
    question: 'Welke halal gerechten zijn het meest populair bij Chopras in Den Haag?',
    answer: 'Onze populairste halal gerechten zijn onze signature butter chicken, saffraan kip en lams biryani, mutton rogan josh, tandoori chicken tikka en vers gebakken knoflook naan uit onze 400-graden kleioven.',
  },
]

export default function HalalFoodDenHaagPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'halal-food-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Halal Eten Den Haag' : 'Halal Food Den Haag', item: getLocalizedUrl(locale, 'halal-food-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Halal', 'Halal Indian', 'North Indian'], 'halal-food')} />

      {/* Hero */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              100% HALAL CERTIFIED · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl
              ? 'Halal Eten Den Haag - 100% Gecertificeerd Indiaas Restaurant'
              : 'Halal Food Den Haag - 100% Certified Indian Restaurant'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? 'Elk vleesgerecht en elke ingrediënt leverancier is halal gecertificeerd. Nul risico op kruisbesmetting. 143 gerechten. Leyweg 986, Den Haag.'
              : 'Every meat dish and ingredient supplier is halal certified. Zero cross-contamination risk. 143 dishes. Leyweg 986, Den Haag.'}
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

      {/* Main Copy */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Volledig Halal Gecertificeerd Indiaas Restaurant in Den Haag'
              : 'Fully Halal Certified Indian Restaurant in Den Haag'}
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              {isNl
                ? 'Wanneer u op zoek bent naar halal eten in Den Haag, wilt u volledige zekerheid dat alles wat in de keuken bereid wordt voldoet aan de strengste halal-normen. Bij Chopras Indian Restaurant op Leyweg 986 in Den Haag is halal geen optie op het menu — onze gehele keuken is 100% halal gecertificeerd.'
                : 'When searching for halal food in Den Haag, you want complete peace of mind that everything prepared in the kitchen meets strict halal standards. At Chopras Indian Restaurant, Leyweg 986 in Den Haag, halal is not just an option — our entire kitchen is 100% halal certified.'}
            </p>
            <p>
              {isNl
                ? 'Elke kip, lams- en schapenvleessnijding is afkomstig van geverifieerde halal-leveranciers. Omdat wij op onze locatie geen niet-halal vlees bewaren of bereiden, is er absoluut geen risico op kruisbesmetting.'
                : 'Every cut of chicken, lamb, and mutton comes from verified halal suppliers. Because we store and cook zero non-halal meat on premises, there is absolutely zero risk of cross-contamination.'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Halal Eten in Den Haag' : 'Frequently Asked Questions About Halal Food in Den Haag'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Kom Genieten van 100% Halal Indiaas Eten' : 'Enjoy 100% Halal Indian Dining'}
          </h2>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? 'Leyweg 986, Den Haag. Open dinsdag tot en met zondag van 16:30 tot 22:30.'
              : 'Leyweg 986, Den Haag. Open Tuesday to Sunday from 16:30 to 22:30.'}
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
    </>
  )
}
