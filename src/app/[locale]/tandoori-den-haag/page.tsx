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

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Is tandoori kip bij Chopras halal gecertificeerd?',
    answer: 'Ja. Elk tandoori gerecht bij Chopras is volledig halal gecertificeerd. Alle kip en lam zijn uitsluitend afkomstig van halal-gecertificeerde leveranciers. Er is geen niet-halal vlees aanwezig in de keuken. De certificering omvat elk ingrediënt, elke leverancier en elk gerecht dat wordt geserveerd.',
  },
  {
    question: 'Wat is het verschil tussen tandoori kip en chicken tikka?',
    answer: 'Tandoori kip is een hele of halve kip, gemarineerd en aan het bot bereid in de tandoor. Chicken tikka gebruikt stukken kip zonder bot, gemarineerd in dezelfde yoghurt en specerijen. Beide worden bereid op dezelfde 400-graden Celsius hitte. Chicken tikka is gemakkelijker te eten en vormt de basis voor butter chicken bij Chopras.',
  },
  {
    question: 'Kan ik tandoori gerechten laten bezorgen in Den Haag?',
    answer: 'Ja. Chopras is beschikbaar op Thuisbezorgd en Uber Eats voor bezorging in het grootste deel van Den Haag binnen een straal van 5 km vanaf Leyweg 986. Tandoori gerechten gaan uitstekend mee - de gerookte korst behoudt zijn textuur tijdens transport en de kruidendiepte wordt niet aangetast door verpakking.',
  },
  {
    question: 'Marineert Chopras de kip echt een nacht van tevoren?',
    answer: 'Ja. De kip voor chicken tikka en tandoori gerechten bij Chopras wordt gemarineerd vanaf de avond voor de service, niet een uur van tevoren. De yoghurtmarinade penetreert het vlees diep gedurende de nacht, waardoor de smaak door het hele gerecht consistent is en niet alleen op het oppervlak zit.',
  },
  {
    question: 'Welke andere gerechten uit de tandoor zijn beschikbaar bij Chopras?',
    answer: 'De tandoor bij Chopras produceert seekh kebab van gemalen halal lam, paneer tikka voor vegetariërs, alle soorten naanbrood en tandoori kip. Naan wordt direct tegen de kleienwand van de oven gebakken, wat het zijn karakteristieke blaarvorming en lichte rand geeft die in een gewone oven niet te bereiken is.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'Is tandoori chicken at Chopras halal certified?',
    answer: 'Yes. Every tandoori dish at Chopras is fully halal certified. All chicken and lamb are sourced exclusively from halal-certified suppliers. There is no non-halal meat anywhere in the kitchen. The certification covers every ingredient, every supplier, and every dish served.',
  },
  {
    question: 'What is the difference between tandoori chicken and chicken tikka?',
    answer: 'Tandoori chicken is a whole or half chicken, marinated and cooked on the bone in the tandoor. Chicken tikka uses boneless chicken pieces marinated in the same yogurt and spice blend. Both are cooked at the same 400-degree Celsius heat. Chicken tikka is easier to eat and serves as the base for butter chicken at Chopras.',
  },
  {
    question: 'Can I order tandoori dishes for delivery in Den Haag?',
    answer: 'Yes. Chopras is available on Thuisbezorgd and Uber Eats for delivery across most of Den Haag within a 5km radius of Leyweg 986. Tandoori dishes travel well - the charred exterior holds its texture during transit and the spice depth is not affected by packaging.',
  },
  {
    question: 'Does Chopras really marinate the chicken overnight?',
    answer: 'Yes. The chicken for chicken tikka and tandoori dishes at Chopras is marinated from the evening before service, not for an hour beforehand. The overnight yogurt marinade penetrates the meat deeply, so the flavour is consistent throughout rather than sitting only on the surface.',
  },
  {
    question: 'What other dishes come from the tandoor at Chopras?',
    answer: 'The tandoor at Chopras produces seekh kebab from minced halal lamb, paneer tikka for vegetarians, all naan bread varieties, and tandoori chicken. Naan is baked directly against the clay wall of the oven, which gives it its characteristic blistered surface and slight char on the edges that a conventional oven cannot replicate.',
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Tandoori in Den Haag | Chopras Indian Restaurant',
    nl: 'Tandoori in Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Authentic tandoori Den Haag at Chopras Indian Restaurant. Chicken tikka and seekh kebab from our clay oven. Halal certified. Order online or dine in.',
    nl: 'Authentieke tandoori Den Haag bij Chopras Indian Restaurant. Chicken tikka en seekh kebab uit kleioven. Halal gecertificeerd. Bestel online of dine in.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'tandoori-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'tandoori-den-haag'),
        nl: getLocalizedUrl('nl', 'tandoori-den-haag'),
        'x-default': getLocalizedUrl('en', 'tandoori-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'tandoori-den-haag'),
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

export default function TandooriPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'tandoori-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Tandoori Den Haag', item: getLocalizedUrl(locale, 'tandoori-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Tandoori Den Haag', 'Tandoori Den Haag', 'Authentic halal tandoori dishes at Chopras Indian Restaurant Den Haag. Chicken tikka and seekh kebab from a 400-degree Celsius clay oven at Leyweg 986.', 'Authentieke halal tandoori gerechten bij Chopras Indian Restaurant Den Haag. Chicken tikka en seekh kebab uit een kleioven van 400 graden Celsius op Leyweg 986.')} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl ? 'Tandoori in Den Haag - Recht uit de Kleioven' : 'Tandoori in Den Haag - Straight from the Clay Oven'}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? '400°C. Een nacht gemarineerd. Verse specerijen elke ochtend gemalen. Volledig halal gecertificeerd op Leyweg 986, Den Haag.'
              : '400°C. Marinated overnight. Spices ground every morning. Fully halal certified at Leyweg 986, Den Haag.'}
          </p>
        </div>
      </section>

      {/* SECTION 1: What 400 Degrees Actually Means */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl ? 'Wat 400 Graden Echt Betekent voor Tandoori Kip' : 'What 400 Degrees Actually Means for Tandoori Chicken'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>De meeste kip die als tandoori wordt verkocht in Den Haag, wordt bereid in een gasoven. Gemarineerd, soms. Gekleurd met rood voedselkleurstof voor de uitstraling. Maar gebakken in een doos hete lucht op 250 graden Celsius. De verkoolde rand, de rokerige korst, de geur die de tafel bereikt voordat het bord aankomt - die combinatie vereist een temperatuur die geen enkele gewone oven kan bereiken. Dit is de reden waarom <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">authentiek halal tandoori Den Haag</Link> zo zeldzaam goed is als u het eenmaal proeft.</p>
                <p>De kleioven bij Chopras Indian Restaurant op Leyweg 986 bereikt 400 graden Celsius. Op die temperatuur verloopt de Maillard-reactie in seconden, niet in minuten. De yoghurtmarinade op het kipoppervlak verkoolt bijna onmiddellijk en vormt een gekarameliseerde korst die het vocht insluit, terwijl de intensieve stralingswarmte van de kleienwanden het vlees vanuit alle richtingen tegelijkertijd gaart. <strong>Er bestaat geen manier om dit te repliceren bij lagere temperaturen.</strong> Er is geen alternatieve route.</p>
                <p>Het klei zelf speelt ook een rol. In tegenstelling tot metaal is klei een slechte warmtegeleider - het houdt warmte vast en straalt die zachtjes en gelijkmatig uit, zoals alleen een materiaal kan dat tweeduizend jaar voor dit doel is gebruikt. Chopras stookt de tandoor uren voor de eerste gast aankomt. Elke chicken tikka en seekh kebab die die avond de keuken verlaat, is bereid op de temperatuur waarvoor het gerecht is bedacht. Lees waarom Chopras wordt erkend als het <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:underline">beste Indiaas restaurant in Den Haag</Link> op basis van 800+ Google-recensies.</p>
              </>
            ) : (
              <>
                <p>Most chicken sold as tandoori in Den Haag is cooked in a gas oven. Marinated, sometimes. Coloured with red food dye for appearances. But cooked in a box of hot air at 250 degrees Celsius. The char that defines real tandoori - the scorched edge, the smoky crust, the smell that reaches the table before the plate does - requires a temperature that no conventional oven can reach. This is why <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">authentic halal tandoori Den Haag</Link> is so rare and so immediately recognisable when you find it.</p>
                <p>The clay oven at Chopras Indian Restaurant on Leyweg 986 reaches 400 degrees Celsius. At that temperature, the Maillard reaction occurs in seconds, not minutes. The yogurt marinade on the chicken surface scorches almost immediately, creating a caramelised crust that seals in moisture while the intense radiant heat from the clay walls cooks the meat from every direction simultaneously. <strong>There is no way to replicate this at lower temperatures.</strong> No workaround exists.</p>
                <p>The clay itself matters. Unlike metal, clay is a poor conductor of heat - it holds and radiates warmth gently and evenly, the way only a material used for this purpose for two thousand years can. Chopras fires the tandoor hours before the first guest arrives. Every chicken tikka Den Haag and seekh kebab that leaves the kitchen that night has been cooked at the temperature it was designed for. Read why Chopras is recognised as the <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:underline">best Indian restaurant in Den Haag</Link> across 800+ Google reviews.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: Tandoori Dishes on Our Menu */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6">
            {isNl ? 'Tandoori Gerechten op Ons Menu' : 'Tandoori Dishes on Our Menu'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-4 mb-8">
            {isNl ? (
              <p>Elk tandoori gerecht bij Chopras is <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">volledig halal gecertificeerd</Link> en vers bereid bij elke bestelling. De kip wordt de avond van tevoren gemarineerd. Het lam voor de seekh kebab wordt elke ochtend vers gemalen met verse specerijen. Paneer tikka wordt dagelijks vers bereid. Er zijn geen bevroren componenten in de tandoor-sectie van het Chopras-menu.</p>
            ) : (
              <p>Every tandoori dish at Chopras is <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">fully halal certified</Link> and freshly prepared to order. The chicken is marinated the night before. The lamb for seekh kebab is ground fresh each morning with fresh spices. Paneer tikka is made fresh daily. There are no frozen components in the tandoor section of the Chopras menu.</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                name: 'Chicken Tikka',
                price: '€16.50',
                desc: isNl
                  ? 'Stukken kip zonder bot, 24 uur gemarineerd in yoghurt met vers gemalen specerijen, direct uit de 400-graden tandoor'
                  : 'Boneless chicken pieces, marinated 24 hours in yogurt with freshly ground spices, straight from the 400-degree tandoor',
                href: '/menu',
              },
              {
                name: 'Seekh Kebab',
                price: '€17.50',
                desc: isNl
                  ? 'Gemalen halal lam met verse gember, knoflook en specerijen, geroosterd op metalen pennen in de kleioven'
                  : 'Minced halal lamb with fresh ginger, garlic and spices, grilled on metal skewers in the clay oven',
                href: '/menu',
              },
              {
                name: 'Paneer Tikka',
                price: '€15.50',
                desc: isNl
                  ? 'Verse paneer gemarineerd in yoghurt en specerijen, geroosterd in de tandoor - het beste vegetarische tandoori gerecht'
                  : 'Fresh paneer marinated in yogurt and spices, grilled in the tandoor - the finest vegetarian tandoori option',
                href: '/blog/vegetarian-indian-food-den-haag',
              },
              {
                name: isNl ? 'Tandoori Naan' : 'Tandoori Naan',
                price: '€3.50',
                desc: isNl
                  ? 'Platbrood gebakken direct tegen de kleienwand van de tandoor - blaasvorming, lichte rand, de authentieke versie'
                  : 'Flatbread baked directly against the clay wall of the tandoor - blistered, lightly charred, the authentic version',
                href: '/naan-den-haag',
              },
            ].map((item) => (
              <div key={item.name} className="bg-[#F7F8FC] rounded-xl p-5 border-l-4 border-[#D4AF37]">
                <h3 className="font-vibes text-lg text-[#C7A348] mb-1">
                  <Link href={`${base}${item.href}`} className="text-[#D4AF37] hover:underline">{item.name}</Link> - {item.price}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

      {/* SECTION 3: Why the Marinade Starts the Night Before */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl ? 'Waarom de Marinade de Avond Ervoor Begint' : 'Why the Marinade Starts the Night Before'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>De tandoor geeft de hitte. De marinade geeft alles wat daarna volgt. De twee zijn onafscheidelijk, en de marinade bij Chopras Indian Restaurant begint de avond voor de service, niet een uur ervoor. Dit is geen marketingclaim. Het is een keukeneis om het juiste resultaat te bereiken.</p>
                <p>Chicken tikka bij Chopras wordt een nacht gemarineerd in volle yoghurt met verse gember, knoflook, rode chili, kurkuma en een masalamelange die in eigen huis wordt gemalen van hele specerijen die rechtstreeks uit India worden geïmporteerd. De yoghurt is niet decoratief. Melkzuur in yoghurt denatureert de eiwitten op het kipoppervlak en opent de vezels, zodat de specerijen diep in het vlees kunnen doordringen in plaats van alleen op het oppervlak te blijven. Bekijk het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline">volledige Noord-Indiase menu bij Chopras</Link> om te zien hoe de tandoori gerechten naast de curryselectie staan.</p>
                <p>Wanneer de gemarineerde kip de 400-graden tandoor binnengaat, is het kruidenprofiel al aanwezig door het hele stuk vlees. Het vuur werkt dan op de buitenkant. Het resultaat is kip die van buiten rokerig en verkoold is, door en door gekruid, en van binnen sappig - drie kwaliteiten die moeilijk afzonderlijk te bereiken zijn en bijna onmogelijk samen zonder zowel de juiste voorbereiding als de juiste temperatuur. Chopras serveert dit elke avond van dinsdag tot en met zondag vanaf 16:30, naast <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:underline">biryani Den Haag</Link> en het volledige curry-menu.</p>
              </>
            ) : (
              <>
                <p>The tandoor provides the fire. The marinade provides everything that follows. The two are inseparable, and the marinade at Chopras Indian Restaurant begins the evening before service, not an hour beforehand. This is not a marketing claim. It is a kitchen requirement for the outcome to be correct.</p>
                <p>Chicken tikka at Chopras is marinated overnight in full-fat yogurt with fresh ginger, garlic, red chilli, turmeric, and a masala blend ground in-house from whole spices sourced directly from India. The yogurt is not cosmetic. Lactic acid in yogurt denatures the surface proteins of the chicken and opens the fibres, allowing the spices to penetrate deep into the meat rather than resting on the surface alone. See the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline">full North Indian menu at Chopras</Link> to see how the tandoori dishes sit alongside the curry selection.</p>
                <p>By the time the marinated chicken enters the 400-degree tandoor, the spice profile is already present throughout the entire piece. The fire then works on the outside. The result is chicken that is smoky and charred at the exterior, deeply spiced throughout, and moist at the core - three qualities that are difficult to achieve in isolation. Almost impossible to achieve together without both the correct preparation and the correct temperature. Chopras serves this every evening Tuesday to Sunday from 16:30, alongside <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:underline">biryani Den Haag</Link> and the full curry menu.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#1B2B5E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-white mb-8">
            {isNl
              ? 'Waar Vind Ik Authentieke Tandoori Gerechten in Den Haag?'
              : 'Where Can I Find Authentic Tandoori Dishes in Den Haag?'}
          </h2>
          <div className="text-white/90 text-lg leading-relaxed">
            {isNl ? (
              <p>Authentieke tandoori Den Haag vindt u bij Chopras Indian Restaurant, Leyweg 986, 2545 GW Den Haag, open van dinsdag tot en met zondag van 16:30 tot 22:30. De kleioven bereikt 400 graden Celsius - de enige temperatuur waarbij chicken tikka en seekh kebab hun karakteristieke rokerige korst ontwikkelen. Beoordeeld met 4,9 sterren op basis van 800+ Google-recensies. Alle tandoori gerechten zijn <Link href={`${base}/halal-food-den-haag`} className="text-[#C7A348] hover:underline font-semibold">volledig halal gecertificeerd</Link> en een nacht van tevoren gemarineerd. <Link href={`${base}/contact`} className="text-[#C7A348] hover:underline font-semibold">Reserveer een tafel</Link> of bestel online.</p>
            ) : (
              <p>Authentic tandoori Den Haag is at Chopras Indian Restaurant, Leyweg 986, 2545 GW Den Haag, open Tuesday to Sunday from 16:30 to 22:30. The clay oven reaches 400 degrees Celsius - the only temperature at which chicken tikka and seekh kebab develop their characteristic smoky crust. Rated 4.9 stars from 800+ Google reviews. All tandoori dishes are <Link href={`${base}/halal-food-den-haag`} className="text-[#C7A348] hover:underline font-semibold">fully halal certified</Link> and marinated overnight. <Link href={`${base}/contact`} className="text-[#C7A348] hover:underline font-semibold">Reserve a table</Link> or order online.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Tandoori' : 'Frequently Asked Questions About Tandoori'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA / Visit */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl
              ? 'Bezoek Chopras voor Tandoori in Den Haag'
              : 'Visit Chopras for Tandoori in Den Haag'}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Authentieke biryani Den Haag' : 'Authentic biryani Den Haag'}</p>
            </Link>
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Butter chicken Den Haag bij Chopras' : 'Butter chicken Den Haag at Chopras'}</p>
            </Link>
            <Link href={`${base}/naan-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Naan</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Tandoori naan Den Haag' : 'Tandoori naan Den Haag'}</p>
            </Link>
            <Link href={`${base}/indian-food-delivery-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Bezorging' : 'Delivery'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas eten bezorgen Den Haag' : 'Indian food delivery Den Haag'}</p>
            </Link>
            <Link href={`${base}/mutton-rogan-josh-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Lam Curry' : 'Lamb Curry'}</p>
              <p className="text-[#1B2B5E] font-semibold">Mutton Rogan Josh Den Haag</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Catering</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas catering Den Haag voor uw evenement' : 'Indian catering Den Haag for your event'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {isNl ? (
                <>Bekijk het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige menu</Link> of <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">maak een reservering</Link>.</>
              ) : (
                <>View the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full menu</Link> or <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">book a table at Chopras Indian Restaurant Den Haag</Link>.</>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
