import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDishPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Mutton Rogan Josh in Den Haag | Chopras Indian Restaurant',
    nl: 'Lamsvlees Rogan Josh in Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Authentic mutton rogan josh Den Haag at Chopras Indian Restaurant. Halal lamb in a deep Kashmiri spice gravy. A signature North Indian dish at Leyweg 986.',
    nl: 'Authentieke lamsvlees rogan josh Den Haag bij Chopras Indian Restaurant. Halal lam in Kasjmiri saus. Dagelijks gegaard op Leyweg 986, Den Haag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'mutton-rogan-josh-den-haag'),
      languages: { en: getLocalizedUrl('en', 'mutton-rogan-josh-den-haag'), nl: getLocalizedUrl('nl', 'mutton-rogan-josh-den-haag'), 'x-default': getLocalizedUrl('en', 'mutton-rogan-josh-den-haag') },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'mutton-rogan-josh-den-haag'),
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

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Wat is het verschil tussen rogan josh en andere lamscurrys?',
    answer: 'Rogan josh is Kasjmirisch. De saus is opgebouwd met yoghurt, Kasjmiri gedroogde rode chilipepers en venkel - niet room, niet generieke currypasta. De Kasjmiri chilipepers geven de dieprode kleur zonder extreme hitte. Venkel geeft het kenmerkende bloemige aroma dat de meeste lamscurrys in Den Haag volledig missen. Bij Chopras wordt elk ingrediënt gebruikt en bereid zoals het gerecht bedoeld is.',
  },
  {
    question: 'Is lamsvlees rogan josh erg pittig?',
    answer: 'Nee. Rogan josh krijgt zijn warmte van geroosterde specerijen en Kasjmiri chilipepers, die mild van hitte zijn. Het gerecht is diep aromatisch en rijk, niet heet. Als u een pittiger versie wilt, past onze keuken dit graag aan. Het origineel is bedoeld als toegankelijk - vol van smaak, zonder de hitte van een vindaloo.',
  },
  {
    question: 'Is de rogan josh bij Chopras halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elk vleesgerecht, inclusief de lamsvlees rogan josh, gebruikt halal-gecertificeerd lam. Elke leverancier is gecertificeerd. Er is geen risico op kruisbesmetting, want er is geen niet-halal vlees aanwezig in ons restaurant. Bekijk ons volledige halal menu voor alle details.',
  },
  {
    question: 'Kan ik lamsvlees rogan josh bestellen voor afhalen of bezorging in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant biedt Indiaas eten voor afhalen aan op Leyweg 986, evenals bezorging in Den Haag en omgeving. De rogan josh reist goed - de saus wordt iets dieper van smaak en het lam blijft mals.',
  },
  {
    question: 'Wat bestel ik bij lamsvlees rogan josh?',
    answer: 'Knoflook naan of boter naan uit onze klei tandoor oven is de klassieke combinatie. Het brood neemt de Kasjmirische saus volledig op. Gestoomde basmatirijst is een lichtere optie. U kunt ook een voorgerecht uit ons tandoori-aanbod toevoegen voor een compleet diner.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'What is the difference between rogan josh and other lamb curries?',
    answer: 'Rogan josh is Kashmiri. The sauce is built on yoghurt, Kashmiri dried red chillies, and fennel - not cream, not generic curry powder. The Kashmiri chillies give the deep red colour without extreme heat. Fennel gives the signature floral note that most lamb curries in Den Haag are missing entirely. At Chopras, every ingredient is sourced and prepared as the dish was designed to be.',
  },
  {
    question: 'Is mutton rogan josh very spicy?',
    answer: 'No. Rogan josh gets its warmth from roasted whole spices and Kashmiri chillies, which are mild in heat. The dish is deeply aromatic and rich, not hot. If you prefer a spicier version, our kitchen can adjust. The original is designed to be accessible - full of flavour without the heat of a vindaloo.',
  },
  {
    question: 'Is the rogan josh at Chopras halal certified?',
    answer: 'Yes. Chopras Indian Restaurant is fully halal certified. Every meat dish, including the mutton rogan josh, uses halal-certified lamb. Every supplier is certified. There is no cross-contamination risk because there is no non-halal meat anywhere on the premises. View our full halal menu for complete details.',
  },
  {
    question: 'Can I order mutton rogan josh for takeaway or delivery in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant offers Indian takeaway from Leyweg 986 as well as Indian food delivery across Den Haag and surrounding areas including Rijswijk and Delft. The rogan josh travels well - the sauce deepens slightly and the lamb stays tender.',
  },
  {
    question: 'What should I order alongside mutton rogan josh?',
    answer: 'Garlic naan or butter naan from our clay tandoor oven is the classic pairing. The bread is made to soak up the Kashmiri sauce completely. Steamed basmati rice is a lighter alternative. You can also add a starter from our tandoori selection to complete the meal.',
  },
]

export default function MuttonRoganJoshPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'mutton-rogan-josh-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Rogan Josh Den Haag' : 'Rogan Josh Den Haag', item: getLocalizedUrl(locale, 'mutton-rogan-josh-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Mutton Rogan Josh Den Haag', 'Lamsvlees Rogan Josh Den Haag', 'Authentic halal mutton rogan josh at Chopras Indian Restaurant Den Haag. Kashmiri lamb curry with whole spices ground fresh daily at Leyweg 986.', 'Authentieke halal lamsvlees rogan josh bij Chopras Indian Restaurant Den Haag. Kasjmirische lamsschotel met dagelijks vers gemalen specerijen op Leyweg 986.')} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl ? 'Lamsvlees Rogan Josh in Den Haag' : 'Mutton Rogan Josh in Den Haag'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto">
            {isNl
              ? 'Kasjmirische lamscurry. Halal lam op het bot. Specerijen direct uit India. Langzaam gegaard. Leyweg 986, Den Haag.'
              : 'Kashmiri lamb curry. Halal bone-in lamb. Spices sourced from India. Slow-cooked daily. Leyweg 986, Den Haag.'}
          </p>
        </div>
      </section>

      {/* WHAT IS MUTTON ROGAN JOSH */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat is mutton rogan josh?' : 'What is Mutton Rogan Josh?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>
                  Rogan josh is een Kasjmirisch gerecht. Niet een generieke Noord-Indiase lamscurry met een dieprode kleur - maar een gerecht met een specifieke regionale identiteit, specifieke specerijen en een specifieke bereidingswijze. De naam komt van &quot;rogan&quot; (olie of geklaarde boter) en &quot;josh&quot; (hitte, intensiteit, passie). De hitte in rogan josh komt niet alleen van chilipepers. Het komt van de diepte van de saus en de manier waarop de hele specerijen vrijkomen tijdens het <strong>langzame garen</strong>.
                </p>
                <p>
                  De Kasjmirische versie - de echte - heeft drie kenmerken die hem onderscheiden van elke andere lamscurry. Ten eerste: Kasjmiri gedroogde rode chilipepers, die de diepe baksteenrode kleur geven zonder extreme hitte. Ten tweede: venkel en gedroogde gember in de basis, die de saus zijn kenmerkende bloemige warmte geven. Ten derde: yoghurt gevouwen in de saus, die een zachte zurigheid toevoegt en de saus om het lam bindt.
                </p>
                <p>
                  De meeste rogan josh die in Den Haag wordt geserveerd, is gemaakt op basis van generieke currypasta, zonder Kasjmiri chilipepers, en met room in plaats van yoghurt. Het smaakt prima. Maar het is geen rogan josh. Bij <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link> worden de specerijen voor de <strong>mutton rogan josh Den Haag</strong> direct uit India gehaald en elke ochtend vers gemalen op Leyweg 986.
                </p>
              </>
            ) : (
              <>
                <p>
                  Rogan josh is a Kashmiri dish. Not a catch-all North Indian lamb curry with a deep red colour - a dish with a specific regional identity, specific spices, and a specific way of being made. The name comes from &quot;rogan&quot; (oil or clarified fat) and &quot;josh&quot; (heat, intensity, passion). The heat in rogan josh is not from chilli alone. It is from the depth of the sauce and the way whole spices release during the <strong>slow cook</strong>.
                </p>
                <p>
                  The Kashmiri version - the real one - has three things that set it apart from every other lamb curry. First, Kashmiri dried red chillies, which give the deep brick-red colour without brutal heat. Second, fennel seeds and dried ginger in the base, which give the sauce its signature floral warmth. Third, yoghurt folded into the gravy, which adds a gentle tang and binds the sauce around the lamb.
                </p>
                <p>
                  Most rogan josh served in Den Haag is built on generic curry paste, skips the Kashmiri chillies, and uses cream in place of yoghurt. It tastes fine. But it is not rogan josh. At <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>, the spices used in <strong>mutton rogan josh Den Haag</strong> are sourced directly from India and ground fresh every morning at Leyweg 986.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* WHAT MAKES KASHMIRI ROGAN JOSH DIFFERENT */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat maakt Kasjmirische rogan josh anders?' : 'What Makes Kashmiri Rogan Josh Different?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-8">
            {isNl ? (
              <>
                <div>
                  <h3 className="font-vibes text-3xl text-[#C7A348] mb-4">De Kasjmiri chilipeper</h3>
                  <p>
                    Kasjmiri gedroogde rode chilipepers zijn mild van hitte en intens aromatisch. Ze kleuren de saus diep rood - niet oranje, niet bruin - maar diep karmozijn. Deze kleur komt niet van paprika en niet van kleurstof. Het komt van de specifieke chilipepervariëteit die in de vallei groeit. Bij Chopras komen deze chilipepers direct uit India. Er wordt niets vervangen door een lokaal alternatief.
                  </p>
                </div>
                <div>
                  <h3 className="font-vibes text-3xl text-[#C7A348] mb-4">Venkel en gedroogde gember</h3>
                  <p>
                    De meeste <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal lamscurrys in Den Haag</Link> gebruiken komijn en koriander als specerijenbasis. Authentieke rogan josh gebruikt venkel en sonth (gedroogde gember). Dit is het detail dat een Kasjmirische rogan josh onderscheidt van elke andere lamscurry. De venkel geeft een licht anijsaroma dat de hele saus optilt. Zonder venkel verliest het gerecht zijn regionale identiteit volledig.
                  </p>
                </div>
                <div>
                  <h3 className="font-vibes text-3xl text-[#C7A348] mb-4">Yoghurt, geen room</h3>
                  <p>
                    <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Butter chicken</Link> gebruikt room. Rogan josh gebruikt yoghurt. Dit is niet uitwisselbaar. Yoghurt geeft de saus een lichte zurigheid die door de rijkheid van het lam heen snijdt en het gerecht in balans houdt. Room maakt de saus zoeter en zwaarder. Het een is Kasjmirisch. Het ander niet.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-vibes text-3xl text-[#C7A348] mb-4">The Kashmiri Chilli</h3>
                  <p>
                    Kashmiri dried red chillies are mild in heat and intensely aromatic. They turn the sauce deep red - not orange, not brown - deep crimson. This colour is not from paprika. It is not from food colouring. It is from the specific variety of chilli that grows in the Kashmir valley. At Chopras, these chillies are sourced directly from India. Nothing is substituted with a local equivalent.
                  </p>
                </div>
                <div>
                  <h3 className="font-vibes text-3xl text-[#C7A348] mb-4">Fennel and Dried Ginger</h3>
                  <p>
                    Most <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal lamb curries in Den Haag</Link> use cumin and coriander as their spice base. Authentic rogan josh uses fennel and sonth (dried ginger). This is the detail that separates a Kashmiri rogan josh from every other lamb curry. The fennel gives a faint anise note that lifts the entire sauce. Without it, the dish loses its regional identity entirely.
                  </p>
                </div>
                <div>
                  <h3 className="font-vibes text-3xl text-[#C7A348] mb-4">Yoghurt, Not Cream</h3>
                  <p>
                    <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Butter chicken</Link> uses cream. Rogan josh uses yoghurt. These are not interchangeable. Yoghurt gives the sauce a faint sourness that cuts through the richness of the lamb and keeps the dish in balance. Cream makes it sweeter and heavier. One is Kashmiri. One is not.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ROGAN JOSH AT CHOPRAS */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Mutton rogan josh bij Chopras Indian Restaurant Den Haag' : 'Mutton Rogan Josh at Chopras Indian Restaurant Den Haag'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>
                  Het lam bij Chopras is <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal gecertificeerd</Link>, op het bot, van de schouder. Op het bot is een bewuste keuze. Het bot voegt diepte toe aan de saus op een manier die botloos lam nooit kan. Beenmerg lost op in de saus tijdens het langzame garen. Het resultaat is een saus die smaakt alsof hij al langere tijd is opgebouwd - niet in een uur bij elkaar gezet.
                </p>
                <p>
                  De specerijen komen niet uit een kant-en-klare mengeling. Op Leyweg 986 worden hele specerijen - Kasjmiri gedroogde rode chilipepers, venkel, zwarte kardemom, kaneel, kruidnagel en laurierblad - <strong>direct uit India gehaald en elke ochtend vers gemalen</strong> voor de service. De aromatische oliën in hele specerijen beginnen te verdampen binnen enkele uren na het malen. Op het moment dat ze in de pan gaan, zijn ze op hun krachtigst.
                </p>
                <p>
                  Chopras Indian Restaurant heeft <strong>4,9 sterren van 800+ Google-reviews</strong> - het best beoordeelde Indiaas restaurant in Den Haag. Gasten die rogan josh specifiek kennen, komen terug voor dit gerecht. Bekijk het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige menu</Link> voor alle beschikbare gerechten, of <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">reserveer een tafel</Link> voor vanavond.
                </p>
              </>
            ) : (
              <>
                <p>
                  The lamb at Chopras is <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal certified</Link>, bone-in, from the shoulder. Bone-in is a deliberate choice. The bone adds depth to the sauce in ways that boneless lamb cannot. Marrow dissolves into the gravy during the slow cook. The result is a sauce that tastes like it has been building for a long time - not assembled in an hour.
                </p>
                <p>
                  The spices are not from a pre-mixed blend. At Leyweg 986, whole spices - Kashmiri dried red chillies, fennel, black cardamom, cinnamon, clove, and bay leaf - are <strong>sourced directly from India and ground fresh every morning</strong> before service. The volatile aromatic oils in whole spices begin evaporating within hours of grinding. By the time they reach the pot, they are at maximum potency.
                </p>
                <p>
                  Chopras Indian Restaurant holds <strong>4.9 stars from 800+ Google reviews</strong> - one of the strongest-rated Indian restaurants in Den Haag. Guests who know rogan josh specifically return for this dish. View the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full menu</Link> to see all dishes available, or <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">reserve a table</Link> for this evening.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#1B2B5E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Waar vind ik authentieke lamsvlees rogan josh in Den Haag?'
              : 'Where Can I Find Authentic Mutton Rogan Josh in Den Haag?'}
          </h2>
          <div className="font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <p>
                Authentieke lamsvlees rogan josh in Den Haag wordt geserveerd bij <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>, Leyweg 986, 2545 GW Den Haag. Het gerecht gebruikt halal lam op het bot, Kasjmiri rode chilipepers, venkel en specerijen die direct uit India komen en elke ochtend vers worden gemalen. Chopras heeft een Google-beoordeling van 4,9 sterren van 800+ geverifieerde reviews - het best beoordeelde Indiaas restaurant in Den Haag. Geopend dinsdag tot en met zondag, 16:30 tot 22:30. <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserveer een tafel</Link> of bestel online.
              </p>
            ) : (
              <p>
                Authentic mutton rogan josh in Den Haag is served at <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>, Leyweg 986, 2545 GW Den Haag. The dish uses halal bone-in lamb, Kashmiri red chillies, fennel, and spices sourced from India and ground fresh daily. Chopras holds a 4.9-star Google rating from 800+ verified reviews - one of the strongest-rated Indian restaurants in Den Haag. Open Tuesday to Sunday, 16:30 to 22:30. <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserve a table</Link> or order online.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde vragen over rogan josh' : 'Questions About Mutton Rogan Josh'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* ORDER */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Rogan josh bestellen bij Chopras' : 'Order Rogan Josh at Chopras'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                name: isNl ? 'Lamsvlees Rogan Josh' : 'Mutton Rogan Josh',
                price: '€22.50',
                desc: isNl ? 'Halal lam op het bot in diepe Kasjmiri saus' : 'Halal bone-in lamb in deep Kashmiri sauce',
                href: null,
                descBefore: undefined,
                descWord: undefined,
                descAfter: undefined,
              },
              {
                name: isNl ? 'Met Naan' : 'With Naan',
                price: '+€4.50',
                desc: undefined,
                descBefore: isNl ? 'Vers ' : 'Fresh ',
                descWord: 'naan',
                descAfter: isNl ? ' gebakken in onze klei tandoor oven' : ' baked in our clay tandoor oven to soak up every drop',
                href: '/naan-den-haag',
              },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-xl p-6 border-l-4 border-[#D4AF37]">
                <h3 className="font-vibes text-xl text-[#C7A348] mb-1">{item.name} - {item.price}</h3>
                <p className="font-body text-[#1A1A1A] text-sm">
                  {item.href ? (
                    <>{item.descBefore}<Link href={`${base}${item.href}`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">{item.descWord}</Link>{item.descAfter}</>
                  ) : (
                    item.desc
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`${base}/contact`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]">
              {tr.common.reserve}
            </Link>
            <Link href={`${base}/menu`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]">
              {tr.common.viewMenu}
            </Link>
            <Link href={`${base}/indian-food-delivery-den-haag`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]">
              {isNl ? 'Bezorging' : 'Order Delivery'}
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Meer gerechten ontdekken' : 'Explore More Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Signature Gerecht' : 'Signature Dish'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Biryani in Den Haag' : 'Biryani in Den Haag'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch' : 'Vegetarian'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Dal Makhani in Den Haag' : 'Dal Makhani in Den Haag'}</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Tandoor' : 'Tandoor'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Tandoori specialiteiten Den Haag' : 'Tandoori specialities Den Haag'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Evenementen' : 'Events'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas catering voor uw feest' : 'Indian catering for your event'}</p>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              {isNl
                ? <>Bekijk het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige menu</Link> of <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">maak een reservering bij Chopras Indian Restaurant Den Haag</Link>.</>
                : <>View the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full menu</Link> or <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">book a table at Chopras Indian Restaurant Den Haag</Link>.</>
              }
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
