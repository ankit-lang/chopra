export default function MenuLegend() {
      const badges = [
            { symbol: 'Ⓥ', label: 'Vegetarian', description: 'Vegetarian options available' },
            { symbol: '🌱', label: 'Vegan', description: 'Vegan (no dairy, eggs, or meat)' },
            { symbol: 'Ⓖ', label: 'Gluten Free', description: 'Gluten-free option' },
            { symbol: 'Ⓗ', label: 'Halal', description: 'Halal certified' },
            { symbol: '🌶️', label: 'Spicy', description: 'Spicy heat level' },
      ]

      return (
            <div className="bg-white py-8 px-6 md:px-16 border-b border-gray-100">
                  <div className="max-w-4xl mx-auto">
                        <h3 className="font-vibes text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
                              Dietary &amp; Spice Guide
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                              {badges.map((badge, index) => (
                                    <div
                                          key={index}
                                          className="flex items-start gap-2 p-3 rounded-lg bg-[#F7F8FC] border border-white/20"
                                    >
                                          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-lg font-light flex-shrink-0 mt-0.5">
                                                {badge.symbol}
                                          </span>
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
                  </div>
            </div>
      )
}
