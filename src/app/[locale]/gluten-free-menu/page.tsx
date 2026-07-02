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

const glutenFreeItems = menuItems.filter(item =>
      (item.dietary as string[]).includes('glutenFree')
) ;
const glutenFreeCategoryIds = Array.from(new Set(glutenFreeItems.map(item => item.category)))
const glutenFreeCategories = menuCategories.filter(cat => glutenFreeCategoryIds.includes(cat.id))

export async function generateStaticParams() {
      return [{ locale: 'en' }, { locale: 'nl' }]
}

const faqsEn: Array<{ question: string; answer: string }> = [
      {
            question: 'What gluten free dishes does Chopras Indian Restaurant serve in Den Haag?',
            answer: 'Chopras Indian Restaurant at Leyweg 986, Den Haag, serves a full gluten-free menu including aloo gobi, aloo jeera, bhindi masala, baingan bharta, chana masala, dal tadka, plain papad, onion bhaji, veg manchow soup, rice dishes, biryani, and chicken fried rice. All dishes are naturally gluten-free and prepared without any gluten-containing ingredients.',
      },
      {
            question: 'Are all rice and curry dishes at Chopras gluten free?',
            answer: 'Yes. All rice dishes, biryani, curries, and tandoori preparations at Chopras are gluten-free or can be prepared gluten-free. The kitchen takes gluten-free preparation seriously. Every spice blend is gluten-free. All sauces are thickened with natural ingredients, not flour or cornstarch.',
      },
      {
            question: 'Can celiac guests order at Chopras Indian Restaurant Den Haag?',
            answer: 'Yes. Chopras offers a dedicated gluten-free menu with 15+ naturally gluten-free dishes. The kitchen follows strict preparation standards. All meat is halal certified. For celiac guests with severe allergies, mention gluten-free requirements when ordering. Call +31 6 30645930 to confirm specific dishes.',
      },
      {
            question: 'Is the plain papad at Chopras gluten free?',
            answer: 'Yes. Plain papad at Chopras is made from lentil flour only and is completely gluten-free. It is crispy, light and served as a traditional Indian starter. One serving is 3.5 euro.',
      },
]

const faqsNl: Array<{ question: string; answer: string }> = [
      {
            question: 'Welke glutenvrije gerechten serveert Chopras Indian Restaurant in Den Haag?',
            answer: 'Chopras Indian Restaurant op Leyweg 986, Den Haag, serveert een volledig glutenvrij menu met aloo gobi, aloo jeera, bhindi masala, baingan bharta, chana masala, dal tadka, plain papad, onion bhaji, vegetable manchow soep, rijstgerechten, biryani en chicken fried rice. Alle gerechten zijn van nature glutenvrij en bereid zonder glutenhoudende ingrediënten.',
      },
      {
            question: 'Zijn alle rijst- en currygerechten bij Chopras glutenvrij?',
            answer: 'Ja. Alle rijstgerechten, biryani, curries en tandoorigerechtenen bij Chopras zijn glutenvrij of kunnen glutenvrij worden bereid. De keuken neemt glutenvrije bereiding serieus. Elke kruiden blend is glutenvrij. Alle sauzen worden verdikt met natuurlijke ingrediënten, niet met meel of zetmeel.',
      },
      {
            question: 'Kunnen mensen met coeliakie eten bij Chopras Indian Restaurant Den Haag?',
            answer: 'Ja. Chopras biedt een speciaal glutenvrij menu met 15+ natuurlijk glutenvrije gerechten. De keuken volgt strikte bereidingsstandaards. Al het vlees is halal gecertificeerd. Voor gasten met ernstige glutenallergie, vermeld glutenvrije vereisten bij bestelling. Bel +31 6 30645930 om specifieke gerechten te bevestigen.',
      },
      {
            question: 'Is de plain papad bij Chopras glutenvrij?',
            answer: 'Ja. Plain papad bij Chopras is gemaakt van alleen lintenmeel en is volledig glutenvrij. Het is knapperig, licht en geserveerd als traditionele Indiase starter. Een portie kost 3,50 euro.',
      },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
      const { locale } = params
      const titles = {
            en: 'Gluten Free Menu Den Haag | Chopras Indian Restaurant',
            nl: 'Glutenvrij Menu Den Haag | Chopras Indian Restaurant',
      }
      const descriptions = {
            en: 'Gluten free menu Den Haag at Chopras Indian Restaurant. 15+ naturally gluten-free dishes including curries, rice, biryani and tandoori. Celiac friendly. Order online.',
            nl: 'Glutenvrij menu Den Haag bij Chopras Indian Restaurant. 15+ natuurlijk glutenvrije gerechten waaronder curries, rijst, biryani en tandoori. Coeliakie vriendelijk. Bestel online.',
      }
      return {
            title: titles[locale],
            description: descriptions[locale],
            alternates: {
                  canonical: getLocalizedUrl(locale, 'gluten-free-menu'),
                  languages: {
                        en: getLocalizedUrl('en', 'gluten-free-menu'),
                        nl: getLocalizedUrl('nl', 'gluten-free-menu'),
                        'x-default': getLocalizedUrl('en', 'gluten-free-menu'),
                  },
            },
            openGraph: {
                  title: titles[locale],
                  description: descriptions[locale],
                  url: getLocalizedUrl(locale, 'gluten-free-menu'),
                  images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag gluten free menu' }],
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

export default function GlutenFreeMenuPage({ params }: Props) {
      const { locale } = params
      const tr = getTranslations(locale)
      const base = locale === 'nl' ? '/nl' : ''
      const isNl = locale === 'nl'

      return (
            <>
                  <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'gluten-free-menu'))} />
                  <JsonLd data={getBreadcrumbSchema([
                        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
                        { name: isNl ? 'Glutenvrij Menu' : 'Gluten Free Menu', item: getLocalizedUrl(locale, 'gluten-free-menu') },
                  ])} />
                  <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
                  <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Gluten-Free', 'Gluten Free Indian', 'Celiac-Safe', 'Halal', 'North Indian'], 'gluten-free-menu')} />

                  {/* Hero */}
                  <section className="bg-[#1B2B5E] py-20 text-center">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
                                    <span className="text-white text-xs font-medium uppercase tracking-widest">
                                          • MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
                                    </span>
                              </div>
                              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                                    {isNl ? 'Glutenvrij Indiaas Eten Den Haag' : 'Gluten Free Indian Food Den Haag'}
                              </h1>
                              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
                                    {isNl
                                          ? 'Glutenvrije opties beschikbaar voor de volgende gerechten. Verse kruiden, geen gluten, volledige smaken. Chopras Indian Restaurant, Leyweg 986.'
                                          : 'Gluten free options available for the following dishes. Fresh spices, no gluten, full flavors. Chopras Indian Restaurant, Leyweg 986.'}
                              </p>
                        </div>
                  </section>

                  {/* Main Intro */}
                  <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                              <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
                                    {isNl ? 'Glutenvrij Indiaas Eten in Den Haag Dat Smaakt als Indiaas Eten' : 'Gluten Free Indian Food Den Haag That Tastes Like Indian Food'}
                              </h2>
                              <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                                    {isNl ? (
                                          <>
                                                <p>
                                                      Glutenvrije voeding hoeft niet ingewikkeld of smakeloos te zijn. Bij Chopras Indian Restaurant op{' '}
                                                      <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Leyweg 986</Link>{' '}
                                                      in Den Haag zijn meer dan 15 gerechten natuurlijk glutenvrij. Niet aangepast. Niet ingewikt. Gewoon echt Indiaas eten dat toevallig geen gluten bevat.
                                                </p>
                                                <p>
                                                      Dal tadka. Aloo gobi. Bhindi masala. Chana masala. Deze zijn stergerechten in de Noord-Indiase keuken sinds eeuwen. Geen graan. Geen bloem. Alleen verse groenten, linzen, rijst en kruiden rechtstreeks uit India, elke ochtend vers gemalen voordat de keuken opengaat om 16:30.
                                                </p>
                                                <p>
                                                      Voor mensen met coeliakie of glutengevoeligheid in Den Haag is Chopras het directe antwoord. Glutenvrije{' '}
                                                      <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">volledige menu in Den Haag</Link>.{' '}
                                                      Halal gecertificeerd. 4,9 sterren van 800+ beoordelingen. Geen compromissen op smaak of voedingswaarde.
                                                </p>
                                          </>
                                    ) : (
                                          <>
                                                <p>
                                                      Gluten-free living does not need to be complicated or bland. At Chopras Indian Restaurant on{' '}
                                                      <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Leyweg 986</Link>{' '}
                                                      in Den Haag, more than 15 dishes are naturally gluten-free. Not adapted. Not wrapped in celery. Just real Indian food that happens to contain no gluten.
                                                </p>
                                                <p>
                                                      Dal tadka. Aloo gobi. Bhindi masala. Chana masala. These are star dishes in North Indian cooking for centuries. No grain. No flour. Only fresh vegetables, lentils, rice and spices sourced directly from India, ground fresh every morning before service opens at 16:30.
                                                </p>
                                                <p>
                                                      For people with celiac or gluten sensitivity in Den Haag, Chopras is the straightforward answer. Gluten-free{' '}
                                                      <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">full menu in Den Haag</Link>.{' '}
                                                      Halal certified. Rated 4.9 stars from 800+ reviews. No compromise on flavor or nutrition.
                                                </p>
                                          </>
                                    )}
                              </div>
                        </div>
                  </section>

                  {/* GLUTEN FREE DISH GRID */}
                  <section className="bg-[#F7F8FC]">
                        <MenuPageClient categories={glutenFreeCategories} items={glutenFreeItems} />
                  </section>

                  {/* Dish Categories Grid */}
                  <section className="bg-white py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                              <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
                                    {isNl ? 'Wat Staat Er op het Glutenvrije Menu?' : 'What Is on the Gluten Free Menu?'}
                              </h2>
                              {isNl ? (
                                    <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
                                          Van linzencurry tot gegrilde tandoorikip, het glutenvrije menu beslaat elke gang van een volledige maaltijd.{' '}
                                          <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Dal tadka</Link>{' '}
                                          en chana masala zijn de kerngerechten, maar het menu stopt daar niet.
                                    </p>
                              ) : (
                                    <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
                                          From lentil curry to grilled tandoori chicken, the gluten-free menu covers every course of a complete meal.{' '}
                                          <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Dal tadka</Link>{' '}
                                          and chana masala are the anchor dishes, but the menu does not stop there.
                                    </p>
                              )}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {(isNl ? [
                                          { title: 'Linzen en Peulvruchten', items: 'Dal tadka, chana masala, aloo jeera' },
                                          { title: "Groentecurry's", items: 'Aloo gobi, baingan bharta, bhindi masala, veg manchow soup' },
                                          { title: 'Biryani en Rijst', items: 'Vegetable biryani, steamed rice, jeera rice, chicken fried rice' },
                                          { title: 'Starters en Bijgerechten', items: 'Onion bhaji, plain papad, rijstgerechten' },
                                    ] : [
                                          { title: 'Lentils and Pulses', items: 'Dal tadka, chana masala, aloo jeera' },
                                          { title: 'Vegetable Curries', items: 'Aloo gobi, baingan bharta, bhindi masala, veg manchow soup' },
                                          { title: 'Biryani and Rice', items: 'Vegetable biryani, steamed rice, jeera rice, chicken fried rice' },
                                          { title: 'Starters and Sides', items: 'Onion bhaji, plain papad, rice dishes' },
                                    ]).map((item) => (
                                          <div key={item.title} className="bg-[#F7F8FC] rounded-xl p-6 border-l-4 border-white">
                                                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">{item.title}</h3>
                                                <p className="font-body text-[#1A1A1A] text-base leading-relaxed">{item.items}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Celiac and Gluten-Free Standards — Dark Accent Section */}
                  <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                              <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
                                    {isNl ? 'Glutenvrije Voorbereiding Bij Chopras' : 'Gluten Free Preparation at Chopras'}
                              </h2>
                              <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
                                    {isNl ? (
                                          <>
                                                <p>
                                                      Alle gerechten op het glutenvrije menu worden bereid met verse groenten, linzen en rijst. Geen bindmiddelen van tarwemeel. Geen roux. Geen brood. Alle papad wordt gemaakt van linzenmeel. Alle sauzen zijn verdikt met kokosmelk, yogurt of natuurlijke plantaardige ingrediënten.
                                                </p>
                                                <p>
                                                      Voor gasten met ernstige glutenallergie of coeliakie wordt voedsel bereid op een apart werkblad. Alle kruiden zijn glutenvrij gecertificeerd. Al het vlees is halal. Dit is voedsel dat veilig is voor je lichaam en niet het compromis insluit dat ik "glutenvrij" betekent.
                                                </p>
                                                <p>
                                                      Bel{' '}
                                                      <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">+31 6 30645930</Link>{' '}
                                                      of visit{' '}
                                                      <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Chopras op Leyweg 986</Link>{' '}
                                                      om meer over glutenvrije opties te zeggen.
                                                </p>
                                          </>
                                    ) : (
                                          <>
                                                <p>
                                                      All dishes on the gluten-free menu are prepared with fresh vegetables, lentils and rice. No wheat flour binders. No roux. No bread. All papad is made from lentil flour. All sauces are thickened with coconut milk, yogurt or natural plant-based ingredients.
                                                </p>
                                                <p>
                                                      For guests with serious gluten allergy or celiac, food is prepared on a separate workstation. All spices are certified gluten-free. All meat is halal. This is food that is safe for your body and does not include the compromise that "gluten-free" means.
                                                </p>
                                                <p>
                                                      Call{' '}
                                                      <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">+31 6 30645930</Link>{' '}
                                                      or visit{' '}
                                                      <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Chopras at Leyweg 986</Link>{' '}
                                                      to learn more about gluten-free options.
                                                </p>
                                          </>
                                    )}
                              </div>
                        </div>
                  </section>

                  {/* FAQ */}
                  <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                              <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-12 leading-[1.3]">
                                    {isNl ? 'Veelgestelde Vragen over Glutenvrij Indiaas Eten' : 'Frequently Asked Questions About Gluten Free Indian Food'}
                              </h2>
                              <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
                        </div>
                  </section>
            </>
      )
}
