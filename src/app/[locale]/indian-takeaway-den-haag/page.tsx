import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { RESTAURANT } from '@/lib/constants'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getTakeawayServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Takeaway Den Haag | Chopras Indian Restaurant',
    nl: 'Indiaas Afhalen Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian takeaway Den Haag from Chopras Indian Restaurant. Order curries, biryani and naan for collection at Leyweg 986. Fresh and ready for pickup today.',
    nl: 'Indiaas afhalen Den Haag bij Chopras Indian Restaurant. Bestel curry, biryani en naan voor afhaling op Leyweg 986. Vers en klaar voor ophalen vandaag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-takeaway-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'indian-takeaway-den-haag'),
        nl: getLocalizedUrl('nl', 'indian-takeaway-den-haag'),
        'x-default': getLocalizedUrl('en', 'indian-takeaway-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-takeaway-den-haag'),
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
    question: 'What Indian food can I order for takeaway from Chopras in Den Haag?',
    answer: 'Chopras Indian Restaurant at Leyweg 986 Den Haag offers its full menu for collection, including biryani, butter chicken, mutton rogan josh, dal makhani, tandoori dishes, chaat and naan. All dishes are prepared in the same kitchen with spices ground fresh each morning from whole spices sourced directly from India. The collection menu covers all 143 dishes across 13 categories.',
  },
  {
    question: 'How do I order Indian takeaway from Chopras?',
    answer: 'Call Chopras Indian Restaurant on +31 6 30645930, place your order and collect from Leyweg 986 in Den Haag. Paid parking is available in the Leyweg area. Collection is available Tuesday to Sunday from 16:30 to 22:30. Delivery is also available via Thuisbezorgd and Uber Eats within 5 km of Leyweg.',
  },
  {
    question: 'Is Chopras Indian takeaway fully halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat dish, every supplier and every ingredient in the kitchen meets halal certification requirements. There is no non-halal meat anywhere on the premises, so there is no risk of cross-contamination. You can order with complete confidence.',
  },
  {
    question: 'Is the takeaway quality the same as dining in at Chopras?',
    answer: 'Yes. The same kitchen, the same spices ground fresh every morning from whole spices sourced directly from India, and the same preparation standards apply to every collection order. Chopras does not operate a separate or reduced-quality process for takeaway. The food that leaves the kitchen for collection is identical to what is served at the table.',
  },
  {
    question: 'Where can I collect my Indian takeaway order from Chopras?',
    answer: 'Collection is from Chopras Indian Restaurant at Leyweg 986, 2545 GW Den Haag. Paid parking is available in the Leyweg area. Open for collection Tuesday to Sunday from 16:30 to 22:30. Closed on Monday.',
  },
]

const faqsNl = [
  {
    question: 'Welk Indiaas eten kan ik afhalen bij Chopras in Den Haag?',
    answer: 'Chopras Indian Restaurant op Leyweg 986 in Den Haag biedt het volledige menu aan voor afhalen, inclusief biryani, butter chicken, mutton rogan josh, dal makhani, tandoori gerechten, chaat en naan. Alle gerechten worden bereid in dezelfde keuken met specerijen die elke ochtend vers worden gemalen van hele specerijen rechtstreeks uit India. Het afhaalmenu omvat alle 143 gerechten verdeeld over 13 categorieen.',
  },
  {
    question: 'Hoe bestel ik Indiaas afhaaleten bij Chopras?',
    answer: 'Bel Chopras Indian Restaurant op +31 6 30645930, geef uw bestelling door en haal op bij Leyweg 986 in Den Haag. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Afhalen is mogelijk dinsdag tot en met zondag van 16:30 tot 22:30. Bezorging is ook beschikbaar via Thuisbezorgd en Uber Eats binnen 5 km van Leyweg.',
  },
  {
    question: 'Is het Indiaas afhaaleten van Chopras volledig halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elk vleesgerecht, elke leverancier en elk ingrediënt in de keuken voldoet aan de halal certificeringsvereisten. Er is geen niet-halal vlees aanwezig op de locatie, dus er is geen risico op kruisbesmetting. U bestelt met volledig vertrouwen.',
  },
  {
    question: 'Is de kwaliteit van afhalen even goed als ter plekke eten bij Chopras?',
    answer: 'Ja. Dezelfde keuken, dezelfde specerijen die elke ochtend vers worden gemalen van hele specerijen rechtstreeks uit India, en dezelfde bereidingsnormen gelden voor elke afhaalbestelling. Chopras hanteert geen apart of lager kwaliteitsproces voor afhalen. Het eten dat de keuken verlaat voor afhalen is identiek aan wat aan tafel wordt geserveerd.',
  },
  {
    question: 'Waar kan ik mijn Indiaas afhaalbestelling ophalen bij Chopras?',
    answer: 'Afhalen is bij Chopras Indian Restaurant op Leyweg 986, 2545 GW Den Haag. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Open voor afhalen dinsdag tot en met zondag van 16:30 tot 22:30. Gesloten op maandag.',
  },
]

export default function IndianTakeawayPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag', 'Rijswijk', 'Delft'], getLocalizedUrl(locale, 'indian-takeaway-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Afhalen Den Haag' : 'Indian Takeaway Den Haag', item: getLocalizedUrl(locale, 'indian-takeaway-den-haag') },
      ])} />
      <JsonLd data={getTakeawayServiceSchema(locale)} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl ? 'Indiaas Eten Afhalen in Den Haag' : 'Indian Takeaway Den Haag'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? 'Dezelfde keuken. Dezelfde specerijen. Ophalen bij Leyweg 986 of bezorging via Thuisbezorgd en Uber Eats.'
              : 'Same kitchen. Same spices. Collect from Leyweg 986 or order via Thuisbezorgd and Uber Eats.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bel om te Bestellen' : 'Call to Order'}
            </a>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bekijk het Menu' : 'View the Menu'}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: Order options cards + hours */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="font-vibes text-2xl md:text-3xl text-[#C7A348] mb-3 leading-[1.3]">{isNl ? 'Bezorging' : 'Delivery'}</h3>
              <p className="font-body text-[#1A1A1A]/70 text-sm mb-4 leading-relaxed">{isNl ? 'Via Thuisbezorgd of Uber Eats, binnen 5 km van Leyweg' : 'Via Thuisbezorgd or Uber Eats, within 5 km of Leyweg'}</p>
              <a href="https://www.thuisbezorgd.nl/menu/chopras-indian-street-food" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px] mb-2 w-full">
                {tr.menu.thuisbezorgd}
              </a>
              <a href="https://www.ubereats.com/nl/store/chopras-indian-restaurant/kFKhBtR-W3OkJyl2f6QmUg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px] w-full">
                {tr.menu.ubereats}
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="font-vibes text-2xl md:text-3xl text-[#C7A348] mb-3 leading-[1.3]">{isNl ? 'Afhalen' : 'Collect'}</h3>
              <p className="font-body text-[#1A1A1A]/70 text-sm mb-4 leading-relaxed">{isNl ? 'Bel vooruit en haal op bij Leyweg 986. Betaald parkeren in de omgeving.' : 'Call ahead and collect from Leyweg 986. Paid parking nearby.'}</p>
              <a href={`tel:${RESTAURANT.contact.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px] w-full">
                {RESTAURANT.contact.phoneDisplay}
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="font-vibes text-2xl md:text-3xl text-[#C7A348] mb-3 leading-[1.3]">{isNl ? 'Ter Plekke Eten' : 'Dine In'}</h3>
              <p className="font-body text-[#1A1A1A]/70 text-sm mb-4 leading-relaxed">{isNl ? 'Reserveer een tafel bij Chopras Indian Restaurant' : 'Reserve a table at Chopras Indian Restaurant'}</p>
              <Link href={`${base}/contact`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px] w-full">
                {tr.common.reserve}
              </Link>
            </div>
          </div>
          <div className="bg-[#1B2B5E]/5 rounded-2xl p-6">
            <h3 className="font-vibes text-2xl md:text-3xl text-[#C7A348] mb-3 leading-[1.3]">
              {isNl ? 'Openingstijden voor Afhalen en Bezorging' : 'Collection and Delivery Hours'}
            </h3>
            <ul className="font-body text-[#1A1A1A]/70 text-lg space-y-1">
              <li>{isNl ? 'Maandag: Gesloten' : 'Monday: Closed'}</li>
              <li>{isNl ? 'Dinsdag tot en met Zondag: 16:30 tot 22:30' : 'Tuesday to Sunday: 16:30 to 22:30'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: No shortcuts prose */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Indian takeaway Den Haag zonder concessies aan kwaliteit' : 'Indian takeaway Den Haag that does not cut corners'}
          </h2>
          {isNl ? (
            <>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Veel afhaalrestaurants in Den Haag hanteren een andere standaard voor meeneemorders dan voor gasten die ter plekke eten. Minder aandacht. Snellere bereiding. Kruiden uit een zak in plaats van vers gemalen. Bij{' '}
                <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Chopras Indian Restaurant
                </Link>{' '}
                bestaat die tweedeling niet. <strong>Indiaas eten afhalen Den Haag</strong> bij Chopras betekent exact dezelfde keuken als wanneer u aan een tafel zit.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                De specerijen worden elke ochtend vers gemalen van hele specerijen die rechtstreeks uit India worden betrokken. De aromatische olieen in komijn, kardemom en koriander beginnen binnen uren na het malen te verdampen. Dat is het verschil tussen Indiaas eten dat leeft en Indiaas eten dat verpakt smaakt. Of u nu ter plekke eet of afhaalt bij Leyweg 986, het verschil proeft u niet.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras Indian Restaurant heeft 4,9 sterren op Google van meer dan 800 gasten. Die beoordeling is gebouwd op consistentie. Niet op een goede avond. Op elke bestelling, elke keer, inclusief elk{' '}
                <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indiaas eten bestellen in Den Haag
                </Link>
                {' '}dat onze keuken verlaat.
              </p>
            </>
          ) : (
            <>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Many takeaway kitchens in Den Haag apply a different standard to collection orders than to guests sitting at a table. Less care. Faster preparation. Spices from a bag rather than ground fresh that morning. At{' '}
                <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Chopras Indian Restaurant
                </Link>
                , that split does not exist. <strong>Indian takeaway Den Haag</strong> from Chopras means the identical kitchen as every dine-in order.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                The spices are ground fresh every morning from whole spices sourced directly from India. The volatile aromatic oils in cumin, cardamom and coriander begin evaporating within hours of grinding. That is the difference between Indian food that tastes alive and Indian food that tastes packaged. Whether you collect from Leyweg 986 or eat at the table, you cannot taste the difference.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras Indian Restaurant holds 4.9 stars on Google from over 800 verified guests. That rating is built on consistency. Not on one good evening. On every order, including every{' '}
                <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indian food delivery in Den Haag
                </Link>
                {' '}and every collection order that leaves our kitchen.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Section 3: What to order */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat kunt u afhalen bij Chopras?' : 'What can you order for Indian takeaway?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-10">
              Het volledige menu van 143 gerechten verdeeld over 13 categorieen is beschikbaar voor afhalen. Hieronder staan de meest gevraagde keuzes bij{' '}
              <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Indiaas afhalen in Den Haag
              </Link>
              .
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-10">
              The full menu of 143 dishes across 13 categories is available for collection. Below are the most requested choices for{' '}
              <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Indian takeaway in Den Haag
              </Link>
              .
            </p>
          )}

          <div className="space-y-10">
            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
                {isNl ? 'Biryani voor onderweg' : 'Biryani for collection'}
              </h3>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Biryani
                  </Link>{' '}
                  is het meest gevraagde gerecht voor afhalen bij Chopras. Saffraan basmatirijst bereid in dum-stijl met halal lam, kip of groenten. De pot wordt afgesloten tijdens het garen zodat alle aroma behouden blijft. Een gerecht dat ook tijdens het transport zijn kwaliteit behoudt.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Biryani
                  </Link>{' '}
                  is the most requested dish for Indian takeaway at Chopras. Saffron basmati rice slow-cooked in dum style with halal lamb, chicken or vegetables. The pot is sealed during cooking so every layer of aroma is locked in. A dish that holds its quality well after collection from Leyweg 986.
                </p>
              )}
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
                {isNl ? 'Curries en dal' : 'Curries and dal'}
              </h3>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Butter chicken
                  </Link>
                  ,{' '}
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    mutton rogan josh
                  </Link>{' '}
                  en{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    dal makhani
                  </Link>{' '}
                  zijn de populairste keuzes. Bereid met specerijen die dezelfde ochtend vers zijn gemalen. De sauzen zijn stevig van structuur en houden hun kwaliteit goed na het afhalen.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Butter chicken
                  </Link>
                  ,{' '}
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    mutton rogan josh
                  </Link>{' '}
                  and{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    dal makhani
                  </Link>{' '}
                  are the most requested curries for collection. Prepared with spices ground fresh that morning. The gravies are well-bodied and hold quality well after pickup from Leyweg 986.
                </p>
              )}
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
                {isNl ? 'Tandoori gerechten' : 'Tandoori dishes'}
              </h3>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  De tandoor bij Chopras bereikt 400 graden Celsius. Die temperatuur is niet aanpasbaar en geeft{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    tandoori kip en seekh kebab
                  </Link>{' '}
                  hun gerookte korst. Geen gewone oven kan dit nabootsen. Tandoori gerechten zijn uitermate geschikt voor afhalen en worden warm verpakt zodat de textuur behouden blijft.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  The tandoor at Chopras reaches 400 degrees Celsius. That temperature is not adjustable, and it is precisely what gives{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    tandoori chicken and seekh kebab
                  </Link>{' '}
                  their smoked crust. No conventional oven can replicate this. Tandoori dishes travel well and are packed hot to preserve texture on the way home.
                </p>
              )}
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
                {isNl ? 'Chaat en streetfood' : 'Chaat and street food'}
              </h3>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Chaat
                  </Link>{' '}
                  en{' '}
                  <Link href={`${base}/pani-puri-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    pani puri
                  </Link>{' '}
                  zijn populaire keuzes voor wie iets anders zoekt dan een curry. Authentiek Indiaas straatvoedsel rechtstreeks uit onze keuken. Direct klaar voor afhalen bij Leyweg 986.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Chaat
                  </Link>{' '}
                  and{' '}
                  <Link href={`${base}/pani-puri-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    pani puri
                  </Link>{' '}
                  are strong choices for those who want something beyond a curry. Authentic Indian street food made in our kitchen, ready for collection the moment your order is confirmed.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Halal + proof - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Volledig halal gecertificeerd. Ook voor afhalen.' : 'Fully halal certified. For every collection order.'}
          </h2>
          {isNl ? (
            <>
              <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
                Halal bij Chopras Indian Restaurant is geen menu-optie. Het is de gehele keuken. Elke vleesleverancier is halal gecertificeerd. Elk gerecht is halal. Er is geen niet-halal vlees aanwezig op de locatie, dus er is geen risico op kruisbesmetting. Dat geldt voor dine-in en voor elk afhaalgericht dat de keuken verlaat.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
                Voor veel families in Den Haag, Rijswijk en Zoetermeer is dit niet vanzelfsprekend. Veel restaurants bieden een halal optie maar bereiden in dezelfde keuken ook niet-halal vlees. Bij Chopras is dat structureel anders. Volledig halal van begin tot eind, voor elk gerecht, bij elke bestelling.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                4,9 sterren op Google van meer dan 800 beoordelingen. Geen enkel ander Indiaas restaurant in Den Haag combineert die beoordeling met dat volume. U bestelt met vertrouwen.
              </p>
            </>
          ) : (
            <>
              <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
                Halal at Chopras Indian Restaurant is not a menu option. It is the entire kitchen. Every meat supplier is halal certified. Every dish is halal. There is no non-halal meat anywhere on the premises, so there is zero risk of cross-contamination. That applies to dine-in and to every collection order that leaves the kitchen.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed mb-4">
                For many families in Den Haag, Rijswijk and Zoetermeer this is not guaranteed elsewhere. Many restaurants offer a halal option but prepare non-halal meat in the same kitchen. At Chopras the structure is different. Fully halal from start to finish, for every dish, on every order.
              </p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                4.9 stars on Google from over 800 verified reviews. Few Indian restaurants in Den Haag show that combination of rating and review volume. You order with complete confidence.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Section 5: How to order - steps */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Hoe werkt Indiaas afhalen bij Chopras?' : 'How do you order Indian takeaway from Chopras?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
              Geen ingewikkeld bestelproces. Bel vooruit, geef uw bestelling door en haal op bij Leyweg 986. Zo werkt afhalen bij Chopras Indian Restaurant in Den Haag.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
              No complicated process. Call ahead, confirm your order, collect from Leyweg 986. That is the full process for Indian takeaway from Chopras in Den Haag.
            </p>
          )}
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C7A348] flex items-center justify-center text-white font-semibold text-sm">
                1
              </div>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <strong>Bekijk het menu en bel ons op +31 6 30645930.</strong> Blader door het{' '}
                  <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    volledige Indiaas menu
                  </Link>{' '}
                  van 143 gerechten om te beslissen wat u wilt bestellen. Beschikbaar dinsdag tot en met zondag van 16:30 tot 22:30.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <strong>Browse the menu and call us on +31 6 30645930.</strong> Review the{' '}
                  <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    full Indian menu
                  </Link>{' '}
                  of 143 dishes before you call. Available Tuesday to Sunday from 16:30 to 22:30.
                </p>
              )}
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C7A348] flex items-center justify-center text-white font-semibold text-sm">
                2
              </div>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <strong>Wij bereiden uw bestelling vers</strong> in dezelfde keuken die onze gasten kennen van de dineerervaring aan tafel. Geen aparte snelkeuken voor afhaalbestellingen. Elk gerecht wordt bereid op dezelfde standaard.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <strong>We prepare your order fresh</strong> in the same kitchen our guests experience when dining in. There is no separate fast-track kitchen for collection orders. Every dish is made to the same standard, every time.
                </p>
              )}
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C7A348] flex items-center justify-center text-white font-semibold text-sm">
                3
              </div>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <strong>Haal op bij Leyweg 986 in Den Haag.</strong> Betaald parkeren is beschikbaar in de omgeving van Leyweg. U rijdt voor, pakt uw bestelling op en rijdt terug.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <strong>Collect from Leyweg 986 in Den Haag.</strong> Paid parking is available in the Leyweg area. Drive up, collect your order, drive home.
                </p>
              )}
            </div>
          </div>
          <div className="mt-10">
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Bel om te Bestellen' : 'Call to Order Now'}
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: GEO block */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Kan ik Indiaas eten afhalen bij Chopras in Den Haag?'
              : 'Can I order Indian takeaway from Chopras in Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Ja. Chopras Indian Restaurant op{' '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Leyweg 986 in Den Haag
              </Link>{' '}
              biedt het volledige menu aan voor afhalen. Biryani, curries, tandoori gerechten, chaat en naan. Volledig halal gecertificeerd. De keuken bereidt elke dag met specerijen die vers worden gemalen van hele specerijen rechtstreeks uit India. Beoordeeld met 4,9 sterren op Google van meer dan 800 gasten. Afhalen is mogelijk dinsdag tot en met zondag van 16:30 tot 22:30. Bekijk ook de{' '}
              <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                bezorgopties in Den Haag
              </Link>
              .
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Yes. Chopras Indian Restaurant at{' '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Leyweg 986 in Den Haag
              </Link>{' '}
              offers its full menu for collection. Biryani, curries, tandoori dishes, chaat and naan. Fully halal certified. The kitchen prepares every dish with spices ground fresh each morning from whole spices sourced directly from India. Rated 4.9 stars on Google from over 800 verified guests. Collection is available Tuesday to Sunday from 16:30 to 22:30. See also{' '}
              <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Indian food delivery in Den Haag
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Veelgestelde vragen over Indiaas afhalen in Den Haag'
              : 'Frequently asked questions about Indian takeaway in Den Haag'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* Section 8: Popular dishes grid */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Populaire keuzes voor Indiaas afhalen' : 'Popular choices for Indian takeaway Den Haag'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
              Dit zijn de meest bestelde gerechten voor afhalen bij Chopras. Bekijk de pagina van elk gerecht voor informatie over bereiding. Bekijk ook ons{' '}
              <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                volledig Indiaas menu
              </Link>{' '}
              voor alle 143 gerechten verdeeld over 13 categorieen.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
              These are the most ordered dishes for Indian takeaway at Chopras. Visit each dish page for preparation details. Browse the{' '}
              <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                full Indian restaurant menu
              </Link>{' '}
              for all 143 dishes across 13 categories.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link
              href={`${base}/biryani-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="font-body text-[#1A1A1A]/70">{isNl ? 'Saffraan basmatirijst met halal lam, kip of groenten' : 'Saffron basmati rice with halal lamb, chicken or vegetables'}</p>
            </Link>
            <Link
              href={`${base}/butter-chicken-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="font-body text-[#1A1A1A]/70">{isNl ? 'Halal kip in romige tomaten- en botersaus, dagelijks vers bereid' : 'Halal chicken in rich tomato and cream sauce, made fresh daily'}</p>
            </Link>
            <Link
              href={`${base}/tandoori-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="font-body text-[#1A1A1A]/70">{isNl ? 'Gegrild bij 400 graden Celsius in onze tandoor kleioven' : 'Grilled at 400 degrees Celsius in our clay tandoor oven'}</p>
            </Link>
            <Link
              href={`${base}/chaat-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Chaat</p>
              <p className="font-body text-[#1A1A1A]/70">{isNl ? 'Authentiek Indiaas straatvoedsel, dagelijks vers bereid' : 'Authentic Indian street food, prepared fresh each day'}</p>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/halal-food-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Halal Eten Den Haag' : 'Halal Food Den Haag'}
            </Link>
            <Link
              href={`${base}/indian-food-delivery-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Bezorging Bekijken' : 'View Delivery Options'}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Final CTA - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Bestel vandaag uw Indiaas afhaaleten in Den Haag' : 'Order your Indian takeaway in Den Haag today'}
          </h2>
          {isNl ? (
            <p className="font-body text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Chopras Indian Restaurant op Leyweg 986 in Den Haag biedt het volledige menu aan voor afhalen. Volledig halal gecertificeerd. Specerijen dagelijks vers gemalen. Beoordeeld met 4,9 sterren op Google van meer dan 800 gasten. Open dinsdag tot en met zondag van 16:30 tot 22:30.
            </p>
          ) : (
            <p className="font-body text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Chopras Indian Restaurant at Leyweg 986 in Den Haag offers its full menu for Indian takeaway. Fully halal certified. Spices ground fresh daily. Rated 4.9 stars on Google from over 800 verified guests. Open Tuesday to Sunday from 16:30 to 22:30.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${RESTAURANT.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bel om te Bestellen' : 'Call to Order'}
            </a>
            <Link
              href={`${base}/halal-menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Halal Menu Bekijken' : 'View Halal Menu'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
