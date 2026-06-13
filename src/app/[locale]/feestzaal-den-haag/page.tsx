"use client";
import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a1628;
    color: #c8d4e8;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
  }

  .page { background: #0a1628; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6rem 1.5rem 4rem;
    background: radial-gradient(ellipse 80% 60% at 50% 30%, #112240 0%, #0a1628 100%);
    position: relative;
  }
  .hero-eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #5b8cbe;
    margin-bottom: 1.25rem;
  }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 400;
    color: #e8eef7;
    line-height: 1.1;
    margin-bottom: 0.15em;
  }
  .hero h1 em {
    font-style: italic;
    color: #7eb8f0;
  }
  .hero-sub {
    max-width: 420px;
    font-size: 0.95rem;
    color: #7a94b8;
    line-height: 1.7;
    margin: 1.25rem auto 2.5rem;
  }
  .stats-row {
    display: flex;
    gap: 3rem;
    justify-content: center;
    margin-bottom: 2.5rem;
  }
  .stat-item { text-align: center; }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    color: #e8eef7;
    display: block;
    line-height: 1;
  }
  .stat-label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #5b7a9e;
    display: block;
    margin-top: 0.3rem;
  }
  .stars { color: #c9a84c; font-size: 0.75rem; }
  .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: #2563eb;
    color: #fff;
    border: none;
    padding: 0.85rem 2rem;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: #1d4ed8; }
  .btn-ghost {
    background: transparent;
    color: #7eb8f0;
    border: 1px solid #1e3a5f;
    padding: 0.85rem 2rem;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-ghost:hover { border-color: #7eb8f0; color: #c8d4e8; }

  /* ── TRUST BAR ── */
  .trust-bar {
    border-top: 1px solid #1a2e4a;
    border-bottom: 1px solid #1a2e4a;
    padding: 1.25rem 2rem;
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    background: #0d1e35;
  }
  .trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #6a87a8;
  }
  .trust-item .stars { font-size: 0.65rem; }
  .trust-badge {
    font-size: 0.7rem;
    color: #c9a84c;
    letter-spacing: 0.05em;
  }

  /* ── SECTION WRAPPER ── */
  .section { padding: 5rem 1.5rem; max-width: 1100px; margin: 0 auto; }
  .section-full { padding: 5rem 0; }
  .section-center { text-align: center; }
  .eyebrow {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #5b8cbe;
    margin-bottom: 0.75rem;
    display: block;
  }
  .heading-serif {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 400;
    color: #e8eef7;
    line-height: 1.2;
  }
  .heading-serif em {
    font-style: italic;
    color: #7eb8f0;
  }

  /* ── HALL & CATERING ── */
  .hall-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    padding: 5rem 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  @media (max-width: 768px) { .hall-grid { grid-template-columns: 1fr; gap: 2rem; } }
  .hall-img-wrap { position: relative; }
  .hall-img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 2px;
    display: block;
    background: linear-gradient(135deg, #1a3a5c 0%, #0f2240 100%);
  }
  .img-placeholder {
    width: 100%;
    aspect-ratio: 4/3;
    background: linear-gradient(135deg, #1a3a5c 60%, #1e4a7a 100%);
    border-radius: 2px;
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    position: relative;
    overflow: hidden;
  }
  .img-placeholder::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect fill='%23112040' width='100%25' height='100%25'/%3E%3Cellipse cx='40%25' cy='30%25' rx='35%25' ry='40%25' fill='%23193460' opacity='0.6'/%3E%3C/svg%3E") center/cover;
  }
  .img-tag {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background: #2563eb;
    color: #fff;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    border-radius: 1px;
  }
  .img-badge {
    position: absolute;
    bottom: -1rem;
    right: -1rem;
    width: 4.5rem;
    height: 4.5rem;
    background: #2563eb;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #fff;
    text-align: center;
    line-height: 1.3;
  }
  .hall-content { }
  .hall-content p {
    color: #7a94b8;
    font-size: 0.9rem;
    line-height: 1.8;
    margin-top: 1.25rem;
    margin-bottom: 0.9rem;
  }
  .hall-content .btn-primary { margin-top: 1rem; }
  .link-plain {
    color: #5b8cbe;
    font-size: 0.8rem;
    text-decoration: none;
    margin-left: 1.25rem;
    letter-spacing: 0.05em;
    cursor: pointer;
  }
  .link-plain:hover { color: #7eb8f0; }

  /* ── PHOTO GRID ── */
  .photo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 6px;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  .photo-cell {
    aspect-ratio: 1;
    border-radius: 1px;
    overflow: hidden;
    position: relative;
  }
  .photo-cell-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo-bg-1 { background: linear-gradient(135deg, #d4a85c 0%, #e8c47a 40%, #f0d090 100%); }
  .photo-bg-2 { background: linear-gradient(135deg, #1a2e4a 0%, #2a4a6a 100%); }
  .photo-bg-3 { background: linear-gradient(135deg, #3a2010 0%, #6a4020 100%); }
  .photo-bg-4 { background: linear-gradient(135deg, #1a3050 0%, #0a1628 100%); }
  .photo-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  /* ── FEATURES ── */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 3rem;
  }
  @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 500px) { .features-grid { grid-template-columns: 1fr; } }
  .feature-card { text-align: center; }
  .feature-icon {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 auto 1rem;
    background: #112240;
    border: 1px solid #1e3a5f;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  .feature-card h4 {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #c8d4e8;
    margin-bottom: 0.5rem;
  }
  .feature-card p { font-size: 0.78rem; color: #5b7a9e; line-height: 1.7; }

  /* ── EVENTS ── */
  .events-section { background: #0d1e35; }
  .events-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin-top: 2.5rem;
  }
  @media (max-width: 700px) { .events-grid { grid-template-columns: 1fr; } }
  .event-item {
    padding: 1.5rem;
    border: 1px solid #132240;
    position: relative;
  }
  .event-item:hover { background: #112240; }
  .event-num {
    font-size: 0.6rem;
    color: #2563eb;
    letter-spacing: 0.1em;
    margin-bottom: 0.4rem;
    display: block;
    font-weight: 500;
  }
  .event-item h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #e8eef7;
    margin-bottom: 0.5rem;
    font-weight: 400;
  }
  .event-item p { font-size: 0.78rem; color: #5b7a9e; line-height: 1.65; }

  /* ── STEPS ── */
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }
  @media (max-width: 900px) { .steps-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 500px) { .steps-grid { grid-template-columns: 1fr; } }
  .step-card { text-align: center; }
  .step-num {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: 1px solid #1e3a5f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: #7eb8f0;
    margin: 0 auto 0.85rem;
    font-weight: 500;
  }
  .step-card h4 {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    color: #c8d4e8;
    margin-bottom: 0.4rem;
    font-weight: 600;
  }
  .step-card p { font-size: 0.75rem; color: #5b7a9e; line-height: 1.65; }
  .steps-footer { text-align: center; margin-top: 2rem; font-size: 0.75rem; color: #5b7a9e; }

  /* ── FAQ ── */
  .faq-list { margin-top: 2rem; max-width: 680px; }
  .faq-item {
    border-bottom: 1px solid #132240;
    padding: 1.25rem 0;
  }
  .faq-question {
    font-size: 0.88rem;
    color: #c8d4e8;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    padding: 0;
  }
  .faq-question:hover { color: #7eb8f0; }
  .faq-toggle {
    font-size: 1.2rem;
    color: #2563eb;
    line-height: 1;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .faq-toggle.open { transform: rotate(45deg); }
  .faq-answer {
    font-size: 0.82rem;
    color: #5b7a9e;
    line-height: 1.8;
    margin-top: 0.75rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  .faq-answer.open { max-height: 300px; }

  /* ── CTA ── */
  .cta-section {
    background: linear-gradient(180deg, #0a1628 0%, #0d1e35 100%);
    text-align: center;
    padding: 6rem 1.5rem;
    border-top: 1px solid #1a2e4a;
  }
  .cta-section .heading-serif { font-size: clamp(2rem, 5vw, 3.5rem); }
  .cta-section p { color: #5b7a9e; font-size: 0.9rem; margin: 1.25rem auto 2rem; max-width: 440px; line-height: 1.7; }
  .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

  /* ── DIVIDER ── */
  .divider { height: 1px; background: #132240; max-width: 1100px; margin: 0 auto; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .stats-row { gap: 1.5rem; }
    .hall-img-wrap { order: -1; }
    .photo-grid { max-width: 100%; }
    .trust-bar { gap: 1rem; }
  }
`;

const faqs = [
  {
    q: "Can I hire the event hall at Chopras Indian Restaurant?",
    a: "Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag operates a private event hall accommodating 25 to 80 guests. The hall is available for birthdays, weddings, nikah receptions, corporate events, Diwali dinners, and private parties. Full authentic Indian catering from the Chopras kitchen is included.",
  },
  {
    q: "Is catering included with the hall hire?",
    a: "Yes. Full authentic Indian catering from the Chopras kitchen is included. The menu is customised to your occasion, with buffet or plated dinner service available. Everything is prepared fresh on the day by the same team that earns 4.9 stars on Google from 800+ reviews.",
  },
  {
    q: "How many guests does the event hall accommodate?",
    a: "The private event hall accommodates between 25 and 80 guests. This covers intimate family dinners and large wedding or corporate receptions. Contact us with your guest count and we confirm availability and the best setup for your occasion.",
  },
  {
    q: "Is the food fully halal certified?",
    a: "Yes. Every dish at Chopras Indian Restaurant is fully halal certified. Every meat supplier holds halal certification. There is no non-halal meat anywhere on the premises, which means no cross-contamination risk. Muslim families planning any event can book with complete confidence.",
  },
  {
    q: "How far in advance should I book?",
    a: "For events of 25–40 guests, contact us at least 2–3 weeks ahead. For larger weddings and corporate dinners of 50–80 guests, 6–8 weeks ahead is recommended. This gives us time to build the menu and configure the hall exactly as your occasion requires.",
  },
];

const events = [
  {
    num: "01",
    title: "Weddings & Nikah",
    desc: "Buffet with multiple stations or formal plated service. Biryani in large karahi pots, tandoori platters, full vegetarian spread. The format matches the formality of your occasion.",
  },
  {
    num: "02",
    title: "Birthday Parties",
    desc: "Arrive to a hall that's set, food that's ready. Your guests celebrate from the first moment without logistics getting in the way.",
  },
  {
    num: "03",
    title: "Corporate Seminars",
    desc: "A team dinner at Chopras is more memorable than a standard catered meeting room. Your private hall lets the group relax away from a public dining room.",
  },
  {
    num: "04",
    title: "Diwali & Eid Gatherings",
    desc: "Traditional dishes take centre stage — dal makhani, paneer tikka, biryani. Every celebration deserves food prepared with the care the occasion calls for.",
  },
  {
    num: "05",
    title: "Baby Showers",
    desc: "An intimate gathering for the family, styled and catered to the detail. We work with you on menu and layout for a fully personalised experience.",
  },
  {
    num: "06",
    title: "Proposal & Private Dinners",
    desc: "The most important evening deserves a setting that matches it. The private hall can be arranged for an intimate candlelit dinner for two.",
  },
];

export default function EventHallPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
      <style>{styles}</style>
      <main className="page">

        {/* ── HERO ── */}
        <section className="hero">
          <span className="hero-eyebrow">Event Venue · Den Haag</span>
          <h1>
            Your Occasion,<br />
            <em>Perfectly Arranged</em>
          </h1>
          <p className="hero-sub">
       Private event hall with authentic Indian catering under one roof   </p>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">25–350</span>
              <span className="stat-label">Guests</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">
                4.9 <span className="stars">★★★★★</span>
              </span>
              <span className="stat-label">Customer Rating · 180+ reviews</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Exclusive Hire Available</span>
            </div>
          </div>
          <div className="hero-btns">
            <a href="/contact">
            <button className="btn-primary">Request a Free Quote</button>
            </a>
            <a href="/menu">
              <button className="btn-ghost">View the Menu</button>
            </a>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="trust-bar">
          <div className="trust-item">
            <span className="stars">★★★★★</span>
            <span><span className="!text-white">4.9 / 5</span> on Google · 800+ reviews</span>
          </div>
          <div className="trust-item">
            <span className="trust-badge">★★★★★</span>
            <span>Reviewed on  <span className="!text-white">TripAdvisor</span></span>
          </div>
          <div className="trust-item">
            <span><span className="!text-white">📞 +31 6 30645930</span> — WhatsApp available</span>
          </div>
          
        </div>

        {/* ── HALL & CATERING ── */}
        <div className="hall-grid">
          <div className="hall-img-wrap">
            <div className="img-placeholder" style={{ minHeight: 320, position: 'relative', overflow: 'hidden' }}>
              <span className="img-tag" style={{ zIndex: 2 }}>Now Booking</span>

              {/* Replaced SVG with actual image */}
              <img
                src="/images/catering/feez12.jpg"
                alt="Hall Venue"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1
                }}
              />

              <div className="img-badge" style={{ zIndex: 2 }}>
                All<br />In<br />One
              </div>
            </div>
          </div>
          <div className="hall-content">
            <span className="eyebrow">Our Venue</span>
            <h2 className="heading-serif">
              Hall &amp; Catering<br /><em>Under One Roof</em>
            </h2>
            <p>
           Most people planning a feestzaal in Den Haag face the same problem — find a room, then find a caterer, negotiate two contracts, manage two schedules. At Chopras Indian Restaurant, the event hall and the kitchen are a single operation. You make one call. Everything is handled. </p>
            <p>
           The private hall seats 25 to 80 guests entirely privately. From an intimate nikah reception to a corporate dinner, that range covers everything. The food is prepared by the same chefs who earn 4.9 stars on Google from 800+ reviewers every week. </p>
            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn-primary" ><a href="/contact">Request a Quote</a></button>
              <a className="link-plain" href="/menu">See the Menu</a>
            </div>
          </div>
        </div>

        {/* ── PHOTO GRID ── */}
        <div className="section-full" style={{ background: '#0d1e35', padding: '3rem 1.5rem' }}>
          <div className="photo-grid">
          
              <div className="photo-cell" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/images/catering/feez2.jpg"
                  alt="Cuisine"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                />
                <div className="photo-label" style={{ position: 'relative', zIndex: 2 }}>Cuisine</div>
              </div>

              <div className="photo-cell" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                src="/images/catering/feez4.jpg"
                  alt="Drinks"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                />
                <div className="photo-label" style={{ position: 'relative', zIndex: 2 }}>Drinks</div>
              </div>

              <div className="photo-cell" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/images/catering/feez5.jpg"
                  alt="Desserts"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                />
                <div className="photo-label" style={{ position: 'relative', zIndex: 2 }}>Desserts</div>
              </div>

              <div className="photo-cell" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/images/catering/feez8.jpg"
                  alt="Venue"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                />
                <div className="photo-label" style={{ position: 'relative', zIndex: 2 }}>Venue</div>
              </div>
       
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div style={{ background: '#0a1628', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow">What We Offer</span>
            <h2 className="heading-serif">
              Everything Your<br /><em>Event Deserves</em>
            </h2>
            <div className="features-grid">
              {[
                { icon: "🍽", title: "Restaurant Quality", desc: "Freshly ground spices sourced direct from India. Same chefs, same recipes as the restaurant that earns 4.9 stars nightly." },
                { icon: "🏛", title: "One Booking", desc: "Venue, catering, and service in a single contract. No separate caterer. No double logistics. One point of contact." },
                { icon: "☪️", title: "Every dish, every supplier, every preparation is halal certified. No exceptions, no cross-contamination. Book with complete confidence." },
                { icon: "👥", title: "25–80 Guests", desc: "Intimate family dinner or large wedding reception. The private hall adapts to your group size with no fixed minimum packages." },
              ].map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon !text-white">{f.icon}</div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── EVERY CELEBRATION ── */}
        <div className="events-section" style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span className="eyebrow">Occasions</span>
            <h2 className="heading-serif">
              Every Celebration<br /><em>Welcomed Here</em>
            </h2>
            <div className="events-grid">
              {events.map((e) => (
                <div className="event-item" key={e.num}>
                  <span className="event-num">{e.num}</span>
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STEPS ── */}
        <div style={{ background: '#0a1628', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow">How To Book</span>
            <h2 className="heading-serif">
              Four Steps to<br /><em>Your Perfect Event</em>
            </h2>
            <div className="steps-grid">
              {[
                { n: 1, title: "Get in Touch", desc: "Call +31 6 30645930 or use the contact page. Tell us your date, guest count, and occasion type." },
                { n: 2, title: "Free Quote & Visit", desc: "We check availability, discuss menu options, and send a no-obligation quote within 24 hours." },
                { n: 3, title: "Build the Menu", desc: "Choose from the full Chopras menu — buffet or plated. Every dietary need covered, 100% halal." },
                { n: 4, title: "We do the Rest", desc: "Arrive, relax, celebrate. Our team handles setup, service, and every detail so you can be present." },
              ].map((s) => (
                <div className="step-card" key={s.n}>
                  <div className="step-num">{s.n}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="steps-footer">
           For 25–40 guests: book 2–3 weeks ahead  ·  For 50–80 guests: book 6–8 weeks ahead

 </p>
 <a href="/contact">
            <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
             Request Your Free Quote
            </button>
            </a>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ background: '#0d1e35', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span className="eyebrow">Support</span>
            <h2 className="heading-serif">
              Frequently Asked<br /><em>Questions</em>
            </h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div className="faq-item" key={i}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <span className={`faq-toggle ${openFaq === i ? 'open' : ''}`}>+</span>
                  </button>
                  <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="cta-section">
          <span className="eyebrow">Reserve Your Date</span>
          <h2 className="heading-serif">
            Ready to Book Your<br /><em>Event Hall in Den Haag?</em>
          </h2>
          <p>
       Contact us today and receive a free quote within 24 hours. Open Tuesday to Sunday at Leyweg 986, Den Haag.   </p>
          <div className="cta-btns">
            <a href="/contact">
              <button className="btn-primary">Request A Quote</button>
            </a>
            <a href="tel:+31630645930">
              <button className="btn-ghost">Call +31 6 30645930</button>
            </a>
          </div>
        </section>

      </main>
    </>
  );
}