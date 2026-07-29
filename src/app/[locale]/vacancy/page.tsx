"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import AnimatedContent from "@/components/ui/AnimatedContent";

export default function VacancyPage({ params }: { params: { locale: string } }) {
  const isNl = params?.locale === "nl";
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleJob = (jobId: string) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
      setTimeout(() => {
        document.getElementById("expandedContainer")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // determine job title based on the expanded section ID or state
    // We already have 'expandedJob' in scope! We can map it.
    const jobTitles: Record<string, string> = {
      waiter: 'Waiter / Waitress',
      cleaner: 'Kitchen Cleaning Medewerker',
      delivery: 'Delivery Executive',
      cook: 'Independent Working Cook',
      internship: 'Internship Program'
    };
    const title = expandedJob ? jobTitles[expandedJob] : 'Unknown Job';
    formData.append('jobTitle', title);

    try {
      const res = await fetch('/api/vacancy', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSubmitMessage({ type: 'success', text: '✅ Application submitted! We will contact you soon.' });
        form.reset();
      } else {
        setSubmitMessage({ type: 'error', text: '❌ Failed to submit. Please try again.' });
      }
    } catch (err) {
      setSubmitMessage({ type: 'error', text: '❌ An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <style>{`
        /* card hover lift */
        .job-card {
          transition: transform 0.25s ease, box-shadow 0.3s ease;
        }
        .job-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
        }

        /* expanded content smooth reveal */
        .expanded-content {
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* form input focus */
        .form-input:focus {
          outline: none;
          ring: 2px solid #06068a;
          border-color: #06068a;
        }

        /* subtle grain overlay */
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* badge pulse */
        @keyframes pulse-soft {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .badge-pulse {
          animation: pulse-soft 2s infinite;
        }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center text-white">
        {/* Banner Images (Responsive) */}
        <Image src="/vacancy/banner1.png?v=2" alt="Chopras Vacancies Desktop" fill priority className="object-cover hidden md:block brightness-105" />
        <Image src="/vacancy/banner2.png?v=2" alt="Chopras Vacancies Mobile" fill priority className="object-cover block md:hidden brightness-105" />
        {/* Subtle clear overlay */}
        <div className="absolute inset-0 bg-black/15"></div>

        <div className="relative w-full max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
          <div className="max-w-2xl">
            {/* Hiring Badge */}
            <AnimatedContent distance={20} duration={0.8} delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-semibold text-white border border-white/20 shadow-lg mb-6">
                {/* <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                </span> */}
                We're hiring
              </div>
            </AnimatedContent>

            {/* Heading */}
            <AnimatedContent distance={30} duration={0.8} delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight font-heading drop-shadow-xl text-white">
                {/* Join the <span className="">Chopras</span> family */}
                {isNl ? "Word onderdeel van de" : "Join the"} <span className="">Chopras</span> {isNl ? "Familie" : "Family"}
              </h1>
            </AnimatedContent>

            {/* Subtitle */}
            <AnimatedContent distance={30} duration={0.8} delay={0.3}>
              <p className="mt-6 text-lg sm:text-xl text-white/95 max-w-xl leading-relaxed font-body drop-shadow-md font-medium">
                {isNl ? (
                  <>Heb je een passie voor de Indiase keuken en het creëren van onvergetelijke gastervaringen? We zijn altijd op zoek naar enthousiast talent om deel uit te maken van ons warme, multiculturele team in Den Haag.</>
                ) : (
                  <>Are you passionate about Indian cuisine and creating memorable dining experiences? We are always looking for enthusiastic talent to become part of a warm, multicultural team in The Hague.</>
                )}
              </p>
            </AnimatedContent>

            {/* Badges */}
            <AnimatedContent distance={30} duration={0.8} delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium text-white border border-white/20 shadow-sm transition hover:bg-white/20">
                  🍛 Den Haag
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium text-white border border-white/20 shadow-sm transition hover:bg-white/20">
                  ⏳ Full‑time &amp; part‑time
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium text-white border border-white/20 shadow-sm transition hover:bg-white/20">
                  🌍 Multicultural
                </span>
              </div>
            </AnimatedContent>
          </div>
        </div>

        {/* decorative curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#F7F8FC] rounded-t-[40px] md:rounded-t-[60px] z-10"></div>
      </section>

      {/* ===== VACANCIES GRID ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <AnimatedContent distance={40} direction="vertical" duration={0.8}>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#06068a] font-heading">
              {isNl ? "Ontdek onze" : "Explore our"} <span className="">{isNl ? "vacatures" : "vacancies"}</span>
            </h2>
            <p className="mt-2 text-[#1A1A1A]/60 max-w-2xl mx-auto">{isNl ? "Klik op een kaart om de volledige vacature te bekijken en direct te solliciteren." : "Click on any card to view the full job description and apply directly."}</p>
          </div>
        </AnimatedContent>

        {/* Cards Grid */}
        <div id="jobsGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ====== CARD: Waiter ====== */}
          <AnimatedContent delay={0.1} distance={40} direction="vertical" duration={0.8} className="h-full">
            <div
              className="job-card bg-white h-full flex flex-col rounded-3xl shadow-lg shadow-[#06068a]/5 border border-[#06068a]/10 overflow-hidden cursor-pointer group transition-all"
              onClick={() => toggleJob("waiter")}
            >
              <div className="h-48 relative flex items-center justify-center overflow-hidden bg-[#06068a]">
                <div className="absolute inset-0 bg-white"></div>
                <Image src="/vacancy/Waitress.png?v=9" alt="Waiter / Waitress" fill className="object-contain transition-transform duration-500 group-hover:scale-105 brightness-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06068a]/60 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full border border-white/20 z-10">{isNl ? "Bediening" : "Service"}</span>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-white font-heading z-10 drop-shadow-md">
                  Waiter / Waitress
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[#1A1A1A]/60 text-sm">Chopras Indian Restaurant</p>
                  <span className="bg-[#06068a]/10 text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2">{isNl ? "Fulltime & Parttime" : "Full‑time & Part‑time"}</span>
                </div>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed line-clamp-2">
                  {isNl ? "Enthousiaste, klantgerichte service professional. Begroet gasten, neem bestellingen op en creëer onvergetelijke gastervaringen." : "Enthusiastic, customer‑oriented service professional. Greet guests, take orders, and create memorable dining experiences."}
                </p>
                <div className="mt-4 flex items-center justify-center border-t border-[#06068a]/10 pt-4">
                  <span className="text-sm font-medium text-[#06068a] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">{isNl ? "Bekijk details →" : "View details →"}</span>
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* ====== CARD: Kitchen Cleaner ====== */}
          <AnimatedContent delay={0.2} distance={40} direction="vertical" duration={0.8} className="h-full">
            <div
              className="job-card bg-white h-full flex flex-col rounded-3xl shadow-lg shadow-[#06068a]/5 border border-[#06068a]/10 overflow-hidden cursor-pointer group transition-all"
              onClick={() => toggleJob("cleaner")}
            >
              <div className="h-48 relative flex items-center justify-center overflow-hidden bg-[#06068a]">
                <div className="absolute inset-0 bg-white"></div>
                <Image src="/vacancy/Kitchen cleaning medeworker.png?v=9" alt="Kitchen Cleaner" fill className="object-contain transition-transform duration-500 group-hover:scale-105 brightness-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06068a]/60 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full border border-white/20 z-10">{isNl ? "Hygiëne" : "Hygiene"}</span>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-white font-heading z-10 drop-shadow-md leading-tight">
                  Kitchen Cleaning
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[#1A1A1A]/60 text-sm">Chopras Indian Restaurant</p>
                  <span className="bg-[#06068a]/10 text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2">{isNl ? "Parttime" : "Part‑time"}</span>
                </div>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed line-clamp-2">
                  {isNl ? "Houd onze keuken en restaurant brandschoon. Afwassen, oppervlakken desinfecteren en het team ondersteunen." : "Keep our kitchen and restaurant spotless. Wash dishes, sanitize surfaces, and support the team."}
                </p>
                <div className="mt-4 flex items-center justify-center border-t border-[#06068a]/10 pt-4">
                  <span className="text-sm font-medium text-[#06068a] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">{isNl ? "Bekijk details →" : "View details →"}</span>
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* ====== CARD: Delivery ====== */}
          <AnimatedContent delay={0.3} distance={40} direction="vertical" duration={0.8} className="h-full">
            <div
              className="job-card bg-white h-full flex flex-col rounded-3xl shadow-lg shadow-[#06068a]/5 border border-[#06068a]/10 overflow-hidden cursor-pointer group transition-all"
              onClick={() => toggleJob("delivery")}
            >
              <div className="h-48 relative flex items-center justify-center overflow-hidden bg-[#06068a]">
                <div className="absolute inset-0 bg-white"></div>
                <Image src="/vacancy/delivery.png?v=9" alt="Delivery Executive" fill className="object-contain transition-transform duration-500 group-hover:scale-105 brightness-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06068a]/60 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full border border-white/20 z-10">{isNl ? "Bezorging" : "Delivery"}</span>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-white font-heading z-10 drop-shadow-md leading-tight">
                  Delivery Executive
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[#1A1A1A]/60 text-sm">Chopras Indian Restaurant</p>
                  <span className="bg-[#06068a]/10 text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2">{isNl ? "Flexibel" : "Flexible"}</span>
                </div>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed line-clamp-2">
                  {isNl ? "Betrouwbare en punctuele chauffeur. Bezorg bestellingen veilig, controleer details en vertegenwoordig Chopras met een glimlach." : "Reliable and punctual driver. Deliver orders safely, verify details, and represent Chopras with a smile."}
                </p>
                <div className="mt-4 flex items-center justify-center border-t border-[#06068a]/10 pt-4">
                  <span className="text-sm font-medium text-[#06068a] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">{isNl ? "Bekijk details →" : "View details →"}</span>
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* ====== CARD: Independent Cook ====== */}
          <AnimatedContent delay={0.4} distance={40} direction="vertical" duration={0.8} className="h-full">
            <div
              className="job-card bg-white h-full flex flex-col rounded-3xl shadow-lg shadow-[#06068a]/5 border border-[#06068a]/10 overflow-hidden cursor-pointer group transition-all"
              onClick={() => toggleJob("cook")}
            >
              <div className="h-48 relative flex items-center justify-center overflow-hidden bg-[#06068a]">
                <div className="absolute inset-0 bg-white"></div>
                <Image src="/vacancy/Cooks cooking - 1.png?v=9" alt="Independent Working Cook" fill className="object-contain transition-transform duration-500 group-hover:scale-105 brightness-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06068a]/60 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full border border-white/20 z-10">{isNl ? "Keuken" : "Kitchen"}</span>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-white font-heading z-10 drop-shadow-md leading-tight">
                  Independent Working Cook
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[#1A1A1A]/60 text-sm">Chopras Indian Restaurant</p>
                  <span className="bg-[#06068a]/10 text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2">{isNl ? "Fulltime" : "Full‑time"}</span>
                </div>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed line-clamp-2">
                  {isNl ? "MBO niveau 3 kok. Bereid authentieke Indiase gerechten, beheer mise-en-place en groei met ons mee. Training inbegrepen." : "MBO level 3 cook. Prepare authentic Indian dishes, manage mise‑en‑place, and grow with us. Training provided."}
                </p>
                <div className="mt-4 flex items-center justify-center border-t border-[#06068a]/10 pt-4">
                  <span className="text-sm font-medium text-[#06068a] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">{isNl ? "Bekijk details →" : "View details →"}</span>
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* ====== CARD: Internship ====== */}
          <AnimatedContent delay={0.5} distance={40} direction="vertical" duration={0.8} className="h-full">
            <div
              className="job-card bg-white h-full flex flex-col rounded-3xl shadow-lg shadow-[#06068a]/5 border border-[#06068a]/10 overflow-hidden cursor-pointer group transition-all"
              onClick={() => toggleJob("internship")}
            >
              <div className="h-48 relative flex items-center justify-center overflow-hidden bg-[#06068a]">
                <div className="absolute inset-0 bg-white"></div>
                <Image src="/vacancy/Internship opportunities.png?v=9" alt="Internship Program" fill className="object-contain transition-transform duration-500 group-hover:scale-105 brightness-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06068a]/60 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full border border-white/20 z-10">{isNl ? "Stage" : "Internship"}</span>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-white font-heading z-10 drop-shadow-md leading-tight">
                  Internship Program
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[#1A1A1A]/60 text-sm">Chopras Indian Restaurant</p>
                  <span className="bg-[#06068a]/10 text-[#06068a] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2">{isNl ? "Flexibel" : "Flexible"}</span>
                </div>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed line-clamp-2">
                  {isNl ? "Krijg praktijkervaring in hospitality, marketing, operations en F&B management in een internationale setting." : "Gain real-world skills in hospitality, marketing, operations, and F&B management in an international setting."}
                </p>
                <div className="mt-4 flex items-center justify-center border-t border-[#06068a]/10 pt-4">
                  <span className="text-sm font-medium text-[#06068a] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">{isNl ? "Bekijk details →" : "View details →"}</span>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* ===== EXPANDED DETAILS ===== */}
      <div id="expandedContainer" className="max-w-4xl mx-auto px-6 pb-20">

        {/* ===== WAITER ===== */}
        {expandedJob === "waiter" && (
          <div
            id="waiter-expanded"
            className="expanded-content bg-white rounded-3xl shadow-2xl shadow-[#06068a]/10 border border-[#06068a]/10 overflow-hidden"
          >
            <div className="bg-[#06068a] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white font-heading">Waiter / Waitress</h3>
              </div>
              <button
                onClick={() => toggleJob("waiter")}
                className="text-white/70 hover:text-white transition text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Type" : "Type"}</span>
                  <span className="font-semibold text-[#1A1A1A]">{isNl ? "Fulltime & Parttime" : "Full‑time & Part‑time"}</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Locatie" : "Location"}</span>
                  <span className="font-semibold text-[#1A1A1A]">Den Haag</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">Start</span>
                  <span className="font-semibold text-[#1A1A1A]">ASAP</span>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-[#1A1A1A]/80">
                <p className="font-medium text-base">
                  {isNl ? "We zijn op zoek naar enthousiaste en klantgerichte obers/serveersters om ons team bij Chopras Indiaas restaurant in Den Haag te versterken. Je bent het gezicht van onze service en zorgt ervoor dat elke gast zich welkom voelt en geniet van een onvergetelijke gastervaring." : "We are looking for enthusiastic and customer-oriented Waiters/Waitresses to join our team at Chopras Indian restaurant in Den Haag. You will be the face of our service, ensuring that every guest feels welcome and enjoys a memorable dining experience."}
                </p>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">{isNl ? "Verantwoordelijkheden" : "Responsibilities"}</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Gasten op een vriendelijke en professionele manier begroeten en placeren</li>
                      <li>Nauwkeurig opnemen van bestellingen voor eten en drinken</li>
                      <li>Tijdig serveren van gerechten en drankjes</li>
                      <li>Uitleg geven over menu-items en aanbevelingen doen</li>
                      <li>Schoonhouden van tafels en het restaurantgedeelte</li>
                      <li>Afhandelen van betalingen en verwerken van rekeningen</li>
                      <li>Afstemmen met keukenpersoneel voor een soepele service</li>
                      <li>Helpen bij het inpakken van afhaalbestellingen</li>
                      <li>Coördineren met bezorgers om tijdige verzending van bestellingen te garanderen</li>
                    </>
                  ) : (
                    <>
                      <li>Greeting and seating guests in a friendly and professional manner</li>
                      <li>Taking food and beverage orders accurately</li>
                      <li>Serving dishes and drinks in a timely manner</li>
                      <li>Explaining menu items and making recommendations</li>
                      <li>Maintaining cleanliness of tables and dining area</li>
                      <li>Handling payments and processing bills</li>
                      <li>Coordinating with kitchen staff for smooth service</li>
                      <li>Assisting with packaging of takeaway orders</li>
                      <li>Coordinating with delivery drivers to ensure timely dispatch of orders</li>
                    </>
                  )}
                </ul>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                  {isNl ? "Wat wij bieden" : "What We Offer"}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Competitief salaris</li>
                      <li>Personeelsmaaltijden tijdens diensten</li>
                      <li>Flexibele werktijden</li>
                      <li>Een vriendelijke, multiculturele teamomgeving</li>
                      <li>Mogelijkheden om te leren over authentieke Indiase keuken en gastvrijheid</li>
                    </>
                  ) : (
                    <>
                      <li>Competitive salary</li>
                      <li>Staff meals during shifts</li>
                      <li>Flexible working hours</li>
                      <li>A friendly, multicultural team environment</li>
                      <li>Opportunities to learn about authentic Indian cuisine and hospitality</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="mt-8 border-t border-[#06068a]/10 pt-6">
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mb-4">{isNl ? "Solliciteer voor deze functie" : "Apply for this position"}</h4>
                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Volledige Naam *" : "Full Name *"}</label>
                    <input type="text" name="fullName" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Priya Sharma" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Telefoonnummer *" : "Phone Number *"}</label>
                    <input type="tel" name="phone" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="+31 6 12345678" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "E-mailadres" : "Email Address"}</label>
                    <input type="email" name="email" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. priya@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Opleiding" : "Education Qualification"}</label>
                    <input type="text" name="education" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. MBO Hospitality, Bachelor's degree" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Interessegebied" : "Area of Interest"}</label>
                    <input type="text" name="interest" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Fine dining, Indian cuisine, Customer service" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "CV toevoegen *" : "Attach Resume / CV *"}</label>
                    <input type="file" name="resume" required accept=".pdf,.doc,.docx" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2 text-sm bg-[#F7F8FC] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#06068a]/10 file:text-[#06068a] hover:file:bg-[#06068a]/20" />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#06068a] hover:bg-[#06068a] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-[#06068a]/20">{isSubmitting ? isNl ? "Bezig met indienen..." : "Submitting..." : isNl ? "Sollicitatie indienen →" : "Submit Application →"}</button>
                    {submitMessage && <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${submitMessage.type === "success" ? "bg-emerald-100 text-emerald-1100" : "bg-red-100 text-red-1100"}`}>{submitMessage.text}</div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===== CLEANER ===== */}
        {expandedJob === "cleaner" && (
          <div
            id="cleaner-expanded"
            className="expanded-content bg-white rounded-3xl shadow-2xl shadow-[#06068a]/10 border border-[#06068a]/10 overflow-hidden"
          >
            <div className="bg-[#06068a] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white font-heading">Kitchen Cleaning Medewerker</h3>
              </div>
              <button
                onClick={() => toggleJob("cleaner")}
                className="text-white/70 hover:text-white transition text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Type" : "Type"}</span>
                  <span className="font-semibold text-[#1A1A1A]">{isNl ? "Parttime" : "Part‑time"}</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Locatie" : "Location"}</span>
                  <span className="font-semibold text-[#1A1A1A]">Den Haag</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">Hours</span>
                  <span className="font-semibold text-[#1A1A1A]">{isNl ? "Flexibel" : "Flexible"}</span>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-[#1A1A1A]/80">
                <p className="font-medium text-base">
                  {isNl ? "We zijn op zoek naar een betrouwbare en hardwerkende Kitchen Cleaning Medewerker om het Chopras Indiaas restaurant en de keukenactiviteiten te ondersteunen. Je speelt een belangrijke rol bij het schoon, hygiënisch en georganiseerd houden van zowel de keuken als het restaurant, terwijl je ook helpt met het inpakken van afhaalmaaltijden en de coördinatie van de bezorging." : "We are seeking a reliable and hardworking Kitchen Cleaning Medewerker to support Chopras Indian restaurant and kitchen operations. You will play an important role in keeping both the kitchen and the restaurant clean, hygienic, and well-organized, while also assisting with takeaway packaging and delivery coordination."}
                </p>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">{isNl ? "Verantwoordelijkheden" : "Responsibilities"}</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Afwassen van borden, bestek en keukenapparatuur</li>
                      <li>Schoonhouden van keukenoppervlakken, vloeren en opslagruimtes</li>
                      <li>Regelmatig schoonmaken en desinfecteren van toiletten en badkamers</li>
                      <li>Schoonmaken van restaurantvloeren, tafels en gastenruimtes</li>
                      <li>Handhaven van hoge hygiëne- en veiligheidsnormen in het hele restaurant</li>
                      <li>Afval correct en veilig weggooien</li>
                      <li>Koks assisteren bij basistaken in de keuken indien nodig</li>
                      <li>Helpen bij het inpakken van afhaal- en bezorgbestellingen</li>
                      <li>Coördineren met bezorgers voor een correcte en tijdige verzending</li>
                    </>
                  ) : (
                    <>
                      <li>Washing dishes, utensils, and kitchen equipment</li>
                      <li>Keeping kitchen surfaces, floors, and storage areas clean</li>
                      <li>Cleaning and sanitizing toilets and bathrooms regularly</li>
                      <li>Cleaning restaurant floors, tables, and customer areas</li>
                      <li>Maintaining high standards of hygiene and sanitation across the restaurant</li>
                      <li>Disposing of waste properly and safely</li>
                      <li>Assisting chefs with basic kitchen tasks when required</li>
                      <li>Helping with packaging of takeaway and delivery orders</li>
                      <li>Coordinating with delivery drivers to ensure correct and timely dispatch</li>
                    </>
                  )}
                </ul>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                  {isNl ? "Wat wij bieden" : "What We Offer"}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Competitief salaris</li>
                      <li>Personeelsmaaltijden tijdens diensten</li>
                      <li>Stabiel werk in een professionele restaurantomgeving</li>
                      <li>Ondersteunend en multicultureel team</li>
                      <li>Flexibele werktijden</li>
                      <li>Mogelijkheden om meer te leren over de authentieke Indiase keuken en gastvrijheid</li>
                    </>
                  ) : (
                    <>
                      <li>Competitive salary</li>
                      <li>Staff meals during shifts</li>
                      <li>Stable work in a professional restaurant environment</li>
                      <li>Supportive and multicultural team</li>
                      <li>Flexible working hours</li>
                      <li>Opportunities to learn about authentic Indian cuisine and hospitality</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="mt-8 border-t border-[#06068a]/10 pt-6">
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mb-4">{isNl ? "Solliciteer voor deze functie" : "Apply for this position"}</h4>
                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Volledige Naam *" : "Full Name *"}</label>
                    <input type="text" name="fullName" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Raj Patel" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Telefoonnummer *" : "Phone Number *"}</label>
                    <input type="tel" name="phone" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="+31 6 12345678" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "E-mailadres" : "Email Address"}</label>
                    <input type="email" name="email" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. raj@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Opleiding" : "Education Qualification"}</label>
                    <input type="text" name="education" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. MBO, VMBO, or equivalent" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Interessegebied" : "Area of Interest"}</label>
                    <input type="text" name="interest" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Hygiene, Kitchen operations" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "CV toevoegen *" : "Attach Resume / CV *"}</label>
                    <input type="file" name="resume" required accept=".pdf,.doc,.docx" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2 text-sm bg-[#F7F8FC] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#06068a]/10 file:text-[#06068a] hover:file:bg-[#06068a]/20" />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#06068a] hover:bg-[#06068a] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-[#06068a]/20">{isSubmitting ? isNl ? "Bezig met indienen..." : "Submitting..." : isNl ? "Sollicitatie indienen →" : "Submit Application →"}</button>
                    {submitMessage && <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${submitMessage.type === "success" ? "bg-emerald-100 text-emerald-1100" : "bg-red-100 text-red-1100"}`}>{submitMessage.text}</div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===== DELIVERY ===== */}
        {expandedJob === "delivery" && (
          <div
            id="delivery-expanded"
            className="expanded-content bg-white rounded-3xl shadow-2xl shadow-[#06068a]/10 border border-[#06068a]/10 overflow-hidden"
          >
            <div className="bg-[#06068a] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white font-heading">Delivery Executive</h3>
              </div>
              <button
                onClick={() => toggleJob("delivery")}
                className="text-white/70 hover:text-white transition text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Type" : "Type"}</span>
                  <span className="font-semibold text-[#1A1A1A]">{isNl ? "Flexibel" : "Flexible"}</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Locatie" : "Location"}</span>
                  <span className="font-semibold text-[#1A1A1A]">Den Haag</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">License</span>
                  <span className="font-semibold text-[#1A1A1A]">Preferred</span>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-[#1A1A1A]/80">
                <p className="font-medium text-base">
                  {isNl ? "We zijn op zoek naar een betrouwbare, punctuele en klantvriendelijke bezorgmedewerker om ons team bij Chopras Indiaas Restaurant te versterken. De ideale kandidaat is verantwoordelijk voor de tijdige en nauwkeurige bezorging van bestellingen, met behoud van uitstekende klantenservice en een professionele vertegenwoordiging van het restaurant. Kandidaten met een rijbewijs en kennis van lokale routes hebben een streepje voor." : "We are seeking a reliable, punctual, and customer-friendly Delivery Executive to join Chopras Indian Restaurant. The ideal candidate will be responsible for ensuring timely and accurate delivery of food orders while maintaining excellent customer service and representing the restaurant professionally. Candidates with a driving license and knowledge of local routes will have an added advantage."}
                </p>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">{isNl ? "Verantwoordelijkheden" : "Responsibilities"}</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Voedselbestellingen veilig en op tijd bij klanten bezorgen</li>
                      <li>Bestelgegevens verifiëren voor verzending en bezorging</li>
                      <li>Afstemmen met keukenpersoneel om ervoor te zorgen dat bestellingen compleet en accuraat zijn</li>
                      <li>Contant geld innen of betalingen verwerken indien nodig</li>
                      <li>Zorgen voor netheid en basisonderhoud van het bezorgvoertuig/fiets</li>
                      <li>Te allen tijde de verkeersregels en veiligheidsvoorschriften volgen</li>
                      <li>Helpen bij het inpakken en voorbereiden van afhaalbestellingen indien nodig</li>
                      <li>Professioneel communiceren met klanten en restaurantpersoneel</li>
                      <li>Bezorgproblemen, vertragingen of feedback van klanten melden aan het management</li>
                      <li>Zorgen voor een positieve klantervaring tijdens elke bezorging</li>
                    </>
                  ) : (
                    <>
                      <li>Deliver food orders safely and on time to customers</li>
                      <li>Verify order details before dispatch and delivery</li>
                      <li>Coordinate with kitchen staff to ensure orders are complete and accurate</li>
                      <li>Collect cash or process payments when required</li>
                      <li>Maintain cleanliness and basic upkeep of the delivery vehicle/bike</li>
                      <li>Follow traffic rules and safety regulations at all times</li>
                      <li>Assist with packaging and preparing takeaway orders when needed</li>
                      <li>Communicate professionally with customers and restaurant staff</li>
                      <li>Report delivery issues, delays, or customer feedback to manage</li>
                      <li>Ensure a positive customer experience during every delivery</li>
                    </>
                  )}
                </ul>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                  {isNl ? "Wat wij bieden" : "What We Offer"}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Competitief salaris</li>
                      <li>Bezorgtoeslagen en prestatiebonussen (indien van toepassing)</li>
                      <li>Personeelsmaaltijden tijdens diensten</li>
                      <li>Stabiel werk in een professionele restaurantomgeving</li>
                      <li>Ondersteunend en multicultureel team</li>
                      <li>Flexibele werktijden</li>
                      <li>Mogelijkheden voor loopbaangroei binnen de horeca</li>
                    </>
                  ) : (
                    <>
                      <li>Competitive salary</li>
                      <li>Delivery allowances and performance incentives (if applicable)</li>
                      <li>Staff meals during shifts</li>
                      <li>Stable work in a professional restaurant environment</li>
                      <li>Supportive and multicultural team</li>
                      <li>Flexible working hours</li>
                      <li>Opportunities for career growth within the hospitality industry</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="mt-8 border-t border-[#06068a]/10 pt-6">
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mb-4">{isNl ? "Solliciteer voor deze functie" : "Apply for this position"}</h4>
                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Volledige Naam *" : "Full Name *"}</label>
                    <input type="text" name="fullName" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Arjun Singh" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Telefoonnummer *" : "Phone Number *"}</label>
                    <input type="tel" name="phone" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="+31 6 12345678" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "E-mailadres" : "Email Address"}</label>
                    <input type="email" name="email" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. arjun@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Opleiding" : "Education Qualification"}</label>
                    <input type="text" name="education" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. MBO, HBO, or equivalent" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Interessegebied" : "Area of Interest"}</label>
                    <input type="text" name="interest" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Delivery, Customer service, Logistics" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "CV toevoegen *" : "Attach Resume / CV *"}</label>
                    <input type="file" name="resume" required accept=".pdf,.doc,.docx" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2 text-sm bg-[#F7F8FC] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#06068a]/10 file:text-[#06068a] hover:file:bg-[#06068a]/20" />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#06068a] hover:bg-[#06068a] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-[#06068a]/20">{isSubmitting ? isNl ? "Bezig met indienen..." : "Submitting..." : isNl ? "Sollicitatie indienen →" : "Submit Application →"}</button>
                    {submitMessage && <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${submitMessage.type === "success" ? "bg-emerald-100 text-emerald-1100" : "bg-red-100 text-red-1100"}`}>{submitMessage.text}</div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===== COOK ===== */}
        {expandedJob === "cook" && (
          <div
            id="cook-expanded"
            className="expanded-content bg-white rounded-3xl shadow-2xl shadow-[#06068a]/10 border border-[#06068a]/10 overflow-hidden"
          >
            <div className="bg-[#06068a] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white font-heading">Independent Working Cook</h3>
              </div>
              <button
                onClick={() => toggleJob("cook")}
                className="text-white/70 hover:text-white transition text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#F7F8FC] rounded-xl p-3 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">Contract</span>
                  <span className="font-semibold text-[#1A1A1A] text-sm">Temporary</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-3 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">Hours</span>
                  <span className="font-semibold text-[#1A1A1A] text-sm">38 / week</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-3 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Salaris" : "Salary"}</span>
                  <span className="font-semibold text-[#1A1A1A] text-sm">€2.700 – €3.700</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-3 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">Start</span>
                  <span className="font-semibold text-[#1A1A1A] text-sm">01‑04‑2026</span>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-[#1A1A1A]/80">
                <p className="font-medium text-base">
                  {isNl ? (
                    <>
                      Restaurant Chopra's Indian Restaurant te Den Haag zoekt een zelfstandig werkend kok. Chopra's Indian Restaurant in Den Haag is gespecialiseerd in de traditionele Indiase keuken. Ter uitbreiding van ons keukenteam zijn wij op zoek naar een Zelfstandig Werkend Kok die voldoet aan het functieprofiel uit de Horeca-cao. Je werkt onder leiding van de Chef-kok en draagt samen met je collega's bij aan een professionele en goed georganiseerde keuken. Ervaring met de Indiase keuken is geen vereiste. Wij bieden een intern inwerk- en opleidingstraject, zodat je je kunt ontwikkelen in Indiase bereidingstechnieken.
                    </>
                  ) : (
                    <>
                      Chopras Indian Restaurant in The Hague is looking for an independent cook to join its team. The restaurant specializes in traditional Indian cuisine. As part of the expansion of our kitchen team, we are seeking a self-employed independent cook who meets the requirements of the Dutch Hospitality Collective Labour Agreement (Horeca CAO). You will work under the supervision of the Head Chef and contribute to maintaining a professional, well-organized kitchen. Previous experience with Indian cuisine is <strong>not required</strong>, as we provide a comprehensive internal training and induction program in Indian cooking techniques.
                    </>
                  )}
                </p>

                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">{isNl ? "Verantwoordelijkheden" : "Responsibilities"}</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Zelfstandig ingrediënten voorbereiden en mise-en-place werkzaamheden uitvoeren</li>
                      <li>Basis kooktechnieken toepassen en gerechten bereiden volgens recepten</li>
                      <li>Werken met verse ingrediënten en bijdragen aan de kwaliteit, smaak en presentatie van het eten</li>
                      <li>Input leveren voor menu-ontwikkeling en receptverbeteringen</li>
                      <li>Helpen bij voorraadbeheer en het bestellen van benodigdheden</li>
                      <li>Leveringen controleren en zorgen voor een goede voorraadrotatie (FIFO)</li>
                      <li>Keukenassistenten en ondersteunend personeel begeleiden</li>
                      <li>Handhaven van hygiëne-, veiligheids- en netheidsnormen in de keuken</li>
                    </>
                  ) : (
                    <>
                      <li>Independently prepare ingredients and perform mise-en-place activities</li>
                      <li>Apply basic cooking techniques and prepare dishes according to recipes</li>
                      <li>Work with fresh ingredients and contribute to food quality, taste, and presentation</li>
                      <li>Provide input on menu development and recipe improvements</li>
                      <li>Assist with stock management and ordering of supplies</li>
                      <li>Monitor deliveries and ensure proper stock rotation (FIFO)</li>
                      <li>Supervise and guide kitchen assistants and support staff</li>
                      <li>Maintain hygiene, safety, and cleanliness standards in the kitchen</li>
                    </>
                  )}
                </ul>

                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">{isNl ? "Functie-eisen" : "Requirements"}</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li><strong>MBO Niveau 3</strong> werk- en denkniveau</li>
                      <li>Kennis van basiskooktechnieken</li>
                      <li>Vermogen om zelfstandig en in teamverband te werken</li>
                      <li>Flexibele beschikbaarheid, inclusief avonden, weekenden en feestdagen</li>
                      <li>Passie voor koken en leergierig</li>
                      <li>Ervaring met Indiase gerechten is <strong>niet verplicht</strong>, wij verzorgen de noodzakelijke training.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>MBO Level 3</strong> working and thinking level (vocational education)</li>
                      <li>Knowledge of basic cooking techniques</li>
                      <li>Ability to work independently and as part of a team</li>
                      <li>Flexible availability, including evenings, weekends, and public holidays</li>
                      <li>Passion for cooking and willingness to learn</li>
                      <li>Prior experience with Indian cuisine is <strong>not mandatory</strong>, as full training will be provided.</li>
                    </>
                  )}
                </ul>

                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                  {isNl ? "Wat wij bieden" : "What We Offer"}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Een salaris tussen <strong>€2.700 en €3.700</strong>, afhankelijk van ervaring en opleiding conform de Horeca-cao.</li>
                      <li>Vakantietoeslag en pensioenopbouw.</li>
                      <li>Opleiding, begeleiding en een fijne professionele werkomgeving.</li>
                    </>
                  ) : (
                    <>
                      <li>The salary ranges from <strong>€2,700 to €3,700 gross per month</strong>, depending on experience and qualifications, in accordance with the Horeca Collective Labour Agreement (CAO).</li>
                      <li>Additional benefits include: Holiday allowance, Pension scheme</li>
                    </>
                  )}
                </ul>

                <div className="mt-4 p-4 bg-[#F7F8FC] rounded-xl border border-[#06068a]/20 text-sm">
                  <p className="font-medium text-[#06068a]">{isNl ? "📋 Dienstverband details" : "📋 Employment details"}</p>
                  <div className="grid grid-cols-2 gap-1 mt-2 text-[#1A1A1A]/70">
                    <span>{isNl ? "Werklocatie:" : "Work Location:"}</span><span className="font-medium text-[#1A1A1A]">{isNl ? "Leyweg 986, 2545 GW 's-Gravenhage, Nederland" : "Leyweg 986, 2545 GW, The Hague, Netherlands."}</span>
                    <span>Contract Type:</span><span className="font-medium text-[#1A1A1A]">Temporary (1 year)</span>
                    <span>Start Date:</span><span className="font-medium text-[#1A1A1A]">01‑04‑2026</span>
                    <span>End Date:</span><span className="font-medium text-[#1A1A1A]">01‑04‑2027</span>
                    <span>Salary Type:</span><span className="font-medium text-[#1A1A1A]">Monthly / Hourly</span>
                    <span>Experience:</span><span className="font-medium text-[#1A1A1A]">0 months (training provided)</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-[#06068a]/10 pt-6">
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mb-4">{isNl ? "Solliciteer voor deze functie" : "Apply for this position"}</h4>
                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Volledige Naam *" : "Full Name *"}</label>
                    <input type="text" name="fullName" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Liam de Jong" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Telefoonnummer *" : "Phone Number *"}</label>
                    <input type="tel" name="phone" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="+31 6 12345678" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "E-mailadres" : "Email Address"}</label>
                    <input type="email" name="email" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. liam@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Opleiding" : "Education Qualification"}</label>
                    <input type="text" name="education" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. MBO Level 3 Kok" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Interessegebied" : "Area of Interest"}</label>
                    <input type="text" name="interest" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Indian Cuisine, Kitchen Management" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "CV toevoegen *" : "Attach Resume / CV *"}</label>
                    <input type="file" name="resume" required accept=".pdf,.doc,.docx" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2 text-sm bg-[#F7F8FC] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#06068a]/10 file:text-[#06068a] hover:file:bg-[#06068a]/20" />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#06068a] hover:bg-[#06068a] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-[#06068a]/20">{isSubmitting ? isNl ? "Bezig met indienen..." : "Submitting..." : isNl ? "Sollicitatie indienen →" : "Submit Application →"}</button>
                    {submitMessage && <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${submitMessage.type === "success" ? "bg-emerald-100 text-emerald-1100" : "bg-red-100 text-red-1100"}`}>{submitMessage.text}</div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===== INTERNSHIP ===== */}
        {expandedJob === "internship" && (
          <div
            id="internship-expanded"
            className="expanded-content bg-white rounded-3xl shadow-2xl shadow-[#06068a]/10 border border-[#06068a]/10 overflow-hidden"
          >
            <div className="bg-[#06068a] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white font-heading">Internship Program</h3>
              </div>
              <button
                onClick={() => toggleJob("internship")}
                className="text-white/70 hover:text-white transition text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Type" : "Type"}</span>
                  <span className="font-semibold text-[#1A1A1A]">{isNl ? "Stage" : "Internship"}</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">{isNl ? "Locatie" : "Location"}</span>
                  <span className="font-semibold text-[#1A1A1A]">Den Haag</span>
                </div>
                <div className="bg-[#F7F8FC] rounded-xl p-4 text-center">
                  <span className="block text-xs uppercase tracking-wider text-[#1A1A1A]/50">Hours</span>
                  <span className="font-semibold text-[#1A1A1A]">{isNl ? "Flexibel" : "Flexible"}</span>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-[#1A1A1A]/80">
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                  {isNl ? "Over Ons" : "About Us"}
                </h4>
                <p className="font-medium text-base mb-4">
                  {isNl ? "Stap in de levendige wereld van Indiase gastvrijheid! Wij zijn een authentiek Indiaas restaurant in het hart van Nederland, bekend om het bieden van een rijke culturele en culinaire ervaring aan onze gasten. Nu openen we onze deuren voor gemotiveerde studenten die praktijkervaring willen opdoen in hospitality, marketing, operations en food & beverage management in een internationale omgeving." : "Step into the vibrant world of Indian hospitality! We are an authentic Indian restaurant located in the heart of the Netherlands, known for offering guests a rich cultural and culinary experience. Now, we’re opening our doors to motivated students who want to gain real-world skills in hospitality, marketing, operations, and food & beverage management in a truly international setting."}
                </p>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                  {isNl ? "Stagegebieden" : "Internship Areas"}
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {isNl ? (
                    <>
                      <li><strong>Gastvrijheid & Gastrelaties</strong> – Gasten verwelkomen, reserveringen beheren en uitstekende service bieden.</li>
                      <li><strong>Food & Beverage Service</strong> – Restaurantactiviteiten leren: bediening aan tafel, orderverwerking en coördinatie met chef-koks.</li>
                      <li><strong>Marketing & Social Media</strong> – Content maken (foto's/video's), evenementen promoten en online community's betrekken.</li>
                      <li><strong>Event & Delivery Management</strong> – Helpen met de verpakking van afhaalmaaltijden en samenwerken met bezorgpartners.</li>
                      <li><strong>Keukenondersteuning & Hygiëne</strong> – Zorgen voor hygiëne, voedselveiligheid en een soepele keukenwerking.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>Hospitality & Guest Relations</strong> – Welcome guests, manage reservations, and deliver excellent service.</li>
                      <li><strong>Food & Beverage Service</strong> – Learn restaurant operations: table service, order handling, and coordination with chefs.</li>
                      <li><strong>Marketing & Social Media</strong> – Create content (photos/videos), promote events, and engage online communities.</li>
                      <li><strong>Event & Delivery Management</strong> – Assist with takeaway packaging and collaborate with delivery partners.</li>
                      <li><strong>Kitchen Support & Hygiene</strong> – Maintain hygiene, food safety, and smooth kitchen operations.</li>
                    </>
                  )}
                </ul>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                  {isNl ? "Wat wij bieden" : "What We Offer"}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {isNl ? (
                    <>
                      <li>Praktische, hands-on horeca-ervaring</li>
                      <li>Een multiculturele en dynamische werkplek</li>
                      <li>Direct mentorschap van chef-koks en restaurantmanagers</li>
                      <li>Gratis personeelsmaaltijden tijdens diensten</li>
                      <li>Stagecertificaat & aanbevelingsbrief bij afronding</li>
                      <li>Flexibele werktijden die passen bij je studierooster</li>
                      <li>Een kans om de Indiase keuken, cultuur en restaurantactiviteiten te verkennen</li>
                    </>
                  ) : (
                    <>
                      <li>Practical, hands-on hospitality experience</li>
                      <li>A multicultural and dynamic workplace</li>
                      <li>Direct mentorship from chefs and restaurant managers</li>
                      <li>Free staff meals during shifts</li>
                      <li>Internship certificate & recommendation letter upon completion</li>
                      <li>Flexible working hours to fit your study schedule</li>
                      <li>A chance to explore Indian cuisine, culture & restaurant business operations</li>
                    </>
                  )}
                </ul>
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mt-5 mb-2">
                  {isNl ? "Wie kan solliciteren?" : "Who Can Apply?"}
                </h4>
                <p className="text-sm">
                  {isNl ? "Studenten horeca, business, toerisme, media of culinaire studies die graag praktijkervaring willen opdoen in de horeca- en restaurantsector. Klaar om je carrière wat pit te geven? Solliciteer nu en groei met ons mee!" : "Students of hospitality, business, tourism, media, or culinary studies who are eager to gain practical exposure in the hospitality and restaurant sector. Ready to spice up your career? Apply now and grow with us!"}
                </p>
              </div>
              <div className="mt-8 border-t border-[#06068a]/10 pt-6">
                <h4 className="text-[#06068a] font-bold text-sm uppercase tracking-wider mb-4">{isNl ? "Solliciteer voor stage" : "Apply for Internship"}</h4>
                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Volledige Naam *" : "Full Name *"}</label>
                    <input type="text" name="fullName" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Maria Jansen" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Telefoonnummer *" : "Phone Number *"}</label>
                    <input type="tel" name="phone" required className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="+31 6 12345678" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "E-mailadres" : "Email Address"}</label>
                    <input type="email" name="email" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. maria@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Opleiding" : "Education Qualification"}</label>
                    <input type="text" name="education" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Hospitality Management Student" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "Stagegebied" : "Area of Internship"}</label>
                    <input type="text" name="interest" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2.5 text-sm bg-[#F7F8FC]" placeholder="e.g. Marketing, F&B Service" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A]/60 mb-1">{isNl ? "CV toevoegen *" : "Attach Resume / CV *"}</label>
                    <input type="file" name="resume" required accept=".pdf,.doc,.docx" className="form-input w-full rounded-xl border border-[#06068a]/20 px-4 py-2 text-sm bg-[#F7F8FC] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#06068a]/10 file:text-[#06068a] hover:file:bg-[#06068a]/20" />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#06068a] hover:bg-[#06068a] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-[#06068a]/20">{isSubmitting ? isNl ? "Bezig met indienen..." : "Submitting..." : isNl ? "Sollicitatie indienen →" : "Submit Application →"}</button>
                    {submitMessage && <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${submitMessage.type === "success" ? "bg-emerald-100 text-emerald-1100" : "bg-red-100 text-red-1100"}`}>{submitMessage.text}</div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
