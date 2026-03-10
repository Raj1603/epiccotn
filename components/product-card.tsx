"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/data"
import { Edit } from "lucide-react"

interface ProductCardProps {
  product: Product
  isAdmin?: boolean
}

export function ProductCard({ product, isAdmin }: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const currentColor = product.colorVariants?.[selectedColorIndex]
  const mainImage = currentColor?.images?.[0] || product.image
  const hoverImage = currentColor?.images?.[1] || product.hoverImage

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div
      className="group relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      suppressHydrationWarning
    >
      {/* Root Navigation Link - Overlay Style */}
      <Link
        href={`/products/${product.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${product.name}`}
      />

      {/* Hero Image Container */}
      <div
        className="relative aspect-square bg-[#F5F5F5] rounded-lg overflow-hidden mb-4 z-10 pointer-events-none"
        suppressHydrationWarning
      >
        {/* Badge - Top Left */}
        {product.badge && (
          <div
            className={cn(
              "absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase shadow-sm",
              product.badge === "NEW" && "bg-black text-white",
              product.badge === "TOP SELLER" && "bg-white text-gray-900 border border-gray-300",
              product.badge === "SAVE" && "bg-red-600 text-white",
              product.badge === "LIMITED EDITION" && "bg-black text-white",
              product.badge === "SPECIAL EDITION" && "bg-black text-white",
              product.badge === "HOT" && "bg-blue-600 text-white",
            )}
          >
            {product.badge === "SAVE" && product.savePercent
              ? `Save ${product.savePercent}%`
              : product.badge?.replace("_", " ")}
          </div>
        )}

        {/* Images with smooth transitions */}
        <Image
          src={mainImage || "/placeholder.png"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-opacity duration-700 ease-in-out",
            isHovered && hoverImage ? "opacity-0" : "opacity-100",
          )}
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${product.name} alternate view`}
            fill
            className={cn(
              "object-cover transition-opacity duration-700 ease-in-out",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />
        )}
      </div>

      {/* Admin Quick Edit - Highest Z-Index (Top Right, above badge) */}
      {isAdmin && (
        <Link
          href={`/admin/products/edit/${product.id}`}
          className="absolute top-2.5 right-2.5 z-20 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Edit className="h-4 w-4 text-gray-900" />
        </Link>
      )}

      {/* Interactive Swatches - Highest Z-Index */}
      <div className="relative z-20 px-1" suppressHydrationWarning>
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3 min-h-[20px]">
            {product.colorVariants.map((color, index) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedColorIndex(index)
                }}
                className={cn(
                  "w-3.5 h-3.5 rounded-full border-2 transition-all duration-200",
                  selectedColorIndex === index
                    ? "border-gray-900 scale-110"
                    : "border-gray-300 hover:border-gray-500 hover:scale-105",
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Product Info */}
        <div className="space-y-1.5 pointer-events-none" suppressHydrationWarning>
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider" suppressHydrationWarning>{product.brand}</div>
          <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight" suppressHydrationWarning>
            {product.name}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-1" suppressHydrationWarning>{product.subtitle}</p>

          {/* Price */}
          <div className="flex items-center gap-2 pt-0.5" suppressHydrationWarning>
            <span className="font-bold text-sm text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

