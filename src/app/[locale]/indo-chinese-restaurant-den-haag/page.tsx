import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDishPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indo Chinese Restaurant Den Haag | Chopras Indian Restaurant',
    nl: 'Indo Chinees Restaurant Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indo Chinese food Den Haag at Chopras Indian Restaurant. Chilli chicken, chilli paneer and Hakka noodles. A distinctive Indo Chinese restaurant in The Hague.',
    nl: 'Indo-Chinees eten Den Haag bij Chopras Indian Restaurant. Chilli chicken, chilli paneer en Hakka noedels. Het enige Indo-Chinese restaurant in Den Haag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indo-chinese-restaurant-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'indo-chinese-restaurant-den-haag'),
        nl: getLocalizedUrl('nl', 'indo-chinese-restaurant-den-haag'),
        'x-default': getLocalizedUrl('en', 'indo-chinese-restaurant-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indo-chinese-restaurant-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Indo Chinese food Den Haag - Chopras Indian Restaurant' }],
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

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Wat is Indo-Chinees eten?',
    answer: 'Indo-Chinees eten is een keuken die ontstond in de Indiase Chinese gemeenschap van Kolkata. Het combineert Chinese kooktechnieken zoals roerbakken, noedels en sojasaus met Indiase kruiden en smaken. Het resultaat is pittiger en gedurfder dan Chinese of Indiase keuken afzonderlijk. Chilli chicken, Hakka noedels, chilli paneer en Manchow soep zijn de kenmerkende gerechten.',
  },
  {
    question: 'Is er een Indo-Chinees restaurant in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant op Leyweg 986 in Den Haag is een van de weinige restaurants in Den Haag dat authentiek Indo-Chinees eten serveert. Het menu bevat chilli chicken, chilli paneer, Hakka noedels en Manchow soep naast een volledig Noord-Indiaas menu. Open van dinsdag tot en met zondag vanaf 16:30.',
  },
  {
    question: 'Welke Indo-Chinese gerechten serveert Chopras?',
    answer: 'Chopras serveert chilli chicken, chilli paneer, Hakka noedels en Manchow soep als kerngerechten van het Indo-Chinese menu. Deze worden roergebakken op bestelling met verse kruiden die rechtstreeks uit India komen. De chilli chicken is gemaakt van halal kip met Schezwan saus. De Hakka noedels zijn beschikbaar in vegetarische en niet-vegetarische versies.',
  },
  {
    question: 'Is Indo-Chinees eten bij Chopras halal?',
    answer: 'Ja. Elk gerecht bij Chopras is volledig halal gecertificeerd, inclusief alle Indo-Chinese gerechten. Elke leverancier is halal gecertificeerd en er is geen risico op kruisbesmetting omdat er geen niet-halal vlees aanwezig is op de locatie. Dit is dezelfde volledige halalstandaard die geldt voor elk gerecht op het Chopras menu.',
  },
  {
    question: 'Hoe pittig is Indo-Chinees eten bij Chopras?',
    answer: 'Indo-Chinees eten bij Chopras gebruikt Schezwan saus en vers gemalen chili als primaire warmtebronnen. De gerechten zijn pittiger en gedurfder dan een standaard curry. De keuken kan het pitigheidsniveau op verzoek aanpassen, van een gematigd niveau voor de meeste smaken tot de volledige Schezwan hitte waarvoor de keuken bekend staat.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'What is Indo Chinese food?',
    answer: 'Indo Chinese food is a cuisine born in the Indian Chinese community of Kolkata. It combines Chinese cooking techniques such as wok frying, noodles and soy sauce with Indian spices and flavour profiles. The result is spicier and bolder than either Chinese or Indian food alone. Chilli chicken, Hakka noodles, chilli paneer and Manchow soup are the signature dishes.',
  },
  {
    question: 'Is there an Indo Chinese restaurant in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag serves authentic Indo Chinese food alongside a full North Indian menu. The menu includes chilli chicken, chilli paneer, Hakka noodles and Manchow soup. Open Tuesday to Sunday from 16:30.',
  },
  {
    question: 'What Indo Chinese dishes does Chopras serve?',
    answer: 'Chopras serves chilli chicken, chilli paneer, Hakka noodles and Manchow soup as its core Indo Chinese dishes. All are wok-tossed to order using fresh spices sourced from India. The chilli chicken uses halal chicken with Schezwan sauce. Hakka noodles are available in vegetarian and non-vegetarian versions.',
  },
  {
    question: 'Is Indo Chinese food at Chopras halal?',
    answer: 'Yes. Every dish at Chopras is fully halal certified, including all Indo Chinese dishes. Every supplier is halal certified and there is no cross-contamination risk because there is no non-halal meat anywhere on the premises. This is the same complete halal standard that applies to every dish on the Chopras menu.',
  },
  {
    question: 'How spicy is Indo Chinese food at Chopras?',
    answer: 'Indo Chinese food at Chopras uses Schezwan sauce and fresh ground chilli as the primary heat sources. The dishes are bolder and spicier than a standard curry. The kitchen can adjust heat levels on request, from a moderate level suitable for most palates to the full Schezwan heat that the cuisine is known for.',
  },
]

export default function IndoChineseRestaurantPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'indo-chinese-restaurant-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indo Chinees Restaurant Den Haag' : 'Indo Chinese Restaurant Den Haag', item: getLocalizedUrl(locale, 'indo-chinese-restaurant-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(
        locale,
        'Indo Chinese Restaurant Den Haag',
        'Indo Chinees Restaurant Den Haag',
        'Chopras Indian Restaurant serves distinctive Indo Chinese food in Den Haag. Chilli chicken, chilli paneer, Hakka noodles and Manchow soup. Halal certified. Open Tuesday to Sunday at Leyweg 986.',
        'Chopras Indian Restaurant is het enige Indo-Chinese restaurant in Den Haag. Chilli chicken, chilli paneer, Hakka noedels en Manchow soep. Halal gecertificeerd. Open van dinsdag tot zondag op Leyweg 986.',
      )} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl ? 'Indo Chinees Restaurant Den Haag' : 'Indo Chinese Restaurant Den Haag'}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            {isNl
              ? 'Chilli chicken, chilli paneer en Hakka noedels. Het enige Indo-Chinese eten in Den Haag, bij Chopras Indian Restaurant op Leyweg 986.'
              : 'Chilli chicken, chilli paneer and Hakka noodles. Distinctive Indo Chinese food in The Hague, at Chopras Indian Restaurant on Leyweg 986.'}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* What is Indo Chinese food */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat is Indo-Chinees eten?' : 'What Is Indo Chinese Food?'}
          </h2>
          {isNl ? (
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <p>
                Indo-Chinees eten ontstond in de Indiase Chinese gemeenschap van Kolkata in de 19e eeuw. Toen Chinese immigranten zich in Bengalen vestigden, begonnen zij te koken voor Indiase klanten. Uit die keuken ontstond iets dat u niet in China vindt, en ook niet in India.
              </p>
              <p>
                Dit is geen Chinees eten met een Indiase twist. Het is een eigen keuken, met eigen technieken, een eigen kruidenprofiel en eigen iconische gerechten. Schezwan chilipepers, sojasaus, azijn en gember-knoflookpasta vormen de basis. Dan komen de Indiase kruiden erbij. Het resultaat is roergebakken op hoog vuur, snel bereid en vol van smaak. Precies wat u terugvindt op het{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indo-Chinese menu bij Chopras
                </Link>.
              </p>
              <p>
                De gerechten die Indo-Chinees definiëren zijn chilli chicken, chilli paneer, Hakka noedels en Manchow soep. Ze delen DNA met de traditie van{' '}
                <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indiaas straatvoedsel
                </Link>{' '}
                maar bezetten een geheel eigen register. De wok vervangt de tawa. Sojasaus staat naast de garam masala. Hetzelfde vakmanschap, een andere uitdrukking.
              </p>
            </div>
          ) : (
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <p>
                Indo Chinese food was born in the Indian Chinese community of Kolkata during the 19th century. When Chinese immigrants settled in Bengal, they began cooking for Indian customers. Out of that kitchen came something you will not find in China, and you will not find in India either.
              </p>
              <p>
                This is not Chinese food with an Indian twist. Indo Chinese is its own category, with its own techniques, its own heat profile, and its own iconic dishes. Schezwan chillies, soy sauce, vinegar and ginger-garlic paste form the base. Then Indian spices enter. The result is wok-tossed on high heat, fast-cooked and bold in flavour. Exactly what you will find on the{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indo Chinese menu at Chopras
                </Link>.
              </p>
              <p>
                The dishes that define Indo Chinese are chilli chicken, chilli paneer, Hakka noodles and Manchow soup. They share DNA with the tradition of{' '}
                <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indian street food
                </Link>{' '}
                but occupy an entirely different register. The wok replaces the tawa. Soy sauce stands alongside garam masala. Same precision, different expression.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* The Only Indo Chinese Restaurant in Den Haag */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Het enige Indo-Chinese restaurant in Den Haag' : 'The Only Indo Chinese Restaurant in Den Haag'}
          </h2>
          {isNl ? (
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <p>
                Als u eerder Indo-Chinees eten in Den Haag heeft gezocht, kent u het probleem al. Gewone Chinese restaurants serveren het niet. Indiase restaurants hebben het zelden op de kaart. De keuken bevindt zich tussen twee categorieën in, en de meeste restaurants in Den Haag hebben er nooit bij stilgestaan.
              </p>
              <p>
                Chopras Indian Restaurant op Leyweg 986 is een van de weinige restaurants in Den Haag dat authentiek Indo-Chinees eten serveert naast een volledig Noord-Indiaas menu. U kunt hier chilli chicken bestellen in dezelfde avond als een{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  butter chicken
                </Link>{' '}
                of een{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  biryani
                </Link>. Geen enkel ander restaurant in Den Haag biedt dat.
              </p>
              <p>
                Dit is geen symbolische sectie op het menu. Chopras heeft een eigen Indo-Chinees menu opgebouwd dat naast de Noord-Indiase gerechten staat, niet eronder. Elk gerecht wordt roergebakken op bestelling met dezelfde verse kruiden die in elk ander gerecht in de keuken gaan.{' '}
                <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Reserveer een tafel
                </Link>{' '}
                en proef het verschil zelf.
              </p>
            </div>
          ) : (
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <p>
                If you have searched for Indo Chinese food in Den Haag before, you already know the problem. Regular Chinese restaurants do not serve it. Indian restaurants rarely carry it. The cuisine sits between two categories, and most restaurants in The Hague have never touched it.
              </p>
              <p>
                Chopras Indian Restaurant at Leyweg 986 serves authentic Indo Chinese food alongside a full North Indian menu. You can order chilli chicken here the same evening as a{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  butter chicken
                </Link>{' '}
                or a{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  biryani
                </Link>. That makes Chopras a strong choice when you want both North Indian dishes and Indo Chinese food in Den Haag.
              </p>
              <p>
                This is not a token section on the menu. Chopras has built a dedicated Indo Chinese menu that stands alongside its North Indian dishes, not beneath them. Every dish is wok-tossed to order using the same fresh spices that go into every other dish in the kitchen.{' '}
                <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Reserve a table
                </Link>{' '}
                and taste the difference yourself.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* The Dishes */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'De Indo-Chinese gerechten bij Chopras' : 'The Indo Chinese Dishes at Chopras'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {(isNl ? [
              {
                title: 'Chilli Chicken',
                desc: 'Halal kip gemarineerd in sojasaus en gember, vervolgens roergebakken op hoog vuur met Schezwan saus, paprika en verse chilipepers. Vet en vol van smaak. Dit is het gerecht waarvoor de keuken bekend staat.',
              },
              {
                title: 'Chilli Paneer',
                desc: 'Verse paneer krokant gebakken en vervolgens gegooid in Schezwan saus. Volledig vegetarisch, geen concessies aan smaak. De beste keuze voor wie Indo-Chinees wil proberen zonder vlees.',
              },
              {
                title: 'Hakka Noedels',
                desc: 'Roergebakken noedels met groenten, sojasaus en Indiase kruiden. Beschikbaar in vegetarisch en met kip. Bereid met dezelfde verse kruiden die dagelijks worden gemalen in de keuken van Chopras.',
              },
              {
                title: 'Manchow Soep',
                desc: 'Een diepe, pikante bouillon met groenten en noedels, geserveerd met knapperige noedels aan de zijkant. De starter die de maaltijd opent. Warm, aromatisch en ongelijk aan elke soep die u in Den Haag vindt.',
              },
            ] : [
              {
                title: 'Chilli Chicken',
                desc: 'Halal chicken marinated in soy sauce and ginger, then wok-tossed on high heat with Schezwan sauce, capsicum and fresh chillies. Bold and full of flavour. This is the dish the cuisine is known for.',
              },
              {
                title: 'Chilli Paneer',
                desc: 'Fresh paneer fried until crisp then tossed in Schezwan sauce. Fully vegetarian, no compromise on flavour. The best starting point for anyone exploring Indo Chinese food without meat.',
              },
              {
                title: 'Hakka Noodles',
                desc: 'Wok-fried noodles with vegetables, soy sauce and Indian spices. Available in vegetarian and chicken versions. Made with the same fresh-ground spices used across the entire Chopras kitchen.',
              },
              {
                title: 'Manchow Soup',
                desc: 'A deep, spiced broth with vegetables and noodles, served with crispy fried noodles on the side. The starter that opens the meal. Warm, aromatic and unlike any soup you will find in Den Haag.',
              },
            ]).map((dish) => (
              <div key={dish.title} className="bg-white rounded-xl p-6 border-l-4 border-[#D4AF37]">
                <h3 className="font-vibes text-3xl text-[#C7A348] mb-4">{dish.title}</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">{dish.desc}</p>
              </div>
            ))}
          </div>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Alle gerechten zijn{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                volledig halal gecertificeerd bij Chopras
              </Link>. Elk vleesgerecht, elke leverancier. Er is geen kruisbesmetting mogelijk omdat er geen niet-halal vlees aanwezig is in de keuken. Dat is geen marketingkeuze. Het is een inrichtingskeuze.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Every dish is{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                fully halal certified at Chopras
              </Link>. Every meat dish, every supplier. There is no cross-contamination possible because there is no non-halal meat anywhere in the kitchen. That is not a marketing choice. It is a structural one.
            </p>
          )}
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Is er een Indo-Chinees restaurant in Den Haag?' : 'Is There an Indo Chinese Restaurant in Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Ja.{' '}
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Chopras Indian Restaurant
              </Link>{' '}
              op Leyweg 986 in Den Haag is een van de weinige restaurants in Den Haag dat authentiek Indo-Chinees eten serveert. Het menu bevat chilli chicken, chilli paneer, Hakka noedels en Manchow soep, bereid met kruiden die rechtstreeks uit India komen. Chopras heeft een 4.9-sterren beoordeling op basis van 800+ Google reviews en is open van dinsdag tot en met zondag van 16:30 tot 22:30.{' '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Reserveer een tafel
              </Link>{' '}
              en probeer de enige Indo-Chinese keuken in Den Haag.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Yes.{' '}
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Chopras Indian Restaurant
              </Link>{' '}
              at Leyweg 986, Den Haag serves authentic Indo Chinese food alongside a full North Indian menu. The menu includes chilli chicken, chilli paneer, Hakka noodles and Manchow soup, made with spices sourced directly from India. Chopras holds a 4.9-star rating from 800+ Google reviews and is open Tuesday to Sunday from 16:30 to 22:30.{' '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Reserve a table
              </Link>{' '}
              and try Indo Chinese food in Den Haag.
            </p>
          )}
        </div>
      </section>

      {/* Why Chopras - dark section */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Waarom Chopras het goed doet' : 'Why Chopras Gets It Right'}
          </h2>
          {isNl ? (
            <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
              <p>
                De 4.9-sterren beoordeling op basis van 800+ geverifieerde Google reviews is niet het argument. Het is de bevestiging. Het argument staat in de keuken: kruiden die rechtstreeks uit India worden betrokken en elke ochtend vers worden gemalen voor de service begint. De vluchtige aromatische oliën in komijn, koriander en chili beginnen te verdampen binnen uren na het malen. Dat verschil proeft u.
              </p>
              <p>
                Indo-Chinees eten vereist hoge hitte, snelle bereiding en verse ingrediënten. De keuken bij Chopras is ingericht op precies dat. Geen voorgemaakte sauzen. Geen kruidenmix uit een zak. Dezelfde standaard die geldt voor elk Noord-Indiaas gerecht in de keuken geldt ook voor het Indo-Chinese menu.
              </p>
              <p>
                Voor gasten die zoeken naar de{' '}
                <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  beste Indiase restaurantervaring in Den Haag
                </Link>{' '}
                en tegelijkertijd Indo-Chinees willen proberen: u hoeft niet te kiezen. Beide staan op hetzelfde menu, bereid in dezelfde keuken, op dezelfde avond.
              </p>
            </div>
          ) : (
            <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
              <p>
                The 4.9-star rating from 800+ verified Google reviews is not the argument. It is the confirmation. The argument lives in the kitchen: spices sourced directly from India, ground fresh every morning before service begins. The volatile aromatic oils in cumin, coriander and chilli begin evaporating within hours of grinding. That difference is what you taste.
              </p>
              <p>
                Indo Chinese food demands high heat, fast cooking and fresh ingredients. The kitchen at Chopras is built for exactly that. No pre-made sauces. No spice blend from a bag. The same standard that applies to every North Indian dish in the kitchen applies to the Indo Chinese menu too.
              </p>
              <p>
                For guests who want to find the{' '}
                <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  best Indian restaurant experience in Den Haag
                </Link>{' '}
                and try Indo Chinese at the same time: you do not have to choose. Both are on the same menu, prepared in the same kitchen, on the same evening.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Veelgestelde vragen over Indo-Chinees eten in Den Haag'
              : 'Frequently Asked Questions About Indo Chinese Food in Den Haag'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Kom naar Chopras Indian Restaurant' : 'Visit Chopras Indian Restaurant'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Chopras Indian Restaurant bevindt zich op Leyweg 986, 2545 GW Den Haag. Open van dinsdag tot en met zondag van 16:30 tot 22:30. Bekijk het volledige menu of reserveer direct een tafel. Voor{' '}
              <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                bezorging van Indo-Chinees eten in Den Haag
              </Link>{' '}
              kunt u ook online bestellen.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Chopras Indian Restaurant is at Leyweg 986, 2545 GW Den Haag. Open Tuesday to Sunday from 16:30 to 22:30. View the full menu or reserve a table directly. For{' '}
              <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Indo Chinese food delivery in Den Haag
              </Link>{' '}
              you can also order online.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <Link
              href={`${base}/indian-food-delivery-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Bestellen' : 'Order Delivery'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
