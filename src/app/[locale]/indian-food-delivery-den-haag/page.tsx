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
    ? 'Indiaas Eten Bezorgen Den Haag | Snel Warm Bezorgd | Chopras'
    : 'Indian Food Delivery Den Haag | Fast Hot Delivery | Chopras'
  const description = isNl
    ? 'Wilt u Indiaas eten laten bezorgen in Den Haag? Chopras Indian Restaurant bezorgt 143 authentieke halal gerechten via Thuisbezorgd en Uber Eats. Vers bereid en warm aan huis. Bestel nu.'
    : 'Order Indian food delivery in Den Haag from Chopras Indian Restaurant. 143 authentic halal dishes delivered hot to your doorstep via Thuisbezorgd and Uber Eats. Order online.'

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-food-delivery-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'indian-food-delivery-den-haag'),
        nl: getLocalizedUrl('nl', 'indian-food-delivery-den-haag'),
        'x-default': getLocalizedUrl('en', 'indian-food-delivery-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'indian-food-delivery-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Indiaas Eten Bezorgen Den Haag Chopras Indian Restaurant' }],
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
    question: 'Through which delivery platforms can I order Indian food delivery from Chopras in Den Haag?',
    answer: 'You can order Chopras Indian food delivery in Den Haag through Thuisbezorgd.nl and Uber Eats. You can also call us directly at +31 6 30645930 for takeaway pickup at Leyweg 986.',
  },
  {
    question: 'What areas in Den Haag does Chopras deliver to?',
    answer: 'We deliver across Den Haag, including Escamp, Leyenburg, Rustenburg-Oostbroek, Moerwijk, Scheveningen, Segbroek, Loosduinen, and neighbouring areas like Rijswijk.',
  },
  {
    question: 'Are all delivered dishes 100% halal certified?',
    answer: 'Yes. Every dish on our delivery menu comes from our 100% halal-certified kitchen at Leyweg 986 in Den Haag.',
  },
]

const faqsNl = [
  {
    question: 'Via welke platforms kan ik Indiaas eten laten bezorgen in Den Haag bij Chopras?',
    answer: 'U kunt Chopras Indiaas eten in Den Haag laten bezorgen via Thuisbezorgd.nl en Uber Eats. U kunt ons ook bellen op +31 6 30645930 voor afhalen bij Leyweg 986.',
  },
  {
    question: 'In welke wijken in Den Haag bezorgt Chopras?',
    answer: 'Wij bezorgen door heel Den Haag, inclusief Escamp, Leyenburg, Rustenburg-Oostbroek, Moerwijk, Scheveningen, Segbroek, Loosduinen en omliggende gebieden zoals Rijswijk.',
  },
  {
    question: 'Zijn alle bezorgde gerechten 100% halal gecertificeerd?',
    answer: 'Ja. Elk gerecht op ons bezorgmenu komt uit onze 100% halal gecertificeerde keuken op Leyweg 986 in Den Haag.',
  },
]

export default function IndianFoodDeliveryPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'indian-food-delivery-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Eten Bezorgen' : 'Indian Food Delivery', item: getLocalizedUrl(locale, 'indian-food-delivery-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Halal', 'Halal Indian', 'North Indian'], 'food-delivery')} />

      {/* Hero */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              DELIVERY & TAKEAWAY · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl
              ? 'Indiaas Eten Bezorgen Den Haag - Warm & Vers aan Huis'
              : 'Indian Food Delivery Den Haag - Fast & Fresh to Your Door'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? '143 authentieke halal gerechten vers bereid op Leyweg 986. Bestel via Thuisbezorgd of Uber Eats.'
              : '143 authentic halal dishes made fresh at Leyweg 986. Order via Thuisbezorgd or Uber Eats.'}
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
              ? 'Authentiek Indiaas Eten Thuisbezorgd in Den Haag'
              : 'Authentic Indian Food Delivered in Den Haag'}
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              {isNl
                ? 'Geen zin om te koken? Chopras Indian Restaurant brengt de echte Noord-Indiase keuken rechtstreeks naar uw voordeur in Den Haag. Elk gerecht wordt pas bereid nadat u bestelt, met vers gemalen specerijen en 100% halal gecertificeerde ingrediënten.'
                : 'Craving authentic Indian food at home? Chopras Indian Restaurant brings real North Indian flavours straight to your door in Den Haag. Every meal is cooked to order using spices ground fresh daily in our kitchen at Leyweg 986.'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Indiaas Eten Bezorgen' : 'Frequently Asked Questions About Indian Food Delivery'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>
    </>
  )
}
