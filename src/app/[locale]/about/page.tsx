import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'

import { getLocalizedUrl } from '@/lib/utils'
import { getFounderSchema, getRestaurantSchema, getBreadcrumbSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'About Arun Chopra | Founder of Chopras Indian Restaurant Den Haag',
    nl: 'Over Arun Chopra | Oprichter van Chopras Indian Restaurant Den Haag',
  }
  const descriptions = {
    en: 'Meet Arun Chopra, founder of Chopras Indian Restaurant Den Haag. Authentic North Indian food at Leyweg 986 since 2023. Halal certified and rated 4.9 stars.',
    nl: 'Maak kennis met Arun Chopra, oprichter van Chopras Indian Restaurant. Authentiek Noord-Indiaas eten op Leyweg 986 in Den Haag. Halal gecertificeerd.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'about'),
      languages: {
        en: getLocalizedUrl('en', 'about'),
        nl: getLocalizedUrl('nl', 'about'),
        'x-default': getLocalizedUrl('en', 'about'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'about'),
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

export default function AboutPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
    { name: isNl ? 'Over Ons' : 'About', item: getLocalizedUrl(locale, 'about') },
  ])

  return (
    <>
      <JsonLd data={getFounderSchema()} />
      <JsonLd data={getRestaurantSchema(locale)} />
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • MEET THE FOUNDER •
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl ? 'Arun Chopra - Oprichter van Chopras' : 'Arun Chopra - Founder of Chopras'}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Authentieke Noord-Indiaase keuken. Exact zoals het in India gegeten wordt.'
              : 'Authentic North Indian food. Exactly as it is eaten in India.'}
          </p>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#1B2B5E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-white mb-8">
            {isNl
              ? 'Wie is de Oprichter van Chopras Indian Restaurant Den Haag?'
              : 'Who Is the Founder of Chopras Indian Restaurant Den Haag?'}
          </h2>
          <div className="text-white/90 text-lg leading-relaxed">
            {isNl ? (
              <p>Arun Chopra is de oprichter van Chopras Indian Restaurant, gevestigd op Leyweg 986, 2545 GW Den Haag. Het restaurant werd in 2023 opgericht met de missie om authentieke Noord-Indiaase keuken exact zoals het in India gegeten wordt naar Den Haag te brengen. Chopras staat beoordeeld met 4,9 sterren op basis van 800+ Google-recensies. Alle gerechten zijn <Link href={`${base}/halal-food-den-haag`} className="text-[#C7A348] hover:underline font-semibold">volledig halal gecertificeerd</Link>. <Link href={`${base}/contact`} className="text-[#C7A348] hover:underline font-semibold">Het restaurant is open dinsdag tot zondag van 16:30 tot 22:30</Link>.</p>
            ) : (
              <p>Arun Chopra is the founder of Chopras Indian Restaurant, located at Leyweg 986, 2545 GW Den Haag. The restaurant was established in 2023 with the mission to bring authentic North Indian food to Den Haag, prepared exactly as it is eaten in India. Chopras is rated 4.9 stars across 800+ Google reviews. All dishes are <Link href={`${base}/halal-food-den-haag`} className="text-[#C7A348] hover:underline font-semibold">fully halal certified</Link>. <Link href={`${base}/contact`} className="text-[#C7A348] hover:underline font-semibold">The restaurant is open Tuesday to Sunday from 16:30 to 22:30</Link>.</p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 1: The Mission */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'De Missie van Arun Chopra' : 'Arun Chopra - The Mission'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-6">
            {isNl ? (
              <>
                <p>Arun Chopra richtte Chopras Indian Restaurant op met een duidelijk doel - geen compromissen sluiten op authenticiteit. De meeste Indiaase restaurants buiten India passen hun menu aan voor lokale smaken. Chopras doet het niet. De gerechten, de recepten, de technieken, de kruiden - alles komt rechtstreeks uit Noord-India.</p>
                <p>Dit betekent dat je bij Chopras <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">butter chicken eet zoals het in Delhi gegeten wordt</Link>, niet zoals het in Europa is aangepast. Het betekent dat <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">dal makhani langzaam wordt gekookt</Link> met verse ingredienten die die ochtend zijn gemaald. Het betekent dat de <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">tandoori-technieken exact volgen</Link> wat in India al eeuwenlang wordt gedaan.</p>
                <p>Arun gelooft dat eet authentiek eten een erfstuk is. De recepten zijn niet van hem. Ze behoren toe aan generaties Indiase koks die ze hebben geperfectioneerd. Zijn taak is ze onveranderd naar Den Haag te brengen.</p>
              </>
            ) : (
              <>
                <p>Arun Chopra founded Chopras Indian Restaurant with one clear objective - no compromise on authenticity. Most Indian restaurants outside India adapt their menus for local tastes. Chopras does not. The dishes, the recipes, the techniques, the spices - everything comes straight from North India.</p>
                <p>This means when you eat at Chopras, you eat <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">butter chicken as it is eaten in Delhi</Link>, not as it has been adapted for Europe. It means <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">dal makhani is slow-cooked</Link> with fresh ingredients ground that morning. It means <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">tandoori techniques follow exactly</Link> what has been done in India for centuries.</p>
                <p>Arun believes authentic food is a heritage. The recipes are not his. They belong to generations of Indian cooks who perfected them. His responsibility is to bring them to Den Haag unchanged.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: The Kitchen */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Het Begrip van Authenticiteit' : 'The Definition of Authentic'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-6">
            {isNl ? (
              <>
                <p>In Chopras kitchen grindt Arun spices fresh every morning. Not once a day - every morning before service. The volatile aromatic oils in cumin, coriander and green cardamom begin to evaporate within hours of grinding. A <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline font-semibold">pre-mixed spice blend stored in a warehouse</Link> cannot compete with what comes out of a kitchen that begins its day by grinding whole spices from India.</p>
                <p>The chicken is sourced from <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">halal-certified suppliers only</Link>. Every chicken. Every dish. Every evening. Not because Chopras is trying to capture a halal market. Because Arun is Muslim, and halal is not optional - it is how the kitchen operates.</p>
                <p>The vegetables come fresh daily. The tomatoes for <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">biryani and curries</Link> are ripe and reduced slowly. The cream is full-fat. The butter is pure. The approach is - this is what authentic tastes like.</p>
              </>
            ) : (
              <>
                <p>In Chopras kitchen, Arun grinds spices fresh every morning. Not once a day - every morning before service. The volatile aromatic oils in cumin, coriander and green cardamom begin to evaporate within hours of grinding. A <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline font-semibold">pre-mixed spice blend stored in a warehouse</Link> cannot compete with what comes out of a kitchen that begins its day by grinding whole spices from India.</p>
                <p>The chicken is sourced from <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">halal-certified suppliers only</Link>. Every chicken. Every dish. Every evening. Not because Chopras is trying to capture a halal market. Because Arun is Muslim, and halal is not optional - it is how the kitchen operates.</p>
                <p>The vegetables come fresh daily. The tomatoes for <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">biryani and curries</Link> are ripe and reduced slowly. The cream is full-fat. The butter is pure. The approach is - this is what authentic tastes like.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: The Restaurant */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Chopras in Den Haag' : 'Chopras in Den Haag'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-6">
            {isNl ? (
              <>
                <p>Chopras werd geopend in 2023 op Leyweg 986 in Den Haag. Het restaurant heeft plaats voor 25 tot 80 gasten en beschikt over een aparte <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">private feestzaal voor bruiloften, verjaardagen en bedrijfsfeesten</Link>. Open dinsdag tot en met zondag van 16:30 tot 22:30. Gesloten op maandag.</p>
                <p>Het menu biedt meer dan 143 gerechten - <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:underline font-semibold">vegetarische en veganistische opties</Link>, biryani, tandoori, North Indian curries en <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">Indo-Chinese fusion food</Link>. Alle gerechten kunnen <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">bezorgd worden of afhalen</Link> voor degenen die thuis willen genieten.</p>
                <p>De geschiedenis van Chopras is kort maar doelgericht. Een restaurant opgericht niet om winst, maar om authentieke Noord-Indiaase keuken naar Nederland te brengen. Een plek waar je kunt genieten van het echte werk.</p>
              </>
            ) : (
              <>
                <p>Chopras opened in 2023 at Leyweg 986 in Den Haag. The restaurant seats 25 to 80 guests and features a dedicated <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">private event hall for weddings, birthdays and corporate celebrations</Link>. Open Tuesday to Sunday from 16:30 to 22:30. Closed Mondays.</p>
                <p>The menu offers 143+ dishes - <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:underline font-semibold">vegetarian and vegan options</Link>, biryani, tandoori, North Indian curries and <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">Indo-Chinese fusion food</Link>. All dishes can be <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:underline font-semibold">delivered or collected</Link> for those who want to enjoy at home.</p>
                <p>Chopras history is short but purposeful. A restaurant created not for profit but to bring authentic North Indian food to the Netherlands. A place where you can taste the real thing.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-8 leading-[1.4]">
            {isNl ? 'Ontdek Authentieke Indiase Keuken' : 'Discover Authentic Indian Food'}
          </h2>
          <p className="text-[#1A1A1A] text-lg mb-8 leading-relaxed">
            {isNl
              ? 'Bezoek Chopras en ervaar Noord-Indiaase gerechten zoals ze in India gegeten worden.'
              : 'Visit Chopras and experience North Indian food as it is eaten in India.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Menu Bekijken' : 'View Menu'}
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Tafel Reserveren' : 'Reserve a Table'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
