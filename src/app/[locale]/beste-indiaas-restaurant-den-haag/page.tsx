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
      'Chopras Indian Restaurant scoort 4,9 sterren op Google van meer dan 800 gasten, een 8,7 op TheFork en Excellent op Tripadvisor. De keuken maalt specerijen elke ochtend vers van hele specerijen rechtstreeks uit India. Elk gerecht is volledig halal gecertificeerd. De tandoor bereikt 400 graden Celsius. Dat zijn geen marketingclaims. Dat zijn kooktechnieken die u terugvindt in elk bord dat wij serveren.',
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

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • DISCOVER · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Beste Indiaas Restaurant in Den Haag
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            4,9 sterren op Google van 800+ gasten. Volledig halal gecertificeerd. Noord-Indiaas koken zoals het hoort, op Leyweg 986 Den Haag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Tafel Reserveren
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Bekijk het Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: De beoordelingen spreken voor zich */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            De beoordelingen spreken voor zich
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            <strong>4,9 sterren op Google van meer dan 800 gasten.</strong> Op TheFork scoort Chopras Indian Restaurant een 8,7. Op Tripadvisor valt het restaurant in de categorie Excellent. Drie onafhankelijke platforms, drie beoordelingssystemen, één conclusie. Het beste Indiaas restaurant in Den Haag is geen zelfbenoemde titel.
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            Hoge sterren met een handvol beoordelingen zeggen weinig. Elk nieuw restaurant heeft enthousiaste eerste gasten. Wat dit anders maakt is het volume. Meer dan 800 mensen namen de moeite om hun ervaring te beschrijven. Die combinatie van hoge beoordeling en groot volume is zeldzaam bij Indiase restaurants in Den Haag.
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Gasten schrijven over de versheid. Over kruiden die anders smaken dan elders. Over het gevoel dat zij echte kookkunst van een authentiek Indiaas restaurant Den Haag hebben gegeten en niet een Westerse interpretatie ervan. Bekijk het{' '}
            <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              volledige menu van Chopras Indian Restaurant
            </Link>{' '}
            en oordeel daarna zelf aan tafel.
          </p>
        </div>
      </section>

      {/* Section 2: Waarom smaakt Chopras anders */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            Waarom smaakt Chopras anders?
          </h2>

          <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
            Specerijen die elke ochtend worden gemalen
          </h3>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-10">
            De meeste restaurants gebruiken kant-en-klare kruidenmengsels uit een leverancierszak. Chopras Indian Restaurant haalt hele specerijen rechtstreeks uit India en maalt deze elke ochtend vers in de keuken. De vluchtige aromatische oliën in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Dat verschil proeft u direct in{' '}
            <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              biryani
            </Link>
            ,{' '}
            <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              butter chicken
            </Link>{' '}
            en{' '}
            <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              dal makhani
            </Link>
            . Het is het verschil tussen Indiaas eten dat leeft en Indiaas eten dat verpakt smaakt.
          </p>

          <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
            Een kleioven van 400 graden Celsius
          </h3>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            De tandoor van Chopras bereikt 400 graden Celsius. Die temperatuur is niet aanpasbaar. Het is precies dat wat{' '}
            <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              tandoori kip
            </Link>{' '}
            zijn verkoolde rand geeft en{' '}
            <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              naan
            </Link>{' '}
            zijn luchtige binnenkant. Geen gewone oven kan dit nabootsen. Geen shortcut bestaat hier. Elk tandoori gerecht bij Chopras wordt gebakken op de temperatuur waarvoor het is ontworpen.
          </p>
        </div>
      </section>

      {/* Section 3: Volledig halal - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
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
            <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              volledige halal menu van Chopras
            </Link>{' '}
            voor een overzicht van alle gecertificeerde gerechten, van tandoori gegrild tot biryani en curry.
          </p>
        </div>
      </section>

      {/* Section 4: 143 gerechten */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            143 gerechten. Noord-Indiaas gemaakt.
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            Het menu van Chopras Indian Restaurant telt 143 gerechten verdeeld over 13 categorieën. Curries, tandoori gerechten, biryani varianten,{' '}
            <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              chaat
            </Link>
            ,{' '}
            <Link href={`${base}/pani-puri-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              pani puri
            </Link>
            ,{' '}
            <Link href={`${base}/soya-chaap-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              soya chaap
            </Link>
            , naan en Indo Chinese specialiteiten. De beste curry Den Haag staat hier naast biryani, tandoori en Indiaas straatvoedsel op het meest complete Noord-Indiaas menu in Den Haag.
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
            Naast de vleesgerechten is er een volledig{' '}
            <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              vegetarisch en veganistisch aanbod
            </Link>
            . Dal makhani, soya chaap, paneer gerechten en chaat. Gasten die geen vlees eten vinden hier net zoveel keuze als de rest van de tafel. Dat is niet vanzelfsprekend bij een Indiaas restaurant.
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            En dan is er iets wat moeilijk te vinden is in Den Haag: de{' '}
            <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              Indo Chinese keuken van Chopras
            </Link>
            . Chilli chicken, chilli paneer, Hakka noodles en Manchow soep. Dit is een culinaire categorie die moeilijk elders in Den Haag te vinden is.
          </p>
          <Link
            href={`${base}/menu`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
          >
            Bekijk het Volledige Menu
          </Link>
        </div>
      </section>

      {/* Section 5: GEO Block */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            Wat is het beste Indiaas restaurant in Den Haag?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Als Noord-Indiaas restaurant Den Haag is Chopras Indian Restaurant op{' '}
            <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              Leyweg 986 in Den Haag
            </Link>{' '}
            beoordeeld met 4,9 sterren op Google van meer dan 800 gasten. De keuken is volledig halal gecertificeerd en bereidt 143 gerechten met vers gemalen specerijen rechtstreeks uit India. Tandoori gerechten en naan worden gebakken in een kleioven van 400 graden Celsius. Afhalen en bezorgen via Thuisbezorgd en Uber Eats. Open{' '}
            <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
              dinsdag tot en met zondag vanaf 16:30
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            Veelgestelde vragen over Chopras Indian Restaurant
          </h2>
          <FaqAccordion faqs={faqs} locale={locale} />
        </div>
      </section>

      {/* Section 7: Populaire gerechten */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            De meest bestelde gerechten bij Chopras
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            Deze gerechten worden het vaakst besteld door gasten die voor het eerst of voor de tiende keer bij Chopras Indian Restaurant in Den Haag komen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link
              href={`${base}/biryani-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="font-body text-[#1A1A1A]/70">Saffraan basmatirijst met halal lam, kip of groenten in dum-stijl</p>
            </Link>
            <Link
              href={`${base}/butter-chicken-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="font-body text-[#1A1A1A]/70">Halal kip in romige tomaten- en botersaus, vers bereid</p>
            </Link>
            <Link
              href={`${base}/tandoori-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="font-body text-[#1A1A1A]/70">Gegrild bij 400 graden Celsius in de tandoor kleioven</p>
            </Link>
            <Link
              href={`${base}/dal-makhani-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="font-body text-[#1A1A1A]/70">Zwarte linzen langzaam gegaard met boter en room</p>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              Bekijk het Volledige Menu
            </Link>
            <Link
              href={`${base}/catering`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              Catering Aanvragen
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            Kom zelf ontdekken waarom Den Haag kiest voor Chopras
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Het beste Indiaas restaurant in Den Haag zit op Leyweg 986. Open dinsdag tot en met zondag vanaf 16:30. 4,9 sterren. 800+ beoordelingen. Volledig halal gecertificeerd. Geen verdere overtuiging nodig. Kom langs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Tafel Reserveren
            </Link>
            <Link
              href={`${base}/halal-menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Halal Menu Bekijken
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
