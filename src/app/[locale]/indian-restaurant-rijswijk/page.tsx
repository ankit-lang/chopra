import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

const faqsEn = [
  {
    question: 'How far is Chopras Indian Restaurant from Rijswijk?',
    answer: 'Chopras Indian Restaurant is at Leyweg 986, Den Haag, less than 5 minutes by car from central Rijswijk. Most residential areas in Rijswijk sit closer to Leyweg than to Den Haag city centre. Tram and bus connections are also available from Rijswijk, typically under 10 minutes.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat dish and every supplier is halal certified. The entire kitchen operates to halal standard - not just selected menu items. There is no cross-contamination risk because there is no non-halal meat anywhere on the premises.',
  },
  {
    question: 'Does Chopras grind its own spices fresh every day?',
    answer: 'Yes. Whole spices at Chopras are sourced directly from India and ground fresh every morning before service at Leyweg 986. The aromatic oils in cumin, cardamom, and coriander begin evaporating within hours of grinding - which is why pre-mixed blends from suppliers cannot replicate what happens when spices are this fresh.',
  },
  {
    question: 'How do I get to Chopras Indian Restaurant by car?',
    answer: 'Chopras Indian Restaurant is at Leyweg 986, Den Haag. Paid parking is available in the surrounding Leyweg area. By public transport, tram line 2 stops at Leyweg, a short walk from the entrance.',
  },
  {
    question: 'What are the opening hours at Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Mondays.',
  },
]

const faqsNl = [
  {
    question: 'Hoe ver is Chopras Indian Restaurant van Rijswijk?',
    answer: 'Chopras Indian Restaurant is op Leyweg 986, Den Haag, minder dan 5 minuten rijden van centraal Rijswijk. De meeste woonwijken in Rijswijk liggen dichter bij Leyweg dan bij het centrum van Den Haag. Tram- en busverbindingen zijn ook beschikbaar vanuit Rijswijk, doorgaans minder dan 10 minuten.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elk vleesgerecht en elke leverancier is halal gecertificeerd. De gehele keuken werkt volledig halal - niet alleen geselecteerde menuonderdelen. Er is geen risico op kruisbesmetting omdat er geen niet-halal vlees op het terrein aanwezig is.',
  },
  {
    question: 'Maakt Chopras zijn specerijen dagelijks vers?',
    answer: 'Ja. Hele specerijen bij Chopras worden direct uit India betrokken en elke ochtend vers gemalen voor aanvang van de service op Leyweg 986. De aromatische olien in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Kant-en-klare leveranciermengsels kunnen dit niet evenaren.',
  },
  {
    question: 'Hoe rijd ik naar Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is gevestigd op Leyweg 986, Den Haag. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Met het openbaar vervoer stopt tramlijn 2 bij halte Leyweg, op loopafstand van de ingang.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is op maandag gesloten.',
  },
]

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Near Rijswijk | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant bij Rijswijk | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant near Rijswijk. Chopras Indian Restaurant Den Haag is 5 minutes away. Authentic halal food and vegetarian options. Book now.',
    nl: 'Indiaas restaurant bij Rijswijk. Chopras Indian Restaurant Den Haag is 5 minuten rijden. Authentiek halal eten en vegetarische opties. Boek nu.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-rijswijk'),
      languages: {
        en: getLocalizedUrl('en', 'indian-restaurant-rijswijk'),
        nl: getLocalizedUrl('nl', 'indian-restaurant-rijswijk'),
        'x-default': getLocalizedUrl('en', 'indian-restaurant-rijswijk'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-restaurant-rijswijk'),
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

export default function IndianRestaurantRijswijkPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const restaurantSchema = getLocalRestaurantSchema(
    locale,
    ['Rijswijk', 'Den Haag', 'South Holland'],
    getLocalizedUrl(locale, 'indian-restaurant-rijswijk'),
  )

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Restaurant bij Rijswijk' : 'Indian Restaurant Near Rijswijk', item: getLocalizedUrl(locale, 'indian-restaurant-rijswijk') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • NEAR YOU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl
              ? 'Indiaas Restaurant bij Rijswijk - Chopras is Vijf Minuten Rijden'
              : 'Indian Restaurant Near Rijswijk - Chopras is Five Minutes Away'}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl max-w-3xl mx-auto mb-8"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Authentiek Noord-Indiaas eten, volledig halal gecertificeerd, open dinsdag tot en met zondag. Leyweg 986, Den Haag - vlak over de grens van Rijswijk. Beoordeeld met 4.9 sterren door 800+ gasten.'
              : 'Authentic North Indian food, fully halal certified, open Tuesday to Sunday. Leyweg 986, Den Haag - just across the Rijswijk border. Rated 4.9 stars by 800+ guests.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* From Rijswijk to Leyweg */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Van Rijswijk naar Leyweg' : 'From Rijswijk to Leyweg'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>Rijswijk en Den Haag delen een grens zonder zichtbare scheiding. De gemeentegrens loopt door woonwijken, winkelgebieden en parken - wat betekent dat de meeste Rijswijkse bewoners dichter bij Leyweg wonen dan bij het centrum van Den Haag. <strong>Chopras Indian Restaurant</strong> op Leyweg 986 is minder dan 5 minuten rijden van centraal Rijswijk.</p>
                <p>Per openbaar vervoer verbinden tram- en busverbindingen centraal Rijswijk rechtstreeks met het Leyweg-gebied, zonder overstap. De reistijd is doorgaans minder dan 10 minuten. Betaald parkeren is beschikbaar in de omgeving van Leyweg voor gasten die met de auto komen.</p>
                <p>Rijswijk heeft de grootste concentratie Hindoestaanse inwoners van Nederland. Families die zijn opgegroeid met echte Noord-Indiaase keuken - niet de restaurantversie, maar de keuken van thuis. Ze weten wat <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani</Link> ruikt als de linzen een nacht hebben gesudderd, wat verse komijn doet wanneer hij een hete pan raakt, en wat een <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link> hoort te zijn. Chopras is gebouwd voor precies dit publiek.</p>
              </>
            ) : (
              <>
                <p>Rijswijk and Den Haag share a border without a visible boundary. The municipal line runs through residential streets, shopping areas, and parks - which means most Rijswijk residents live closer to Leyweg than to Den Haag city centre. <strong>Chopras Indian Restaurant</strong> at Leyweg 986 is less than 5 minutes by car from central Rijswijk.</p>
                <p>By public transport, tram and bus connections link central Rijswijk to the Leyweg area directly with no changes required. The journey takes under 10 minutes from most parts of Rijswijk. Paid parking is available in the Leyweg area for guests arriving by car.</p>
                <p>Rijswijk has the largest concentration of Hindustani residents in the Netherlands. Families who grew up with real North Indian cooking - not the restaurant version, but the home kitchen. They know what <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani</Link> smells like when the lentils have cooked overnight, what fresh cumin does when it hits a hot pan, and what a <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link> is supposed to be. Chopras was built for exactly this audience.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* What Rijswijk Knows About Indian Food */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat Rijswijk Weet Over Indiaas Eten' : 'What Rijswijk Knows About Indian Food'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>De Hindoestaanse gemeenschap in Rijswijk heeft generaties lang met Noord-Indiaas koken geleefd. Dat schept een andere maatstaf. Wanneer een familie uit Rijswijk aanschuift bij Chopras en <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken</Link> bestelt, ontdekt men geen nieuwe keuken - men trekt een vergelijking. De vraag is altijd dezelfde: smaakt dit zoals het gemaakt hoort te worden?</p>
                <p>Het antwoord zit in de specerijen. Bij Chopras worden hele specerijen rechtstreeks uit India betrokken en elke ochtend vers gemalen voordat de keuken opengaat. De aromatische olien in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Kant-en-klare mengsels van leveranciers kunnen niet repliceren wat er gebeurt als specerijen zo vers zijn. Geen marketingclaim - het is de chemie van wat eten levend laat smaken in plaats van plat.</p>
                <p>De tandoor op Leyweg 986 bereikt 400 graden Celsius. Die temperatuur is niet regelbaar - het is wat <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">naan</Link> zijn kooltjes aan de randen geeft en chicken tikka zijn rokerige korst. Geen gewone oven kan dit repliceren. Wanneer families uit Rijswijk <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori</Link> bestellen bij Chopras, ontvangen zij de versie bereid op de temperatuur waarvoor het gerecht ontworpen is.</p>
                <p>Chopras is ook een van de weinige restaurants in Den Haag dat authentiek <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo-Chinees eten</Link> serveert naast een volledig Noord-Indiaas menu. Chilli chicken, chilli paneer, Hakka noodles - een keukencategorie die moeilijk te vinden is in Den Haag.</p>
              </>
            ) : (
              <>
                <p>The Hindustani community in Rijswijk has lived with North Indian cooking for generations. That history creates a different standard. When a family from Rijswijk sits down at Chopras and orders <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken</Link>, they are not discovering a new cuisine - they are making a comparison. The question is always the same: does this taste like it was made properly?</p>
                <p>The answer is in the spices. At Chopras, whole spices are sourced directly from India and ground fresh every morning before the kitchen opens. The aromatic oils in cumin, cardamom, and coriander start evaporating within hours of grinding. Pre-mixed blends from suppliers cannot replicate what happens when spices are this fresh. Not a marketing claim - it is the chemistry of what makes food taste alive rather than flat.</p>
                <p>The tandoor at Leyweg 986 reaches 400 degrees Celsius. That temperature is not adjustable - it is what gives <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">naan</Link> its char on the edges and chicken tikka its smoky crust. No conventional oven can replicate this. When Rijswijk families order <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori</Link> at Chopras, they get the version cooked at the temperature it was designed for.</p>
                <p>Chopras also serves authentic <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo Chinese food</Link> in Den Haag alongside a full North Indian menu. Chilli chicken, chilli paneer, Hakka noodles - a cuisine category that is hard to find elsewhere in The Hague.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Proof section - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? '4.9 Sterren. 800+ Reviews. Het Rijswijk Oordeel.' : '4.9 Stars. 800+ Reviews. The Rijswijk Verdict.'}
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {isNl
              ? 'Geen enkel ander Indiaas restaurant in Den Haag heeft een vergelijkbare combinatie van score en reviewvolume. Een hoge score met weinig reviews zegt weinig. Chopras heeft beide.'
              : 'Few Indian restaurants in Den Haag show this combination of rating and review volume. A high rating with a low review count means nothing. Chopras has both.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {(isNl ? [
              { stat: '4.9 Sterren', desc: 'Google-beoordeling van 800+ geverifieerde reviews - meer reviews op een hogere score dan enig ander Indiaas restaurant in Den Haag.' },
              { stat: 'Volledig Halal', desc: 'Elk vleesgerecht, elke leverancier, elke bestelling. De gehele keuken is halal gecertificeerd - geen uitzonderingen en geen risico op kruisbesmetting.' },
              { stat: '143 Gerechten', desc: 'Dertien categorieen van biryani tot Indo-Chinees - het grootste authentieke Indiaase menu in Den Haag.' },
            ] : [
              { stat: '4.9 Stars', desc: 'Google rating from 800+ verified reviews - more reviews at a higher rating than any other Indian restaurant in Den Haag.' },
              { stat: 'Fully Halal', desc: 'Every meat dish, every supplier, every order. The entire kitchen is halal certified - no exceptions and no cross-contamination risk.' },
              { stat: '143 Dishes', desc: 'Thirteen categories from biryani to Indo Chinese - the largest authentic Indian menu in The Hague.' },
            ]).map((item) => (
              <div key={item.stat} className="bg-white/10 rounded-xl p-6 border border-[#C7A348]/30">
                <p className="font-vibes text-3xl md:text-4xl text-white mb-3 leading-[1.3]">{item.stat}</p>
                <p className="font-body text-white/85 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/halal-food-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Halal Menu' : 'Halal Menu'}
            </Link>
          </div>
        </div>
      </section>

      {/* GEO block */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Is er een goed Indiaas restaurant bij Rijswijk?' : 'Is there a good Indian restaurant near Rijswijk?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <p>Ja. Chopras Indian Restaurant op Leyweg 986, Den Haag, is minder dan 5 minuten rijden van centraal Rijswijk. Met 4.9 sterren van 800+ Google-reviews serveert Chopras 143 gerechten uit een volledig halal gecertificeerde keuken, waar specerijen dagelijks vers worden gemalen van hele ingredienten rechtstreeks uit India. Open dinsdag tot en met zondag van 16:30 tot 22:30. <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserveer een tafel bij Chopras</Link> of <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bekijk het volledige menu</Link> online.</p>
            ) : (
              <p>Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag is less than 5 minutes from central Rijswijk by car. Rated 4.9 stars from 800+ Google reviews, Chopras serves 143 dishes from a fully halal certified kitchen where spices are ground fresh every morning from whole ingredients sourced directly in India. Open Tuesday to Sunday from 16:30 to 22:30. <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserve a table at Chopras</Link> or <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">view the full menu</Link> online.</p>
            )}
          </div>
        </div>
      </section>

      {/* Practical info */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Praktische Informatie voor Bezoekers uit Rijswijk' : 'Practical Information for Rijswijk Visitors'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {(isNl ? [
              { title: 'Afstand', desc: 'Minder dan 5 minuten met de auto van centraal Rijswijk. Leyweg 986 ligt vlak over de gemeentegrens.' },
              { title: 'Openbaar Vervoer', desc: 'Directe tram- en busverbindingen vanuit Rijswijk naar Leyweg - doorgaans minder dan 10 minuten reistijd.' },
              { title: 'Per Tram', desc: 'Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang. Betaald parkeren is beschikbaar in de omgeving.' },
              { title: 'Openingstijden', desc: 'Dinsdag tot en met zondag: 16:30 tot 22:30. Maandag gesloten.' },
            ] : [
              { title: 'Distance', desc: 'Under 5 minutes by car from central Rijswijk. Leyweg 986 is just across the municipal boundary.' },
              { title: 'Public Transport', desc: 'Direct tram and bus connections from Rijswijk to Leyweg - typically under 10 minutes.' },
              { title: 'By Tram', desc: 'Tram line 2 stops at Leyweg, a short walk from the entrance. Paid parking also available nearby.' },
              { title: 'Opening Hours', desc: 'Tuesday to Sunday: 16:30 to 22:30. Closed Monday.' },
            ]).map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border-l-4 border-[#D4AF37]">
                <h3 className="font-vibes text-lg text-[#C7A348] mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* Nearby areas */}
      <section className="bg-[#FFFAF5] py-12 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Ook Nabij Den Haag' : 'Also Serving These Areas Near Den Haag'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/indian-restaurant-delft`}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[#D4AF37] transition-colors"
            >
              <p className="font-vibes text-[#C7A348] font-bold">{isNl ? 'Indiaas Restaurant bij Delft' : 'Indian Restaurant Near Delft'}</p>
              <p className="text-gray-600 text-sm mt-1">{isNl ? 'Chopras bedient ook Delft' : 'Chopras also serves Delft'}</p>
            </Link>
            <Link
              href={`${base}/indian-restaurant-zoetermeer`}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[#D4AF37] transition-colors"
            >
              <p className="font-vibes text-[#C7A348] font-bold">{isNl ? 'Indiaas Restaurant bij Zoetermeer' : 'Indian Restaurant Near Zoetermeer'}</p>
              <p className="text-gray-600 text-sm mt-1">{isNl ? 'Chopras bedient ook Zoetermeer' : 'Chopras also serves Zoetermeer'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links - dishes */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Ontdek Populaire Gerechten' : 'Explore Popular Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Favoriete eerste keus voor Rijswijk-bezoekers' : 'Favourite first choice for Rijswijk visitors'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Langzaam gestoofde linzen - de thuissmaak, alleen beter' : 'Slow-cooked lentils - the home taste, only better'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Saffraanrijst en verse kruiden - de Rijswijkse klassieker' : 'Saffron rice and fresh spices - the Rijswijk classic'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas buffet voor bruiloften en evenementen' : 'Indian catering for weddings and events'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="font-body text-[#1A1A1A]/70 text-base">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - het beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - the best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A]/70 text-base">
              {isNl ? (
                <>
                  Bekijk het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige menu</Link> of <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">maak een reservering voor Rijswijk</Link> bij Chopras Indian Restaurant Den Haag.
                </>
              ) : (
                <>
                  View the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full menu</Link> or <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">book a table from Rijswijk</Link> at Chopras Indian Restaurant Den Haag.
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
