'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X, ShoppingBag, Trash2, Minus, Plus, Banknote } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Locale } from '@/lib/useTranslations'

function formatPrice(price: number): string {
  return price % 1 === 0 ? `€${price}` : `€${price.toFixed(2)}`
}

export default function CartDrawer({ locale }: { locale: Locale }) {
  const router = useRouter()
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const totalPrice = getTotalPrice()
  const base = locale === 'nl' ? '/nl' : ''

  function handleCheckout() {
    closeCart()
    router.push(`${base}/checkout`)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[420px] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}>
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="font-vibes text-xl text-white">Your Order</span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="text-white hover:text-[#D4AF37] transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-2 bg-[#1B2B5E]">
            <p className="text-white/60 text-xs">Pickup from Leyweg 986, Den Haag</p>
          </div>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <ShoppingBag className="w-16 h-16 text-[#1A1A1A]/20" />
              <p className="font-vibes text-lg text-[#1A1A1A]/50 mt-4">Your cart is empty</p>
              <p className="text-[#1A1A1A]/40 text-sm mt-2 text-center max-w-[200px]">
                Browse our menu and add your favourite dishes
              </p>
              <button
                onClick={() => {
                  closeCart()
                  router.push(`${base}/menu`)
                }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
              >
                View Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100 relative"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-vibes text-lg"
                      style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
                    >
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-vibes text-base text-[#1A1A1A] leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-[#1A1A1A]/40 text-xs capitalize mt-0.5">{item.category}</p>
                  <p className="text-[#D4AF37] text-sm font-semibold mt-1">{formatPrice(item.price)}</p>
                </div>

                {/* Quantity controls */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] text-sm transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-semibold text-[#1A1A1A] text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] text-sm transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[#1A1A1A]/60 text-xs">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="absolute top-3 right-3 text-[#1A1A1A]/30 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-white">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-[#1A1A1A]/60">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#1A1A1A]/60">
                <span>Pickup</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-vibes text-xl text-[#1A1A1A] pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-[#D4AF37]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Cash badge */}
            <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl px-4 py-3">
              <Banknote className="text-[#D4AF37] w-4 h-4 flex-shrink-0" />
              <p className="text-[#1A1A1A]/70 text-sm">Payment: Cash on Pickup</p>
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              Proceed to Checkout
            </button>

            {/* Continue browsing */}
            <button
              onClick={closeCart}
              className="w-full border border-gray-200 text-[#1A1A1A]/60 py-3 text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-xl"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </>
  )
}
