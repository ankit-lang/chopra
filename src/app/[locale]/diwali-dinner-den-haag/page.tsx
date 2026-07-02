import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema, getEventSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Diwali Dinner in Den Haag | Chopras Indian Restaurant',
    nl: 'Diwali Diner in Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Diwali dinner Den Haag at Chopras Indian Restaurant. Dine in or book catering for your Diwali celebration. Biryani, tandoori and dal. Book now.',
    nl: 'Diwali diner Den Haag bij Chopras Indian Restaurant. Authentiek Indiaas eten voor uw viering. Halal gecertificeerd. Reserveer tafel of catering nu.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'diwali-dinner-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'diwali-dinner-den-haag'),
        nl: getLocalizedUrl('nl', 'diwali-dinner-den-haag'),
        'x-default': getLocalizedUrl('en', 'diwali-dinner-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'diwali-dinner-den-haag'),
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

const faqsEn = [
  {
    question: 'Where can I book a Diwali dinner in Den Haag?',
    answer: 'Chopras Indian Restaurant at Leyweg 986 in Den Haag offers Diwali dinners for dine-in and catering. Rated 4.9 stars from 800+ Google reviews, fully halal certified, and open Tuesday to Sunday from 16:30. Reserve a table or call +31 6 30645930.',
  },
  {
    question: 'How far in advance should I book for Diwali dinner in Den Haag?',
    answer: 'For dine-in, reserve at least two to three weeks before Diwali. For home catering or a venue, book four weeks in advance. Diwali is one of the busiest periods at Chopras Indian Restaurant Den Haag and tables fill quickly.',
  },
  {
    question: 'Is the Diwali menu at Chopras halal certified?',
    answer: 'Yes. Every dish at Chopras Indian Restaurant Den Haag is fully halal certified. Not just selected dishes - the entire kitchen uses halal certified suppliers with no cross-contamination risk, because there is no non-halal meat on the premises at any time.',
  },
  {
    question: 'Can I book Diwali catering to my home in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant delivers Diwali catering to homes and venues across Den Haag, Rijswijk, Delft, Zoetermeer and the wider South Holland area. The minimum for home catering is six guests. Contact us at info [at] chopras.nl or call +31 6 30645930 to request a quote.',
  },
  {
    question: 'What dishes are served at the Diwali dinner at Chopras?',
    answer: 'The Diwali menu includes biryani with saffron basmati rice, mutton rogan josh, butter chicken, tandoori dishes from our 400-degree clay oven, dal makhani, fresh naan, and gulab jamun. Vegetarian and vegan options are available across every course. All dishes are halal certified.',
  },
]

const faqsNl = [
  {
    question: 'Waar kan ik een Diwali-diner boeken in Den Haag?',
    answer: 'Chopras Indian Restaurant op Leyweg 986 in Den Haag biedt Diwali-diners aan voor in het restaurant en catering. Beoordeeld met 4,9 sterren op basis van 800+ Google-recensies, volledig halal gecertificeerd, geopend dinsdag tot en met zondag vanaf 16:30. Reserveer een tafel of bel +31 6 30645930.',
  },
  {
    question: 'Hoe ver van tevoren moet ik boeken voor Diwali-diner in Den Haag?',
    answer: 'Voor in het restaurant: reserveer minstens twee tot drie weken voor Diwali. Voor catering aan huis of op locatie: boek vier weken van tevoren. Diwali is een van de drukste periodes bij Chopras Indian Restaurant Den Haag en tafels zijn snel bezet.',
  },
  {
    question: 'Is het Diwali-menu bij Chopras halal gecertificeerd?',
    answer: 'Ja. Elk gerecht bij Chopras Indian Restaurant Den Haag is volledig halal gecertificeerd. Niet alleen geselecteerde gerechten - de gehele keuken maakt gebruik van halal gecertificeerde leveranciers zonder kruisbesmettingsrisico, omdat er geen niet-halal vlees aanwezig is in het restaurant.',
  },
  {
    question: 'Kan ik Diwali-catering aan huis boeken in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant verzorgt Diwali-catering aan huis en op locatie in Den Haag, Rijswijk, Delft, Zoetermeer en de bredere regio Zuid-Holland. Het minimum voor thuiscatering is zes gasten. Neem contact op via info [at] chopras.nl of bel +31 6 30645930 voor een offerte.',
  },
  {
    question: 'Welke gerechten worden geserveerd bij het Diwali-diner bij Chopras?',
    answer: 'Het Diwali-menu omvat biryani met saffraanbasmatirijst, mutton rogan josh, butter chicken, tandoori-gerechten uit onze kleioven van 400 graden, dal makhani, verse naan en gulab jamun. Vegetarische en veganistische opties zijn beschikbaar bij elke gang. Alle gerechten zijn halal gecertificeerd.',
  },
]

export default function DiwaliDinnerPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const eventSchema = getEventSchema(isNl ? {
    name: 'Diwali Diner Den Haag bij Chopras Indian Restaurant',
    description: 'Reserveer uw Diwali-diner bij Chopras Indian Restaurant op Leyweg 986 in Den Haag. Volledig halal gecertificeerd, 4,9 sterren van 800+ recensies.',
    startDate: '2026-10-20T16:30:00',
    endDate: '2026-10-20T22:30:00',
    url: getLocalizedUrl(locale, 'diwali-dinner-den-haag'),
  } : {
    name: 'Diwali Dinner Den Haag at Chopras Indian Restaurant',
    description: 'Book your Diwali dinner at Chopras Indian Restaurant at Leyweg 986 in Den Haag. Fully halal certified, rated 4.9 stars from 800+ reviews.',
    startDate: '2026-10-20T16:30:00',
    endDate: '2026-10-20T22:30:00',
    url: getLocalizedUrl(locale, 'diwali-dinner-den-haag'),
  })

  return (
    <>
      <JsonLd data={eventSchema} />
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'diwali-dinner-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Diwali Diner' : 'Diwali Dinner', item: getLocalizedUrl(locale, 'diwali-dinner-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            {isNl ? 'Diwali-Diner in Den Haag' : 'Diwali Dinner in Den Haag'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl mb-8" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'Authentiek Indiaas eten voor het lichtfeest. Dineer in ons restaurant of boek catering voor uw Diwali-viering in Den Haag.'
              : 'Authentic Indian food for the festival of lights. Dine in our restaurant or book catering for your Diwali celebration in Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-transparent hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Reserveer Nu' : 'Book Now'}
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

      {/* Intro */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Diwali-Diner Den Haag - Eten dat bij de Gelegenheid Past' : 'Diwali Dinner Den Haag - Food That Matches the Occasion'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Diwali vraagt om een tafel die werkelijk vol staat. Niet een bord eten bij een restaurant dat toevallig Indiaas kookt. Families in Den Haag die dit feest kennen, weten het verschil. Bij Chopras Indian Restaurant op Leyweg 986 worden de kruiden elke ochtend vers gemalen. Hele specerijzaden, rechtstreeks uit India, worden voor de service gemalen. Wat u proeft is kruidenintensiteit op zijn hoogtepunt.</p>
                <p>U kunt bij ons dineren met uw familie of een volledig <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Diwali-catering voor Den Haag</Link> boeken die aan uw deur of locatie wordt bezorgd. Onze privezaal op Leyweg 986 biedt ruimte aan 25 tot 80 gasten voor grotere familievieringen. Het eten bij evenementen is precies hetzelfde als in het restaurant - dezelfde keuken, dezelfde kruiden, dezelfde standaard die Chopras 4,9 sterren van 800+ Google-recensies heeft opgeleverd.</p>
                <p>Het <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal-gecertificeerde menu</Link> bij Chopras is niet een selectie gerechten met een certificaat ernaast. Het is de volledige keuken. Elk vlees, elke leverancier, elk gerecht is halal gecertificeerd zonder uitzonderingen. Voor families die alleen eten bij volledig gecertificeerde restaurants, is dit geen kleine bijzonderheid. Het is de reden dat zij voor Diwali naar Chopras komen.</p>
              </>
            ) : (
              <>
                <p>Diwali calls for a table that is genuinely full. Not a plate of food at a restaurant that happens to cook Indian. Families in Den Haag who know this festival understand the difference. At Chopras Indian Restaurant at Leyweg 986, the kitchen prepares spices fresh every morning. Whole seeds, sourced directly from India, ground before service begins. What you taste is spice intensity at its peak.</p>
                <p>You can dine with your family in our restaurant or book a full <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Diwali catering for Den Haag</Link> delivered to your door or venue. Our private hall at Leyweg 986 seats 25 to 80 guests for larger family celebrations. The food at events is identical to what is served in the restaurant - same kitchen, same spices, same standard that has earned Chopras 4.9 stars from 800+ Google reviews.</p>
                <p>The <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal certified menu</Link> at Chopras is not a few dishes with a certificate attached. It is the entire kitchen. Every meat dish, every supplier, every plate - halal certified without exception. For families who only eat at fully certified restaurants, this is not a small detail. It is the reason they choose Chopras for Diwali.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Waar Kan Ik Diwali Vieren met Authentiek Indiaas Eten in Den Haag?'
              : 'Where Can I Celebrate Diwali with Authentic Indian Food in Den Haag?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <p>Chopras Indian Restaurant op Leyweg 986 in Den Haag verzorgt Diwali-diners voor families die het lichtfeest vieren. Met 4,9 sterren van 800+ Google-recensies en volledig halal gecertificeerd bereidt Chopras <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani</Link>, tandoori en dal van elke ochtend vers gemalen kruiden. De privezaal biedt ruimte voor maximaal 80 gasten. Dineer in het restaurant of boek <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Diwali-catering</Link> aan huis. Geopend dinsdag tot en met zondag vanaf 16:30.</p>
            ) : (
              <p>Chopras Indian Restaurant at Leyweg 986 in Den Haag serves Diwali dinner for families celebrating the festival of lights. Rated 4.9 stars from 800+ Google reviews and fully halal certified, Chopras prepares <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani</Link>, tandoori and dal from spices ground fresh each morning. The private hall seats up to 80 guests. Dine in or book <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Diwali catering</Link> for your home or venue. Open Tuesday to Sunday from 16:30.</p>
            )}
          </div>
        </div>
      </section>

      {/* The Diwali Table */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Wat Staat er op de Diwali-Tafel bij Chopras?' : 'What Is on the Diwali Table at Chopras?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Een Diwali-tafel is geen tafel met een gerecht. Het is een tafel vol. Bij Chopras begint de maaltijd met verse hapjes - <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">chaat</Link> en pani puri - waarna de hoofdgerechten komen: saffraanbiryani, mutton rogan josh met langzaam gekookte Kasjmirse kruiden, en butter chicken in een rijke tomaten-roommarinade.</p>
                <p>Onze <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">tandoori-gerechten</Link> worden gebakken in onze kleioven die 400 graden Celsius bereikt - de temperatuur die naan zijn geblakerde randen geeft en chicken tikka zijn rooksmaak. Geen conventionele oven kan dit repliceren. De naan wordt vers uit de tandoor gehaald terwijl u aan tafel zit.</p>
                <p>Voor vegetarische en veganistische gasten is het <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">volledig veganistische menu</Link> bij Chopras even uitgebreid. Soya chaap uit de tandoor, dal makhani die een nacht heeft gestoofd, en een volledig assortiment groentegerechten. Het diner sluit af met gulab jamun - traditionele Indiase zoetigheden die de maaltijd op de juiste manier afronden.</p>
              </>
            ) : (
              <>
                <p>A Diwali table is not a table with one dish. It is a table that is full. At Chopras, the meal begins with fresh starters - <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">chaat</Link> and pani puri - before the main courses arrive: saffron biryani, mutton rogan josh slow-cooked in Kashmiri spices, and butter chicken in a rich tomato and cream sauce.</p>
                <p>Our <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">tandoori dishes</Link> are cooked in our clay oven that reaches 400 degrees Celsius - the temperature that gives naan its charred edges and chicken tikka its smoky crust. No conventional oven can replicate this. The naan is pulled fresh from the tandoor while you sit at the table.</p>
                <p>For vegetarian and vegan guests, the <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">fully vegan menu</Link> at Chopras is equally extensive. Soya chaap from the tandoor, dal makhani slow-cooked overnight, and a full selection of vegetable dishes. The dinner ends with gulab jamun - traditional Indian sweets that close the meal the right way.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Dine In or Catering */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Dineer In of Boek Diwali-Catering in Den Haag' : 'Dine In or Book Diwali Catering in Den Haag'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-8">
            {isNl ? (
              <>
                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Reserveer een Tafel</h3>
                  <p>Reserveer een tafel in ons restaurant op Leyweg 986 voor uw Diwali-diner. Wij bevelen aan minimaal twee tot drie weken van tevoren te reserveren. Diwali is een van onze drukste periodes en tafels zijn snel bezet.</p>
                </div>
                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Diwali-Catering aan Huis of op Locatie</h3>
                  <p>Wilt u Diwali vieren bij u thuis of op uw eigen locatie? Chopras verzorgt het volledige feest. Alles wordt vers bereid en heet bezorgd. U nodigt uw familie uit. Wij regelen de rest. Minimaal zes gasten voor thuiscatering.</p>
                </div>
                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Privezaal voor 25 tot 80 Gasten</h3>
                  <p>Voor grotere familievieringen kunt u onze <Link href={`${base}/feestzaal-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">privezaal in Den Haag</Link> huren op Leyweg 986. De zaal biedt ruimte aan 25 tot 80 gasten en het eten wordt geserveerd vanuit dezelfde keuken als het restaurant. Geen externe cateraar, geen concessies aan kwaliteit.</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Reserve a Table</h3>
                  <p>Reserve a table at our restaurant at Leyweg 986 for your Diwali dinner. We recommend booking at least two to three weeks in advance. Diwali is one of our busiest periods and tables fill quickly.</p>
                </div>
                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Diwali Catering for Home or Venue</h3>
                  <p>Want to celebrate Diwali at your home or your own venue? Chopras delivers the full feast. Everything is prepared fresh and delivered hot. You invite your family. We handle the rest. Minimum six guests for home catering.</p>
                </div>
                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Private Hall for 25 to 80 Guests</h3>
                  <p>For larger family celebrations, our <Link href={`${base}/feestzaal-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">private event hall in Den Haag</Link> at Leyweg 986 seats 25 to 80 guests. Food is served from the same kitchen as the restaurant. No external caterer, no compromise on quality.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why Chopras */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-10 leading-[1.4]">
            {isNl ? 'Waarom de Zuid-Aziatische Gemeenschap in Den Haag Chopras Kiest' : 'Why the South Asian Community in Den Haag Chooses Chopras'}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">
                {isNl ? 'Verse Kruiden, Elke Ochtend' : 'Fresh Spices, Every Morning'}
              </h3>
              <p className="font-body text-white/80 text-lg leading-relaxed">
                {isNl
                  ? 'Chopras importeert hele specerijzaden rechtstreeks uit India en maalt ze elke ochtend vers voor de service. Komijn, kardemom en koriander bevatten vluchtige aromatische olies die binnen uren na het malen beginnen te verdampen. Het smaakresultaat is niet subtiel. De gemeenschap op Leyweg proeft het verschil direct.'
                  : 'Chopras imports whole spice seeds directly from India and grinds them fresh every morning before service. Cumin, cardamom and coriander contain volatile aromatic oils that begin evaporating within hours of grinding. The flavour result is not subtle. The community on Leyweg tastes the difference immediately.'}
              </p>
            </div>
            <div>
              <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">
                {isNl ? 'De Tandoor op 400 Graden Celsius' : 'The Tandoor at 400 Degrees Celsius'}
              </h3>
              <p className="font-body text-white/80 text-lg leading-relaxed">
                {isNl
                  ? 'De kleioven op Leyweg 986 bereikt 400 graden Celsius. Dit is de temperatuur die naan zijn geblakerde randen geeft en chicken tikka zijn rokerige korst. Geen conventionele oven kan dit repliceren. Elk tandoori-gerecht wordt bereid op de temperatuur waarvoor het is ontworpen.'
                  : 'The clay oven at Leyweg 986 reaches 400 degrees Celsius. This is the temperature that gives naan its charred edges and chicken tikka its smoky crust. No conventional oven can replicate this. Every tandoori dish is cooked at the temperature it was designed for.'}
              </p>
            </div>
            <div>
              <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">
                {isNl ? 'Volledig Halal Gecertificeerd' : 'Fully Halal Certified'}
              </h3>
              <p className="font-body text-white/80 text-lg leading-relaxed">
                {isNl
                  ? 'Halal bij Chopras is geen menuoptie. Het is de volledige keuken. Elke leverancier is halal gecertificeerd. Er is geen risico op kruisbesmetting omdat er geen niet-halal vlees op het terrein aanwezig is. Voor Diwali-vieringen betekent dit dat elke gast, van elk geloof, met vertrouwen kan eten.'
                  : 'Halal at Chopras is not a menu option. It is the entire kitchen. Every supplier is halal certified. There is no cross-contamination risk because there is no non-halal meat on the premises. For Diwali celebrations, this means every guest, of every faith, can eat with confidence.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Diwali-Diner Den Haag - Uw Vragen Beantwoord' : 'Diwali Dinner Den Haag - Your Questions Answered'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* Book CTA */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Reserveer Uw Diwali-Viering' : 'Book Your Diwali Celebration'}
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            {isNl
              ? 'Reserveer een tafel bij Chopras Indian Restaurant op Leyweg 986 of vraag een offerte aan voor Diwali-catering in Den Haag. Open dinsdag tot en met zondag vanaf 16:30.'
              : 'Reserve a table at Chopras Indian Restaurant at Leyweg 986 or request a quote for Diwali catering in Den Haag. Open Tuesday to Sunday from 16:30.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Reserveer Nu' : 'Book Now'}
            </Link>
            <Link
              href={`${base}/catering`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Catering Aanvragen' : 'Request Catering'}
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

      {/* Other Catering Options */}
      <section className="bg-[#FFFAF5] py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-10 leading-[1.4] text-center">
            {isNl ? 'Andere Cateringmogelijkheden' : 'Other Catering Options'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/indian-wedding-catering-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Bruiloft' : 'Wedding'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Nikah-recepties en bruiloftsfestiviteiten' : 'Nikah receptions and wedding festivities'}</p>
            </Link>
            <Link href={`${base}/corporate-events-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Zakelijk' : 'Corporate'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Bedrijfsdiners en teamvieringen' : 'Corporate dinners and team celebrations'}</p>
            </Link>
            <Link href={`${base}/feestzaal-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Feestzaal' : 'Event Space'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Feestzaal huren voor Diwali in Den Haag' : 'Event space for Diwali in Den Haag'}</p>
            </Link>
            <Link href={`${base}/indian-birthday-catering-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Verjaardag' : 'Birthday'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Verjaardagsfeesten en jubileums' : 'Birthday parties and celebrations'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="font-body text-[#1A1A1A] text-lg">
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A] text-lg">
              {isNl ? 'Voor meer cateringmogelijkheden, bekijk ons' : 'For more catering options, see our'}{' '}
              <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">{tr.common.viewMenu.toLowerCase()}</Link>
              {' '}{isNl ? 'of' : 'or'}{' '}
              <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">{isNl ? 'neem contact op' : 'contact us'}</Link>
              {' '}{isNl ? 'om uw Diwali-viering te bespreken.' : 'to discuss your Diwali celebration.'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
