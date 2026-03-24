"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { Edit, ShoppingBag } from "lucide-react"

interface ProductCardProps {
  product: Product
  isAdmin?: boolean
}

export function ProductCard({ product, isAdmin }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price?: number) => {
    if (price === undefined) return "$0.00"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price)
  }

  return (
    <div
      className="group relative bg-black border border-white/[0.05] overflow-hidden transition-all duration-500 hover:border-white/20 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      suppressHydrationWarning
    >
      {/* Detail Link Overlay */}
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10" />

      {/* Image Core */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-all duration-1000 ease-out grayscale group-hover:grayscale-0",
            isHovered ? "scale-110" : "scale-100"
          )}
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
        />
        
        {/* Shadow Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Badges */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-lime text-black font-syne font-black text-[9px] px-2 py-1 uppercase tracking-widest block">
              {product.badge}
            </span>
          </div>
        )}

        {/* Admin Quick Link */}
        {isAdmin && (
          <Link
            href={`/admin/products/edit/${product.id}`}
            className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-lime hover:text-black transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <Edit className="w-4 h-4" />
          </Link>
        )}

        {/* Quick Add (Ghost) */}
        <div className={cn(
          "absolute bottom-4 inset-x-4 z-20 transition-all duration-500 transform",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <button className="w-full bg-white text-black font-syne font-black text-[10px] py-3.5 uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 hover:bg-lime transition-all active:scale-[0.98] shadow-2xl">
            <ShoppingBag className="w-4 h-4" strokeWidth={2.5} />
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6 flex flex-col flex-1" suppressHydrationWarning>
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-syne font-black text-[15px] text-white uppercase tracking-tight leading-tight group-hover:text-lime transition-colors">
            {product.name}
          </h3>
          <p className="font-syne font-bold text-[14px] text-white/90">
            {formatPrice(product.price)}
          </p>
        </div>
        
        <p className="font-inter text-[12px] text-white/40 line-clamp-2 leading-relaxed mb-4">
          {product.subtitle}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            {product.category || "Bamboo Series"}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] font-bold text-white/20 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

