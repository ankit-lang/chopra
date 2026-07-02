import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const title = 'Zaal Huren Den Haag | Chopras Indian Restaurant'
  const description =
    'Zaal huren Den Haag bij Chopras Indian Restaurant. Feesten en vergaderingen met Indiaas catering inbegrepen. Flexibel en betaalbaar. Offerte aanvragen.'
  return {
    title,
    description,
    robots: locale === 'en' ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: getLocalizedUrl(locale, 'zaal-huren-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'zaal-huren-den-haag'),
        nl: getLocalizedUrl('nl', 'zaal-huren-den-haag'),
        'x-default': getLocalizedUrl('en', 'zaal-huren-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'zaal-huren-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Zaal huren Den Haag bij Chopras Indian Restaurant' }],
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

const faqs = [
  {
    question: 'Hoeveel gasten passen in de zaal van Chopras Indian Restaurant?',
    answer:
      'De privézaal van Chopras Indian Restaurant op Leyweg 986 in Den Haag biedt ruimte voor 25 tot 80 gasten. De opstelling is flexibel: ronde tafels voor een diner, lange tafelrijen voor een receptie of een staande opstelling voor een borrel. Neem contact op voor een opstelling op maat voor uw gelegenheid.',
  },
  {
    question: 'Is zaal huren bij Chopras volledig halal?',
    answer:
      'Ja, volledig. Chopras Indian Restaurant is een volledig halal gecertificeerd restaurant. Niet alleen het vlees, maar elke leverancier en elk ingrediënt in de keuken is halal gecertificeerd. Er is geen niet-halal vlees aanwezig op de locatie, dus er is geen risico op kruisbesmetting. Uw gasten eten met vertrouwen.',
  },
  {
    question: 'Is catering inbegrepen bij het huren van de zaal?',
    answer:
      'Ja. Chopras verzorgt de volledige catering als onderdeel van het zaalverhuur pakket. U kiest het menu op maat, of u nu kiest voor een buffet met biryani en tandoori of een meergangendiner met curries en naan. De bereiding, het transport en de bediening zijn inbegrepen. U hoeft niets te regelen buiten ons.',
  },
  {
    question: 'Voor welke gelegenheden kan ik een zaal reserveren bij Chopras?',
    answer:
      'De privézaal van Chopras is beschikbaar voor verjaardagen, bruiloften, nikah-recepties, bedrijfsdiners, teamvieringen, Diwali-diners en andere privé evenementen. Elke gelegenheid krijgt hetzelfde verse eten uit dezelfde keuken als ons restaurant. Dat is precies wat wij leveren, ongeacht de aanleiding.',
  },
  {
    question: 'Hoe ver van tevoren moet ik een zaal huren in Den Haag reserveren?',
    answer:
      'Voor evenementen van 25 tot 80 gasten raden wij aan om minimaal zes tot acht weken van tevoren contact op te nemen. Dit geeft ons de ruimte om het menu samen te stellen, de indeling te plannen en ervoor te zorgen dat alles op uw dag vlekkeloos verloopt. Neem vandaag contact op voor een vrijblijvende offerte.',
  },
]

export default function ZaalHurenPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'zaal-huren-den-haag'))} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
          { name: 'Zaal Huren Den Haag', item: getLocalizedUrl(locale, 'zaal-huren-den-haag') },
        ])}
      />
      <JsonLd data={getFaqPageSchema(faqs)} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight">
            Zaal Huren Den Haag
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Private ruimte voor 25 tot 80 gasten. Indiaas catering inbegrepen. Volledig halal gecertificeerd. Alles op een plek bij Chopras Indian Restaurant op Leyweg 986.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Vrijblijvende Offerte Aanvragen
            </Link>
            <Link
              href={`${base}/feestzaal-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Feestzaal Bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: Intro */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Zaal huren Den Haag zonder het gedoe
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            U zoekt een zaal in Den Haag. Niet een anoniem zalencentrum met TL-licht en catering uit de magnetron. U wilt een ruimte die warm aanvoelt, waar uw gasten zich welkom voelen en waar het eten de avond draagt. Dat is precies waarom mensen <strong>feestzaal huren Den Haag met catering</strong> bij{' '}
            <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              Chopras Indian Restaurant
            </Link>
            .
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            De privézaal op{' '}
            <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              Leyweg 986 in Den Haag
            </Link>{' '}
            biedt ruimte voor 25 tot 80 gasten. De indeling is flexibel: ronde tafels voor een diner, lange tafelrijen voor een receptie of een staande opstelling voor een borrel. U beslist. Wij regelen de inrichting, de bediening en het eten.
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            De catering is geen bijproduct. Wij malen onze kruiden elke ochtend vers van hele specerijen die wij rechtstreeks uit India betrekken. De aromatische oliën in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Dat verschil proeft uw gasten direct. Het is het verschil tussen Indiaas eten dat leeft en Indiaas eten dat verpakt smaakt. Geen aparte cateraar nodig. Alles op een plek.
          </p>
        </div>
      </section>

      {/* Section 2: Wat is inbegrepen */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Wat is er inbegrepen bij zaal huren met catering?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-10">
            Chopras biedt een totaaloplossing voor zaalverhuur Den Haag. Geen coördinatie tussen een locatie en een externe cateraar. Geen vragen wie welke borden meeneemt. U boekt bij ons en wij regelen het volgende.
          </p>
          <div className="space-y-10">
            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
                Private ruimte voor uw gelegenheid
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De zaal is warm ingericht en authentiek gedecoreerd. Geen plastic stoelen, geen kale wanden. Uw gasten voelen meteen dat u iets bijzonders voor hen heeft geregeld. De ruimte is beschikbaar voor 25 tot 80 gasten en de opstelling past u aan op uw wensen.
              </p>
            </div>
            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
                Indiaas catering op maat
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Van{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  saffraan biryani
                </Link>{' '}
                en{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  tandoori gegrilde gerechten
                </Link>{' '}
                tot{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  dal makhani
                </Link>{' '}
                en vers gebakken naan uit onze tandoor. U kiest het menu samen met ons. Wij bereiden het met dezelfde verse specerijen als in het restaurant. Uw gasten merken het verschil.
              </p>
            </div>
            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
                Volledige bediening en opstelling
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Tafels, stoelen, borden, bestek, servetten. Professionele bediening tijdens het evenement. Bereiding en transport van het eten. Alles is inbegrepen. U staat die avond niet na te denken over logistiek. U geniet van uw gasten.
              </p>
            </div>
            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
                Betaald parkeren in de omgeving
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Betaald parkeren is beschikbaar in de omgeving van Leyweg 986. Tramlijn 2 stopt bij halte Leyweg, op loopafstand van het restaurant. Uw gasten kunnen zowel met de auto als met het openbaar vervoer eenvoudig aankomen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Gelegenheden */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Voor welke gelegenheden kunt u een zaal reserveren?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-10">
            De privézaal van Chopras is geschikt voor uiteenlopende gelegenheden, van een vergaderzaal huren Den Haag met inbegrepen catering tot een volledig bruiloftsdiner. Elk evenement krijgt dezelfde aandacht en hetzelfde verse eten uit de keuken die elke dag opnieuw begint met het malen van specerijen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link
              href={`${base}/bruiloft-catering-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Bruiloft</p>
              <p className="font-body text-[#1A1A1A]/70">Nikah-recepties, walima-diners en trouwfeesten voor 25 tot 80 gasten</p>
            </Link>
            <Link
              href={`${base}/indian-birthday-catering-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Verjaardag</p>
              <p className="font-body text-[#1A1A1A]/70">Verjaardagsdiners en feesten met authentiek Indiaas buffet of bediend diner</p>
            </Link>
            <Link
              href={`${base}/corporate-events-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Zakelijk</p>
              <p className="font-body text-[#1A1A1A]/70">Bedrijfsdiners, teamvieringen en zakelijke bijeenkomsten tot 80 gasten</p>
            </Link>
            <Link
              href={`${base}/diwali-dinner-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Diwali</p>
              <p className="font-body text-[#1A1A1A]/70">Diwali-diners en festiviteiten met een volledig Indiaas feestmenu</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Halal + proof - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Volledig halal gecertificeerd. Geen uitzonderingen.
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
            Halal bij Chopras Indian Restaurant is geen menu-optie. Het is de gehele keuken. Elke vleesleverancier is halal gecertificeerd. Elk gerecht is halal. Er is geen niet-halal vlees aanwezig op de locatie, dus er is geen risico op kruisbesmetting. Uw gasten eten met vertrouwen. Geen vragen, geen twijfels.
          </p>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
            Voor een evenement van 25 tot 80 gasten is dit niet vanzelfsprekend. Veel zalen en cateraars in Den Haag bieden een halal optie aan, maar bereiden in dezelfde keuken ook niet-halal vlees. Bij Chopras is dat niet het geval. Volledig halal van begin tot eind.
          </p>
          <p className="font-body text-white/85 text-lg leading-relaxed">
            Chopras Indian Restaurant heeft 4,9 sterren op Google van meer dan 800 beoordelingen. Geen enkel ander Indiaas restaurant in Den Haag combineert die beoordeling met dat volume. Hoge sterren met weinig reviews zeggen weinig. Chopras heeft beide.
          </p>
        </div>
      </section>

      {/* Section 5: Hoe werkt het */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Hoe werkt zaal huren met catering bij Chopras?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            Geen ingewikkelde pakketten, geen verborgen kosten. U neemt contact op, wij bespreken uw wensen en sturen binnen twee werkdagen een vrijblijvende offerte. Zo werkt het in de praktijk.
          </p>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] flex items-center justify-center text-white font-semibold text-sm">
                1
              </div>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <strong>Neem contact op</strong> via ons{' '}
                <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  contactformulier
                </Link>{' '}
                of bel ons op +31 6 30645930. Vertel ons de datum, het aantal gasten, de gewenste opstelling en eventuele dieetwensen.
              </p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] flex items-center justify-center text-white font-semibold text-sm">
                2
              </div>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <strong>Wij stellen samen met u een menu op maat samen</strong> op basis van uw gelegenheid, de voorkeur van uw gasten en uw budget. Buffet, bediend diner of een combinatie. Alles is bespreekbaar.
              </p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] flex items-center justify-center text-white font-semibold text-sm">
                3
              </div>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <strong>Op de dag zelf zorgen wij voor de volledige uitvoering.</strong> Opstelling, bereiding, bediening en afronding. U staat die dag niet na te denken over het eten of de logistiek. Dat is ons werk.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              Vrijblijvende Offerte Aanvragen
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: GEO Block */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Kan ik een zaal huren bij Chopras Indian Restaurant in Den Haag?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Ja. Chopras Indian Restaurant op{' '}
            <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              Leyweg 986 in Den Haag
            </Link>{' '}
            biedt een private zaal voor 25 tot 80 gasten, inclusief volledig halal Indiaas catering op maat. De keuken is halal gecertificeerd en bereidt elke dag met vers gemalen specerijen rechtstreeks uit India. Beoordeeld met 4,9 sterren op Google van meer dan 800 gasten. Geschikt voor verjaardagen, bruiloften, bedrijfsdiners en andere evenementen. Bekijk onze{' '}
            <Link href={`${base}/feestzaal-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              feestzaal in Den Haag
            </Link>{' '}
            of vraag direct een offerte aan. Open dinsdag tot en met zondag vanaf 16:30.
          </p>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Veelgestelde vragen over zaal huren in Den Haag
          </h2>
          <FaqAccordion faqs={faqs} locale={locale} />
        </div>
      </section>

      {/* Section 8: Populaire gerechten */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Populaire gerechten voor uw evenement
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            Deze gerechten worden het vaakst gekozen bij zaal huren met catering in Den Haag. Bekijk de pagina van elk gerecht voor informatie over bereiding en herkomst. Bekijk ook ons{' '}
            <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              volledige Indiaas menu
            </Link>{' '}
            voor alle 143 gerechten verdeeld over 13 categorieen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link
              href={`${base}/biryani-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="font-body text-[#1A1A1A]/70">Saffraan basmatirijst met halal lam, kip of groenten in dum-stijl</p>
            </Link>
            <Link
              href={`${base}/tandoori-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="font-body text-[#1A1A1A]/70">Gegrild bij 400 graden Celsius in onze tandoor kleioven</p>
            </Link>
            <Link
              href={`${base}/butter-chicken-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="font-body text-[#1A1A1A]/70">Halal kip in romige tomaten- en botersaus, dagelijks vers bereid</p>
            </Link>
            <Link
              href={`${base}/dal-makhani-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="font-body text-[#1A1A1A]/70">Zwarte linzen langzaam gegaard met boter en room</p>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/catering`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              Alle Catering Opties
            </Link>
            <Link
              href={`${base}/evenementenruimte-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              Evenementenruimte Bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Final CTA - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Vraag vandaag uw vrijblijvende offerte aan
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Chopras Indian Restaurant verhuurt een private zaal in Den Haag voor 25 tot 80 gasten. Volledig halal gecertificeerd Indiaas catering inbegrepen. Beoordeeld met 4,9 sterren op Google van meer dan 800 gasten. Open dinsdag tot en met zondag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Offerte Aanvragen
            </Link>
            <Link
              href={`${base}/halal-menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Halal Menu Bekijken
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
