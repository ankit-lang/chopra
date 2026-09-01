import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

const faqsEn = [
  {
    question: 'Is Chopras Indian Restaurant near Delft Centrum and Delft University?',
    answer: 'Yes. Chopras Indian Restaurant is located at Leyweg 986, Den Haag, approximately 15 minutes by car from Delft Centrum via the A13. It is also conveniently accessible for students and staff from Delft University (TU Delft), with public transport connections available from Delft.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat supplier holds halal certification and every dish across the 143-item menu is halal. There is no cross-contamination risk because no non-halal meat enters the kitchen at any point.',
  },
  {
    question: 'How do I get to Chopras Indian Restaurant by car?',
    answer: 'Chopras Indian Restaurant is at Leyweg 986, Den Haag. Paid parking is available in the surrounding Leyweg area. By public transport, tram line 2 stops at Leyweg, a short walk from the entrance.',
  },
  {
    question: 'What are the opening hours at Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Mondays. Reservations are recommended for groups of four or more visiting from Delft.',
  },
  {
    question: 'Does Chopras provide catering for events in the Delft area?',
    answer: 'Yes. Chopras Indian Restaurant provides full catering services for events across South Holland, including the Delft area. The private hall at Leyweg 986 accommodates 25 to 80 guests. Catering is also available at external venues for birthdays, weddings, and corporate dinners.',
  },
]

const faqsNl = [
  {
    question: 'Hoe ver is Chopras Indian Restaurant van Delft?',
    answer: 'Chopras Indian Restaurant is op Leyweg 986 in Den Haag, circa 15 minuten rijden van het centrum van Delft via de A13. De route omzeilt het centrum van Den Haag volledig. Per tram of bus via Den Haag Centraal duurt de reis circa 25 minuten.',
  },
  {
    question: 'Is Chopras Indian Restaurant halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Iedere vleesleverancier heeft een halalcertificering en elk gerecht op het menu van 143 items is halal. Er is geen risico op kruisbesmetting omdat er geen niet-halal vlees de keuken binnenkomt.',
  },
  {
    question: 'Hoe rijd ik naar Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is gevestigd op Leyweg 986, Den Haag. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Met het openbaar vervoer stopt tramlijn 2 bij halte Leyweg, op loopafstand van de ingang.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open van dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is op maandag gesloten. Reserveren wordt aanbevolen voor groepen van vier of meer personen vanuit Delft.',
  },
  {
    question: 'Verzorgt Chopras catering voor evenementen in de regio Delft?',
    answer: 'Ja. Chopras Indian Restaurant verzorgt volledige cateringdiensten voor evenementen in heel Zuid-Holland, inclusief de regio Delft. De privézaal op Leyweg 986 biedt ruimte voor 25 tot 80 gasten. Catering is ook beschikbaar op externe locaties voor verjaardagen, bruiloften en bedrijfsdiner.',
  },
]

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Near Delft | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant bij Delft | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant near Delft. Chopras Indian Restaurant Den Haag is 15 minutes via the A13. Authentic halal food at Leyweg 986. Open Tuesday to Sunday.',
    nl: 'Indiaas restaurant bij Delft. Chopras Indian Restaurant Den Haag is 15 minuten via de A13. Halal gecertificeerd, open dinsdag tot en met zondag. Boek nu.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-delft'),
      languages: {
        en: getLocalizedUrl('en', 'indian-restaurant-delft'),
        nl: getLocalizedUrl('nl', 'indian-restaurant-delft'),
        'x-default': getLocalizedUrl('en', 'indian-restaurant-delft'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-restaurant-delft'),
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

export default function IndianRestaurantDelftPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const restaurantSchema = getLocalRestaurantSchema(
    locale,
    ['Delft', 'Den Haag', 'South Holland'],
    getLocalizedUrl(locale, 'indian-restaurant-delft'),
  )

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Restaurant bij Delft' : 'Indian Restaurant Near Delft', item: getLocalizedUrl(locale, 'indian-restaurant-delft') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* Hero */}
      <section className="btn-gradient py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              NEAR YOU · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.99), 0 6px 24px rgba(0,0,0,0.85)' }}
          >
            {isNl
              ? 'Indiaas Restaurant bij Delft - Chopras in Den Haag, 15 Minuten Rijden'
              : 'Indian Restaurant Near Delft - Chopras in Den Haag, 15 Minutes Away'}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/90 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
          </div>
          <p
            className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-6 mb-8"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Authentiek Noord-Indiaas eten, volledig halal gecertificeerd, 4,9 sterren van meer dan 1100 beoordelingen. Leyweg 986, Den Haag - direct bereikbaar vanuit Delft via de A13.'
              : 'Authentic North Indian food near Delft Centrum, fully halal certified, with easy access from Delft University (TU Delft). Chopras Indian Restaurant in Den Haag is approximately 15 minutes from Delft via the A13.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Reserveer een tafel' : 'Reserve a Table'}
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

      {/* From Delft to Leyweg */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Van Delft naar Leyweg' : 'From Delft to Leyweg'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Delft en Den Haag delen een aaneengesloten stedelijk gebied. De gemeentegrens loopt door bebouwde straten, niet door open landschap.{' '}
                <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link>{' '}
                op Leyweg 986 ligt circa 15 minuten rijden van het centrum van Delft via de A13, en de meeste routes omzeilen het centrum van Den Haag volledig.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Betaald parkeren is beschikbaar in de omgeving van Leyweg. Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang, wat Chopras ook goed bereikbaar maakt zonder auto.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Per openbaar vervoer duurt de reis vanaf station Delft 20 tot 25 minuten via tram- of busverbindingen door Den Haag Centraal naar de halte Leyweg. Voor TU Delft-studenten en -medewerkers zonder auto is dit een eenvoudig avondje uit. Bekijk het{' '}
                <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">volledige menu van 143 gerechten</Link>{' '}
                zodat u weet wat u wilt bestellen voordat u vertrekt.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Delft and Den Haag share a continuous urban footprint. The municipal boundary runs through built-up streets, not open countryside. <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> at Leyweg 986 sits approximately 15 minutes from central Delft by car via the A13, and most routes bypass Den Haag city centre entirely.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Paid parking is available in the Leyweg area. Tram line 2 stops at Leyweg, a short walk from the entrance, making <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> straightforward to reach without a car as well.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                By public transport, the journey from Delft station takes 20 to 25 minutes via tram or bus connections through Den Haag Centraal to the Leyweg stop. Whether you are visiting from Delft Centrum, studying at Delft University (TU Delft), or living in the surrounding Delft area, <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> offers a convenient option for authentic Indian dining just a short journey from Delft.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                For TU Delft students and staff without a car, this is a straightforward evening out. Browse the <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">full 143-dish menu</Link> before you leave so you arrive knowing exactly what you want.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Delft Residents Choose Chopras */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Waarom Delftenaren Kiezen voor Chopras' : 'Why Delft Residents Choose Chopras'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De 4,9-sterren Google-beoordeling van meer dan 1100 geverifieerde beoordelingen is het getal dat er het meest toe doet. Hoge beoordelingen met weinig recensies zijn gebruikelijk en eenvoudig te behalen. Meer dan 1100 beoordelingen bij 4,9 sterren betekent een aanhoudende standaard over honderden afzonderlijke avonden, niet een geluksstuk.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De keuken draait op een specifieke discipline. Kruiden worden rechtstreeks uit India betrokken en elke ochtend vers gemalen voordat de service begint. De vluchtige aromatische verbindingen in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Voorgemengsde blends van leveranciers zijn de kortcut die de meeste restaurants nemen. Chopras doet dat niet.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De tandoor-kleioven op Leyweg bereikt 400 graden Celsius. Die temperatuur geeft{' '}
                <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">naan</Link>{' '}
                zijn gebakken randjes en{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">tandoorigerechten</Link>{' '}
                hun rokerige buitenkant. Geen conventionele oven repliceert dit. Het is het fysieke feit achter het smaakverschil, en het is precies wat bezoekers uit Delft beschrijven in hun beoordelingen.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The 4.9-star Google rating across 1100+ verified reviews is the number that matters most to anyone comparing options. High ratings with low review counts are common and easy to achieve. 1100+ reviews at 4.9 stars means a sustained standard across hundreds of separate evenings, not a lucky streak.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The kitchen runs on a specific discipline. Spices are sourced directly from India and ground fresh every morning before service opens. The volatile aromatic compounds in cumin, cardamom, and coriander begin evaporating within hours of grinding. Pre-mixed blends from suppliers are the shortcut most restaurants take. <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> does not.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The tandoor clay oven at Leyweg reaches 400 degrees Celsius. That temperature gives <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">naan bread</Link> its charred edges and <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">tandoori dishes</Link> their smoky exterior crust. No conventional oven replicates this. It is the physical fact behind the taste difference, and it is exactly what Delft visitors describe in their reviews.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> is also a convenient choice for students, staff and visitors from Delft University (TU Delft), as well as families and professionals living around Delft Centrum. Whether you are looking for authentic Indian food near Delft Centrum or an Indian restaurant near Delft University, the short journey to Leyweg makes Chopras an easy option for an evening meal, family dinner or casual gathering.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Halal - Navy */}
      <section className="btn-gradient py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Volledig Halal. Geen Uitzonderingen.' : 'Fully Halal. No Exceptions.'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Chopras Indian Restaurant is volledig halal gecertificeerd. Die verklaring geldt voor de gehele keuken, elke leverancier en elk gerecht op het{' '}
                <Link href={`${base}/halal-menu`} className="text-white hover:text-white font-semibold">menu van 143 items</Link>.
                {' '}Er is geen halalsectie naast een niet-halalsectie. Er is geen risico op kruisbesmetting, omdat er geen niet-halal vlees aanwezig is in het restaurant.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Voor TU Delfts grote internationale moslim-studentengemeenschap en voor de Zuid-Hollandse families die langs andere restaurants rijden om bevestigde halal te vinden, is dit de doorslaggevende factor. Niet een prettig extraatje. Een voorwaarde. Lees de{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-white font-semibold">volledige halalinformatie</Link>{' '}
                voor details over onze certificering en leveranciers.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Chopras Indian Restaurant is fully halal certified. That statement covers the entire kitchen, every supplier, and every dish across the{' '}
                <Link href={`${base}/halal-menu`} className="text-white hover:text-white font-semibold">143-item menu</Link>.
                {' '}There is no halal section alongside a non-halal section. There is no cross-contamination risk because no non-halal meat is present anywhere on the premises.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                For TU Delft&apos;s large international Muslim student community and for South Holland families who drive past other restaurants to find confirmed halal, this is the decisive factor. Not a nice-to-have. A prerequisite. Read the{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-white font-semibold">full halal certification details</Link>{' '}
                for complete information on our sourcing and verification.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* What Delft Visitors Order */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Wat Delftse Bezoekers als Eerste Bestellen' : 'What Delft Visitors Order First'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Bezoekers uit Delft bestellen{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani</Link>{' '}
                bovengemiddeld vaak. Het saffraanbasmatirijst en de vers gemalen kruiden bij Chopras vertegenwoordigen precies het verschil tussen restaurantbiryani en wat de meeste thuiskoks kunnen produceren. De kwaliteit is onmiddellijk vergelijkbaar en blijvend.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De street food-sectie trekt TU Delfts internationale gemeenschap in bijzonder grote aantallen.{' '}
                <Link href={`${base}/pani-puri-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Pani puri</Link>,{' '}
                <Link href={`${base}/chaat-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">chaat</Link>{' '}
                en samosa zijn gerechten die echte nostalgie dragen voor Zuid-Aziatische bezoekers. Authentieke versies vinden buiten een Zuid-Aziatische thuiskeuken is in deze regio oprecht zeldzaam.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Butter chicken</Link>{' '}
                blijft het startpunt voor de meeste Nederlandse gasten die Chopras voor het eerst vanuit Delft bezoeken. De rijkheid van de tomaten-roomsaus, gemaakt met vers gemalen masala in plaats van een kant-en-klare basis, stelt onmiddellijk een maatstaf voor wat Indiaas eten kan zijn.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Visitors from Delft order <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani</Link> at above-average rates. The saffron basmati rice and fresh-ground spices at <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> represent exactly the gap between restaurant biryani and what most home kitchens can produce. The quality is immediately apparent and consistently repeatable.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The street food section draws TU Delft&apos;s international community in particularly strong numbers. <Link href={`${base}/pani-puri-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Pani puri</Link>, <Link href={`${base}/chaat-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">chaat</Link>, and samosa are dishes that carry genuine nostalgia for South Asian visitors. Finding authentic versions outside of a South Asian home kitchen is genuinely rare in this region.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Butter chicken</Link> remains the entry point for most Dutch guests visiting <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> for the first time from Delft. The richness of the tomato and cream sauce, made with fresh-ground masala rather than a jarred base, sets an immediate benchmark for what Indian food can be.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                For students and international visitors from Delft University (TU Delft), popular choices also include pani puri, chaat, samosa, biryani and butter chicken, offering a taste of authentic Indian street food and North Indian cuisine. Visitors from Delft Centrum can enjoy these dishes as part of a relaxed dinner, whether they are looking for an authentic Indian restaurant near Delft University or Indian food near Delft Centrum.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Is er een goed Indiaas restaurant bij Delft?'
              : 'Is There a Good Indian Restaurant Near Delft?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Ja.{' '}
              <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link>{' '}
              op Leyweg 986, Den Haag ligt 15 minuten van het centrum van Delft via de A13. Beoordeeld met 4,9 sterren van meer dan 1100 Google-beoordelingen en volledig halal gecertificeerd, serveert Chopras een menu van 143 Noord-Indiaase gerechten, waaronder biryani, tandoori en Indo-Chinese gerechten. Open dinsdag tot en met zondag van 16:30 tot 22:30. Betaald parkeren beschikbaar in de omgeving van Leyweg.{' '}
              <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Reserveer een tafel</Link>{' '}
              of bel +31 6 30645930.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Yes.{' '}
              <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link>{' '}
              at Leyweg 986, Den Haag is 15 minutes from central Delft via the A13. Rated 4.9 stars from 1100+ Google reviews and fully halal certified, Chopras serves a 143-dish North Indian menu including biryani, tandoori, and Indo Chinese dishes. Open Tuesday to Sunday from 16:30 to 22:30. Paid parking is available in the Leyweg area.{' '}
              <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Reserve a table</Link>{' '}
              or call +31 6 30645930.
            </p>
          )}
        </div>
      </section>

      {/* Practical Info */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Praktische Informatie voor Bezoekers uit Delft' : 'Getting Here from Delft'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {(isNl ? [
              { title: 'Afstand', desc: 'Circa 15 minuten rijden vanuit het centrum van Delft via de A13. De route omzeilt het centrum van Den Haag volledig.' },
              { title: 'Openbaar Vervoer', desc: 'Tram- en busverbindingen van Delft via Den Haag Centraal naar Leyweg - circa 25 minuten reistijd.' },
              { title: 'Per Tram', desc: 'Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang. Betaald parkeren is beschikbaar in de omgeving.' },
              { title: 'Openingstijden', desc: 'Dinsdag tot en met zondag: 16:30 tot 22:30. Maandag gesloten.' },
            ] : [
              { title: 'Distance', desc: 'Approximately 15 minutes by car from central Delft via the A13. The route bypasses Den Haag city centre entirely.' },
              { title: 'Public Transport', desc: 'Tram and bus connections from Delft via Den Haag Centraal to Leyweg - approximately 25 minutes.' },
              { title: 'By Tram', desc: 'Tram line 2 stops at Leyweg, a short walk from the entrance. Paid parking also available nearby.' },
              { title: 'Opening Hours', desc: 'Tuesday to Sunday: 16:30 to 22:30. Closed Monday.' },
            ]).map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border-l-4 border-white">
                <h3 className="font-heading text-2xl md:text-3xl text-[#06068a] mb-3 leading-[1.3]">{item.title}</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out hover:btn-gradient hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Reserveer een tafel' : 'Reserve a Table'}
            </Link>
            <Link
              href={`${base}/catering`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out hover:btn-gradient hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Catering aanvragen' : 'Enquire About Catering'}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
              {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
            </h2>
          </div>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">
            {isNl ? 'Ook Nabij Den Haag' : 'Also Serving These Areas Near Den Haag'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/indian-restaurant-rijswijk`}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-white transition-colors"
            >
              <p className="font-heading text-2xl text-[#06068a] leading-[1.3]">
                {isNl ? 'Indiaas Restaurant bij Rijswijk' : 'Indian Restaurant Near Rijswijk'}
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed mt-1">
                {isNl ? 'Chopras bedient ook Rijswijk' : 'Chopras also serves Rijswijk'}
              </p>
            </Link>
            <Link
              href={`${base}/indian-restaurant-zoetermeer`}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-white transition-colors"
            >
              <p className="font-heading text-2xl text-[#06068a] leading-[1.3]">
                {isNl ? 'Indiaas Restaurant bij Zoetermeer' : 'Indian Restaurant Near Zoetermeer'}
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed mt-1">
                {isNl ? 'Chopras bedient ook Zoetermeer' : 'Chopras also serves Zoetermeer'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Popular Dishes */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Ontdek Populaire Gerechten' : 'Explore Popular Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href={`${base}/butter-chicken-den-haag`}
              className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all"
            >
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="text-[#06068a] font-semibold">
                {isNl ? 'Rijke tomaat-roomsaus, vers gemalen masala' : 'Rich tomato cream sauce, fresh-ground masala'}
              </p>
            </Link>
            <Link
              href={`${base}/dal-makhani-den-haag`}
              className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all"
            >
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="text-[#06068a] font-semibold">
                {isNl ? 'Langzaam gekookte zwarte linzen met boter' : 'Slow-cooked black lentils with butter and cream'}
              </p>
            </Link>
            <Link
              href={`${base}/biryani-den-haag`}
              className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all"
            >
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="text-[#06068a] font-semibold">
                {isNl ? 'Saffraanbasmati met vers gemalen kruiden' : 'Saffron basmati with fresh-ground spices'}
              </p>
            </Link>
            <Link
              href={`${base}/catering`}
              className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all"
            >
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Catering' : 'Catering'}
              </p>
              <p className="text-[#06068a] font-semibold">
                {isNl ? 'Indiaas catering voor evenementen in de regio Delft' : 'Indian catering for events across the Delft region'}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
