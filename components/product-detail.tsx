"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Truck, Shield, RotateCcw, Edit, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { resolveProductImage } from "@/lib/image-fallbacks"

interface ProductDetailProps {
  product: Product
  isAdmin?: boolean
}

export function ProductDetail({ product, isAdmin }: ProductDetailProps) {
  const { id } = product
  const router = useRouter()
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0])
  const { addItem } = useCart()

  // Collect unique images from product and color variants
  const collectProductImages = () => {
    const imageSet = new Set<string>()

    // Add main product images
    if (product.image) imageSet.add(product.image)
    if (product.hoverImage) imageSet.add(product.hoverImage)

    // Add images from color variants
    product.colorVariants?.forEach(variant => {
      variant.images?.forEach(img => {
        if (img) imageSet.add(img)
      })
    })

    const uniqueImages = Array.from(imageSet)
    // Return at least 2 images, but don't duplicate if we have enough unique ones
    return uniqueImages.length >= 2 ? uniqueImages : uniqueImages
  }

  const images = collectProductImages()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    addItem(product, 1, product.colorVariants?.[0]?.name)
    window.dispatchEvent(new CustomEvent('openCart'))
    toast.success("Added to cart!")
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      const response = await fetch(`/api/products/${product.id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      toast.success("Product deleted")
      router.push("/admin/products")
    } catch (err) {
      toast.error("Failed to delete product")
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

        {/* Left Column: Vertical Image Stack (Desktop) / Carousel (Mobile) */}
        <div className="lg:col-span-7 space-y-4 md:space-y-8">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-square w-full bg-[#F5F5F5] rounded-none overflow-hidden">
              <Image
                src={resolveProductImage(product.slug, img)}
                alt={`${product.name} view ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              {idx === 0 && product.badge && (
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-bold tracking-widest uppercase z-10">
                  {product.badge === "SAVE" && product.savePercent
                    ? `Save ${product.savePercent}%`
                    : product.badge?.replace("_", " ")}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Buy Box */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-8">

            {/* Header Info */}
            <div className="relative space-y-2 border-b border-gray-100 pb-6" suppressHydrationWarning>
              {isAdmin && (
                <div className="absolute -top-12 right-0 flex gap-2">
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleDelete} className="flex items-center gap-2 text-red-600 border-red-100 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              )}
              <div className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">{product.brand}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif leading-tight">{product.name}</h1>
              <p className="text-lg text-gray-500 font-sans tracking-wide">{product.subtitle}</p>

              {/* Price */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            {/* Configurator */}
            <div className="space-y-6">

              {/* Material / Color Selection */}
              {product.colorVariants && product.colorVariants.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Color: <span className="text-gray-500 font-normal capitalize">{product.colorVariants[0].name}</span></label>
                  <div className="flex flex-wrap gap-3">
                    {product.colorVariants.map((color, idx) => (
                      <button
                        key={color.name}
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-all border",
                          idx === 0 ? "border-gray-900 ring-1 ring-offset-2 ring-gray-900" : "border-transparent hover:border-gray-300"
                        )}
                      >
                        <span className="w-10 h-10 rounded-full border border-black/10" style={{ backgroundColor: color.hex }}></span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variants / Material Config */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Material</label>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={`group relative px-4 py-3 rounded-lg border text-left transition-all ${selectedVariant === variant
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white border-gray-200 hover:border-gray-400"
                          }`}
                      >
                        <span className="block text-sm font-bold">{variant}</span>
                        <span className={`text-xs ${selectedVariant === variant ? "text-gray-300" : "text-gray-500"}`}>
                          {selectedVariant === variant ? "Selected" : "+ $0"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <div className="pt-4">
              <Button onClick={handleAddToCart} size="lg" className="w-full h-14 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-lg font-bold tracking-wide">
                Add to Cart - {formatPrice(product.price)}
              </Button>
              <div className="text-center mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                In stock and ready to ship
              </div>
            </div>

            {/* Benefits Accordion (simplified) */}
            <div className="space-y-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Truck className="h-4 w-4" /></div>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Shield className="h-4 w-4" /></div>
                <span>2-Year Warranty included</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><RotateCcw className="h-4 w-4" /></div>
                <span>30-day hassle-free returns</span>
              </div>
            </div>

            {/* Description Text */}
            <div className="prose prose-sm max-w-none text-gray-600 pt-6">
              <p>
                {product.subtitle} - Crafted with premium materials and designed for the modern lifestyle.
                Our products are built to withstand everyday use while maintaining their premium look and feel.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
