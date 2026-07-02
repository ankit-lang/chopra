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
  const title = 'Bruiloft Catering Den Haag | Chopras Indian Restaurant'
  const description = 'Bruiloft catering Den Haag bij Chopras Indian Restaurant. Authentiek Indiaas eten voor uw trouwdag. Volledig halal. Vraag een vrijblijvende offerte aan.'
  return {
    title,
    description,
    robots: locale === 'en' ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: getLocalizedUrl(locale, 'bruiloft-catering-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'bruiloft-catering-den-haag'),
        nl: getLocalizedUrl('nl', 'bruiloft-catering-den-haag'),
        'x-default': getLocalizedUrl('en', 'bruiloft-catering-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'bruiloft-catering-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Bruiloft catering Den Haag bij Chopras Indian Restaurant' }],
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
    question: 'Hoe ver van tevoren moet ik bruiloft catering boeken?',
    answer: 'Voor een bruiloft van 25 tot 80 gasten raden wij aan om minimaal drie maanden van tevoren contact op te nemen. Dit geeft ons de ruimte om het menu op maat samen te stellen, de logistiek te plannen en ervoor te zorgen dat alles op uw trouwdag vlekkeloos verloopt.',
  },
  {
    question: 'Is de bruiloft catering van Chopras volledig halal?',
    answer: 'Ja, volledig. Chopras Indian Restaurant is volledig halal gecertificeerd. Niet alleen de kip en het lam, maar elke vleesleverancier en elk ingrediënt in onze keuken is halal. Er is geen risico op kruisbesmetting, omdat er nergens op de locatie niet-halal vlees aanwezig is.',
  },
  {
    question: 'Hoeveel gasten kan Chopras bedienen bij een bruiloft?',
    answer: 'Onze privézaal op Leyweg 986 in Den Haag biedt ruimte voor 25 tot 80 gasten. Voor bruiloften op externe locaties in Den Haag, Rijswijk, Delft en omgeving verzorgen wij ook volledige catering. Neem contact op voor een offerte op maat.',
  },
  {
    question: 'Welke gerechten zijn het meest populair bij Indiaas bruiloft catering Den Haag?',
    answer: 'De meest gevraagde gerechten zijn biryani, butter chicken, mutton rogan josh, dal makhani en tandoori gegrilde gerechten. Wij stellen altijd een gebalanceerd menu samen met zowel vegetarische als vleesgerechten, zodat alle gasten ruim keuze hebben.',
  },
  {
    question: 'Kan ik ook de feestzaal bij Chopras huren voor mijn bruiloft?',
    answer: 'Ja. De privézaal van Chopras Indian Restaurant op Leyweg 986 in Den Haag is beschikbaar voor bruiloften, nikah-recepties en trouwfeesten. U kunt de zaal combineren met ons volledige cateringpakket voor een totaaloplossing op één locatie.',
  },
]

export default function BruiloftCateringPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'bruiloft-catering-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Bruiloft Catering', item: getLocalizedUrl(locale, 'bruiloft-catering-den-haag') },
      ])} />
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
            Bruiloft Catering Den Haag
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Authentiek Indiaas eten voor uw trouwdag. Volledig halal gecertificeerd. Wij verzorgen de catering, u geniet van de dag.
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
            Bruiloft catering Den Haag die het eten serieus neemt
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            Op uw trouwdag staat alles in het teken van één moment. De locatie, de bloemen, de kleding. En dan het eten. Want uw gasten herinneren zich het eten. Niet het tafellaken. <strong>Bruiloft catering Den Haag</strong> van Chopras Indian Restaurant is gebouwd op één principe: het eten op uw trouwdag moet even goed zijn als het eten in ons restaurant aan de{' '}
            <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              Leyweg 986 in Den Haag
            </Link>
            .
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            Wij malen onze kruiden elke ochtend vers, van hele specerijen die wij rechtstreeks uit India betrekken. Niet uit een zakje. De aromatische oliën in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Dat verschil proeft u in elk gerecht dat wij voor uw bruiloft bereiden. Het is het verschil tussen Indiaas eten dat leeft en Indiaas eten dat verpakt smaakt.
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Chopras Indian Restaurant heeft een{' '}
            <Link href={`${base}/feestzaal-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              privézaal voor 25 tot 80 gasten
            </Link>{' '}
            en verzorgt ook catering op externe locaties in Den Haag, Rijswijk, Delft en omgeving. U vraagt een offerte aan. Wij doen de rest.
          </p>
        </div>
      </section>

      {/* Section 2: Menu */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Wat staat er op het bruiloftsmenu?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            Geen vast pakket waar u in past. Wij stellen het menu samen op basis van uw gasten, uw tradities en uw wensen. De onderstaande gerechten behoren tot de meest gevraagde bij{' '}
            <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              Indiaas trouwen catering Den Haag
            </Link>
            .
          </p>

          <div className="space-y-10">
            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
                Biryani voor de grote zaal
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Biryani
                </Link>{' '}
                is het middelpunt van elke Indiaase bruiloft. Saffraan basmatirijst, langzaam gegaard met halal lam, kip of groenten. Wij bereiden de biryani in traditionele dum-stijl, waarbij de pot wordt afgesloten zodat alle aroma behouden blijven. Voor 80 gasten bereiden wij dit met dezelfde zorgvuldigheid als voor een tafel van vier in ons restaurant aan de Leyweg.
              </p>
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
                Tandoori uit onze kleioven
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Onze tandoor bereikt 400 graden Celsius. Die temperatuur is niet aanpasbaar. Het is precies dat wat{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  tandoori kip
                </Link>{' '}
                zijn verkoolde rand geeft en naan zijn luchtige binnenkant. Geen gewone oven kan dit nabootsen. Op uw bruiloft serveren wij tandoori gegrilde gerechten met dezelfde kwaliteit als in het restaurant. Uw gasten merken het verschil.
              </p>
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
                Curry en dal voor iedereen aan tafel
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Butter chicken
                </Link>
                ,{' '}
                <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  mutton rogan josh
                </Link>
                ,{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  dal makhani
                </Link>{' '}
                en paneer gerechten. Elk gerecht gemaakt met kruiden die dezelfde ochtend zijn gemalen. Wij stellen altijd een gebalanceerd menu samen met vleesgerechten naast vegetarische opties, zodat elk van uw gasten ruim keuze heeft.
              </p>
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">
                Naan vers gebakken uit de oven
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Knoflook naan, boter naan, Peshwari naan. Vers gebakken in de tandoor en heet opgediend.{' '}
                <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Naan bij Chopras
                </Link>{' '}
                is geen bijgerecht. Het is onderdeel van de maaltijd. Brood dat koud of zacht is, verrraadt de rest van het eten. Bij ons komt het vers uit de oven aan tafel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Halal & kwaliteit - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Volledig halal gecertificeerd. Zonder uitzondering.
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
            Halal bij Chopras Indian Restaurant is geen menu-optie. Het is de gehele keuken. Elke vleesleverancier is halal gecertificeerd. Elk gerecht is halal. Er is geen risico op kruisbesmetting, omdat er nergens op de locatie niet-halal vlees aanwezig is.
          </p>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
            Voor halal bruiloft catering Den Haag is dit niet vanzelfsprekend. Veel restaurants bieden een halal optie, maar bereiden in dezelfde keuken ook niet-halal vlees. Bij Chopras is dat niet het geval. Uw gasten eten met vertrouwen. Geen vragen. Geen twijfels.
          </p>
          <p className="font-body text-white/85 text-lg leading-relaxed">
            Wij hebben 4,9 sterren op Google van meer dan 800 beoordelingen. Geen enkel ander Indiaas restaurant in Den Haag combineert die beoordeling met dat volume. Hoge sterren met weinig reviews zeggen weinig. Chopras heeft beide.
          </p>
        </div>
      </section>

      {/* Section 4: Hoe het werkt */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Hoe werkt bruiloft catering bij Chopras?
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
                of bel ons op +31 6 30645930. Vertel ons de datum, het aantal gasten en uw voorkeur voor locatie en dieetwensen.
              </p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] flex items-center justify-center text-white font-semibold text-sm">
                2
              </div>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <strong>Wij stellen samen met u een menu op maat samen</strong> op basis van uw tradities, dieetwensen en budget. Nikah catering Den Haag, walima-diner, receptie of een andere viering. Alles is bespreekbaar.
              </p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] flex items-center justify-center text-white font-semibold text-sm">
                3
              </div>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <strong>Op de dag zelf zorgen wij voor de volledige uitvoering.</strong> Bereiding, transport, opstelling en servering. U staat die dag niet na te denken over het eten. Dat is ons werk.
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

      {/* Section 5: GEO Block */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Doet Chopras Indian Restaurant bruiloft catering in Den Haag?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Ja. Chopras Indian Restaurant op{' '}
            <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              Leyweg 986 in Den Haag
            </Link>{' '}
            verzorgt bruiloft catering voor 25 tot 80 gasten. De keuken is volledig halal gecertificeerd en bereidt elke dag met vers gemalen specerijen rechtstreeks uit India. Wij verzorgen nikah-recepties, walima-diners en trouwfeesten in onze eigen privézaal of op externe locaties in{' '}
            <Link href={`${base}/indian-restaurant-rijswijk`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
              Rijswijk
            </Link>
            , Delft en omgeving. Beoordeeld met 4,9 sterren op Google van meer dan 800 gasten. Open dinsdag tot en met zondag vanaf 16:30.
          </p>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Veelgestelde vragen over bruiloft catering
          </h2>
          <FaqAccordion faqs={faqs} locale={locale} />
        </div>
      </section>

      {/* Section 7: Populaire gerechten */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Populaire bruiloftsgerechten bij Chopras
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            Deze gerechten worden het vaakst gekozen voor Indiase bruiloft catering in Den Haag. Bekijk de pagina van elk gerecht voor informatie over bereiding en herkomst van de ingrediënten.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link
              href={`${base}/biryani-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="font-body text-[#1A1A1A]/70">Saffraan basmatirijst met halal lam, kip of groenten</p>
            </Link>
            <Link
              href={`${base}/tandoori-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="font-body text-[#1A1A1A]/70">Gegrild bij 400 graden Celsius in kleioven</p>
            </Link>
            <Link
              href={`${base}/butter-chicken-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="font-body text-[#1A1A1A]/70">Halal kip in romige tomaten- en botersaus</p>
            </Link>
            <Link
              href={`${base}/dal-makhani-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="font-body text-[#1A1A1A]/70">Langzaam gegaard met boter en room</p>
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
              href={`${base}/feestzaal-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              Feestzaal Huren Den Haag
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            Vraag vandaag uw vrijblijvende offerte aan
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Chopras Indian Restaurant verzorgt bruiloft catering Den Haag voor 25 tot 80 gasten. Volledig halal gecertificeerd. Vers bereid. Beoordeeld met 4,9 sterren op Google van meer dan 800 gasten. Open dinsdag tot en met zondag.
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
