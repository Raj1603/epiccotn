"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ColorVariant {
    name: string
    hex: string
    images: string[]
}

export default function AddProductPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [slugConflict, setSlugConflict] = useState(false)
    const [manualSlug, setManualSlug] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        subtitle: "",
        description: "",
        price: "",
        originalPrice: "",
        category_id: "",
        badge: "",
        image: "",
        hoverImage: "",
        gallery: ["", "", "", "", ""],
    })

    const [colorVariants, setColorVariants] = useState<ColorVariant[]>([])
    const [currentColor, setCurrentColor] = useState({ name: "", hex: "#000000", images: [""] })
    const [categoriesList, setCategoriesList] = useState<{ id: string, name: string, slug: string }[]>([])

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories")
            const data = await response.json()
            
            // Cleanse the data from placeholder template legacy (Nomad Goods artifacts)
            const cleanData = data.filter((cat: any) => {
                const name = cat.name.toLowerCase()
                return !name.includes('apple') && 
                       !name.includes('watch') && 
                       !name.includes('cases') && 
                       !name.includes('charging') && 
                       !name.includes('wallets') &&
                       !name.includes('passport') &&
                       !name.includes('gear')
            })

            // If we have no clean data, seed with Epiccotn DNA defaults for the UI
            if (cleanData.length === 0) {
                setCategoriesList([
                    { id: 'bamboo', name: 'Bamboo Series', slug: 'bamboo' },
                    { id: 'pima', name: 'Pima Silk Blend', slug: 'pima' },
                    { id: 'seamless', name: 'Signature Seamless', slug: 'seamless' }
                ])
            } else {
                setCategoriesList(cleanData)
            }
        } catch (error) {
            console.error("Failed to load categories")
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (field === "slug") {
            setManualSlug(true)
            setSlugConflict(false)
        }

        // Auto-generate slug from name if not manually edited
        if (field === "name" && !manualSlug) {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            setFormData((prev) => ({ ...prev, slug }))
            setSlugConflict(false)
        }
    }

    const addColorVariant = () => {
        if (!currentColor.name || !currentColor.images[0]) {
            toast.error("Please fill in color name and at least one image")
            return
        }

        setColorVariants([...colorVariants, { ...currentColor, images: currentColor.images.filter(Boolean) }])
        setCurrentColor({ name: "", hex: "#000000", images: [""] })
        toast.success("Color variant added")
    }

    const removeColorVariant = (index: number) => {
        setColorVariants(colorVariants.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submit button clicked")
        setSlugConflict(false)

        if (!formData.name || !formData.price || !formData.category_id) {
            console.log("Validation failed:", { name: formData.name, price: formData.price, category_id: formData.category_id })
            toast.error("Please fill in required fields: Name, Price, and Category")
            return
        }

        setLoading(true)
        setError(null)

        try {

            // Combine subtitle and description since DB only has description
            const finalDescription = [formData.subtitle, formData.description].filter(Boolean).join("\n\n")

            const productData = {
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                description: finalDescription,
                price: Math.round(parseFloat(formData.price) * 100),
                compare_at_price: formData.originalPrice ? Math.round(parseFloat(formData.originalPrice) * 100) : null,
                category_id: formData.category_id,
                images: [formData.image, formData.hoverImage, ...formData.gallery].filter(Boolean),
            }

            console.log("Sending product data (schema-aligned):", productData)

            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            })

            console.log("Response status:", response.status)

            const responseData = await response.json().catch(() => ({ error: "Server returned non-JSON response" }))

            if (!response.ok) {
                console.error("Detailed server error:", JSON.stringify(responseData, null, 2))
                if (responseData.code === "DUPLICATE_SLUG") {
                    setSlugConflict(true)
                }
                throw new Error(responseData.error || responseData.message || "Failed to create product")
            }

            const result = responseData
            console.log("Creation successful:", result)

            toast.success("Product created successfully!")
            router.push("/admin/products")
        } catch (err: any) {
            console.error("Submit error details:", err)
            const message = err.message || "An error occurred while creating the product"
            setError(message)
            toast.error(message)
            setLoading(false)
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20" suppressHydrationWarning>
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link href="/admin/products" className="inline-flex items-center text-[10px] font-bold font-syne uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-3 w-3 mr-2" />
                    Style Catalog
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-foreground font-syne uppercase tracking-tight">New Product Style</h1>
                        <p className="text-muted-foreground font-medium text-sm mt-2 font-inter">Define the DNA of a new Epiccotn collection piece.</p>
                    </div>
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold font-syne uppercase tracking-widest animate-bounce">
                            Error: {error}
                        </div>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Main Content Hub */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* 1. Identity Segment */}
                        <div className="bg-card border border-border p-10 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Plus className="w-20 h-20" strokeWidth={5} />
                            </div>
                            
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-10">
                                Product Identity
                            </h2>
                            
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Style Name *</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            placeholder="The Cloud Seamless Bikini"
                                            className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none text-lg font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className={cn("text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground", slugConflict && "text-red-500")}>URL Identifier (Slug)</Label>
                                        <Input
                                            value={formData.slug}
                                            onChange={(e) => handleInputChange("slug", e.target.value)}
                                            placeholder="cloud-seamless-bikini"
                                            className={cn(
                                                "h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none",
                                                slugConflict && "border-red-500 text-red-500"
                                            )}
                                        />
                                        {slugConflict && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">Identifier already in use</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Core Subtitle</Label>
                                    <Input
                                        value={formData.subtitle}
                                        onChange={(e) => handleInputChange("subtitle", e.target.value)}
                                        placeholder="70% Bamboo / Premium Comfort Series"
                                        className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Detailed Description</Label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Elaborate on the craftsmanship and wearability..."
                                        rows={6}
                                        className="bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none p-6 leading-relaxed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Value & Economics */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-10">
                                Pricing & Values
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Selling Price (USD) *</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 font-bold">$</span>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => handleInputChange("price", e.target.value)}
                                            placeholder="49.00"
                                            className="h-14 pl-10 bg-background border-border text-foreground font-syne font-black text-xl focus:border-primary/50 focus:ring-0 rounded-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Comparison Price (Optional)</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 font-bold">$</span>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={formData.originalPrice}
                                            onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                                            placeholder="69.00"
                                            className="h-14 pl-10 bg-background border-border text-muted-foreground font-syne font-bold focus:border-border/50 focus:ring-0 rounded-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Media Hub */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-2">
                                Visual Assets
                            </h2>
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-10">Use high-resolution vertical photography (4:5 ratio recommended).</p>
                            
                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Master Image URL</Label>
                                    <Input
                                        value={formData.image}
                                        onChange={(e) => handleInputChange("image", e.target.value)}
                                        placeholder="/images/products/main.jpg"
                                        className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none"
                                    />
                                    {formData.image && (
                                        <div className="h-40 bg-muted border border-border relative overflow-hidden group/img">
                                            <img src={formData.image} className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700" />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Interaction Hover URL</Label>
                                    <Input
                                        value={formData.hoverImage}
                                        onChange={(e) => handleInputChange("hoverImage", e.target.value)}
                                        placeholder="/images/products/hover.jpg"
                                        className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none"
                                    />
                                    {formData.hoverImage && (
                                        <div className="h-40 bg-muted border border-border relative overflow-hidden group/img">
                                            <img src={formData.hoverImage} className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                    Additional Portfolio Stack
                                    <span className="text-[8px] text-primary">High-End Vertical Stack</span>
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {formData.gallery.map((url, idx) => (
                                        <div key={idx} className="relative group/field">
                                            <Input
                                                value={url}
                                                onChange={(e) => {
                                                    const newGallery = [...formData.gallery]
                                                    newGallery[idx] = e.target.value
                                                    setFormData({ ...formData, gallery: newGallery })
                                                }}
                                                placeholder={`Perspective ${idx + 1}`}
                                                className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none pr-10"
                                            />
                                            {idx === formData.gallery.length - 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setFormData({ ...formData, gallery: [...formData.gallery, ""] })}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hover:bg-primary/10 rounded-none"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 4. Color DNA */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-2">
                                Shade Palette
                            </h2>
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-10">Add unique color variants for this product style.</p>

                            <div className="grid md:grid-cols-2 gap-10">
                                {/* Form to add */}
                                <div className="space-y-6 p-6 border border-dashed border-border group-hover:border-primary/30 transition-colors">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Color Nomenclature</Label>
                                        <Input
                                            value={currentColor.name}
                                            onChange={(e) => setCurrentColor({ ...currentColor, name: e.target.value })}
                                            placeholder="Midnight Jet"
                                            className="h-12 bg-background border-border text-foreground font-syne uppercase font-bold text-xs focus:ring-0 rounded-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Hex Signature</Label>
                                        <div className="flex gap-4">
                                            <Input
                                                type="color"
                                                value={currentColor.hex}
                                                onChange={(e) => setCurrentColor({ ...currentColor, hex: e.target.value })}
                                                className="w-12 h-12 p-0 border-none cursor-pointer rounded-none"
                                            />
                                            <Input
                                                value={currentColor.hex}
                                                onChange={(e) => setCurrentColor({ ...currentColor, hex: e.target.value })}
                                                placeholder="#000000"
                                                className="flex-1 h-12 bg-background border-border text-foreground font-syne font-bold text-sm focus:ring-0 rounded-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Shade Image</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={currentColor.images[0]}
                                                onChange={(e) => setCurrentColor({ ...currentColor, images: [e.target.value] })}
                                                placeholder="/images/color/variant.jpg"
                                                className="h-12 bg-background border-border text-foreground font-inter text-xs focus:ring-0 rounded-none"
                                            />
                                            <Button type="button" variant="outline" onClick={addColorVariant} className="h-12 w-12 border-primary text-primary hover:bg-primary hover:text-white rounded-none">
                                                <Plus className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* List of added */}
                                <div className="space-y-4">
                                    {colorVariants.length === 0 ? (
                                        <div className="h-full border border-border bg-muted/20 flex flex-col items-center justify-center p-10 opacity-30 italic text-[11px] font-syne uppercase tracking-widest">
                                            No variants specified
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            {colorVariants.map((variant, idx) => (
                                                <div key={idx} className="bg-background border border-border p-4 relative group/v">
                                                    <div className="w-6 h-6 rounded-none border border-border mb-3" style={{ backgroundColor: variant.hex }} />
                                                    <p className="text-[10px] font-syne font-black text-foreground uppercase tracking-tight truncate">{variant.name}</p>
                                                    <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">{variant.hex}</p>
                                                    <button 
                                                        onClick={(e) => { e.preventDefault(); removeColorVariant(idx); }}
                                                        className="absolute top-2 right-2 opacity-0 group-hover/v:opacity-100 text-red-500 transition-opacity"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Status & Categorization */}
                        <div className="bg-card border border-border p-8 shadow-sm space-y-8 sticky top-10">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4">
                                Logistics Hub
                            </h2>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Primary Collection *</Label>
                                <div className="relative">
                                    <select
                                        value={formData.category_id}
                                        onChange={(e) => {
                                            if (e.target.value === "ADD_NEW") router.push("/admin/categories/add")
                                            else handleInputChange("category_id", e.target.value)
                                        }}
                                        className="w-full h-14 bg-background border border-border text-foreground font-bold font-syne uppercase text-[11px] px-6 rounded-none appearance-none focus:border-primary/50 outline-none cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Collection</option>
                                        {categoriesList.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                        <option value="ADD_NEW" className="text-primary font-black">+ Create New</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <Plus className="w-3 h-3 text-muted-foreground/30" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Market Status Badge</Label>
                                <select
                                    value={formData.badge}
                                    onChange={(e) => handleInputChange("badge", e.target.value)}
                                    className="w-full h-14 bg-background border border-border text-foreground font-bold font-syne uppercase text-[11px] px-6 rounded-none appearance-none focus:border-primary/50 outline-none cursor-pointer"
                                >
                                    <option value="">None / Standard</option>
                                    <option value="NEW">New Release</option>
                                    <option value="TOP SELLER">Most In-Demand</option>
                                    <option value="SAVE">Limited Offer</option>
                                    <option value="HOT">Trending Now</option>
                                    <option value="LIMITED EDITION">Bespoke Release</option>
                                </select>
                            </div>

                            <div className="pt-8 border-t border-border mt-10 space-y-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-18 bg-primary text-primary-foreground hover:bg-black hover:text-white transition-all duration-300 font-syne font-black uppercase tracking-[0.2em] rounded-none text-sm shadow-[0_10px_30px_rgba(148,182,39,0.2)] active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Transmitting Style...</span>
                                        </div>
                                    ) : (
                                        "Launch This Style"
                                    )}
                                </Button>
                                <Link href="/admin/products" className="block outline-none">
                                    <Button type="button" variant="ghost" className="w-full h-14 border border-border text-muted-foreground hover:text-foreground font-syne font-bold uppercase tracking-widest rounded-none text-[10px]">
                                        Discard Draft
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-muted/30 border border-border border-dashed">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Catalog Auto-Sync Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
