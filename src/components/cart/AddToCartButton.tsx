'use client'

import { useState } from 'react'
import { Plus, Minus, CheckCircle } from 'lucide-react'
import { useCartStore, type CartItem } from '@/store/cartStore'

interface AddToCartButtonProps {
  dish: Omit<CartItem, 'quantity'>
}

export default function AddToCartButton({ dish }: AddToCartButtonProps) {
  const [justAdded, setJustAdded] = useState(false)
  const { items, addItem, updateQuantity } = useCartStore()

  const cartItem = items.find((i) => i.id === dish.id)
  const quantity = cartItem?.quantity ?? 0

  function handleAdd() {
    addItem(dish)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 500)
  }

  if (quantity > 0) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(dish.id, quantity - 1)}
          aria-label="Decrease quantity"
          className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="font-semibold text-[#1A1A1A] w-6 text-center text-sm">{quantity}</span>
        <button
          onClick={handleAdd}
          aria-label="Increase quantity"
          className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    )
  }

  if (justAdded) {
    return (
      <button
        disabled
        className="bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
      >
        <CheckCircle className="w-4 h-4" />
        Added!
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className="btn-gradient px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
    >
      <Plus className="w-4 h-4" />
      Add to Cart
    </button>
  )
}
