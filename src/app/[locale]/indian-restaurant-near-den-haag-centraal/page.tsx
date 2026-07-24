import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Near Den Haag Centraal | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant bij Den Haag Centraal | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant near Den Haag Centraal. Chopras Indian Restaurant is 15 minutes by tram. Halal food at Leyweg 986. Open Tuesday to Sunday.',
    nl: 'Indiaas restaurant bij Den Haag Centraal. Chopras Indian Restaurant ligt 15 minuten met de tram. Halal eten op Leyweg 986. Reserveer een tafel.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-near-den-haag-centraal'),
      languages: {
        en: getLocalizedUrl('en', 'indian-restaurant-near-den-haag-centraal'),
        nl: getLocalizedUrl('nl', 'indian-restaurant-near-den-haag-centraal'),
        'x-default': getLocalizedUrl('en', 'indian-restaurant-near-den-haag-centraal'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-restaurant-near-den-haag-centraal'),
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
    question: 'How do I get from Den Haag Centraal to Chopras Indian Restaurant?',
    answer: 'Take the tram from Den Haag Centraal toward Leyweg. The journey takes approximately fifteen minutes. Get off at the Leyweg stop and Chopras Indian Restaurant is at number 986. By car the same journey takes around ten minutes. Paid parking is available in the Leyweg area.',
  },
  {
    question: 'Is Chopras Indian Restaurant near Den Haag Centraal halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat dish and every supplier is halal. There is no cross-contamination risk because there is no non-halal meat anywhere on the premises. The certification covers the entire kitchen, not just selected dishes.',
  },
  {
    question: 'Do I need to book a table in advance at Chopras?',
    answer: 'For weekday evenings, walk-ins are often available. For Friday and Saturday dinner service, a reservation is strongly recommended. Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. You can reserve by calling +31 6 30645930 or through the contact page.',
  },
  {
    question: 'What Indian food does Chopras serve?',
    answer: 'Chopras Indian Restaurant serves 143 dishes across 13 categories. The menu includes biryani, butter chicken, tandoori, dal makhani, mutton rogan josh, naan, chaat, pani puri, soya chaap and Indo Chinese dishes. Spices are sourced directly from India and ground fresh every morning. The tandoor clay oven reaches 400 degrees Celsius.',
  },
  {
    question: 'Can I order Indian food delivery near Den Haag Centraal?',
    answer: 'Yes. Chopras Indian Restaurant delivers across Den Haag via Thuisbezorgd and Uber Eats. You can also call directly to arrange collection at Leyweg 986. Delivery is available during opening hours, Tuesday to Sunday from 16:30 to 22:30.',
  },
]

const faqsNl = [
  {
    question: 'Hoe kom ik van Den Haag Centraal naar Chopras Indian Restaurant?',
    answer: 'Neem de tram van Den Haag Centraal richting Leyweg. De rit duurt ongeveer vijftien minuten. Stap uit bij halte Leyweg. Chopras Indian Restaurant bevindt zich op nummer 986. Met de auto duurt de rit circa tien minuten. Betaald parkeren is beschikbaar in de omgeving van Leyweg.',
  },
  {
    question: 'Is Chopras Indian Restaurant bij Den Haag Centraal halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elk vleesgerecht en elke leverancier is halal. Er is geen risico op kruisbesmetting omdat er nergens op het terrein niet-halal vlees aanwezig is. De certificering geldt voor de gehele keuken, niet alleen voor bepaalde gerechten.',
  },
  {
    question: 'Moet ik van tevoren reserveren bij Chopras?',
    answer: 'Voor doordeweekse avonden zijn er vaak nog plaatsen beschikbaar voor inlopers. Voor vrijdag- en zaterdagavond raden wij een reservering sterk aan. Chopras Indian Restaurant is open van dinsdag tot en met zondag van 16:30 tot 22:30. Reserveren kan via +31 6 30645930 of via de contactpagina.',
  },
  {
    question: 'Welk Indiaas eten serveert Chopras?',
    answer: 'Chopras Indian Restaurant serveert 143 gerechten verdeeld over 13 categorieen, waaronder biryani, butter chicken, tandoori, dal makhani, mutton rogan josh, naan, chaat, pani puri, soya chaap en Indo Chinese gerechten. Kruiden worden rechtstreeks uit India betrokken en elke ochtend vers gemalen. De tandoor kleioven bereikt 400 graden Celsius.',
  },
  {
    question: 'Kan ik Indiaas eten bestellen met bezorging bij Den Haag Centraal?',
    answer: 'Ja. Chopras Indian Restaurant bezorgt door heel Den Haag via Thuisbezorgd en Uber Eats. U kunt ook rechtstreeks bellen voor afhalen op Leyweg 986. Bezorging is beschikbaar tijdens openingstijden, dinsdag tot en met zondag van 16:30 tot 22:30.',
  },
]

export default function IndianRestaurantCentraalPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'indian-restaurant-near-den-haag-centraal'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Bij Centraal' : 'Near Centraal', item: getLocalizedUrl(locale, 'indian-restaurant-near-den-haag-centraal') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* HERO */}
      <section className="btn-gradient py-20 text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              NEAR YOU · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl
              ? 'Indiaas Restaurant bij Den Haag Centraal'
              : 'Indian Restaurant Near Den Haag Centraal'}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/90 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
          </div>
          <p className="font-body text-white/85 text-lg leading-relaxed mt-6 mb-8 max-w-2xl mx-auto">
            {isNl
              ? 'Vijftien minuten met de tram van Den Haag Centraal. Beoordeeld met 4,9 sterren door meer dan 1100 gasten. Volledig halal gecertificeerd. Chopras Indian Restaurant op Leyweg 986.'
              : 'Fifteen minutes by tram from Den Haag Centraal. Rated 4.9 stars by over 1100 guests. Fully halal certified. Chopras Indian Restaurant at Leyweg 986.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
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

      {/* SECTION 1 - Main opening copy */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Het Beste Indiase Restaurant bij Den Haag Centraal'
              : 'The Best Indian Restaurant Near Den Haag Centraal'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Forenzen die elke avond langs dezelfde stationsrestaurants lopen, weten hoe het voelt: snel, voorspelbaar en teleurstellend. <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> op Leyweg 986 is vijftien minuten met de tram van Den Haag Centraal Station. Dat is de enige moeite. Wat daarna komt is een geheel andere categorie van avondeten.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Onze <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani</Link>, <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">butter chicken</Link> en <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">tandoori</Link> worden bereid met kruiden die rechtstreeks uit India komen en elke ochtend vers worden gemalen in onze keuken. Niet uit een zakje. Niet van een leveranciersmengsel. Dit is het verschil dat forenzen en toeristen keer op keer terugbrengt naar Leyweg.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Met 4,9 sterren van meer dan 1100 beoordelingen op Google is Chopras Indian Restaurant het best beoordeelde Indiase restaurant in Den Haag. Geen enkel ander restaurant in de stad combineert deze beoordeling met dit volume aan reviews. Een hoge beoordeling met weinig reviews zegt niets. Chopras heeft beide.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Commuters who walk past the same station restaurants every evening know the feeling: quick, predictable, and disappointing. <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link> at Leyweg 986 is fifteen minutes by tram from Den Haag Centraal station. That is the only friction. What follows is an entirely different category of dinner.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Our <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani</Link>, <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">butter chicken</Link>, and <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">tandoori</Link> are made with spices sourced directly from India and ground fresh every morning in our kitchen. Not from a bag. Not from a supplier blend. This is the difference that brings commuters and tourists back to Leyweg, evening after evening.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                At 4.9 stars from over 1100 Google reviews, Chopras Indian Restaurant is one of the strongest-rated Indian restaurants in Den Haag by both rating and review volume. A high rating becomes more meaningful when it is supported by hundreds of reviews, and Chopras has both.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2 - Why the tram ride is worth it */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Waarom de Tramrit de Moeite Waard Is' : 'Why the Tram Ride Is Worth It'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De tandoor op Leyweg 986 bereikt 400 graden Celsius. Dit is geen oven die u elders in Den Haag aantreft. Het is de temperatuur die <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">naan een korstje aan de randen</Link> geeft en chicken tikka zijn rokerige korst. Geen gewone oven kan dit nabootsen. Dat is de reden waarom tandoori-gerechten bij Chopras smaken zoals ze bedoeld zijn.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras is ook volledig <Link href={`${base}/halal-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">halal gecertificeerd</Link>. Niet gedeeltelijk. De gehele keuken, elke leverancier, elk gerecht. Voor gasten die zeker willen weten wat er op hun bord ligt, is dat geen kleine bijzaak. Het is precies de reden waarom families vanuit heel Den Haag, Rijswijk en Zoetermeer naar Leyweg 986 reizen.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Met 143 gerechten verdeeld over 13 categorieen is er ook voor <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegetarische en veganistische gasten</Link> een volwaardig menu beschikbaar. Geen tokengerecht bovenaan de kaart. Een echt aanbod, van <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">dal makhani</Link> tot soya chaap en chaat.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The tandoor at Leyweg 986 reaches 400 degrees Celsius. This is not an oven you will find elsewhere in Den Haag. It is the temperature that gives <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">naan its char at the edges</Link> and chicken tikka its smoky crust. No conventional oven can replicate this. That is the reason tandoori dishes at Chopras taste the way they were designed to taste.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras is also fully <Link href={`${base}/halal-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">halal certified</Link>. Not partially. The entire kitchen, every supplier, every dish. For guests who need to know exactly what is on their plate, that is not a minor detail. It is precisely why families travel from across Den Haag, Rijswijk, and Zoetermeer to Leyweg 986.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                With 143 dishes across 13 categories, there is also a complete menu for <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegetarian and vegan guests</Link>. No token dish at the top of the menu. A genuine offering, from <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">dal makhani</Link> to soya chaap and chaat.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3 - Getting here */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Hoe U Chopras Bereikt vanuit Den Haag Centraal'
              : 'How to Reach Chopras from Den Haag Centraal'}
          </h2>
          <div className="space-y-10">
            {isNl ? (
              <>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">Met de Tram</h3>
                  <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                    Neem de tram van Den Haag Centraal richting Leyweg. De rit duurt circa vijftien minuten. Stap uit bij halte Leyweg. Chopras Indian Restaurant staat op nummer 986 aan het einde van de straat. Betaald parkeren is beschikbaar in de omgeving van Leyweg voor gasten die liever rijden.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">Met de Bus</h3>
                  <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                    Meerdere buslijnen rijden vanuit het centrum richting Leyweg. De reistijd bedraagt doorgaans twintig minuten. Een goed alternatief voor reizigers die de voorkeur geven aan de bus, met haltes op loopafstand van Leyweg 986.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">Met de Auto</h3>
                  <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                    Vanuit Den Haag Centraal duurt de rit met de auto ongeveer tien minuten. Leyweg 986 heeft eigen parkeerplaatsen op het terrein. Geen parkeergarage. Geen parkeerkosten. U rijdt er direct naartoe en staat voor de deur.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">Bezorging aan Huis</h3>
                  <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                    Wilt u thuis genieten van <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indiaas eten met bezorging</Link> in Den Haag? Chopras Indian Restaurant bezorgt via Thuisbezorgd en Uber Eats door heel Den Haag. Bellen voor afhalen bij Leyweg 986 kan ook. Beschikbaar van dinsdag tot en met zondag vanaf 16:30.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">By Tram</h3>
                  <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                    Take the tram from Den Haag Centraal toward Leyweg. The journey takes approximately fifteen minutes. Get off at the Leyweg stop and Chopras Indian Restaurant is at number 986 at the end of the street. Free on-site parking is available for guests who prefer to drive.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">By Bus</h3>
                  <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                    Several bus lines run from the city centre toward Leyweg. Journey time is typically twenty minutes. A solid alternative for travellers who prefer the bus, with stops within easy walking distance of Leyweg 986.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">By Car</h3>
                  <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                    From Den Haag Centraal, the drive to Leyweg 986 takes around ten minutes. Chopras has its own on-site parking. No car park. No walking distance from a meter. You pull in, you park, and you are at the door.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#06068a] mb-4 leading-[1.3]">Delivery to Your Door</h3>
                  <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                    Prefer to stay home? <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indian food delivery from Chopras</Link> is available through Thuisbezorgd and Uber Eats across Den Haag. You can also call to arrange collection at Leyweg 986. Available Tuesday to Sunday from 16:30 to 22:30.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="py-20 px-6 md:px-16 btn-gradient">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Is er een goed Indiaas restaurant bij Den Haag Centraal station?'
              : 'Is there a good Indian restaurant near Den Haag Centraal station?'}
          </h2>
          {isNl ? (
            <p className="font-body text-white/85 text-lg leading-relaxed">
              Ja. <Link href={`${base}/`} className="text-white hover:text-white font-semibold">Chopras Indian Restaurant</Link> op Leyweg 986, Den Haag, is het best beoordeelde Indiase restaurant in de stad, met 4,9 sterren van meer dan 1100 gasten op Google. De keuken is volledig halal gecertificeerd en serveert <Link href={`${base}/menu`} className="text-white hover:text-white font-semibold">143 gerechten</Link> uit de Noord-Indiase traditie. Openingstijden zijn dinsdag tot en met zondag van 16:30 tot 22:30. Chopras is vijftien minuten met de tram bereikbaar vanuit Den Haag Centraal. Betaald parkeren is beschikbaar in de omgeving van Leyweg.
            </p>
          ) : (
            <p className="font-body text-white/85 text-lg leading-relaxed">
              Yes. <Link href={`${base}/`} className="text-white hover:text-white font-semibold">Chopras Indian Restaurant</Link> at Leyweg 986, Den Haag, is one of the strongest-rated Indian restaurants in the city, with 4.9 stars from over 1100 verified Google reviews. The kitchen is fully halal certified and serves <Link href={`${base}/menu`} className="text-white hover:text-white font-semibold">143 dishes</Link> from the North Indian tradition. Open Tuesday to Sunday from 16:30 to 22:30. Chopras is fifteen minutes by tram from Den Haag Centraal station. Paid parking is available in the Leyweg area.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
              {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
            </h2>
          </div>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* EXPLORE SPECIALITIES */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Ontdek Onze Specialiteiten' : 'Explore Our Specialities'}
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-10">
            {isNl
              ? 'Van klassieke Noord-Indiase curry\'s tot exclusieve Indo Chinese gerechten. Elk bord wordt bereid met vers gemalen kruiden die rechtstreeks uit India worden betrokken.'
              : 'From classic North Indian curries to exclusive Indo Chinese dishes. Every plate is made with freshly ground spices sourced directly from India.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a] hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Halal kip in een rijke tomaat-roomsaus, dagelijks vers bereid' : 'Halal chicken in a rich tomato and cream sauce, made fresh daily'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a] hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Kip, lam of groente biryani met saffraan basmatirijst' : 'Chicken, lamb or veg biryani with saffron basmati rice'}</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a] hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Gegaard in een tandoor kleioven van 400 graden Celsius' : 'Cooked in a 400-degree Celsius tandoor clay oven'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a] hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Zwarte linzen langzaam gegaard met boter en room' : 'Black lentils slow-cooked with butter and cream'}</p>
            </Link>
            <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a] hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Indo Chinese</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Authentiek Indo-Chinees eten in Den Haag' : 'Authentic Indo Chinese food in Den Haag'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a] hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="font-body text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas catering voor feesten en bedrijfsevenementen' : 'Indian catering for events and corporate dinners'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Reserveer een Tafel bij Chopras' : 'Reserve a Table at Chopras'}
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {isNl
              ? 'Open van dinsdag tot en met zondag van 16:30 tot 22:30. Vijftien minuten met de tram van Den Haag Centraal. Betaald parkeren beschikbaar in de omgeving van Leyweg.'
              : 'Open Tuesday to Sunday from 16:30 to 22:30. Fifteen minutes by tram from Den Haag Centraal. Paid parking available in the Leyweg area.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out hover:btn-gradient hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out hover:btn-gradient hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
            <Link
              href={`${base}/indian-food-delivery-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out hover:btn-gradient hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Bezorging Bestellen' : 'Order Delivery'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
