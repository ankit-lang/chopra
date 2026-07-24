import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const title = 'Beste Indiaas Restaurant Den Haag | Chopras Indian Restaurant'
  const description =
    'Beste Indiaas restaurant Den Haag bij Chopras Indian Restaurant. Authentieke Noord-Indiaase keuken, volledig halal. Beoordeeld 4.9 sterren. Bezoek ons.'
  return {
    title,
    description,
    robots: locale === 'en' ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: getLocalizedUrl(locale, 'beste-indiaas-restaurant-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'beste-indiaas-restaurant-den-haag'),
        nl: getLocalizedUrl('nl', 'beste-indiaas-restaurant-den-haag'),
        'x-default': getLocalizedUrl('en', 'beste-indiaas-restaurant-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'beste-indiaas-restaurant-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Beste Indiaas restaurant Den Haag bij Chopras Indian Restaurant' }],
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
    question: 'Wat maakt Chopras het beste Indiaas restaurant in Den Haag?',
    answer:
      'Chopras Indian Restaurant scoort 4,9 sterren op Google van meer dan 1100 gasten, een 8,7 op TheFork en Excellent op Tripadvisor. De keuken maalt specerijen elke ochtend vers van hele specerijen rechtstreeks uit India. Elk gerecht is volledig halal gecertificeerd. De tandoor bereikt 400 graden Celsius. Dat zijn geen marketingclaims. Dat zijn kooktechnieken die u terugvindt in elk bord dat wij serveren.',
  },
  {
    question: 'Is Chopras Indian Restaurant volledig halal gecertificeerd?',
    answer:
      'Ja, volledig. Niet alleen bepaalde gerechten of bepaald vlees. Elke vleesleverancier van Chopras is halal gecertificeerd. Er is geen niet-halal vlees aanwezig op de locatie, waardoor kruisbesmetting niet mogelijk is. U eet met zekerheid, ook als u voor het eerst bij ons bent.',
  },
  {
    question: 'Hoeveel gerechten staan er op het menu van Chopras?',
    answer:
      '143 gerechten verdeeld over 13 categorieën. Curries, tandoori gerechten, biryani varianten, chaat, pani puri, soya chaap, naan en een volledige Indo Chinese kaart. Chopras is een van de weinige restaurants in Den Haag dat authentieke Indo Chinese keuken combineert met een volledig Noord-Indiaas menu.',
  },
  {
    question: 'Wanneer is Chopras Indian Restaurant open in Den Haag?',
    answer:
      'Chopras Indian Restaurant is open van dinsdag tot en met zondag, van 16:30 tot 22:30. Op maandag is het restaurant gesloten. U vindt ons op Leyweg 986, 2545 GW Den Haag. Reserveren kan via ons contactformulier of telefonisch op +31 6 30645930.',
  },
  {
    question: 'Heeft Chopras ook vegetarische en veganistische gerechten?',
    answer:
      'Ja. Het menu bevat een volledig aanbod aan vegetarische en veganistische gerechten, waaronder dal makhani, soya chaap, paneer gerechten en chaat. Soya chaap is de plantaardige specialiteit van Chopras: bereid in de tandoor op 400 graden Celsius. Gasten die geen vlees eten hebben bij Chopras net zoveel keuze als de rest van de tafel.',
  },
]

export default function BesteIndiaasPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'beste-indiaas-restaurant-den-haag'))} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
          { name: 'Beste Indiaas Restaurant', item: getLocalizedUrl(locale, 'beste-indiaas-restaurant-den-haag') },
        ])}
      />
      <JsonLd data={getFaqPageSchema(faqs)} />

      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden btn-gradient">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[1100px] h-[1100px] bg-[#0000B3]/20 rounded-full blur-[180px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
            <span className="text-white/90 text-xs font-semibold uppercase tracking-[0.2em]">
              DISCOVER · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] font-bold">
            Beste Indiaas Restaurant in Den Haag
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/90 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
          </div>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-body font-light leading-relaxed mt-6 mb-10">
            4,9 sterren op Google van 1100+ gasten. Volledig halal gecertificeerd. Noord-Indiaas koken zoals het hoort, op Leyweg 986 Den Haag.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${base}/menu`}
              className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-full font-semibold uppercase tracking-widest text-sm transition-all duration-300 min-h-[48px] backdrop-blur-[10px]"
            >
              Bekijk het Menu
            </Link>
            <Link
              href={`${base}/contact`}
              className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-full font-semibold uppercase tracking-widest text-sm transition-all duration-300 min-h-[48px] backdrop-blur-[10px]"
            >
              Tafel Reserveren
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: De beoordelingen spreken voor zich */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
            De beoordelingen spreken voor zich
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            <strong>4,9 sterren op Google van meer dan 1100 gasten.</strong> Op TheFork scoort Chopras Indian Restaurant een 8,7. Op Tripadvisor valt het restaurant in de categorie Excellent. Drie onafhankelijke platforms, drie beoordelingssystemen, één conclusie. Het beste Indiaas restaurant in Den Haag is geen zelfbenoemde titel.
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            Hoge sterren met een handvol beoordelingen zeggen weinig. Elk nieuw restaurant heeft enthousiaste eerste gasten. Wat dit anders maakt is het volume. Meer dan 1100 mensen namen de moeite om hun ervaring te beschrijven. Die combinatie van hoge beoordeling en groot volume is zeldzaam bij Indiase restaurants in Den Haag.
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Gasten schrijven over de versheid. Over kruiden die anders smaken dan elders. Over het gevoel dat zij echte kookkunst van een authentiek Indiaas restaurant Den Haag hebben gegeten en niet een Westerse interpretatie ervan. Bekijk het{' '}
            <Link href={`${base}/menu`} className="text-[#06068a] font-semibold hover:underline">
              volledige menu van Chopras Indian Restaurant
            </Link>{' '}
            en oordeel daarna zelf aan tafel.
          </p>
        </div>
      </section>

      {/* Section 2: Waarom smaakt Chopras anders */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Waarom smaakt Chopras anders?
          </h2>

          <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">
            Specerijen die elke ochtend worden gemalen
          </h3>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-10">
            De meeste restaurants gebruiken kant-en-klare kruidenmengsels uit een leverancierszak. Chopras Indian Restaurant haalt hele specerijen rechtstreeks uit India en maalt deze elke ochtend vers in de keuken. De vluchtige aromatische oliën in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Dat verschil proeft u direct in{' '}
            <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] font-semibold hover:underline">
              biryani
            </Link>
            ,{' '}
            <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] font-semibold hover:underline">
              butter chicken
            </Link>{' '}
            en{' '}
            <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] font-semibold hover:underline">
              dal makhani
            </Link>
            . Het is het verschil tussen Indiaas eten dat leeft en Indiaas eten dat verpakt smaakt.
          </p>

          <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">
            Een kleioven van 400 graden Celsius
          </h3>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            De tandoor van Chopras bereikt 400 graden Celsius. Die temperatuur is niet aanpasbaar. Het is precies dat wat{' '}
            <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] font-semibold hover:underline">
              tandoori kip
            </Link>{' '}
            zijn verkoolde rand geeft en{' '}
            <Link href={`${base}/naan-den-haag`} className="text-[#06068a] font-semibold hover:underline">
              naan
            </Link>{' '}
            zijn luchtige binnenkant. Geen gewone oven kan dit nabootsen. Geen shortcut bestaat hier. Elk tandoori gerecht bij Chopras wordt gebakken op de temperatuur waarvoor het is ontworpen.
          </p>
        </div>
      </section>

      {/* Section 3: Volledig halal - navy */}
      <section className="btn-gradient py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            Volledig halal. Geen compromissen.
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
            Halal bij Chopras Indian Restaurant is geen menu-optie. Het is de volledige keuken. Elke vleesleverancier is halal gecertificeerd. Elk gerecht is halal. Er is geen risico op kruisbesmetting, omdat er op de gehele locatie geen niet-halal vlees aanwezig is.
          </p>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
            Veel restaurants in Den Haag bieden een halal optie maar bereiden in dezelfde keuken ook niet-halal vlees. Bij Chopras is dat nooit het geval geweest. Voor de Hindoestaanse, Pakistaanse en Moslim gemeenschappen in Den Haag is dit geen detail. Het is de basis. Chopras is met dat bewustzijn opgericht en heeft het nooit gecompromitteerd.
          </p>
          <p className="font-body text-white/85 text-lg leading-relaxed">
            Bekijk het{' '}
            <Link href={`${base}/halal-menu`} className="text-white font-semibold hover:underline">
              volledige halal menu van Chopras
            </Link>{' '}
            voor een overzicht van alle gecertificeerde gerechten, van tandoori gegrild tot biryani en curry.
          </p>
        </div>
      </section>

      {/* Section 4: Hoe te bereiken */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Snel en eenvoudig te bereiken in Den Haag
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            Chopras Indian Restaurant ligt aan de{' '}
            <Link href={`${base}/contact`} className="text-[#06068a] font-semibold hover:underline">
              Leyweg 986 in Den Haag Zuid-West
            </Link>
            . Uitstekend bereikbaar met de auto en het openbaar vervoer vanuit het centrum, Scheveningen, Rijswijk en Delft.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-heading text-xl text-[#06068a] font-semibold mb-2">Met het Openbaar Vervoer</h3>
              <p className="font-body text-[#1A1A1A]/70">Tram 9, 16 en bus 21, 25 stoppen op loopafstand. Vanaf station Den Haag Centraal bent u er in 15 minuten.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-heading text-xl text-[#06068a] font-semibold mb-2">Met de Auto</h3>
              <p className="font-body text-[#1A1A1A]/70">Betaald en vrij parkeren beschikbaar in de directe omgeving van Leyweg. Eenvoudig aan te rijden vanaf A4 en A12.</p>
            </div>
          </div>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Het restaurant is geopend van dinsdag tot en met zondag van 16:30 tot 22:30. Reserveren is aanbevolen op vrijdag en in het weekend.
          </p>
        </div>
      </section>

      {/* Section 5: GEO Block */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Wat is het beste Indiaas restaurant in Den Haag?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Chopras Indian Restaurant op{' '}
            <Link href={`${base}/contact`} className="text-[#06068a] font-semibold hover:underline">
              Leyweg 986 in Den Haag
            </Link>{' '}
            is beoordeeld met 4,9 sterren op Google van meer dan 1100 gasten, een 8,7 op TheFork en Excellent op Tripadvisor. Het restaurant biedt 100% halal gecertificeerde Noord-Indiase gerechten bereid met dagelijks vers gemalen specerijen. Met een uitgebreid menu van 143 gerechten, waaronder vegetarische, veganistische en glutenvrije opties, is Chopras open van dinsdag tot en met zondag vanaf 16:30.
          </p>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
              Veelgestelde vragen over het beste Indiaas restaurant in Den Haag
            </h2>
          </div>
          <FaqAccordion faqs={faqs} locale={locale} />
        </div>
      </section>

      {/* Section 7: Interne links */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Ontdek meer van Chopras Indian Restaurant
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            Bekijk de speciale pagina&apos;s voor onze populairste gerechten en diensten:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-4 bg-[#FFFAF5] rounded-lg hover:bg-white hover:shadow-md transition-all">
              <span className="font-heading text-lg text-[#06068a] font-semibold">Butter Chicken Den Haag</span>
              <p className="font-body text-[#1A1A1A]/70 text-sm">Halal kip in romige tomatensaus</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-4 bg-[#FFFAF5] rounded-lg hover:bg-white hover:shadow-md transition-all">
              <span className="font-heading text-lg text-[#06068a] font-semibold">Biryani Den Haag</span>
              <p className="font-body text-[#1A1A1A]/70 text-sm">Saffraan basmatirijst met kip, lam of groenten</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-4 bg-[#FFFAF5] rounded-lg hover:bg-white hover:shadow-md transition-all">
              <span className="font-heading text-lg text-[#06068a] font-semibold">Tandoori Den Haag</span>
              <p className="font-body text-[#1A1A1A]/70 text-sm">Gegrild op 400 graden in de kleioven</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-4 bg-[#FFFAF5] rounded-lg hover:bg-white hover:shadow-md transition-all">
              <span className="font-heading text-lg text-[#06068a] font-semibold">Indiaas Catering Den Haag</span>
              <p className="font-body text-[#1A1A1A]/70 text-sm">Catering voor 25 tot 80 gasten</p>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-300 ease-out btn-gradient active:scale-[0.98] min-h-[48px] shadow-md"
            >
              Bekijk het Volledige Menu
            </Link>
            <Link
              href={`${base}/catering`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[#06068a] border-2 border-white text-sm font-medium uppercase tracking-wide transition-all duration-300 ease-out btn-gradient active:scale-[0.98] min-h-[48px]"
            >
              Catering Aanvragen
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA - navy */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            Kom zelf ontdekken waarom Den Haag kiest voor Chopras
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Het beste Indiaas restaurant in Den Haag zit op Leyweg 986. Open dinsdag tot en met zondag vanaf 16:30. 4,9 sterren. 1100+ beoordelingen. Volledig halal gecertificeerd. Geen verdere overtuiging nodig. Kom langs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Tafel Reserveren
            </Link>
            <Link
              href={`${base}/halal-menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Halal Menu Bekijken
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
