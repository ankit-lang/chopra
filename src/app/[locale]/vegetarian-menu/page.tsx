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

const vegetarianItems = menuItems.filter(item => item.dietary.includes('veg') || item.dietary.includes('vegan'))
const vegetarianCategoryIds = Array.from(new Set(vegetarianItems.map(item => item.category)))
const vegetarianCategories = menuCategories.filter(cat => vegetarianCategoryIds.includes(cat.id))

export async function generateStaticParams() {
      return [{ locale: 'en' }, { locale: 'nl' }]
}

const faqsEn: Array<{ question: string; answer: string }> = [
      {
            question: 'What vegetarian dishes does Chopras Indian Restaurant serve in Den Haag?',
            answer: 'Chopras Indian Restaurant at Leyweg 986, Den Haag, serves more than 40 vegetarian and vegan dishes including dal makhani, chana masala, aloo gobi, baingan bharta, paneer tikka, tandoori mushrooms, soya chaap, vegetable biryani, paneer curries, and tandoori naan. All dishes are prepared fresh with ingredients sourced directly from India.',
      },
      {
            question: 'Are all vegetarian dishes at Chopras also vegan?',
            answer: 'No. Vegetarian at Chopras includes two categories: vegan (no dairy, eggs or meat) and vegetarian with dairy (paneer, yogurt, butter). Dal makhani uses cream and butter. Paneer tikka uses Indian cheese. The menu is clearly marked. Check the vegan menu for plant-based only options.',
      },
      {
            question: 'Can vegetarians share a meal with meat eaters at Chopras?',
            answer: 'Absolutely. The vegetarian menu is complete: appetizers, soups, curries, tandoori, biryani, breads and sides. Dal makhani, chana masala, aloo gobi and paneer butter masala are popular enough to stand alone as full meals. The kitchen maintains separate preparation areas for vegetarian and meat items.',
      },
      {
            question: 'Is the paneer at Chopras vegetarian and halal?',
            answer: 'Yes. All paneer (Indian cheese) at Chopras is vegetarian and halal certified. It is made from milk and salt only. Paneer tikka, paneer butter masala, palak paneer, karahi paneer and shahi paneer are all popular vegetarian dishes prepared fresh to order at Leyweg 986.',
      },
]

const faqsNl: Array<{ question: string; answer: string }> = [
      {
            question: 'Welke vegetarische gerechten serveert Chopras Indian Restaurant in Den Haag?',
            answer: 'Chopras Indian Restaurant op Leyweg 986, Den Haag, serveert meer dan 40 vegetarische en veganistische gerechten waaronder dal makhani, chana masala, aloo gobi, baingan bharta, paneer tikka, tandoori champignons, soya chaap, vegetable biryani, paneer curries en tandoori naan. Alle gerechten worden vers bereid met ingrediënten rechtstreeks uit India.',
      },
      {
            question: 'Zijn alle vegetarische gerechten bij Chopras ook veganistisch?',
            answer: 'Nee. Vegetarisch bij Chopras omvat twee categorieën: veganistisch (geen zuivel, eieren of vlees) en vegetarisch met zuivel (paneer, yogurt, boter). Dal makhani gebruikt room en boter. Paneer tikka gebruikt Indiase kaas. Het menu is duidelijk gemarkeerd. Controleer het veganistische menu voor alleen plantaardige opties.',
      },
      {
            question: 'Kunnen vegetariërs een maaltijd delen met vleeseters bij Chopras?',
            answer: 'Absoluut. Het vegetarische menu is compleet: voorgerechten, soepen, curries, tandoori, biryani, brood en bijgerechten. Dal makhani, chana masala, aloo gobi en paneer butter masala zijn populair genoeg om als volledige maaltijd te eten. De keuken handhaaft aparte bereiding voor vegetarische en vlees items.',
      },
      {
            question: 'Is de paneer bij Chopras vegetarisch en halal?',
            answer: 'Ja. Alle paneer (Indiase kaas) bij Chopras is vegetarisch en halal gecertificeerd. Het is gemaakt van melk en zout alleen. Paneer tikka, paneer butter masala, palak paneer, karahi paneer en shahi paneer zijn allemaal populaire vegetarische gerechten vers op bestelling bereid op Leyweg 986.',
      },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
      const { locale } = params
      const titles = {
            en: 'Vegetarian Menu Den Haag | Chopras Indian Restaurant',
            nl: 'Vegetarisch Menu Den Haag | Chopras Indian Restaurant',
      }
      const descriptions = {
            en: 'Vegetarian menu Den Haag at Chopras Indian Restaurant. 40+ vegetarian dishes including paneer, curries, tandoori and biryani. Halal certified. Vegan options available. Order online.',
            nl: 'Vegetarisch menu Den Haag bij Chopras Indian Restaurant. 40+ vegetarische gerechten inclusief paneer, curries, tandoori en biryani. Halal gecertificeerd. Veganistische opties beschikbaar. Bestel online.',
      }
      return {
            title: titles[locale],
            description: descriptions[locale],
            alternates: {
                  canonical: getLocalizedUrl(locale, 'vegetarian-menu'),
                  languages: {
                        en: getLocalizedUrl('en', 'vegetarian-menu'),
                        nl: getLocalizedUrl('nl', 'vegetarian-menu'),
                        'x-default': getLocalizedUrl('en', 'vegetarian-menu'),
                  },
            },
            openGraph: {
                  title: titles[locale],
                  description: descriptions[locale],
                  url: getLocalizedUrl(locale, 'vegetarian-menu'),
                  images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag vegetarian menu' }],
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

export default function VegetarianMenuPage({ params }: Props) {
      const { locale } = params
      const tr = getTranslations(locale)
      const base = locale === 'nl' ? '/nl' : ''
      const isNl = locale === 'nl'

      return (
            <>
                  <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'vegetarian-menu'))} />
                  <JsonLd data={getBreadcrumbSchema([
                        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
                        { name: isNl ? 'Vegetarisch Menu' : ' u', item: getLocalizedUrl(locale, 'vegetarian-menu') },
                  ])} />
                  <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
                  <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Vegetarian', 'Vegetarian Indian', 'Vegan', 'Halal', 'North Indian'], 'vegetarian-menu')} />

                  {/* Hero */}
                  <section className="btn-gradient py-20 text-center">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
                                    <span className="text-white text-xs font-medium uppercase tracking-widest">
                                          MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG
                                    </span>
                              </div>
                              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.99), 0 6px 24px rgba(0,0,0,0.85)' }}>
                                    {isNl ? 'Vegetarisch Indiaas Eten Den Haag' : 'Vegetarian Indian Food Den Haag'}
                              </h1>
                              <div className="flex items-center justify-center gap-4 mt-6">
                                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
                                    <span className="text-white/90 text-lg">✦</span>
                                    <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
                              </div>
                              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mt-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
                                    {isNl
                                          ? 'Vegetarische opties beschikbaar voor de volgende gerechten. Verse kruiden, halal gecertificeerd, volledige smaken. Chopras Indian Restaurant, Leyweg 986.'
                                          : 'Vegetarian options available for the following dishes. Fresh spices, halal certified, full flavors. Chopras Indian Restaurant, Leyweg 986.'}
                              </p>
                        </div>
                  </section>

                  {/* Main Intro */}
                  <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
                                    {isNl ? 'Vegetarisch Indiaas Eten in Den Haag Dat Echt Voldoet' : 'Vegetarian Indian Food Den Haag That Actually Satisfies'}
                              </h2>
                              <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                                    {isNl ? (
                                          <>
                                                <p>
                                                      Veel Indiase restaurants behandelen vegetarische opties als bijgedachte. Chopras Indian Restaurant doet dat niet. Het vegetarische gedeelte van{' '}
                                                      <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">het volledige menu op Leyweg 986</Link>{' '}
                                                      is een complete categorie met meer dan 40 gerechten, opgebouwd uit voedsel dat vegetarisch is in zijn oorsprong in de Noord-Indiase keuken.
                                                </p>
                                                <p>
                                                      Dal makhani. Chana masala. Aloo gobi. Paneer tikka masala. Baingan bharta. Dit zijn geen vervangingen of aanpassingen voor vegetariërs. Dit zijn de originele gerechten, bereid zoals ze altijd zijn bereid bij{' '}
                                                      <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link>.{' '}
                                                      Kruiden rechtstreeks uit India, elke ochtend vers gemalen voordat de keuken opengaat om 16:30.
                                                </p>
                                                <p>
                                                      Voor vegetariërs in Den Haag die op zoek zijn naar{' '}
                                                      <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegetarisch Indiaas eten dat echt vult</Link>,{' '}
                                                      is Chopras het directe antwoord. 4,9 sterren van 1100+ beoordelingen. Geen concessies aan smaak of variatie.
                                                </p>
                                          </>
                                    ) : (
                                          <>
                                                <p>
                                                      Many Indian restaurants treat vegetarian options as an afterthought. Chopras Indian Restaurant does not. The vegetarian section of{' '}
                                                      <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">the full menu at Leyweg 986</Link>{' '}
                                                      is a complete category with more than 40 dishes, built from food that is vegetarian at its origins in North Indian cooking.
                                                </p>
                                                <p>
                                                      Dal makhani. Chana masala. Aloo gobi. Paneer tikka masala. Baingan bharta. These are not substitutions or workarounds for vegetarian guests. These are the original dishes, prepared as they have always been prepared at{' '}
                                                      <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link>.{' '}
                                                      Spices sourced directly from India, ground fresh every morning before service opens at 16:30.
                                                </p>
                                                <p>
                                                      For vegetarians in Den Haag searching for{' '}
                                                      <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegetarian Indian food that genuinely fills you up</Link>,{' '}
                                                      Chopras is the straightforward answer. Rated 4.9 stars from 1100+ reviews. No compromise on flavor or variety.
                                                </p>
                                          </>
                                    )}
                              </div>
                        </div>
                  </section>

                  {/* VEGETARIAN DISH GRID */}
                  <section className="bg-[#F7F8FC]">
                        <MenuPageClient categories={vegetarianCategories} items={vegetarianItems} />
                  </section>

                  {/* Dish Categories Grid */}
                  <section className="bg-white py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                              <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
                                    {isNl ? 'Wat Staat Er op het Vegetarische Menu?' : 'What Is on the Vegetarian Menu?'}
                              </h2>
                              {isNl ? (
                                    <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
                                          Van paneer gegrild in de tandoor tot linzencurry, het vegetarische menu beslaat elke gang van een volledige maaltijd.{' '}
                                          <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Dal makhani</Link>{' '}
                                          en paneer butter masala zijn de kerngerechten, maar het menu stopt daar niet.
                                    </p>
                              ) : (
                                    <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
                                          From paneer grilled in the tandoor to lentil curry, the vegetarian menu covers every course of a complete meal.{' '}
                                          <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Dal makhani</Link>{' '}
                                          and paneer butter masala are the anchor dishes, but the menu does not stop there.
                                    </p>
                              )}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {(isNl ? [
                                          { title: 'Linzen en Peulvruchten', items: 'Dal makhani, dal tadka, chana masala, rajma, toor dal' },
                                          { title: "Groentecurry's en Paneer", items: 'Aloo gobi, baingan bharta, bhindi masala, palak paneer, paneer butter masala, karahi paneer' },
                                          { title: 'Biryani en Rijst', items: 'Vegetable biryani, mushroom biryani, jeera rijst, gele rijst' },
                                          { title: 'Brood en Bijgerechten', items: 'Tandoori naan, garlic naan, roti, papad, raita, pickles' },
                                    ] : [
                                          { title: 'Lentils and Pulses', items: 'Dal makhani, dal tadka, chana masala, rajma, toor dal' },
                                          { title: 'Vegetable Curries and Paneer', items: 'Aloo gobi, baingan bharta, bhindi masala, palak paneer, paneer butter masala, karahi paneer' },
                                          { title: 'Biryani and Rice', items: 'Vegetable biryani, mushroom biryani, jeera rice, yellow rice' },
                                          { title: 'Breads and Sides', items: 'Tandoori naan, garlic naan, roti, papad, raita, pickles' },
                                    ]).map((item) => (
                                          <div key={item.title} className="bg-[#F7F8FC] rounded-xl p-6 border-l-4 border-white">
                                                <h3 className="font-heading text-3xl text-[#06068a] mb-4">{item.title}</h3>
                                                <p className="font-body text-[#1A1A1A] text-base leading-relaxed">{item.items}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Paneer Butter Masala and Tandoori Paneer — Dark Accent Section */}
                  <section className="btn-gradient py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
                                    {isNl ? 'Paneer bij Chopras: Tandoor tot Room' : 'Paneer at Chopras: Tandoor to Cream'}
                              </h2>
                              <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
                                    {isNl ? (
                                          <>
                                                <p className="text-white/80">
                                                      Paneer — Indiase kaas — is het hart van het vegetarische Indiaase menu. Bij Chopras op Leyweg 986 in Den Haag wordt paneer op twee manieren bereid: gegrild in de tandoor kleioven of gestoofd in romige sauzen.
                                                </p>
                                                <p className="text-white/80">
                                                      Paneer tikka is kubisch gesneden kaas gegrild met paprika en uien op 400 graden Celsius. Paneer butter masala is dezelfde kaas gestoofd in een romige saus met boter, tomaat en cashewnoten. Beide zijn perfect voor vegetariërs die op zoek zijn naar voedsel met textuur en voeding.
                                                </p>
                                                <p className="text-white/80">
                                                      Voor meer vegetarische opties, zie onze{' '}
                                                      <Link href={`${base}/vegan-menu`} className="text-white hover:text-white font-semibold">volledig veganistische menu</Link>{' '}
                                                      met noch zuivel noch vlees, en onze
                                                      <Link href={`${base}/gluten-free-menu`} className="text-white hover:text-white font-semibold">glutenvrije menu</Link>{' '}
                                                      voor diëten met meer beperking.
                                                </p>
                                          </>
                                    ) : (
                                          <>
                                                <p className="text-white/80">
                                                      Paneer — Indian cheese — is the heart of the vegetarian Indian menu. At Chopras on Leyweg 986 in Den Haag, paneer is prepared two ways: grilled in the tandoor clay oven or stewed in creamy sauces.
                                                </p>
                                                <p className="text-white/80">
                                                      Paneer tikka is cubed cheese grilled with bell pepper and onion at 400 degrees Celsius. Paneer butter masala is the same cheese stewed in a creamy sauce with butter, tomato and cashew nuts. Both are perfect for vegetarians searching for food with texture and nutrition.
                                                </p>
                                                <p className="text-white/80">
                                                      For more vegetarian options, see our{' '}
                                                      <Link href={`${base}/vegan-menu`} className="text-white hover:text-white font-semibold">full vegan menu</Link>{' '}
                                                      with neither dairy nor meat, and our
                                                      <Link href={`${base}/gluten-free-menu`} className="text-white hover:text-white font-semibold"> gluten-free menu</Link>{' '}
                                                      for more restricted diets.
                                                </p>
                                          </>
                                    )}
                              </div>
                        </div>
                  </section>

                  {/* FAQ */}
                  <section className="bg-white py-20 px-6 md:px-16">
                        <div className="max-w-3xl mx-auto">
                              <div className="text-center mb-12">
                                    <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
                                          {isNl ? 'Veelgestelde Vragen over Vegetarisch Indiaas Eten' : 'Frequently Asked Questions About Vegetarian Indian Food'}
                                    </h2>
                              </div>
                              <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
                        </div>
                  </section>
            </>
      )
}
