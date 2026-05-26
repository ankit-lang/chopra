import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDietFoodEstablishmentSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'Is there a fully halal Indian restaurant in the Netherlands?',
    answer: 'Yes. Chopras Indian Restaurant at Leyweg 986, 2545 GW Den Haag is a fully halal-certified Indian restaurant in the Netherlands. All meat is sourced from certified halal suppliers. The entire kitchen operates to halal standards. There is no non-halal meat on the premises. Chopras is open Tuesday to Sunday from 16:30 to 22:30.',
  },
  {
    question: 'How far is Chopras Indian Restaurant from Rotterdam and Amsterdam?',
    answer: 'Chopras Indian Restaurant is located in Den Haag, approximately 25 minutes from Rotterdam by car or direct train, and roughly 60 minutes from Amsterdam by train. Guests travel from across the Netherlands specifically for the halal-certified North Indian menu. Parking is available on site at Leyweg 986.',
  },
  {
    question: 'Does Chopras provide halal Indian catering across the Netherlands?',
    answer: 'Yes. Chopras provides fully halal-certified Indian catering for weddings, Nikah receptions, Walima dinners, Eid celebrations, corporate events, and private parties. Catering is available for events in Den Haag and the surrounding South Holland region. All catering follows the same halal standards as the restaurant kitchen.',
  },
  {
    question: 'What halal Indian dishes does Chopras serve?',
    answer: 'Chopras serves 143 halal-certified Indian dishes across 13 categories: starters, soups, tandoori, chicken curries, lamb and mutton curries, vegetarian curries, biryani, naan and breads, Indo-Chinese, chaat street food, rice and sides, vegan dishes, and drinks. Every meat dish uses certified halal-sourced ingredients.',
  },
  {
    question: 'What are the opening hours of Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Monday. Last orders are taken at 22:00. Reservations are recommended, especially on Friday and Saturday evenings. You can reserve a table via the contact page or call +31 6 30645930.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Is er een volledig halal Indiaas restaurant in Nederland?',
    answer: 'Ja. Chopras Indian Restaurant op Leyweg 986, 2545 GW Den Haag is een volledig halal-gecertificeerd Indiaas restaurant in Nederland. Al het vlees is afkomstig van gecertificeerde halal-leveranciers. De gehele keuken werkt volgens halalstandaarden. Er is geen niet-halal vlees aanwezig op het pand. Chopras is open van dinsdag tot en met zondag van 16:30 tot 22:30.',
  },
  {
    question: 'Hoe ver is Chopras Indian Restaurant van Rotterdam en Amsterdam?',
    answer: 'Chopras Indian Restaurant is gevestigd in Den Haag, ongeveer 25 minuten van Rotterdam met de auto of directe trein, en ongeveer 60 minuten van Amsterdam met de trein. Gasten reizen vanuit heel Nederland specifiek voor het halal-gecertificeerde Noord-Indiaas menu. Parkeren is beschikbaar op het terrein bij Leyweg 986.',
  },
  {
    question: 'Verzorgt Chopras halal Indiaas catering door heel Nederland?',
    answer: 'Ja. Chopras verzorgt volledig halal-gecertificeerde Indiaas catering voor bruiloften, Nikah-recepties, Walima-diners, Eid-vieringen, zakelijke evenementen en privéfeesten. Catering is beschikbaar voor evenementen in Den Haag en de omliggende regio Zuid-Holland. Alle catering volgt dezelfde halalstandaarden als de restaurantkeuken.',
  },
  {
    question: 'Welke halal Indiaas gerechten serveert Chopras?',
    answer: 'Chopras serveert 143 halal-gecertificeerde Indiaas gerechten in 13 categorieën: voorgerechten, soepen, tandoori, kip curry, lam en schapen curry, vegetarische curry, biryani, naan en brood, Indo-Chinees, chaat streetfood, rijst en bijgerechten, veganistische gerechten en dranken. Elk vleesgericht gebruikt gecertificeerde halal-ingredienten.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open van dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is gesloten op maandag. Laatste bestellingen worden aangenomen om 22:00. Reserveringen worden aanbevolen, met name op vrijdag- en zaterdagavond. U kunt een tafel reserveren via de contactpagina of bellen op +31 6 30645930.',
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Halal Indian Restaurant Netherlands | Chopras Den Haag',
    nl: 'Halal Indiaas Restaurant Nederland | Chopras Den Haag',
  }
  const descriptions = {
    en: 'Halal Indian restaurant Netherlands. Chopras Indian Restaurant Den Haag is fully halal certified. 143 dishes, 4.9 stars. Open Tuesday to Sunday. Visit us.',
    nl: 'Halal Indiaas restaurant Nederland bij Chopras Indian Restaurant Den Haag. Volledig halal gecertificeerd, 143 gerechten, 4,9 sterren. Bezoek ons vandaag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'halal-indian-restaurant-netherlands'),
      languages: {
        en: getLocalizedUrl('en', 'halal-indian-restaurant-netherlands'),
        nl: getLocalizedUrl('nl', 'halal-indian-restaurant-netherlands'),
        'x-default': getLocalizedUrl('en', 'halal-indian-restaurant-netherlands'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'halal-indian-restaurant-netherlands'),
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

export default function HalalIndianRestaurantNetherlandsPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag', 'Netherlands', 'South Holland'], getLocalizedUrl(locale, 'halal-indian-restaurant-netherlands'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Halal Indiaas Restaurant Nederland' : 'Halal Indian Restaurant Netherlands', item: getLocalizedUrl(locale, 'halal-indian-restaurant-netherlands') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Halal', 'Halal Indian', 'North Indian', 'Halal Certified'], 'halal-indian-restaurant-netherlands')} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              {isNl ? '• HALAL GECERTIFICEERD · CHOPRAS INDIAN RESTAURANT · DEN HAAG •' : '• HALAL CERTIFIED · CHOPRAS INDIAN RESTAURANT · DEN HAAG •'}
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl
              ? 'Halal Indiaas Restaurant in Nederland'
              : 'Halal Indian Restaurant in the Netherlands'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'Volledig halal-gecertificeerd. 143 Indiaas gerechten. 4,9 sterren op Google van 800+ beoordelingen. Leyweg 986, Den Haag.'
              : 'Fully halal certified. 143 Indian dishes. 4.9 stars on Google from 800+ reviews. Leyweg 986, Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:bg-[rgba(199,163,72,0.3)] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:bg-[rgba(199,163,72,0.3)] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: GEO block */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Is Er een Halal Indiaas Restaurant in Nederland?'
              : 'Is There a Halal Indian Restaurant in the Netherlands?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>
                  Chopras Indian Restaurant, gevestigd op Leyweg 986, 2545 GW Den Haag, is een volledig halal-gecertificeerd Indiaas restaurant in Nederland met 4,9 sterren op Google van 800+ geverifieerde beoordelingen. Het restaurant serveert 143 gerechten in 13 categorieën, waaronder <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">authentieke biryani</Link>, <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori</Link> en Noord-Indiaas streetfood. Alle vlees is afkomstig van gecertificeerde halal-leveranciers. Open dinsdag tot en met zondag van 16:30 tot 22:30.
                </p>
                <p>
                  Den Haag is per trein bereikbaar vanuit Rotterdam in 25 minuten en vanuit Amsterdam in 60 minuten. Gasten reizen vanuit heel Nederland voor het halal-gecertificeerde Noord-Indiaas menu van Chopras. Betaald parkeren is beschikbaar in de omgeving van Leyweg.
                </p>
              </>
            ) : (
              <>
                <p>
                  Chopras Indian Restaurant, located at Leyweg 986, 2545 GW Den Haag, is a fully halal-certified Indian restaurant in the Netherlands with 4.9 stars on Google from 800+ verified reviews. The restaurant serves 143 dishes across 13 categories, including <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">authentic biryani</Link>, <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori</Link>, and North Indian street food. All meat is sourced from certified halal suppliers. Open Tuesday to Sunday from 16:30 to 22:30.
                </p>
                <p>
                  Den Haag is reachable by train from Rotterdam in 25 minutes and from Amsterdam in 60 minutes. Guests travel from across the Netherlands for the halal-certified North Indian menu at Chopras. Paid parking is available in the Leyweg area.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: What halal certification means */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Wat Halal Gecertificeerd Betekent bij Chopras'
              : 'What Halal Certified Means at Chopras'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>
                  Het woord halal wordt breed gebruikt in Nederland. Soms betekent het dat een gerecht vlees van een halal-slager bevat. Soms betekent het dat de kok moslim is. Bij Chopras betekent het iets specifieks en verifieerbaar. Elke leverancier levert gecertificeerde halaldocumentatie. Al het vlees wordt behandeld afgescheiden van aankomst tot bereiding. Er is geen niet-halal vlees aanwezig op het pand.
                </p>
                <p>
                  De keuken verwerkt geen vleesproducten die niet voldoen aan halalstandaarden. Dit is geen selectieve of situationele certificering. Het geldt voor elk gerecht, elke dienst, elke dag van de week. Het <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige halal menu</Link> bevat kip, lam, schapen en zeevruchten, samen met een uitgebreide reeks <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarische en veganistische gerechten</Link>.
                </p>
                <p>
                  Als u specifieke leveranciersdocumentatie wilt bekijken, kunt u dat opvragen. Chopras stelt alle certificaten beschikbaar op verzoek. U hoeft niet te gokken of te vragen of een gerecht halal is. Het antwoord is altijd hetzelfde: de gehele keuken is halal gecertificeerd.
                </p>
              </>
            ) : (
              <>
                <p>
                  The word halal gets used loosely across the Netherlands. Sometimes it means a dish contains meat from a halal butcher. Sometimes it means the cook is Muslim. At Chopras, it means something specific and verifiable. Every supplier provides certified halal documentation. All meat is handled separately from arrival through preparation. There is no non-halal meat on the premises at any point.
                </p>
                <p>
                  The kitchen does not process any meat product that does not meet halal standards. This is not selective or situational certification. It applies to every dish, every service, every day of the week. The <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full halal menu</Link> includes chicken, lamb, mutton, and seafood, alongside a broad range of <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarian and vegan dishes</Link>.
                </p>
                <p>
                  If you want to view specific supplier documentation, you can request it. Chopras makes all certificates available on request. You do not need to guess or ask whether a dish is halal. The answer is always the same: the entire kitchen is halal certified.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: The menu */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? '143 Halal Indiaas Gerechten in 13 Categorieën'
              : '143 Halal Indian Dishes Across 13 Categories'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5 mb-10">
            {isNl ? (
              <>
                <p>
                  Het menu van Chopras is gebouwd rond de breedte van Noord-Indiaas eten, niet slechts een handvol bekende curries. Van klassieke <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken Den Haag</Link> tot <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">mutton rogan josh</Link> langzaam gekookt in Kasjmirische kruiden, tot <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">chaat streetfood</Link> dat dagelijks vers wordt bereid. Alle 143 gerechten zijn halal gecertificeerd.
                </p>
                <p>
                  De kruiden worden elke ochtend vers gemalen van hele ingredienten die rechtstreeks uit India worden betrokken. De tandoor kleioven bereikt 400 graden Celsius. De biryani wordt bereid via de authentieke dum-methode: in een afgesloten pot gestoomd met echte saffraandraadjes. Dit is het niveau waarop het menu van Chopras halal Indiaas eten aanbiedt in Nederland.
                </p>
              </>
            ) : (
              <>
                <p>
                  The Chopras menu is built around the breadth of North Indian food, not just a handful of familiar curries. From classic <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken Den Haag</Link> to <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">mutton rogan josh</Link> slow-cooked in Kashmiri spices, to <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">chaat street food</Link> made fresh daily. All 143 dishes are halal certified.
                </p>
                <p>
                  Spices are ground fresh every morning from whole ingredients sourced directly from India. The tandoor clay oven reaches 400 degrees Celsius. The biryani is prepared via the authentic dum method: steam-sealed in a pot with real saffron threads. This is the level at which Chopras offers halal Indian food in the Netherlands.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {(isNl ? [
              { label: 'Biryani', desc: 'Kip, lam en groente via de dum-methode', href: `${base}/biryani-den-haag` },
              { label: 'Tandoori', desc: 'Gemarineerd in een 400-graden kleioven', href: `${base}/tandoori-den-haag` },
              { label: 'Butter Chicken', desc: 'Langzaam ingedikte tomaten-roomsaus', href: `${base}/butter-chicken-den-haag` },
              { label: 'Dal Makhani', desc: 'Zwarte linzen een nacht lang gegaard', href: `${base}/dal-makhani-den-haag` },
              { label: 'Chaat Streetfood', desc: 'Papdi chaat, pani puri, aloo tikki', href: `${base}/chaat-den-haag` },
              { label: 'Naan', desc: 'Vers gebakken in de tandoor kleioven', href: `${base}/naan-den-haag` },
            ] : [
              { label: 'Biryani', desc: 'Chicken, lamb and vegetable via dum method', href: `${base}/biryani-den-haag` },
              { label: 'Tandoori', desc: 'Marinated and cooked in a 400-degree clay oven', href: `${base}/tandoori-den-haag` },
              { label: 'Butter Chicken', desc: 'Slow-reduced tomato cream sauce', href: `${base}/butter-chicken-den-haag` },
              { label: 'Dal Makhani', desc: 'Black lentils slow-cooked overnight', href: `${base}/dal-makhani-den-haag` },
              { label: 'Chaat Street Food', desc: 'Papdi chaat, pani puri, aloo tikki', href: `${base}/chaat-den-haag` },
              { label: 'Naan', desc: 'Baked fresh in the tandoor clay oven', href: `${base}/naan-den-haag` },
            ]).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#D4AF37] hover:shadow-md transition-all"
              >
                <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-[#1B2B5E] font-semibold text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-[#C7A348] hover:text-white min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-[#C7A348] hover:text-white min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Visiting from elsewhere in NL */}
      <section className="bg-[#1B2B5E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Vanuit Heel Nederland Naar Den Haag'
              : 'Visiting from Anywhere in the Netherlands'}
          </h2>
          <div className="font-body text-white/80 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>
                  Den Haag is goed bereikbaar vanuit de rest van Nederland. Rotterdam Centraal is 25 minuten met de intercity. Amsterdam Centraal is 60 minuten met de Intercity Direct. Utrecht is 45 minuten. Eindhoven is 90 minuten. Als u specifiek op zoek bent naar een halal Indiaas restaurant in Nederland dat het niveau biedt van Noord-Indiase keuken zoals die in India wordt gegeten, is de reis naar Den Haag de moeite waard.
                </p>
                <p>
                  Chopras serveert ook gasten uit <Link href={`${base}/indian-restaurant-rijswijk`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Rijswijk</Link>, <Link href={`${base}/indian-restaurant-delft`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Delft</Link>, <Link href={`${base}/indian-restaurant-zoetermeer`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Zoetermeer</Link>, Voorburg en Leidschendam. Als u een grotere groep bent of catering zoekt voor een evenement, neem dan contact op voor een offerte.
                </p>
              </>
            ) : (
              <>
                <p>
                  Den Haag is well connected from the rest of the Netherlands. Rotterdam Centraal is 25 minutes by intercity train. Amsterdam Centraal is 60 minutes by Intercity Direct. Utrecht is 45 minutes. Eindhoven is 90 minutes. If you are specifically looking for a halal Indian restaurant in the Netherlands that offers the depth of North Indian cuisine as it is eaten in India, the journey to Den Haag is worth making.
                </p>
                <p>
                  Chopras also serves guests from <Link href={`${base}/indian-restaurant-rijswijk`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Rijswijk</Link>, <Link href={`${base}/indian-restaurant-delft`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Delft</Link>, <Link href={`${base}/indian-restaurant-zoetermeer`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Zoetermeer</Link>, Voorburg, and Leidschendam. If you are a larger group or looking for catering for an event, get in touch for a quote.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 5: Halal catering */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Halal Indiaas Catering in Nederland'
              : 'Halal Indian Catering Across the Netherlands'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>
                  Chopras verzorgt halal Indiaas catering voor bruiloften, Nikah-recepties, Walima-diners, Eid-vieringen en zakelijke evenementen. De catering volgt dezelfde halalstandaarden als de restaurantkeuken. U ontvangt hetzelfde gecertificeerde vlees, dezelfde versgemalen kruiden en dezelfde kwaliteit als wanneer u in het restaurant eet.
                </p>
                <p>
                  Voor <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal bruiloftscatering</Link>, <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">zakelijke evenementen</Link> of grotere groepen kunt u een vrijblijvende offerte aanvragen. Chopras beschikt ook over een eigen <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">feestzaal in Den Haag</Link> voor tot 80 gasten.
                </p>
              </>
            ) : (
              <>
                <p>
                  Chopras provides halal Indian catering for weddings, Nikah receptions, Walima dinners, Eid celebrations, and corporate events. The catering follows the same halal standards as the restaurant kitchen. You receive the same certified meat, the same freshly ground spices, and the same quality as dining in the restaurant.
                </p>
                <p>
                  For <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c48a] font-semibold">halal wedding catering</Link>, <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">corporate events</Link>, or larger groups, request a no-obligation quote. Chopras also has its own <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">event hall in Den Haag</Link> for up to 80 guests.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Veelgestelde Vragen - Halal Indiaas Restaurant Nederland'
              : 'Frequently Asked Questions - Halal Indian Restaurant Netherlands'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1B2B5E] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-4 leading-[1.4]">
            {isNl
              ? 'Reserveer een Tafel bij het Halal Indiaas Restaurant in Nederland'
              : 'Reserve a Table at the Halal Indian Restaurant in the Netherlands'}
          </h2>
          <p className="text-white/75 text-lg mb-8">
            {isNl
              ? 'Leyweg 986, 2545 GW Den Haag. Open dinsdag tot en met zondag, 16:30 tot 22:30. Maandag gesloten.'
              : 'Leyweg 986, 2545 GW Den Haag. Open Tuesday to Sunday, 16:30 to 22:30. Closed Monday.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#C7A348] bg-[#C7A348] px-8 py-3 text-[#1A1A1A] font-semibold uppercase tracking-wide transition-all duration-200 hover:bg-[#D4AF37] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/catering`}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#C7A348] bg-white/10 px-8 py-3 text-white font-medium uppercase tracking-wide transition-all duration-200 hover:bg-[rgba(199,163,72,0.3)] min-h-[48px]"
            >
              {isNl ? 'Catering Offerte' : 'Request Catering Quote'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
