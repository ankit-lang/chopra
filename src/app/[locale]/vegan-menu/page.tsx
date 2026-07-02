import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDietFoodEstablishmentSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MenuPageClient from '@/components/sections/MenuPageClient'
import { menuCategories, menuItems } from '@/lib/menu-data'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Vegan Indian Food Den Haag | Chopras Indian Restaurant',
    nl: 'Veganistisch Indiaas Eten Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Vegan Indian food Den Haag at Chopras Indian Restaurant. 40+ plant-based dishes including soya chaap and dal makhani. 4.9 stars. Order online today.',
    nl: 'Veganistisch Indiaas eten Den Haag bij Chopras Indian Restaurant. 40+ plantaardige gerechten waaronder soya chaap en dal makhani. Bestel online.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'vegan-menu'),
      languages: { en: getLocalizedUrl('en', 'vegan-menu'), nl: getLocalizedUrl('nl', 'vegan-menu'), 'x-default': getLocalizedUrl('en', 'vegan-menu') },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'vegan-menu'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Vegan menu at Chopras Indian Restaurant Den Haag' }],
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
    question: 'What vegan dishes does Chopras Indian Restaurant serve in Den Haag?',
    answer: 'Chopras Indian Restaurant at Leyweg 986, Den Haag, serves a full vegan menu including dal makhani, chana masala, aloo gobi, baingan bharta, soya chaap grilled in the tandoor, vegetable biryani, and vegan naan. All dishes are completely plant-based with no dairy, meat, or eggs.',
  },
  {
    question: 'Is the soya chaap at Chopras completely vegan?',
    answer: 'Yes. Soya chaap at Chopras is made from wheat and soy protein and grilled in the tandoor clay oven at 400 degrees Celsius. No dairy marinade is used. It is entirely plant-based and one of the most popular dishes on the menu for vegans and non-vegans alike.',
  },
  {
    question: 'Can vegans order takeaway or delivery from Chopras in Den Haag?',
    answer: 'Yes. The complete vegan menu is available for delivery via Thuisbezorgd and Uber Eats, and for collection at Leyweg 986, Den Haag. All dishes are prepared in the same kitchen using the same freshly ground spices as the full menu. Open Tuesday to Sunday from 16:30.',
  },
  {
    question: 'Are the naan breads at Chopras vegan?',
    answer: 'Yes. Vegan naan is baked fresh in the tandoor at Chopras. This includes garlic naan, plain naan, and roti. No milk or butter is used. Baked at 400 degrees Celsius, the naan develops the char and puff that a conventional oven cannot replicate.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Welke veganistische gerechten serveert Chopras Indian Restaurant in Den Haag?',
    answer: 'Chopras Indian Restaurant op Leyweg 986, Den Haag, serveert een volledig veganistisch menu met dal makhani, chana masala, aloo gobi, baingan bharta, soya chaap gegrild in de tandoor, vegetable biryani en veganistische naan. Alle gerechten zijn volledig plantaardig zonder zuivel, vlees of eieren.',
  },
  {
    question: 'Is de soya chaap bij Chopras volledig veganistisch?',
    answer: 'Ja. Soya chaap bij Chopras is gemaakt van tarwe- en soja-eiwit en gegrild in de tandoor kleioven op 400 graden Celsius. Er wordt geen zuivelmarinade gebruikt. Het is volledig plantaardig en een van de populairste gerechten op het menu voor zowel veganisten als niet-veganisten.',
  },
  {
    question: 'Kunnen veganisten eten bestellen of laten bezorgen bij Chopras in Den Haag?',
    answer: 'Ja. Het volledige veganistische menu is beschikbaar voor bezorging via Thuisbezorgd en Uber Eats, en voor afhalen op Leyweg 986, Den Haag. Alle gerechten worden bereid in dezelfde keuken met dezelfde vers gemalen kruiden als het volledige menu. Geopend dinsdag tot en met zondag vanaf 16:30.',
  },
  {
    question: 'Zijn de naan broodjes bij Chopras veganistisch?',
    answer: 'Ja. Veganistische naan wordt vers gebakken in de tandoor bij Chopras. Dit geldt voor knoflooknaan, gewone naan en roti. Er wordt geen melk of boter gebruikt. Gebakken op 400 graden Celsius krijgt de naan de knapperige randen die een gewone oven niet kan repliceren.',
  },
]

const veganItems = menuItems.filter(item => item.dietary.includes('vegan'))
const veganCategoryIds = Array.from(new Set(veganItems.map(item => item.category)))
const veganCategories = menuCategories.filter(cat => veganCategoryIds.includes(cat.id))

export default function VeganMenuPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'vegan-menu'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Veganistisch Menu' : 'Vegan Menu', item: getLocalizedUrl(locale, 'vegan-menu') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Vegan', 'Vegan Indian', 'Vegetarian Indian', 'Halal', 'North Indian'], 'vegan-menu')} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            {isNl ? 'Veganistisch Indiaas Eten Den Haag' : 'Vegan Indian Food Den Haag'}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'Geen vlees, vis, zuivel of eieren. Volledige gerechten, verse kruiden. Chopras Indian Restaurant, Leyweg 986.'
              : 'No meat, fish, dairy or eggs. Full dishes, fresh spices. Chopras Indian Restaurant, Leyweg 986.'}
          </p>
        </div>
      </section>

      {/* Main Intro */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veganistisch Indiaas Eten in Den Haag Dat Echt Voldoet' : 'Vegan Indian Food Den Haag That Actually Satisfies'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  De meeste Indiase restaurants behandelen veganistische opties als bijgedachte. Chopras Indian Restaurant doet dat niet. Het veganistische gedeelte van{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">het volledige menu op Leyweg 986</Link>{' '}
                  is een complete categorie, opgebouwd uit gerechten die plantaardig zijn in hun oorsprong in de Noord-Indiase vegetarische keuken.
                </p>
                <p>
                  Dal makhani. Chana masala. Aloo gobi. Baingan bharta. Dit zijn geen vervangingen of aanpassingen voor veganisten. Dit zijn de originele gerechten, bereid zoals ze altijd zijn bereid bij{' '}
                  <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Chopras Indian Restaurant</Link>.{' '}
                  Kruiden rechtstreeks uit India, elke ochtend vers gemalen voordat de keuken opengaat om 16:30.
                </p>
                <p>
                  Voor veganisten in Den Haag die op zoek zijn naar{' '}
                  <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">plantaardig Indiaas eten dat echt vult</Link>,{' '}
                  is Chopras het directe antwoord. 4,9 sterren van 800+ beoordelingen. Geen concessies aan smaak.
                </p>
              </>
            ) : (
              <>
                <p>
                  Most Indian restaurants treat vegan options as an afterthought. Chopras Indian Restaurant does not. The vegan section of{' '}
                  <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">the full menu at Leyweg 986</Link>{' '}
                  is a complete category, built from dishes that are plant-based at their origins in North Indian vegetarian cooking.
                </p>
                <p>
                  Dal makhani. Chana masala. Aloo gobi. Baingan bharta. These are not substitutions or workarounds for vegan guests. These are the original dishes, prepared as they have always been prepared at{' '}
                  <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Chopras Indian Restaurant</Link>.{' '}
                  Spices sourced directly from India, ground fresh every morning before service opens at 16:30.
                </p>
                <p>
                  For vegans in Den Haag searching for{' '}
                  <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">plant-based Indian food that genuinely fills you up</Link>,{' '}
                  Chopras is the straightforward answer. Rated 4.9 stars from 800+ reviews. No compromise on flavour.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* VEGAN DISH GRID */}
      <section className="bg-[#F7F8FC]">
        <MenuPageClient categories={veganCategories} items={veganItems} />
      </section>

      {/* Dish Categories Grid */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Wat Staat Er op het Veganistische Menu?' : 'What Is on the Vegan Menu?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
              Van linzencurry tot tandoorgegrilde{' '}
              <Link href={`${base}/soya-chaap-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">soya chaap</Link>,{' '}
              het veganistische menu beslaat elke gang van een volledige maaltijd.{' '}
              <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Dal makhani</Link>{' '}
              en chana masala zijn de kerngerechten, maar het menu stopt daar niet.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
              From lentil curry to tandoor-grilled{' '}
              <Link href={`${base}/soya-chaap-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">soya chaap</Link>,{' '}
              the vegan menu covers every course of a complete meal.{' '}
              <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Dal makhani</Link>{' '}
              and chana masala are the anchor dishes, but the menu does not stop there.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {(isNl ? [
              { title: 'Dal en Peulvruchten', items: 'Dal makhani, dal tadka, chana masala, rajma, toor dal' },
              { title: "Groentecurry's", items: 'Aloo gobi, baingan bharta, okra fry, bloemkool tikka, gemengde groentenkerrie' },
              { title: 'Biryani en Rijst', items: 'Vegetable biryani, mushroom biryani, jeera rijst, gele rijst' },
              { title: 'Brood en Bijgerechten', items: 'Veganistische naan, knoflooknaan, roti, papadum, plantaardige raita' },
            ] : [
              { title: 'Lentils and Pulses', items: 'Dal makhani, dal tadka, chana masala, rajma, toor dal' },
              { title: 'Vegetable Curries', items: 'Aloo gobi, baingan bharta, okra fry, cauliflower tikka, mixed vegetable curry' },
              { title: 'Biryani and Rice', items: 'Vegetable biryani, mushroom biryani, jeera rice, yellow rice' },
              { title: 'Breads and Sides', items: 'Vegan naan, garlic naan, roti, papadum, plant-based raita' },
            ]).map((item) => (
              <div key={item.title} className="bg-[#F7F8FC] rounded-xl p-6 border-l-4 border-white">
                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">{item.title}</h3>
                <p className="font-body text-[#1A1A1A] text-base leading-relaxed">{item.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soya Chaap in the Tandoor — Dark Accent Section */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Soya Chaap in de Tandoor: Plantaardig op Hoge Temperatuur' : 'Soya Chaap in the Tandoor: Plant-Based at High Temperature'}
          </h2>
          <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Soya chaap is het gerecht dat veganisten in Den Haag het vaakst verrast. Het is gemaakt van tarwe- en soja-eiwit en gegrild in de tandoor kleioven op 400 graden Celsius. Die temperatuur is niet instelbaar. Dat is het punt.{' '}
                  <Link href={`${base}/soya-chaap-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Soya chaap bij Chopras</Link>{' '}
                  krijgt dezelfde rook en knapperige korst die tandoorikip zijn karakter geeft, maar zonder vlees of zuivel.
                </p>
                <p>
                  Het resultaat is een gerecht met rook, char en textuur die je niet krijgt uit een koekenpan of grillplaat. Volledig plantaardig, volledig vol van smaak. Dit is het gerecht dat gasten bestellen voor de tweede keer terwijl ze nog aan de eerste portie bezig zijn.
                </p>
                <p>
                  Voor meer plantaardige opties op straat, bekijk ook onze{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indiase street food in Den Haag</Link>{' '}
                  en de{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegetable biryani Den Haag</Link>{' '}
                  voor een complete plantaardige maaltijd.
                </p>
              </>
            ) : (
              <>
                <p>
                  Soya chaap is the dish that surprises most vegans in Den Haag. Made from wheat and soy protein, grilled in the tandoor clay oven at 400 degrees Celsius. That temperature is not adjustable. That is the point.{' '}
                  <Link href={`${base}/soya-chaap-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Soya chaap at Chopras</Link>{' '}
                  gets the same smoke and charred crust that defines tandoori chicken, with no meat and no dairy marinade.
                </p>
                <p>
                  The result is a dish with smoke, char, and texture you cannot get from a frying pan or a flat grill. Completely plant-based, completely full of flavour. This is the dish that guests order a second time before finishing the first.
                </p>
                <p>
                  For more plant-based options on the lighter side, see also our{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indian street food in Den Haag</Link>{' '}
                  and the{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegetable biryani Den Haag</Link>{' '}
                  for a complete plant-based meal.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Heeft Chopras Indian Restaurant Veganistische Opties in Den Haag?'
              : 'Does Chopras Indian Restaurant Have Vegan Options in Den Haag?'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <p>
                Ja. Chopras Indian Restaurant op Leyweg 986, Den Haag, serveert een volledig veganistisch menu met meer dan tien plantaardige gerechten, waaronder{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">dal makhani</Link>,{' '}
                chana masala,{' '}
                <Link href={`${base}/soya-chaap-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">soya chaap gegrild in de tandoor</Link>,{' '}
                vegetable biryani en veganistische naan. Het restaurant is geopend van dinsdag tot en met zondag van 16:30 tot 22:30. Beoordeeld met 4,9 sterren van 800+ recensies. Reserveer een tafel of bestel online voor bezorging en afhaal.
              </p>
            ) : (
              <p>
                Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag, serves a complete vegan menu with over ten plant-based dishes, including{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">dal makhani</Link>,{' '}
                chana masala,{' '}
                <Link href={`${base}/soya-chaap-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">soya chaap grilled in the tandoor</Link>,{' '}
                vegetable biryani, and vegan naan. The restaurant is open Tuesday to Sunday from 16:30 to 22:30. Rated 4.9 stars from 800+ reviews. Reserve a table or order online for delivery and takeaway.
              </p>
            )}
            {isNl ? (
              <p>
                Bekijk het{' '}
                <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">volledige menu van Chopras Indian Restaurant</Link>{' '}
                voor alle veganistische gerechten per categorie, of lees meer in ons{' '}
                <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">blog over vegetarisch Indiaas eten in Den Haag</Link>.
              </p>
            ) : (
              <p>
                View the{' '}
                <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">complete Chopras Indian Restaurant menu</Link>{' '}
                for all vegan dishes listed by category, or read more in our{' '}
                <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">blog on vegetarian Indian food in Den Haag</Link>.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over het Veganistische Menu' : 'Frequently Asked Questions About the Vegan Menu'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Reserveer een Tafel of Bestel Online' : 'Reserve a Table or Order Online'}
          </h2>
          <p className="text-white/80 text-lg font-body mb-8 max-w-2xl mx-auto">
            {isNl
              ? 'Chopras Indian Restaurant is geopend van dinsdag tot en met zondag van 16:30 tot 22:30. Leyweg 986, Den Haag. Bekijk het volledige menu of reserveer direct.'
              : 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. Leyweg 986, Den Haag. View the full menu or reserve your table directly.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
            <Link
              href={`${base}/indian-food-delivery-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bestellen & Bezorging' : 'Order & Delivery'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
