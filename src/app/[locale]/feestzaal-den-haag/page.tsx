"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";


const faqs = [
  { q: "Can I hire the event hall at Chopras Indian Restaurant?", a: "Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag operates a private event hall accommodating 25 to 80 guests. Full authentic Indian catering from the Chopras kitchen is included." },
  { q: "Is catering included with the hall hire?", a: "Yes. Full authentic Indian catering from the Chopras kitchen is included. Everything is prepared fresh on the day by the same team that earns 4.9 stars on Google from 1,000+ reviews." },
  { q: "How many guests does the event hall accommodate?", a: "The private event hall accommodates between 25 and 80 guests. This covers intimate family dinners and large wedding or corporate receptions." },
  { q: "Is the food fully halal certified?", a: "Yes. Every dish at Chopras Indian Restaurant is fully halal certified. Every meat supplier holds halal certification. Muslim families planning any event can book with complete confidence." },
  { q: "How far in advance should I book?", a: "For events of 25–40 guests, contact us at least 2–3 weeks ahead. For larger weddings and corporate dinners of 50–80 guests, 6–8 weeks ahead is recommended." }
];

const events = [
  { num: "01", title: "Weddings", desc: "Buffet with multiple stations or formal plated service. Biryani in large karahi pots, tandoori platters, full vegetarian spread. The format matches the formality of your occasion." },
  { num: "02", title: "Nikah Receptions", desc: "A beautifully customized, intimate atmosphere honoring tradition with exceptional hospitality and a completely Halal menu." },
  { num: "03", title: "Walima Celebrations", desc: "Elegant dining arrangements made specifically to gather family and friends for grand celebratory multi-course Indian feasts." },
  { num: "04", title: "Festivities", desc: "Traditional dishes take centre stage — dal makhani, paneer tikka, biryani. Every celebration deserves food prepared with the care the occasion calls for." },
  { num: "05", title: "Birthday Parties", desc: "Arrive to a hall that's set, food that's ready. Your guests celebrate from the first moment without logistics getting in the way." },
  { num: "06", title: "Anniversaries", desc: "Commemorate beautiful milestones in an elegant space, customized layouts, and memories crafted around exquisite service." },
  { num: "07", title: "Baby Showers", desc: "An intimate gathering for the family, styled and catered to the detail. We work with you on menu and layout for a fully personalised experience." },
  { num: "08", title: "Corporate Dinners", desc: "A team dinner at Chopras is more memorable than a standard catered meeting room. Your private hall lets the group relax away from a public dining room." },
  { num: "09", title: "Networking Events", desc: "Professional setups with customizable catering and seamless organization, perfect for engaging conversations and community building." },
  { num: "10", title: "Family Gatherings", desc: "Gathering generations together over exceptional food and private structural luxury designed exclusively for comfort." }
];

// ─── Occasions Slider ────────────────────────────────────────────────────────
const NEW_SLIDES = [
  {
    num: "01",
    title: "Weddings",
    desc: "Buffet with multiple stations or formal plated service. Biryani in large karahi pots, tandoori platters, full vegetarian spread. The format matches the formality of your occasion.",
    img: "/images/catering/wedding-celebrations---1.png"
  },
  {
    num: "02",
    title: "Receptions",
    desc: "A beautifully customized, intimate atmosphere honoring tradition with exceptional hospitality and a completely Halal menu.",
    img: "/images/catering/feez12.jpg"
  },
  {
    num: "03",
    title: "Walima Celebrations",
    desc: "Elegant dining arrangements made specifically to gather family and friends for grand celebratory multi-course Indian feasts.",
    img: "/images/catering/wedding-celebrations---2.png"
  },
  {
    num: "04",
    title: "Festivities",
    desc: "Traditional dishes take centre stage — dal makhani, paneer tikka, biryani. Every celebration deserves food prepared with the care the occasion calls for.",
    img: "/images/catering/party-decor.png"
  },
  {
    num: "05",
    title: "Birthday Parties",
    desc: "Arrive to a hall that's set, food that's ready. Your guests celebrate from the first moment without logistics getting in the way.",
    img: "/images/catering/birthday-party.png"
  },
  {
    num: "06",
    title: "Anniversaries",
    desc: "Commemorate beautiful milestones in an elegant space, customized layouts, and memories crafted around exquisite service.",
    img: "/images/catering/proposal---1.png"
  },
  {
    num: "07",
    title: "Baby Showers",
    desc: "An intimate gathering for the family, styled and catered to the detail. We work with you on menu and layout for a fully personalised experience.",
    img: "/images/catering/baby-shower-pic-1.png"
  },
  {
    num: "08",
    title: "Corporate Dinners",
    desc: "A team dinner at Chopras is more memorable than a standard catered meeting room. Your private hall lets the group relax away from a public dining room.",
    img: "/images/catering/corporate-dinners-at-chopras.png"
  },
  {
    num: "09",
    title: "Networking Events",
    desc: "Professional setups with customizable catering and seamless organization, perfect for engaging conversations and community building.",
    img: "/images/catering/team-dinners.png"
  },
  {
    num: "10",
    title: "Family Gatherings",
    desc: "Gathering generations together over exceptional food and private structural luxury designed exclusively for comfort.",
    img: "/images/catering/feez8.jpg"
  }
];

function OccasionsSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        <h2 className="font-heading text-4xl md:text-5xl text-[#000066] font-bold mt-3 leading-tight tracking-wide">
          Every Celebration<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]">Welcomed Here</span>
        </h2>
        {/* Fancy divider */}
        {/* <div className="flex justify-center mt-6 opacity-60">
          <svg width="180" height="20" viewBox="0 0 180 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10C25 10 25 0 40 0C55 0 55 10 70 10C85 10 85 20 100 20C115 20 115 10 130 10C145 10 145 0 160 0C175 0 175 10 190 10" stroke="#7a9099" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="90" cy="10" r="4" fill="#7a9099"/>
          </svg>
        </div> */}
      </div>

      {/* Slider Container */}
      <div className="relative max-w-[90rem] mx-auto px-4 md:px-8">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 pt-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {NEW_SLIDES.map((slide, i) => (
            <div
              key={i}
              className="relative min-w-[85vw] sm:min-w-[400px] md:min-w-[calc(33.333%-1.5rem)] snap-start group"
            >
              {/* Image half */}
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlapping White Card */}
              <div className="relative z-10 bg-white mx-4 -mt-16 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] min-h-[240px] flex flex-col">

                {/* Center Top Gold Icon */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-[#c9a25b]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>

                <h3 className="font-heading text-xl md:text-2xl font-bold text-[#333] mb-3 mt-2 tracking-wide">
                  {slide.title}
                </h3>

                <p className="font-body text-[15px] font-light text-gray-500 leading-relaxed mb-6 flex-grow">
                  {slide.desc}
                </p>

                {/* <div className="mt-auto">
                  <Link href="#contact" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#c9a25b] transition-colors uppercase tracking-widest font-medium">
                    Read More
                    <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/3 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-0 pointer-events-none z-20">
          <button
            onClick={scrollLeft}
            className="pointer-events-auto w-12 h-12 md:-ml-6 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#000066] hover:bg-[#000066] hover:text-white transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={scrollRight}
            className="pointer-events-auto w-12 h-12 md:-mr-6 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#000066] hover:bg-[#000066] hover:text-white transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Simple pagination dots representation */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#aab7bc]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#c9a25b]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#aab7bc]" />
        </div>
      </div>
    </section>
  );
}


export default function EventHallPage() {
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

  return (
    <main className="bg-[#F7F8FC]/20 min-h-screen text-[#1A1A1A] overflow-hidden font-body">

      {/* 1. HERO BANNER */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center bg-[#000066]">
        <Image
          src="/images/catering/feezbanner.jpg"
          alt="Chopras Private Event Hall"
          fill
          className="object-cover z-0"
          priority
        />

        {/* Bottom vignette only — keeps full image visible, text stays readable */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="relative z-20 text-center px-6 mt-20 max-w-4xl mx-auto">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/40 bg-black/40 text-white text-xs font-bold uppercase tracking-[0.25em] mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]" />
            Event Venue &middot; Den Haag
          </span>

          {/* Heading with deep text shadow */}
          <h1
            className="font-heading text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.05] mb-4"
            style={{
              color: '#ffffff',
              textShadow:
                '0 2px 4px rgba(0,0,0,0.95), 0 4px 16px rgba(0,0,0,0.85), 0 8px 40px rgba(0,0,0,0.7)',
            }}
          >
            Your Occasion,<br />
            <em
              className="not-italic"
              style={{
                color: '#ffffff',
                textShadow:
                  '0 2px 4px rgba(0,0,0,0.95), 0 4px 16px rgba(0,0,0,0.85)',
              }}
            >
              Perfectly Arranged
            </em>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-lg md:text-xl max-w-2xl mx-auto mt-4 mb-10 leading-relaxed font-light"
            style={{
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            Private event hall with authentic Indian catering under one roof
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#book">
              <button className="bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:bg-white hover:text-[#000066] text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,255,0.5)] hover:shadow-[0_4px_24px_rgba(0,0,255,0.3)]">
                Request a Free Quote
              </button>
            </Link>
            <Link href="/menu">
              <button
                className="bg-white/10 hover:bg-white hover:text-[#000066] border-2 border-white/60 text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 backdrop-blur-sm"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
              >
                View the Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION / FOUR GOLD ICONS ROW */}
      <section className="py-12 px-6 md:px-16 -mt-16 relative z-30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Restaurant Quality", icon: "🍽️", desc: "Freshly ground spices. Same chefs as our 4.9-star restaurant." },
            { title: "One Booking", icon: "📋", desc: "Venue & catering in a single contract. No double logistics." },
            { title: "Halal Certified", icon: "☪️", desc: "Every dish and supplier is 100% halal certified." },
            { title: "25–80 Guests", icon: "👥", desc: "Adapts to your group size with no fixed minimum packages." }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5 hover:-translate-y-2 transition-transform duration-500 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="font-heading text-xl text-[#000066] font-semibold mb-3">{item.title}</h3>
              <p className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SPLIT SECTION: HALL & CATERING */}
      <section className="py-24 px-6 md:px-16 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/images/catering/feez12.jpg" alt="Hall Venue" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000066]/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-2 text-white text-xl mb-2">
                ★★★★★
              </div>
              <p className="font-medium">Based on 1,000+ Google Reviews</p>
            </div>
            <div className="absolute top-6 left-6 bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded">
              Book Now
            </div>
          </div>
          <div>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold tracking-widest uppercase text-sm">Our Venue</span>
            <h2 className="font-heading text-5xl md:text-6xl text-[#000066] font-medium mt-4 mb-8 leading-[1.2]">
              Hall &amp; Catering<br />
              <em className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] italic">Under One Roof</em>
            </h2>
            <div className="space-y-6 text-[#1A1A1A]/70 font-body text-lg leading-relaxed font-light">
              <p>
                Most people planning a private event, celebration, or corporate gathering in Den Haag face the same challenge: first finding an event venue, then finding a caterer, negotiating separate contracts, and coordinating multiple schedules.
              </p>
              <p>
                At Chopras Indian Restaurant, the private event hall and catering are managed under one roof, making the planning process simple and convenient. <strong className="text-[#000066] font-medium">One booking. One team. One point of contact.</strong>
              </p>
              <p>
                The private event hall accommodates approximately <strong className="text-[#000066] font-medium">25 to 80 guests</strong> in an exclusive setting. Every dish is prepared by the same team that serves guests daily at Chopras, earning a 4.9-star rating on Google. The result is an event experience built around fresh food, professional hospitality, and authentic Indian cuisine.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <Link href="#book">
                <button className="bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-[#e8c84a] transition-colors shadow-lg hover:shadow-xl">
                  Request a Quote
                </button>
              </Link>
              <Link href="/menu" className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold uppercase tracking-wider text-sm hover:text-[#e8c84a] transition-colors underline underline-offset-4 decoration-[#0000B3]/30">
                See the Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OCCASIONS SLIDER */}
      <OccasionsSlider />


      {/* 5. GALLERY */}
      <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#0000B3]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-transparent text-white font-semibold tracking-widest uppercase text-sm">Our Gallery</span>
            <h2 className="font-heading text-5xl text-white font-medium mt-4">
              Our Captured <em className="text-transparent text-white">Moments</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative h-[300px] rounded-xl overflow-hidden group col-span-1 md:col-span-2">
              <Image src="/images/catering/feez5.jpg" alt="Cuisine" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold tracking-[0.2em] uppercase text-sm border border-white/50 px-6 py-2 rounded-full backdrop-blur-sm">Cuisine</span>
              </div>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden group">
              <Image src="/images/catering/feez4.jpg" alt="Drinks" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold tracking-[0.2em] uppercase text-sm border border-white/50 px-6 py-2 rounded-full backdrop-blur-sm">Drinks</span>
              </div>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden group">
              <Image src="/images/catering/feez2.jpg" alt="Desserts" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold tracking-[0.2em] uppercase text-sm border border-white/50 px-6 py-2 rounded-full backdrop-blur-sm">Desserts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW TO BOOK (4 STEPS) */}
      <section className="relative py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold tracking-widest uppercase text-sm">How To Book</span>
            <h2 className="font-heading text-5xl text-[#000066] font-medium mt-4">
              Four Steps to <em className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] italic">Your Perfect Event</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { n: 1, title: "Get in Touch", desc: "Call +31 6 30645930 or use the form below. Tell us your date and guest count." },
              { n: 2, title: "Free Quote", desc: "We check availability, discuss menu options, and send a no-obligation quote." },
              { n: 3, title: "Build Menu", desc: "Choose from the full Chopras menu — buffet or plated. 100% halal certified." },
              { n: 4, title: "We Do the Rest", desc: "Arrive, relax, celebrate. Our team handles setup, service, and every detail." }
            ].map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line for desktop */}
                {i < 3 && <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] border-t-2 border-dashed border-[#0000B3]/20" />}

                <div className="w-20 h-20 mx-auto bg-[#F7F8FC] border border-[#0000B3]/10 rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-heading text-3xl font-bold">
                  {step.n}
                </div>
                <h3 className="font-heading text-2xl text-[#000066] font-semibold mb-3">{step.title}</h3>
                <p className="text-[#1A1A1A]/70 text-sm font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center text-[#1A1A1A]/60 text-sm font-medium">
            For 25–40 guests: book 2–3 weeks ahead &nbsp;&middot;&nbsp; For 50–80 guests: book 6–8 weeks ahead
          </div>
        </div>
      </section>

      {/* 7. BOOKING FORM & FAQ */}
      <section id="book" className="py-24 px-6 md:px-16 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* FAQ Left Side */}
          <div>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold tracking-widest uppercase text-sm">Support</span>
            <h2 className="font-heading text-4xl text-[#000066] font-medium mt-2 mb-8">
              Frequently Asked <br /><em className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] italic">Questions</em>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-black/5 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-medium text-[#000066] hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] transition-colors"
                  >
                    {faq.q}
                    <span className="text-[#e8c84a] text-xl font-light">{openFaq === i ? '−' : '+'}</span>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold tracking-widest uppercase text-sm">Reserve Your Date</span>
            <h2 className="font-heading text-4xl text-[#000066] font-medium mt-2 mb-8">
              Request A <em className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] italic">Free Quote</em>
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required type="text" placeholder="Your Name *" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-sm" />
                <input required type="email" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-sm" />
                <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-gray-500 text-sm" />
              </div>
              <div className="grid grid-cols-1 gap-6">
                <select required value={guests} onChange={e => setGuests(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-gray-500 text-sm">
                  <option value="">Number of Guests *</option>
                  <option value="25 - 40">25 - 40</option>
                  <option value="40 - 60">40 - 60</option>
                  <option value="60 - 80">60 - 80</option>
                </select>
              </div>
              <textarea placeholder="Tell us about your occasion (Type of event, specific requests)..." rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-[#F7F8FC] border border-black/5 rounded-lg px-6 py-4 focus:outline-none focus:border-[#0000B3] focus:ring-1 focus:ring-[#0000B3] transition-all text-sm"></textarea>

              {status === 'success' && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm text-center font-medium border border-green-200">
                  Thanks for your request! We will get back to you within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm text-center font-medium border border-red-200">
                  Something went wrong. Please try calling us instead at +31 6 30645930.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="w-full bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:bg-[#000066] text-white font-semibold uppercase tracking-widest py-4 rounded-lg shadow-[0_8px_20px_rgba(0,0,255,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,102,0.4)] transition-all duration-300 text-sm flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Request...
                  </>
                ) : 'Get Your Quote '}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-[#1A1A1A]/60 text-sm">Or call us directly at <a href="tel:+31630645930" className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold hover:underline">+31 6 30645930</a></p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}