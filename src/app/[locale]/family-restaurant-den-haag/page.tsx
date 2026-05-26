import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDietFoodEstablishmentSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'
import EmailLink from '@/components/ui/EmailLink'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Family Restaurant in Den Haag | Chopras Indian Restaurant',
    nl: 'Familierestaurant Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Family restaurant Den Haag. Chopras Indian Restaurant has a dedicated kids menu and generous portions. Authentic Indian food for all ages at Leyweg 986.',
    nl: 'Familierestaurant Den Haag bij Chopras Indian Restaurant. Kindermenu, halal gecertificeerd en milde opties. Leyweg 986. Reserveer een tafel vandaag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'family-restaurant-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'family-restaurant-den-haag'),
        nl: getLocalizedUrl('nl', 'family-restaurant-den-haag'),
        'x-default': getLocalizedUrl('en', 'family-restaurant-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'family-restaurant-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag family dining' }],
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
    question: 'Does Chopras Indian Restaurant Den Haag have a children\'s menu?',
    answer: 'Yes. Chopras has a dedicated kids menu with a surprise gift for children. The menu includes mild curries, garlic naan, biryani, and tandoori dishes prepared at a gentler spice level. Every item on the kids menu is halal certified.',
  },
  {
    question: 'Is Chopras Indian Restaurant suitable for children who do not like spicy food?',
    answer: 'Yes. Mild options at Chopras include butter chicken, plain naan, soft biryani rice, and vegetable dishes with no added chilli. The kitchen can adjust spice levels on request. The staff will guide you to the right dishes for young children.',
  },
  {
    question: 'Can I bring a pram or pushchair to Chopras Indian Restaurant?',
    answer: 'Yes. Chopras Indian Restaurant at Leyweg 986 in Den Haag is pram friendly and wheelchair accessible. Tables are spacious enough to accommodate a pram beside the seat. Families with young children visit regularly.',
  },
  {
    question: 'Is the food at Chopras Indian Restaurant fully halal for families who only eat halal?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat dish, every supplier, every dish on the menu. There is no non-halal meat on the premises, so there is no cross-contamination risk for families who require fully certified halal food.',
  },
  {
    question: 'Can I book a table for a family birthday at Chopras Indian Restaurant Den Haag?',
    answer: 'Yes. Chopras accepts bookings for family birthday celebrations and can accommodate groups. Contact the restaurant at info [at] chopras.nl or call +31 6 30645930. Chopras also provides birthday catering for events outside the restaurant.',
  },
]

const faqsNl = [
  {
    question: 'Heeft Chopras Indian Restaurant Den Haag een kindermenu?',
    answer: 'Ja. Chopras heeft een speciaal kindermenu met een verrassingscadeau voor kinderen. Het menu bevat milde curries, knoflooknaan, biryani en tandoorischotels op een zachter kruidenniveau. Elk gerecht op het kindermenu is halal gecertificeerd.',
  },
  {
    question: 'Is Chopras Indian Restaurant geschikt voor kinderen die niet van pittig eten houden?',
    answer: 'Ja. Milde opties bij Chopras zijn onder andere butter chicken, gewone naan, zachte biryanirijst en groentegerechten zonder toegevoegde chili. De keuken past het kruidenniveau op verzoek aan. Het personeel helpt u de juiste gerechten voor jonge kinderen te kiezen.',
  },
  {
    question: 'Kan ik een kinderwagen meenemen naar Chopras Indian Restaurant?',
    answer: 'Ja. Chopras Indian Restaurant op Leyweg 986 in Den Haag is kinderwagenvriendelijk en rolstoeltoegankelijk. Tafels zijn ruim genoeg voor een kinderwagen naast de stoel. Families met jonge kinderen bezoeken het restaurant regelmatig.',
  },
  {
    question: 'Is het eten bij Chopras Indian Restaurant volledig halal voor families die alleen halal eten?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elk vleesgerecht, elke leverancier, elk gerecht op het menu. Er is geen niet-halal vlees op de locatie, dus er is geen risico op kruisbesmetting voor families die volledig gecertificeerd halal voedsel vereisen.',
  },
  {
    question: 'Kan ik een tafel reserveren voor een familieverjaardag bij Chopras Indian Restaurant Den Haag?',
    answer: 'Ja. Chopras accepteert reserveringen voor familiefeestjes en kan groepen accommoderen. Neem contact op via info [at] chopras.nl of bel +31 6 30645930. Chopras verzorgt ook verjaardagscatering voor evenementen buiten het restaurant.',
  },
]

const linkClass = 'text-[#D4AF37] hover:text-[#e8c84a] font-semibold'

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
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • DISCOVER · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            {isNl ? 'Familierestaurant in Den Haag' : 'Family Restaurant in Den Haag'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {isNl
              ? 'Een kindermenu met verrassing, milde en pittige opties, volledig halal gecertificeerd en ruimte voor iedereen aan tafel. Op Leyweg 986 in Den Haag.'
              : 'A dedicated kids menu with a surprise gift, mild to spicy options, fully halal certified, and space for every family member at the table. At Leyweg 986 in Den Haag.'}
          </p>
        </div>
      </section>

      {/* Section 1: Main intro */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Het Familierestaurant Den Haag Waar Families Terugkomen' : 'The Family Restaurant Den Haag Families Come Back To'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Bij de meeste restaurants die beweren gezinsvriendelijk te zijn, is er altijd iemand aan tafel die niets kan vinden om te eten. Niet bij Chopras Indian Restaurant. Op <strong>Leyweg 986</strong> in Den Haag is elk gerecht voor elke gast bedoeld, van het kind dat alleen boterzachte naan wil tot de grootouder die de volle smaak van een langzaam gegaarde curry vraagt. Bekijk het{' '}
                <Link href={`${base}/menu`} className={linkClass}>volledige Indiaas menu</Link>{' '}
                om te zien hoe breed het aanbod loopt.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Het bewijs zit in de beoordelingen. 4,9 sterren van meer dan 800 gasten op Google. Families vormen een groot deel van die beoordelingen, met een gemeenschappelijke boodschap: kinderen aten goed, ouders ontspanden, en iedereen vertrok verzadigd. Dat is geen toeval. Het is het resultaat van een keuken die elke ochtend versgemalen specerijen gebruikt, rechtstreeks afkomstig uit India, en een menu van 143 gerechten dat iedereen aan tafel bedient.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras ligt in de Leyweg-wijk van Den Haag, waar de grootste Hindoestaanse gemeenschap van Nederland woont. Dit zijn gasten die het verschil weten tussen echt Indiaas eten en een imitatie. Ze blijven terugkomen. Bekijk ook waarom Chopras als het{' '}
                <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className={linkClass}>beste Indiaas restaurant Den Haag</Link>{' '}
                wordt beschouwd.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                At most restaurants that call themselves family-friendly, there is always one person at the table who cannot find anything to eat. Not here. Chopras Indian Restaurant at <strong>Leyweg 986</strong> in Den Haag is built around the fact that every seat at the table matters, from the child who only wants buttery naan to the grandparent who wants the full, deep flavour of a slow-cooked curry. Browse the{' '}
                <Link href={`${base}/menu`} className={linkClass}>full Indian restaurant menu</Link>{' '}
                to see just how wide the range runs.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                The proof is in the reviews. 4.9 stars from more than 800 guests on Google. Families make up a significant share of those reviews, and a common thread runs through them: children ate well, parents relaxed, and everyone left full. That is not an accident. It is the result of a kitchen that grinds its spices fresh every morning from whole spices sourced directly from India, and a 143-dish menu that serves everyone at the table.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras is located in the Leyweg neighbourhood of Den Haag, where the largest Hindustani community in the Netherlands lives. These guests know the difference between real Indian food and imitation. They keep coming back. See why Chopras is rated the{' '}
                <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className={linkClass}>best Indian restaurant Den Haag</Link>{' '}
                has to offer.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Kids menu */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat Kinderen Eten bij Chopras Indian Restaurant' : 'What Children Eat at Chopras Indian Restaurant'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Kinderen bij Chopras krijgen hun eigen speciaal kindermenu met een <strong>verrassingscadeau</strong>. Geen symbolisch gebaar. Een echt kindermenu ontworpen voor kinderen die niet van een volwassen bord willen eten. Milde{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className={linkClass}>butter chicken</Link>,{' '}
                knoflook<Link href={`${base}/naan-den-haag`} className={linkClass}>naan</Link>, zachte{' '}
                <Link href={`${base}/biryani-den-haag`} className={linkClass}>biryanirijst</Link>{' '}
                en <Link href={`${base}/tandoori-den-haag`} className={linkClass}>tandoorischotels</Link>{' '}
                op een zachter kruidenniveau. Dit is eten dat kinderen daadwerkelijk opeten.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Elk gerecht op het kindermenu is{' '}
                <Link href={`${base}/halal-food-den-haag`} className={linkClass}>halal gecertificeerd</Link>.{' '}
                Ouders die alleen halal eten weten precies wat dat betekent voor hun gezin. Geen risico op kruisbesmetting. Geen uitzonderingen op enig gerecht. De volledige keuken van Chopras werkt volgens een enkele halalstandaard bij elke dienst.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Indiase desserts sluiten het diner op de juiste manier af. Kheer, gulab jamun en ras malai zijn zoet, romig en ongelijk aan wat een kind eerder heeft geproefd. De reactie is bijna altijd hetzelfde: eerst verrassing, dan om meer vragen.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Children at Chopras get their own dedicated kids menu with a <strong>surprise gift</strong>. Not a token gesture. A real kids menu designed for children who do not want to eat from an adult plate. Mild{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className={linkClass}>butter chicken</Link>,{' '}
                garlic <Link href={`${base}/naan-den-haag`} className={linkClass}>naan</Link>, soft{' '}
                <Link href={`${base}/biryani-den-haag`} className={linkClass}>biryani rice</Link>,{' '}
                and <Link href={`${base}/tandoori-den-haag`} className={linkClass}>tandoori dishes</Link>{' '}
                prepared at a gentler spice level. This is food children actually eat.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Every dish on the kids menu is{' '}
                <Link href={`${base}/halal-food-den-haag`} className={linkClass}>halal certified</Link>.{' '}
                Parents who only eat halal know exactly what that means for their family. No cross-contamination risk. No exceptions on any dish. The entire Chopras kitchen operates to a single halal standard, every service.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Indian desserts close the meal the way desserts should. Kheer, gulab jamun, and ras malai are sweet, creamy, and unlike anything a child has tasted before. The reaction is almost always the same: first surprise, then asking for more.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Every seat at the table */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Elke Plek aan Tafel Heeft Iets' : 'Every Seat at the Table Has Something'}
          </h2>
          {isNl ? (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Sommige gezinnen hebben een vegetarier, een halal-gast, een pittiggevoelig kind en iemand die de heetste curry op de kaart wil. Dat is een gewoon gezin. Het menu van 143 gerechten bij Chopras kan dit allemaal aan. Het{' '}
                <Link href={`${base}/vegan-menu`} className={linkClass}>veganistische menu</Link>{' '}
                bevat gerechten zoals{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className={linkClass}>dal makhani</Link>{' '}
                en soya chaap, gerechten die geen bijzaak zijn maar volwaardig uitgewerkte onderdelen van de kaart.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Kruidenniveaus bij Chopras lopen van echt mild tot flink pittig. Het personeel begeleidt u altijd. Vraag welke gerechten geschikt zijn voor jonge kinderen. Vraag welke curries medium zijn. U krijgt een direct, eerlijk antwoord van iemand die de keuken kent.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Tafels op Leyweg 986 zijn ruim genoeg voor een kinderwagen naast de stoel. Het restaurant is rolstoeltoegankelijk. Met een jong gezin naar de tafel komen hoeft geen hindernisbaan te zijn. Dat is het hier niet.{' '}
                <Link href={`${base}/contact`} className={linkClass}>Reserveer uw familietafel</Link>{' '}
                direct online.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Some families contain a vegetarian, a halal-only guest, a spice-sensitive child, and someone who wants the hottest curry on the menu. That is a typical family. The 143-dish menu at Chopras handles all of it. The{' '}
                <Link href={`${base}/vegan-menu`} className={linkClass}>vegetarian and vegan menu</Link>{' '}
                covers dishes like{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className={linkClass}>dal makhani</Link>{' '}
                and soya chaap, dishes that are not afterthoughts but fully developed centrepieces in their own right.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Spice levels at Chopras run from genuinely mild to properly hot. The staff will always guide you. Ask which dishes work for younger children. Ask which curries are medium. You will get a direct, honest answer from someone who knows the kitchen.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Tables at Leyweg 986 are spacious enough for a pram beside the seat. The restaurant is wheelchair accessible. Getting to the table with a young family should not be an obstacle course. It is not, here.{' '}
                <Link href={`${base}/contact`} className={linkClass}>Reserve your family table</Link>{' '}
                online today.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Is Chopras Indian Restaurant Geschikt voor Gezinnen met Kinderen in Den Haag?'
              : 'Is Chopras Indian Restaurant Good for Families with Children in Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Ja. Chopras Indian Restaurant op Leyweg 986 in Den Haag is een uitstekende keuze voor gezinnen met kinderen. Het restaurant heeft een speciaal kindermenu met verrassingscadeau, milde opties waaronder{' '}
              <Link href={`${base}/butter-chicken-den-haag`} className={linkClass}>butter chicken</Link>{' '}
              en knoflooknaan, en een volledig halal gecertificeerde keuken zonder kruisbesmettingsrisico. Beoordeeld met 4,9 sterren door meer dan 800 Google-gasten. Geopend van dinsdag tot zondag vanaf 16:30. Rolstoeltoegankelijk en kinderwagenvriendelijk.{' '}
              <Link href={`${base}/contact`} className={linkClass}>Reserveer een tafel voor uw gezin</Link>{' '}
              of bekijk het{' '}
              <Link href={`${base}/menu`} className={linkClass}>volledige menu</Link>.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Yes. Chopras Indian Restaurant at Leyweg 986 in Den Haag is an excellent choice for families with children. The restaurant has a dedicated kids menu with a surprise gift, mild dish options including{' '}
              <Link href={`${base}/butter-chicken-den-haag`} className={linkClass}>butter chicken</Link>{' '}
              and garlic naan, and a fully halal-certified kitchen with zero cross-contamination risk. Rated 4.9 stars by more than 800 guests on Google. Open Tuesday to Sunday from 16:30. Wheelchair accessible and pram friendly.{' '}
              <Link href={`${base}/contact`} className={linkClass}>Reserve a family table</Link>{' '}
              or browse the{' '}
              <Link href={`${base}/menu`} className={linkClass}>full menu</Link>.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Ons Familierestaurant' : 'Frequently Asked Questions About Our Family Restaurant'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl ? 'Reserveer een Familietafel op Leyweg 986' : 'Reserve a Family Table at Leyweg 986'}
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {isNl ? (
              <>Chopras Indian Restaurant is open van dinsdag tot zondag, vanaf 16:30. Bel +31 6 30645930 of stuur een e-mail naar <EmailLink />.</>
            ) : (
              <>Chopras Indian Restaurant is open Tuesday to Sunday from 16:30. Call +31 6 30645930 or email <EmailLink /> to reserve your table.</>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Tafel Reserveren' : 'Reserve a Table'}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bekijk het Menu' : 'View the Menu'}
            </Link>
            <Link
              href={`${base}/indian-birthday-catering-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Verjaardagscatering' : 'Birthday Catering'}
            </Link>
          </div>
        </div>
      </section>

      {/* Dish links grid */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-8 leading-[1.3]">
            {isNl ? 'Populaire Gerechten voor het Hele Gezin' : 'Popular Dishes for the Whole Family'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-[#C7A348]/20 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Milde Curry' : 'Mild Curry'}</p>
              <p className="font-body text-[#1B2B5E] font-semibold text-lg">{isNl ? 'Butter Chicken - zacht en romig' : 'Butter Chicken - mild and creamy'}</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-[#C7A348]/20 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Tandoor Gegrild' : 'Tandoor Grilled'}</p>
              <p className="font-body text-[#1B2B5E] font-semibold text-lg">{isNl ? 'Tandoori - 400 graden kleioven' : 'Tandoori - 400 degree clay oven'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-[#C7A348]/20 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Rijstschotel' : 'Rice Dish'}</p>
              <p className="font-body text-[#1B2B5E] font-semibold text-lg">{isNl ? 'Biryani - saffraan basmatirijst' : 'Biryani - saffron basmati rice'}</p>
            </Link>
            <Link href={`${base}/naan-den-haag`} className="block p-6 bg-[#FFFAF5] rounded-lg border border-[#C7A348]/20 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Brood uit de Tandoor' : 'Bread from the Tandoor'}</p>
              <p className="font-body text-[#1B2B5E] font-semibold text-lg">{isNl ? 'Naan - recht uit de kleioven' : 'Naan - fresh from the clay oven'}</p>
            </Link>
          </div>
          <div className="mt-10 space-y-4">
            {isNl ? (
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Bekijk het{' '}
                <Link href={`${base}/menu`} className={linkClass}>volledige menu van Chopras Indian Restaurant</Link>{' '}
                met alle 143 gerechten verdeeld over 13 categorieen. Of{' '}
                <Link href={`${base}/contact`} className={linkClass}>reserveer een familietafel in Den Haag</Link>{' '}
                direct via onze contactpagina.
              </p>
            ) : (
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Browse the{' '}
                <Link href={`${base}/menu`} className={linkClass}>full Chopras Indian Restaurant menu</Link>{' '}
                with all 143 dishes across 13 categories. Or{' '}
                <Link href={`${base}/contact`} className={linkClass}>book a family table in Den Haag</Link>{' '}
                directly via our contact page.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
