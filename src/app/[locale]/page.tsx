import { type ReactNode } from 'react'
import Link from 'next/link'
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
import ReviewsSection from '@/components/sections/ReviewsSection'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LocationSection from '@/components/sections/LocationSection'
import FinalCta from '@/components/sections/FinalCta'
import TasteOfIndiaFeatures from '@/components/home/TasteOfIndiaFeatures'
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

const SIGNATURE_DISHES = [
  { id: 1, name: 'Pani Puri', image: '/images/dishes/pani-puri.webp', link: '/pani-puri-den-haag' },
  { id: 2, name: 'Chopras Special Paneer', image: '/images/dishes/chopras-special-paneer.webp', sideImage: '/images/dishes/plain-naan.jpg', sideName: 'Plain Naan', link: '/menu' },
  { id: 3, name: 'Chopras Non Veg Platter', image: '/images/dishes/chopras-non-veg-platter.webp', link: '/menu' },
  { id: 4, name: 'Dal Makhani', image: '/images/dishes/dal-makhani.webp', sideImage: '/images/dishes/plain-naan.jpg', sideName: 'Plain Naan', link: '/dal-makhani-den-haag' },
  { id: 5, name: 'Butter Chicken', image: '/images/dishes/butter-chicken.webp', sideImage: '/images/dishes/steamed-rice.webp', sideName: 'Steamed Rice', link: '/butter-chicken-den-haag' },
  { id: 6, name: 'Moong Dal Halwa', image: '/images/dishes/moong-dal-halwa.webp', link: '/menu' },
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
      <MarqueeBanner />

      {/* 1b  -  A True Taste of India */}
      <section className="relative bg-[#F7F8FC] py-28 md:py-36 px-5 md:px-12 overflow-hidden">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0000B3]/[0.04] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#1B2B5E]/[0.04] blur-[100px]" />

        <div className="relative max-w-7xl mx-auto">

          {/* ── Header ── */}
          <div className="max-w-3xl mb-16">
            <span className="inline-flex justify-center items-center rounded-full border border-white/30 bg-[#0000B3]/10 px-2 py-1.5 text-[12px] uppercase tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-medium mb-6 text-center">
            </span>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#1B2B5E] leading-[1.15] tracking-tight">
              A True Taste of India{' '}
              <span className="block italic font-normal text-[#1B2B5E] mt-1">
                in the Heart of The Hague
              </span>
            </h2>

            {/* Decorative rule */}
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-[2px] bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
              <div className="w-3 h-3 rounded-full border-2 border-[#0000B3]/30" />
              <div className="w-6 h-[1px] bg-[#1B2B5E]/20" />
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-20 items-start">

            {/* Left — body copy */}
            <div className="lg:col-span-3 font-body text-[#1A1A1A]/70 text-base leading-relaxed md:leading-[2.2] space-y-8">
              <p>
                Chopras Indian Restaurant is a family-run Indian restaurant in The Hague (Den Haag), Netherlands, known for serving{' '}
                <span className="text-[#1A1A1A] font-medium">authentic North Indian cuisine</span>{' '}
                made with traditional recipes, fresh ingredients, and carefully balanced Indian spices.
              </p>
              <p>
                Every dish at Chopras Indian Restaurant is prepared with the same philosophy — keep it real, keep it traditional, and keep it full of flavour. From{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#1A1A1A]/70 hover:text-[#4955f5] font-semibold transition-colors">rich curries</Link>{' '}
                and aromatic{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#1A1A1A]/70 hover:text-[#4955f5] font-semibold transition-colors">biryanis</Link>{' '}
                to sizzling{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#1A1A1A]/70 hover:text-[#4955f5] font-semibold transition-colors">tandoori grills</Link>{' '}
                and comforting vegetarian dishes, the menu reflects the true diversity of Indian home-style cooking.
              </p>
              <p>
                Whether you are visiting for a casual meal, a family dinner, or a special occasion, Chopras Indian Restaurant offers a warm and welcoming atmosphere where food is served with care and consistency. It has become a trusted destination for{' '}
                <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#1A1A1A]/70 hover:text-[#4955f5] font-semibold transition-colors">authentic Indian food in The Hague</Link>,{' '}
                loved by locals, tourists, and the Indian community in the Netherlands.
              </p>

              {/* Pull-out closing statement */}
              <div className="mt-10 rounded-[1.5rem] bg-[#F4F5F9] p-6 md:p-8 border border-black/[0.03] shadow-sm">
                <p className="font-body text-[#1B2B5E]/70 text-sm">This is not adapted Indian food. It is not simplified for taste.</p>
                <p className="font-heading text-[#1B2B5E] text-xl italic font-semibold mt-2 leading-relaxed">
                  It is the original experience — bold, aromatic, and rooted in generations of Indian culinary tradition.
                </p>
              </div>
            </div>

            {/* Right — feature cards */}
            <TasteOfIndiaFeatures
              features={[
                {
                  icon: '🍛',
                  title: 'Authentic Recipes',
                  desc: 'Every dish follows traditional North Indian home recipes — unchanged and uncompromised.',
                  href: `${base}/menu`,
                },
                {
                  icon: '🌿',
                  title: 'Fresh Daily',
                  desc: 'Spices are ground fresh every morning. Ingredients are sourced and prepared daily.',
                  href: `${base}/vegan-menu`,
                },
                {
                  icon: '✅',
                  title: '100% Halal',
                  desc: 'Every meat dish on the menu is fully halal certified — not selected items.',
                  href: `${base}/halal-menu`,
                },
                {
                  icon: '🏆',
                  title: 'Highly Rated',
                  desc: '4.8★ on Google · 1000+ reviews · Tripadvisor Excellent — Den Haag\'s most trusted Indian restaurant.',
                  href: `${base}/blog/best-indian-restaurant-den-haag`,
                },
              ]}
            />

          </div>
        </div>
      </section>
      {/* 1c  -  Best Dishes */}
      <section className="py-24 px-5 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0000B3]/20 bg-[#0000B3]/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-medium mb-4">
                <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
                Our Signatures
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1B2B5E] leading-tight">
                Best Dishes
              </h2>
            </div>
            <Link
              href={`${base}/menu`}
              className="group inline-flex items-center gap-2 rounded-full border border-[#1B2B5E]/20 bg-white px-6 py-3 text-[#1B2B5E] text-sm font-semibold uppercase tracking-widest hover:bg-[#1B2B5E] hover:text-white transition-all duration-300"
            >
              Full Menu
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M2.5 7H11.5M11.5 7L7 2.5M11.5 7L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Marquee track */}
          <div className="relative w-full overflow-hidden pb-8 mt-8">
            <div className="flex w-max animate-[signature-marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
              {[...SIGNATURE_DISHES, ...SIGNATURE_DISHES].map((dish, i) => (
                <Link href={`${base}${dish.link}`} key={i} className="group relative block w-[280px] md:w-[320px] aspect-[3/4] rounded-[2rem] overflow-hidden mx-4 shadow-sm hover:shadow-xl ring-1 ring-black/5 transition-all duration-500 flex-shrink-0">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover brightness-50 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/90 via-[#1B2B5E]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[10px] text-white/70 uppercase tracking-[0.2em] font-semibold mb-2">Chef&apos;s Special</p>
                      <h3 className="font-heading text-2xl md:text-3xl text-white font-bold leading-tight">{dish.name}</h3>
                      {dish.sideImage && (
                        <div className="mt-4 flex items-center gap-3">
                          <span className="text-white/80 text-xs italic">Served with</span>
                          <div className="flex items-center gap-2 bg-white/10 rounded-full pl-1 pr-3 py-1 backdrop-blur-sm border border-white/20">
                            <Image src={dish.sideImage} alt={dish.sideName || ''} width={24} height={24} className="rounded-full object-cover w-6 h-6 border border-white/50" />
                            <span className="text-xs text-white font-medium">{dish.sideName}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <style>{`
              @keyframes signature-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* 1d  -  Ratings and Social Proof */}
      {/* <section className="py-20 px-6 md:px-16 bg-[#F7F8FC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
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
              <p className="font-body text-[#666]">800+ verified reviews</p>
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
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? '143 Gerechten, 13 Categorieën, Één Consistente Standaard'
              : '143 Dishes, 13 Categories, One Consistent Standard'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-6">
            {isNl ? (
              <>
                <p>
                  Het volledige menu van Chopras Indian Restaurant in Den Haag telt 143 gerechten verdeeld over 13 categorieën. Noord-Indiase curries. Streetfood.{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">Biryani Den Haag</Link>.
                  {' '}Tandoori. Brood vers uit de kleioven. Een volledig{' '}
                  <Link href={`${base}/vegan-menu`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">veganistisch menu</Link>{' '}
                  met soya chaap en dal makhani. Een kindermenu met milde gerechten en een verrassingscadeau. En een volledig{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">Indo-Chinees menu Den Haag</Link>{' '}
                  dat moeilijk te vinden is in Den Haag.
                </p>
                <p>
                  Elk gerecht in alle 13 categorieën komt uit dezelfde keuken op Leyweg 986. Dezelfde specerijen elke ochtend vers gemalen. Dezelfde{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">400-graden tandoor</Link>{' '}
                  die uren voor de service aangestoken wordt. Dezelfde halal-certificering die elk vleesgerecht op het menu dekt, niet alleen geselecteerde items. Of je nu de{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">butter chicken Den Haag</Link>{' '}
                  bestelt die meer vijfsterrenrecensies heeft verzameld dan welk ander gerecht ook, of de soya chaap die sceptici bij de eerste hap overtuigt: de keukennorm verandert nooit.
                </p>
                <p>
                  Voor groepen biedt het volledige{' '}
                  <Link href={`${base}/indian-buffet-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">Indiaas buffet Den Haag</Link>{' '}
                  alle categorieën in één service, geschikt voor evenementen van 10 tot 200 gasten. De privézaal op Leyweg 986 biedt ruimte aan 25 tot 80 gasten voor{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">Indiaas bruiloftscatering Den Haag</Link>,{' '}
                  zakelijke diners en Diwali-vieringen. Dezelfde keuken. Dezelfde standaard. Geen evenementspecifieke shortcuts.
                </p>
                <p>
                  Verken het{' '}
                  <Link href={`${base}/menu`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">volledige menu van 143 gerechten</Link>{' '}
                  of{' '}
                  <Link href={`${base}/contact`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">reserveer een tafel op Leyweg 986</Link>{' '}
                  om te ontdekken waarom Den Haag steeds terugkomt naar Chopras Indian Restaurant. Open dinsdag tot en met zondag, 16:30 tot 22:30.
                </p>
              </>
            ) : (
              <>
                <p>
                  The full menu at Chopras Indian Restaurant in Den Haag runs to 143 dishes across 13 categories. North Indian curries. Street food.{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">Biryani Den Haag</Link>.
                  {' '}Tandoori. Breads fresh from the clay oven. A complete{' '}
                  <Link href={`${base}/vegan-menu`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">vegan menu</Link>{' '}
                  with soya chaap and dal makhani. A dedicated kids menu with mild dishes and a surprise gift. And a complete{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">Indo Chinese menu Den Haag</Link>{' '}
                  that is hard to find elsewhere in The Hague.
                </p>
                <p>
                  Every dish across all 13 categories comes from the same kitchen at Leyweg 986 in Den Haag. The same spices ground fresh every morning. The same{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">400-degree tandoor</Link>{' '}
                  fired up hours before service. The same halal certification that covers every meat dish on the menu, not selected items. Whether you order the{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">butter chicken Den Haag</Link>{' '}
                  that has earned more five-star mentions than any other dish in the kitchen, or the soya chaap that converts first-timers at the first bite, the standard does not change.
                </p>
                <p>
                  For groups, the full{' '}
                  <Link href={`${base}/indian-buffet-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">Indian buffet Den Haag</Link>{' '}
                  covers all 13 categories in a single service, suitable for events from 10 to 200 guests. The private hall at Leyweg 986 accommodates 25 to 80 guests for{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">Indian wedding catering Den Haag</Link>,{' '}
                  corporate dinners, and Diwali celebrations. Same kitchen. Same standard. No event-specific shortcuts.
                </p>
                <p>
                  Explore the{' '}
                  <Link href={`${base}/menu`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">full 143-dish menu</Link>{' '}
                  or{' '}
                  <Link href={`${base}/contact`} className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-[#4955f5] font-semibold">reserve a table at Leyweg 986</Link>{' '}
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
      <MeetTheFounder />

      {/* 6  -  Why Chopras */}
      {/* <WhySection locale={locale} /> */}

      {/* 7  -  Catering Banner */}
      <CateringBanner locale={locale} />

      {/* 8  -  Reviews */}
      <ReviewsSection locale={locale} />

      {/* 8a  -  About Chopras (AI and voice search optimized) */}
      <section className="bg-white py-24 px-6 md:px-16 relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[#0000B3]/[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0000B3]/20 bg-[#0000B3]/5 mb-6"> */}
            {/* <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" /> */}
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-xs font-bold uppercase tracking-widest">Our Story</span> */}
            {/* </span> */}
            <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-[2.5rem] text-[#0000B3] leading-tight">
              {isNl ? 'Over Chopras Indian Restaurant Den Haag' : 'About Chopras Indian Restaurant Den Haag'}
            </h2>
          </div>

          <div className="about-chopras-section flex flex-col gap-8 md:gap-10">
            {/* GEO block - self-contained answer for Google AI Overviews, ChatGPT, and Perplexity citation */}
            <div className="bg-[#FAFAFA] rounded-3xl p-8 md:p-12 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="font-heading font-medium text-2xl md:text-3xl text-[#0000B3] mb-6">
                {isNl ? 'Wat is het beste Indiase restaurant in Den Haag?' : 'Looking for the Best Indian Restaurant in Den Haag?'}
              </h3>
              {isNl ? (
                <p className="font-body text-[#1A1A1A]/80 text-lg leading-relaxed font-normal">
                  Chopras Indian Restaurant op Leyweg 986, 2545 GW Den Haag, is een van de sterkst beoordeelde halal Indiase restaurants in Den Haag, met 4,9 sterren van 800+ geverifieerde Google-beoordelingen, 8,7 op TheFork en de beoordeling Uitstekend op Tripadvisor. Opgericht door Arun Chopra in 2023, serveert Chopras authentieke Noord-Indiase gerechten zoals{' '}
                  <Link href={`${base}/biryani-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">biryani Den Haag</Link>,
                  {' '}butter chicken, tandoori, dal makhani en chaat, bereid met dagelijks vers gemalen specerijen uit India. Het volledig{' '}
                  <Link href={`${base}/halal-menu`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">halal gecertificeerd menu</Link>{' '}
                  telt 143 gerechten in 13 categorieën. Open van dinsdag tot en met zondag van 16:30 tot 22:30.
                </p>
              ) : (
                <p className="font-body text-[#1A1A1A]/80 text-lg leading-relaxed font-normal">
                  Chopras Indian Restaurant at Leyweg 986, 2545 GW Den Haag, is one of the strongest-rated Indian restaurants in Den Haag and The Hague, with 4.9 stars from 800+ verified Google reviews, 8.7 on TheFork, and an Excellent rating on Tripadvisor. Founded by Arun Chopra in 2023, Chopras serves authentic North Indian cuisine including{' '}
                  <Link href={`${base}/biryani-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">biryani Den Haag</Link>,
                  {' '}butter chicken, tandoori, dal makhani, and chaat, using spices ground fresh daily from India. The entire{' '}
                  <Link href={`${base}/halal-menu`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">halal-certified menu</Link>{' '}
                  covers 143 dishes across 13 categories. Open Tuesday to Sunday, 16:30 to 22:30.
                </p>
              )}
            </div>

            <div className="font-body text-[#1A1A1A]/80 text-lg leading-relaxed space-y-6 px-4 md:px-8">
              {isNl ? (
                <p>
                  Chopras Indian Restaurant is een authentiek Indiaas restaurant op Leyweg 986, 2545 GW Den Haag, Nederland. Opgericht in 2023 door Arun Chopra, serveert Chopras Indian Restaurant authentiek Noord-Indiaas eten in Den Haag, Indiaas straatvoedsel, <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">Indo-Chinese gerechten</Link>, en een volledig halal en <Link href={`${base}/vegan-menu`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">vegetarisch en veganistisch menu</Link>.
                </p>
              ) : (
                <p>
                  Chopras Indian Restaurant is an authentic Indian restaurant located at Leyweg 986, 2545 GW Den Haag, Netherlands. Established in 2023 by founder Arun Chopra, Chopras Indian Restaurant serves authentic North Indian cuisine, Indian street food, <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">Indo Chinese dishes</Link>, and a full halal and <Link href={`${base}/vegan-menu`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">vegetarian and vegan menu</Link>.
                </p>
              )}
              {isNl ? (
                <p>
                  Chopras Indian Restaurant heeft 4,9 sterren op Google met 800+ beoordelingen en 8,7 op TheFork, waarmee het het hoogst beoordeelde Indiaas restaurant in Den Haag is. Het restaurant is volledig halal gecertificeerd en biedt uitgebreide <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">vegetarische Indiaas eten Den Haag</Link> opties naast het volledige vleesmenu.
                </p>
              ) : (
                <p>
                  Chopras Indian Restaurant is rated 4.9 stars on Google with 800+ reviews and 8.7 on TheFork, making it the highest rated Indian restaurant in Den Haag and The Hague. The restaurant is fully halal certified and offers extensive <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">vegetarian Indian food Den Haag</Link> options alongside its full meat menu.
                </p>
              )}
              {isNl ? (
                <p>
                  Naast eten in het restaurant, <Link href={`${base}/indian-takeaway-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">afhalen</Link> en <Link href={`${base}/indian-food-delivery-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">bezorging</Link>, biedt Chopras Indian Restaurant een <Link href={`${base}/feestzaal-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">te huren privezaal in Den Haag</Link>, geschikt voor bruiloften, verjaardagen, bedrijfsfeesten, Diwali-diners en alle besloten bijeenkomsten. <Link href={`${base}/catering`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">Indiaas cateringdiensten</Link> zijn beschikbaar in Den Haag en omliggende gebieden waaronder Delft, Rijswijk en Zoetermeer.
                </p>
              ) : (
                <p>
                  In addition to dine-in, <Link href={`${base}/indian-takeaway-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">takeaway</Link>, and <Link href={`${base}/indian-food-delivery-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">delivery</Link>, Chopras Indian Restaurant offers a <Link href={`${base}/feestzaal-den-haag`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">private event hall for hire in Den Haag</Link>, suitable for weddings, birthday parties, corporate events, Diwali dinners, and all private gatherings. <Link href={`${base}/catering`} className="font-medium text-[#1A1A1A] hover:text-[#0000B3] transition-colors">Indian catering services</Link> are available across Den Haag and surrounding areas including Delft, Rijswijk, and Zoetermeer.
                </p>
              )}
              {isNl ? (
                <p className="pt-6 border-t border-black/5 text-[#1A1A1A]/90 font-medium">
                  Openingstijden Chopras Indian Restaurant: dinsdag tot en met zondag, 16:30 tot 22:30. Gesloten op maandag. Reserveringen kunnen worden gemaakt via de website of door te bellen naar +31 6 30645930.
                </p>
              ) : (
                <p className="pt-6 border-t border-black/5 text-[#1A1A1A]/90 font-medium">
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
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
              <span className="text-white text-xs font-medium uppercase tracking-widest">• FAQ •</span>
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
