"use client"
import { useState, useEffect } from "react"

import Link from "next/link"
import Image from "next/image"
import { X, ShieldCheck, Minus, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { resolveProductImage } from "@/lib/image-fallbacks"
import { Product } from "@/lib/types"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

// Keep suggested products static for now, or fetch from hook? Static is fine for empty state.
const FALLBACK_SUGGESTIONS = [
  {
    name: "Everyday Panty",
    subtitle: "Natural Wisdom & Modern Science",
    image: "/images/epiccotn/hero.png",
    href: "/products/everyday-panty",
  },
  {
    name: "Cotton Essentials Pack",
    subtitle: "Everyday • 3-Pack",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800",
    href: "#",
  },
  {
    name: "Seamless Wellness Set",
    subtitle: "Eco-Friendly • Bamboo Fiber",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800",
    href: "#",
  },
]

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const cart = useCart()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>(FALLBACK_SUGGESTIONS)
  const supabase = createClient()

  useEffect(() => {
    setIsMounted(true)
    // We strictly use branded suggestions to avoid legacy data appearing
    setSuggestions(FALLBACK_SUGGESTIONS)
  }, [])

  if (!isMounted) return null

  const items = cart.items
  const isEmpty = items.length === 0

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = () => {
    onClose()
    router.push('/checkout')
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-50 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 transform transition-transform duration-300 flex flex-col shadow-2xl",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Your Cart ({items.length})</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-900" aria-label="Close cart">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <p className="text-lg font-medium text-gray-900 mb-2">Your Cart is Empty</p>
              <p className="text-sm text-gray-500 mb-6 font-serif italic">
                Start your journey towards daily comfort and scientific wellness.
              </p>
              <div className="w-full space-y-3">
                {suggestions.map((product) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm text-gray-900">{product.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex gap-4">
                  <Link href={`/products/${item.id}`} onClick={onClose} className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <Link href={`/products/${item.id}`} onClick={onClose} className="inline-block">
                          <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500">{item.selectedColor || "Default"}</p>
                        </Link>
                      </div>
                      <button
                        onClick={() => cart.removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-center border border-gray-200 rounded-lg h-8">
                        <button
                          className="px-2 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600"
                          onClick={() => {
                            if (item.quantity > 1) cart.updateQuantity(item.id, item.quantity - 1)
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          className="px-2 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600"
                          onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isEmpty && (
          <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50/50">
            <div className="flex justify-between items-center text-base font-bold text-gray-900">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-center text-gray-500">Shipping and taxes calculated at checkout.</p>
            <Button onClick={handleCheckout} className="w-full h-12 text-base bg-neutral-900 hover:bg-neutral-800 rounded-full">
              Checkout
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
