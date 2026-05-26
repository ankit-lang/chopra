import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'
import EmailLink from '@/components/ui/EmailLink'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Near Peace Palace Den Haag | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant bij het Vredespaleis Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant near Peace Palace Den Haag. Chopras Indian Restaurant is 10 minutes away at Leyweg 986. Authentic halal food. Book a table now.',
    nl: 'Indiaas restaurant bij het Vredespaleis Den Haag. Chopras Indian Restaurant is op 10 minuten rijden aan Leyweg 986. Volledig halal. Reserveer nu.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-near-peace-palace-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'indian-restaurant-near-peace-palace-den-haag'),
        nl: getLocalizedUrl('nl', 'indian-restaurant-near-peace-palace-den-haag'),
        'x-default': getLocalizedUrl('en', 'indian-restaurant-near-peace-palace-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-restaurant-near-peace-palace-den-haag'),
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
    question: 'How far is Chopras Indian Restaurant from the Peace Palace?',
    answer: 'Chopras Indian Restaurant at Leyweg 986 is approximately 10 minutes from the Peace Palace by car. By public transport, take a tram or bus towards Leyweg. The journey takes around 20 minutes from the Peace Palace area. Paid parking is available in the Leyweg area.',
  },
  {
    question: 'Is Chopras Indian Restaurant fully halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat supplier is certified and every dish on the menu is halal. There is no non-halal meat anywhere on the premises, which means there is no cross-contamination risk. Guests can dine with complete confidence.',
  },
  {
    question: 'Can Chopras host a private group dinner near the Peace Palace?',
    answer: 'Yes. Chopras Indian Restaurant has a private hall at Leyweg 986 that accommodates 25 to 80 guests. This is suitable for diplomatic receptions, team dinners, and corporate group meals. Contact us at info [at] chopras.nl or call +31 6 30645930 to discuss availability and menu options.',
  },
  {
    question: 'What are the opening hours at Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Monday. Reservations are recommended for groups and for Friday and Saturday evenings.',
  },
  {
    question: 'How do I get to Chopras Indian Restaurant by car?',
    answer: 'Chopras Indian Restaurant is at Leyweg 986, Den Haag. Paid parking is available in the surrounding Leyweg area. By public transport, tram line 2 stops at Leyweg, a short walk from the entrance.',
  },
]

const faqsNl = [
  {
    question: 'Hoe ver is Chopras Indian Restaurant van het Vredespaleis?',
    answer: 'Chopras Indian Restaurant op Leyweg 986 is ongeveer 10 minuten rijden van het Vredespaleis. Met het openbaar vervoer neemt u een tram of bus richting Leyweg. De reis duurt ongeveer 20 minuten vanuit de omgeving van het Vredespaleis. Betaald parkeren is beschikbaar in de omgeving van Leyweg.',
  },
  {
    question: 'Is Chopras Indian Restaurant volledig halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elke vleesleverancier is gecertificeerd en elk gerecht op het menu is halal. Er is nergens niet-halal vlees op het terrein, dus er is geen risico op kruisbesmetting. Gasten kunnen met volledig vertrouwen eten.',
  },
  {
    question: 'Kan Chopras een privégroepsdiner organiseren bij het Vredespaleis?',
    answer: 'Ja. Chopras Indian Restaurant heeft een privézaal op Leyweg 986 die 25 tot 80 gasten kan accommoderen. Dit is geschikt voor diplomatieke ontvangsten, teamdiners en zakelijke groepsmaaltijden. Neem contact op via info [at] chopras.nl of bel +31 6 30645930 voor beschikbaarheid en menuopties.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is open van dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is op maandag gesloten. Reserveren wordt aanbevolen voor groepen en voor vrijdag- en zaterdagavonden.',
  },
  {
    question: 'Hoe rijd ik naar Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant is gevestigd op Leyweg 986, Den Haag. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Met het openbaar vervoer stopt tramlijn 2 bij halte Leyweg, op loopafstand van de ingang.',
  },
]

export default function IndianRestaurantPeacePalacePage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'indian-restaurant-near-peace-palace-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Bij het Vredespaleis' : 'Near Peace Palace', item: getLocalizedUrl(locale, 'indian-restaurant-near-peace-palace-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • NEAR YOU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            {isNl
              ? 'Indiaas Restaurant bij het Vredespaleis in Den Haag'
              : 'Indian Restaurant Near Peace Palace Den Haag'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'Chopras Indian Restaurant op Leyweg 986. Tien minuten van het Vredespaleis. 4.9 sterren, 800+ recensies. Volledig halal. Open dinsdag tot en met zondag.'
              : 'Chopras Indian Restaurant on Leyweg 986. Ten minutes from the Peace Palace. 4.9 stars, 800+ reviews. Fully halal certified. Open Tuesday to Sunday.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Reserveer een Tafel' : 'Reserve a Table'}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bekijk het Menu' : 'View the Menu'}
            </Link>
          </div>
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Is er een goed Indiaas restaurant bij het Vredespaleis in Den Haag?'
              : 'Is there a good Indian restaurant near the Peace Palace in Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Ja.{' '}
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Chopras Indian Restaurant
              </Link>{' '}
              op Leyweg 986, Den Haag ligt op 10 minuten rijden van het Vredespaleis. Met een 4.9-sterren beoordeling van 800+ Google-recensies serveert Chopras authentieke Noord-Indiaase keuken, volledig halal gecertificeerd. Kies uit biryani, tandoori en curry over 143 gerechten. Open van dinsdag tot en met zondag van 16:30 tot 22:30.{' '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Reserveer uw tafel
              </Link>{' '}
              via +31 6 30645930 of online.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Yes.{' '}
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Chopras Indian Restaurant
              </Link>{' '}
              at Leyweg 986, Den Haag is 10 minutes from the Peace Palace by car. Rated 4.9 stars from 800+ Google reviews, Chopras serves authentic North Indian cuisine with a fully halal certified kitchen. Choose from biryani, tandoori and curry across 143 dishes. Open Tuesday to Sunday from 16:30 to 22:30.{' '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Reserve your table
              </Link>{' '}
              via +31 6 30645930 or online.
            </p>
          )}
        </div>
      </section>

      {/* Main copy - proximity and quality */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? '10 Minuten van het Vredespaleis. Zonder Compromissen op Kwaliteit.'
              : '10 Minutes from the Peace Palace. No Compromise on Quality.'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Het Vredespaleis trekt internationale bezoekers van over de hele wereld. Diplomaten. Juridische professionals van het Internationaal Gerechtshof. Journalisten die de internationale instellingen in Den Haag volgen. Na een volle dag in de diplomatenwijk is de vraag niet &quot;waar is een restaurant?&quot; De vraag is &quot;waar is een restaurant dat de moeite waard is?&quot; Chopras Indian Restaurant op Leyweg 986 is het antwoord. Tien minuten rijden. Geen omweg.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De keuken op Leyweg maalt masalas van hele specerijen die rechtstreeks uit India komen, elke ochtend voor de eerste service. De vluchtige aromatische oliën in komijn, kardemom en koriander beginnen te verdampen binnen uren na het malen. Voorgemaakte kruidenmixen leveren de smaak van gisteren. Bij Chopras is de specerij die ochtend gemalen en die avond gekookt. Bekijk het{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  volledige Indiase restaurantmenu
                </Link>{' '}
                en u ziet 143 gerechten die op die standaard zijn gebouwd.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                De tandoor-kleioven op Leyweg bereikt 400 graden Celsius. Dat is de temperatuur die{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  chicken tikka
                </Link>{' '}
                zijn rokerige korst geeft en{' '}
                <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  knoflooknaan
                </Link>{' '}
                zijn kenmerkende rand. Geen gewone oven reproduceert dit resultaat. Dit is ook waarom 800+ gasten een 4.9-sterren beoordeling op Google hebben achtergelaten.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The Peace Palace draws some of the most internationally minded visitors in Europe. Diplomats. Legal professionals from the International Court of Justice. Journalists covering global institutions. After a full day in Den Haag&apos;s diplomatic quarter, the question is not &quot;where is a restaurant?&quot; The question is &quot;where is a restaurant that actually delivers?&quot; Chopras Indian Restaurant at Leyweg 986 is the answer. Ten minutes by car. No detour required.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The kitchen at Leyweg grinds masalas from whole spices sourced directly from India, every morning before the first service. The volatile aromatic oils in cumin, cardamom and coriander begin evaporating within hours of grinding. A kitchen using pre-mixed supplier blends is serving yesterday&apos;s flavour. At Chopras, the spice is ground that morning and cooked that evening. Browse the{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  full Indian restaurant menu at Chopras
                </Link>{' '}
                and you will see 143 dishes built on that standard.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The tandoor clay oven at Leyweg reaches 400 degrees Celsius. That temperature is what gives{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  chicken tikka
                </Link>{' '}
                its smoky crust and{' '}
                <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  garlic naan
                </Link>{' '}
                its char on the edges. No conventional oven replicates this. It is also why 800+ guests have left 4.9-star reviews on Google.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* What the international community knows - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Wat de Internationale Gemeenschap van Den Haag al Weet'
              : "What Den Haag's International Community Already Knows"}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Den Haag herbergt meer internationale instellingen per vierkante kilometer dan vrijwel elke andere stad in Europa. Het Permanente Hof van Arbitrage. Het Internationaal Strafhof. De Organisatie voor het Verbod op Chemische Wapens. Gasten uit deze professionele wereld hebben Chopras Indian Restaurant gevonden. Zij keren terug omdat de kwaliteit standhoudt. Niet alleen een keer. Elke keer. 4.9 sterren van 800+ geverifieerde Google-recensies documenteert die consistentie.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Chopras is ook een van de weinige restaurants in Den Haag dat{' '}
                <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  authentiek Indo-Chinees eten
                </Link>{' '}
                serveert naast een volledig Noord-Indiaas menu. Chilli chicken, chilli paneer, Hakka noodles. Voor bezoekers uit Zuid- en Zuidoost-Aziatische landen die weten hoe deze keuken hoort te smaken, is dit geen klein onderscheid. Het is volledig uniek in Den Haag.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                De halal-certificering bij Chopras dekt de gehele keuken. Elke leverancier. Elk vleesgerecht. Elk ingrediënt op het terrein. Voor moslimgasten die de omgeving van het Vredespaleis bezoeken is er geen onduidelijkheid. Geen &quot;sommige gerechten zijn halal.&quot; Chopras is een{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  volledig gecertificeerd halal restaurant in Den Haag
                </Link>
                , punt. Dineer met volledig vertrouwen.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Den Haag hosts more international institutions per square kilometre than almost anywhere else in Europe. The Permanent Court of Arbitration. The International Criminal Court. The Organisation for the Prohibition of Chemical Weapons. Guests from this professional world have found Chopras Indian Restaurant. They return because the quality holds. Not just once. Every visit. 4.9 stars from 800+ verified Google reviews documents that consistency.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Chopras also serves{' '}
                <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  authentic Indo Chinese food
                </Link>{' '}
                alongside a full North Indian menu. Chilli chicken, chilli paneer, Hakka noodles. For visitors from South and Southeast Asia who know what this cuisine is supposed to taste like, this is not a small distinction. It is entirely unique in The Hague.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                The halal certification at Chopras covers the entire kitchen. Every supplier. Every meat dish. Every ingredient on the premises. For Muslim guests visiting the Peace Palace area, there is no ambiguity. No &quot;some dishes are halal.&quot; Chopras is a{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  fully certified halal restaurant in Den Haag
                </Link>
                , full stop. Dine with complete confidence.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* What to order */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat te Bestellen bij Uw Eerste Bezoek' : 'What to Order on Your First Visit'}
          </h2>
          {isNl ? (
            <div className="space-y-8">
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">Butter Chicken en Knoflooknaan</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  De{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    butter chicken bij Chopras
                  </Link>{' '}
                  begint met halal kip in een tomaten- en roomsaus op basis van die ochtend gemalen masala. Knoflooknaan komt direct uit de 400-graden tandoor, met een kenmerkende rand die geen gewone oven kan repliceren. Deze combinatie maakt van eerste bezoekers vaste gasten.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">Biryani met Saffraanbasmatirijst</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  De{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    biryani bij Chopras
                  </Link>{' '}
                  gebruikt saffraanbasmatirijst en is beschikbaar met kip, lamsvlees of groenten. Hij wordt apart van de saus gekookt en op het moment van serveren gecombineerd. Het aroma als het aan tafel arriveert, is het verschil tussen een restaurant dat zorgvuldig kookt en een dat dat niet doet.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">Mutton Rogan Josh</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Mutton rogan josh
                  </Link>{' '}
                  is een Kasjmirs gerecht op basis van een diepe, langzaam gekookte saus. Bij Chopras is het lamsvlees halal en het specerijenmengsel wordt intern gemalen. Het is niet een gerecht voor gasten die mild willen. Het is een gerecht voor gasten die het echte ding willen.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">Butter Chicken and Garlic Naan</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  The{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    butter chicken at Chopras
                  </Link>{' '}
                  starts with halal chicken in a tomato and cream sauce built from masala ground that morning. Garlic naan comes direct from the 400-degree tandoor, with a char on the edges that no conventional oven can replicate. This combination converts first-time visitors into regulars.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">Biryani with Saffron Basmati</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  The{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    biryani at Chopras
                  </Link>{' '}
                  uses saffron basmati rice and is available with chicken, lamb or vegetables. It is cooked separately from the gravy and combined at the moment of service. The aroma when it arrives at the table is the difference between a kitchen that cares and one that does not.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">Mutton Rogan Josh</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Mutton rogan josh
                  </Link>{' '}
                  is a Kashmiri dish built on a deep, slow-cooked gravy. At Chopras, the lamb is halal and the spice blend is ground in-house. It is not a dish for guests who want mild. It is a dish for guests who want the real thing.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Private events section */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Privédiners en Groepsreserveringen bij het Vredespaleis'
              : 'Private Dinners and Group Bookings Near the Peace Palace'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras Indian Restaurant beschikt over een privézaal op Leyweg 986 die 25 tot 80 gasten kan accommoderen. Dit is geschikt voor{' '}
                <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  zakelijke evenementen in Den Haag
                </Link>
                , diplomatieke ontvangsten en formele groepsdiners. Het eten bij evenementen komt uit dezelfde keuken, dezelfde specerijen en dezelfde standaard als het restaurant.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Voor cateringbehoeften buiten de locatie biedt Chopras ook{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indiaas catering in Den Haag
                </Link>{' '}
                aan voor bruiloften, verjaardagen en bedrijfsfeesten. Neem contact op via <EmailLink /> of bel +31 6 30645930 om beschikbaarheid en menuopties te bespreken.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras Indian Restaurant has a private hall at Leyweg 986 that accommodates 25 to 80 guests. This is suitable for{' '}
                <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  corporate events in Den Haag
                </Link>
                , diplomatic receptions, and formal group dinners. The food at events comes from the same kitchen, the same spices, and the same standard as the restaurant.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                For catering needs off-site, Chopras also provides{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indian catering across Den Haag
                </Link>{' '}
                for weddings, birthdays and corporate events. Contact us at <EmailLink /> or call +31 6 30645930 to discuss availability and menu options.
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
              ? 'Veelgestelde Vragen over Eten bij het Vredespaleis'
              : 'Frequently Asked Questions about Dining Near the Peace Palace'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* Final CTA - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Reserveer Uw Tafel bij Chopras Indian Restaurant'
              : 'Reserve Your Table at Chopras Indian Restaurant'}
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {isNl
              ? 'Open dinsdag tot en met zondag van 16:30 tot 22:30. Betaald parkeren beschikbaar in de omgeving van Leyweg. Tien minuten van het Vredespaleis in Den Haag.'
              : 'Open Tuesday to Sunday from 16:30 to 22:30. Paid parking available in the Leyweg area. Ten minutes from the Peace Palace in Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Reserveer Nu' : 'Reserve Now'}
            </Link>
            <Link
              href={`${base}/indian-restaurant-near-den-haag-centraal`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bij Den Haag Centraal' : 'Near Den Haag Centraal'}
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links grid */}
      <section className="bg-[#F7F8FC] py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-10 leading-[1.3]">
            {isNl ? 'Ontdek Onze Specialiteiten' : 'Explore Our Specialities'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Halal kip in rijke tomaat en room' : 'Halal chicken in rich tomato and cream'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Saffraanrijst met kip, lam of groenten' : 'Saffron rice with chicken, lamb or veg'}</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Geroosterd in de 400-graden kleioven' : 'Cooked in the 400-degree clay oven'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas catering voor evenementen en diners' : 'Indian catering for events and group dinners'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              {isNl ? (
                <>
                  Bezoek{' '}
                  <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Chopras Indian Restaurant Den Haag
                  </Link>{' '}
                  voor authentiek Noord-Indiaas eten op 10 minuten van het Vredespaleis. Bekijk ons{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    volledig halal menu
                  </Link>{' '}
                  en{' '}
                  <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    maak een reservering
                  </Link>
                  .
                </>
              ) : (
                <>
                  Visit{' '}
                  <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Chopras Indian Restaurant Den Haag
                  </Link>{' '}
                  for authentic North Indian food 10 minutes from the Peace Palace. Browse our{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    fully halal menu
                  </Link>{' '}
                  and{' '}
                  <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    book a table
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
