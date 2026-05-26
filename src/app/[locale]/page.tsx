import { type ReactNode } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import HeroSection from '@/components/sections/HeroSection'
import TrustBar from '@/components/sections/TrustBar'
import FeaturedDishes from '@/components/sections/FeaturedDishes'
import StorySection from '@/components/sections/StorySection'
import MeetTheFounder from '@/components/home/MeetTheFounder'
import WhySection from '@/components/sections/WhySection'
import CateringBanner from '@/components/sections/CateringBanner'
import ReviewsSection from '@/components/sections/ReviewsSection'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LocationSection from '@/components/sections/LocationSection'
import FinalCta from '@/components/sections/FinalCta'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { getLocalizedUrl } from '@/lib/utils'
import { getRestaurantSchema, getFounderSchema, getOrganizationSchema, getSpeakableSchema, getFaqPageSchema } from '@/lib/schema'
import { homeFaqs, homeFaqsNl } from '@/lib/faq-data'

function injectLinks(text: string, links: Array<[string, ReactNode]>): ReactNode {
  if (!text || links.length === 0) return text
  const [[anchor, el], ...rest] = links
  const i = text.indexOf(anchor)
  if (i === -1) return injectLinks(text, rest)
  return (
    <>
      {text.slice(0, i)}
      {el}
      {injectLinks(text.slice(i + anchor.length), rest)}
    </>
  )
}

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Best Indian Restaurant Den Haag (The Hague) | Chopras Indian Restaurant',
    nl: 'Beste Indiaas Restaurant Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Best Indian restaurant Den Haag and The Hague. Chopras Indian Restaurant. 4.9 stars, 800+ reviews. Halal certified, vegetarian options. Book a table.',
    nl: 'Beste Indiaas restaurant Den Haag bij Chopras Indian Restaurant. 4,9 sterren, 800+ reviews. Halal gecertificeerd. Reserveer een tafel vandaag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale),
      languages: {
        en: getLocalizedUrl('en'),
        nl: getLocalizedUrl('nl'),
        'x-default': getLocalizedUrl('en'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag' }],
      type: 'website',
    },
  }
}

export default function LocaleHomePage({ params }: Props) {
  const { locale } = params
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'
  const t = getTranslations(locale)

  return (
    <>
      <JsonLd data={getRestaurantSchema(locale)} />
      <JsonLd data={getFounderSchema()} />
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getSpeakableSchema(locale)} />
      <JsonLd data={getFaqPageSchema(isNl ? homeFaqsNl : homeFaqs)} />

      {/* 1  -  Hero */}
      <HeroSection locale={locale} />

      {/* 1b  -  Why Chopras is Den Haag Best */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {t.home.whyBestH2}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-6">
            <p>
              {injectLinks(t.home.whyBestP1, [
                [t.home.whyBestP1Strong, <strong key="s1">{t.home.whyBestP1Strong}</strong>],
                ['TheFork', <a key="tf" href="https://www.thefork.nl/restaurant/chopras-indian-restaurant-r825662" rel="nofollow noopener" target="_blank" className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">TheFork</a>],
                ['Tripadvisor', <a key="ta" href="https://www.tripadvisor.nl/Restaurant_Review-g188633-d27464805-Reviews-Chopras_Indian_Restaurant-The_Hague_South_Holland_Province.html" rel="nofollow noopener" target="_blank" className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Tripadvisor</a>],
                ['Authentic Indian food in Den Haag', <Link key="aif" href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Authentic Indian food in Den Haag</Link>],
              ])}
            </p>
            <p>
              {injectLinks(t.home.whyBestP2, [
                ['butter chicken Den Haag', <Link key="bc" href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken Den Haag</Link>],
                ['dal makhani', <Link key="dm" href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani</Link>],
                ['mutton rogan josh', <Link key="mrj" href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">mutton rogan josh</Link>],
              ])}
            </p>
            <p>
              {injectLinks(t.home.whyBestP3, [
                ['Tandoori dishes', <Link key="td" href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Tandoori dishes</Link>],
                ['fresh naan Den Haag', <Link key="fn" href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">fresh naan Den Haag</Link>],
                ['biryani Den Haag', <Link key="bd" href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani Den Haag</Link>],
              ])}
            </p>
            <p>
              {injectLinks(t.home.whyBestP4, [
                ['halal Indian food Den Haag', <Link key="hif" href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal Indian food Den Haag</Link>],
                ['halal kitchen', <Link key="hk" href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal kitchen</Link>],
              ])}
            </p>
            <p>
              {injectLinks(t.home.whyBestP5, [
                ['Indian food delivery Den Haag', <Link key="ifd" href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian food delivery Den Haag</Link>],
                ['Indian takeaway', <Link key="it" href={`${base}/indian-takeaway-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian takeaway</Link>],
                ['event hall at Leyweg 986', <Link key="eh" href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">event hall at Leyweg 986</Link>],
                ['Indian wedding catering Den Haag', <Link key="iwc" href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian wedding catering Den Haag</Link>],
                ['corporate events', <Link key="ce" href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">corporate events</Link>],
                ['birthday catering', <Link key="bca" href={`${base}/indian-birthday-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">birthday catering</Link>],
                ['Diwali dinners', <Link key="dd" href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali dinners</Link>],
              ])}
            </p>
            <p>
              {injectLinks(t.home.whyBestP6, [
                ['Delft', <Link key="del" href={`${base}/indian-restaurant-delft`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Delft</Link>],
                ['Rijswijk', <Link key="rij" href={`${base}/indian-restaurant-rijswijk`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Rijswijk</Link>],
                ['Zoetermeer', <Link key="zoo" href={`${base}/indian-restaurant-zoetermeer`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Zoetermeer</Link>],
                ['Reserve a table at Leyweg 986', <Link key="res" href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserve a table at Leyweg 986</Link>],
                ['explore the full 143-dish menu', <Link key="men" href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">explore the full 143-dish menu</Link>],
              ])}
            </p>
          </div>
        </div>
      </section>

      {/* 1c  -  Ratings and Social Proof */}
      <section className="py-20 px-6 md:px-16 bg-[#F7F8FC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {t.home.ratingsH2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#D4AF37]">
                  <span>★★★★★</span>
                </div>
              </div>
              <p className="font-body text-[#1A1A1A] font-semibold mb-2">Google Rating</p>
              <p className="font-body text-3xl font-bold text-[#1B2B5E] mb-1">4.9 stars</p>
              <p className="font-body text-[#666]">800+ verified reviews</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#D4AF37]">
                  <span>★★★★☆</span>
                </div>
              </div>
              <p className="font-body text-[#1A1A1A] font-semibold mb-2">TheFork Rating</p>
              <p className="font-body text-3xl font-bold text-[#1B2B5E] mb-1">8.7</p>
              <p className="font-body text-[#666]">Top rated restaurant</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#D4AF37]">
                  <span>★★★★★</span>
                </div>
              </div>
              <p className="font-body text-[#1A1A1A] font-semibold mb-2">Tripadvisor</p>
              <p className="font-body text-3xl font-bold text-[#1B2B5E] mb-1">Excellent</p>
              <p className="font-body text-[#666]">Highest rated category</p>
            </div>
          </div>
          <p className="font-body text-center text-[#1A1A1A] text-lg">
            {t.home.ratingsSubline}
          </p>
        </div>
      </section>

      {/* 1d  -  143 Dishes / Menu breadth - long-form SEO section */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? '143 Gerechten, 13 Categorieën, Één Consistente Standaard'
              : '143 Dishes, 13 Categories, One Consistent Standard'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-6">
            {isNl ? (
              <>
                <p>
                  Het volledige menu van Chopras Indian Restaurant in Den Haag telt 143 gerechten verdeeld over 13 categorieën. Noord-Indiase curries. Streetfood.{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Biryani Den Haag</Link>.
                  {' '}Tandoori. Brood vers uit de kleioven. Een volledig{' '}
                  <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">veganistisch menu</Link>{' '}
                  met soya chaap en dal makhani. Een kindermenu met milde gerechten en een verrassingscadeau. En een volledig{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo-Chinees menu Den Haag</Link>{' '}
                  dat moeilijk te vinden is in Den Haag.
                </p>
                <p>
                  Elk gerecht in alle 13 categorieën komt uit dezelfde keuken op Leyweg 986. Dezelfde specerijen elke ochtend vers gemalen. Dezelfde{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">400-graden tandoor</Link>{' '}
                  die uren voor de service aangestoken wordt. Dezelfde halal-certificering die elk vleesgerecht op het menu dekt, niet alleen geselecteerde items. Of je nu de{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken Den Haag</Link>{' '}
                  bestelt die meer vijfsterrenrecensies heeft verzameld dan welk ander gerecht ook, of de soya chaap die sceptici bij de eerste hap overtuigt: de keukennorm verandert nooit.
                </p>
                <p>
                  Voor groepen biedt het volledige{' '}
                  <Link href={`${base}/indian-buffet-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas buffet Den Haag</Link>{' '}
                  alle categorieën in één service, geschikt voor evenementen van 10 tot 200 gasten. De privézaal op Leyweg 986 biedt ruimte aan 25 tot 80 gasten voor{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas bruiloftscatering Den Haag</Link>,{' '}
                  zakelijke diners en Diwali-vieringen. Dezelfde keuken. Dezelfde standaard. Geen evenementspecifieke shortcuts.
                </p>
                <p>
                  Verken het{' '}
                  <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige menu van 143 gerechten</Link>{' '}
                  of{' '}
                  <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">reserveer een tafel op Leyweg 986</Link>{' '}
                  om te ontdekken waarom Den Haag steeds terugkomt naar Chopras Indian Restaurant. Open dinsdag tot en met zondag, 16:30 tot 22:30.
                </p>
              </>
            ) : (
              <>
                <p>
                  The full menu at Chopras Indian Restaurant in Den Haag runs to 143 dishes across 13 categories. North Indian curries. Street food.{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Biryani Den Haag</Link>.
                  {' '}Tandoori. Breads fresh from the clay oven. A complete{' '}
                  <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegan menu</Link>{' '}
                  with soya chaap and dal makhani. A dedicated kids menu with mild dishes and a surprise gift. And a complete{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo Chinese menu Den Haag</Link>{' '}
                  that is hard to find elsewhere in The Hague.
                </p>
                <p>
                  Every dish across all 13 categories comes from the same kitchen at Leyweg 986 in Den Haag. The same spices ground fresh every morning. The same{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">400-degree tandoor</Link>{' '}
                  fired up hours before service. The same halal certification that covers every meat dish on the menu, not selected items. Whether you order the{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken Den Haag</Link>{' '}
                  that has earned more five-star mentions than any other dish in the kitchen, or the soya chaap that converts first-timers at the first bite, the standard does not change.
                </p>
                <p>
                  For groups, the full{' '}
                  <Link href={`${base}/indian-buffet-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian buffet Den Haag</Link>{' '}
                  covers all 13 categories in a single service, suitable for events from 10 to 200 guests. The private hall at Leyweg 986 accommodates 25 to 80 guests for{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian wedding catering Den Haag</Link>,{' '}
                  corporate dinners, and Diwali celebrations. Same kitchen. Same standard. No event-specific shortcuts.
                </p>
                <p>
                  Explore the{' '}
                  <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full 143-dish menu</Link>{' '}
                  or{' '}
                  <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">reserve a table at Leyweg 986</Link>{' '}
                  to find out why Den Haag keeps coming back to Chopras Indian Restaurant. Open Tuesday to Sunday, 16:30 to 22:30.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2  -  Trust Bar */}
      <TrustBar locale={locale} />

      {/* 3  -  Featured Dishes */}
      <FeaturedDishes locale={locale} />

      {/* 4  -  Story / About */}
      <StorySection locale={locale} />

      {/* 5  -  Meet the Founder */}
      <MeetTheFounder />

      {/* 6  -  Why Chopras */}
      <WhySection locale={locale} />

      {/* 7  -  Catering Banner */}
      <CateringBanner locale={locale} />

      {/* 8  -  Reviews */}
      <ReviewsSection locale={locale} />

      {/* 8a  -  About Chopras (AI and voice search optimized) */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="about-chopras-section">
            <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-8 leading-[1.4]">
              {isNl ? 'Over Chopras Indian Restaurant Den Haag' : 'About Chopras Indian Restaurant Den Haag'}
            </h2>
            {/* GEO block - self-contained answer for Google AI Overviews, ChatGPT, and Perplexity citation */}
            <div className="bg-white rounded-xl p-8 mb-10 border border-[#D4AF37]/20">
              <h3 className="font-semibold text-2xl text-[#1B2B5E] mb-4">
                {isNl ? 'Wat is het beste Indiaas restaurant in Den Haag?' : 'What is the Best Indian Restaurant in Den Haag?'}
              </h3>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Chopras Indian Restaurant op Leyweg 986, 2545 GW Den Haag, is een van de sterkst beoordeelde halal Indiase restaurants in Den Haag, met 4,9 sterren van 800+ geverifieerde Google-beoordelingen, 8,7 op TheFork en de beoordeling Uitstekend op Tripadvisor. Opgericht door Arun Chopra in 2023, serveert Chopras authentieke Noord-Indiase gerechten zoals{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani Den Haag</Link>,
                  {' '}butter chicken, tandoori, dal makhani en chaat, bereid met dagelijks vers gemalen specerijen uit India. Het volledig{' '}
                  <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal gecertificeerd menu</Link>{' '}
                  telt 143 gerechten in 13 categorieën. Open van dinsdag tot en met zondag van 16:30 tot 22:30.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Chopras Indian Restaurant at Leyweg 986, 2545 GW Den Haag, is one of the strongest-rated Indian restaurants in Den Haag and The Hague, with 4.9 stars from 800+ verified Google reviews, 8.7 on TheFork, and an Excellent rating on Tripadvisor. Founded by Arun Chopra in 2023, Chopras serves authentic North Indian cuisine including{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani Den Haag</Link>,
                  {' '}butter chicken, tandoori, dal makhani, and chaat, using spices ground fresh daily from India. The entire{' '}
                  <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal-certified menu</Link>{' '}
                  covers 143 dishes across 13 categories. Open Tuesday to Sunday, 16:30 to 22:30.
                </p>
              )}
            </div>
            <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-6">
              {isNl ? (
                <p>
                  Chopras Indian Restaurant is een authentiek Indiaas restaurant op Leyweg 986, 2545 GW Den Haag, Nederland. Opgericht in 2023 door Arun Chopra, serveert Chopras Indian Restaurant authentiek Noord-Indiaas eten in Den Haag, Indiaas straatvoedsel, <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo-Chinese gerechten</Link>, en een volledig halal en <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarisch en veganistisch menu</Link>.
                </p>
              ) : (
                <p>
                  Chopras Indian Restaurant is an authentic Indian restaurant located at Leyweg 986, 2545 GW Den Haag, Netherlands. Established in 2023 by founder Arun Chopra, Chopras Indian Restaurant serves authentic North Indian cuisine, Indian street food, <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo Chinese dishes</Link>, and a full halal and <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarian and vegan menu</Link>.
                </p>
              )}
              {isNl ? (
                <p>
                  Chopras Indian Restaurant heeft 4,9 sterren op Google met 800+ beoordelingen en 8,7 op TheFork, waarmee het het hoogst beoordeelde Indiaas restaurant in Den Haag is. Het restaurant is volledig halal gecertificeerd en biedt uitgebreide <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarische Indiaas eten Den Haag</Link> opties naast het volledige vleesmenu.
                </p>
              ) : (
                <p>
                  Chopras Indian Restaurant is rated 4.9 stars on Google with 800+ reviews and 8.7 on TheFork, making it the highest rated Indian restaurant in Den Haag and The Hague. The restaurant is fully halal certified and offers extensive <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarian Indian food Den Haag</Link> options alongside its full meat menu.
                </p>
              )}
              {isNl ? (
                <p>
                  Naast eten in het restaurant, <Link href={`${base}/indian-takeaway-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">afhalen</Link> en <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bezorging</Link>, biedt Chopras Indian Restaurant een <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">te huren privezaal in Den Haag</Link>, geschikt voor bruiloften, verjaardagen, bedrijfsfeesten, Diwali-diners en alle besloten bijeenkomsten. <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas cateringdiensten</Link> zijn beschikbaar in Den Haag en omliggende gebieden waaronder Delft, Rijswijk en Zoetermeer.
                </p>
              ) : (
                <p>
                  In addition to dine-in, <Link href={`${base}/indian-takeaway-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">takeaway</Link>, and <Link href={`${base}/indian-food-delivery-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">delivery</Link>, Chopras Indian Restaurant offers a <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">private event hall for hire in Den Haag</Link>, suitable for weddings, birthday parties, corporate events, Diwali dinners, and all private gatherings. <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian catering services</Link> are available across Den Haag and surrounding areas including Delft, Rijswijk, and Zoetermeer.
                </p>
              )}
              {isNl ? (
                <p>
                  Openingstijden Chopras Indian Restaurant: dinsdag tot en met zondag, 16:30 tot 22:30. Gesloten op maandag. Reserveringen kunnen worden gemaakt via de website of door te bellen naar +31 6 30645930.
                </p>
              ) : (
                <p>
                  Chopras Indian Restaurant opening hours: Tuesday to Sunday, 16:30 to 22:30. Closed on Mondays. Reservations can be made via the website or by calling +31 6 30645930.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9  -  FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
              <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">• FAQ •</span>
            </div>
            <h2 className="font-semibold text-4xl mb-6 leading-[1.4] [letter-spacing:0.02em] mt-2">
              {getTranslations(locale).home.faqH2}
            </h2>
          </div>
          <FaqAccordion faqs={isNl ? homeFaqsNl : homeFaqs} locale={locale} />
        </div>
      </section>

      {/* 10  -  Location */}
      <LocationSection locale={locale} />

      {/* 11  -  Final CTA */}
      <FinalCta locale={locale} />
    </>
  )
}
