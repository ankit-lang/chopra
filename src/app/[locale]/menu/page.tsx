import type { Metadata } from 'next'
import Link from 'next/link'
import { Info } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import MenuPageClient from '@/components/sections/MenuPageClient'
import MenuHeroSection from '@/components/sections/MenuHeroSection'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { menuCategories, menuItems } from '@/lib/menu-data'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { getLocalizedUrl } from '@/lib/utils'
import { getMenuSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Restaurant Menu Den Haag | Chopras Indian Restaurant',
    nl: 'Indiaas Restaurant Menu Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian restaurant menu Den Haag at Chopras Indian Restaurant. 143 dishes including curries, tandoori and biryani. Halal certified. Order online.',
    nl: 'Indiaas restaurant menu Den Haag bij Chopras Indian Restaurant. 143 gerechten waaronder curry, tandoori en biryani. Halal gecertificeerd. Bestel online.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'menu'),
      languages: {
        en: getLocalizedUrl('en', 'menu'),
        nl: getLocalizedUrl('nl', 'menu'),
        'x-default': getLocalizedUrl('en', 'menu'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'menu'),
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

const menuFaqsEn = [
  {
    question: 'Is the Chopras Indian Restaurant menu in Den Haag fully halal?',
    answer: 'Yes. Every meat dish on the Chopras Indian Restaurant menu is halal certified. The entire kitchen operates on halal-certified ingredients from halal-certified suppliers. There is no non-halal meat on the premises, which means there is no risk of cross-contamination. Chopras serves Den Haag, Rijswijk, Zoetermeer, and the wider South Holland area with a complete halal-certified Indian menu.',
  },
  {
    question: 'Does Chopras Indian Restaurant have vegetarian options on the menu?',
    answer: 'Yes. More than a third of the 143 dishes on the Chopras Indian Restaurant menu are vegetarian. Options include dal makhani, paneer tikka, soya chaap, aloo gobi, vegetable biryani, and a full chaat section. Vegan dishes are labelled separately. Chopras Indian Restaurant Den Haag is the best destination for vegetarian Indian food in The Hague.',
  },
  {
    question: 'What are the most popular dishes at Chopras Indian Restaurant Den Haag?',
    answer: 'The most popular dishes at Chopras Indian Restaurant Den Haag include butter chicken, mutton rogan josh, chicken biryani, garlic naan from the tandoor clay oven, and the chaat street food selection. The Indo Chinese dishes, including chilli chicken and Hakka noodles, are exclusive to Chopras and unavailable at any other restaurant in Den Haag.',
  },
  {
    question: 'Can I order from the Chopras Indian Restaurant menu online for delivery in Den Haag?',
    answer: 'Yes. The Chopras Indian Restaurant menu is available for online ordering and delivery in Den Haag via Thuisbezorgd and Uber Eats. You can also collect your order directly from Leyweg 986, 2545 GW Den Haag. Orders are accepted Tuesday to Sunday from 16:30 to 22:30.',
  },
  {
    question: 'What bread options does Chopras Indian Restaurant serve in Den Haag?',
    answer: 'Chopras Indian Restaurant Den Haag serves plain naan, garlic naan, butter naan, Peshwari naan, and roti - all baked fresh in a 400-degree Celsius tandoor clay oven. The tandoor temperature produces the blistered crust and charred edges that no conventional oven can replicate. All breads are baked to order at Leyweg 986, open Tuesday to Sunday from 16:30.',
  },
  {
    question: 'Does Chopras Indian Restaurant Den Haag serve alcohol?',
    answer: 'No. Chopras Indian Restaurant Den Haag is fully halal certified and does not serve or store any alcohol on the premises. The drinks menu includes mango lassi, sweet lassi, rose lassi made from fresh yogurt, and soft drinks. This applies to both dine-in guests at Leyweg 986 and to all event catering. Open Tuesday to Sunday from 16:30 to 22:30.',
  },
]

const menuFaqsNl = [
  {
    question: 'Is het menu van Chopras Indian Restaurant in Den Haag volledig halal?',
    answer: 'Ja. Elk vleesgericht op het menu van Chopras Indian Restaurant is halal gecertificeerd. De gehele keuken werkt uitsluitend met halal gecertificeerde ingredienten van halal gecertificeerde leveranciers. Er is geen niet-halal vlees aanwezig op het terrein, waardoor er geen risico op kruisbesmetting bestaat. Chopras serveert Den Haag, Rijswijk, Zoetermeer en de bredere regio Zuid-Holland met een volledig halal gecertificeerd Indiaas menu.',
  },
  {
    question: 'Heeft Chopras Indian Restaurant vegetarische opties op het menu?',
    answer: 'Ja. Meer dan een derde van de 143 gerechten op het Chopras Indian Restaurant-menu is vegetarisch. Opties zijn onder andere dal makhani, paneer tikka, soya chaap, aloo gobi, vegetarische biryani en een volledig chaat-menu. Veganistische gerechten zijn apart gemarkeerd. Chopras Indian Restaurant Den Haag is de beste bestemming voor vegetarisch Indiaas eten in Den Haag.',
  },
  {
    question: 'Wat zijn de populairste gerechten bij Chopras Indian Restaurant Den Haag?',
    answer: 'De populairste gerechten bij Chopras Indian Restaurant Den Haag zijn butter chicken, mutton rogan josh, kip biryani, knoflooknaan uit de tandoorkleioven en de chaat street food-sectie. De Indo-Chinese gerechten, waaronder chilli chicken en Hakka noodles, zijn exclusief bij Chopras en moeilijk te vinden in Den Haag.',
  },
  {
    question: 'Kan ik online bestellen bij Chopras Indian Restaurant voor bezorging in Den Haag?',
    answer: 'Ja. Het menu van Chopras Indian Restaurant is beschikbaar voor online bestellen en bezorging in Den Haag via Thuisbezorgd en Uber Eats. U kunt uw bestelling ook ophalen op Leyweg 986, 2545 GW Den Haag. Bestellingen worden aangenomen van dinsdag tot zondag van 16:30 tot 22:30.',
  },
  {
    question: 'Welke broodopties serveert Chopras Indian Restaurant in Den Haag?',
    answer: 'Chopras Indian Restaurant Den Haag serveert gewone naan, knoflooknaan, boternaan, Peshwari naan en roti - allemaal vers gebakken in een tandoor kleistenen oven van 400 graden Celsius. Die temperatuur zorgt voor de blaarkorst en geblakerde randjes die geen gewone oven kan reproduceren. Al het brood wordt op bestelling gebakken op Leyweg 986, geopend van dinsdag tot zondag vanaf 16:30.',
  },
  {
    question: 'Serveert Chopras Indian Restaurant Den Haag alcohol?',
    answer: 'Nee. Chopras Indian Restaurant Den Haag is volledig halal gecertificeerd en serveert geen alcohol en bewaart ook geen alcohol op het terrein. Het drankenmenu bevat mango lassi, zoete lassi, rozenwater lassi gemaakt van verse yoghurt en frisdranken. Dit geldt zowel voor gasten die ter plaatse eten op Leyweg 986 als voor alle evenementencatering. Geopend van dinsdag tot zondag van 16:30 tot 22:30.',
  },
]

export default function LocaleMenuPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const menuSections = menuCategories.map((category) => ({
    name: category.label,
    items: menuItems
      .filter((item) => item.category === category.id)
      .map((item) => ({ 
        name: item.name, 
        // Select description based on the active locale
        description: isNl && item.descriptionNl ? item.descriptionNl : item.description, 
        price: item.price 
      })),
  }))

  const statPills = [`${menuItems.length} Dishes`, `${menuCategories.length} Categories`, '100% Halal', 'Vegetarian Options', 'Fresh Daily']

  const faqs = isNl ? menuFaqsNl : menuFaqsEn

  return (
    <>
      <JsonLd data={getMenuSchema(locale, menuSections)} />
      <JsonLd data={getFaqPageSchema(faqs)} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: tr.common.nav.menu, item: getLocalizedUrl(locale, 'menu') },
      ])} />

      {/* HERO  -  scroll-scrubbed butter chicken animation */}
      <MenuHeroSection locale={locale} />

      {/* STAT PILLS */}
      <div
        className="py-6 px-6"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
      >
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-7xl mx-auto">
          {statPills.map((stat) => (
            <span
              key={stat}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-white text-sm"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* INTERACTIVE MENU */}
      <MenuPageClient />

      {/* SEO COPY — MENU OVERVIEW */}
      <section className="bg-[#F7F8FC] py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">

          {/* GEO BLOCK — self-contained paragraph for AI citation */}
          <div className="mb-14">
            <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6">
              {isNl
                ? 'Wat staat er op het menu van Chopras Indian Restaurant Den Haag?'
                : 'What Is on the Menu at Chopras Indian Restaurant Den Haag?'}
            </h2>
            <p className="text-[#3A3A4A] text-base leading-relaxed">
              {isNl
                ? "Chopras Indian Restaurant Den Haag serveert 143 gerechten verdeeld over 13 categorieën op Leyweg 986, 2545 GW Den Haag. Het menu omvat Noord-Indiase curry's, tandoorigerechten uit een kleoven van 400 graden Celsius, biryani, Indiaas street food, chaat, naan, dal makhani en Indo-Chinees eten dat moeilijk te vinden is in Den Haag. Elk vleesgericht is halal gecertificeerd. Vegetarische en veganistische opties zijn duidelijk aangegeven. Specerijen worden rechtstreeks uit India betrokken en elke ochtend vers gemalen. Geopend van dinsdag tot zondag van 16:30 tot 22:30."
                : 'Chopras Indian Restaurant Den Haag serves 143 dishes across 13 categories at Leyweg 986, 2545 GW Den Haag. The menu covers North Indian curries, tandoori dishes from a 400-degree Celsius clay oven, biryani, Indian street food, chaat, naan, dal makhani, and exclusive Indo Chinese dishes unavailable anywhere else in The Hague. Every meat dish is halal certified. Vegetarian and vegan options are clearly labelled throughout. Spices are sourced directly from India and ground fresh each morning. Open Tuesday to Sunday, 16:30 to 22:30.'}
            </p>
          </div>

          {/* CATEGORY HIGHLIGHTS — all 13 categories */}
          <div className="space-y-10">

            {/* 1. STARTERS AND STREET FOOD */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Indiase starters en street food' : 'Indian Starters and Street Food'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  <Link href={`${base}/pani-puri-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Pani puri</Link>,{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">papdi chaat, dahi puri en aloo tikki</Link>{' '}
                  bereid zoals ze worden gegeten aan de straatkraampjes in Delhi en Mumbai. Met de juiste chutneys, de juiste texturen en de balans van zuur, pittig en zoet die echte chaat definieert. Onion bhaji, samosa en een gemengd chaat-bord ronden de starters-sectie af. Dit is het gedeelte van het menu dat gasten keer op keer terugbrengt.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  <Link href={`${base}/pani-puri-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Pani puri</Link>,{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">papdi chaat, dahi puri, and aloo tikki</Link>{' '}
                  prepared as they are eaten at roadside stalls in Delhi and Mumbai. With the right chutneys, the right textures, and the balance of sour, spicy, and sweet that defines real chaat. Onion bhaji, samosa, and a mixed chaat platter complete the starters section. This is the part of the menu that brings guests back.
                </p>
              )}
            </div>

            {/* 2. SOUPS */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Indiase soepen voor het begin van de maaltijd' : 'Indian Soups to Begin the Meal'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Vier soepopties staan op het Indiaas restaurant menu Den Haag bij Chopras. Tomatensoep en linzensoep zijn Noord-Indiase keukenstapels, warm en direct. Groente{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Manchow soep</Link>{' '}
                  gaat het Indo-Chinese terrein op met zijn dikke donkere bouillon en krokante noedels bovenop. Kippensoep voor wie iets lichtere wil voordat de hoofdgerechten komen. Een solide begin voor een volledige maaltijd.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Four soups on the Indian restaurant menu Den Haag at Chopras. Tomato soup and lentil soup are North Indian kitchen staples, warm and direct. Vegetable{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Manchow soup</Link>{' '}
                  crosses into Indo Chinese territory with its thick dark broth and crispy noodles on top. Chicken soup for a lighter start before the mains. A solid opening to a full meal.
                </p>
              )}
            </div>

            {/* 3. TANDOORI */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Tandoorigerechten uit een kleistenen oven van 400 graden' : 'Tandoori Dishes from a 400-Degree Clay Oven'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  De tandoor op Leyweg 986 bereikt 400 graden Celsius. Op die temperatuur krijgt{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori kip</Link>{' '}
                  een echte rokerige korst en krijgt{' '}
                  <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">naan</Link>{' '}
                  de geblakerde randjes die geen gewone oven kan produceren. Seekh kebab, kip tikka, malai tikka en het Chopras non-veg plateau. De temperatuur is niet aanpasbaar. Die discipline is precies wat het verschil maakt.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  The tandoor at Leyweg 986 reaches 400 degrees Celsius. At that temperature,{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori chicken</Link>{' '}
                  develops a proper smoky crust and{' '}
                  <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">naan</Link>{' '}
                  gets the charred edges no conventional oven can produce. Seekh kebab, chicken tikka, malai tikka, and the Chopras non-veg platter. The temperature is not adjustable. That discipline is exactly what makes the difference.
                </p>
              )}
            </div>

            {/* 4. CHICKEN CURRIES */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? "Kip curry's - van klassiek tot regionaal" : 'Chicken Curries - From the Classic to the Regional'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Butter chicken</Link>{' '}
                  is het handelsmerk. Maar de kip curry-sectie bij Chopras gaat verder. Chicken tikka masala, chicken karahi, chicken korma en murgh kali mirch. Elk gebouwd op een andere masalabasis, een andere techniek, een ander smaakprofiel. De specerijen worden elke ochtend vers gemalen van hele specerijen die rechtstreeks uit India komen. Dat maakt het verschil op elk bord.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Butter chicken</Link>{' '}
                  is the signature. But the chicken curry section runs deeper. Chicken tikka masala, chicken karahi, chicken korma, and murgh kali mirch. Each built on a different masala base, a different technique, a different flavour profile. Spices ground fresh that morning from whole spices sourced directly from India. That shows up in every dish on the plate.
                </p>
              )}
            </div>

            {/* 5. LAMB AND MUTTON */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Lam en schapenvlees - Noord-Indiase curries met diepgang' : 'Lamb and Mutton - North Indian Curries with Depth'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Mutton rogan josh</Link>{' '}
                  is het hoofdgerecht. Halal lam in een diepe Kasjmirische specerijenjus, langzaam gegaard. Maar er zijn ook keemagerechten, lam korma en lam karahi. Elk stuk vlees is halal gecertificeerd - elke leverancier houdt volledige halalcertificering. Voor gasten die het verschil kennen tussen een goede rogan josh en een gehaaste, is dit gedeelte het bewijs.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Mutton rogan josh</Link>{' '}
                  is the headline. Halal lamb in a deep Kashmiri spice gravy, slow-cooked. There is also keema, lamb korma, and lamb karahi. Every piece of meat is{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal certified</Link>{' '}
                  - every supplier holds full halal certification. For guests who know the difference between a proper rogan josh and a rushed one, this section is the proof.
                </p>
              )}
            </div>

            {/* 6. VEGETARIAN CURRIES */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? "Vegetarische Noord-Indiase curry's" : 'Vegetarian North Indian Curries'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  De vegetarische curry-sectie laat de diepgang van de Noord-Indiase keuken zien.{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Dal makhani</Link>,{' '}
                  paneer tikka masala, chana masala, aloo gobi, bhindi masala en baingan bharta. Elk gerecht is opgebouwd op een basis van vers gemalen masala. Geen kant-en-klare sauzen. Elk gerecht heeft zijn eigen kruidenprofiel, zijn eigen techniek en zijn eigen afwerking.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  The vegetarian curry section shows the depth of the North Indian kitchen.{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Dal makhani</Link>,{' '}
                  paneer tikka masala, chana masala, aloo gobi, bhindi masala, and baingan bharta. Each built on a fresh-ground masala base. No pre-made sauces. Every dish has its own spice profile, its own technique, and its own finishing process.
                </p>
              )}
            </div>

            {/* 7. BIRYANI */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Biryani bereid op de traditionele dum-manier' : 'Biryani Prepared the Proper Dum Way'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  De{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani bij Chopras</Link>{' '}
                  wordt bereid met saffraan basmatirijst en op de traditionele dum-manier in lagen aangebracht voordat de pan wordt afgesloten. Kip biryani, lam biryani en groente biryani. Dit is echte dum biryani. Geen rijst en curry door elkaar gemengd en biryani genoemd.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  The{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani at Chopras</Link>{' '}
                  is cooked with saffron basmati rice and layered properly before the pot is sealed. Chicken biryani, lamb biryani, and vegetable biryani. This is dum biryani prepared the right way. Not rice and curry mixed together and called biryani.
                </p>
              )}
            </div>

            {/* 8. INDO CHINESE */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Indo-Chinees - exclusief in Den Haag' : 'Indo Chinese - Exclusive to Den Haag'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Chopras Indian Restaurant is een van de weinige restaurants in Den Haag dat authentiek{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo-Chinees eten</Link>{' '}
                  serveert naast een volledig Noord-Indiaas menu. Chilli chicken, chilli paneer, Hakka noodles en Manchow soep. Een keuken die is ontstaan in de Chinese gemeenschappen van Kolkata en Mumbai. Moeilijk elders in Den Haag te vinden.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Chopras Indian Restaurant serves authentic{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indo Chinese food</Link>{' '}
                  alongside a full North Indian menu. Chilli chicken, chilli paneer, Hakka noodles, and Manchow soup. A cuisine born in the Chinese communities of Kolkata and Mumbai. Hard to find elsewhere in The Hague.
                </p>
              )}
            </div>

            {/* 9. VEGAN DISHES */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Veganistische en vegetarische opties' : 'Vegan and Vegetarian Options'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Meer dan een derde van het menu is vegetarisch.{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Dal makhani</Link>,{' '}
                  paneer tikka,{' '}
                  <Link href={`${base}/soya-chaap-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">soya chaap</Link>,{' '}
                  aloo gobi en vegetarische biryani. Veganistische opties zijn apart gemarkeerd. Dit is geen symbolisch vegetarisch aanbod. Het is een volledige categorie met eigen diepgang en variatie. Bekijk alle{' '}
                  <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">veganistische menuopties bij Chopras</Link>.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  More than a third of the menu is vegetarian.{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Dal makhani</Link>,{' '}
                  paneer tikka,{' '}
                  <Link href={`${base}/soya-chaap-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">soya chaap</Link>,{' '}
                  aloo gobi, and vegetable biryani. Vegan options labelled separately. Not a token vegetarian section. A full category with its own depth and variety. Explore all{' '}
                  <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegan menu options at Chopras</Link>.
                </p>
              )}
            </div>

            {/* 10. BREADS */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Indiaas brood vers gebakken in de tandoor' : 'Indian Breads Baked Fresh in the Tandoor'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Naan bij Chopras</Link>{' '}
                  wordt gebakken op 400 graden Celsius in de kleistenen oven. Die temperatuur geeft knoflooknaan zijn blaarkorst en boternaan zijn geblakerde randjes. Gewone naan, knoflooknaan, boternaan, Peshwari naan en roti. Geen gewone oven komt hier in de buurt. Het brood is geen bijzaak - het maakt deel uit van dezelfde discipline als elk ander gerecht op het menu.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Naan at Chopras</Link>{' '}
                  is baked at 400 degrees Celsius in the clay oven. That temperature gives garlic naan its blistered crust and butter naan its charred edges. Plain naan, garlic naan, butter naan, Peshwari naan, and roti. No conventional oven gets close to this. The bread section is not an afterthought - it is part of the same discipline as every other dish on the menu.
                </p>
              )}
            </div>

            {/* 11. RICE, SIDES AND THALI */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Rijst, bijgerechten en de thali' : 'Rice, Sides, and the Thali'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Basmatirijst, jeera rijst, raita en het volledige thalibord. De thali combineert curry, brood, rijst, dal en een bijgerecht in een enkele geordende maaltijd. Voor gasten die meerdere gerechten willen proeven zonder volledige porties te bestellen, is de thali de duidelijkste manier om de breedte van het{' '}
                  <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas restaurant menu Den Haag</Link>{' '}
                  bij Chopras te begrijpen. Geopend van dinsdag tot zondag vanaf 16:30 op Leyweg 986.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Basmati rice, jeera rice, raita, and the full thali plate. The thali brings together curry, bread, rice, dal, and a side in a single ordered meal. For guests who want to try several dishes without committing to full portions, the thali is the clearest way to understand the breadth of the{' '}
                  <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian restaurant menu Den Haag</Link>{' '}
                  at Chopras. Open Tuesday to Sunday from 16:30 at Leyweg 986.
                </p>
              )}
            </div>

            {/* 12. DESSERTS */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Indiase desserts - elke dag vers bereid' : 'Indian Desserts - Made Fresh Every Day'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  De desserts zijn waar veel Indiase restaurants de weg van de minste weerstand kiezen. Gulab jamun uit een pakje. Kulfi van een commerciele leverancier. Kheer die dagen geleden is bereid. Bij{' '}
                  <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant Den Haag</Link>{' '}
                  worden de desserts elke dag vers gemaakt. Gulab jamun, kheer en kulfi. Dezelfde discipline die door het hoofdmenu loopt, geldt ook voor het dessert. Geen shortcuts aan het einde van de maaltijd.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Desserts are where a lot of Indian restaurants cut corners. Gulab jamun from a mix. Kulfi from a commercial supplier. Kheer prepared days ago. At{' '}
                  <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant Den Haag</Link>,{' '}
                  the desserts are made fresh every day. Gulab jamun, kheer, and kulfi. The same discipline that runs through the main menu applies here too. No shortcuts at the end of the meal.
                </p>
              )}
            </div>

            {/* 13. DRINKS AND LASSI */}
            <div>
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">
                {isNl ? 'Dranken en lassi - vers, koud en alcoholvrij' : 'Drinks and Lassi - Fresh, Cold, and Alcohol-Free'}
              </h3>
              {isNl ? (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Chopras Indian Restaurant is volledig halal gecertificeerd, wat betekent dat er geen alcohol wordt geserveerd of bewaard op het terrein. Het drankenmenu biedt mango lassi, zoete lassi, rozenwater lassi en frisdranken. De lassi wordt gemaakt van verse yoghurt. Voor gasten die op zoek zijn naar een{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal gecertificeerde eetervaring in Den Haag</Link>{' '}
                  waarbij elk aspect van de maaltijd aan dezelfde standaard voldoet, is het drankenmenu de definitieve bevestiging dat Chopras op geen enkel detail compromissen sluit.
                </p>
              ) : (
                <p className="text-[#3A3A4A] text-base leading-relaxed">
                  Chopras Indian Restaurant is fully halal certified, which means no alcohol is served or stored on the premises. The drinks menu includes mango lassi, sweet lassi, rose lassi, and soft drinks. Lassi is made from fresh yogurt. For guests seeking a{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal-certified dining experience in Den Haag</Link>{' '}
                  where every part of the meal meets the same standard, the drinks menu is the final confirmation that Chopras does not compromise on any detail.
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* THE SPICE AND HALAL STANDARD */}
      <section
        className="py-16 md:py-24 px-6 md:px-16"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-3xl md:text-4xl text-white mb-6">
            {isNl ? 'Elke specerij vers gemalen. Elk gerecht halal gecertificeerd.' : 'Every Spice Ground Fresh. Every Dish Halal Certified.'}
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-6">
            {isNl
              ? "De meeste restaurants gebruiken voorgemengde kruidenmixen van leveranciers. Bij Chopras worden de masalas elke ochtend vers gemalen van hele specerijen die rechtstreeks uit India worden betrokken. De vluchtige aromatische olien in komijn, kardemom en koriander beginnen binnen enkele uren na het malen te verdampen. Dit is het verschil tussen Indiaas eten dat levend smaakt en Indiaas eten dat verpakt smaakt."
              : 'Most restaurants use pre-mixed spice blends from suppliers. At Chopras, the masalas are ground fresh every morning from whole spices sourced directly from India. The volatile aromatic oils in cumin, cardamom, and coriander begin evaporating within hours of grinding. That is the difference between Indian food that tastes alive and Indian food that tastes packaged.'}
          </p>
          <p className="text-white/80 text-base leading-relaxed">
            {isNl
              ? 'De halal-certificering bij Chopras is geen menu-optie. Het is de gehele keuken. Elk gerecht is halal. Elke leverancier is halal gecertificeerd. Er is geen niet-halal vlees aanwezig op het terrein. Geen risico op kruisbesmetting, want er is niets om kruisbesmetting mee te veroorzaken.'
              : 'The halal certification at Chopras is not a menu option. It is the entire kitchen. Every dish is halal. Every supplier is halal certified. There is no non-halal meat on the premises. No cross-contamination risk because there is nothing to cross-contaminate with.'}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/halal-food-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bekijk ons halal menu' : 'View Our Halal Menu'}
            </Link>
            <Link
              href={`${base}/vegan-menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Veganistische opties' : 'Vegan Options'}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-[#F7F8FC] py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3] text-center">
            {isNl
              ? 'Veelgestelde vragen over het Chopras-menu'
              : 'Frequently Asked Questions About the Chopras Menu'}
          </h2>
          <FaqAccordion faqs={faqs} locale={locale} />
        </div>
      </section>

      {/* INTERNAL LINKS SECTION */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-12 text-center">
            Explore Our Specialities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Signature Dish</p>
              <p className="text-[#1B2B5E] font-semibold text-lg">Learn about our biryani in Den Haag</p>
            </Link>
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Fan Favorite</p>
              <p className="text-[#1B2B5E] font-semibold text-lg">The story behind our butter chicken</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Tandoori Specials</p>
              <p className="text-[#1B2B5E] font-semibold text-lg">Our tandoori specialities Den Haag</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Vegetarian Delight</p>
              <p className="text-[#1B2B5E] font-semibold text-lg">Dal makhani Den Haag</p>
            </Link>
            <Link href={`${base}/chaat-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Street Food</p>
              <p className="text-[#1B2B5E] font-semibold text-lg">Indian street food and chaat Den Haag</p>
            </Link>
            <Link href={`${base}/halal-food-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Halal Certified</p>
              <p className="text-[#1B2B5E] font-semibold text-lg">Our full halal Indian menu Den Haag</p>
            </Link>
            <Link href={`${base}/mutton-rogan-josh-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Lamb Curry</p>
              <p className="text-[#1B2B5E] font-semibold text-lg">Mutton rogan josh Den Haag - our Kashmiri lamb curry</p>
            </Link>
          </div>
          <div className="mt-12 pt-12 border-t border-gray-200 space-y-4">
            <p className="text-[#1A1A1A] text-base leading-relaxed">
              Looking for <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarian Indian food Den Haag</Link>? Or interested in <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian catering in Den Haag for your event</Link>?
            </p>
            <p className="text-[#1A1A1A] text-base leading-relaxed">
              Visit <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant - best Indian restaurant in Den Haag</Link> or <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">make a reservation at Chopras Indian Restaurant</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section
        className="py-20 md:py-28 text-center px-6 md:px-16"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-6">
            READY TO ORDER?
          </p>
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-4">
            Reserve Your Table at Chopras
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10">
            Open Tuesday to Sunday · 16:30 to 22:30 · Leyweg 986, Den Haag
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Reserve a Table
            </Link>
            <a
              href="https://www.thuisbezorgd.nl/menu/chopras-indian-street-food"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Order on Thuisbezorgd
            </a>
          </div>
        </div>
      </section>

      {/* ALLERGEN NOTICE */}
      <div className="bg-[#F7F8FC] py-12 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] rounded-r-xl p-6 flex gap-4 items-start">
            <Info className="text-[#D4AF37] w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#1A1A1A] text-sm">{tr.menu.allergenTitle}</p>
              <p className="text-[#1A1A1A]/70 text-sm mt-1 leading-relaxed">{tr.menu.allergenText}</p>
              <p className="text-[#D4AF37] text-xs font-medium mt-3 uppercase tracking-widest">
                {tr.menu.allergenRequest}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
