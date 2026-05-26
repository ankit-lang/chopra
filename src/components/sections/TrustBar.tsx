import { getTranslations, type Locale } from '@/lib/useTranslations'

function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function IconFlame({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 6 8 6 13a6 6 0 0012 0c0-5-6-11-6-11z" />
      <path d="M12 22c-1.5 0-3-1-3-2.5C9 17.5 12 15 12 15s3 2.5 3 4.5C15 21 13.5 22 12 22z" />
    </svg>
  )
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
    </svg>
  )
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function TrustBar({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)

  const items = [
    { Icon: IconShieldCheck, label: tr.common.halalCertified },
    { Icon: IconShieldCheck, label: 'Halal Food Den Haag' },
    { Icon: IconFlame, label: tr.common.freshSpices },
    { Icon: IconCalendar, label: 'Open Tue–Sun' },
    { Icon: IconStar, label: tr.common.privateHall },
  ]

  return (
    <div
      className="relative py-3 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)',
        borderTop: '1px solid rgba(212,175,55,0.15)',
        borderBottom: '1px solid rgba(212,175,55,0.08)',
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0aaa] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1B2B5E] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-10 md:gap-16 justify-start md:justify-center overflow-x-auto px-8 md:px-0 no-scrollbar">
        {items.map(({ Icon, label }, i) => (
          <div key={i} className="flex items-center gap-2.5 flex-shrink-0 py-0.5">
            <Icon className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <span className="font-body text-[10px] text-white/55 uppercase tracking-[0.18em] whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
