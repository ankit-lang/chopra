import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { RESTAURANT } from '@/lib/constants'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema, getFaqPageSchema, getLocalRestaurantSchema, getCateringServiceSchema, getDishPageSchema } from '@/lib/schema'
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
    en: 'Indian Buffet in Den Haag | Chopras Indian Restaurant',
    nl: 'Indiaas Buffet Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian buffet Den Haag at Chopras Indian Restaurant. Authentic curries, tandoori and biryani for groups. Halal certified at Leyweg 986. Get a quote.',
    nl: 'Indiaas buffet Den Haag bij Chopras Indian Restaurant. Authentieke curry, tandoori en biryani voor groepen. Halal gecertificeerd op Leyweg 986. Offerte.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-buffet-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'indian-buffet-den-haag'),
        nl: getLocalizedUrl('nl', 'indian-buffet-den-haag'),
        'x-default': getLocalizedUrl('en', 'indian-buffet-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-buffet-den-haag'),
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

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'What is the minimum group size for a Chopras Indian buffet?',
    answer: 'The minimum group size for buffet catering is 15 people. For smaller groups we recommend booking the restaurant directly. For events at external venues, a minimum of 25 guests applies.',
  },
  {
    question: 'Can you do the buffet at our venue?',
    answer: 'Yes. Chopras provides full off-site catering across Den Haag, Rijswijk, Delft, Zoetermeer and surrounding areas. We bring the kitchen to you.',
  },
  {
    question: 'Is the buffet food halal?',
    answer: 'Yes, completely. All meat dishes served at Chopras buffet events are sourced from halal-certified suppliers. Halal compliance is the standard for every event we cater, not an optional upgrade.',
  },
  {
    question: 'How far in advance should I book a buffet?',
    answer: 'We recommend booking 1 to 2 weeks in advance for weekend events. For large events of 100 or more guests, 3 to 4 weeks ahead is recommended to allow for menu consultation and logistics.',
  },
  {
    question: 'Can I customise the buffet menu?',
    answer: 'Yes. Every buffet booking includes a menu consultation call. You can specify dishes, dietary requirements, and any cultural preferences. The standard menu on this page is a representative template.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Wat is de minimale groepsgrootte voor een Indiaas buffet bij Chopras?',
    answer: 'De minimale groepsgrootte voor buffetcatering is 15 personen. Voor kleinere groepen raden wij aan direct het restaurant te boeken. Voor evenementen op externe locaties geldt een minimum van 25 gasten.',
  },
  {
    question: 'Kan het buffet ook op onze locatie worden geserveerd?',
    answer: 'Ja. Chopras verzorgt volledige cateringservice op locatie door heel Den Haag, Rijswijk, Delft, Zoetermeer en Voorburg. Neem contact met ons op met uw locatiegegevens en wij bespreken de opbouwvereisten.',
  },
  {
    question: 'Is het buffeteten halal?',
    answer: 'Ja, volledig. Alle vleesgerechten bij Chopras buffetevenementen zijn afkomstig van halal-gecertificeerde leveranciers. Halal is geen extra optie - het is de standaard voor elk evenement dat wij cateren.',
  },
  {
    question: 'Hoe ver van tevoren moet ik een buffet boeken?',
    answer: 'Wij raden aan 1 tot 2 weken van tevoren te boeken voor weekevenementen. Voor grote evenementen van 100 of meer gasten is 3 tot 4 weken van tevoren aanbevolen voor een menuoverleg en logistiek.',
  },
  {
    question: 'Kan ik het buffetmenu aanpassen?',
    answer: 'Ja. Elke buffetboeking omvat een menuoverleg met ons team. U kunt de gerechten, dieetvereisten en eventuele culturele wensen opgeven. Het standaardmenu op deze pagina is een representatief sjabloon.',
  },
]

export default function IndianBuffetPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'indian-buffet-den-haag'))} />
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Buffet' : 'Indian Buffet', item: getLocalizedUrl(locale, 'indian-buffet-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Indian Buffet Den Haag', 'Indiaas Buffet Den Haag', 'Authentic Indian buffet at Chopras Indian Restaurant Den Haag. Halal curries, tandoori and biryani for groups at Leyweg 986, 2545 GW Den Haag.', 'Authentiek Indiaas buffet bij Chopras Indian Restaurant Den Haag. Halal curry, tandoori en biryani voor groepen op Leyweg 986, 2545 GW Den Haag.')} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight">
            {isNl
              ? 'Indiaas Buffet in Den Haag - Een Spread Die Iedereen Bedient'
              : 'Indian Buffet in Den Haag - A Spread That Feeds Everyone and Forgets Nobody'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl mb-8">
            {isNl
              ? 'Vanaf 15 gasten tot 200. Verse curry, biryani, tandoori en street food. Halal gecertificeerd. Leyweg 986 en locaties door Den Haag.'
              : 'From 15 guests to 200. Fresh curries, biryani, tandoori and street food. Halal certified. Leyweg 986 and venues across Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/catering#catering-form`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Offerte Aanvragen' : 'Request a Buffet Quote'}
            </Link>
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {RESTAURANT.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* WHY INDIAN CUISINE */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Waarom Indiase Keuken Perfect Is voor een Groepsbuffet'
              : 'Why Indian Cuisine Works Better Than Any Other Buffet Option'}
          </h2>
          <div className="space-y-5 text-[#1A1A1A] text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Indiase keuken is de meest praktische keuze voor een groepsbuffet, en de redenen zijn structureel.
                  Een standaard{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal Indiaas buffet</Link>{' '}
                  in Den Haag dekt tegelijkertijd halal-, vegetarische, veganistische en glutenvrije vereisten zonder speciale aanpassing.
                  Dal, chana masala, groente{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani</Link>{' '}
                  en palak paneer zijn geen concessies. Zij zijn het echte eten dat iedereen aan tafel eet - en vaak de gerechten waarnaar gasten het vaakst terugkeren.
                </p>
                <p>
                  De Indiase eetcultuur ontwikkelde zich over eeuwen in een context van extreme dieetdiversiteit.
                  Religieuze beperkingen, regionale landbouwverschillen, seizoensgebonden beschikbaarheid - de keuken ontwikkelde zich om grote aantallen mensen met radicaal verschillende vereisten te voeden vanuit een set gerechten.
                  Een buffet is geen aanpassing van Indiase keuken. Het is de natuurlijke vorm ervan.
                </p>
                <p>
                  Dan is er de visuele dimensie. De kleuren van Indiase keuken op een buffettafel zijn werkelijk prachtig.
                  Kurkumageel dal, diep baksteenrood{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">butter chicken</Link>,{' '}
                  levendig groen palak paneer, karamelbruin biryani bezaaid met saffraan. De tafel zelf wordt een middelpunt. Geen andere keuken bereikt dit effect met standaardgerechten.
                </p>
                <p>
                  Indiase curry houdt ook uitzonderlijk goed bij een buffet.
                  De saus beschermt het eiwit en draagt de smaak - het gaat niet achteruit onder warmhoudlampen zoals geroosterd vlees of gefrituurd eten.
                  De kwaliteit van het eerste bord is gelijk aan die van het laatste, en voor een groep van 60 tot 80 gasten is die consistentie het verschil tussen een geslaagd evenement en een teleurstellend een.
                </p>
              </>
            ) : (
              <>
                <p>
                  Indian food is the most practical choice for a large group buffet, and the reasons are structural.
                  A standard{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal Indian buffet</Link>{' '}
                  in Den Haag naturally covers halal, vegetarian, vegan and gluten-free requirements without special accommodation.
                  Dal, chana masala, vegetable{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani</Link>{' '}
                  and palak paneer are not concessions. They are the actual food that everyone at the table eats - and often the dishes guests return to most.
                </p>
                <p>
                  Indian food culture evolved over centuries in a context of extreme dietary diversity.
                  Religious restrictions, regional agricultural differences, seasonal availability - the cuisine developed to feed enormous numbers of people with radically different requirements from a single set of dishes.
                  A buffet is not an adaptation of Indian food. It is its natural form.
                </p>
                <p>
                  Then there is the visual dimension. The colours of Indian cuisine on a buffet table are genuinely striking.
                  Turmeric-yellow dal, deep brick-red{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">butter chicken</Link>,{' '}
                  vibrant green palak paneer, caramel-brown biryani flecked with saffron. The table itself becomes a centrepiece. No other cuisine achieves this effect from standard dishes.
                </p>
                <p>
                  Indian curries also hold exceptionally well on a buffet.
                  The sauce protects the protein and carries the spice - it does not degrade under heat lamps the way roasted meats or fried foods do.
                  The quality of the first plate matches the last, and for a group of 60 to 80 guests, that consistency is the difference between a successful event and an embarrassing one.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOPRAS - PROOF */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Hetzelfde Restaurant. Dezelfde Keuken. Dezelfde Standaard.'
              : 'The Same Restaurant. The Same Kitchen. The Same Standard.'}
          </h2>
          <div className="space-y-5 text-[#1A1A1A] text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  De keuken die het restaurant runt, runt ook het buffet. Geen apart cateringteam.
                  Geen productie van lagere kwaliteit voor grotere aantallen. De specerijen worden rechtstreeks
                  uit India betrokken en elke ochtend vers gemalen van hele specerijen voor de service - en dat
                  proces verandert niet omdat u 80 gasten heeft in plaats van 8. De vluchtige aromatische olien
                  in komijn, kardemom en koriander beginnen al binnen enkele uren na het malen te verdampen.
                  Voorgemengselde kruidenmengsels van een leverancier kunnen dit niet evenaren. Vers gemalen specerijen wel.
                </p>
                <p>
                  De tandoorkleioven op Leyweg 986 bereikt 400 graden Celsius. Die temperatuur is wat naan zijn
                  schroeiplek op de randen geeft en kip tikka zijn rokerige buitenkorst. Geen gewone oven kan
                  dit produceren. Elk{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">tandoorgerecht in Den Haag</Link>{' '}
                  bij een Chopras buffet - het geroosterde vlees, het{' '}
                  <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">verse naan</Link>{' '}
                  gebakken in batches gedurende de service - wordt bereid op de temperatuur waarvoor het ontworpen is.
                </p>
                <p>
                  Chopras Indian Restaurant heeft een beoordeling van 4,9 sterren van 800+ geverifieerde Google-recensies.
                  Die beoordeling komt van dezelfde curry, hetzelfde tandoorgeroosterde tikka en hetzelfde verse naan
                  die bij elke buffetbestelling aanwezig zijn. Een evenement gecatered door Chopras is geen ander,
                  lager product. Het is het restaurant - op uw gastenlijst.
                </p>
                <p>
                  Elk gerecht bij een Chopras buffet is{' '}
                  <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">volledig halal gecertificeerd</Link>.
                  Geen optie. Geen sectie van het menu. De gehele keuken is halal en elke leverancier is gecertificeerd.
                  Families die volledige zekerheid over halal status nodig hebben, hoeven maar een keer te vragen.
                  De privezaal op Leyweg 986 biedt ruimte aan 25 tot 80 gasten.
                  Voor grotere evenementen en externe locaties brengt Chopras de volledige{' '}
                  <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indiase cateringoperatie</Link>{' '}
                  naar uw locatie in Den Haag, Rijswijk, Delft, Zoetermeer en Voorburg.
                </p>
              </>
            ) : (
              <>
                <p>
                  The kitchen that runs the restaurant is the same kitchen that runs the buffet.
                  No separate catering team. No reduced-quality batch production for larger numbers.
                  The spices are sourced directly from India and ground fresh each morning before service -
                  and that process does not change because you have 80 guests instead of 8.
                  The volatile aromatic oils in cumin, cardamom and coriander begin evaporating within hours
                  of grinding. Pre-mixed spice blends from a supplier bag cannot replicate this. Fresh-ground spices can.
                </p>
                <p>
                  The tandoor clay oven at Leyweg 986 reaches 400 degrees Celsius. That temperature is what
                  gives naan its char on the edges and chicken tikka its smoky exterior crust. No conventional
                  oven can produce this. Every{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">tandoor dish in Den Haag</Link>{' '}
                  served at a Chopras buffet - the fire-roasted tikka, the{' '}
                  <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">fresh naan</Link>{' '}
                  baked in batches throughout service - is cooked at the temperature it was designed for.
                </p>
                <p>
                  Chopras Indian Restaurant holds a 4.9-star rating from 800+ verified Google reviews.
                  That rating comes from the same curries, the same tandoor-fired tikka and the same fresh naan
                  that feature on every buffet order. An event catered by Chopras is not a different, lower-tier
                  product. It is the restaurant - at your guest count.
                </p>
                <p>
                  Every dish at a Chopras buffet is{' '}
                  <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">fully halal certified</Link>.
                  Not an option. Not a section of the menu. The entire kitchen is halal and every supplier is certified.
                  Families who need complete confidence on halal status do not need to ask twice.
                  The private hall at Leyweg 986 accommodates 25 to 80 guests.
                  For larger events and off-site venues, Chopras brings the full{' '}
                  <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indian catering operation</Link>{' '}
                  to your location across Den Haag, Rijswijk, Delft, Zoetermeer and Voorburg.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* QUALITY AT SCALE */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Indiaas Groepsdiner Den Haag - Meer Gasten, Dezelfde Standaard'
              : 'Indian Group Dining Den Haag - More Guests, The Same Standard'}
          </h2>
          <div className="space-y-5 text-white/85 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  De meeste cateringoperaties draaien op volume ten koste van kwaliteit. De gerechten die in de
                  restaurantkeuken uren nodig hadden om te bereiden, worden in batches gemaakt in een cateringfaciliteit
                  met andere apparatuur, andere processen en andere prioriteiten. Gasten merken dit.
                  Organisatoren kunnen het niet meer corrigeren als de service eenmaal begonnen is.
                </p>
                <p>
                  Chopras werkt met een keuken. Het{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">menu van 143 gerechten</Link>{' '}
                  opgebouwd voor het restaurant is hetzelfde menu waaruit het buffet put.
                  De specerijen zijn hetzelfde. De tandoor is dezelfde. De ochtendbereiding die uren voor de eerste
                  gast begint, geldt evenzeer voor een Indiaas groepsdiner in Den Haag als voor een tafeltje voor twee.
                  Kwaliteit is geen keuze die per bestelling wordt gemaakt - het is hoe de keuken werkt.
                </p>
                <p>
                  Voor bedrijfsevenementen in Den Haag is dit belangrijker dan de meeste organisatoren beseffen.
                  Een teamdiner, een klantreceptie, een Diwali-viering voor 60 medewerkers - het eten bij deze
                  evenementen wordt beoordeeld door mensen die goed eten en opmerken wanneer iets ondermaats is.
                  Een{' '}
                  <Link href={`${base}/corporate-events-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">bedrijfsevenement bij Chopras</Link>{' '}
                  is geen cateringbenadering van Indiaas eten. Het is de werkelijke restaurantstandaard, geserveerd op schaal.
                </p>
                <p>
                  Of u nu{' '}
                  <Link href={`${base}/indian-birthday-catering-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indiaas verjaardagscatering</Link>{' '}
                  voor 25 gasten organiseert of een volledige{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indiaas bruiloft catering</Link>{' '}
                  voor 80 - het proces is hetzelfde. Vertel ons uw datum, uw gastenlijst, uw dieetwensen.
                  De rest regelen wij.
                </p>
              </>
            ) : (
              <>
                <p>
                  Most catering operations are built for volume at the expense of quality. The dishes that took
                  hours to build in a restaurant kitchen are batch-produced in a catering facility running on
                  different equipment, different processes, different priorities. Guests notice.
                  Organizers cannot fix this once service has started.
                </p>
                <p>
                  Chopras operates one kitchen. The{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">143-dish menu</Link>{' '}
                  built for the restaurant is the same menu the buffet draws from.
                  The spices are the same. The tandoor is the same. The morning preparation that starts hours
                  before the first guest arrives applies equally to Indian group dining in Den Haag as it does
                  to a table for two. Quality is not a choice made per order - it is how the kitchen operates.
                </p>
                <p>
                  For corporate events in Den Haag, this matters more than most organizers realize.
                  A team dinner, a client reception, a Diwali celebration for 60 staff members - the food at
                  these events is judged by people who eat well and notice when something falls short.
                  A{' '}
                  <Link href={`${base}/corporate-events-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">corporate event at Chopras</Link>{' '}
                  is not a catering approximation of Indian food. It is the actual restaurant standard, served at scale.
                </p>
                <p>
                  Whether you are organizing{' '}
                  <Link href={`${base}/indian-birthday-catering-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indian birthday catering</Link>{' '}
                  for 25 guests or a full{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indian wedding catering</Link>{' '}
                  operation for 80, the process is the same. Tell us your date, your headcount, your dietary requirements.
                  We handle the rest.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.4]">
            {isNl
              ? 'Wat Is Inbegrepen bij een Chopras Indiaas Buffet in Den Haag'
              : 'What Is Included in a Chopras Indian Buffet Den Haag'}
          </h2>
          <p className="text-[#1A1A1A] mb-10 text-lg">
            {isNl
              ? 'Onderstaande spread is representatief. Elk buffet wordt afgestemd op uw evenement tijdens een menuoverleg.'
              : 'The following is a representative spread. Every buffet is tailored to your event during a menu consultation.'}
          </p>
          <div className="space-y-6">

            <div className="bg-white rounded-xl p-6 border-l-4 border-white">
              <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-3">
                {isNl ? 'Chaat en Starters Station' : 'Chaat and Starters Station'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    Pani puri met muntwater en tamarindwater, samosa met verse groene chutney, papdi chaat, uienbhaji
                    en masalapapad. Het starters station doet het sociale werk van het doorbreken van het ijs bij aanvang van de service.
                    Bekijk onze{' '}
                    <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">chaat in Den Haag</Link>{' '}
                    en{' '}
                    <Link href={`${base}/pani-puri-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">pani puri in Den Haag</Link>{' '}
                    voor meer over deze street food starters.
                  </>
                ) : (
                  <>
                    Pani puri with mint and tamarind water, samosa with fresh green chutney, papdi chaat, onion bhaji,
                    and masala papad. The starters station does the social work of breaking the ice at the start of service.
                    See our dedicated pages on{' '}
                    <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">chaat in Den Haag</Link>{' '}
                    and{' '}
                    <Link href={`${base}/pani-puri-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">pani puri in Den Haag</Link>{' '}
                    for more on these street food starters.
                  </>
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-white">
              <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-3">
                {isNl ? "Curryselectie - 4 tot 6 Curry's" : 'Curry Selection - 4 to 6 Curries'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Butter chicken</Link>{' '}
                    (de universele publiekslievelingen),{' '}
                    <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">dal makhani</Link>{' '}
                    (waar vegetariers en vleesliefhebbers beiden meerdere keren op terugkomen),
                    een paneer gerecht, een veganistische optie en lamsvlees voor groepen van 50 gasten of meer.
                  </>
                ) : (
                  <>
                    <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Butter chicken</Link>{' '}
                    (the universal crowd-pleaser),{' '}
                    <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">dal makhani</Link>{' '}
                    (that vegetarians and meat-eaters both return to multiple times),
                    a paneer dish, a vegan option, and a lamb dish for groups of 50 or more.
                  </>
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-white">
              <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-3">Biryani</h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    Zowel groente biryani als kip{' '}
                    <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani in Den Haag</Link>{' '}
                    geserveerd als centrepieces vanuit grote potten, met raita erbij.
                    De geur als de deksels eraf gaan bepaalt de toon voor de hele avond.
                  </>
                ) : (
                  <>
                    Both veg biryani and chicken{' '}
                    <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani in Den Haag</Link>{' '}
                    served as centrepiece dishes from large pots, with raita alongside.
                    The fragrance when the lids come off sets the tone for the entire evening.
                  </>
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-white">
              <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-3">
                {isNl ? 'Brood' : 'Breads'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    Knoflooknaan, plain naan en roti - vers gebakken in batches gedurende de gehele service.
                    Bekijk onze{' '}
                    <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">naan in Den Haag</Link>{' '}
                    pagina voor meer over ons tandoorbrood. Continu aangevuld zodat gasten altijd warm brood hebben.
                  </>
                ) : (
                  <>
                    Garlic naan, plain naan, and roti - baked fresh in batches throughout service.
                    See our{' '}
                    <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">naan in Den Haag</Link>{' '}
                    page for more on our tandoor-baked bread. Replenished continuously so guests always have warm bread.
                  </>
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-white">
              <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-3">
                {isNl ? 'Desserts' : 'Desserts'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl
                  ? 'Gulab jamun in warme suikersiroop, moong dal halwa en kulfi - Indiaas ijs in individuele porties. Het desserstation biedt een duidelijk en bevredigend einde van de maaltijd.'
                  : 'Gulab jamun in warm sugar syrup, moong dal halwa, and kulfi - Indian ice cream in individual portions. A clear and satisfying close to the meal.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Biedt Chopras Indian Restaurant een Buffet aan in Den Haag?'
              : 'Does Chopras Indian Restaurant Offer a Buffet in Den Haag?'}
          </h2>
          <div className="bg-[#F7F8FC] rounded-xl p-8 border-l-4 border-white">
            {isNl ? (
              <p className="text-[#1A1A1A] text-lg leading-relaxed">
                Ja. Chopras Indian Restaurant op Leyweg 986, 2545 GW Den Haag biedt Indiaas buffetcatering
                voor groepen van 15 tot 200 gasten. Het buffet omvat curry,{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani</Link>,
                tandoori, naan, street food starters en desserts. Alle gerechten zijn volledig halal gecertificeerd.
                Chopras heeft een beoordeling van 4,9 sterren van 800+ geverifieerde Google-recensies.
                Buffetten zijn beschikbaar in de privezaal van het restaurant en op uw externe locatie.
                Open dinsdag tot en met zondag vanaf 16:30.{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Vraag een buffetofferte aan</Link>{' '}
                via <EmailLink />.
              </p>
            ) : (
              <p className="text-[#1A1A1A] text-lg leading-relaxed">
                Yes. Chopras Indian Restaurant at Leyweg 986, 2545 GW Den Haag offers Indian buffet catering
                for groups of 15 to 200 guests. The buffet includes curries,{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani</Link>,
                tandoori, naan, street food starters and desserts. All dishes are fully halal certified.
                Chopras holds a 4.9-star rating from 800+ verified Google reviews.
                Buffets are available in the restaurant private hall and at your external venue.
                Open Tuesday to Sunday from 16:30.{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Request a buffet quote</Link>{' '}
                at <EmailLink />.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Vraag uw Indiaas Buffet Den Haag Offerte aan' : 'Get Your Indian Buffet Den Haag Quote'}
          </h2>
          <p className="text-[#1A1A1A] text-lg leading-relaxed mb-8 max-w-2xl">
            {isNl
              ? 'Elk buffet begint met een gesprek. Vertel ons uw datum, uw gastenlijst en eventuele dieetvereisten - wij stellen een voorstel op dat is afgestemd op uw evenement.'
              : 'Every buffet starts with a conversation. Tell us your date, your guest count, and any dietary requirements - we will put together a proposal tailored to your event.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/catering#catering-form`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Offerte Aanvragen' : 'Request a Buffet Quote'}
            </Link>
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {RESTAURANT.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-[#F7F8FC] py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-10 leading-[1.4]">
            {isNl ? 'Ontdek Meer van Onze Gerechten' : 'Explore More of Our Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Buffet Favoriet' : 'Buffet Favourite'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Butter chicken in Den Haag' : 'Butter chicken in Den Haag'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch Hoogtepunt' : 'Vegetarian Highlight'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Dal makhani in Den Haag' : 'Dal makhani in Den Haag'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Buffet Centerpiece' : 'Buffet Centrepiece'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Biryani in Den Haag' : 'Biryani in Den Haag'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas buffetcatering voor evenementen' : 'Indian catering for your events'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {isNl ? 'Bekijk ons' : 'View our'}{' '}
              <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">{tr.common.viewMenu}</Link>
              {' '}{isNl ? 'of' : 'or'}{' '}
              <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'maak een reservering voor uw buffet' : 'request a buffet quote at Chopras'}
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
