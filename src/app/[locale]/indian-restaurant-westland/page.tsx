import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

const faqsEn = [
  {
    question: 'Is there an Indian restaurant near Westland?',
    answer: 'Chopras Indian Restaurant at Leyweg 986, Den Haag is 20 minutes from Westland via the N211. There is no comparable Indian restaurant within the Westland municipality itself. Chopras serves 143 halal-certified dishes, holds a 4.9-star rating from 800+ verified Google reviews, and grinds its spices fresh every morning. Open Tuesday to Sunday from 16:30 to 22:30.',
  },
  {
    question: 'How do I get from Westland to Chopras Indian Restaurant?',
    answer: 'From Naaldwijk or Monster, take the N211 eastbound toward Den Haag. The journey is approximately 20 minutes by car. From De Lier or Maasdijk, the route joins the N211 at Naaldwijk, with total drive time staying within 20 to 25 minutes. Paid parking is available in the Leyweg area.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat supplier is halal certified and every dish on the 143-dish menu is halal. There is no non-halal meat anywhere on the premises, which means no cross-contamination risk. Westland families who require confirmed halal food can order anything on the menu with full confidence.',
  },
  {
    question: 'Can Chopras cater for a group or event from Westland?',
    answer: 'Yes. Chopras Indian Restaurant has a private event hall at Leyweg 986 that seats 25 to 80 guests. The hall is suitable for birthday dinners, wedding receptions, nikah celebrations, corporate events, and family gatherings. Groups from Westland and the surrounding towns of Naaldwijk, Monster, and De Lier regularly book for special occasions. Contact the restaurant to discuss availability.',
  },
  {
    question: 'What are the opening hours at Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Mondays. Reservations are recommended for groups of four or more, particularly on Friday and Saturday evenings. Call +31 6 30645930 or book via the contact page on the website.',
  },
]

const faqsNl = [
  {
    question: 'Is er een Indiaas restaurant bij Westland?',
    answer: 'Chopras Indian Restaurant op Leyweg 986 in Den Haag is 20 minuten rijden van Westland via de N211. Er is geen vergelijkbaar Indiaas restaurant binnen de gemeente Westland zelf. Chopras serveert 143 halal-gecertificeerde gerechten, heeft een 4,9-sterrenbeoordeling van meer dan 800 geverifieerde Google-reviews en maalt elke ochtend kruiden vers. Open van dinsdag tot en met zondag van 16:30 tot 22:30.',
  },
  {
    question: 'Hoe kom ik van Westland naar Chopras Indian Restaurant?',
    answer: 'Vanuit Naaldwijk of Monster neemt u de N211 richting Den Haag. De rit duurt circa 20 minuten per auto. Vanuit De Lier of Maasdijk sluit de route aan op de N211 bij Naaldwijk, met een totale rijtijd van 20 tot 25 minuten. Betaald parkeren is beschikbaar in de omgeving van Leyweg.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elke vleesleverancier is halal gecertificeerd en elk gerecht op het menu van 143 gerechten is halal. Er is nergens op de locatie niet-halaals vlees aanwezig, wat betekent dat er geen risico op kruisbesmetting is. Westlandse families die bevestigd halal voedsel vereisen, kunnen alles op het menu met volledig vertrouwen bestellen.',
  },
  {
    question: 'Verzorgt Chopras catering voor een groep of evenement uit Westland?',
    answer: 'Ja. Chopras Indian Restaurant heeft een privé-evenementenruimte op Leyweg 986 voor 25 tot 80 gasten. De ruimte is geschikt voor verjaardagsdiners, bruiloften, nikah-vieringen, bedrijfsfeesten en familiebijeenkomsten. Groepen uit Westland en de omliggende plaatsen Naaldwijk, Monster en De Lier reserveren regelmatig voor bijzondere gelegenheden. Neem contact op met het restaurant voor beschikbaarheid.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open van dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is op maandag gesloten. Reserveringen worden aanbevolen voor groepen van vier of meer, met name op vrijdag- en zaterdagavond. Bel +31 6 30645930 of boek via de contactpagina op de website.',
  },
]

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Near Westland | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant bij Westland | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant near Westland. Chopras Indian Restaurant Den Haag is 20 minutes away. Authentic halal food at Leyweg 986. Open Tuesday to Sunday.',
    nl: 'Indiaas restaurant bij Westland. Chopras Indian Restaurant Den Haag is 20 minuten rijden. Authentiek halal eten op Leyweg 986. Open dinsdag tot en met zondag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-westland'),
      languages: {
        en: getLocalizedUrl('en', 'indian-restaurant-westland'),
        nl: getLocalizedUrl('nl', 'indian-restaurant-westland'),
        'x-default': getLocalizedUrl('en', 'indian-restaurant-westland'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-restaurant-westland'),
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

export default function IndianRestaurantWestlandPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const restaurantSchema = getLocalRestaurantSchema(
    locale,
    ['Westland', 'Naaldwijk', 'Monster', 'De Lier', 'Den Haag', 'South Holland'],
    getLocalizedUrl(locale, 'indian-restaurant-westland'),
  )

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Restaurant bij Westland' : 'Indian Restaurant Near Westland', item: getLocalizedUrl(locale, 'indian-restaurant-westland') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* HERO */}
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
              ? 'Indiaas Restaurant bij Westland - Chopras in Den Haag, 20 Minuten Rijden'
              : 'Indian Restaurant Near Westland - Chopras in Den Haag, 20 Minutes Away'}
          </h1>
          <p
            className="font-body text-white/75 text-lg md:text-xl max-w-3xl mx-auto mb-8"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Authentiek Noord-Indiaas eten, volledig halal gecertificeerd, open dinsdag tot en met zondag. Leyweg 986, Den Haag - 20 minuten via de N211 vanuit Westland.'
              : 'Authentic North Indian food, fully halal certified, open Tuesday to Sunday. Leyweg 986, Den Haag - 20 minutes via the N211 from Westland.'}
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

      {/* GEO BLOCK */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Is er een Indiaas restaurant bij Westland?'
              : 'Is there an Indian restaurant near Westland?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant op Leyweg 986 in Den Haag is 20 minuten rijden van Westland via de N211.
              Er is geen vergelijkbaar Indiaas restaurant binnen de gemeente Westland zelf.
              Chopras serveert 143{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                halal-gecertificeerde gerechten
              </Link>{' '}
              uit een keuken die elke ochtend kruiden vers maalt. Bekijk het{' '}
              <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                volledige menu van 143 gerechten
              </Link>.{' '}
              Beoordeeld met 4,9 sterren door meer dan 800 geverifieerde gasten op Google.
              Open dinsdag tot en met zondag van 16:30 tot 22:30.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant at Leyweg 986, Den Haag is 20 minutes from Westland via the N211.
              There is no comparable Indian restaurant within the Westland municipality itself.
              Chopras serves 143{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                halal-certified dishes
              </Link>{' '}
              from a kitchen that grinds its spices fresh each morning. View the{' '}
              <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                full 143-dish menu
              </Link>.{' '}
              Rated 4.9 stars by 800+ verified guests on Google.
              Open Tuesday to Sunday from 16:30 to 22:30.
            </p>
          )}
        </div>
      </section>

      {/* THE ROUTE */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Van Westland naar Leyweg: de Route' : 'From Westland to Leyweg: the Route'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Westland ligt direct ten westen van Den Haag, verbonden via de N211. Vanuit Naaldwijk of Monster neemt u de N211 richting Den Haag en rijdt u rechtstreeks naar Leyweg. De rit duurt circa 20 minuten. Vanuit De Lier of Maasdijk sluit u aan op de N211 bij Naaldwijk - de totale rijtijd blijft binnen 20 tot 25 minuten. Betaald parkeren is beschikbaar in de omgeving van Leyweg.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Westland is een van de grootste tuinbouwgemeenten van Nederland, met ruim 110.000 inwoners verspreid over Naaldwijk, Monster, De Lier, Maasdijk, &apos;s-Gravenzande en Hoek van Holland. Voor al deze kernen is Leyweg 986 de dichtstbijzijnde bestemming voor authentiek Indiaas eten van niveau.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Westland heeft geen eigen Indiaas restaurant van betekenis. De combinatie van een directe N211-verbinding en de{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  volledige halalcertificering
                </Link>{' '}
                bij Chopras maakt de rit een voor de hand liggende keuze voor de grote moslimgemeenschap in de regio. Tramlijn 2 stopt bij halte Leyweg, op loopafstand van het restaurant, wat Chopras ook per openbaar vervoer goed bereikbaar maakt.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Westland sits directly west of Den Haag, connected by the N211. From Naaldwijk or Monster, take the N211 eastbound toward Den Haag and follow it directly to Leyweg. The drive takes approximately 20 minutes. From De Lier or Maasdijk, the route joins the N211 at Naaldwijk - total drive time stays within 20 to 25 minutes. Paid parking is available in the Leyweg area.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Westland is one of the largest horticultural municipalities in the Netherlands, with over 110,000 residents spread across Naaldwijk, Monster, De Lier, Maasdijk, &apos;s-Gravenzande, and Hoek van Holland. For all of these towns, Leyweg 986 is the nearest destination for authentic Indian food at this standard.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Westland has no Indian restaurant of note within its own borders. The combination of a direct N211 connection and the{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  full halal certification
                </Link>{' '}
                at Chopras makes the drive an obvious choice for the substantial Muslim community in the region. Tram line 2 stops at Leyweg, a short walk from the entrance, making Chopras accessible by public transport as well.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* WHY THE DRIVE IS WORTH IT - NAVY */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Waarom Westlandse Bezoekers Terugkomen' : 'Why Westland Visitors Come Back'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Westland heeft geen vergelijkbaar Indiaas restaurant. Zodra bewoners uit Naaldwijk, Monster of De Lier Chopras voor het eerst bezoeken, wordt de 20-minuten-rit via de N211 een vanzelfsprekende keuze. Vier concrete redenen maken dat zo.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Verse kruiden, elke ochtend gemalen.</strong> De masala&apos;s bij Chopras komen niet uit een leveranciersmix of fabriekszak. Elke ochtend worden hele specerijen, rechtstreeks ingekocht uit India, vers gemalen in de keuken. Komijn, kardemom, koriander. De vluchtige aromatische olien in deze kruiden beginnen binnen uren na het malen te verdampen. Dit is het verschil tussen Indiaas eten dat levend smaakt en Indiaas eten dat verpakt smaakt.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Een echte tandoor op 400 graden.</strong> De kleioven op Leyweg brandt op 400 graden Celsius. Die temperatuur geeft{' '}
                <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  naan zijn gebrande randen
                </Link>{' '}
                en{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  chicken tikka zijn rokerige korst
                </Link>.
                Geen conventionele oven kan dit repliceren. Elk tandoor-gerecht bij Chopras wordt bereid op de temperatuur waarvoor het is ontworpen.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Volledige halalcertificering, niet selectief.</strong> Halal bij Chopras is geen menu-optie. Het is de gehele keuken. Elke vleesleverancier, elk gerecht, elk bereidingsoppervlak. Er is geen risico op kruisbesmetting omdat er nergens op de locatie niet-halaals vlees aanwezig is. Families uit Westland die bevestigd halal voedsel vereisen, kunnen het volledige menu van 143 gerechten zonder voorbehoud bestellen.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">4,9 sterren van meer dan 800 gasten.</strong> Geen enkel ander Indiaas restaurant in Den Haag heeft zowel de beoordeling als het volume aan beoordelingen dat Chopras heeft. Een hoge beoordeling met weinig reviews is onbetrouwbaar. Meer dan 800 gasten over meerdere maanden is een gegeven dat moeilijk te fabriceren en nog moeilijker te handhaven is.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Westland has no comparable Indian restaurant. Once residents from Naaldwijk, Monster, or De Lier visit Chopras for the first time, the 20-minute drive via the N211 becomes an obvious regular choice. Four specific things make that true.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Fresh-ground spices every morning.</strong> The masalas at Chopras do not come from a supplier blend or factory packet. Every morning before service, whole spices sourced directly from India are ground fresh in the kitchen. Cumin, cardamom, coriander. The volatile aromatic oils in these spices begin evaporating within hours of grinding. This is the difference between Indian food that tastes alive and Indian food that tastes packaged.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">A real tandoor at 400 degrees.</strong> The clay oven at Leyweg fires at 400 degrees Celsius. That temperature gives{' '}
                <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  naan its charred edges
                </Link>{' '}
                and{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  chicken tikka its smoky crust
                </Link>.
                No conventional oven replicates it. Every tandoori dish at Chopras is cooked at the temperature it was designed for.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Full halal certification, not selective.</strong> Halal at Chopras is not a menu option. It is the entire kitchen. Every meat supplier, every dish, every preparation surface. There is no cross-contamination risk because there is no non-halal meat anywhere on the premises. Westland families who require confirmed halal food can order the full 143-dish menu without reservation.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">4.9 stars from 800+ guests.</strong> Few Indian restaurants in Den Haag show both a strong rating and this review volume. A high rating with few reviews is unreliable. 800+ guests over multiple months is a data point that is difficult to fabricate and even harder to maintain.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* WHAT VISITORS ORDER */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat Bezoekers uit Westland Bestellen' : 'What Visitors from Westland Order'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Voor families uit Westland die voor het eerst Indiaas eten proberen, is de{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Butter Chicken
                </Link>{' '}
                bijna altijd de eerste keuze. Mild genoeg voor wie niet gewend is aan Indiase kruiden, complex genoeg om de aandacht te houden van wie dat wel is. Het is het gerecht dat terughoudendheid wegneemt en een tweede bezoek garandeert.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Moslimfamilies uit Naaldwijk en omstreken die Chopras bezoeken voor de halalzekerheid, keren keer op keer terug voor de{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Dal Makhani
                </Link>: zwarte linzen langzaam gegaard met boter en room. Een bereiding die niet kan worden gehaast en niet nagebootst met een snelle kooksessie. De maatstaf is thuiskoken van families met generaties ervaring, en Chopras haalt die lat.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Grotere familiegroepen uit Westland kiezen bij feestelijke gelegenheden bijna altijd voor{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  biryani
                </Link>{' '}
                als middelpunt van de tafel. Saffraan-basmati rijst, halal vlees, verse kruiden. Voor groepen van 25 tot 80 gasten biedt de privé-evenementenruimte op Leyweg de ruimte.{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indiaas catering bij Chopras
                </Link>{' '}
                betekent dezelfde keuken en dezelfde kwaliteit, of u nu met zijn tweeën komt of met zeventig.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                For Westland families trying Indian food for the first time,{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Butter Chicken
                </Link>{' '}
                is almost always the first order. Mild enough for those new to Indian spicing, complex enough to hold the attention of those who are not. It is the dish that removes hesitation and guarantees a return visit.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Muslim families from Naaldwijk and the surrounding area who visit Chopras for halal certainty return again and again for the{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Dal Makhani
                </Link>: black lentils slow-cooked with butter and cream. A preparation that cannot be rushed and cannot be replicated with a quick simmer. The benchmark is home cooking from families with generations of experience, and Chopras meets it.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Larger family groups from Westland celebrating a special occasion almost always choose{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  biryani
                </Link>{' '}
                as the centrepiece. Saffron basmati rice, halal meat, fresh spices. For groups of 25 to 80 guests, the private event hall at Leyweg provides the space.{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indian catering at Chopras
                </Link>{' '}
                means the same kitchen and the same standard, whether you come as two or as seventy.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* PRACTICAL INFO */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Praktische Informatie voor Bezoekers uit Westland' : 'Practical Information for Westland Visitors'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {(isNl ? [
              { title: 'Afstand', desc: 'Circa 20 minuten rijden vanuit Westland via de N211. Vanuit Naaldwijk, Monster of De Lier.' },
              { title: 'Per Tram', desc: 'Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang. Betaald parkeren is beschikbaar in de omgeving.' },
              { title: 'Openingstijden', desc: 'Dinsdag tot en met zondag: 16:30 tot 22:30. Maandag gesloten.' },
              { title: 'Reserveren', desc: 'Aanbevolen voor groepen van vier of meer, met name vrijdag- en zaterdagavond. Bel +31 6 30645930.' },
            ] : [
              { title: 'Distance', desc: 'Approximately 20 minutes by car from Westland via the N211. From Naaldwijk, Monster, or De Lier.' },
              { title: 'By Tram', desc: 'Tram line 2 stops at Leyweg, a short walk from the entrance. Paid parking also available nearby.' },
              { title: 'Opening Hours', desc: 'Tuesday to Sunday: 16:30 to 22:30. Closed Monday.' },
              { title: 'Reservations', desc: 'Recommended for groups of four or more, especially Friday and Saturday evenings. Call +31 6 30645930.' },
            ]).map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border-l-4 border-[#D4AF37]">
                <p className="font-vibes text-xl text-[#C7A348] mb-1">{item.title}</p>
                <p className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed">{item.desc}</p>
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

      {/* NEARBY AREAS */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
            {isNl ? 'Ook Nabij Den Haag' : 'Also Serving These Areas Near Den Haag'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/indian-restaurant-delft`}
              className="flex-1 bg-[#FFFAF5] border border-gray-200 rounded-xl p-4 text-center hover:border-[#D4AF37] transition-colors"
            >
              <p className="font-vibes text-xl text-[#C7A348]">{isNl ? 'Indiaas Restaurant bij Delft' : 'Indian Restaurant Near Delft'}</p>
              <p className="font-body text-[#1A1A1A]/70 text-sm mt-1">{isNl ? 'Chopras bedient ook Delft' : 'Chopras also serves Delft'}</p>
            </Link>
            <Link
              href={`${base}/indian-restaurant-rijswijk`}
              className="flex-1 bg-[#FFFAF5] border border-gray-200 rounded-xl p-4 text-center hover:border-[#D4AF37] transition-colors"
            >
              <p className="font-vibes text-xl text-[#C7A348]">{isNl ? 'Indiaas Restaurant bij Rijswijk' : 'Indian Restaurant Near Rijswijk'}</p>
              <p className="font-body text-[#1A1A1A]/70 text-sm mt-1">{isNl ? 'Chopras bedient ook Rijswijk' : 'Chopras also serves Rijswijk'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR DISHES GRID */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Ontdek Populaire Gerechten' : 'Explore Popular Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="font-body text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Populaire eerste keus voor Westland-bezoekers' : 'Popular first choice for Westland visitors'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="font-body text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Langzaam gegaarde linzenspecialiteit' : 'Slow-cooked lentil speciality'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="font-body text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Geurige rijstspecialiteit met saffraan-basmati' : 'Fragrant rice speciality with saffron basmati'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="font-body text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas catering voor groepen en evenementen' : 'Indian catering for groups and events'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="font-body text-[#1A1A1A]/70 text-base">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A]/70 text-base">
              {isNl ? 'Bekijk het volledige menu of ' : 'View the full menu or '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'maak een reservering vanuit Westland bij Chopras Indian Restaurant' : 'book a table from Westland at Chopras Indian Restaurant Den Haag'}
              </Link>
              .
            </p>
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
    </>
  )
}
