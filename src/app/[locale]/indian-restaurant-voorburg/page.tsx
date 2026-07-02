import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

const faqsEn = [
  { question: 'How far is Chopras Indian Restaurant from Voorburg?', answer: 'Chopras Indian Restaurant is at Leyweg 986, Den Haag, approximately 10 minutes by car from central Voorburg. Direct bus connections link Voorburg Centrum to the Leyweg area with no changes required.' },
  { question: 'Is Chopras Indian Restaurant halal certified?', answer: 'Yes. Chopras Indian Restaurant is fully halal certified. All meat is halal sourced and the full menu is suitable for guests requiring halal food in the Voorburg and Den Haag area.' },
  { question: 'What are the opening hours at Chopras Indian Restaurant?', answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Mondays.' },
]

const faqsNl = [
  { question: 'Hoe ver is Chopras Indian Restaurant van Voorburg?', answer: 'Chopras Indian Restaurant is op Leyweg 986, Den Haag, ongeveer 10 minuten rijden van centraal Voorburg. Directe busverbindingen verbinden Voorburg Centrum met het Leyweg-gebied zonder overstap.' },
  { question: 'Is Chopras Indian Restaurant halal gecertificeerd?', answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Al het vlees is halal ingekocht en het volledige menu is geschikt voor gasten die halal voedsel vereisen in de regio Voorburg en Den Haag.' },
  { question: 'Wat zijn de openingstijden van Chopras Indian Restaurant?', answer: 'Chopras Indian Restaurant is open dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is op maandag gesloten.' },
]

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Near Voorburg | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant bij Voorburg | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant near Voorburg. Chopras Indian Restaurant Den Haag is 10 minutes away at Leyweg 986. Authentic halal food. Open Tuesday to Sunday.',
    nl: 'Indiaas restaurant bij Voorburg. Chopras Indian Restaurant is 10 minuten rijden in Den Haag. Halal gecertificeerd. Open dinsdag tot en met zondag.',
  }
  return {
    title: titles[locale], description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-restaurant-voorburg'),
      languages: { en: getLocalizedUrl('en', 'indian-restaurant-voorburg'), nl: getLocalizedUrl('nl', 'indian-restaurant-voorburg'), 'x-default': getLocalizedUrl('en', 'indian-restaurant-voorburg') },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-restaurant-voorburg'),
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

export default function IndianRestaurantVoorburgPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const restaurantSchema = getLocalRestaurantSchema(
    locale,
    ['Voorburg', 'Leidschendam', 'Den Haag', 'South Holland'],
    getLocalizedUrl(locale, 'indian-restaurant-voorburg'),
  )

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Restaurant bij Voorburg' : 'Indian Restaurant Near Voorburg', item: getLocalizedUrl(locale, 'indian-restaurant-voorburg') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • NEAR YOU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl ? 'Indiaas Restaurant bij Voorburg  -  Chopras is Tien Minuten Rijden' : 'Indian Restaurant Near Voorburg  -  Chopras is Ten Minutes Away'}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl max-w-3xl mx-auto"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl ? 'Authentiek Noord-Indiaas eten, volledig halal gecertificeerd, open dinsdag tot en met zondag. Leyweg 986, Den Haag  -  vlak in de buurt van Voorburg.' : 'Authentic North Indian food, fully halal certified, open Tuesday to Sunday. Leyweg 986, Den Haag  -  just near Voorburg.'}
          </p>
        </div>
      </section>

      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-8">
            {isNl ? 'Van Voorburg naar Leyweg' : 'From Voorburg to Leyweg'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>Voorburg is een woonwijk in de gemeente Leidschendam-Voorburg, met dezelfde urbanisatie en detailhandelsinfrastructuur als veel wijken van Den Haag. Chopras op Leyweg 986 is ongeveer 10 minuten rijden van centraal Voorburg  -  aanmerkelijk dichterbij dan veel dagelijkse bestemmingen van Voorburg-inwoners.</p>
                <p>Openbaar vervoer is rechtlijnig. Busverbindingen verbinden Voorburg Centrum rechtstreeks met het Leyweg-winkelgebied zonder overstap. De reis duurt doorgaans 12 tot 15 minuten vanuit centraal Voorburg.</p>
                <p>Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang. Betaald parkeren is beschikbaar in de omgeving van Leyweg voor gasten die met de auto komen.</p>
                <p>Voorburg heeft een aanzienlijke Zuid-Aziatische gemeenschap  -  vooral Hindoestaanse en Maleisische families  -  voor wie authentiek Indiaas eten een erkende culinaire voorkeur is. Voor deze gemeenschap is Chopras de dichtstbijzijnde optie van hoge kwaliteit.</p>
              </>
            ) : (
              <>
                <p>Voorburg is a residential area in the municipality of Leidschendam-Voorburg, with the same urban fabric and retail infrastructure as many districts of Den Haag. Chopras at Leyweg 986 is approximately 10 minutes by car from central Voorburg  -  considerably closer than many everyday destinations for Voorburg residents.</p>
                <p>Public transport is straightforward. Bus connections link Voorburg Centrum directly to the Leyweg shopping area with no changes required. The journey is typically 12 to 15 minutes from central Voorburg.</p>
                <p>Tram line 2 stops at Leyweg, a short walk from the entrance. Paid parking is available in the Leyweg area for guests arriving by car.</p>
                <p>Voorburg has a substantial South Asian community  -  particularly Hindustani and Malaysian families  -  for whom authentic Indian food is a recognized culinary preference. For this community, Chopras is the nearest quality option.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-8">
            {isNl ? 'Waarom Voorburgse Bezoekers Chopras Kiezen' : 'Why Voorburg Residents Choose Chopras'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>Voorburgse vaste klanten bij Chopras convergereren op dezelfde kerngerechten die regelmatig terugkeren. <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:underline">Butter Chicken</Link> en Chicken Tikka Masala zijn de meest populaire instappen  -  toegankelijke introducties die onmiddellijk het verschil tussen Chopras en generieke restaurants duidelijk maken.</p>
                <p>De halalcertificering is relevant voor Voorburg. De regio heeft een aanzienlijke moslimbevolking  -  voornamelijk Marokkaanse, Turkse en Pakistaanse families, evenals orthodox-moslim Hindoestaanse gezinnen  -  voor wie een echt gecertificeerd halal Indiaas restaurant op tien minuten rijden een betekenisvolle lokale optie is.</p>
                <p>Het restaurant is gezinsvriendelijk in de echte betekenis. De menuopties zijn aanpasbaar voor kinderen. De porties zijn royaal. De sfeer is warm en gastvrij zonder formeel of voornaam te zijn.</p>
              </>
            ) : (
              <>
                <p>Voorburg regulars at Chopras have converged on the same core dishes that recur regularly. <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:underline">Butter Chicken</Link> and Chicken Tikka Masala are the most popular entry points  -  accessible introductions that immediately establish the difference between Chopras and generic restaurants.</p>
                <p>The halal certification is relevant for Voorburg. The region has a substantial Muslim population  -  primarily Moroccan, Turkish, and Pakistani families, as well as orthodox Muslim Hindustani households  -  for whom a genuinely certified halal Indian restaurant within ten minutes is a meaningful local option.</p>
                <p>The restaurant is family-friendly in the genuine sense. The menu options are adaptable for children. The portions are generous. The atmosphere is warm and hospitable without being formal or familiar.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-8">
            {isNl ? 'Praktische Informatie voor Bezoekers uit Voorburg' : 'Practical Information for Voorburg Visitors'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {(isNl ? [
              { title: 'Afstand', desc: 'Ongeveer 10 minuten met de auto van centraal Voorburg. Leyweg 986 is dicht bij de grens met Leidschendam.' },
              { title: 'Openbaar Vervoer', desc: 'Directe busverbindingen vanuit Voorburg Centrum naar Leyweg  -  doorgaans 12 tot 15 minuten.' },
              { title: 'Per Tram', desc: 'Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang. Betaald parkeren is beschikbaar in de omgeving.' },
              { title: 'Openingstijden', desc: 'Dinsdag tot en met zondag: 16:30–22:30. Maandag gesloten.' },
            ] : [
              { title: 'Distance', desc: 'Approximately 10 minutes by car from central Voorburg. Leyweg 986 is close to the Leidschendam boundary.' },
              { title: 'Public Transport', desc: 'Direct bus connections from Voorburg Centrum to Leyweg - typically 12 to 15 minutes.' },
              { title: 'By Tram', desc: 'Tram line 2 stops at Leyweg, a short walk from the entrance. Paid parking also available nearby.' },
              { title: 'Opening Hours', desc: 'Tuesday to Sunday: 16:30–22:30. Closed Monday.' },
            ]).map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border-l-4 border-white">
                <h3 className="font-vibes text-lg text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`${base}/contact`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]">
              {tr.common.reserve}
            </Link>
            <Link href={`${base}/menu`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]">
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8FC] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
            {isNl ? 'Ook Nabij Den Haag' : 'Also Serving These Areas Near Den Haag'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`${base}/indian-restaurant-rijswijk`} className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-white transition-colors">
              <p className="font-vibes text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-bold">{isNl ? 'Indiaas Restaurant bij Rijswijk' : 'Indian Restaurant Near Rijswijk'}</p>
              <p className="text-gray-600 text-sm mt-1">{isNl ? 'Chopras bedient ook Rijswijk' : 'Chopras also serves Rijswijk'}</p>
            </Link>
            <Link href={`${base}/indian-restaurant-delft`} className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-white transition-colors">
              <p className="font-vibes text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-bold">{isNl ? 'Indiaas Restaurant bij Delft' : 'Indian Restaurant Near Delft'}</p>
              <p className="text-gray-600 text-sm mt-1">{isNl ? 'Chopras bedient ook Delft' : 'Chopras also serves Delft'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-10">
            {isNl ? 'Ontdek Populaire Gerechten' : 'Explore Popular Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Butter Chicken' : 'Butter Chicken'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Populairste keus voor Voorburg-bezoekers' : 'Most popular choice for Voorburg visitors'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Dal Makhani' : 'Dal Makhani'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Langzaam gemaakte linzenmix' : 'Slow-cooked lentil speciality'}</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Tandoori' : 'Tandoori'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Recht uit de kleioven' : 'Straight from the clay oven'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas buffet voor evenementen' : 'Indian catering for events'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'Chopras Indiaas Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {isNl ? 'Bekijk het volledige menu of' : 'View the full menu or'} <a href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">{isNl ? 'maak een reservering voor Voorburg' : 'book a table from Voorburg at Chopras Indian Restaurant Den Haag'}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
