import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { RESTAURANT } from '@/lib/constants'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema, getLocalRestaurantSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Wedding Catering Den Haag | Chopras Indian Restaurant',
    nl: 'Indiase Bruiloftscatering Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian wedding catering Den Haag by Chopras Indian Restaurant. Nikah, walima and reception catering. Fully halal certified. Request a free quote today.',
    nl: 'Indiase bruiloftscatering Den Haag bij Chopras Indian Restaurant. Nikah, walima en receptie catering. Volledig halal gecertificeerd. Offerte aanvragen.',
  }
  return {
    title: titles[locale], description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-wedding-catering-den-haag'),
      languages: { en: getLocalizedUrl('en', 'indian-wedding-catering-den-haag'), nl: getLocalizedUrl('nl', 'indian-wedding-catering-den-haag'), 'x-default': getLocalizedUrl('en', 'indian-wedding-catering-den-haag') },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-wedding-catering-den-haag'),
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
    question: 'What types of weddings do you cater at Chopras?',
    answer: 'Chopras caters for Nikah receptions, Walima dinners, Sangeet nights, Mehndi parties, Haldi ceremonies, and full wedding dinners. We cater for Indian, Pakistani, Surinamese and multicultural weddings and everything in between.',
  },
  {
    question: 'Is the wedding catering fully halal?',
    answer: 'Yes, completely. All meat is sourced from halal-certified suppliers. The entire kitchen operates to halal standards. Halal compliance is not a premium option at Chopras - it is the standard for every event we cater, without exception.',
  },
  {
    question: 'How many guests can you accommodate for wedding catering?',
    answer: 'Chopras caters for weddings of 25 to 80 guests at the private hall at Leyweg 986, Den Haag. Every table receives the same quality of food whether the count is 25 or 80 - there is no reduced standard for larger numbers.',
  },
  {
    question: 'Can we customise the wedding menu?',
    answer: 'Yes. Every wedding menu starts with a conversation about your occasion, guest count, cultural preferences, and dietary requirements. We never compose two identical wedding menus - every menu is built for the specific occasion and the specific guest list.',
  },
  {
    question: 'How far in advance should we book for wedding catering in Den Haag?',
    answer: 'For weddings of 50 or more guests, we recommend booking 6 to 8 weeks in advance. For smaller weddings of 25 to 40 guests, 3 to 4 weeks is sufficient. Saturday dates are the most popular and book up fastest - especially during wedding season from May to September.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Welke type bruiloften cateren jullie bij Chopras?',
    answer: 'Chopras cater voor Nikah-recepties, Walima-diners, Sangeet-avonden, Mehndi-feesten, Haldi-ceremonies en grote bruiloftsdiners. Wij cateren voor Indiase, Pakistaanse, Surinaamse en multiculturele bruiloften en alles daartussenin.',
  },
  {
    question: 'Is de bruiloftscatering volledig halal?',
    answer: 'Ja, volledig. Al het vlees is afkomstig van halal-gecertificeerde leveranciers. De gehele keuken werkt volgens halalstandaarden. Halal-naleving is geen premium optie bij Chopras - het is de standaard voor elk evenement dat wij cateren, zonder uitzondering.',
  },
  {
    question: 'Hoeveel gasten kunnen jullie accommoderen voor bruiloftscatering?',
    answer: 'Chopras cater voor bruiloften van 25 tot 80 gasten in de privezaal op Leyweg 986, Den Haag. Elke tafel ontvangt dezelfde kwaliteit eten, of het nu 25 of 80 gasten zijn - er is geen verlaagde standaard voor grotere aantallen.',
  },
  {
    question: 'Kunnen wij het bruiloftsmenu aanpassen?',
    answer: 'Ja. Elk bruiloftsmenu begint met een gesprek over uw gelegenheid, gastenaantal, culturele voorkeuren en dieetvereisten. Wij stellen nooit twee identieke bruiloftsmenus samen - elk menu is op maat gemaakt voor de specifieke gelegenheid en de specifieke gastenlijst.',
  },
  {
    question: 'Hoe ver van tevoren moeten wij boeken voor bruiloftscatering in Den Haag?',
    answer: 'Voor bruiloften van 50 of meer gasten raden wij 6 tot 8 weken van tevoren boeken aan. Voor kleinere bruiloften van 25 tot 40 gasten is 3 tot 4 weken voldoende. Zaterdagdatums zijn het meest gewild en boeken het snelst vol - met name in het huwelijksseizoen van mei tot september.',
  },
]

export default function IndianWeddingCateringPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const cateringServiceSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: isNl ? 'Indiase Bruiloftscatering Den Haag' : 'Indian Wedding Catering Den Haag',
    serviceType: isNl ? 'Indiase Bruiloftscatering' : 'Indian Wedding Catering',
    description: locale === 'nl'
      ? 'Authentieke Indiase bruiloftscatering in Den Haag voor nikah, walima en recepties. Volledig halal gecertificeerd. Vers bereid door Chopras Indian Restaurant op Leyweg 986.'
      : 'Authentic Indian wedding catering in Den Haag for nikah, walima and receptions. Fully halal certified. Freshly prepared by Chopras Indian Restaurant at Leyweg 986.',
    provider: { '@type': 'Restaurant', name: RESTAURANT.name, telephone: RESTAURANT.contact.phone, url: RESTAURANT.contact.website },
    areaServed: [
      { '@type': 'City', name: 'Den Haag' }, { '@type': 'City', name: 'Rijswijk' },
      { '@type': 'City', name: 'Delft' }, { '@type': 'City', name: 'Zoetermeer' },
      { '@type': 'City', name: 'Voorburg' }, { '@type': 'City', name: 'Leidschendam' },
    ],
  }

  const weddingOccasions = isNl ? [
    { title: 'Nikah-receptie', desc: 'De formele maaltijd na de huwelijksceremonie. Een Indiase spread is de juiste keuze voor deze gelegenheid - halal als standaard, breed genoeg om elke gast aan tafel te bedienen.' },
    { title: 'Walima-diner', desc: 'Het traditionele feestmaal na de Nikah. Chopras stelt op maat gemaakte Walima-menus samen die authentiek zijn voor de gelegenheid - van biryani tot seekh kebab, van slow-cooked curry tot verse naan.' },
    { title: 'Sangeet-avond', desc: 'Muziek, dans en eten voor de bruiloft. Een street food station of buffet met lichte Indiase hapjes werkt uitstekend voor een Sangeet - gasten eten terwijl ze bewegen en socialiseren.' },
    { title: 'Mehndi-feest', desc: 'Lichtere catering voor het mehndi-feest. Indiase chaat, snacks en zoetigheid - eten dat gasten kunnen oppakken terwijl de mehndi-artiesten aan het werk zijn.' },
    { title: 'Haldi-ceremony', desc: 'Eenvoudige, vrolijke catering voor de Haldi. Fruit, zoetjes, pakora, samosa - een lichte spread die de viering vergezelt zonder de ceremonie in beslag te nemen.' },
    { title: 'Receptie en Bruiloftsdiner', desc: 'Groot formeel diner voor 25 tot 80 gasten. Volledige buffetservice of bediening op bord. Professioneel bedienend personeel. Verse naan de hele avond aangevuld.' },
  ] : [
    { title: 'Nikah Reception', desc: 'The formal meal following the marriage ceremony. An Indian spread is the right choice for this occasion - halal as standard, broad enough to serve every guest at the table.' },
    { title: 'Walima Dinner', desc: 'The traditional celebratory meal following the Nikah. Chopras composes bespoke Walima menus that are authentic to the occasion - from biryani to seekh kebab, from slow-cooked curry to fresh naan.' },
    { title: 'Sangeet Night', desc: 'Music, dance and food before the wedding. A street food station or a light buffet works excellently for a Sangeet - guests eat while they move and socialise.' },
    { title: 'Mehndi Party', desc: 'Lighter catering for the mehndi evening. Indian chaat, snacks and sweets - food that guests can pick up while the mehndi artists are at work.' },
    { title: 'Haldi Ceremony', desc: 'Simple, joyful catering for the Haldi. Fruit, sweets, pakora, samosa - a light spread that accompanies the celebration without taking it over.' },
    { title: 'Reception and Wedding Dinner', desc: 'Large formal dinner for 25 to 80 guests. Full buffet service or plated service. Professional serving staff. Fresh naan replenished throughout the evening.' },
  ]

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag', 'Rijswijk', 'Delft', 'Zoetermeer', 'Voorburg', 'Leidschendam'], getLocalizedUrl(locale, 'indian-wedding-catering-den-haag'))} />
      <JsonLd data={cateringServiceSchema as Record<string, unknown>} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Bruiloft Catering' : 'Indian Wedding Catering', item: getLocalizedUrl(locale, 'indian-wedding-catering-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1B2B5E]">
        <div className="absolute inset-0">
          <Image
            src="/images/catering/wedding-celebrations---2.png"
            alt="Indian wedding catering Den Haag at Chopras Indian Restaurant"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B5E]/60 via-[#1B2B5E]/40 to-[#1B2B5E]/75" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl
              ? 'Indiase Bruiloftscatering Den Haag - Chopras voor Uw Trouwdag'
              : 'Indian Wedding Catering Den Haag - Chopras for Your Wedding'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl mb-8" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'Halal bruiloftsmenus voor 25 tot 80 gasten. Nikah, Walima, Sangeet, Mehndi en grote bruiloftsdiners. Den Haag, Rijswijk, Delft en omgeving.'
              : 'Halal wedding menus for 25 to 80 guests. Nikah, Walima, Sangeet, Mehndi and full wedding dinners. Den Haag, Rijswijk, Delft and surrounding areas.'}
          </p>
          <Link
            href={`${base}/catering#catering-form`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
          >
            {isNl ? 'Bruiloftsofferte Aanvragen' : 'Get a Wedding Quote'}
          </Link>
        </div>
      </section>

      {/* SECTION: Understanding the Occasion */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Indiase Bruiloftscatering die de Gelegenheid Begrijpt'
              : 'Indian Wedding Catering That Understands the Occasion'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Een bruiloft is niet zomaar een evenement dat gecaterd moet worden. Het is een van de
                  belangrijkste dagen in het leven van een familie, en het eten moet daartoe recht doen.{' '}
                  <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Chopras Indian Restaurant
                  </Link>{' '}
                  cater voor bruiloften in Den Haag met dit als uitgangspunt - niet als een generalist
                  cateraar met een Indiaas menu, maar als een Indiaas restaurant dat dit eten kent, deze
                  gelegenheden kent en begrijpt wat ze betekenen.
                </p>
                <p>
                  Wij kennen het verschil tussen een Nikah-receptie en een Walima-diner - en wat elk op
                  tafel vraagt. De{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    biryani
                  </Link>{' '}
                  bij een Walima heeft een ander karakter dan de biryani bij een informele verjaardag.
                  Het eten bij een Sangeet moet licht genoeg zijn zodat gasten kunnen eten terwijl ze
                  bewegen en dansen. Het Mehndi-feest vraagt om{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    chaat
                  </Link>{' '}
                  en zoetjes die gasten met een hand kunnen pakken. Wij weten dit allemaal omdat wij dit
                  allemaal hebben gedaan.
                </p>
                <p>
                  Al het vlees - bij elk evenement, bij elk gastenaantal, altijd - is afkomstig van{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    halal-gecertificeerde leveranciers
                  </Link>
                  . Dit is geen upgrade of premium optie. Het is gewoon hoe wij werken.
                </p>
              </>
            ) : (
              <>
                <p>
                  A wedding is not just an event to be catered. It is one of the most important days in a
                  family&apos;s life, and the food has to do justice to that.{' '}
                  <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Chopras Indian Restaurant
                  </Link>{' '}
                  caters for Indian wedding catering in Den Haag with this as the starting point - not as
                  a generalist caterer with an Indian menu, but as an Indian restaurant that knows this
                  food, these occasions and what each one means.
                </p>
                <p>
                  We know the difference between a Nikah reception and a Walima dinner - and what each
                  one calls for on the table. The{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    biryani
                  </Link>{' '}
                  at a Walima has a different character from the biryani at a casual birthday. The food
                  at a Sangeet needs to be light enough that guests can eat while they move and dance.
                  The Mehndi party calls for{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    chaat
                  </Link>{' '}
                  and sweet things guests can pick up with one hand. We know all of this because we have
                  done all of this.
                </p>
                <p>
                  All meat - at every event, at every guest count, always - is sourced from{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    halal-certified suppliers
                  </Link>
                  . This is not an upgrade or a premium add-on. It is simply how we work.
                </p>
              </>
            )}
          </div>
          <Image
            src="/images/catering/wedding-celebrations---1.png"
            alt="Wedding celebration catering at Chopras Indian Restaurant Den Haag"
            width={800}
            height={500}
            className="rounded-2xl w-full object-cover mt-10"
          />
        </div>
      </section>

      {/* SECTION: Same Kitchen Quality */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'De Keuken die Uw Bruiloft Bereidt is Dezelfde als het Restaurant'
              : 'The Kitchen Preparing Your Wedding Is the Same as the Restaurant'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Veel cateraars huren extra koks in of schakelen over op vereenvoudigde methoden wanneer
                  de aantallen oplopen. Dat is niet hoe{' '}
                  <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Chopras Indian Restaurant
                  </Link>{' '}
                  werkt. De kruiden die voor uw bruiloftsdiner worden gebruikt, worden vers gemalen op de
                  ochtend van het evenement in dezelfde keuken als elke andere dag - afkomstig van
                  dezelfde leveranciers in India, bereid met dezelfde technieken. Er is geen
                  vereenvoudigd bruiloftsmenu.
                </p>
                <p>
                  De{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    tandoor kleioven
                  </Link>{' '}
                  bereikt 400 graden Celsius. Dat is de temperatuur die{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    tandoori kip
                  </Link>{' '}
                  zijn rookkorsje en naan zijn rand geeft. Die oven werkt op dezelfde manier op uw
                  trouwdag als op een doordeweekse dinsdagavond. Er bestaat geen snelkoppeling voor dit
                  resultaat.
                </p>
                <p>
                  Chopras heeft een 4,9-sterrenbeoordeling op Google van meer dan 800 geverifieerde
                  beoordelingen. Gasten die terugkomen voor een bruiloft hebben dit restaurant al
                  meegemaakt via het{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    avondmenu
                  </Link>
                  . Wat zij op Leyweg 986 vinden op uw trouwdag is precies hetzelfde. Dat is de standaard
                  waar Chopras Indiase bruiloftscatering in Den Haag op staat.
                </p>
              </>
            ) : (
              <>
                <p>
                  Many caterers hire additional cooks or switch to simplified methods when numbers scale
                  up. That is not how{' '}
                  <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Chopras Indian Restaurant
                  </Link>{' '}
                  works. The spices used for your wedding dinner are ground fresh on the morning of the
                  event in the same kitchen as every other day - sourced from the same suppliers in India,
                  prepared with the same techniques. There is no simplified wedding menu.
                </p>
                <p>
                  The{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    tandoor clay oven
                  </Link>{' '}
                  reaches 400 degrees Celsius. That is the temperature that gives{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    tandoori chicken
                  </Link>{' '}
                  its smoky crust and naan its charred edge. That oven works the same way on your wedding
                  day as it does on a regular Tuesday evening. No shortcut produces that result.
                </p>
                <p>
                  Chopras holds a 4.9-star rating on Google from 800+ verified reviews. Guests who return
                  for a wedding have already experienced this restaurant at the{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    dinner menu
                  </Link>
                  . What they find at Leyweg 986 on your wedding day is exactly the same standard. That is
                  what Indian wedding catering in Den Haag at Chopras means.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION: Wedding Occasions Grid */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Bruiloftsgelegenheden die Wij Cateren' : 'Wedding Occasions We Cater'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weddingOccasions.map((occasion) => (
              <div key={occasion.title} className="bg-white rounded-xl p-6 border-l-4 border-white">
                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">{occasion.title}</h3>
                <p className="font-body text-[#1A1A1A] text-base leading-relaxed">{occasion.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: What a Wedding Menu Looks Like */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Wat Staat Er op een Chopras Bruiloftsmenu?'
              : 'What Goes on a Chopras Wedding Menu?'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Een typisch Chopras bruiloftsmenu omvat een selectie van starters, hoofdgerechten, brood
                  en rijstgerechten die samen de kern van de Noord-Indiase keuken vertegenwoordigen. Voor
                  starters:{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    tandoori schotels
                  </Link>{' '}
                  uit de kleioven, seekh kebab, paneer tikka en{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    chaat-hapjes
                  </Link>{' '}
                  voor gasten bij aankomst.
                </p>
                <p>
                  Voor de hoofdgerechten baseert elk menu zich op de gelegenheid en de voorkeuren van het
                  stel.{' '}
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
                  en een of twee extra currys zijn een veelvoorkomende basis.{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Saffraanbiryani
                  </Link>{' '}
                  en verse naan worden gedurende de hele avond aangevuld.
                </p>
                <p>
                  Vegetarische en veganistische gasten worden volledig bediend - niet met een enkele
                  schotel als optie, maar met een volwaardig deel van het menu dat speciaal voor hen is
                  samengesteld. Het{' '}
                  <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    veganistisch menu
                  </Link>{' '}
                  en het{' '}
                  <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    volledig halal menu
                  </Link>{' '}
                  vormen de basis van elk bruiloftsmenu dat Chopras samenstelt.
                </p>
              </>
            ) : (
              <>
                <p>
                  A typical Chopras wedding menu covers a selection of starters, mains, breads and rice
                  dishes that together represent the core of North Indian cooking. For starters:{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    tandoori dishes
                  </Link>{' '}
                  from the clay oven, seekh kebab, paneer tikka, and{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    chaat snacks
                  </Link>{' '}
                  for guests on arrival.
                </p>
                <p>
                  For mains, every menu is shaped around the occasion and the couple&apos;s preferences.{' '}
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
                  and one or two additional curries are a common base.{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Saffron biryani
                  </Link>{' '}
                  and fresh naan are replenished throughout the evening.
                </p>
                <p>
                  Vegetarian and vegan guests are fully served - not with a single token dish, but with a
                  dedicated portion of the menu composed specifically for them. The{' '}
                  <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    vegan menu
                  </Link>{' '}
                  and the{' '}
                  <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    fully halal menu
                  </Link>{' '}
                  form the foundation of every wedding menu Chopras composes.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Verzorgt Chopras Indian Restaurant Bruiloftscatering in Den Haag?'
              : 'Does Chopras Indian Restaurant Do Wedding Catering in Den Haag?'}
          </h2>
          <div className="font-body text-white/90 text-lg leading-relaxed">
            {isNl ? (
              <p>
                Ja. Chopras Indian Restaurant verzorgt Indiase bruiloftscatering in Den Haag en omgeving
                vanuit de keuken op{' '}
                <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Leyweg 986, 2545 GW Den Haag
                </Link>
                . Het team cater voor nikah-recepties, walima-diners, sangeet-avonden en bruiloftsdiners
                voor groepen van 25 tot 80 gasten. Al het vlees is halal gecertificeerd. Het restaurant
                heeft een 4,9-sterrenbeoordeling van meer dan 800 Google-beoordelingen en is geopend
                van dinsdag tot en met zondag van 16:30 tot 22:30. Vraag een bruiloftsofferte aan via het{' '}
                <Link href={`${base}/catering#catering-form`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  cateringformulier
                </Link>
                .
              </p>
            ) : (
              <p>
                Yes. Chopras Indian Restaurant provides Indian wedding catering in Den Haag and surrounding
                areas from its kitchen at{' '}
                <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Leyweg 986, 2545 GW Den Haag
                </Link>
                . The team caters for nikah receptions, walima dinners, sangeet nights and full wedding
                dinners for groups of 25 to 80 guests. All meat is halal certified. The restaurant holds
                a 4.9-star rating from 800+ Google reviews and is open Tuesday to Sunday from 16:30 to
                22:30. Submit a wedding catering enquiry via the{' '}
                <Link href={`${base}/catering#catering-form`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  catering form
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Begin Uw Bruiloftsplanning bij Chopras'
              : 'Start Your Wedding Catering Planning with Chopras'}
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8 max-w-2xl">
            {isNl
              ? 'Stuur ons uw datum, het aantal gasten en het type gelegenheid. Wij hebben binnen 24 uur een voorstel voor u - vrijblijvend, zonder druk.'
              : 'Send us your date, guest count, and the type of occasion you are planning. We will have a proposal back to you within 24 hours - no obligation, no pressure.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/catering#catering-form`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-transparent hover:text-white active:scale-[0.98] min-h-[48px] cursor-pointer"
            >
              {isNl ? 'Bruiloftsofferte Aanvragen' : 'Get a Wedding Quote'}
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
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3] text-center">
            {isNl ? 'Andere Cateringmogelijkheden' : 'Other Catering Options'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link href={`${base}/indian-birthday-catering-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Verjaardag' : 'Birthday'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiase verjaardagscatering Den Haag' : 'Indian birthday catering Den Haag'}</p>
            </Link>
            <Link href={`${base}/corporate-events-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Bedrijfsgebeurtenis' : 'Corporate Event'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiase catering voor bedrijven' : 'Indian catering for corporate events'}</p>
            </Link>
            <Link href={`${base}/diwali-dinner-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Diwali</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Diwali-diner Den Haag' : 'Diwali dinner Den Haag'}</p>
            </Link>
            <Link href={`${base}/feestzaal-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Feestzaal' : 'Event Space'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Feestzaal huren voor bruiloft Den Haag' : 'Event space rental for weddings Den Haag'}</p>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl
                  ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag'
                  : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              {isNl ? 'Bekijk het volledige' : 'View the full'}{' '}
              <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'cateringsmenu' : 'catering menu'}
              </Link>
              {' '}{isNl ? 'of' : 'or'}{' '}
              <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'maak nu een afspraak' : 'book a consultation now'}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
