'use client'

// ── Season detection ──────────────────────────────────────────────────────────
type Season = 'spring' | 'summer' | 'autumn' | 'winter'

function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1 // 1-12
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

const SEASON_STYLE: Record<
  Season,
  {
    image: string
    overlay: string   // rgba overlay on top of image
    border: string    // bottom border glow colour
    dot: string       // bullet dot colour
    text: string      // text colour
  }
> = {
  summer: {
    image: '/images/marquee/summer.png',
    overlay: 'rgba(30, 10, 0, 0.55)',
    border: '#F59E0B',
    dot: '#FBBF24',
    text: '#FDE68A',
  },
  spring: {
    image: '/images/marquee/spring.png',
    overlay: 'rgba(0, 20, 10, 0.55)',
    border: '#10B981',
    dot: '#34D399',
    text: '#A7F3D0',
  },
  autumn: {
    image: '/images/marquee/autumn.png',
    overlay: 'rgba(30, 5, 0, 0.55)',
    border: '#D97706',
    dot: '#F59E0B',
    text: '#FED7AA',
  },
  winter: {
    image: '/images/marquee/winter.png',
    overlay: 'rgba(0, 10, 30, 0.55)',
    border: '#60A5FA',
    dot: '#93C5FD',
    text: '#BFDBFE',
  },
}





const ITEMS_EN = [
  'Vegan And Gluten free option',
  'Halal ',
  ' Dine in Takeaway Delivery ',
  'Best Indian Restaurant in Den Haag',
  'Highly Rated Restaurant ',
  ' Party Hall ',
  'Catering Services'
]

const ITEMS_NL = [
  'Veganistische & Glutenvrije Opties',
  'Halal ',
  'Dine-in Afhalen Bezorgen',
  'Beste Indiaas Restaurant in Den Haag',
  'Hoog Beoordeeld Restaurant',
  'Feestzaal',
  'Catering Diensten'
]

export default function MarqueeBanner({ items, locale = 'en' }: { items?: string[]; locale?: string } = {}) {
  const season = getCurrentSeason()
  const s = SEASON_STYLE[season]
  const defaultItems = locale === 'nl' ? ITEMS_NL : ITEMS_EN
  const list = items && items.length > 0 ? items : defaultItems
  const doubled = [...list, ...list, ...list]

  return (
    <div
      className="relative w-full h-[6vh]     overflow-hidden select-none"
      style={{ borderBottom: `2px solid ${s.border}` }}
    >
      {/* ── Season background image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        // style={{ backgroundImage: `url('${s.image}')` }}
        style={{ backgroundColor: "#0000FF" }}
      />

      {/* ── Dark tinted overlay ── */}
      <div
        className="absolute inset-0"
        style={{ background: s.overlay }}
      />

      {/* ── Left edge fade ── */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
        style={{ background: `linear-gradient(to right, ${s.overlay}, transparent)` }}
      />
      {/* ── Right edge fade ── */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
        style={{ background: `linear-gradient(to left, ${s.overlay}, transparent)` }}
      />

      {/* ── Scrolling text ── */}
      <div className="relative z-[5] mt-[5px] flex items-center py-[5px] marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 whitespace-nowrap text-[16px] font-semibold uppercase tracking-[0.2em] px-4"
            style={{ color: s.text }}
          >
            {/* Glowing seasonal dot */}
            <span
              className="inline-block flex-shrink-0 rounded-full"
              style={{
                width: 5,
                height: 5,
                backgroundColor: s.dot,
                boxShadow: `0 0 8px 2px ${s.dot}`,
              }}
            />
            {item}
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
