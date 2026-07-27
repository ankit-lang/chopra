import { type ReactNode } from 'react'
import Link from 'next/link'
import { Utensils, Leaf, BadgeCheck, Trophy } from 'lucide-react'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import HeroSection from '@/components/sections/HeroSection'
import MarqueeBanner from '@/components/sections/MarqueeBanner'
import TrustBar from '@/components/sections/TrustBar'
import FeaturedDishes from '@/components/sections/FeaturedDishes'
import StorySection from '@/components/sections/StorySection'
import MeetTheFounder from '@/components/home/MeetTheFounder'
import WhySection from '@/components/sections/WhySection'
import CateringBanner from '@/components/sections/CateringBanner'
import EventWhyChoose from '@/components/sections/EventWhyChoose'
import MenuOverviewSection from '@/components/home/MenuOverviewSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LocationSection from '@/components/sections/LocationSection'
import FinalCta from '@/components/sections/FinalCta'
import TasteOfIndiaFeatures from '@/components/home/TasteOfIndiaFeatures'
import AnimatedImageGrid from '@/components/home/AnimatedImageGrid'
import AnimatedContent from '@/components/ui/AnimatedContent'
import OrderOnlineButton from '@/components/ui/OrderOnlineButton'
import GallerySection from '@/components/home/GallerySection'
import SignatureDishesGrid from '@/components/sections/SignatureDishesGrid'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { getRestaurantSchema, getFounderSchema, getOrganizationSchema, getSpeakableSchema, getFaqPageSchema } from '@/lib/schema'
import { homeFaqs, homeFaqsNl } from '@/lib/faq-data'
import Image from 'next/image'
import { getLocalizedUrl } from '@/lib/utils'

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
    en: 'Best Indian restaurant Den Haag and The Hague. Chopras Indian Restaurant. 4.9 stars, 1100+ reviews. Halal certified, vegetarian options. Book a table.',
    nl: 'Beste Indiaas restaurant Den Haag bij Chopras Indian Restaurant. 4,9 sterren, 1100+ reviews. Halal gecertificeerd. Reserveer een tafel vandaag.',
  }
  const keywords = [
    'best indian restaurant in den haag',
    'Indian restaurant in the hague',
    'best indian food den haag',
    'Chicken biryani Den Haag',
    'best butter chicken the huge',
    'best butter chicken the hague',
    'Vegetarian Indian food Den Haag'
  ]
  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords,
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

const SIGNATURE_DISHES = [
  { id: 1, name: 'Pani Puri', image: '/sign/pani.png', desktopImage: '/signdesk/1mob.png', link: '/pani-puri-den-haag', desktopOrderClass: 'md:order-1' },
  { id: 2, name: 'Chopras Special Paneer', image: '/sign/panneer.png', desktopImage: '/signdesk/4mob.png', sideImage: '/images/dishes/plain-naan.jpg', sideName: 'Plain Naan', link: '/menu', desktopOrderClass: 'md:order-4' },
  { id: 3, name: 'Chopras Non Veg Platter', image: '/sign/platter.png', desktopImage: '/signdesk/2mob.png', link: '/menu', desktopOrderClass: 'md:order-2' },
  { id: 4, name: 'Dal Makhani', image: '/sign/dal.png', desktopImage: '/signdesk/3mob.png', sideImage: '/images/dishes/plain-naan.jpg', sideName: 'Plain Naan', link: '/dal-makhani-den-haag', desktopOrderClass: 'md:order-3' },
  { id: 5, name: 'Butter Chicken', image: '/sign/butter.png', sideImage: '/images/dishes/steamed-rice.webp', sideName: 'Steamed Rice', link: '/butter-chicken-den-haag', hideOnDesktop: true },
  { id: 6, name: 'Moong Dal Halwa', image: '/sign/moong.png', desktopImage: '/signdesk/5mob.png', link: '/menu', desktopOrderClass: 'md:order-5' },
]

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

      {/* 1a  -  Marquee ticker */}
      <MarqueeBanner locale={locale} />

      {/* 1b  -  A True Taste of India */}
      <section className="relative bg-white py-16 md:py-24 px-5 md:px-12 overflow-hidden border-l-[8px] border-[#1A1A1A]">

        {/* Vector Watermarks (Top Right & Bottom Right) */}
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[400px] h-[400px] md:w-[600px] md:h-[600px] text-[#D4AF37] opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="40" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={`top-${i}`} transform={`rotate(${angle} 50 50)`}>
                <path d="M 50 10 Q 60 30 50 50 Q 40 30 50 10" />
              </g>
            ))}
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] text-[#D4AF37] opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="40" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={`bottom-${i}`} transform={`rotate(${angle} 50 50)`}>
                <path d="M 50 10 Q 60 30 50 50 Q 40 30 50 10" />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto z-10">

          {/* ── Header ── */}
          <div className="mb-12 flex flex-col items-start text-left">
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 ">
              <span className="font-bold text-left">{isNl ? 'Een Echte Smaak van India' : 'A True Taste of India'}</span><br />
              <span className="italic ">{isNl ? 'in het Hart van Den Haag' : 'in the Heart of The Hague'}</span>
            </h2>

            {/* Decorative rule */}
            <div className="flex items-center justify-start gap-4 mt-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#06068a]/40" />
              <span className="text-[#06068a]/60 text-lg">✦</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#06068a]/40" />
            </div>
          </div>

          {/* ── Main Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 gap-x-12 xl:gap-x-20 items-start">

            {/* Left — body copy */}
            <div className="lg:col-span-3 font-body text-[#1A1A1A]/70 text-base leading-relaxed md:leading-[2.2] space-y-8">
              {isNl ? (
                <>
                  <AnimatedContent distance={20} duration={0.6} threshold={0.2} delay={0.1}>
                    <p>
                      Chopras Indian Restaurant is een <Link href={`${base}/about`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">familiebedrijf en Indiaas restaurant in Den Haag</Link>, opgericht voor mensen die houden van authentieke smaken, oprechte gastvrijheid en eten dat met zorg is bereid. Elk recept weerspiegelt de rijkdom van de Indiase keuken.
                    </p>
                  </AnimatedContent>
                  <AnimatedContent distance={20} duration={0.6} threshold={0.2} delay={0.2}>
                    <p>
                      Onze chefs bereiden elk gerecht vers op bestelling met zorgvuldig geselecteerde ingrediënten en versgemalen specerijen. Van romige <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">butter chicken</Link> en langzaam gekookte curries tot aromatische <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryani's</Link>, <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">tandoorigrills</Link> en <Link href={`${base}/vegetarian-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegetarische gerechten</Link>.
                    </p>
                  </AnimatedContent>
                  <AnimatedContent distance={20} duration={0.6} threshold={0.2} delay={0.4}>
                    <p>
                      Gasten reizen vanuit Den Haag, <Link href={`${base}/indian-restaurant-delft`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Delft</Link>, <Link href={`${base}/indian-restaurant-rijswijk`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Rijswijk</Link> en <Link href={`${base}/indian-restaurant-zoetermeer`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Zoetermeer</Link> om te genieten van onze beroemde curries, vers gebakken <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">naan</Link> en een van de grootste <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indiase menu's</Link> in Nederland.
                    </p>
                  </AnimatedContent>

                  {/* Pull-out closing statement */}
                  <AnimatedContent distance={20} duration={0.8} threshold={0.2} delay={0.5}>
                    <div className="mt-10 rounded-[1.5rem] bg-[#F4F5F9] p-6 md:p-8 border border-black/[0.03] shadow-sm hover:shadow-md transition-shadow duration-300">
                      <p className="font-body text-[#1B2B5E]/70 text-sm">Dit is geen Indiaas eten aangepast voor het gemak.</p>
                      <p className="font-body text-lg italic font-semibold mt-2 text-[#06068a]">
                        Dit is authentiek Indiaas koken — krachtig, gebalanceerd en geworteld in traditie.
                      </p>
                    </div>
                  </AnimatedContent>
                </>
              ) : (
                <>
                  <AnimatedContent distance={20} duration={0.6} threshold={0.2} delay={0.1}>
                    <p>
                      Chopras Indian Restaurant is a <Link href={`${base}/about`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">family-owned Indian restaurant in Den Haag</Link>, created for people who appreciate authentic flavours, genuine hospitality and food prepared with care. Every recipe reflects the richness of Indian cuisine while staying true to the traditions that have been passed down through generations.
                    </p>
                  </AnimatedContent>
                  <AnimatedContent distance={20} duration={0.6} threshold={0.2} delay={0.2}>
                    <p>
                      Our chefs prepare every dish fresh to order using carefully selected ingredients and freshly ground spices. From creamy <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">butter chicken</Link> and slow-cooked curries to aromatic <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">biryanis</Link>, sizzling <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">tandoori grills</Link> and wholesome <Link href={`${base}/vegetarian-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegetarian dishes</Link>, every plate is crafted to deliver the depth, balance and warmth that define authentic Indian cooking.
                    </p>
                  </AnimatedContent>

                  <AnimatedContent distance={20} duration={0.6} threshold={0.2} delay={0.4}>
                    <p>
                      At Chopras Indian Restaurant, we proudly serve authentic Indian food in Den Haag, combining traditional recipes with premium ingredients and genuine hospitality. Guests travel from Den Haag, <Link href={`${base}/indian-restaurant-delft`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Delft</Link>, <Link href={`${base}/indian-restaurant-rijswijk`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Rijswijk</Link>, and <Link href={`${base}/indian-restaurant-zoetermeer`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Zoetermeer</Link> to enjoy our famous curries, freshly baked <Link href={`${base}/naan-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">naan</Link>, aromatic biryanis, authentic tandoori grills and one of the largest <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indian menus</Link> in the Netherlands. Whether you're joining us for dinner, celebrating with family, or ordering <Link href={`${base}/indian-takeaway-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">takeaway and delivery</Link>, every dish reflects the authentic flavours of India.
                    </p>
                  </AnimatedContent>

                  {/* Pull-out closing statement */}
                  <AnimatedContent distance={20} duration={0.8} threshold={0.2} delay={0.5}>
                    <div className="mt-10 rounded-[1.5rem] bg-[#F4F5F9] p-6 md:p-8 border border-black/[0.03] shadow-sm hover:shadow-md transition-shadow duration-300">
                      <p className="font-body text-[#1B2B5E]/70 text-sm">This is not Indian food adapted for convenience.</p>
                      <p className="font-body text-lg italic font-semibold mt-2 text-[#06068a]">
                        This is authentic Indian cooking—bold, balanced and rooted in tradition.
                      </p>
                    </div>
                  </AnimatedContent>
                </>
              )}
            </div>

            {/* Right — Image container */}
            <div className="lg:col-span-2 h-[350px] sm:h-[450px] lg:h-[600px] w-full flex items-center justify-center">
              <AnimatedContent
                distance={100}
                direction="vertical"
                duration={1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={0.95}
                threshold={0.2}
                className="w-full h-full flex items-center justify-center"
              >
                {/* Single Image */}
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <Image
                    src="/1sec.png"
                    alt="A True Taste of India - Chopras Indian Restaurant"
                    fill
                    className="object-cover object-center brightness-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </AnimatedContent>
            </div>

            {/* Bottom — Feature cards (spans full width on desktop) */}
            <div className="lg:col-span-5 w-full mt-4 lg:mt-8">
              <TasteOfIndiaFeatures
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 space-y-0"
                features={isNl ? [
                  {
                    icon: 'utensils',
                    title: 'Authentieke Recepten',
                    desc: 'Elk gerecht volgt traditionele Noord-Indiase huisecepten — ongewijzigd.',
                    href: `${base}/menu`,
                  },
                  {
                    icon: 'leaf',
                    title: 'Dagelijks Vers',
                    desc: 'Specerijen worden elke ochtend vers gemalen. Ingrediënten dagelijks vers bereid.',
                    href: `${base}/vegan-menu`,
                  },
                  {
                    icon: 'badge-check',
                    title: '100% Halal',
                    desc: 'Elk vleesgerecht op de kaart is volledig halal gecertificeerd.',
                    href: `${base}/halal-menu`,
                  },
                  {
                    icon: 'trophy',
                    title: 'Hoog Beoordeeld',
                    desc: '4.9★ op Google · 1100+ beoordelingen · Uitstekend op Tripadvisor.',
                    href: `${base}/blog/best-indian-restaurant-den-haag`,
                  },
                ] : [
                  {
                    icon: 'utensils',
                    title: 'Authentic Recipes',
                    desc: 'Every dish follows traditional North Indian home recipes — unchanged .',
                    href: `${base}/menu`,
                  },
                  {
                    icon: 'leaf',
                    title: 'Fresh Daily',
                    desc: 'Spices are ground fresh every morning. Ingredients are sourced and prepared daily.',
                    href: `${base}/vegan-menu`,
                  },
                  {
                    icon: 'badge-check',
                    title: '100% Halal',
                    desc: 'Every meat dish on the menu is fully halal certified — not selected items.',
                    href: `${base}/halal-menu`,
                  },
                  {
                    icon: 'trophy',
                    title: 'Highly Rated',
                    desc: '4.9★ on Google · 1100+ reviews · Tripadvisor Excellent — Den Haag\'s most trusted restaurant.',
                    href: `${base}/blog/best-indian-restaurant-den-haag`,
                  },
                ]}
              />
            </div>

          </div>
        </div>
      </section>
      {/* 1c  -  Best Dishes */}
      <section className="py-24 bg-white">
        <div className="px-5 md:px-12 max-w-7xl mx-auto mb-12">
          {/* Header row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-start text-left">
              <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] leading-[1.15] tracking-tight">

                <span className=" font-bold md:ml-[-40px]">{isNl ? 'Kenmerkende Gerechten' : 'Signature Dishes'}</span>
              </h2>
              {/* Decorative rule */}
              {/* <div className="flex items-center gap-4 mt-4"> */}
              {/* <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#06068a]/40" />
                <span className="text-[#06068a]/60 text-lg">✦</span>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#06068a]/40" /> */}
              {/* </div> */}
            </div>
            <OrderOnlineButton href={`${base}/menu`} />
          </div>
        </div>
        <SignatureDishesGrid dishes={SIGNATURE_DISHES} base={base} />
      </section>

      {/* 1d  -  Ratings and Social Proof */}
      {/* <section className="py-20 px-6 md:px-16 bg-[#F7F8FC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {t.home.ratingsH2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-white">
                  <span>★★★★★</span>
                </div>
              </div>
              <p className="font-body text-[#1A1A1A] font-semibold mb-2">Google Rating</p>
              <p className="font-body text-3xl font-bold text-[#1B2B5E] mb-1">4.9 stars</p>
              <p className="font-body text-[#666]">1100+ verified reviews</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-white">
                  <span>★★★★☆</span>
                </div>
              </div>
              <p className="font-body text-[#1A1A1A] font-semibold mb-2">TheFork Rating</p>
              <p className="font-body text-3xl font-bold text-[#1B2B5E] mb-1">8.7</p>
              <p className="font-body text-[#666]">Top rated restaurant</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-white">
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
      </section> */}

      {/* 1d  -  143 Dishes / Menu breadth - long-form SEO section */}
      {/* <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? '143 Gerechten, 13 Categorieën, Één Consistente Standaard'
              : '143 Dishes, 13 Categories, One Consistent Standard'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-6">
            {isNl ? (
              <>
                <p>
                  Het volledige menu van Chopras Indian Restaurant in Den Haag telt 143 gerechten verdeeld over 13 categorieën. Noord-Indiase curries. Streetfood.{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Biryani Den Haag</Link>.
                  {' '}Tandoori. Brood vers uit de kleioven. Een volledig{' '}
                  <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">veganistisch menu</Link>{' '}
                  met soya chaap en dal makhani. Een kindermenu met milde gerechten en een verrassingscadeau. En een volledig{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indo-Chinees menu Den Haag</Link>{' '}
                  dat moeilijk te vinden is in Den Haag.
                </p>
                <p>
                  Elk gerecht in alle 13 categorieën komt uit dezelfde keuken op Leyweg 986. Dezelfde specerijen elke ochtend vers gemalen. Dezelfde{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">400-graden tandoor</Link>{' '}
                  die uren voor de service aangestoken wordt. Dezelfde halal-certificering die elk vleesgerecht op het menu dekt, niet alleen geselecteerde items. Of je nu de{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">butter chicken Den Haag</Link>{' '}
                  bestelt die meer vijfsterrenrecensies heeft verzameld dan welk ander gerecht ook, of de soya chaap die sceptici bij de eerste hap overtuigt: de keukennorm verandert nooit.
                </p>
                <p>
                  Voor groepen biedt het volledige{' '}
                  <Link href={`${base}/indian-buffet-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indiaas buffet Den Haag</Link>{' '}
                  alle categorieën in één service, geschikt voor evenementen van 10 tot 200 gasten. De privézaal op Leyweg 986 biedt ruimte aan 25 tot 80 gasten voor{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indiaas bruiloftscatering Den Haag</Link>,{' '}
                  zakelijke diners en Diwali-vieringen. Dezelfde keuken. Dezelfde standaard. Geen evenementspecifieke shortcuts.
                </p>
                <p>
                  Verken het{' '}
                  <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">volledige menu van 143 gerechten</Link>{' '}
                  of{' '}
                  <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">reserveer een tafel op Leyweg 986</Link>{' '}
                  om te ontdekken waarom Den Haag steeds terugkomt naar Chopras Indian Restaurant. Open dinsdag tot en met zondag, 16:30 tot 22:30.
                </p>
              </>
            ) : (
              <>
                <p>
                  The full menu at Chopras Indian Restaurant in Den Haag runs to 143 dishes across 13 categories. North Indian curries. Street food.{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Biryani Den Haag</Link>.
                  {' '}Tandoori. Breads fresh from the clay oven. A complete{' '}
                  <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegan menu</Link>{' '}
                  with soya chaap and dal makhani. A dedicated kids menu with mild dishes and a surprise gift. And a complete{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indo Chinese menu Den Haag</Link>{' '}
                  that is hard to find elsewhere in The Hague.
                </p>
                <p>
                  Every dish across all 13 categories comes from the same kitchen at Leyweg 986 in Den Haag. The same spices ground fresh every morning. The same{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">400-degree tandoor</Link>{' '}
                  fired up hours before service. The same halal certification that covers every meat dish on the menu, not selected items. Whether you order the{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">butter chicken Den Haag</Link>{' '}
                  that has earned more five-star mentions than any other dish in the kitchen, or the soya chaap that converts first-timers at the first bite, the standard does not change.
                </p>
                <p>
                  For groups, the full{' '}
                  <Link href={`${base}/indian-buffet-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indian buffet Den Haag</Link>{' '}
                  covers all 13 categories in a single service, suitable for events from 10 to 200 guests. The private hall at Leyweg 986 accommodates 25 to 80 guests for{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indian wedding catering Den Haag</Link>,{' '}
                  corporate dinners, and Diwali celebrations. Same kitchen. Same standard. No event-specific shortcuts.
                </p>
                <p>
                  Explore the{' '}
                  <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">full 143-dish menu</Link>{' '}
                  or{' '}
                  <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">reserve a table at Leyweg 986</Link>{' '}
                  to find out why Den Haag keeps coming back to Chopras Indian Restaurant. Open Tuesday to Sunday, 16:30 to 22:30.
                </p>
              </>
            )}
          </div>
        </div>
      </section> */}

      {/* 2  -  Trust Bar */}
      {/* <TrustBar locale={locale} /> */}

      {/* 3  -  Featured Dishes */}
      {/* <FeaturedDishes locale={locale} /> */}

      {/* 4  -  Story / About */}
      {/* <StorySection locale={locale} /> */}

      {/* 5  -  Meet the Founder */}
      <MeetTheFounder locale={locale} />

      {/* 6  -  Why Chopras */}
      {/* <WhySection locale={locale} /> */}

      {/* 6.5 - Menu Overview Section */}
      {/* <MenuOverviewSection locale={locale} /> */}

      {/* 7  -  Catering Banner */}
      <CateringBanner locale={locale} />

      {/* 7.1 - Event Why Choose */}
      <EventWhyChoose locale={locale} />

      {/* 7.5 - Gallery */}
      <GallerySection locale={locale} />

      {/* 8  -  Reviews */}
      <ReviewsSection locale={locale} />

      {/* 8a  -  About Chopras (AI and voice search optimized) */}
      <section className="bg-white py-24 px-6 md:px-16 relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[#0000B3]/[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0000B3]/20 bg-[#0000B3]/5 mb-6"> */}
            {/* <span className="w-1.5 h-1.5 rounded-full btn-gradient" /> */}
            {/* <span className="text-[#06068a] text-xs font-bold uppercase tracking-widest">Our Story</span> */}
            {/* </span> */}
            <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-[2.5rem] text-[#06068a] leading-tight">
              {isNl ? 'Over Chopras Indian Restaurant Den Haag' : 'About Chopras Indian Restaurant Den Haag'}
            </h2>
          </div>

          <div className="about-chopras-section flex flex-col gap-8 md:gap-10">
            {/* GEO block - self-contained answer for Google AI Overviews, ChatGPT, and Perplexity citation */}
            <div className="bg-[#FAFAFA] rounded-3xl p-8 md:p-12 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
              <div className="absolute top-0 left-0 w-1 h-full btn-gradient opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="font-heading font-medium text-2xl md:text-3xl text-[#06068a] mb-6">
                {isNl ? 'Wat is het beste Indiase restaurant in Den Haag?' : 'Looking for the Best Indian Restaurant in Den Haag?'}
              </h3>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/80 text-lg leading-relaxed font-normal">
                  Chopras Indian Restaurant op Leyweg 986, 2545 GW Den Haag, is een van de sterkst beoordeelde halal Indiase restaurants in Den Haag, met 4,9 sterren van 1100+ geverifieerde Google-beoordelingen, 8,7 op TheFork en de beoordeling Uitstekend op Tripadvisor. Opgericht door Arun Chopra in 2023, serveert Chopras authentieke Noord-Indiase gerechten zoals{' '}
                  <Link href={`${base}/biryani-den-haag`} className=" hover:text-[#0000B3] ">biryani Den Haag</Link>,
                  {' '}butter chicken, tandoori, dal makhani en chaat, bereid met dagelijks vers gemalen specerijen uit India. Het volledig{' '}
                  <Link href={`${base}/halal-menu`} className="hover:text-[#0000B3] transition-colors">halal gecertificeerd menu</Link>{' '}
                  telt 143 gerechten in 13 categorieën. Open van dinsdag tot en met zondag van 16:30 tot 22:30.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/80 text-lg leading-relaxed font-normal">
                  Chopras Indian Restaurant at Leyweg 986, 2545 GW Den Haag, is one of the strongest-rated Indian restaurants in Den Haag and The Hague, with 4.9 stars from over 1,100 verified Google reviews, 8.7 on TheFork, and an Excellent rating on Tripadvisor. Founded by Arun Chopra in 2023, Chopras serves authentic North Indian cuisine including{' '}
                  <Link href={`${base}/biryani-den-haag`} className=" hover:text-[#0000B3] transition-colors">biryani</Link>,{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className=" hover:text-[#0000B3] transition-colors">butter chicken</Link>,{' '}
                  <Link href={`${base}/tandoori-den-haag`} className=" hover:text-[#0000B3] transition-colors">tandoori dishes</Link>,{' '}
                  dal makhani, and chaat, using spices ground fresh daily from India. The entire{' '}
                  <Link href={`${base}/halal-menu`} className=" hover:text-[#0000B3] transition-colors">halal-certified menu</Link>{' '}
                  features 143 dishes across 13 categories. Open Tuesday to Sunday, 16:30 to 22:30.
                </p>
              )}
            </div>

            <div className="font-body text-[#1A1A1A]/80 text-lg leading-relaxed space-y-6 px-4 md:px-8">
              {isNl ? (
                <p>
                  Chopras Indian Restaurant is een authentiek Indiaas restaurant op Leyweg 986, 2545 GW Den Haag, Nederland. Opgericht in 2023 door Arun Chopra, serveert Chopras Indian Restaurant authentiek Noord-Indiaas eten in Den Haag, Indiaas straatvoedsel, <Link href={`${base}/indo-chinese-restaurant-den-haag`} className=" hover:text-[#0000B3] transition-colors">Indo-Chinese gerechten</Link>, en een volledig halal en <Link href={`${base}/vegan-menu`} className="hover:text-[#0000B3] transition-colors">vegetarisch en veganistisch menu</Link>.
                </p>
              ) : (
                <p>
                  Whether you&apos;re planning a family dinner, a romantic date, a celebration with friends, or a business meal, Chopras delivers an authentic Indian dining experience in the heart of Den Haag. Our menu combines traditional North Indian recipes with popular{' '}
                  <Link href={`${base}/indian-street-food-den-haag`} className=" hover:text-[#0000B3] transition-colors">Indian street food</Link>,{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className=" hover:text-[#0000B3] transition-colors">Indo-Chinese favourites</Link>,{' '}
                  freshly baked tandoori breads, rich curries, fragrant biryanis, sizzling grills, and handcrafted desserts. We also offer one of the city&apos;s most extensive selections of{' '}
                  <Link href={`${base}/halal-menu`} className=" hover:text-[#0000B3] transition-colors">halal</Link>,{' '}
                  <Link href={`${base}/vegetarian-menu`} className=" hover:text-[#0000B3] transition-colors">vegetarian</Link>, and{' '}
                  <Link href={`${base}/vegan-menu`} className=" hover:text-[#0000B3] transition-colors">vegan Indian food</Link>,{' '}
                  making Chopras a favourite destination for every type of diner.
                </p>
              )}
              {isNl ? (
                <p>
                  Chopras Indian Restaurant heeft 4,9 sterren op Google met 1100+ beoordelingen en 8,7 op TheFork, waarmee het het hoogst beoordeelde Indiaas restaurant in Den Haag is. Het restaurant is volledig halal gecertificeerd en biedt uitgebreide <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className=" hover:text-[#0000B3] transition-colors">vegetarische Indiaas eten Den Haag</Link> opties naast het volledige vleesmenu.
                </p>
              ) : (
                <p>
                  In addition to dine-in,{' '}
                  <Link href={`${base}/indian-takeaway-den-haag`} className=" hover:text-[#0000B3] transition-colors">takeaway</Link>, and{' '}
                  <Link href={`${base}/indian-food-delivery-den-haag`} className=" hover:text-[#0000B3] transition-colors">home delivery</Link>,{' '}
                  Chopras offers professional{' '}
                  <Link href={`${base}/catering`} className=" hover:text-[#0000B3] transition-colors">Indian catering in Den Haag</Link>{' '}
                  and a spacious{' '}
                  <Link href={`${base}/feestzaal-den-haag`} className=" hover:text-[#0000B3] transition-colors">private event hall</Link>{' '}
                  for birthdays, weddings, anniversaries, corporate events, baby showers, Diwali celebrations, family gatherings, and special occasions. Our catering services extend across The Hague, Delft, Rijswijk, Zoetermeer, Voorburg, Leidschendam, Wateringen, and surrounding areas, bringing authentic Indian cuisine directly to your venue.
                </p>
              )}
              {isNl ? (
                <p>
                  Naast eten in het restaurant, <Link href={`${base}/indian-takeaway-den-haag`} className="hover:text-[#0000B3] transition-colors">afhalen</Link> en <Link href={`${base}/indian-food-delivery-den-haag`} className="hover:text-[#0000B3] transition-colors">bezorging</Link>, biedt Chopras Indian Restaurant een <Link href={`${base}/feestzaal-den-haag`} className="hover:text-[#0000B3] transition-colors">te huren privezaal in Den Haag</Link>, geschikt voor bruiloften, verjaardagen, bedrijfsfeesten, Diwali-diners en alle besloten bijeenkomsten. <Link href={`${base}/catering`} className="hover:text-[#0000B3] transition-colors">Indiaas cateringdiensten</Link> zijn beschikbaar in Den Haag en omliggende gebieden waaronder Delft, Rijswijk en Zoetermeer.
                </p>
              ) : (
                <p className="pt-6 border-t border-black/5 text-[#1A1A1A]/90 font-medium">
                  Recognised by thousands of satisfied guests for exceptional food, warm hospitality, and consistent quality, Chopras has become a trusted choice for anyone searching for the best Indian restaurant in Den Haag, halal Indian restaurant, Indian takeaway, Indian delivery,{' '}
                  <Link href={`${base}/biryani-den-haag`} className=" hover:text-[#0000B3] transition-colors">biryani in Den Haag</Link>,{' '}
                  <Link href={`${base}/catering`} className=" hover:text-[#0000B3] transition-colors">Indian catering</Link>, or a{' '}
                  <Link href={`${base}/feestzaal-den-haag`} className=" hover:text-[#0000B3] transition-colors">private party venue in The Hague</Link>.{' '}
                  Book your table online or call{' '}
                  <a href="tel:+31630645930" className=" hover:text-[#0000B3] transition-colors">+31 6 30645930</a>{' '}
                  and discover why so many guests return to Chopras for an authentic taste of India.
                </p>
              )}
              {isNl && (
                <p className="pt-6 border-t border-black/5 text-[#1A1A1A]/90 font-medium">
                  Openingstijden Chopras Indian Restaurant: dinsdag tot en met zondag, 16:30 tot 22:30. Gesloten op maandag. Reserveringen kunnen worden gemaakt via de website of door te bellen naar +31 6 30645930.
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

            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
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
