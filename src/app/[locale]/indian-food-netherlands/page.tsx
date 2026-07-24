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
    ? 'Indiaas Eten Nederland | Authentiek Indiaas Restaurant Den Haag | Chopras'
    : 'Indian Food Netherlands | Authentic Indian Restaurant Den Haag | Chopras'
  const description = isNl
    ? 'Zoekt u het beste Indiase eten in Nederland? Chopras Indian Restaurant op Leyweg 986 in Den Haag serveert 143 authentieke Noord-Indiase halal gerechten bereid met vers gemalen specerijen. 4.9 sterren van 1100+ reviews. Reserveer online.'
    : 'Looking for authentic Indian food in the Netherlands? Chopras Indian Restaurant at Leyweg 986, Den Haag serves 143 North Indian halal dishes made with daily freshly ground spices. 4.9 stars from 1100+ reviews. Book online.'

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-food-netherlands'),
      languages: {
        en: getLocalizedUrl('en', 'indian-food-netherlands'),
        nl: getLocalizedUrl('nl', 'indian-food-netherlands'),
        'x-default': getLocalizedUrl('en', 'indian-food-netherlands'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'indian-food-netherlands'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Indiaas Eten Nederland Chopras Indian Restaurant Den Haag' }],
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
    question: 'Why is Chopras considered one of the top Indian restaurants in the Netherlands?',
    answer: 'Chopras Indian Restaurant stands out because we maintain authentic North Indian culinary traditions without compromise: we grind whole spices fresh every morning, cook over high-heat tandoor clay ovens, use 100% halal certified meat, and offer a dedicated kids menu and private party hall.',
  },
  {
    question: 'Where in the Netherlands is Chopras Indian Restaurant located?',
    answer: 'Chopras is located in Den Haag (The Hague) at Leyweg 986, 2545 GW Den Haag. It is conveniently accessible from Delft, Rijswijk, Voorburg, Zoetermeer, and Rotterdam via car and public transit.',
  },
  {
    question: 'Is the entire menu at Chopras halal certified?',
    answer: 'Yes, 100%. All meat served at Chopras - chicken, lamb, and mutton - is certified halal, prepared in a clean kitchen with zero cross-contamination risk.',
  },
]

const faqsNl = [
  {
    question: 'Waarom wordt Chopras beschouwd als een van de top Indiase restaurants in Nederland?',
    answer: 'Chopras Indian Restaurant onderscheidt zich doordat we authentieke Noord-Indiase culinaire tradities handhaven zonder compromis: we malen elke ochtend verse hele specerijen, koken in tandoor kleiovens van 400 graden, gebruiken 100% halal gecertificeerd vlees en bieden een kindermenu en eigen feestzaal.',
  },
  {
    question: 'Waar in Nederland is Chopras Indian Restaurant gevestigd?',
    answer: 'Chopras bevindt zich in Den Haag op Leyweg 986, 2545 GW Den Haag. Het is gemakkelijk bereikbaar vanuit Delft, Rijswijk, Voorburg, Zoetermeer en Rotterdam per auto en openbaar vervoer.',
  },
  {
    question: 'Is het gehele menu bij Chopras halal gecertificeerd?',
    answer: 'Ja, 100%. Al het vlees dat bij Chopras wordt geserveerd - kip, lamsvlees en schapenvlees - is gecertificeerd halal, bereid in een schone keuken zonder risico op kruisbesmetting.',
  },
]

export default function IndianFoodNetherlandsPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const restaurantSchema = getLocalRestaurantSchema(
    locale,
    ['Netherlands', 'Den Haag', 'South Holland', 'Rijswijk', 'Delft', 'Zoetermeer'],
    getLocalizedUrl(locale, 'indian-food-netherlands'),
  )

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Eten Nederland' : 'Indian Food Netherlands', item: getLocalizedUrl(locale, 'indian-food-netherlands') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Halal', 'Halal Indian', 'North Indian'], 'indian-food-netherlands')} />

      {/* Hero */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              AUTHENTIC NORTH INDIAN CUISINE · NETHERLANDS
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl
              ? 'Indiaas Eten Nederland - Authentiek Indiaas Restaurant Chopras'
              : 'Indian Food Netherlands - Authentic Indian Dining at Chopras'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? '143 authentieke Noord-Indiase gerechten bereid met dagelijks vers gemalen specerijen. 100% halal. Leyweg 986, Den Haag. 4.9 sterren van 1100+ reviews.'
              : '143 authentic North Indian dishes made with spices ground fresh daily. 100% halal. Leyweg 986, Den Haag. Rated 4.9 stars from 1100+ reviews.'}
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
              ? 'Ervaar de Echte Smaak van Indiaas Eten in Nederland'
              : 'Experience Real North Indian Food in the Netherlands'}
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              {isNl
                ? 'De Indiase keuken behoort tot de meest diverse en geliefde culinaire tradities ter wereld. Bij Chopras Indian Restaurant op Leyweg 986 in Den Haag brengen wij de authentieke smaken van Noord-India naar Nederland, precies zoals ze in India bereid worden.'
                : 'Indian cuisine is celebrated globally for its depth, aroma, and richness. At Chopras Indian Restaurant, Leyweg 986 in Den Haag, we bring the authentic flavours of North India to the Netherlands, cooked precisely as they are in India.'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Indiaas Eten in Nederland' : 'Frequently Asked Questions About Indian Food in the Netherlands'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>
    </>
  )
}
