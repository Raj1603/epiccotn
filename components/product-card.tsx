"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { Edit, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
  isAdmin?: boolean
  theme?: "light" | "dark"
  showCartButton?: boolean
}

export function ProductCard({ product, isAdmin, theme = "dark", showCartButton = true }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()

  const formatPrice = (price?: number) => {
    if (price === undefined) return "$0.00"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price)
  }

  const isLight = theme === "light"

  return (
    <div
      className={cn(
        "group relative overflow-hidden transition-all duration-500 h-full flex flex-col",
        isLight 
          ? "bg-white border border-neutral-100 hover:border-neutral-300" 
          : "bg-black border border-white/[0.05] hover:border-white/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      suppressHydrationWarning
    >
      {/* Detail Link Overlay */}
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10" />

      {/* Image Core */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
        {/* Primary Image */}
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            isHovered && (product.images?.[1] || product.hoverImage) ? "opacity-0 scale-105" : "opacity-100 scale-100"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Secondary (Hover) Image */}
        {(product.images?.[1] || product.hoverImage) && (
          <Image
            src={product.images?.[1] || product.hoverImage!}
            alt={`${product.name} view 2`}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-out absolute inset-0",
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Shadow Mask (Softer for Light Theme) */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isLight ? "bg-black/5 opacity-100" : "bg-black/60 opacity-60"
        )} />

        {/* Badges */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-[#C8F542] text-[#0A0A0A] font-syne font-black text-[9px] px-2 py-1 uppercase tracking-widest block">
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
        {showCartButton && (
          <div className={cn(
            "absolute bottom-4 inset-x-4 z-20 transition-all duration-500 transform lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 lg:translate-y-4"
          )}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const defaultColor = product.colorVariants?.[0]?.name;
                const defaultSize = product.variants?.[0] || "M";
                addItem(product, 1, defaultColor, defaultSize);
                window.dispatchEvent(new CustomEvent("openCart"));
                toast.success(`Added ${product.name} to cart!`);
              }}
              className="w-full bg-white text-black font-syne font-black text-[10px] py-3.5 uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 hover:bg-lime transition-all active:scale-[0.98] shadow-2xl"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2.5} />
              ADD TO CART
            </button>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className={cn(
        "p-6 flex flex-col flex-1 transition-colors duration-300",
        isLight ? "bg-[#FFFFFF]" : "bg-[#0A0A0A]"
      )} suppressHydrationWarning>
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className={cn(
            "font-syne font-black text-[15px] uppercase tracking-tight leading-tight transition-colors",
            isLight ? "text-[#0A0A0A] group-hover:text-lime-600" : "text-[#FFFFFF] group-hover:text-lime"
          )}>
            {product.name}
          </h3>
          <p className={cn("font-syne font-bold text-[14px]", isLight ? "text-[#0A0A0A]" : "text-[#FFFFFF]")}>
            {formatPrice(product.price)}
          </p>
        </div>

        
        <p className={cn("font-inter text-[12px] line-clamp-2 leading-relaxed mb-4", isLight ? "text-neutral-500" : "text-[#FFFFFF]/40")}>
          {product.subtitle}
        </p>

        <div className={cn("mt-auto flex items-center justify-between border-t pt-4", isLight ? "border-neutral-100" : "border-[#FFFFFF]/5")}>
          <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", isLight ? "text-neutral-400" : "text-[#FFFFFF]/20")}>
            {product.category || "Bamboo Series"}
          </span>
          {product.originalPrice && (
            <span className={cn("text-[10px] font-bold line-through", isLight ? "text-neutral-300" : "text-[#FFFFFF]/20")}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

