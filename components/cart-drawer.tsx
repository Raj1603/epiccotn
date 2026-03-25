"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Pencil, Trash2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const cart = useCart()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  if (!isMounted) return null

  const items = cart.items
  const isEmpty = items.length === 0
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleViewCart = () => {
    onClose()
    router.push('/cart')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Transparent Backdrop to capture clicks */}
          <div className="fixed inset-0 z-[250]" onClick={onClose} />
          
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[70px] right-4 sm:right-8 w-[calc(100%-2rem)] sm:max-w-[420px] bg-black z-[300] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-t-[4px] border-lime overflow-hidden rounded-sm"
          >
            {/* Header section */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-lt bg-black">
              <div className="flex flex-col">
                <span className="text-text-dim font-syne font-bold text-[10px] uppercase tracking-widest mb-1">Your Basket</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-text-mid font-syne font-black text-sm uppercase tracking-tight">Subtotal :</span>
                  <span className="text-white font-syne font-black text-lg">{formatPrice(total)}</span>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-border-lt flex items-center justify-center text-text-dim hover:text-white transition-all bg-white/5"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>


            <div className="max-h-[450px] overflow-y-auto custom-scrollbar bg-black/95">
              {isEmpty ? (
                <div className="py-20 px-10 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-text-dim" />
                  </div>
                  <p className="text-text-dim font-syne font-bold uppercase tracking-widest text-xs">Your cart is empty</p>
                  <Link 
                    href="/products" 
                    onClick={onClose}
                    className="inline-flex items-center gap-2 mt-6 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:text-lime transition-all"
                  >
                    Start Shopping <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border-lt">
                  {items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="p-6 flex gap-5 group items-start">
                      {/* Product Image */}
                      <div className="relative w-24 h-28 bg-white/5 overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {/* Lime badge like in image */}
                        <div className="absolute top-2 right-2 w-5 h-5 bg-lime rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-black font-bold">EC</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] leading-[1.4] text-text-dim font-medium font-inter mb-3 line-clamp-2">
                          {item.name}
                        </h3>
                        
                        <div className="space-y-1.5 mb-4">
                          <p className="text-[14px] text-white font-medium">
                            Size: <span className="text-text-mid">{item.selectedSize || "L"}</span>
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] text-white font-medium capitalize">Qty:</span>
                            <div className="flex items-center border border-border-lt bg-white/5 h-7">
                              <button 
                                onClick={() => cart.updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedColor, item.selectedSize)}
                                className="w-7 h-full flex items-center justify-center text-text-dim hover:text-white transition-all disabled:opacity-20"
                                disabled={item.quantity <= 1}
                              >
                                <span className="text-base leading-none">−</span>
                              </button>
                              <span className="w-6 text-center text-[11px] font-syne font-bold text-white transition-all">{item.quantity}</span>
                              <button 
                                onClick={() => cart.updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                                className="w-7 h-full flex items-center justify-center text-text-dim hover:text-white transition-all"
                              >
                                <span className="text-base leading-none">+</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[18px] font-black font-syne text-white">
                            {formatPrice(item.price)}
                          </span>
                          
                          <div className="flex gap-2">
                            <Link 
                              href={`/products/${item.id}`}
                              onClick={onClose}
                              className="w-10 h-10 rounded-full border border-border-lt flex items-center justify-center text-text-dim hover:border-white hover:text-white transition-all"
                              aria-label="Edit item"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button 
                              onClick={() => cart.removeItem(item.id, item.selectedColor, item.selectedSize)}
                              className="w-10 h-10 rounded-full border border-border-lt flex items-center justify-center text-text-dim hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isEmpty && (
              <div className="p-4 bg-white/5 border-t border-border-lt">
                <button 
                  onClick={() => {
                    onClose()
                    router.push('/checkout')
                  }}
                  className="w-full h-12 bg-lime text-black text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all duration-500"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
