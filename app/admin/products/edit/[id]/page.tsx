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

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [productId, setProductId] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        subtitle: "",
        description: "",
        price: "" ,
        originalPrice: "",
        category_id: "",
        badge: "",
        image: "",
        hoverImage: "",
        gallery: ["", "", "", "", ""],
    })

    const [colorVariants, setColorVariants] = useState<ColorVariant[]>([])
    const [currentColor, setCurrentColor] = useState({ name: "", hex: "#000000", images: [""] })
    const [variants, setVariants] = useState<string[]>([])
    const [categoriesList, setCategoriesList] = useState<{ id: string, name: string, slug: string }[]>([])

    useEffect(() => {
        fetchCategories()
        params.then(({ id }) => {
            setProductId(id)
            fetchProduct(id)
        })
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories")
            const data = await response.json()
            const cleanData = data.filter((cat: any) => !cat.name.toLowerCase().includes('apple'))
            setCategoriesList(cleanData.length === 0 ? [{ id: 'bamboo', name: 'Bamboo Series', slug: 'bamboo' }] : cleanData)
        } catch (error) { console.error("Failed to load categories") }
    }

    const fetchProduct = async (id: string) => {
        try {
            const response = await fetch(`/api/products/${id}`)
            const data = await response.json()

            setFormData({
                name: data.name || "",
                slug: data.slug || "",
                subtitle: data.subtitle || "",
                description: data.description || "",
                price: data.price ? (data.price / 100).toString() : "",
                originalPrice: data.compare_at_price ? (data.compare_at_price / 100).toString() : "",
                category_id: data.category_id || "",
                badge: data.badge || "",
                image: data.images?.[0] || "",
                hoverImage: data.images?.[1] || "",
                gallery: data.images?.slice(2) || ["", "", "", "", ""],
            })

            if (data.color_variants) setColorVariants(data.color_variants)
            if (data.variants) setVariants(data.variants)
        } catch (error) { toast.error("Failed to load product") } finally { setFetching(false) }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const addColorVariant = () => {
        if (!currentColor.name || !currentColor.images[0]) {
            toast.error("Please fill in color name and at least one image")
            return
        }
        setColorVariants([...colorVariants, { ...currentColor, images: currentColor.images.filter(Boolean) }])
        setCurrentColor({ name: "", hex: "#000000", images: [""] })
    }

    const removeColorVariant = (index: number) => {
        setColorVariants(colorVariants.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.price || !formData.category_id) {
            toast.error("Please fill in required fields")
            return
        }

        setLoading(true)
        try {
            const images = [formData.image, formData.hoverImage, ...formData.gallery].filter(Boolean)
            const productData = {
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                description: formData.description,
                price: Math.round(parseFloat(formData.price) * 100),
                compare_at_price: formData.originalPrice ? Math.round(parseFloat(formData.originalPrice) * 100) : null,
                category_id: formData.category_id,
                images: images,
                color_variants: colorVariants,
                variants: variants
            }

            const response = await fetch(`/api/products/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            })

            if (!response.ok) throw new Error("Failed to update product")

            toast.success("Style updated successfully!")
            router.push("/admin/products")
        } catch (err: any) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    if (fetching) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-[10px] font-syne font-black uppercase tracking-[0.3em] text-muted-foreground">Retrieving Style DNA...</p>
        </div>
    )

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
                        <h1 className="text-4xl font-extrabold text-foreground font-syne uppercase tracking-tight">Edit Product DNA</h1>
                        <p className="text-muted-foreground font-medium text-sm mt-2 font-inter">Modify the characteristics of the <span className="text-foreground font-bold">{formData.name}</span></p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Main Content Hub */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* 1. Identity Segment */}
                        <div className="bg-card border border-border p-10 shadow-sm relative overflow-hidden group">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-10">
                                Style Identity
                            </h2>
                            
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Style Name *</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none text-lg font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Identifier (Slug)</Label>
                                        <Input
                                            value={formData.slug}
                                            onChange={(e) => handleInputChange("slug", e.target.value)}
                                            className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Core Subtitle</Label>
                                    <Input
                                        value={formData.subtitle}
                                        onChange={(e) => handleInputChange("subtitle", e.target.value)}
                                        className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Detailed Description</Label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
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
                                            className="h-14 pl-10 bg-background border-border text-foreground font-syne font-black text-xl focus:border-primary/50 focus:ring-0 rounded-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Comparison Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 font-bold">$</span>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={formData.originalPrice}
                                            onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                                            className="h-14 pl-10 bg-background border-border text-muted-foreground font-syne font-bold focus:border-border/50 focus:ring-0 rounded-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Media Hub */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-10">
                                Visual Assets
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Master Image URL</Label>
                                    <Input
                                        value={formData.image}
                                        onChange={(e) => handleInputChange("image", e.target.value)}
                                        className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none"
                                    />
                                    {formData.image && (
                                        <div className="h-40 bg-muted border border-border relative overflow-hidden group/img">
                                            <img src={formData.image} className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700" alt="Master" />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Interaction Hover URL</Label>
                                    <Input
                                        value={formData.hoverImage}
                                        onChange={(e) => handleInputChange("hoverImage", e.target.value)}
                                        className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none"
                                    />
                                    {formData.hoverImage && (
                                        <div className="h-40 bg-muted border border-border relative overflow-hidden group/img">
                                            <img src={formData.hoverImage} className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700" alt="Hover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                    Additional Portfolio Stack
                                    <span className="text-[8px] text-primary font-black">MULTI-DIMENSIONAL GALLERY</span>
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
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-10">Manage color variants and their specific visual mapping.</p>

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

                        {/* 5. Size Matrix */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-2">
                                Size Distribution
                            </h2>
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-10">Select standard fleet sizes or define custom labels.</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].map((sz) => (
                                    <button
                                        key={sz}
                                        type="button"
                                        onClick={() => {
                                            if (variants.includes(sz)) setVariants(variants.filter(v => v !== sz))
                                            else setVariants([...variants, sz])
                                        }}
                                        className={cn(
                                            "h-14 border font-syne font-black text-xs transition-all uppercase tracking-widest",
                                            variants.includes(sz) 
                                                ? "bg-primary border-primary text-primary-foreground shadow-lg" 
                                                : "bg-background border-border text-muted-foreground hover:border-primary/50"
                                        )}
                                    >
                                        {sz}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Selected View */}
                            {variants.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-2">
                                    {variants.map((v, i) => (
                                        <div key={i} className="bg-muted px-4 py-2 font-syne font-bold text-[9px] uppercase tracking-widest text-primary flex items-center gap-2">
                                            {v}
                                            <button onClick={() => setVariants(variants.filter(x => x !== v))} className="hover:text-foreground">
                                                <X className="w-2.5 h-2.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                            <span>Transmitting Update...</span>
                                        </div>
                                    ) : (
                                        "Confirm Update"
                                    )}
                                </Button>
                                <Link href="/admin/products" className="block outline-none">
                                    <Button type="button" variant="ghost" className="w-full h-14 border border-border text-muted-foreground hover:text-foreground font-syne font-bold uppercase tracking-widest rounded-none text-[10px]">
                                        Cancel Changes
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-muted/30 border border-border border-dashed text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                LAST EDITED: {new Date().toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
