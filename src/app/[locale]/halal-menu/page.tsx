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

const halalItems = menuItems.filter(item => item.dietary.includes('halal') && !item.dietary.includes('veg') && !item.dietary.includes('vegan'))
const halalCategoryIds = Array.from(new Set(halalItems.map(item => item.category)))
const halalCategories = menuCategories.filter(cat => halalCategoryIds.includes(cat.id))

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Is alle vlees op het menu halal gecertificeerd?',
    answer: 'Ja. Elke vleesleverancier van Chopras Indian Restaurant is halal gecertificeerd. Kip, lam en schapen komen van gecertificeerde leveranciers. Er zijn geen uitzonderingen en geen gedeelde keukenruimtes met niet-halal vlees. De volledige keuken aan Leyweg 986 is halal.',
  },
  {
    question: 'Welke gerechten zijn het populairst op het halal menu?',
    answer: 'Butter chicken, lamb rogan josh en chicken tikka masala zijn de meest bestelde gerechten bij Chopras. Voor meer avontuurlijk eten: mutton seekh kebab en fish tikka uit de tandoor-oven. Alle 143 gerechten zijn halal, van curry tot streetfood tot naan.',
  },
  {
    question: 'Kunnen vegetarische gasten samen met halal-eters eten bij Chopras?',
    answer: 'Volledig. Dal makhani, chana masala, palak paneer en vegetable biryani zijn allemaal beschikbaar zonder compromissen. Ze worden bereid in dezelfde halal gecertificeerde keuken. Chopras biedt ook een uitgebreid veganistisch menu.',
  },
  {
    question: 'Is het halal menu ook beschikbaar voor bezorging en halal catering?',
    answer: 'Ja. Bestellen kan via Thuisbezorgd of Uber Eats. Alle halal certificering geldt ook voor bezorgbestellingen. Voor catering en evenementen zoals nikah-recepties of bruiloften gebruikt Chopras dezelfde gecertificeerde keuken en leveranciers.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'Is all meat on the menu certified halal?',
    answer: 'Yes. Every meat supplier at Chopras Indian Restaurant is certified halal. Chicken, lamb and mutton come from certified suppliers. There are no exceptions and no shared kitchen spaces with non-halal meat. The complete kitchen at Leyweg 986 is halal.',
  },
  {
    question: 'Which dishes are most popular on the halal menu?',
    answer: 'Butter chicken, lamb rogan josh and chicken tikka masala are the most ordered dishes at Chopras. For more adventurous eating: mutton seekh kebab and fish tikka from the tandoor oven. All 143 dishes are halal, from curry to street food to naan.',
  },
  {
    question: 'Can vegetarian guests eat alongside halal diners at Chopras?',
    answer: 'Completely. Dal makhani, chana masala, palak paneer and vegetable biryani are all available without compromise. They are prepared in the same halal certified kitchen. Chopras also offers a full vegan menu.',
  },
  {
    question: 'Is the halal menu available for delivery and halal catering?',
    answer: 'Yes. Order via Thuisbezorgd or Uber Eats. All halal certification remains in effect for delivery orders. For catering and events such as nikah receptions or weddings, Chopras uses the same certified kitchen and suppliers.',
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Halal Menu Den Haag | Chopras Indian Restaurant',
    nl: 'Halal Menu Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Halal menu Den Haag at Chopras Indian Restaurant. All meat halal certified. No alcohol on premises. 4.9 stars. Dine with confidence at Leyweg 986.',
    nl: 'Halal menu Den Haag bij Chopras Indian Restaurant. Volledig halal gecertificeerd. Geen alcohol. 4,9 sterren. Eet met vertrouwen op Leyweg 986.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'halal-menu'),
      languages: {
        en: getLocalizedUrl('en', 'halal-menu'),
        nl: getLocalizedUrl('nl', 'halal-menu'),
        'x-default': getLocalizedUrl('en', 'halal-menu'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'halal-menu'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag halal menu' }],
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

export default function HalalMenuPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const dishCategories = isNl
    ? [
        { title: 'Kipgerechten', items: 'Butter chicken, chicken tikka, tandoori kip, chicken karahi, chicken biryani' },
        { title: 'Lamgerechten', items: 'Rogan josh, seekh kebab, lamb karahi, lamb biryani, keema matar' },
        { title: 'Vegetarisch', items: 'Dal makhani, chana masala, palak paneer, aloo gobi, paneer tikka' },
        { title: 'Tandoor Specialiteiten', items: 'Tandoori vis, fish tikka, chicken tikka, seekh kebab, naan uit de kleioven' },
        { title: 'Biryani', items: 'Chicken biryani, lamb biryani, veg biryani, special biryani met saffraan basmatirijst' },
        { title: 'Streetfood', items: 'Pani puri, papdi chaat, aloo tikki, samosa, dahi puri' },
      ]
    : [
        { title: 'Chicken Dishes', items: 'Butter chicken, chicken tikka, tandoori chicken, chicken karahi, chicken biryani' },
        { title: 'Lamb Dishes', items: 'Rogan josh, seekh kebab, lamb karahi, lamb biryani, keema matar' },
        { title: 'Vegetarian', items: 'Dal makhani, chana masala, palak paneer, aloo gobi, paneer tikka' },
        { title: 'Tandoor Specialties', items: 'Tandoori fish, fish tikka, chicken tikka, seekh kebab, naan from the clay oven' },
        { title: 'Biryani', items: 'Chicken biryani, lamb biryani, veg biryani, special biryani with saffron basmati rice' },
        { title: 'Street Food', items: 'Pani puri, papdi chaat, aloo tikki, samosa, dahi puri' },
      ]

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'halal-menu'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Halal Menu', item: getLocalizedUrl(locale, 'halal-menu') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDietFoodEstablishmentSchema(locale, ['Halal', 'Halal Indian', 'North Indian'], 'halal-menu')} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl ? 'Halal Menu Den Haag - Volledig Gecertificeerd' : 'Halal Menu Den Haag - Fully Certified'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl mb-8">
            {isNl
              ? 'Alle 143 gerechten zijn halal. Geen opties, geen uitzonderingen. De volledige keuken van Chopras Indian Restaurant aan Leyweg 986 is halal gecertificeerd.'
              : 'All 143 dishes are halal. No options, no exceptions. The complete kitchen at Chopras Indian Restaurant at Leyweg 986 is halal certified.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Wat is het halal menu van Chopras Indian Restaurant Den Haag?'
              : 'What is the halal menu at Chopras Indian Restaurant Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant Den Haag aan <strong>Leyweg 986</strong> serveert een volledig halal
              gecertificeerd menu van 143 gerechten. Elke vleesleverancier is halal gecertificeerd. Kip, lam en
              schapen worden verwerkt in een uitsluitend halal keuken. Van{' '}
              <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                biryani
              </Link>{' '}
              tot{' '}
              <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                tandoori
              </Link>
              , van curry tot streetfood, elk gerecht is halal. Beoordeeld met 4.9 sterren door 800+ Google-bezoekers.
              Open dinsdag tot en met zondag van 16:30 tot 22:30.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant Den Haag at <strong>Leyweg 986</strong> serves a fully halal certified menu
              of 143 dishes. Every meat supplier is certified halal. Chicken, lamb and mutton are processed in a
              dedicated dedicated halal kitchen. From{' '}
              <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                biryani
              </Link>{' '}
              to{' '}
              <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                tandoori
              </Link>
              , from curry to street food, every dish is halal. Rated 4.9 stars by 800+ Google reviewers. Open
              Tuesday to Sunday from 16:30 to 22:30.
            </p>
          )}
        </div>
      </section>

      {/* HALAL DISH GRID */}
      <section className="bg-[#F7F8FC]">
        <MenuPageClient categories={halalCategories} items={halalItems} />
      </section>

      {/* WHY HALAL CERTIFICATION IS DIFFERENT */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Waarom de halal certificering bij Chopras verder gaat'
              : 'Why halal certification at Chopras goes further'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Veel restaurants bieden &quot;halal opties&quot; aan. Chopras Indian Restaurant werkt anders.
                  De volledige keuken aan{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Leyweg 986 Den Haag
                  </Link>{' '}
                  is halal gecertificeerd. Geen gedeelde snijplanken, geen gemengde opslag, geen halal op aanvraag.
                </p>
                <p>
                  Elke vleesleverancier moet gecertificeerd halal zijn voordat Chopras hen accepteert. Dit is het
                  verschil tussen een restaurant dat halal als optie behandelt en een restaurant waar halal de
                  standaard is voor de volledige operatie. Moslimgezinnen in Den Haag, Rijswijk en Zoetermeer
                  kunnen naar{' '}
                  <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Chopras Indian Restaurant
                  </Link>{' '}
                  komen zonder vragen te hoeven stellen.
                </p>
                <p>
                  De specerijen worden elke ochtend vers gemalen van hele specerijen uit India. Dit is de reden
                  dat{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    butter chicken
                  </Link>{' '}
                  bij Chopras anders smaakt dan overal elders in Den Haag. Versgemalen specerijen bevatten aromatische
                  olieen die binnen uren vervliegen na het malen. Pre-gemengde blends van leveranciers bevatten die
                  olieen niet meer.
                </p>
              </>
            ) : (
              <>
                <p>
                  Many restaurants offer &quot;halal options&quot;. Chopras Indian Restaurant operates differently.
                  The complete kitchen at{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Leyweg 986 Den Haag
                  </Link>{' '}
                  is halal certified. No shared chopping boards, no mixed storage, no halal on request.
                </p>
                <p>
                  Every meat supplier must be certified halal before Chopras accepts them. This is the difference
                  between a restaurant that treats halal as an option and a restaurant where halal is the standard
                  for the complete operation. Muslim families in Den Haag, Rijswijk and Zoetermeer can visit{' '}
                  <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Chopras Indian Restaurant
                  </Link>{' '}
                  without needing to ask questions.
                </p>
                <p>
                  The spices are ground fresh every morning from whole spices sourced from India. This is the
                  reason that{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    butter chicken
                  </Link>{' '}
                  at Chopras tastes different from anywhere else in Den Haag. Freshly ground spices contain aromatic
                  oils that evaporate within hours of grinding. Pre-mixed supplier blends no longer contain those oils.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* DISH CATEGORIES */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Elke categorie op het halal menu' : 'Every category on the halal menu'}
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            {isNl ? (
              <>
                Chopras serveert 143 gerechten verdeeld over 13 categorieen. Hieronder staat elke hoofdcategorie
                met voorbeelden. Het{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  volledige menu
                </Link>{' '}
                toont elk gerecht met naam en beschrijving.
              </>
            ) : (
              <>
                Chopras serves 143 dishes across 13 categories. Below is every main category with examples. The{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  full menu
                </Link>{' '}
                shows every dish by name and description.
              </>
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dishCategories.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border-l-4 border-[#D4AF37]">
                <h3 className="font-vibes text-3xl text-[#C7A348] mb-4">{item.title}</h3>
                <p className="font-body text-[#1A1A1A] text-base leading-relaxed">{item.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TANDOOR SECTION */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Halal tandoori: de kleioven op 400 graden'
              : 'Halal tandoori: the clay oven at 400 degrees'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  De tandoor-kleioven bij Chopras bereikt 400 graden Celsius. Die temperatuur is niet instelbaar -
                  het is precies de temperatuur die naan zijn geblakerde rand geeft en chicken tikka zijn rokerige
                  korst. Geen gewone oven kan dit nabootsen. Elk stuk vlees dat de oven in gaat is halal
                  gecertificeerd, van leverancier tot bord.
                </p>
                <p>
                  Bekijk de{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    tandoori gerechten pagina
                  </Link>{' '}
                  voor alle gerechten uit de kleioven. Hetzelfde halal-certificeringsniveau geldt ook voor
                  langzaam gegaarde gerechten zoals{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    dal makhani
                  </Link>
                  , die 8 uur op laag vuur wordt bereid. De integriteit van de keuken verandert niet per
                  bereidingswijze.
                </p>
              </>
            ) : (
              <>
                <p>
                  The tandoor clay oven at Chopras reaches 400 degrees Celsius. That temperature is not
                  adjustable - it is precisely the temperature that gives naan its charred edge and chicken tikka
                  its smoky crust. No conventional oven can replicate this. Every piece of meat that enters that
                  oven is halal certified, from supplier to plate.
                </p>
                <p>
                  See the{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    tandoori dishes page
                  </Link>{' '}
                  for all clay oven dishes. The same halal certification standard applies to slow-cooked dishes
                  such as{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    dal makhani
                  </Link>
                  , which is prepared for 8 hours on a low flame. The kitchen integrity does not change by
                  cooking method.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* HALAL CATERING */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Halal catering voor evenementen in Den Haag'
              : 'Halal catering for events in Den Haag'}
          </h2>
          <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  De halal certificering van Chopras geldt ook voor alle catering buiten het restaurant. Nikah-recepties,
                  bruiloften, verjaardagen en bedrijfsevenementen - dezelfde keuken, dezelfde leveranciers, dezelfde
                  standaard. Chopras heeft een privezaal aan Leyweg 986 voor 25 tot 80 gasten.
                </p>
                <p>
                  Meer weten over{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    halal bruiloftscatering in Den Haag
                  </Link>
                  ? Of bekijk de{' '}
                  <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    feestzaal voor groepen van 25 tot 80 personen
                  </Link>
                  . Dezelfde gecertificeerde keuken. Dezelfde verse specerijen. Geen verschil in kwaliteit tussen
                  restaurant en catering.
                </p>
              </>
            ) : (
              <>
                <p>
                  The halal certification at Chopras applies to all catering outside the restaurant as well. Nikah
                  receptions, weddings, birthday parties and corporate events - the same kitchen, the same suppliers,
                  the same standard. Chopras has a private hall at Leyweg 986 for 25 to 80 guests.
                </p>
                <p>
                  Want to know more about{' '}
                  <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    halal wedding catering in Den Haag
                  </Link>
                  ? Or see the{' '}
                  <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    venue for groups of 25 to 80 people
                  </Link>
                  . The same certified kitchen. The same fresh spices. No difference in quality between restaurant
                  and catering.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* MIXED GROUPS: HALAL AND VEGAN */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Halal en vegetarisch in dezelfde ruimte'
              : 'Halal and vegetarian in the same room'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>
                  Niet elk gezelschap eet vlees. Chopras biedt een volledig{' '}
                  <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    veganistisch menu
                  </Link>{' '}
                  en brede vegetarische keuze naast het halal vleesmenu. Dal makhani, chana masala, palak paneer,
                  soya chaap en aloo tikki zijn allemaal beschikbaar. Ze worden in dezelfde halal gecertificeerde
                  keuken bereid zonder kruisbesmetting met vlees.
                </p>
                <p>
                  Dit betekent dat gemengde gezelschappen - halal-eters, vegetariers, veganisten - allemaal aan
                  dezelfde tafel kunnen zitten bij Chopras zonder dat iemand compromissen hoeft te sluiten. Lees
                  meer over het halal verhaal van Chopras in ons artikel over het{' '}
                  <Link href={`${base}/blog/halal-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    halal Indiaas restaurant in Den Haag
                  </Link>
                  .
                </p>
              </>
            ) : (
              <>
                <p>
                  Not every group eats meat. Chopras offers a full{' '}
                  <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    vegan menu
                  </Link>{' '}
                  and a broad vegetarian selection alongside the halal meat menu. Dal makhani, chana masala, palak
                  paneer, soya chaap and aloo tikki are all available. They are prepared in the same halal certified
                  kitchen without cross-contamination with meat.
                </p>
                <p>
                  This means mixed groups - halal diners, vegetarians, vegans - can all sit at the same table at
                  Chopras without anyone making compromises. Read more about the halal story at Chopras in our
                  article on the{' '}
                  <Link href={`${base}/blog/halal-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    halal Indian restaurant in Den Haag
                  </Link>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Veelgestelde vragen over het halal menu'
              : 'Frequently asked questions about the halal menu'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Eet met vertrouwen bij Chopras Indian Restaurant'
              : 'Dine with confidence at Chopras Indian Restaurant'}
          </h2>
          <p className="text-white/75 text-lg mb-8">
            {isNl
              ? 'Leyweg 986, 2545 GW Den Haag. Open dinsdag tot en met zondag van 16:30 tot 22:30. Reserveer een tafel of bekijk het volledige menu.'
              : 'Leyweg 986, 2545 GW Den Haag. Open Tuesday to Sunday from 16:30 to 22:30. Reserve a table or view the full menu.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
            <Link
              href={`${base}/indian-food-delivery-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bezorging' : 'Delivery'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
