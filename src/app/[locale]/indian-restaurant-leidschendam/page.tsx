import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

const faqsEn = [
  {
    question: 'How far is Chopras Indian Restaurant from Leidschendam?',
    answer: 'Chopras Indian Restaurant is at Leyweg 986, Den Haag, approximately 10 minutes by car from Leidschendam via the A4 motorway. Leyweg sits just across the Voorburg boundary, making Chopras one of the closest high-rated Indian restaurants for Leidschendam and Leidschendam-Voorburg residents.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat dish and every supplier is halal certified. The entire kitchen operates to halal standard - not just selected menu items. There is no cross-contamination risk because there is no non-halal meat anywhere on the premises.',
  },
  {
    question: 'Can I order Indian food delivery to Leidschendam from Chopras?',
    answer: 'Yes. Chopras Indian Restaurant delivers via Thuisbezorgd and Uber Eats, both of which cover the Leidschendam and Voorburg area. You can order from the full menu of 143 dishes, including curries, biryani, and tandoori, delivered straight to your address.',
  },
  {
    question: 'Does Chopras have vegetarian and vegan options?',
    answer: 'Yes. Chopras Indian Restaurant has a full vegetarian and vegan menu. Dal makhani, soya chaap, paneer dishes, chaat, and pani puri are among the most popular plant-based choices. The entire kitchen is halal certified, and vegetarian dishes are prepared separately.',
  },
  {
    question: 'What are the opening hours at Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Mondays. Reservations are recommended for groups and weekend visits.',
  },
]

const faqsNl = [
  {
    question: 'Hoe ver is Chopras Indian Restaurant van Leidschendam?',
    answer: 'Chopras Indian Restaurant is op Leyweg 986, Den Haag, ongeveer 10 minuten rijden van Leidschendam via de A4. Leyweg ligt net over de grens van Voorburg, waardoor Chopras een van de dichtstbijzijnde hoog gewaardeerde Indiaase restaurants is voor inwoners van Leidschendam en Leidschendam-Voorburg.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elk vleesgerecht en elke leverancier is halal gecertificeerd. De gehele keuken werkt volledig halal - niet alleen geselecteerde menuonderdelen. Er is geen risico op kruisbesmetting omdat er geen niet-halal vlees op het terrein aanwezig is.',
  },
  {
    question: 'Kan ik Indiaas eten laten bezorgen in Leidschendam vanuit Chopras?',
    answer: 'Ja. Chopras Indian Restaurant bezorgt via Thuisbezorgd en Uber Eats, die beide het Leidschendam- en Voorburg-gebied bedienen. U kunt bestellen uit het volledige menu van 143 gerechten, waaronder curries, biryani en tandoori, rechtstreeks thuisbezorgd.',
  },
  {
    question: 'Heeft Chopras vegetarische en veganistische opties?',
    answer: 'Ja. Chopras Indian Restaurant heeft een uitgebreid vegetarisch en veganistisch menu. Dal makhani, soya chaap, paneergerechten, chaat en pani puri zijn de populairste plantaardige keuzes. De gehele keuken is halal gecertificeerd en vegetarische gerechten worden apart bereid.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is op maandag gesloten. Reserveren wordt aanbevolen voor groepen en weekendbezoeken.',
  },
]

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Near Leidschendam | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant bij Leidschendam | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant near Leidschendam. Chopras Indian Restaurant Den Haag is 10 minutes away. Authentic halal food at Leyweg 986. Open Tuesday to Sunday.',
    nl: 'Indiaas restaurant bij Leidschendam. Chopras Indian Restaurant Den Haag is 10 minuten rijden. Authentiek halal eten op Leyweg 986. Open dinsdag tot en met zondag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-leidschendam'),
      languages: {
        en: getLocalizedUrl('en', 'indian-restaurant-leidschendam'),
        nl: getLocalizedUrl('nl', 'indian-restaurant-leidschendam'),
        'x-default': getLocalizedUrl('en', 'indian-restaurant-leidschendam'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-restaurant-leidschendam'),
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
              ? 'Indiaas Restaurant bij Leidschendam - Chopras is Tien Minuten Rijden'
              : 'Indian Restaurant Near Leidschendam - Chopras is Ten Minutes Away'}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl max-w-3xl mx-auto mb-8"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Authentiek Noord-Indiaas eten, volledig halal gecertificeerd, open dinsdag tot en met zondag. Leyweg 986, Den Haag - 10 minuten via de A4. Beoordeeld met 4.9 sterren door 800+ gasten.'
              : 'Authentic North Indian food, fully halal certified, open Tuesday to Sunday. Leyweg 986, Den Haag - 10 minutes via the A4. Rated 4.9 stars by 800+ guests.'}
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

      {/* From Leidschendam to Leyweg */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Van Leidschendam naar Leyweg' : 'From Leidschendam to Leyweg'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>Leidschendam grenst aan Voorburg, en Voorburg grenst aan Den Haag. Leyweg 986 ligt net over die grens - wat betekent dat <strong>Chopras Indian Restaurant</strong> voor de meeste Leidschendam-inwoners dichter bij is dan het centrum van Den Haag zelf. Via de A4 is de reistijd met de auto gemiddeld 10 minuten.</p>
                <p>Betaald parkeren is beschikbaar in de omgeving van Leyweg. Openbaar vervoer verbindt Leidschendam ook rechtstreeks met het Leyweg-gebied via busverbindingen vanuit Voorburg-Noord. Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang.</p>
                <p>Het menu telt 143 gerechten verdeeld over dertien categorieen - van <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">saffraan biryani</Link> en <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">langzaam gestoofde dal makhani</Link> tot authentieke straatgerechten die moeilijk te vinden zijn in Den Haag. Alles uit dezelfde keuken. Dezelfde specerijen, elke avond.</p>
              </>
            ) : (
              <>
                <p>Leidschendam borders Voorburg, and Voorburg borders Den Haag. Leyweg 986 sits just across that boundary - which means <strong>Chopras Indian Restaurant</strong> is closer for most Leidschendam residents than Den Haag city centre itself. Via the A4 motorway, the average drive is 10 minutes.</p>
                <p>Paid parking is available in the Leyweg area. Public transport also connects Leidschendam directly to the Leyweg area via bus routes from Voorburg-Noord. Tram line 2 stops at Leyweg, a short walk from the entrance.</p>
                <p>The menu spans 143 dishes across thirteen categories - from <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">saffron biryani</Link> and <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">slow-cooked dal makhani</Link> to authentic street food that is hard to find elsewhere in Den Haag. All from the same kitchen. Same spices, every evening.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why Leidschendam chooses authentic */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Waarom Leidschendam Kiest voor Authentiek' : 'Why Leidschendam Chooses Authentic'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>De Hindoestaanse gemeenschap in en rond Leidschendam-Voorburg is een van de grootste in Zuid-Holland. Families die generaties lang met Noord-Indiaas koken zijn opgegroeid, herkennen meteen het verschil tussen een keuken die de moeite neemt en een keuken die het nabootst. Bij Chopras worden hele specerijen rechtstreeks uit India betrokken en elke ochtend vers gemalen - nog voor de eerste gast arriveert.</p>
                <p>De aromatische olien in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Kant-en-klare mengsels van leveranciers laten nooit dezelfde diepte zien. Dat is de reden waarom <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken bij Chopras</Link> niet hetzelfde smaakt als elders - de saus is opgebouwd van specerijen die nog levend zijn.</p>
                <p>De tandoor op Leyweg 986 bereikt 400 graden Celsius. Die temperatuur is niet regelbaar - het is wat <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">naan</Link> zijn kooltjes aan de randen geeft en <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">chicken tikka</Link> zijn rokerige korst. Geen gewone oven kan dit repliceren.</p>
                <p>Chopras is bovendien een van de weinige restaurants in Den Haag dat authentiek <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo-Chinees eten</Link> serveert naast een volledig Noord-Indiaas menu. Chilli chicken, chilli paneer, Hakka noodles - een keukencategorie die moeilijk te vinden is in Den Haag.</p>
              </>
            ) : (
              <>
                <p>The Hindustani community in and around Leidschendam-Voorburg is one of the largest in South Holland. Families who have grown up with North Indian cooking for generations spot the difference immediately between a kitchen that takes care and one that cuts corners. At Chopras, whole spices are sourced directly from India and ground fresh every morning - before the first guest arrives.</p>
                <p>The aromatic oils in cumin, cardamom, and coriander start evaporating within hours of grinding. Pre-mixed blends from suppliers never achieve the same depth. That is why <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken at Chopras</Link> does not taste like anywhere else - the sauce is built from spices that are still alive.</p>
                <p>The tandoor at Leyweg 986 reaches 400 degrees Celsius. That temperature is not adjustable - it is what gives <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">naan</Link> its char on the edges and <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">chicken tikka</Link> its smoky crust. No conventional oven can replicate this.</p>
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
            {isNl ? '4.9 Sterren. 800+ Reviews. Het Leidschendam Oordeel.' : '4.9 Stars. 800+ Reviews. The Leidschendam Verdict.'}
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {isNl
              ? 'Geen enkel ander Indiaas restaurant in Den Haag heeft een vergelijkbare combinatie van score en reviewvolume. Een hoge score met weinig reviews zegt niets. Chopras heeft beide.'
              : 'Few Indian restaurants in Den Haag show this combination of rating and review volume. A high rating with a low review count means nothing. Chopras has both.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {(isNl ? [
              { stat: '4.9 Sterren', desc: 'Google-beoordeling van 800+ geverifieerde reviews. Ook 8.7 op TheFork en Excellent op Tripadvisor. Meer reviews op een hogere score dan enig ander Indiaas restaurant in Den Haag.' },
              { stat: 'Volledig Halal', desc: 'Elk vleesgerecht, elke leverancier, elke bestelling. De gehele keuken is halal gecertificeerd - geen uitzonderingen en geen risico op kruisbesmetting.' },
              { stat: '143 Gerechten', desc: 'Dertien categorieen van biryani tot Indo-Chinees - het grootste authentieke Indiaase menu in Den Haag, beschikbaar voor dineren en bezorging naar Leidschendam.' },
            ] : [
              { stat: '4.9 Stars', desc: 'Google rating from 800+ verified reviews. Also 8.7 on TheFork and Excellent on Tripadvisor. More reviews at a higher rating than any other Indian restaurant in Den Haag.' },
              { stat: 'Fully Halal', desc: 'Every meat dish, every supplier, every order. The entire kitchen is halal certified - no exceptions and no cross-contamination risk.' },
              { stat: '143 Dishes', desc: 'Thirteen categories from biryani to Indo Chinese - the largest authentic Indian menu in Den Haag, available for dine-in and delivery to Leidschendam.' },
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
            {isNl ? 'Is er een Indiaas restaurant bij Leidschendam?' : 'Is there an Indian restaurant near Leidschendam?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <p>Ja. Chopras Indian Restaurant op Leyweg 986, Den Haag, is ongeveer 10 minuten rijden van Leidschendam via de A4. Met 4.9 sterren van 800+ Google-reviews serveert Chopras 143 gerechten uit een volledig halal gecertificeerde keuken, open dinsdag tot en met zondag van 16:30 tot 22:30. Betaald parkeren is beschikbaar in de omgeving van Leyweg. <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserveer een tafel bij Chopras</Link> of <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bekijk het volledige menu</Link> online.</p>
            ) : (
              <p>Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag is approximately 10 minutes from Leidschendam by car via the A4 motorway. Rated 4.9 stars from 800+ Google reviews, Chopras serves 143 dishes from a fully halal certified kitchen, open Tuesday to Sunday from 16:30 to 22:30. Paid parking is available in the Leyweg area. <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserve a table at Chopras</Link> or <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">view the full menu</Link> online.</p>
            )}
          </div>
        </div>
      </section>

      {/* Practical info */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Praktische Informatie voor Bezoekers uit Leidschendam' : 'Practical Information for Leidschendam Visitors'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {(isNl ? [
              { title: 'Afstand', desc: 'Ongeveer 10 minuten met de auto van Leidschendam via de A4. Leyweg 986 ligt net over de grens van Voorburg in Den Haag.' },
              { title: 'Openbaar Vervoer', desc: 'Busverbindingen vanuit Voorburg-Noord rijden rechtstreeks naar het Leyweg-gebied. Geen overstap vereist.' },
              { title: 'Per Tram', desc: 'Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang. Betaald parkeren is beschikbaar in de omgeving.' },
              { title: 'Openingstijden', desc: 'Dinsdag tot en met zondag: 16:30 tot 22:30. Maandag gesloten.' },
            ] : [
              { title: 'Distance', desc: 'Approximately 10 minutes by car from Leidschendam via the A4 motorway. Leyweg 986 is just across the Voorburg boundary into Den Haag.' },
              { title: 'Public Transport', desc: 'Bus connections from Voorburg-Noord run directly to the Leyweg area. No transfers required.' },
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
              href={`${base}/indian-restaurant-rijswijk`}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[#D4AF37] transition-colors"
            >
              <p className="font-vibes text-[#C7A348] font-bold">{isNl ? 'Indiaas Restaurant bij Rijswijk' : 'Indian Restaurant Near Rijswijk'}</p>
              <p className="text-gray-600 text-sm mt-1">{isNl ? 'Chopras bedient ook Rijswijk' : 'Chopras also serves Rijswijk'}</p>
            </Link>
            <Link
              href={`${base}/indian-restaurant-delft`}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[#D4AF37] transition-colors"
            >
              <p className="font-vibes text-[#C7A348] font-bold">{isNl ? 'Indiaas Restaurant bij Delft' : 'Indian Restaurant Near Delft'}</p>
              <p className="text-gray-600 text-sm mt-1">{isNl ? 'Chopras bedient ook Delft' : 'Chopras also serves Delft'}</p>
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
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Rijke tomatensaus met verse specerijen - de meest bestelde bij Chopras' : 'Rich tomato sauce with fresh spices - the most ordered at Chopras'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Saffraanrijst en verse kruiden - kip, lam of groente' : 'Saffron rice and fresh spices - chicken, lamb or vegetable'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Zwarte linzen een nacht gestoofd in boter en room' : 'Black lentils slow-cooked overnight in butter and cream'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas buffet voor bruiloften, verjaardagen en evenementen' : 'Indian catering for weddings, birthdays and events'}</p>
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
                  Bekijk het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige menu</Link> of <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">maak een reservering vanuit Leidschendam</Link> bij Chopras Indian Restaurant Den Haag.
                </>
              ) : (
                <>
                  View the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full menu</Link> or <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">book a table from Leidschendam</Link> at Chopras Indian Restaurant Den Haag.
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
