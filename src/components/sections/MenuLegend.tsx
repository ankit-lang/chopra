import { type Locale } from '@/lib/useTranslations'

export default function MenuLegend({ locale = 'en' }: { locale?: Locale }) {
  const isNl = locale === 'nl'

  const badges = [
    { type: 'v', symbol: 'V', label: isNl ? 'Vegetarisch' : 'Vegetarian', description: isNl ? 'Vegetarische opties' : 'Vegetarian options available' },
    { type: 'emoji', symbol: '🌱', label: 'Vegan', description: isNl ? 'Veganistische opties' : 'Vegan options available' },
    { type: 'g', symbol: 'G', label: isNl ? 'Glutenvrij' : 'Gluten Free', description: isNl ? 'Glutenvrije opties' : 'Gluten-free options available' },
    { type: 'h', symbol: 'H', label: 'Halal', description: isNl ? 'Halal gecertificeerd' : 'Halal certified' },
    { type: 'emoji', symbol: '🌶️', label: isNl ? 'Pittig' : 'Spicy', description: isNl ? 'Opties beschikbaar' : 'Options Available' },
  ]

  return (
    <div className="bg-white py-8 px-6 md:px-16 border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-vibes text-2xl md:text-3xl text-[#06068a] mb-6">
          {isNl ? 'Dieet- & Specerijengids' : 'Dietary & Spice Guide'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 rounded-lg bg-[#F7F8FC] border border-white/20"
            >
              {badge.type === 'emoji' ? (
                <span className="inline-flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-lg font-light leading-normal overflow-visible pb-0.5 flex-shrink-0 mt-0.5">
                  {badge.symbol}
                </span>
              ) : (
                <span className="w-4 h-4 rounded-full border border-[#06068a] text-[#06068a] font-semibold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {badge.symbol}
                </span>
              )}
              <div className="flex-1">
                <p className="font-body font-semibold text-[#1A1A1A] text-sm">
                  {badge.label}
                </p>
                <p className="text-[#1A1A1A]/60 text-xs leading-tight">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-[#1A1A1A]/80 leading-relaxed font-body bg-[#F7F8FC] p-4 rounded-xl border border-gray-100">
          {isNl ? (
            <>
              <strong className="text-[#06068a] font-semibold">Allergieën &amp; Pittigheid Voorkeur:</strong> Laat het ons voor het plaatsen van uw bestelling weten als u voedselallergieën of speciale dieetwensen heeft, zodat we hier optimaal rekening mee kunnen houden. U kunt ook uw gewenste pittigheidsniveau kiezen: Mild, Medium of Pittig.
            </>
          ) : (
            <>
              <strong className="text-[#06068a] font-semibold">Allergies &amp; Spice Preference:</strong> If you have any food allergies or dietary requirements, please let us know before placing your order so we can accommodate your needs as best as possible. You can also choose your preferred spice level—Mild, Medium, or Spicy. Simply let us know when ordering, and we&apos;ll prepare your meal just the way you like it.
            </>
          )}
        </p>
      </div>
    </div>
  )
}
