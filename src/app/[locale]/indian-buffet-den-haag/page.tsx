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
      <section className="btn-gradient  py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] text-white mb-6 leading-tight">
            {isNl
              ? 'Indiaas Buffet in Den Haag - Een Spread Die Iedereen Bedient'
              : 'Indian Buffet in Den Haag - A Spread That Feeds Everyone and Forgets Nobody'}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/90 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
          </div>
          <p className="text-white/75 text-base md:text-[18px] mb-8">
            {isNl
              ? 'Vanaf 15 gasten tot 200. Verse curry, biryani, tandoori en street food. Halal gecertificeerd. Leyweg 986 en locaties door Den Haag.'
              : 'From 15 guests to 200. Fresh curries, biryani, tandoori and street food. Halal certified. Leyweg 986 and venues across Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/catering#catering-form`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out  active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Offerte Aanvragen' : 'Request a Buffet Quote'}
            </Link>
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out  active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {RESTAURANT.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* WHY INDIAN CUISINE */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-12">
            <h2 className="font-heading font-semibold text-3xl md:text-[2.5rem] text-[#06068a] mb-6 leading-tight mt-2 text-left">
              {isNl
                ? 'Waarom Indiase Keuken Perfect Is voor een Groepsbuffet'
                : 'Why Indian Cuisine Works Better Than Any Other Buffet Option'}
            </h2>
          </div>
          <div className="space-y-5 text-[#1A1A1A] text-base leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Indiase keuken is de meest praktische keuze voor een groepsbuffet, en de redenen zijn structureel.
                  Een standaard{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">halal Indiaas buffet</Link>{' '}
                  in Den Haag dekt tegelijkertijd halal-, vegetarische, veganistische en glutenvrije vereisten zonder speciale aanpassing.
                  Dal, chana masala, groente{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani</Link>{' '}
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
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">butter chicken</Link>,{' '}
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
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">halal Indian buffet</Link>{' '}
                  in Den Haag naturally covers halal, vegetarian, vegan and gluten-free requirements without special accommodation.
                  Dal, chana masala, vegetable{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani</Link>{' '}
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
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">butter chicken</Link>,{' '}
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
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Hetzelfde Restaurant. Dezelfde Keuken. Dezelfde Standaard.'
              : 'The Same Restaurant. The Same Kitchen. The Same Standard.'}
          </h2>
          <div className="space-y-5 text-[#1A1A1A] text-base leading-relaxed">
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
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">tandoorgerecht in Den Haag</Link>{' '}
                  bij een Chopras buffet - het geroosterde vlees, het{' '}
                  <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">verse naan</Link>{' '}
                  gebakken in batches gedurende de service - wordt bereid op de temperatuur waarvoor het ontworpen is.
                </p>
                <p>
                  Chopras Indian Restaurant heeft een beoordeling van 4,9 sterren van 1100+ geverifieerde Google-recensies.
                  Die beoordeling komt van dezelfde curry, hetzelfde tandoorgeroosterde tikka en hetzelfde verse naan
                  die bij elke buffetbestelling aanwezig zijn. Een evenement gecatered door Chopras is geen ander,
                  lager product. Het is het restaurant - op uw gastenlijst.
                </p>
                <p>
                  Elk gerecht bij een Chopras buffet is{' '}
                  <Link href={`${base}/halal-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">volledig halal gecertificeerd</Link>.
                  Geen optie. Geen sectie van het menu. De gehele keuken is halal en elke leverancier is gecertificeerd.
                  Families die volledige zekerheid over halal status nodig hebben, hoeven maar een keer te vragen.
                  De privezaal op Leyweg 986 biedt ruimte aan 25 tot 80 gasten.
                  Voor grotere evenementen en externe locaties brengt Chopras de volledige{' '}
                  <Link href={`${base}/catering`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indiase cateringoperatie</Link>{' '}
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
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">tandoor dish in Den Haag</Link>{' '}
                  served at a Chopras buffet - the fire-roasted tikka, the{' '}
                  <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">fresh naan</Link>{' '}
                  baked in batches throughout service - is cooked at the temperature it was designed for.
                </p>
                <p>
                  Chopras Indian Restaurant holds a 4.9-star rating from 1100+ verified Google reviews.
                  That rating comes from the same curries, the same tandoor-fired tikka and the same fresh naan
                  that feature on every buffet order. An event catered by Chopras is not a different, lower-tier
                  product. It is the restaurant - at your guest count.
                </p>
                <p>
                  Every dish at a Chopras buffet is{' '}
                  <Link href={`${base}/halal-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">fully halal certified</Link>.
                  Not an option. Not a section of the menu. The entire kitchen is halal and every supplier is certified.
                  Families who need complete confidence on halal status do not need to ask twice.
                  The private hall at Leyweg 986 accommodates 25 to 80 guests.
                  For larger events and off-site venues, Chopras brings the full{' '}
                  <Link href={`${base}/catering`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indian catering operation</Link>{' '}
                  to your location across Den Haag, Rijswijk, Delft, Zoetermeer and Voorburg.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* QUALITY AT SCALE */}
      <section className="btn-gradient  py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Indiaas Groepsdiner Den Haag - Meer Gasten, Dezelfde Standaard'
              : 'Indian Group Dining Den Haag - More Guests, The Same Standard'}
          </h2>
          <div className="space-y-5 text-white/85 text-base leading-relaxed">
            {isNl ? (
              <>
                <p className='text-white'>
                  De meeste cateringoperaties draaien op volume ten koste van kwaliteit. De gerechten die in de
                  restaurantkeuken uren nodig hadden om te bereiden, worden in batches gemaakt in een cateringfaciliteit
                  met andere apparatuur, andere processen en andere prioriteiten. Gasten merken dit.
                  Organisatoren kunnen het niet meer corrigeren als de service eenmaal begonnen is.
                </p>
                <p className='text-white'>
                  Chopras werkt met een keuken. Het{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-white font-semibold">menu van 143 gerechten</Link>{' '}
                  opgebouwd voor het restaurant is hetzelfde menu waaruit het buffet put.
                  De specerijen zijn hetzelfde. De tandoor is dezelfde. De ochtendbereiding die uren voor de eerste
                  gast begint, geldt evenzeer voor een Indiaas groepsdiner in Den Haag als voor een tafeltje voor twee.
                  Kwaliteit is geen keuze die per bestelling wordt gemaakt - het is hoe de keuken werkt.
                </p>
                <p className='text-white'>
                  Voor bedrijfsevenementen in Den Haag is dit belangrijker dan de meeste organisatoren beseffen.
                  Een teamdiner, een klantreceptie, een Diwali-viering voor 60 medewerkers - het eten bij deze
                  evenementen wordt beoordeeld door mensen die goed eten en opmerken wanneer iets ondermaats is.
                  Een{' '}
                  <Link href={`${base}/corporate-events-den-haag`} className="text-white hover:text-white font-semibold">bedrijfsevenement bij Chopras</Link>{' '}
                  is geen cateringbenadering van Indiaas eten. Het is de werkelijke restaurantstandaard, geserveerd op schaal.
                </p>
                <p className='text-white'>
                  Of u nu{' '}
                  <Link href={`${base}/indian-birthday-catering-den-haag`} className="text-white hover:text-white font-semibold">Indiaas verjaardagscatering</Link>{' '}
                  voor 25 gasten organiseert of een volledige{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-white hover:text-white font-semibold">Indiaas bruiloft catering</Link>{' '}
                  voor 80 - het proces is hetzelfde. Vertel ons uw datum, uw gastenlijst, uw dieetwensen.
                  De rest regelen wij.
                </p>
              </>
            ) : (
              <>
                <p className='text-white'>
                  Most catering operations are built for volume at the expense of quality. The dishes that took
                  hours to build in a restaurant kitchen are batch-produced in a catering facility running on
                  different equipment, different processes, different priorities. Guests notice.
                  Organizers cannot fix this once service has started.
                </p>
                <p className='text-white'>
                  Chopras operates one kitchen. The{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-white font-semibold">143-dish menu</Link>{' '}
                  built for the restaurant is the same menu the buffet draws from.
                  The spices are the same. The tandoor is the same. The morning preparation that starts hours
                  before the first guest arrives applies equally to Indian group dining in Den Haag as it does
                  to a table for two. Quality is not a choice made per order - it is how the kitchen operates.
                </p>
                <p className='text-white'>
                  For corporate events in Den Haag, this matters more than most organizers realize.
                  A team dinner, a client reception, a Diwali celebration for 60 staff members - the food at
                  these events is judged by people who eat well and notice when something falls short.
                  A{' '}
                  <Link href={`${base}/corporate-events-den-haag`} className="text-white hover:text-white font-semibold">corporate event at Chopras</Link>{' '}
                  is not a catering approximation of Indian food. It is the actual restaurant standard, served at scale.
                </p>
                <p className='text-white'>
                  Whether you are organizing{' '}
                  <Link href={`${base}/indian-birthday-catering-den-haag`} className="text-white hover:text-white font-semibold">Indian birthday catering</Link>{' '}
                  for 25 guests or a full{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-white hover:text-white font-semibold">Indian wedding catering</Link>{' '}
                  operation for 80, the process is the same. Tell us your date, your headcount, your dietary requirements.
                  We handle the rest.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-4 leading-[1.4]">
            {isNl
              ? 'Wat Is Inbegrepen bij een Chopras Indiaas Buffet in Den Haag'
              : 'What Is Included in a Chopras Indian Buffet Den Haag'}
          </h2>
          <p className="text-[#1A1A1A] mb-10 text-base">
            {isNl
              ? 'Onderstaande spread is representatief. Elk buffet wordt afgestemd op uw evenement tijdens een menuoverleg.'
              : 'The following is a representative spread. Every buffet is tailored to your event during a menu consultation.'}
          </p>
          <div className="space-y-8">

            <div>
              <h3 className="font-heading text-3xl text-[#06068a] mb-3">
                {isNl ? 'Chaat en Starters Station' : 'Chaat and Starters Station'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    U kunt kiezen uit een breed scala aan authentieke Indiase voorgerechten op ons menu, waaronder Pani Puri geserveerd met verfrissend munt- en pittig tamarindewater, knapperige Samosa's met verse groene chutney, smaakvolle Papdi Chaat, knapperige Uien Bhaji en knapperige Masala Papad. Elk voorgerecht wordt vers bereid met behulp van traditionele recepten en authentieke Indiase kruiden om u een echte smaak van India te geven. Het starters station doet het sociale werk van het doorbreken van het ijs bij aanvang van de service. Bekijk onze gespecialiseerde pagina's over{' '}
                    <Link href={`${base}/chaat-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">chaat in Den Haag</Link>{' '}
                    en{' '}
                    <Link href={`${base}/pani-puri-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">pani puri in Den Haag</Link>{' '}
                    voor meer informatie over deze street food starters.
                  </>
                ) : (
                  <>
                    You can choose from a wide range of authentic Indian starters on our menu, including Pani Puri served with refreshing mint and tangy tamarind water, crispy Samosas with fresh green chutney, flavorful Papdi Chaat, crunchy Onion Bhaji, and crispy Masala Papad. Each appetizer is freshly prepared using traditional recipes and authentic Indian spices to give you a true taste of India. The starters station does the social work of breaking the ice at the start of service. See our dedicated pages on{' '}
                    <Link href={`${base}/chaat-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">chaat in Den Haag</Link>{' '}
                    and{' '}
                    <Link href={`${base}/pani-puri-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">pani puri in Den Haag</Link>{' '}
                    for more on these street food starters.
                  </>
                )}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-3xl text-[#06068a] mb-3">
                {isNl ? 'Curryselectie' : 'Curry Selection'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    U kunt kiezen uit een brede selectie van vegetarische curry's, kipcurry's en lams-curry's op ons menu, allemaal bereid met authentieke Indiase kruiden en traditionele recepten. Geniet van klantfavorieten zoals de wereldberoemde{' '}
                    <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Butter Chicken</Link>, rijke en romige{' '}
                    <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Dal Makhani</Link>, heerlijke Paneer-specialiteiten, smaakvolle veganistische curry's en malse lamsgerechten.
                  </>
                ) : (
                  <>
                    You can choose from a wide selection of vegetarian curries, chicken curries, and mutton curries on our menu, all prepared with authentic Indian spices and traditional recipes. Enjoy customer favourites such as the world-famous{' '}
                    <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Butter Chicken</Link>, rich and creamy{' '}
                    <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Dal Makhani</Link>, delicious Paneer specialties, flavourful vegan curries, and tender lamb dishes.
                  </>
                )}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-3xl text-[#06068a] mb-3">
                {isNl ? 'Biryani en Rijst' : 'Biryani and Rice'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    U kunt kiezen uit een heerlijke selectie van authentieke Indiase biryani's en rijstgerechten op ons menu. Zowel groente biryani als kip{' '}
                    <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani in Den Haag</Link>{' '}
                    geserveerd als centrepieces met raita erbij. De geur als de deksels eraf gaan bepaalt de toon voor de hele avond.
                  </>
                ) : (
                  <>
                    You can choose from a delicious selection of authentic Indian biryanis and rice dishes on our menu. Both veg biryani and chicken{' '}
                    <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani in Den Haag</Link>{' '}
                    served as centrepiece dishes with raita alongside. The fragrance when the lids come off sets the tone for the entire evening.
                  </>
                )}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-3xl text-[#06068a] mb-3">
                {isNl ? 'Brood' : 'Breads'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    U kunt kiezen uit een brede selectie van vers gebakken Indiase broden op ons menu, waaronder Plain Naan, Butter Naan, Garlic Naan, Cheese Naan, Tandoori Roti en Lachha Paratha. Elk brood wordt vers bereid in onze traditionele tandoor en warm geserveerd, waardoor het de perfecte begeleiding is voor uw favoriete Indiase curry. Bekijk onze{' '}
                    <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Naan in Den Haag</Link>{' '}
                    pagina voor meer informatie over ons authentieke tandoorgebakken brood. Onze broden worden continu aangevuld gedurende de service, zodat gasten er altijd vers en warm van genieten.
                  </>
                ) : (
                  <>
                    You can choose from a wide selection of freshly baked Indian breads on our menu, including Plain Naan, Butter Naan, Garlic Naan, Cheese Naan, Tandoori Roti, and Lachha Paratha. Each bread is freshly prepared in our traditional tandoor and served warm, making it the perfect accompaniment to your favourite Indian curry. See our{' '}
                    <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Naan in Den Haag</Link>{' '}
                    page to learn more about our authentic tandoor-baked bread. Our breads are replenished continuously throughout service, so guests always enjoy them fresh and warm.
                  </>
                )}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-3xl text-[#06068a] mb-3">
                {isNl ? 'Salades en Raita' : 'Salads and Raita'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    Elk buffet bevat een selectie van verse salades samen met een verscheidenheid aan huisgemaakte raita's, zoals Plain Raita, Komkommer Raita, Munt Raita en Boondi Raita. Deze verfrissende bijgerechten vullen onze authentieke Indiase gerechten perfect aan en helpen hun rijke, aromatische smaken in balans te brengen.
                  </>
                ) : (
                  <>
                    Every buffet includes a selection of fresh salads along with a variety of homemade raitas, such as Plain Raita, Cucumber Raita, Mint Raita, and Boondi Raita. These refreshing accompaniments perfectly complement our authentic Indian dishes and help balance their rich, aromatic flavours.
                  </>
                )}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-3xl text-[#06068a] mb-3">
                {isNl ? 'Nagerechten' : 'Desserts'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    U kunt kiezen uit een heerlijke selectie van authentieke Indiase desserts op ons menu, waaronder Gulab Jamun geserveerd in warme suikersiroop, rijke Moong Dal Halwa en romige Kulfi, het traditionele ijs van India. Elk dessert wordt geserveerd in individuele porties, wat de perfecte zoete afsluiting van uw maaltijd biedt.
                  </>
                ) : (
                  <>
                    You can choose from a delicious selection of authentic Indian desserts on our menu, including Gulab Jamun served in warm sugar syrup, rich Moong Dal Halwa, and creamy Kulfi, India's traditional ice cream. Each dessert is served in individual portions, providing the perfect sweet ending to your meal.
                  </>
                )}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-3xl text-[#06068a] mb-3">
                {isNl ? 'Dranken' : 'Drinks'}
              </h3>
              <p className="text-[#1A1A1A] leading-relaxed">
                {isNl ? (
                  <>
                    Maak uw buffetbeleving compleet met een brede selectie verfrissende dranken van ons menu. Kies uit traditionele Indiase dranken zoals Mango Lassi, Sweet Lassi en Masala Chai, samen met frisdranken, verse sappen en andere dranken om uw maaltijd aan te vullen.
                  </>
                ) : (
                  <>
                    Complete your buffet experience with a wide selection of refreshing beverages from our menu. Choose from traditional Indian drinks such as Mango Lassi, Sweet Lassi, and Masala Chai, along with soft drinks, fresh juices, and other beverages to complement your meal.
                  </>
                )}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Biedt Chopras Indian Restaurant een Buffet aan in Den Haag?'
              : 'Does Chopras Indian Restaurant Offer a Buffet in Den Haag?'}
          </h2>
          <div className="bg-[#F7F8FC] rounded-xl p-8 border-l-4 border-white">
            {isNl ? (
              <p className="text-[#1A1A1A] text-base leading-relaxed">
                Ja. Chopras Indian Restaurant op Leyweg 986, 2545 GW Den Haag biedt Indiaas buffetcatering
                voor groepen van 15 tot 200 gasten. Het buffet omvat curry,{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani</Link>,
                tandoori, naan, street food starters en desserts. Alle gerechten zijn volledig halal gecertificeerd.
                Chopras heeft een beoordeling van 4,9 sterren van 1100+ geverifieerde Google-recensies.
                Buffetten zijn beschikbaar in de privezaal van het restaurant en op uw externe locatie.
                Open dinsdag tot en met zondag vanaf 16:30.{' '}
                <Link href={`${base}/catering`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Vraag een buffetofferte aan</Link>{' '}
                via <EmailLink />.
              </p>
            ) : (
              <p className="text-[#1A1A1A] text-base leading-relaxed">
                Yes. Chopras Indian Restaurant at Leyweg 986, 2545 GW Den Haag offers Indian buffet catering. The buffet includes curries,{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani</Link>,
                tandoori, naan, street food starters and desserts. All dishes are fully halal certified.
                Chopras holds a 4.9-star rating from 1100+ verified Google reviews.
                Buffets are available in the restaurant private hall and at your external venue.
                Open Tuesday to Sunday from 16:30.{' '}
                <Link href={`${base}/catering`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Request a buffet quote</Link>{' '}
                at <EmailLink />.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
              {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
            </h2>
          </div>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Vraag uw Indiaas Buffet Den Haag Offerte aan' : 'Get Your Indian Buffet Den Haag Quote'}
          </h2>
          <p className="text-[#1A1A1A] text-base leading-relaxed mb-8 max-w-2xl">
            {isNl
              ? 'Elk buffet begint met een gesprek. Vertel ons uw datum, uw gastenlijst en eventuele dieetvereisten - wij stellen een voorstel op dat is afgestemd op uw evenement.'
              : 'Every buffet starts with a conversation. Tell us your date, your guest count, and any dietary requirements - we will put together a proposal tailored to your event.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/catering#catering-form`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out  active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Offerte Aanvragen' : 'Request a Buffet Quote'}
            </Link>
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out  active:scale-[0.98] min-h-[48px]"
            >
              {RESTAURANT.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-10 leading-[1.4]">
            {isNl ? 'Ontdek Meer van Onze Gerechten' : 'Explore More of Our Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Buffet Favoriet' : 'Buffet Favourite'}</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Butter chicken in Den Haag' : 'Butter chicken in Den Haag'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch Hoogtepunt' : 'Vegetarian Highlight'}</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Dal makhani in Den Haag' : 'Dal makhani in Den Haag'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Buffet Centerpiece' : 'Buffet Centrepiece'}</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Biryani in Den Haag' : 'Biryani in Den Haag'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Indiaas buffetcatering voor evenementen' : 'Indian catering for your events'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {isNl ? 'Bekijk ons' : 'View our'}{' '}
              <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">{tr.common.viewMenu}</Link>
              {' '}{isNl ? 'of' : 'or'}{' '}
              <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">
                {isNl ? 'maak een reservering voor uw buffet' : 'request a buffet quote at Chopras'}
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
