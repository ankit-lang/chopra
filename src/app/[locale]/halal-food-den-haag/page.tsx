import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDietFoodEstablishmentSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Is Chopras volledig halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Al het vlees is afkomstig van gecertificeerde halal-leveranciers. De gehele keuken werkt volgens halalstandaarden - niet alleen bepaalde gerechten of categorieën. Er is geen niet-halal vlees aanwezig op het pand. Dit is geen gedeeltelijke of selectieve certificering - het heeft betrekking op de gehele bedrijfsvoering, elk gerecht, elke dag.',
  },
  {
    question: 'Welke gerechten zijn halal bij Chopras?',
    answer: 'Elk vlees- en gevogeltegerecht bij Chopras is halal. Alle kip-, lams- en schapengerechten worden bereid met vlees van gecertificeerde halal-leveranciers. De vegetarische en veganistische gerechten bevatten per definitie geen vlees. Het volledige menu van 143 gerechten - niet-vegetarisch en vegetarisch - is beschikbaar voor halal-nalevers zonder uitzondering.',
  },
  {
    question: 'Doen jullie ook halal catering voor evenementen en bruiloften?',
    answer: 'Ja. Chopras verzorgt volledige halal-evenementencatering voor bruiloften, Nikah-recepties, Walima-diners, Eid-vieringen, zakelijke evenementen en privéfeesten. De catering - of het nu in onze eigen evenementenhal is of op een externe locatie - wordt uitgevoerd volgens dezelfde halalstandaarden als het restaurant. Dezelfde leveranciers, dezelfde keuken, dezelfde certificering.',
  },
  {
    question: 'Is het volledige menu halal?',
    answer: 'Al het vlees op het menu - kip, lam, schaap en zeevruchten - is halal gecertificeerd. De vegetarische en veganistische gerechten bevatten geen vlees. Er zijn geen niet-halal vleesopties op het Chopras-menu. Het pand bevat geen niet-halal vlees, wat elk risico op kruisbesmetting volledig uitsluit.',
  },
  {
    question: 'Hoe weet ik zeker dat het eten echt halal is?',
    answer: 'Chopras werkt uitsluitend met leveranciers die gecertificeerde halaldocumentatie kunnen overleggen. De keukenoperatie - van opslag tot bereiding tot service - werkt zonder enige blootstelling aan niet-halal vlees of producten. Niet-halal vlees is eenvoudigweg niet aanwezig op het pand. Als u specifieke leveranciersdocumentatie wilt inzien, kunt u dit opvragen - wij verstrekken dit graag.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'Is Chopras fully halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. All meat is sourced from certified halal suppliers. The entire kitchen operates to halal standards - not just certain dishes or categories. There is no non-halal meat on the premises. This is not a partial or selective certification - it covers the entire operation, every dish, every day.',
  },
  {
    question: 'Which dishes are halal at Chopras?',
    answer: 'Every meat and poultry dish at Chopras is halal. All chicken, lamb and mutton dishes are prepared with meat from certified halal suppliers. The vegetarian and vegan dishes contain no meat by definition. The full menu of 143 dishes - non-vegetarian and vegetarian - is available to halal-observant guests without exception.',
  },
  {
    question: 'Do you cater halal for events and weddings?',
    answer: 'Yes. Chopras provides full halal event catering for weddings, Nikah receptions, Walima dinners, Eid celebrations, corporate events, and private parties. The catering - whether at our own event hall or at an external venue - is carried out to the same halal standards as the restaurant. Same suppliers, same kitchen, same certification.',
  },
  {
    question: 'Is the entire menu halal?',
    answer: 'All meat on the menu - chicken, lamb, mutton and seafood - is halal certified. The vegetarian and vegan dishes contain no meat. There are no non-halal meat options on the Chopras menu. The premises contain no non-halal meat, which eliminates any risk of cross-contamination entirely.',
  },
  {
    question: 'How can I be sure the food is genuinely halal?',
    answer: 'Chopras works exclusively with suppliers who can provide certified halal documentation. The kitchen operation - from storage through preparation to service - runs without any exposure to non-halal meat or products. Non-halal meat is simply not present on the premises. If you want to see specific supplier documentation, you can request it - we will provide it.',
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Halal Indian Restaurant Den Haag | Chopras Indian Restaurant',
    nl: 'Halal Indiaas Restaurant Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Halal Indian restaurant Den Haag at Chopras Indian Restaurant. Only fully halal certified. No alcohol. 4.9 stars. Open Tuesday to Sunday. Book now.',
    nl: 'Halal Indiaas restaurant Den Haag bij Chopras Indian Restaurant. Volledig halal gecertificeerd. Geen alcohol. 4,9 sterren. Reserveer een tafel.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'halal-food-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'halal-food-den-haag'),
        nl: getLocalizedUrl('nl', 'halal-food-den-haag'),
        'x-default': getLocalizedUrl('en', 'halal-food-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'halal-food-den-haag'),
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

export default function HalalFoodPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'halal-food-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Halal Eten Den Haag' : 'Halal Food Den Haag', item: getLocalizedUrl(locale, 'halal-food-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Halal', 'Halal Indian', 'North Indian'], 'halal-food')} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl
              ? 'Halal Eten in Den Haag - Volledig Gecertificeerd bij Chopras'
              : 'Halal Food in Den Haag - Fully Certified at Chopras'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'Volledig halal-gecertificeerd Indiaas restaurant. Al het vlees van gecertificeerde leveranciers. Elke keer. Leyweg 986, Den Haag.'
              : 'Fully halal-certified Indian restaurant. All meat from certified suppliers. Every time. Leyweg 986, Den Haag.'}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Reserveer een Tafel' : 'Reserve a Table'}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bekijk het Menu' : 'View the Menu'}
            </Link>
          </div>
        </div>
      </section>

      {/* What Halal Means at Chopras */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Halal bij Chopras - Wat Dit Concreet Betekent' : 'Halal at Chopras - What This Actually Means'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Veel restaurants in Den Haag gebruiken het woord halal. Wat het in de praktijk betekent, verschilt sterk van pand tot pand.
                </p>
                <p>
                  Bij Chopras Indian Restaurant is halal geen sectie op het menu en geen sticker op bepaalde gerechten. De gehele keuken op Leyweg 986 werkt op basis van gecertificeerde halalstandaarden. Elke vleesleverancier levert gedocumenteerde halal-certificering voordat een enkel product het pand betreedt. De keuken verwerkt geen niet-halal vlees - omdat er geen niet-halal vlees op het terrein aanwezig is. Dat ene feit elimineert elk risico op kruisbesmetting volledig.
                </p>
                <p>
                  Dit is het meest relevant voor gezinnen die bij andere restaurants te horen hebben gekregen dat de zaak slechts gedeeltelijk halal is, of waarbij de certificering alleen geldt voor kip maar niet voor lam, of de grill gedeeld wordt met niet-halal producten. Bij Chopras is het antwoord altijd hetzelfde: elk kipgerecht, elke{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    lam biryani
                  </Link>
                  , elke{' '}
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    mutton rogan josh
                  </Link>
                  , elke{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    butter chicken
                  </Link>{' '}
                  - allemaal afkomstig van gecertificeerde halal-leveranciers, bereid in een keuken waar niet-halal vlees nooit aanwezig is geweest.
                </p>
                <p>
                  Met 4,9 sterren op basis van 800+ Google-recensies komt een aanzienlijk deel van de beoordelingen van moslimfamilies uit Den Haag, Rijswijk en Zoetermeer die hier een restaurant hebben gevonden waar zij met vertrouwen naartoe kunnen terugkeren. Dat vertrouwen is het resultaat van consistentie - niet van marketing.
                </p>
              </>
            ) : (
              <>
                <p>
                  Many restaurants in Den Haag carry the halal label. What it means in practice varies considerably from one kitchen to the next.
                </p>
                <p>
                  At Chopras Indian Restaurant, halal is not a section of the menu or a sticker on certain dishes. The entire kitchen at Leyweg 986 operates to certified halal standards. Every meat supplier provides documented halal certification before a single product enters the building. The kitchen does not handle any non-halal meat - because there is no non-halal meat on the premises. That single fact eliminates cross-contamination risk entirely.
                </p>
                <p>
                  This matters most to families who have been told elsewhere that a restaurant is only partially halal - or where certification covers chicken but not lamb, or where the grill is shared with non-halal products. At Chopras, the answer is always the same: every chicken dish, every{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    lamb biryani
                  </Link>
                  , every{' '}
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    mutton rogan josh
                  </Link>
                  , every{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    butter chicken
                  </Link>{' '}
                  - all sourced from certified halal suppliers, prepared in a kitchen where non-halal meat has never been present.
                </p>
                <p>
                  With 4.9 stars from 800+ Google reviews, a significant share of those reviews come from Muslim families across Den Haag, Rijswijk, and Zoetermeer who have found a restaurant they can return to with confidence. That trust is the result of consistency - not marketing.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* What Certified Halal Looks Like in Practice */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Wat Gecertificeerde Halal Betekent in de Praktijk' : 'What Certified Halal Looks Like in Practice'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  De claim is makkelijk gemaakt. De werkelijkheid zit in de toeleveringsketen.
                </p>
                <p>
                  Bij Chopras heeft elke vlees- en gevogelteverancier een geldige halal-certificering op bestand. Wanneer nieuwe leveranciers worden ingeschakeld, is halal-certificering een voorwaarde voor de samenwerking - geen bijzaak. Dit betekent dat het{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    volledige menu van 143 gerechten
                  </Link>{' '}
                  - van{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    tandoori kip
                  </Link>{' '}
                  tot seekh kebab en chicken tikka masala - is opgebouwd uit een toeleveringsketen waarbij elke schakel geverifieerd is.
                </p>
                <p>
                  Wat dit ook betekent voor moslimgasten is de afwezigheid van grijze zones. Geen gedeelde grill. Geen gemengde opslag. Geen situaties waarbij de ene leverancier wel gecertificeerd is en de andere niet. Chopras heeft geen bestaande keuken omgebouwd tot halal. Halal is de operationele standaard vanaf dag één.
                </p>
              </>
            ) : (
              <>
                <p>
                  The claim is easy to make. The reality is in the supply chain.
                </p>
                <p>
                  At Chopras, every meat and poultry supplier holds a valid halal certification on file. When new suppliers are considered, halal certification is a condition of the relationship - not an afterthought. This means the{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    full menu of 143 dishes
                  </Link>{' '}
                  - from{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    tandoori chicken
                  </Link>{' '}
                  to seekh kebab and chicken tikka masala - is built on a supply chain where every link is verified.
                </p>
                <p>
                  What this also means for Muslim guests is the absence of grey areas. No shared grill. No mixed storage. No situations where one supplier is certified and another is not. Chopras did not convert an existing kitchen to halal. Halal is the operating standard from day one.
                </p>
              </>
            )}
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(isNl ? [
              { title: 'Gecertificeerde leveranciers', body: 'Alle vleesleveranciers hebben geldige halal-certificaten op bestand' },
              { title: 'Geen niet-halal vlees op locatie', body: 'Geen niet-halal vlees of vleesproducten aanwezig op het pand - ooit' },
              { title: 'Aparte bereiding', body: 'Aparte bereiding en opslag voor alle vleesproducten van aankomst tot service' },
              { title: 'Catering ook gecertificeerd', body: 'Dezelfde gecertificeerde standaard geldt voor evenementencatering en bezorgbestellingen' },
            ] : [
              { title: 'Certified suppliers', body: 'All meat suppliers hold valid halal certificates on file' },
              { title: 'No non-halal meat on site', body: 'No non-halal meat or meat products present on the premises - ever' },
              { title: 'Separate handling', body: 'Dedicated preparation and storage for all meat products from arrival to service' },
              { title: 'Catering certified too', body: 'The same certified standard applies to event catering and delivery orders' },
            ]).map((item) => (
              <div key={item.title} className="bg-[#F7F8FC] rounded-xl p-6 border-l-4 border-white">
                <h3 className="font-vibes text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-2">{item.title}</h3>
                <p className="font-body text-[#1A1A1A] text-base leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                Het{' '}
                <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  halal menu bij Chopras
                </Link>{' '}
                dekt alle 13 gerechtcategorieën - curry&apos;s, tandoori, biryani, streetfood, Indo-Chinees en meer. Niet een deel ervan. Allemaal.
              </>
            ) : (
              <>
                The{' '}
                <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  halal menu at Chopras
                </Link>{' '}
                covers all 13 dish categories - curries, tandoori, biryani, street food, Indo Chinese and more. Not some of them. All of them.
              </>
            )}
          </p>
        </div>
      </section>

      {/* Halal Catering */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Halal Catering voor Bruiloften en Evenementen in Den Haag'
              : 'Halal Catering for Weddings and Events in Den Haag'}
          </h2>
          <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  De halalstandaard van Chopras reikt verder dan de restaurantruimte zelf.
                </p>
                <p>
                  Chopras verzorgt volledige{' '}
                  <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    halal catering voor evenementen
                  </Link>{' '}
                  in Den Haag en de regio Zuid-Holland. Voor Nikah-recepties, Walima-diners, Eid-vieringen en privéfamiliefeesten geldt dezelfde toeleveringsketen en dezelfde keukenstandaard als in het restaurant. Er worden geen concessies gedaan voor grotere volumes en er zijn geen uitzonderingen voor externe locaties.
                </p>
                <p>
                  De evenementenhal op Leyweg 986 biedt ruimte voor 25 tot 80 gasten.{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Indiaas bruiloftscatering
                  </Link>{' '}
                  en zakelijke evenementencatering zijn ook beschikbaar voor externe locaties. Voor moslimfamilies die halal-bevestigd eten nodig hebben op een evenement, kan Chopras het complete pakket leveren - eten, documentatie en zekerheid.
                </p>
              </>
            ) : (
              <>
                <p>
                  The halal kitchen standard at Chopras extends beyond the restaurant floor.
                </p>
                <p>
                  Chopras provides full{' '}
                  <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    halal catering for events
                  </Link>{' '}
                  across Den Haag and South Holland. For Nikah receptions, Walima dinners, Eid celebrations, and private family gatherings, the catering uses the same supply chain and the same kitchen standard as the restaurant. There are no concessions for volume and no shortcuts for external venues.
                </p>
                <p>
                  The private event hall at Leyweg 986 accommodates 25 to 80 guests.{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Indian wedding catering
                  </Link>{' '}
                  and corporate event catering are also available for external venues. For Muslim families who need halal-confirmed food at an event, Chopras can provide the complete brief - food, documentation, and certainty.
                </p>
              </>
            )}
          </div>
          <div className="mt-8">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Vraag een Offerte Aan' : 'Request a Quote'}
            </Link>
          </div>
        </div>
      </section>

      {/* Halal Menu Overview */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Halal Gerechten op het Chopras Menu' : 'Halal Food on the Chopras Menu'}
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            {isNl
              ? 'Alle 143 gerechten op het menu worden bereid in een volledig halal-gecertificeerde keuken. Hieronder een overzicht van de categorieën.'
              : 'All 143 dishes on the menu are prepared in a fully halal-certified kitchen. Below is an overview of the dish categories.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {(isNl ? [
              { cat: 'Kip Gerechten', items: 'Butter chicken, chicken tikka, chicken tikka masala, chicken biryani, chicken korma, tandoori kip, chicken karahi' },
              { cat: 'Lam en Schaap', items: 'Rogan josh, lam biryani, seekh kebab, lamb karahi, keema matar, lamb korma' },
              { cat: 'Vis en Zeevruchten', items: 'Garnalencurry en visgerechten - bereid vis, halalcompatibel geselecteerd' },
              { cat: 'Vegetarisch en Veganistisch', items: 'Dal makhani, chana masala, palak paneer, aloo gobi, vegetable biryani, paneer tikka - volledig vrij van vleesproducten' },
            ] : [
              { cat: 'Chicken Dishes', items: 'Butter chicken, chicken tikka, chicken tikka masala, chicken biryani, chicken korma, tandoori chicken, chicken karahi' },
              { cat: 'Lamb and Mutton', items: 'Rogan josh, lamb biryani, seekh kebab, lamb karahi, keema matar, lamb korma' },
              { cat: 'Fish and Seafood', items: 'Prawn curry and fish dishes - prepared fish, halal-compatible sourced' },
              { cat: 'Vegetarian and Vegan', items: 'Dal makhani, chana masala, palak paneer, aloo gobi, vegetable biryani, paneer tikka - completely free of meat products' },
            ]).map((item) => (
              <div key={item.cat} className="bg-white rounded-xl p-6 border-l-4 border-white">
                <h3 className="font-vibes text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-2">{item.cat}</h3>
                <p className="font-body text-[#1A1A1A] text-sm leading-relaxed">{item.items}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
          </div>
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Is Er Volledig Halal Gecertificeerd Indiaas Eten in Den Haag?'
              : 'Is There Fully Halal Certified Indian Food in Den Haag?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <p>
                Ja. Chopras Indian Restaurant op Leyweg 986 in Den Haag is volledig halal gecertificeerd. Elk vleesgerecht op het menu van 143 gerechten wordt bereid met gecertificeerde halal-leveranciers. Er is geen niet-halal vlees aanwezig op het pand, wat elk risico op kruisbesmetting volledig uitsluit. Het restaurant heeft 4,9 sterren op basis van 800+ Google-recensies en is open van dinsdag tot en met zondag vanaf 16:30.{' '}
                <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Reserveer een tafel
                </Link>{' '}
                of{' '}
                <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  bekijk het volledige halal menu
                </Link>{' '}
                op chopras.nl.
              </p>
            ) : (
              <p>
                Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag is fully halal certified. Every meat dish on the 143-item menu is prepared using certified halal suppliers. There is no non-halal meat on the premises, which eliminates cross-contamination risk entirely. The restaurant holds 4.9 stars from 800+ Google reviews and is open Tuesday to Sunday from 16:30.{' '}
                <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Reserve a table
                </Link>{' '}
                or{' '}
                <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  view the full halal menu
                </Link>{' '}
                at chopras.nl.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Halal bij Chopras' : 'Frequently Asked Questions About Halal at Chopras'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-10 leading-[1.4]">
            {isNl ? 'Ontdek Halal Gerechten bij Chopras' : 'Explore Halal Dishes at Chopras'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Halal roomkip in rijke tomatensaus' : 'Halal chicken in rich tomato and cream sauce'}</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Halal kip en kebab uit de kleioven' : 'Halal chicken and kebab from the clay oven'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Dal Makhani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Langzaam gegaarde linzen met boter en room' : 'Slow-cooked black lentils with butter and cream'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Halal kip of lam biryani met saffraanrijst' : 'Halal chicken or lamb biryani with saffron rice'}</p>
            </Link>
          </div>
          <div className="mt-8 space-y-4">
            {isNl ? (
              <>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Lees meer over{' '}
                  <Link href={`${base}/blog/halal-indian-restaurant-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    halal Indiaas restaurant Den Haag
                  </Link>{' '}
                  op ons blog, of bezoek{' '}
                  <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Chopras Indian Restaurant Den Haag
                  </Link>{' '}
                  voor het volledige overzicht.
                </p>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Bekijk het{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    volledige menu
                  </Link>{' '}
                  of{' '}
                  <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    maak een reservering
                  </Link>{' '}
                  - open dinsdag tot en met zondag vanaf 16:30 op Leyweg 986.
                </p>
              </>
            ) : (
              <>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Read more about{' '}
                  <Link href={`${base}/blog/halal-indian-restaurant-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    halal Indian restaurant Den Haag
                  </Link>{' '}
                  on our blog, or visit{' '}
                  <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    Chopras Indian Restaurant Den Haag
                  </Link>{' '}
                  for the full overview.
                </p>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  View the{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    full menu
                  </Link>{' '}
                  or{' '}
                  <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                    book a table at Chopras
                  </Link>{' '}
                  - open Tuesday to Sunday from 16:30 at Leyweg 986.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
