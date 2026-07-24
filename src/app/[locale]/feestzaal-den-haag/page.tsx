"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import GallerySection from "@/components/sections/GallerySection";
import type { Locale } from "@/lib/useTranslations";

const faqsEn = [
  { q: "Can I hire the event hall at Chopras Indian Restaurant?", a: "Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag operates a private event hall accommodating 25 to 80 guests. Full authentic Indian catering from the Chopras kitchen is included." },
  { q: "Is catering included with the hall hire?", a: "Yes. Full authentic Indian catering from the Chopras kitchen is included. Everything is prepared fresh on the day by the same team that earns 4.9 stars on Google from 1,100+ reviews." },
  { q: "How many guests does the event hall accommodate?", a: "The private event hall accommodates between 25 and 80 guests. This covers intimate family dinners and large wedding or corporate receptions." },
  { q: "Is the food fully halal certified?", a: "Yes. Every dish at Chopras Indian Restaurant is fully halal certified. Every meat supplier holds halal certification. Muslim families planning any event can book with complete confidence." },
  { q: "How far in advance should I book?", a: "For events of 25–40 guests, contact us at least 2–3 weeks ahead. For larger weddings and corporate dinners of 50–80 guests, 6–8 weeks ahead is recommended." }
];

const faqsNl = [
  { q: "Kan ik de feestzaal van Chopras Indian Restaurant huren?", a: "Ja. Chopras Indian Restaurant aan de Leyweg 986, Den Haag heeft een privé feestzaal voor 25 tot 80 gasten. Volledige authentieke Indiase catering uit de Chopras-keuken is inbegrepen." },
  { q: "Is catering inbegrepen bij de zaalhuur?", a: "Ja. Volledige authentieke Indiase catering uit de Chopras-keuken is inbegrepen. Alles wordt op de dag zelf vers bereid door hetzelfde team dat 4,9 sterren op Google behaalt uit 1.100+ beoordelingen." },
  { q: "Hoeveel gasten passen er in de feestzaal?", a: "De privé feestzaal biedt plaats aan 25 tot 80 gasten. Dit is geschikt voor intieme familiediners en grote bruiloft- of bedrijfsevents." },
  { q: "Is het eten volledig halal gecertificeerd?", a: "Ja. Elk gerecht bij Chopras Indian Restaurant is 100% halal gecertificeerd. Elke vleesleverancier beschikt over een halalcertificaat. Moslimfamilies kunnen met volmoed vertrouwen hun evenement boeken." },
  { q: "Hoe ver van tevoren moet ik reserveren?", a: "Voor evenementen van 25–40 gasten raden we aan ten minste 2–3 weken van tevoren contact op te nemen. Voor grotere bruiloften en diners van 50–80 gasten is 6–8 weken van tevoren aanbevolen." }
];

// ─── Occasions Slider ────────────────────────────────────────────────────────
const NEW_SLIDES_EN = [
  {
    num: "01",
    title: "Engagement & Weddings",
    desc: "Celebrate your special day with authentic Indian cuisine in a warm and welcoming private venue. Perfect for intimate weddings, engagement parties, pre-wedding celebrations, and family gatherings with exceptional hospitality.",
    img: "/feeztal/wedd.png"
  },
  {
    num: "04",
    title: "Festivals & Cultural Celebrations",
    desc: "Celebrate Diwali, Holi, Navratri, Garba, Eid, Christmas, New Year, Independence Day, and other cultural and festive occasions with authentic Indian cuisine in a vibrant atmosphere.",
    img: "/images/catering/party-decor.png"
  },
  {
    num: "05",
    title: "Birthdays & Anniversaries",
    desc: "Celebrate anniversaries, birthdays, retirement parties, graduation celebrations, naming ceremonies, family reunions, and other milestone occasions with delicious Indian food in a comfortable and inviting setting.",
    img: "/feeztal/birth.png"
  },
  {
    num: "06",
    title: "Proposals & Romantic Dinners",
    desc: "Create unforgettable memories with a private dining experience, ideal for romantic proposals, date nights, Valentine's celebrations, anniversary dinners, and intimate private gatherings.",
    img: "/images/catering/proposal---1.png"
  },
  {
    num: "07",
    title: "Baby Showers & Family Parties",
    desc: "Host baby showers, gender reveal parties, naming ceremonies, family lunches, and special get-togethers in a relaxed venue while enjoying freshly prepared authentic Indian cuisine.",
    img: "/feeztal/bby.png"
  },
  {
    num: "08",
    title: "High Tea & Gatherings",
    desc: "A perfect venue for high tea, kitty parties, ladies' lunches, brunches, friends' reunions, club meetings, and casual social gatherings with delicious food and refreshments.",
    img: "/images/catering/hightea.png"
  },
  {
    num: "09",
    title: "Corporate Events & Networking",
    desc: "Ideal venue for corporate dinners, business lunches, meetings, networking events, workshops, training sessions, team-building activities, brainstorming sessions, client presentations, and professional gatherings in The Hague.",
    img: "/feeztal/net.png"
  },
  {
    num: "10",
    title: "Community & Expat Events",
    desc: "Bring together students, expats, cultural associations, alumni groups, community organisations, and local clubs for networking, celebrations, cultural exchanges, and social gatherings over authentic Indian cuisine.",
    img: "/feeztal/student.png"
  },
  {
    num: "10",
    title: "Wellness & Creative Workshops",
    desc: "Host yoga sessions, meditation classes, dance workshops, art workshops, cooking classes, wellness events, and other creative community activities in a welcoming and comfortable venue.",
    img: "/feeztal/wellness.png"
  },
  {
    num: "11",
    title: "Launches & Shoots",
    desc: "Our stylish interiors provide the perfect setting for product launches, book launches, press events, media gatherings, food photography, commercial shoots, influencer collaborations, brand promotions, interviews, and social media content creation.",
    img: "/feeztal/launch.png"
  },
  {
    num: "12",
    title: "Charity & Fundraising Events",
    desc: "Organise charity dinners, fundraising events, community initiatives, awareness campaigns, and non-profit gatherings in a welcoming venue with authentic Indian cuisine and attentive hospitality.",
    img: "/feeztal/fund.png"
  }
];

const NEW_SLIDES_NL = [
  {
    num: "01",
    title: "Verloving & Bruiloft",
    desc: "Vier je speciale dag met authentieke Indiase gerechten in een sfeervolle privélocatie. Perfect voor intieme bruiloften, verlovingsfeesten en familiebijeenkomsten met uitstekende gastvrijheid.",
    img: "/feeztal/wedd.png"
  },
  {
    num: "04",
    title: "Festivals & Culturele Feesten",
    desc: "Vier Diwali, Holi, Navratri, Eid, Kerstmis, Nieuwjaar en andere feestelijke gelegenheden met authentieke Indiase gerechten in een levendige sfeer.",
    img: "/images/catering/party-decor.png"
  },
  {
    num: "05",
    title: "Verjaardagen & Jubilea",
    desc: "Vier jubilea, verjaardagen, pensioenfeesten en familiereünies met heerlijk Indiaas eten in een comfortabele en gastvrije setting.",
    img: "/feeztal/birth.png"
  },
  {
    num: "06",
    title: "Aanzoeken & Romantisch Dineren",
    desc: "Maak onvergetelijke herinneringen met een privé dinerervaring, ideaal voor romantische aanzoeken, jubileumdiners en intieme bijeenkomsten.",
    img: "/images/catering/proposal---1.png"
  },
  {
    num: "07",
    title: "Babyshowers & Familiefeesten",
    desc: "Organiseer babyshowers, gender reveals en familielunches in een ontspannen locatie met vers bereide authentieke Indiase gerechten.",
    img: "/feeztal/bby.png"
  },
  {
    num: "08",
    title: "High Tea & Bijeenkomsten",
    desc: "Een perfecte locatie voor high tea, kitty parties, vriendenreünies en informele sociale bijeenkomsten met heerlijke gerechten en verfrissingen.",
    img: "/images/catering/hightea.png"
  },
  {
    num: "09",
    title: "Bedrijfsevenementen & Netwerken",
    desc: "Ideale locatie voor bedrijfsdiners, zakelijke lunches, netwerkevenementen, workshops en teambuilding in Den Haag.",
    img: "/feeztal/net.png"
  },
  {
    num: "10",
    title: "Gemeenschaps- & Expat Evenementen",
    desc: "Breng studenten, expats en culturele verenigingen samen voor netwerken en feesten onder het genot van authentieke Indiase gerechten.",
    img: "/feeztal/student.png"
  },
  {
    num: "10",
    title: "Wellness & Creatieve Workshops",
    desc: "Organiseer yogasessies, dansworkshops, kookcursussen en andere creatieve groepsactiviteiten in een gastvrije zaal.",
    img: "/feeztal/wellness.png"
  },
  {
    num: "11",
    title: "Lanceringen & Fotoshoots",
    desc: "Onze stijlvolle ruimte is het perfecte decor voor productlanceringen, persbijeenkomsten, foodfotografie en merkpromoties.",
    img: "/feeztal/launch.png"
  },
  {
    num: "12",
    title: "Goede Doelen & Benefietdiners",
    desc: "Organiseer benefietdiners, inzamelingsacties en maatschappelijke initiatieven in een gastvrije locatie met attente gastvrijheid.",
    img: "/feeztal/fund.png"
  }
];

function OccasionsSlider({ isNl }: { isNl: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slides = isNl ? NEW_SLIDES_NL : NEW_SLIDES_EN;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].clientWidth;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].clientWidth;
      scrollContainerRef.current.scrollBy({ left: (cardWidth + 24), behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#f4f7f9] overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16 px-6">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#06068a] leading-[1.15] tracking-tight mt-3">
          {isNl ? (
            <>
              Elke Viering<br />
              <span className="text-[#06068a]">Is Welkom Bij Ons</span>
            </>
          ) : (
            <>
              Every Celebration<br />
              <span className="text-[#06068a]">Welcomed Here</span>
            </>
          )}
        </h2>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-[90rem] mx-auto px-4 md:px-8">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 pt-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative min-w-[85vw] sm:min-w-[400px] md:min-w-[calc(33.333%-1.5rem)] snap-start group flex flex-col"
            >
              {/* Image half */}
              <div className="relative h-[250px] w-full shrink-0 overflow-hidden rounded-t-xl">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-105"
                />
              </div>

              {/* Overlapping White Card */}
              <div className="relative z-10 bg-white mx-4 -mt-16 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex-1 flex flex-col rounded-b-xl border border-black/5">

                {/* Center Top Gold Icon */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-black/5">
                  <svg className="w-6 h-6 text-[#06068a]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>

                <h3 className="font-heading text-xl md:text-2xl font-bold text-[#06068a] mb-3 mt-2 tracking-wide">
                  {slide.title}
                </h3>

                <p className="font-body text-[15px] font-light text-gray-500 leading-relaxed flex-grow">
                  {slide.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/3 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-0 pointer-events-none z-20">
          <button
            onClick={scrollLeft}
            className="pointer-events-auto w-12 h-12 md:-ml-6 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#06068a] hover:bg-[#06068a] hover:text-white transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={scrollRight}
            className="pointer-events-auto w-12 h-12 md:-mr-6 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#06068a] hover:bg-[#06068a] hover:text-white transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Simple pagination dots representation */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#aab7bc]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#06068a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#aab7bc]" />
        </div>
      </div>
    </section>
  );
}


export default function EventHallPage({ params }: { params?: { locale?: Locale } }) {
  const routeParams = useParams();
  const locale = (params?.locale || routeParams?.locale || 'en') as Locale;
  const isNl = locale === 'nl';
  const base = isNl ? '/nl' : '';

  const faqs = isNl ? faqsNl : faqsEn;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !guests) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/feestzaal-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, date, guests, message }),
      });

      if (!res.ok) throw new Error('Server error');

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setGuests('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const steps = isNl
    ? [
        { n: 1, title: "Neem Contact Op", desc: "Bel +31 6 30645930 of gebruik het formulier hieronder. Geef uw datum en aantal gasten door." },
        { n: 2, title: "Ontvang Een Offerte", desc: "Wij controleren de beschikbaarheid, bespreken menuopties en sturen een vrijblijvende offerte." },
        { n: 3, title: "Stel Uw Menu Samen", desc: "Kies uit het volledige Chopras menu — buffet of uitgeserveerd. 100% halal gecertificeerd." },
        { n: 4, title: "Vier Het Op Uw Manier", desc: "In onze feestzaal met een vers bereid op maat gemaakt buffet." }
      ]
    : [
        { n: 1, title: "Get in Touch", desc: "Call +31 6 30645930 or use the form below. Tell us your date and guest count." },
        { n: 2, title: "Get A Quote", desc: "We check availability, discuss menu options, and send a no-obligation quote." },
        { n: 3, title: "Build Menu", desc: "Choose from the full Chopras menu — buffet or plated. 100% halal certified." },
        { n: 4, title: "Celebrate Your Way", desc: "At our Party Hall with freshly prepared customised buffet." }
      ];

  const valueProps = isNl
    ? [
        { title: "Restaurantkwaliteit", icon: "🍽️", desc: "Vers gemalen specerijen. Zelfde chefs als ons 4.9-sterren restaurant." },
        { title: "Eén Boeking", icon: "📋", desc: "Zaal & catering in één contract. Geen dubbele logistiek." },
        { title: "Halal Gecertificeerd", icon: "☪️", desc: "Elk gerecht en leverancier is 100% halal gecertificeerd." },
        { title: "25–80 Gasten", icon: "👥", desc: "Past zich aan uw groepsgrootte aan zonder vaste pakketverplichtingen." }
      ]
    : [
        { title: "Restaurant Quality", icon: "🍽️", desc: "Freshly ground spices. Same chefs as our 4.9-star restaurant." },
        { title: "One Booking", icon: "📋", desc: "Venue & catering in a single contract. No double logistics." },
        { title: "Halal Certified", icon: "☪️", desc: "Every dish and supplier is 100% halal certified." },
        { title: "25–80 Guests", icon: "👥", desc: "Adapts to your group size with no fixed minimum packages." }
      ];

  return (
    <main className="bg-white min-h-screen text-[#1A1A1A] overflow-hidden font-body">

      {/* 1. HERO BANNER */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center bg-[#06068a]">
        {/* Mobile Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="md:hidden absolute top-0 left-0 w-full h-full object-cover z-0 brightness-110"
        >
          <source src="/vacancy/feez2.mp4" type="video/mp4" />
        </video>

        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block absolute top-0 left-0 w-full h-full object-cover z-0 brightness-110"
        >
          <source src="/feeztal/feeez.mp4" type="video/mp4" />
        </video>

        {/* Bright overlay */}
        <div className="absolute inset-0 z-10 bg-black/15" />

        <div className="relative z-20 text-center px-6 mt-20 max-w-4xl mx-auto">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/40 bg-black/40 text-white text-xs font-bold uppercase tracking-[0.25em] mb-8 backdrop-blur-md">
            {isNl ? 'Eventlocatie · Den Haag' : 'Event Venue · Den Haag'}
          </span>

          {/* Heading */}
          <h1
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 whitespace-nowrap max-w-6xl mx-auto"
            style={{
              color: '#ffffff',
              textShadow:
                '0 2px 4px rgba(0,0,0,0.95), 0 4px 16px rgba(0,0,0,0.85), 0 8px 40px rgba(0,0,0,0.7)',
            }}
          >
            {isNl ? (
              <>Chopras Indian Restaurant <br /> Feestzaal &amp; Evenementen</>
            ) : (
              <>Chopras Indian Restaurant <br /> Party Hall Events</>
            )}
          </h1>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/90 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
          </div>

          {/* Subtitle */}
          <p
            className="font-body text-base max-w-3xl mx-auto mt-6 mb-10 leading-relaxed font-light"
            style={{
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            {isNl ? (
              'Op zoek naar een privé feestzaal of restaurant met evenementenruimte in Den Haag? Wij verzorgen bruiloften, verjaardagen, bedrijfsevenementen, netwerksessies, privé diners en culturele feesten met authentieke Indiase catering.'
            ) : (
              'Looking for a private event venue or restaurant with a party hall in The Hague? We host weddings, birthdays, corporate events, networking sessions, private dining experiences, and cultural celebrations with authentic Indian cuisine'
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#book">
              <button className="btn-gradient text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,255,0.5)]">
                {isNl ? 'Offerte Aanvragen' : 'Request a Quote'}
              </button>
            </Link>
            <Link href={`${base}/menu`}>
              <button
                className="bg-white/10 border-2 border-white/60 text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 backdrop-blur-sm"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
              >
                {isNl ? 'Bekijk het Menu' : 'View the Menu'}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION / FOUR GOLD ICONS ROW */}
      <section className="py-12 px-6 md:px-16 -mt-16 relative z-30 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {valueProps.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5 hover:-translate-y-2 transition-transform duration-500 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="font-heading text-xl text-[#06068a] font-semibold mb-3">{item.title}</h3>
              <p className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 BOOKING INFORMATION SECTION */}
      <section className="py-16 px-6 md:px-16 bg-white relative z-20 border-b border-black/5">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#06068a] font-semibold tracking-widest uppercase text-sm">
            {isNl ? 'Essentiële Info' : 'Essential Info'}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#06068a] leading-[1.15] tracking-tight mt-2 mb-6">
            {isNl ? 'Boekingsinformatie' : 'Booking Information'}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#06068a]/40" />
            <span className="text-[#06068a]/60 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#06068a]/40" />
          </div>
          <div className="space-y-6 text-[#1A1A1A]/80 font-body text-base leading-relaxed font-light bg-[#F7F8FC] p-8 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            {isNl ? (
              <>
                <p>
                  Onze privé feestzaal is beschikbaar voor verjaardagen, bruiloften, bedrijfsevenementen, familiefeesten en andere privé bijeenkomsten met flexibele menu-arrangementen per persoon met authentieke Indiase gerechten.
                </p>
                <p>
                  Om de beste ervaring te garanderen, raden wij aan tijdig te reserveren, vooral voor weekenden, feestdagen en het hoogseizoen. Decoratie, entertainment, fotografen en DJ's kunnen onafhankelijk door gasten worden geregeld met hun voorkeursleveranciers.
                </p>
                <p className="font-normal text-[#06068a]">
                  Neem contact op met ons team voor beschikbaarheid, pakketopties of een gepersonaliseerde offerte. Wij helpen u graag met het plannen van een onvergetelijk evenement.
                </p>
              </>
            ) : (
              <>
                <p>
                  Our private party hall is available for birthdays, weddings, corporate events, family celebrations, and other private functions with flexible per-person food packages featuring authentic Indian cuisine.
                </p>
                <p>
                  To ensure the best experience, we recommend booking in advance, especially for weekends, public holidays, and festive seasons. Decorations, entertainment, photographers, DJs, and event styling can be arranged independently by guests using their preferred vendors.
                </p>
                <p className="font-normal text-[#06068a]">
                  For availability, package options, or a personalized quotation, please contact our team. We will be happy to help you plan a memorable event.
                </p>
              </>
            )}
          </div>
          <div className="mt-8">
            <Link href="#book">
              <button className="btn-gradient text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,255,0.3)]">
                {isNl ? 'Bekijk Beschikbaarheid & Contact' : 'Check Availability & Contact Us'}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SPLIT SECTION: HALL & CATERING */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/vacancy/hall.png" alt="Hall Venue" fill className="object-cover brightness-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06068a]/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-2 text-white text-xl mb-2">
                ★★★★★
              </div>
              <p className="font-medium">
                {isNl ? 'Op basis van 1.100+ Google Beoordelingen' : 'Based on 1,100+ Google Reviews'}
              </p>
            </div>
            <div className="absolute top-6 left-6 btn-gradient text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded">
              {isNl ? 'Nu Boeken' : 'Book Now'}
            </div>
          </div>
          <div>
            <span className="text-[#06068a] font-semibold tracking-widest uppercase text-sm">
              {isNl ? 'Onze Locatie' : 'Our Venue'}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] leading-[1.15] tracking-tight mt-4 mb-6">
              {isNl ? (
                <>
                  <span className="font-bold">Zaal &amp; Catering</span><br />
                  <span className="italic font-bold">Onder Eén Dak</span>
                </>
              ) : (
                <>
                  <span className="font-bold">Hall &amp; Catering</span><br />
                  <span className="italic font-bold">Under One Roof</span>
                </>
              )}
            </h2>
            {/* Decorative rule */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#06068a]/40" />
              <span className="text-[#06068a]/60 text-lg">✦</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#06068a]/40" />
            </div>
            <div className="space-y-6 text-[#1A1A1A]/70 font-body text-base leading-relaxed font-light">
              {isNl ? (
                <>
                  <p>
                    De meeste mensen die een privé-evenement, feest of bijeenkomst in Den Haag plannen, staan voor dezelfde uitdaging: eerst een zaal zoeken, dan een cateraar vinden, afzonderlijke contracten afsluiten en meerdere schema's afstemmen.
                  </p>
                  <p>
                    Bij Chopras Indian Restaurant worden de privé feestzaal en de catering onder één dak beheerd, wat het planningsproces eenvoudig en overzichtelijk maakt. <strong className="text-[#06068a] font-medium">Eén boeking. Eén team. Eén aanspreekpunt.</strong>
                  </p>
                  <p>
                    De privé feestzaal biedt plaats aan ongeveer <strong className="text-[#06068a] font-medium">25 tot 80 gasten</strong> in een exclusieve setting. Elk gerecht wordt bereid door hetzelfde team dat dagelijks gasten ontvangt bij Chopras, met een beoordeling van 4,9 sterren op Google.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Most people planning a private event, celebration, or corporate gathering in Den Haag face the same challenge: first finding an event venue, then finding a caterer, negotiating separate contracts, and coordinating multiple schedules.
                  </p>
                  <p>
                    At Chopras Indian Restaurant, the private event hall and catering are managed under one roof, making the planning process simple and convenient. <strong className="text-[#06068a] font-medium">One booking. One team. One point of contact.</strong>
                  </p>
                  <p>
                    The private event hall accommodates approximately <strong className="text-[#06068a] font-medium">25 to 80 guests</strong> in an exclusive setting. Every dish is prepared by the same team that serves guests daily at Chopras, earning a 4.9-star rating on Google. The result is an event experience built around fresh food, professional hospitality, and authentic Indian cuisine.
                  </p>
                </>
              )}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href="#book">
                <button className="btn-gradient text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-[#e8c84a] transition-colors shadow-lg hover:shadow-xl">
                  {isNl ? 'Offerte Aanvragen' : 'Request a Quote'}
                </button>
              </Link>
              <Link href={`${base}/menu`}>
                <button className="btn-gradient text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-[#e8c84a] transition-colors shadow-lg hover:shadow-xl">
                  {isNl ? 'Bekijk het Menu' : 'See the Menu'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OCCASIONS SLIDER */}
      <OccasionsSlider isNl={isNl} />


      {/* 5. GALLERY */}
      <GallerySection locale={locale} />

      {/* 6. HOW TO BOOK (4 STEPS) */}
      <section className="relative py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#06068a] font-semibold tracking-widest uppercase text-sm">
              {isNl ? 'Hoe Te Boeken' : 'How To Book'}
            </span>
            <h2 className="font-heading text-5xl font-bold text-[#06068a] leading-[1.15] tracking-tight mt-4">
              {isNl ? 'Vier Stappen Naar Uw Perfecte Evenement' : 'Four Steps to Your Perfect Event'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line for desktop */}
                {i < 3 && <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] border-t-2 border-dashed border-[#0000B3]/20" />}

                <div className="w-20 h-20 mx-auto bg-[#F7F8FC] border border-[#0000B3]/10 rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10 text-[#06068a] font-heading text-3xl font-bold">
                  {step.n}
                </div>
                <h3 className="font-heading text-2xl text-[#06068a] font-semibold mb-3">{step.title}</h3>
                <p className="text-[#1A1A1A]/70 text-sm font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center text-[#1A1A1A]/60 text-sm font-medium">
            {isNl
              ? 'Voor 25–40 gasten: reserveer 2–3 weken van tevoren  ·  Voor 50–80 gasten: reserveer 6–8 weken van tevoren'
              : 'For 25–40 guests: book 2–3 weeks ahead  ·  For 50–80 guests: book 6–8 weeks ahead'}
          </div>
        </div>
      </section>

      {/* 7. BOOKING FORM & FAQ */}
      <section id="book" className="py-24 px-6 md:px-16 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* FAQ Left Side */}
          <div>
            <span className="text-[#06068a] font-semibold tracking-widest uppercase text-sm">
              {isNl ? 'Ondersteuning' : 'Support'}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#06068a] leading-[1.15] tracking-tight mt-2 mb-8">
              {isNl ? <>Veelgestelde <br />Vragen</> : <>Frequently Asked <br />Questions</>}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-black/5 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-medium text-[#06068a] hover:text-[#06068a] transition-colors"
                  >
                    {faq.q}
                    <span className="text-[#06068a] text-xl font-light">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className={`px-6 pb-5 text-[#1A1A1A]/70 text-sm font-light leading-relaxed ${openFaq === i ? 'block' : 'hidden'}`}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Right Side */}
          <div className="bg-white p-10 md:p-12 rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-black/5">
            <span className="text-[#06068a] font-semibold tracking-widest uppercase text-sm">
              {isNl ? 'Reserveer Uw Datum' : 'Reserve Your Date'}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#06068a] leading-[1.15] tracking-tight mt-2 mb-8">
              {isNl ? 'Vraag Een Offerte Aan' : 'Request A Quote'}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required type="text" placeholder={isNl ? "Uw Naam *" : "Your Name *"} value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-sm" />
                <input required type="email" placeholder={isNl ? "E-mailadres *" : "Email Address *"} value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="tel" placeholder={isNl ? "Telefoonnummer" : "Phone Number"} value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-sm" />
                <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-gray-500 text-sm" />
              </div>
              <div className="grid grid-cols-1 gap-6">
                <select required value={guests} onChange={e => setGuests(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-gray-500 text-sm">
                  <option value="">{isNl ? "Aantal Gasten *" : "Number of Guests *"}</option>
                  <option value="25 - 40">25 - 40</option>
                  <option value="40 - 60">40 - 60</option>
                  <option value="60 - 80">60 - 80</option>
                </select>
              </div>
              <textarea placeholder={isNl ? "Vertel ons over uw evenement (Type evenement, specifieke wensen)..." : "Tell us about your occasion (Type of event, specific requests)..."} rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-sm"></textarea>

              {status === 'success' && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm text-center font-medium border border-green-200">
                  {isNl
                    ? 'Bedankt voor uw aanvraag! Wij nemen binnen 24 uur contact met u op.'
                    : 'Thanks for your request! We will get back to you within 24 hours.'}
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm text-center font-medium border border-red-200">
                  {isNl
                    ? 'Er is iets misgegaan. Neem direct telefonisch contact op via +31 6 30645930.'
                    : 'Something went wrong. Please try calling us instead at +31 6 30645930.'}
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="w-full btn-gradient hover:bg-[#06068a] text-white font-semibold uppercase tracking-widest py-4 rounded-lg shadow-[0_8px_20px_rgba(0,0,255,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,102,0.4)] transition-all duration-300 text-sm flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isNl ? 'Aanvraag Verzenden...' : 'Sending Request...'}
                  </>
                ) : (isNl ? 'Ontvang Uw Offerte' : 'Get Your Quote ')}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-[#1A1A1A]/60 text-sm">
                {isNl ? 'Of bel ons direct via ' : 'Or call us directly at '}
                <a href="tel:+31630645930" className="text-[#06068a] font-semibold hover:underline">+31 6 30645930</a>
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}