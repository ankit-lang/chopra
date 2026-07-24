import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDietFoodEstablishmentSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const isNl = locale === 'nl'
  const title = isNl
    ? 'Familierestaurant Den Haag | Kindvriendelijk Indiaas Restaurant | Chopras'
    : 'Family Restaurant Den Haag | Child-Friendly Indian Restaurant | Chopras'
  const description = isNl
    ? 'Zoekt u een familierestaurant in Den Haag? Chopras Indian Restaurant op Leyweg 986 biedt ruim opgezette tafels, een speciaal kindermenu, milde gerechten en een speelse attentie voor kinderen. 4.9 sterren van 1100+ reviews. Reserveer online.'
    : 'Searching for a family restaurant in Den Haag? Chopras Indian Restaurant at Leyweg 986 features spacious seating, a dedicated kids menu, mild dish options, and a small gift for children. 4.9 stars from 1100+ reviews. Book online.'

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(locale, 'family-restaurant-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'family-restaurant-den-haag'),
        nl: getLocalizedUrl('nl', 'family-restaurant-den-haag'),
        'x-default': getLocalizedUrl('en', 'family-restaurant-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'family-restaurant-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Familierestaurant Den Haag Chopras Indian Restaurant' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/home-og.jpg'],
    },
  }
}

const faqsEn = [
  {
    question: 'Is Chopras Indian Restaurant suitable for families with young children in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag was designed with family dining in mind. We feature spacious seating layout where pushchairs and strollers fit comfortably, high chairs for toddlers, and a dedicated kids menu with mild, child-friendly Indian dishes. Every child ordering from the kids menu receives a small surprise gift.',
  },
  {
    question: 'What dishes on the menu are suitable for children who do not eat spicy food?',
    answer: 'Our menu includes several naturally mild options that are popular with children, including chicken korma, mild butter chicken, malai paneer tikka, sweet mango lassi, and freshly baked garlic or butter naan from the tandoor. You can also request any dish to be prepared with mild spice levels.',
  },
  {
    question: 'Does Chopras have a dedicated kids menu?',
    answer: 'Yes. Our kids menu features mild, portion-sized Indian dishes created specifically for younger guests, served with rice or bread. Every kids menu order includes a complimentary gift for the child.',
  },
  {
    question: 'Is the entire menu at Chopras halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is 100% halal certified. Every meat dish, every supplier, and every order comes from a fully halal-certified kitchen with zero cross-contamination risk.',
  },
  {
    question: 'Can Chopras accommodate large family groups and multi-generational celebrations?',
    answer: 'Yes. Our main dining room features flexible table arrangements for multi-generational family dinners, birthday celebrations, and family gatherings. For private family events of 25 to 80 guests, we also offer a dedicated private hall at Leyweg 986.',
  },
]

const faqsNl = [
  {
    question: 'Is Chopras Indian Restaurant geschikt voor gezinnen met jonge kinderen in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant op Leyweg 986, Den Haag is ontworpen met gezinnen in gedachten. Wij bieden ruime zitplaatsen waar kinderwagens gemakkelijk passen, kinderstoelen voor peuters en een speciaal kindermenu met milde, kindvriendelijke Indiase gerechten. Elk kind dat van het kindermenu bestelt, ontvangt een kleine verrassing.',
  },
  {
    question: 'Welke gerechten op de menukaart zijn geschikt voor kinderen die niet van scherp eten houden?',
    answer: 'Onze menukaart bevat verschillende natuurlijk milde opties die populair zijn bij kinderen, waaronder chicken korma, milde butter chicken, malai paneer tikka, zoete mango lassi en vers gebakken naan uit de tandoor. U kunt ook elk gerecht laten bereiden met een mild kruidenniveau.',
  },
  {
    question: 'Heeft Chopras een speciaal kindermenu?',
    answer: 'Ja. Ons kindermenu bevat milde Indiase gerechten in kinderporties, geserveerd met rijst of brood. Bij elke bestelling van het kindermenu krijgt het kind een gratis cadeautje.',
  },
  {
    question: 'Is het gehele menu bij Chopras halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is 100% halal gecertificeerd. Elk vleesgerecht, elke leverancier en elke bestelling komt uit een volledig halal gecertificeerde keuken zonder risico op kruisbesmetting.',
  },
  {
    question: 'Kan Chopras grote familiegroepen en feesten ontvangen?',
    answer: 'Ja. Onze eetzaal biedt flexibele tafelopstellingen voor familiediners met meerdere generaties, verjaardagen en familiefeesten. Voor besloten familiebijeenkomsten van 25 tot 80 gasten beschikken wij ook over een eigen privézaal op Leyweg 986.',
  },
]

export default function FamilyRestaurantPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'family-restaurant-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Familierestaurant Den Haag' : 'Family Restaurant Den Haag', item: getLocalizedUrl(locale, 'family-restaurant-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Halal', 'Halal Indian', 'Vegetarian Indian', 'North Indian'], 'family-restaurant')} />

      {/* Hero */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              FAMILY DINING · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl
              ? 'Familierestaurant Den Haag - Kindvriendelijk Indiaas Eten bij Chopras'
              : 'Family Restaurant Den Haag - Child-Friendly Indian Dining at Chopras'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? 'Ruime zitplaatsen, milde kindergerechten, gratis verrassing voor elk kind en 100% halal gecertificeerd. Leyweg 986, Den Haag. 4.9 sterren uit 1100+ reviews.'
              : 'Spacious seating, mild options for kids, complimentary gift for every child, and 100% halal certified. Leyweg 986, Den Haag. Rated 4.9 stars from 1100+ reviews.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Copy */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Het Best Beoordeelde Familierestaurant in Den Haag'
              : 'The Best-Rated Family Restaurant in Den Haag'}
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              {isNl
                ? 'Uit eten gaan met het hele gezin hoort ontspannen en plezierig te zijn. Bij Chopras Indian Restaurant op Leyweg 986 in Den Haag begrijpen wij dat een goed familierestaurant meer nodig heeft dan alleen lekker eten. Het vraagt om een gastvrije sfeer, voldoende ruimte tussen de tafels, milde opties voor jonge eters en snelle, vriendelijke bediening.'
                : 'Dining out with the family should be a relaxed and enjoyable experience. At Chopras Indian Restaurant, Leyweg 986 in Den Haag, we understand that a great family restaurant requires more than delicious food. It calls for a welcoming atmosphere, generous space between tables, mild options for younger diners, and attentive, friendly service.'}
            </p>
            <p>
              {isNl
                ? 'Onze eetzaal is ruim opgezet zodat kinderwagens gemakkelijk bij de tafel geplaatst kunnen worden. Wij hebben kinderstoelen beschikbaar voor peuters en ons team zorgt er altijd voor dat gezinnen zich vanaf het eerste moment thuis voelen.'
                : 'Our dining space is arranged with generous spacing so pushchairs and buggies fit comfortably alongside your table. High chairs are available for toddlers, and our staff ensures families feel genuinely welcome from the moment they arrive.'}
            </p>
          </div>
        </div>
      </section>

      {/* Proof Grid */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Waarom Gezinnen Kiezen voor Chopras' : 'Why Families Choose Chopras'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="bg-white/10 rounded-xl p-6 border border-white/30">
              <p className="font-heading text-3xl text-white mb-3 leading-[1.3]">Kindermenu + Cadeau</p>
              <p className="font-body text-white/85 text-base leading-relaxed">
                {isNl
                  ? 'Milde kinderporties en bij elke kinderbestelling een leuk verrassingscadeautje.'
                  : 'Mild child-sized portions, plus a free surprise gift with every kids menu order.'}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/30">
              <p className="font-heading text-3xl text-white mb-3 leading-[1.3]">100% Halal</p>
              <p className="font-body text-white/85 text-base leading-relaxed">
                {isNl
                  ? 'Elk vleesgerecht is halal gecertificeerd uit een toegewijde schone keuken.'
                  : 'Every meat dish is halal certified from a dedicated clean kitchen.'}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/30">
              <p className="font-heading text-3xl text-white mb-3 leading-[1.3]">4.9 Sterren</p>
              <p className="font-body text-white/85 text-base leading-relaxed">
                {isNl
                  ? 'Over 1100+ geverifieerde reviews op Google met een 4.9 beoordeling.'
                  : 'Over 1100+ verified Google reviews with an outstanding 4.9 rating.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dishes for family */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Populaire Familiegerechten bij Chopras' : 'Popular Family Dishes at Chopras'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/butter-chicken-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Butter Chicken Den Haag
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                {isNl
                  ? 'Milde, romige tomaten-botersaus met malse halal kip. Favoriet bij zowel kinderen als volwassenen.'
                  : 'Mild, creamy tomato-butter sauce with tender halal chicken. A favourite for both children and adults.'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/biryani-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Biryani Den Haag
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                {isNl
                  ? 'Geurige saffraanrijst ideaal om te delen met de hele familie, geserveerd met milde raita.'
                  : 'Fragrant saffron rice ideal for family sharing, served with mild raita.'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/naan-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Tandoori Naan & Brood
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                {isNl
                  ? 'Vers gebakken knoflook- en boternaan uit onze 400-graden tandoor kleioven.'
                  : 'Freshly baked garlic and butter naan from our 400-degree tandoor clay oven.'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/dal-makhani-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Dal Makhani Den Haag
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                {isNl
                  ? 'Langzaam gegaarde zwarte linzen met boter en room. Rijk, mild en erg voedzaam.'
                  : 'Slow-cooked black lentils with butter and cream. Rich, mild, and highly nutritious.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over ons Familierestaurant' : 'Frequently Asked Questions About Our Family Restaurant'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Reserveer een Tafel voor Uw Gezin' : 'Reserve a Table for Your Family'}
          </h2>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {isNl
              ? 'Kom langs op Leyweg 986, Den Haag. Open van dinsdag tot en met zondag van 16:30 tot 22:30.'
              : 'Visit us at Leyweg 986, Den Haag. Open Tuesday to Sunday from 16:30 to 22:30.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
