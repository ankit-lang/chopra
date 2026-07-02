import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

const faqsEn = [
  {
    question: 'Is there a good Indian restaurant near Zoetermeer?',
    answer: 'Chopras Indian Restaurant at Leyweg 986, Den Haag is 20 minutes from central Zoetermeer via the A12 motorway. Rated 4.9 stars by 800+ verified guests on Google, Chopras serves 143 halal-certified dishes from a kitchen that grinds its spices fresh each morning. Open Tuesday to Sunday from 16:30 to 22:30. Paid parking is available in the Leyweg area.',
  },
  {
    question: 'How do I get from Zoetermeer to Chopras Indian Restaurant?',
    answer: 'By car, take the A12 westbound from Zoetermeer and exit at Leyweg. The journey is approximately 20 minutes from central Zoetermeer. By public transport, take the Randstadrail to Den Haag Centrum station and connect to a bus toward Leyweg. Total travel time by public transport is typically 30 to 40 minutes. Paid parking is available in the Leyweg area.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. All meat suppliers are halal certified, and every one of the 143 dishes on the menu is halal. There is no non-halal meat anywhere on the premises, which means there is no cross-contamination risk. Guests from Zoetermeer and the wider South Holland area can order the full menu with confidence.',
  },
  {
    question: 'Can I book a private event space for a group from Zoetermeer?',
    answer: 'Yes. Chopras Indian Restaurant has a private event hall at Leyweg 986 that accommodates 25 to 80 guests. The hall is suitable for weddings, birthday dinners, nikah receptions, corporate events, and Diwali celebrations. Groups from Zoetermeer regularly book for special occasions. Contact the restaurant directly to discuss availability and catering arrangements.',
  },
  {
    question: 'What are the opening hours at Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Mondays. Reservations are recommended for groups of four or more, particularly on Friday and Saturday evenings. Call +31 6 30645930 or book via the contact page.',
  },
]

const faqsNl = [
  {
    question: 'Is er een goed Indiaas restaurant bij Zoetermeer?',
    answer: 'Chopras Indian Restaurant op Leyweg 986 in Den Haag is 20 minuten rijden van centraal Zoetermeer via de A12. Beoordeeld met 4,9 sterren door meer dan 800 geverifieerde gasten op Google, serveert Chopras 143 halal-gecertificeerde gerechten uit een keuken die elke ochtend kruiden vers maalt. Open van dinsdag tot en met zondag van 16:30 tot 22:30. Betaald parkeren is beschikbaar in de omgeving van Leyweg.',
  },
  {
    question: 'Hoe kom ik van Zoetermeer naar Chopras Indian Restaurant?',
    answer: 'Per auto neemt u de A12 richting Den Haag vanuit Zoetermeer en slaat u af bij Leyweg. De reis duurt circa 20 minuten vanuit centraal Zoetermeer. Per openbaar vervoer neemt u de Randstadrail naar Den Haag Centrum en stapt u over op een bus naar Leyweg. De totale reistijd per openbaar vervoer is doorgaans 30 tot 40 minuten. Betaald parkeren is beschikbaar in de omgeving van Leyweg.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Alle vleesleveranciers zijn halal gecertificeerd en elk gerecht op het menu van 143 gerechten is halal. Er is nergens op de locatie niet-halaals vlees aanwezig, wat betekent dat er geen risico op kruisbesmetting is. Gasten uit Zoetermeer en de bredere regio Zuid-Holland kunnen het volledige menu met vertrouwen bestellen.',
  },
  {
    question: 'Kan ik een privé-evenementenruimte reserveren voor een groep uit Zoetermeer?',
    answer: 'Ja. Chopras Indian Restaurant heeft een privé-evenementenruimte op Leyweg 986 voor 25 tot 80 gasten. De ruimte is geschikt voor bruiloften, verjaardagsdiners, nikah-recepties, bedrijfsfeesten en Diwali-vieringen. Groepen uit Zoetermeer reserveren regelmatig voor bijzondere gelegenheden. Neem rechtstreeks contact op met het restaurant voor beschikbaarheid en cateringmogelijkheden.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open van dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is op maandag gesloten. Reserveringen worden aanbevolen voor groepen van vier of meer, met name op vrijdag- en zaterdagavond. Bel +31 6 30645930 of boek via de contactpagina.',
  },
]

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Near Zoetermeer | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant bij Zoetermeer | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant near Zoetermeer. Chopras Indian Restaurant is 20 minutes via the A12. Authentic halal food at Leyweg 986. Open Tuesday to Sunday.',
    nl: 'Indiaas restaurant bij Zoetermeer. Chopras Indian Restaurant Den Haag, 20 minuten via de A12. Authentiek halal eten. Open dinsdag tot en met zondag.',
  }
  return {
    title: titles[locale], description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-zoetermeer'),
      languages: { en: getLocalizedUrl('en', 'indian-restaurant-zoetermeer'), nl: getLocalizedUrl('nl', 'indian-restaurant-zoetermeer'), 'x-default': getLocalizedUrl('en', 'indian-restaurant-zoetermeer') },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-restaurant-zoetermeer'),
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

export default function IndianRestaurantZoetermeerPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const restaurantSchema = getLocalRestaurantSchema(
    locale,
    ['Zoetermeer', 'Den Haag', 'South Holland'],
    getLocalizedUrl(locale, 'indian-restaurant-zoetermeer'),
  )

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Restaurant bij Zoetermeer' : 'Indian Restaurant Near Zoetermeer', item: getLocalizedUrl(locale, 'indian-restaurant-zoetermeer') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • NEAR YOU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl
              ? 'Indiaas Restaurant bij Zoetermeer - Chopras in Den Haag, 20 Minuten Rijden'
              : 'Indian Restaurant Near Zoetermeer - Chopras in Den Haag, 20 Minutes Away'}
          </h1>
          <p
            className="font-body text-white/75 text-lg md:text-xl max-w-3xl mx-auto mb-8"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Authentiek Noord-Indiaas eten, volledig halal gecertificeerd, open dinsdag tot en met zondag. Leyweg 986, Den Haag - een directe verbinding vanuit Zoetermeer via de A12.'
              : 'Authentic North Indian food, fully halal certified, open Tuesday to Sunday. Leyweg 986, Den Haag - a direct connection from Zoetermeer via the A12.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* GEO BLOCK - mandatory self-contained answer for AI citation */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Is er een goed Indiaas restaurant bij Zoetermeer?'
              : 'Is there a good Indian restaurant near Zoetermeer?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant op Leyweg 986 in Den Haag is 20 minuten rijden van centraal Zoetermeer via de A12.
              Beoordeeld met 4,9 sterren door meer dan 800 geverifieerde gasten op Google, serveert Chopras 143{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                halal-gecertificeerde gerechten
              </Link>{' '}
              uit een keuken die elke ochtend kruiden vers maalt. Het volledige{' '}
              <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                menu van 143 gerechten
              </Link>{' '}
              omvat curry&apos;s, tandoori en biryani. Open van dinsdag tot en met zondag van 16:30 tot 22:30. Betaald parkeren is beschikbaar in de omgeving van Leyweg.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant at Leyweg 986, Den Haag is 20 minutes from central Zoetermeer via the A12 motorway.
              Rated 4.9 stars by 800+ verified guests on Google, Chopras serves 143{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                halal-certified dishes
              </Link>{' '}
              from a kitchen that grinds its spices fresh each morning. The{' '}
              <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                full 143-dish menu
              </Link>{' '}
              spans curries, tandoori, and biryani. Open Tuesday to Sunday from 16:30 to 22:30. Paid parking is available in the Leyweg area.
            </p>
          )}
        </div>
      </section>

      {/* THE ROUTE */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Van Zoetermeer naar Leyweg: de Route' : 'From Zoetermeer to Leyweg: the Route'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Zoetermeer ligt direct ten oosten van Den Haag, verbonden via de A12 en de Randstadrail. Vanuit centraal Zoetermeer rijdt u via de A12 richting Den Haag en slaat u af bij Leyweg. De rit duurt circa 20 minuten. Betaald parkeren is beschikbaar in de omgeving van Leyweg.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Per openbaar vervoer verbindt de Randstadrail Zoetermeer rechtstreeks met Den Haag Centrum. Vandaar rijdt een bus naar Leyweg. De totale reistijd is doorgaans 30 tot 40 minuten, afhankelijk van vertrektijd en aansluiting.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Zoetermeer heeft een van de grootste Zuid-Aziatische gemeenschappen in de regio Den Haag. Hindoestaanse families, Pakistaanse en Indiase expats, en een groeiende generatie Nederlanders met een Indiase eettraditie thuis. Voor hen is Chopras de dichtstbijzijnde authentieke optie met de{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  gecertificeerde halalstatus
                </Link>{' '}
                die de gemeenschap vereist. Tramlijn 2 stopt bij halte Leyweg, op loopafstand van het restaurant, wat Chopras ook goed bereikbaar maakt met het openbaar vervoer.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Zoetermeer sits directly east of Den Haag, connected by the A12 motorway and the Randstadrail tram network. From central Zoetermeer, take the A12 westbound and exit at Leyweg. The drive takes approximately 20 minutes. Paid parking is available in the Leyweg area.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                By public transport, the Randstadrail connects Zoetermeer directly to Den Haag Centrum station. From there, a bus runs toward Leyweg. Total travel time is typically 30 to 40 minutes depending on departure time and connection.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Zoetermeer has one of the largest South Asian communities in the Den Haag region. Hindustani families, Pakistani and Indian expats, and a growing generation of Dutch households with an Indian food tradition at home. For them, Chopras is the nearest authentic option with the{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  confirmed halal certification
                </Link>{' '}
                the community requires. Tram line 2 stops at Leyweg, a short walk from the entrance, making Chopras accessible without a car as well.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* WHY THE DRIVE IS WORTH IT - NAVY */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Waarom Zoetermeerse Bezoekers Terugkomen' : 'Why Zoetermeer Visitors Come Back'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Er is geen Indiaas restaurant in de directe omgeving van Zoetermeer dat doet wat Chopras doet. Vier specifieke dingen maken de rit logisch zodra u het restaurant kent.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Verse kruiden, elke ochtend gemalen.</strong> De masala&apos;s bij Chopras komen niet uit een leveranciersmix of fabriekszak. Elke ochtend voor service worden hele specerijen, rechtstreeks ingekocht uit India, vers gemalen in de keuken. Komijn, kardemom, koriander. De vluchtige aromatische olien in deze kruiden beginnen binnen uren na het malen te verdampen. Dit is het verschil tussen Indiaas eten dat levend smaakt en Indiaas eten dat verpakt smaakt.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Een echte tandoor op 400 graden.</strong> De kleioven op Leyweg brandt op 400 graden Celsius. Die temperatuur geeft{' '}
                <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  naan zijn gebrande randen
                </Link>{' '}
                en{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  chicken tikka zijn rokerige korst
                </Link>.
                Geen conventionele oven kan dit repliceren. Elk tandoor-gerecht bij Chopras wordt bereid op de temperatuur waarvoor het is ontworpen.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Volledige halalcertificering, niet selectief.</strong> Halal bij Chopras is geen menu-optie. Het is de gehele keuken. Elke vleesleverancier, elk gerecht, elk bereidingsoppervlak. Er is geen risico op kruisbesmetting omdat er nergens op de locatie niet-halaals vlees aanwezig is. Families uit Zoetermeer die bevestigd halal voedsel vereisen, kunnen het volledige menu van 143 gerechten zonder voorbehoud bestellen.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">4,9 sterren van meer dan 800 gasten.</strong> Geen enkel ander Indiaas restaurant in Den Haag heeft zowel de beoordeling als het volume aan beoordelingen dat Chopras heeft. Een hoge beoordeling met weinig reviews is onbetrouwbaar. Meer dan 800 gasten over meerdere maanden is een gegeven dat moeilijk te fabriceren en nog moeilijker te handhaven is.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-white/85 text-lg leading-relaxed">
                There is no Indian restaurant in or around Zoetermeer that does what Chopras does. Four specific things make the drive obvious once you know the restaurant.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Fresh-ground spices every morning.</strong> The masalas at Chopras do not come from a supplier blend or factory packet. Every morning before service, whole spices sourced directly from India are ground fresh in the kitchen. Cumin, cardamom, coriander. The volatile aromatic oils in these spices begin evaporating within hours of grinding. This is the difference between Indian food that tastes alive and Indian food that tastes packaged.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">A real tandoor at 400 degrees.</strong> The clay oven at Leyweg fires at 400 degrees Celsius. That temperature gives{' '}
                <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  naan its charred edges
                </Link>{' '}
                and{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  chicken tikka its smoky crust
                </Link>.
                No conventional oven replicates it. Every tandoori dish at Chopras is cooked at the temperature it was designed for.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                <strong className="text-white">Full halal certification, not selective.</strong> Halal at Chopras is not a menu option. It is the entire kitchen. Every meat supplier, every dish, every preparation surface. There is no cross-contamination risk because there is no non-halal meat anywhere on the premises. Zoetermeer families who require confirmed halal food can order the full 143-dish menu without reservation.
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
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Wat Bezoekers uit Zoetermeer Bestellen' : 'What Visitors from Zoetermeer Order'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Hindoestaanse families uit Zoetermeer arriveren met een duidelijk beeld van hoe Indiaas eten hoort te smaken. De maatstaf is thuiskoken van families met generaties ervaring. Het gerecht dat deze gasten keer op keer overtuigt, is de{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Dal Makhani
                </Link>: zwarte linzen langzaam gegaard met boter en room, een bereiding die niet kan worden gehaast en niet nagebootst met een snelle kooksessie.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Butter Chicken
                </Link>{' '}
                is het meest bestelde gerecht voor gasten die Nederlandse vrienden of collega&apos;s voor de eerste keer meenemen. Mild genoeg voor wie niet gewend is aan Indiase gerechten, complex genoeg om de aandacht van wie dat wel is te behouden. Het is het gerecht dat aarzeling wegneemt.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Families die verjaardag, jubileum of Eid-diner vieren bij Chopras kiezen bijna altijd voor{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  biryani
                </Link>{' '}
                als middelpunt van de tafel. Saffraan-basmati rijst, halal vlees, verse kruiden. Voor grotere groepen uit Zoetermeer biedt de privé-evenementenruimte op Leyweg plek voor 25 tot 80 gasten.{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Indiaas catering bij Chopras
                </Link>{' '}
                betekent dezelfde keuken, dezelfde kruiden en dezelfde kwaliteit, voor een tafeltje van twee tot een diner voor zeventig.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Hindustani families from Zoetermeer arrive with a precise sense of what Indian food should taste like. The benchmark is home cooking from families with generations of experience. The dish that consistently wins these guests over is the{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Dal Makhani
                </Link>: black lentils slow-cooked with butter and cream, a preparation that cannot be rushed and cannot be faked with a quick simmer.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Butter Chicken
                </Link>{' '}
                is the most ordered dish for guests bringing Dutch friends or colleagues for the first time. Mild enough for those new to Indian food, complex enough to hold the attention of those who are not. It is the dish that removes hesitation.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Families celebrating a birthday, anniversary, or Eid dinner at Chopras almost always choose{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  biryani
                </Link>{' '}
                as the centrepiece. Saffron basmati rice, halal meat, fresh spices. For larger groups from Zoetermeer, the private event hall at Leyweg seats 25 to 80 guests.{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Indian catering at Chopras
                </Link>{' '}
                means the same kitchen, the same spices, and the same standard, whether you are at a table for two or a seated dinner for seventy.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* PRACTICAL INFO */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Praktische Informatie voor Bezoekers uit Zoetermeer' : 'Practical Information for Zoetermeer Visitors'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {(isNl ? [
              { title: 'Afstand', desc: 'Circa 20 minuten rijden van centraal Zoetermeer via de A12.' },
              { title: 'Openbaar Vervoer', desc: 'Randstadrail naar Den Haag Centrum, dan bus naar Leyweg. Circa 30 tot 40 minuten totaal.' },
              { title: 'Per Tram', desc: 'Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang. Betaald parkeren is beschikbaar in de omgeving.' },
              { title: 'Openingstijden', desc: 'Dinsdag tot en met zondag: 16:30 tot 22:30. Maandag gesloten.' },
            ] : [
              { title: 'Distance', desc: 'Approximately 20 minutes by car from central Zoetermeer via the A12.' },
              { title: 'Public Transport', desc: 'Randstadrail to Den Haag Centrum, then bus to Leyweg. Approximately 30 to 40 minutes total.' },
              { title: 'By Tram', desc: 'Tram line 2 stops at Leyweg, a short walk from the entrance. Paid parking also available nearby.' },
              { title: 'Opening Hours', desc: 'Tuesday to Sunday: 16:30 to 22:30. Closed Monday.' },
            ]).map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border-l-4 border-white">
                <p className="font-vibes text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-1">{item.title}</p>
                <p className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* NEARBY AREAS */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
            {isNl ? 'Ook Nabij Den Haag' : 'Also Serving These Areas Near Den Haag'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/indian-restaurant-rijswijk`}
              className="flex-1 bg-[#FFFAF5] border border-gray-200 rounded-xl p-4 text-center hover:border-white transition-colors"
            >
              <p className="font-vibes text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]">{isNl ? 'Indiaas Restaurant bij Rijswijk' : 'Indian Restaurant Near Rijswijk'}</p>
              <p className="font-body text-[#1A1A1A]/70 text-sm mt-1">{isNl ? 'Chopras bedient ook Rijswijk' : 'Chopras also serves Rijswijk'}</p>
            </Link>
            <Link
              href={`${base}/indian-restaurant-delft`}
              className="flex-1 bg-[#FFFAF5] border border-gray-200 rounded-xl p-4 text-center hover:border-white transition-colors"
            >
              <p className="font-vibes text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]">{isNl ? 'Indiaas Restaurant bij Delft' : 'Indian Restaurant Near Delft'}</p>
              <p className="font-body text-[#1A1A1A]/70 text-sm mt-1">{isNl ? 'Chopras bedient ook Delft' : 'Chopras also serves Delft'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR DISHES GRID */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Ontdek Populaire Gerechten' : 'Explore Popular Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="font-body text-white text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Populaire eerste keus voor Zoetermeer-bezoekers' : 'Popular first choice for Zoetermeer visitors'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="font-body text-white text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Langzaam gegaarde linzenspecialiteit' : 'Slow-cooked lentil speciality'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="font-body text-white text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Geurige rijstspecialiteit met saffraan-basmati' : 'Fragrant rice speciality with saffron basmati'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="font-body text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas catering voor groepen en evenementen' : 'Indian catering for groups and events'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="font-body text-[#1A1A1A]/70 text-base">
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A]/70 text-base">
              {isNl ? 'Bekijk het volledige menu of ' : 'View the full menu or '}
              <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'maak een reservering vanuit Zoetermeer bij Chopras Indian Restaurant' : 'book a table from Zoetermeer at Chopras Indian Restaurant Den Haag'}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>
    </>
  )
}
