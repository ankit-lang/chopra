import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import JsonLd from '@/components/seo/JsonLd'
import { RESTAURANT } from '@/lib/constants'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema, getLocalRestaurantSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Corporate Events Den Haag | Chopras Indian Restaurant',
    nl: 'Zakelijke Evenementen Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Corporate events Den Haag. Chopras Indian Restaurant provides Indian catering for team dinners and receptions. Halal certified. Up to 80 guests. Book now.',
    nl: 'Zakelijke evenementen Den Haag. Chopras Indian Restaurant verzorgt Indiaas catering voor teamdiners. Halal gecertificeerd. Tot 80 gasten. Boek nu.',
  }
  return {
    title: titles[locale], description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'corporate-events-den-haag'),
      languages: { en: getLocalizedUrl('en', 'corporate-events-den-haag'), nl: getLocalizedUrl('nl', 'corporate-events-den-haag'), 'x-default': getLocalizedUrl('en', 'corporate-events-den-haag') },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'corporate-events-den-haag'),
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

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Kunt u ook op ons kantoor of externe locatie cateren?',
    answer: 'Ja. Chopras Indian Restaurant verzorgt volledige zakelijke catering op locatie door Den Haag en omgeving, inclusief Rijswijk, Delft en Zoetermeer. Wij brengen de volledige keukenoperatie naar uw locatie, of dat nu een ministerie, kantoorgebouw, congrescentrum of externe evenementenlocatie is. Alle catering wordt bereid op dezelfde standaard als het restaurant op Leyweg 986.',
  },
  {
    question: 'Wat is de minimale groepsgrootte voor zakelijke catering?',
    answer: 'De minimale groepsgrootte voor zakelijke evenementencatering is 15 personen. Voor groepen van 15 tot 80 gasten verzorgt Chopras Indian Restaurant de volledige spread inclusief opbouw en professioneel bedienend personeel. Voor kleinere executive diners van minder dan 15 gasten raden wij aan direct te boeken op Leyweg 986 in Den Haag.',
  },
  {
    question: 'Is de catering halal gecertificeerd?',
    answer: 'Ja, volledig. Bij Chopras Indian Restaurant is halal geen menuoptie - het is de gehele keuken. Elk vleesgerecht, elke leverancier en elk ingrediënt is halal gecertificeerd. Dit geldt ook voor catering op externe locaties. Gasten met strikte halal-dieetvereisten kunnen alles op de spread eten zonder uitzondering of voorbehoud.',
  },
  {
    question: 'Levert u bedienend personeel voor zakelijke evenementen?',
    answer: 'Ja. Elke zakelijke cateringboeking omvat professioneel bedienend personeel voor de volledige duur van het evenement. Ons personeel bestaat uit ervaren restaurantprofessionals van Chopras Indian Restaurant, geen uitzendkrachten die voor één avond zijn ingehuurd. Voor formele bediening aan tafel of staande foodstations regelt het team de opbouw, service en afbouw.',
  },
  {
    question: 'Hoe snel kunt u een zakelijke cateringofferte verstrekken?',
    answer: 'Chopras Indian Restaurant verstrekt gespecificeerde zakelijke cateringoffertes binnen 24 uur na ontvangst van uw evenementgegevens. Stuur uw evenementdatum, locatie, verwacht aantal gasten en gewenst format naar info [at] chopras.nl. Voor boekingen in dezelfde week of urgente vereisten belt u ons direct op +31 6 30645930.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'Can you cater at our office or external venue?',
    answer: 'Yes. Chopras Indian Restaurant provides full off-site corporate catering across Den Haag and surrounding areas including Rijswijk, Delft and Zoetermeer. We bring the full kitchen operation to your location, whether that is a ministry, an office building, a conference centre, or an external event venue. All catering is prepared to the same standard as the restaurant at Leyweg 986.',
  },
  {
    question: 'What is the minimum group size for corporate catering?',
    answer: 'The minimum group size for corporate event catering is 15 people. For groups of 15 to 80 guests, Chopras Indian Restaurant handles the full spread including setup and professional serving staff. For smaller executive dinners of fewer than 15 guests, we recommend booking directly at Leyweg 986 in Den Haag.',
  },
  {
    question: 'Is the catering halal certified?',
    answer: 'Yes, completely. At Chopras Indian Restaurant, halal is not a menu section - it is the entire kitchen. Every meat dish, every supplier and every ingredient is sourced from a certified halal provider. This applies equally to catering at external venues. Guests with strict halal dietary requirements can eat anything on the spread without exception.',
  },
  {
    question: 'Do you provide serving staff for corporate events?',
    answer: 'Yes. Every corporate catering booking includes professional serving staff for the full duration of the event. Our staff are experienced restaurant professionals from Chopras Indian Restaurant, not agency workers hired for one evening. For formal plated service or standing food stations, the team handles setup, service and clear-down.',
  },
  {
    question: 'How quickly can you provide a corporate catering quote?',
    answer: 'Chopras Indian Restaurant provides itemised corporate catering quotes within 24 hours of receiving your event details. Send your event date, venue location, expected guest count and preferred format to info [at] chopras.nl. For same-week bookings or urgent requirements, call directly on +31 6 30645930.',
  },
]

export default function CorporateEventsPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: isNl ? 'Zakelijke Evenementencatering Den Haag' : 'Corporate Event Catering Den Haag',
    serviceType: isNl ? 'Zakelijke Evenementencatering' : 'Corporate Event Catering',
    description: locale === 'nl'
      ? 'Professionele Indiase zakelijke evenementencatering in Den Haag voor teamdiners, conferenties en bedrijfsfeesten. Halal gecertificeerd. Chopras Indian Restaurant op Leyweg 986.'
      : 'Professional Indian corporate event catering in Den Haag for team dinners, conferences and company parties. Halal certified. Chopras Indian Restaurant at Leyweg 986.',
    provider: { '@type': 'Restaurant', name: RESTAURANT.name, telephone: RESTAURANT.contact.phone, url: RESTAURANT.contact.website },
    areaServed: RESTAURANT.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
  }

  const eventCards = isNl ? [
    { emoji: '🍽️', title: 'Teamdiners en Bedrijfsvieringen', desc: 'Eindejaarsdiners, kwartaalvieringen, teamuitjes. Een Indiaas spread is genereus, gezellig en past bij elk voedingsprofiel in de zaal zonder speciale verzoeken.' },
    { emoji: '🤝', title: 'Klantentertainment en Bedrijfsontwikkeling', desc: 'Een klantendiner bij Chopras, of Chopras-catering op uw locatie, maakt een meer memorabele indruk dan een standaard restaurantboeking.' },
    { emoji: '🚀', title: 'Productlanceringen en Persevents', desc: 'Street food stations, chaat bars, Indiase kleine gerechten op canapé-stijl - Indiaas eten creëert visuele en smaakbelevenissen die goed fotograferen.' },
    { emoji: '🏆', title: 'Conferentiediners en Uitreikingen', desc: 'Volledige bediening op bord voor 40 tot 80 gasten. Professioneel, op tijd en uitgevoerd zonder keukendrama aan uw kant.' },
    { emoji: '🌍', title: 'Overheids- en Diplomatieke Recepties', desc: 'Chopras heeft de halal-certificering en de multiculturele menuomvang die vereist is voor internationale diplomatieke catering waar dieetvereisten strikt en gevarieerd kunnen zijn.' },
    { emoji: '💬', title: 'Netwerkevenementen en Meetups', desc: 'Kleinere, staande evenementen waar gasten bewegen en socialiseren. Indiase canapés en street food stations werken perfect voor dit formaat.' },
    { emoji: '📋', title: 'Trainingen en Workshopcatering', desc: 'Avondcatering voor trainingen en meerdaagse workshops. Teams die een lange dag afsluiten met een goed Indiaas diner zijn energieker voor de avondsessie of de volgende ochtend.' },
    { emoji: '✈️', title: 'Bezoeken van Internationale Delegaties', desc: 'Bij het ontvangen van delegaties uit India, de Golfregio, Zuid-Azië of Afrika draagt authentieke Indiase catering een culturele herkenning die generiek Nederlands eten niet heeft.' },
  ] : [
    { emoji: '🍽️', title: 'Team Dinners and Company Celebrations', desc: 'Year-end dinners, quarterly celebrations, team offsites. An Indian spread is generous, sociable and suits every dietary profile in the room without special requests.' },
    { emoji: '🤝', title: 'Client Entertainment and Business Development', desc: 'A client dinner at Chopras, or Chopras catering at your premises, creates a more memorable impression than a standard restaurant booking.' },
    { emoji: '🚀', title: 'Product Launches and Press Events', desc: 'Street food stations, chaat bars, canape-style Indian small plates - Indian food creates visual and flavour moments that photograph well.' },
    { emoji: '🏆', title: 'Conference Dinners and Awards Ceremonies', desc: 'Full plated service for 40 to 80 guests. Professional, timed, and executed without kitchen drama on your side.' },
    { emoji: '🌍', title: 'Government and Diplomatic Receptions', desc: 'Chopras has the halal certification and the multicultural menu breadth required for international diplomatic catering where dietary requirements may be strict and varied.' },
    { emoji: '💬', title: 'Networking Events and Meetups', desc: 'Smaller, standing-format events where guests move and mingle. Indian canapes and street food stations work perfectly for this format.' },
    { emoji: '📋', title: 'Training Days and Workshop Catering', desc: 'Evening catering for training days and full-day workshops. Teams that close out a long day with a proper Indian dinner arrive at the evening session or the next morning in better shape.' },
    { emoji: '✈️', title: 'International Delegation Visits', desc: 'When hosting delegations from India, the Gulf States, South Asia or Africa, authentic Indian catering carries a cultural recognition that generic Dutch food does not.' },
  ]

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag', 'Rijswijk', 'Delft', 'Zoetermeer'], getLocalizedUrl(locale, 'corporate-events-den-haag'))} />
      <JsonLd data={serviceSchema as Record<string, unknown>} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Zakelijke Evenementen' : 'Corporate Events', item: getLocalizedUrl(locale, 'corporate-events-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1B2B5E]">
        <div className="absolute inset-0">
          <Image
            src="/images/catering/corporate-dinners-at-chopras.png"
            alt="Corporate events Den Haag at Chopras Indian Restaurant"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B5E]/60 via-[#1B2B5E]/40 to-[#1B2B5E]/75" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 
            className="font-vibes text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl
              ? 'Zakelijke Evenementen in Den Haag - Indiase Catering en Privélocatie bij Chopras'
              : 'Corporate Events in Den Haag - Indian Catering and Private Venue at Chopras'}
          </h1>
          <p className="text-xl text-white/75 mt-6 leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'Teamdiners. Klantentertainment. Productlanceringen. Conferentiecatering. Voor 15 tot 80 gasten in Den Haag.'
              : 'Team dinners. Client entertainment. Product launches. Conference catering. For 15 to 80 guests across Den Haag.'}
          </p>
          <div className="mt-8">
            <Link
              href={`${base}/catering#catering-form`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Zakelijke Offerte Aanvragen' : 'Get a Corporate Quote'}
            </Link>
          </div>
        </div>
      </section>

      {/* WHY DEN HAAG */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Waarom Den Haag de Zakelijke Evenementenhoofdstad van Nederland Is'
              : 'Why Den Haag Is the Corporate Event Capital of the Netherlands'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Den Haag is niet alleen de zetel van de Nederlandse overheid - het is een van de internationaal meest geconcentreerde steden van Europa. Meer dan 150 ambassades. <Link href={`${base}/indian-restaurant-near-peace-palace-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Het Internationaal Gerechtshof</Link>. <Link href={`${base}/indian-restaurant-near-peace-palace-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Het Vredespaleis</Link>. De hoofdkwartieren van Europol, de OPCW en het ICC. Honderden NGO&apos;s en internationale organisaties met personeel van over de hele wereld aan dezelfde tafel.</p>
                <p>Dit creëert een ongewone dichtheid van zakelijke evenementen waarbij de gastenlijst tegelijkertijd culturen, dieetvereisten en verwachtingen omspant. Ministeriële diners, diplomatieke recepties, eindejaarsfeesten, klantentertainment waarbij de aankomende gast uit India, Indonesië of Saudi-Arabië kan komen. Generiek eten werkt niet voor dat spectrum. Indiaas eten wel.</p>
                <p>Indiase keuken is een van de weinige culinaire tradities die <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal, vegetarisch, veganistisch en glutenvrij</Link> op een natuurlijke manier in één spread dekt - niet door aanpassing, maar omdat dat de structuur van het eten is. Chopras Indian Restaurant heeft zakelijke evenementen gecaterd voor teams van 15 tot 80 gasten in Den Haag en de wijdere regio.</p>
              </>
            ) : (
              <>
                <p>Den Haag is not just the seat of Dutch government - it is one of the most internationally concentrated cities in Europe. More than 150 embassies. <Link href={`${base}/indian-restaurant-near-peace-palace-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">The International Court of Justice</Link>. <Link href={`${base}/indian-restaurant-near-peace-palace-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">The Peace Palace</Link>. The headquarters of Europol, the OPCW and the ICC. Hundreds of NGOs and international organisations with staff from every part of the world sitting around the same table.</p>
                <p>This creates an unusual density of corporate events where the guest list spans cultures, dietary requirements and expectations simultaneously. Ministerial dinners, diplomatic receptions, year-end team celebrations, client entertainment where the arriving guest may be from India, Indonesia or Saudi Arabia. Generic food does not work across that range. Indian food does.</p>
                <p>Indian cuisine is one of the few culinary traditions that naturally covers <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal, vegetarian, vegan and gluten-free</Link> in a single spread - not through special accommodation, but because that is the structure of the food. Chopras Indian Restaurant has catered corporate events for teams of 15 to 80 guests across Den Haag and the wider region.</p>
              </>
            )}
          </div>
          <Image
            src="/images/catering/team-dinners.png"
            alt="Team dinner catering at Chopras Indian Restaurant Den Haag"
            width={800}
            height={500}
            className="rounded-2xl w-full object-cover mt-10"
          />
        </div>
      </section>

      {/* WHY CHOPRAS - PROOF SECTION */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Waarom Zakelijke Klanten Kiezen voor Chopras Indian Restaurant'
              : 'Why Corporate Clients Choose Chopras Indian Restaurant'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Het kortste antwoord is consistentie. Wanneer u zakelijke catering in Den Haag boekt, is de zorg niet of het eten op de dag goed smaakt. De zorg is of het zo goed smaakt als de offerte beloofde. Chopras Indian Restaurant heeft 4,9 sterren van meer dan 800 geverifieerde Google-reviews. Die beoordeling komt van gewone gasten en van zakelijke klanten die groepen van 30, 50 en 80 personen boeken. De keuken hanteert geen aparte standaard voor evenementen.</p>
                <p><strong>De kruiden komen niet uit een zak.</strong> Masala&apos;s worden direct uit India ingekocht en elke ochtend voor de service vers gemalen. De vluchtige aroma&apos;s in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Wat u op een zakelijk diner serveert, moet smaken als goed bereid Indiaas eten. Het <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">volledige menu van 143 gerechten</Link> bij Chopras wordt bereid met dezelfde keukenstandaard, of het nu een doordeweekse restaurantavond of <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">catering voor 80 gasten</Link> betreft.</p>
                <p>De <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal-certificering</Link> dekt de gehele keuken. Niet een halal-menuoptie. Niet een halal-sectie. Elk gerecht, elke leverancier en elk ingrediënt komt van een gecertificeerde halal-bron. Wanneer uw gastenlijst collega&apos;s uit Zuid-Azië, de Golfstaten of Noord-Afrika bevat, is er geen voorbehoud nodig. Alles op tafel is veilig.</p>
                <p>Het <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegetarische en veganistische aanbod</Link> werkt voor elk dieetprofiel in de zaal tegelijk. Noord-Indiase keuken dekt halal, vegetarisch, veganistisch en glutenvrij als een structureel kenmerk van de eettraditie - niet als aanpassing of verzoek. Een zakelijke groep van 40 personen met gemengde dieetvereisten heeft geen coördinatie nodig. De spread regelt zichzelf.</p>
              </>
            ) : (
              <>
                <p>The shortest answer is consistency. When you book corporate catering in Den Haag, the concern is not whether the food will taste good on the day. The concern is whether it will taste as good as the quote promised. Chopras Indian Restaurant holds 4.9 stars from 800+ verified Google reviews. That rating comes from regular guests and from corporate clients booking groups of 30, 50 and 80. The kitchen does not maintain a separate standard for events.</p>
                <p><strong>The spices are not from a bag.</strong> Masalas are sourced directly from India and ground fresh every morning before service. The volatile aromatics in cumin, cardamom and coriander begin evaporating within hours of grinding. What you serve at a corporate dinner should taste like Indian food made properly. The <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">143-dish menu</Link> at Chopras is prepared to the same kitchen standard whether it is a weekday evening in the restaurant or <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">catering for 80 guests</Link>.</p>
                <p>The <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal certification</Link> covers the entire kitchen. Not a halal menu option. Not a halal section. Every dish, every supplier and every ingredient is sourced from a certified halal provider. When your guest list includes colleagues from South Asia, the Gulf States or North Africa, there is no qualification needed. Everything on the table is safe.</p>
                <p>The <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegetarian and vegan menu</Link> handles every dietary profile in the room simultaneously. North Indian cuisine naturally covers halal, vegetarian, vegan and gluten-free as a structural feature of the food tradition - not as an accommodation or special request. A corporate group of 40 with mixed dietary requirements needs no coordination. The spread handles itself.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* EVENT TYPE CARDS */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3] text-center">
            {isNl ? 'Soorten Zakelijke Evenementen die Wij Cateren' : 'Types of Corporate Events We Cater'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {eventCards.map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3 className="font-vibes font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-base mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Verzorgt Chopras Indian Restaurant Zakelijke Evenementen in Den Haag?'
              : 'Does Chopras Indian Restaurant Handle Corporate Events in Den Haag?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <p>Ja. Chopras Indian Restaurant op Leyweg 986, Den Haag verzorgt zakelijke evenementen en professionele catering voor groepen van 15 tot 80 gasten. Het restaurant is volledig halal gecertificeerd, met vegetarische en veganistische opties in het <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">volledige menu van 143 gerechten</Link>. Chopras cateert teamdiners, <Link href={`${base}/indian-restaurant-near-peace-palace-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">diplomatieke recepties bij het Vredespaleis</Link>, conferentiediners en productlanceringen in de eigen privézaal en op externe locaties door Den Haag. Beoordeeld met 4,9 sterren op Google. Open dinsdag tot en met zondag vanaf 16:30.</p>
            ) : (
              <p>Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag handles corporate events and professional catering for groups of 15 to 80 guests. The restaurant is fully halal certified, with vegetarian and vegan options across its <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">143-dish menu</Link>. Chopras caters team dinners, <Link href={`${base}/indian-restaurant-near-peace-palace-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">diplomatic receptions near the Peace Palace</Link>, conference meals and product launches both at its own private hall and at external venues across Den Haag. Rated 4.9 stars on Google from 800+ reviews. Open Tuesday to Sunday from 16:30.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Veelgestelde Vragen over Zakelijke Catering in Den Haag'
              : 'Frequently Asked Questions about Corporate Catering in Den Haag'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B2B5E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
            {isNl ? 'Zakelijke Cateringofferte Aanvragen' : 'Get a Corporate Catering Quote'}
          </h2>
          <p className="text-white/75 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
            {isNl
              ? 'Vertel ons over uw evenement - datum, locatie, aantal gasten en formaat - en wij hebben binnen 24 uur een duidelijke, gespecificeerde offerte voor u.'
              : 'Tell us about your event - date, location, guest count, and format - and we will have a clear, itemised quote back to you within 24 hours.'}
          </p>
          <Link
            href={`${base}/catering#catering-form`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
          >
            {isNl ? 'Offerte Aanvragen' : 'Request a Quote'}
          </Link>
          <div className="mt-6">
            <a href={`tel:${RESTAURANT.contact.phone}`} className="text-white/80 hover:text-white transition-colors text-lg">
              {isNl
                ? `Bel voor urgente aanvragen: ${RESTAURANT.contact.phoneDisplay}`
                : `Call for urgent enquiries: ${RESTAURANT.contact.phoneDisplay}`}
            </a>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-10 text-center">
            {isNl ? 'Andere Cateringmogelijkheden' : 'Other Catering Options'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/indian-wedding-catering-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Bruiloft' : 'Wedding'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiase bruiloftscatering' : 'Indian wedding catering'}</p>
            </Link>
            <Link href={`${base}/feestzaal-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Feestzaal' : 'Event Space'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Zakelijk evenement feestzaal Den Haag' : 'Business event space Den Haag'}</p>
            </Link>
            <Link href={`${base}/indian-birthday-catering-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Verjaardag' : 'Birthday'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Verjaardagscatering' : 'Birthday catering'}</p>
            </Link>
            <Link href={`${base}/diwali-dinner-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Diwali' : 'Diwali'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Diwali-diner' : 'Diwali dinner'}</p>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'Chopras Indiaas Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {isNl ? 'Bekijk het volledige' : 'View the full'}{' '}
              <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">{isNl ? 'cateringsmenu' : 'catering menu'}</Link>
              {' '}{isNl ? 'of' : 'or'}{' '}
              <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">{isNl ? 'maak nu een afspraak' : 'book a consultation now'}</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
