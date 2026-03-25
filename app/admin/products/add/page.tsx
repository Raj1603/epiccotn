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
    const [variants, setVariants] = useState<string[]>(["XS", "S", "M", "L", "XL", "2XL"])
    const [categoriesList, setCategoriesList] = useState<{ id: string, name: string, slug: string }[]>([])

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories")
            const data = await response.json()
            const cleanData = data.filter((cat: any) => !cat.name.toLowerCase().includes('apple'))
            setCategoriesList(cleanData.length === 0 ? [{ id: 'bamboo', name: 'Bamboo Series', slug: 'bamboo' }] : cleanData)
        } catch (error) { console.error("Failed to load categories") }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (field === "slug") { setManualSlug(true); setSlugConflict(false) }
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
    }

    const removeColorVariant = (index: number) => {
        setColorVariants(colorVariants.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.price || !formData.category_id) {
            toast.error("Required: Name, Price, Category")
            return
        }

        setLoading(true)
        try {
            const finalDescription = [formData.subtitle, formData.description].filter(Boolean).join("\n\n")
            const productData = {
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                description: finalDescription,
                price: Math.round(parseFloat(formData.price) * 100),
                compare_at_price: formData.originalPrice ? Math.round(parseFloat(formData.originalPrice) * 100) : null,
                category_id: formData.category_id,
                images: [formData.image, formData.hoverImage, ...formData.gallery].filter(Boolean),
                color_variants: colorVariants,
                variants: variants
            }

            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            })

            const responseData = await response.json()
            if (!response.ok) {
                if (responseData.code === "DUPLICATE_SLUG") setSlugConflict(true)
                throw new Error(responseData.error || "Failed to create product")
            }

            toast.success("Product created successfully!")
            router.push("/admin/products")
        } catch (err: any) {
            setError(err.message)
            toast.error(err.message)
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
                    <div className="flex gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                                setFormData({
                                    name: "Infinity Seamless High-Rise",
                                    slug: "infinity-seamless-high-rise",
                                    subtitle: "70% Organic Bamboo / Elite Moisture-Wick Series",
                                    description: "The Infinity High-Rise is our most advanced silhouette to date. Engineered with a 360-degree seamless tubular knit using OEKO-TEX certified organic bamboo fibers, it offers unparalleled breathability and a zero-pressure fit. Features a dual-layer soft-stretch waistband and a signature anti-bacterial lining for all-day freshness.",
                                    price: "16.90",
                                    originalPrice: "22.00",
                                    category_id: "736b0880-e378-4be4-97d6-28e7494d0f21",
                                    badge: "TOP SELLER",
                                    image: "/images/epiccotn/lifestyle.png",
                                    hoverImage: "/images/epiccotn/seamless-fit-poster.png",
                                    gallery: ["/images/epiccotn/back.png", "/images/epiccotn/crotch.png", "/images/epiccotn/diagram.png", "", ""],
                                });
                                setVariants(["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"]);
                                toast.success("Flagship DNA Loaded");
                            }}
                            className="h-10 border-primary text-primary font-syne font-black uppercase tracking-widest text-[10px] rounded-none px-6"
                        >
                            Load Flagship DNA
                        </Button>
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold font-syne uppercase tracking-widest animate-bounce">
                                Error: {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* 1. Identity Segment */}
                        <div className="bg-card border border-border p-10 shadow-sm relative overflow-hidden group">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-10">Product Identity</h2>
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Style Name *</Label>
                                        <Input value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none text-lg font-bold" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className={cn("text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground", slugConflict && "text-red-500")}>URL Identifier (Slug)</Label>
                                        <Input value={formData.slug} onChange={(e) => handleInputChange("slug", e.target.value)} className={cn("h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none", slugConflict && "border-red-500 text-red-500")} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Core Subtitle</Label>
                                    <Input value={formData.subtitle} onChange={(e) => handleInputChange("subtitle", e.target.value)} className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Detailed Description</Label>
                                    <Textarea value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={6} className="bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none p-6 leading-relaxed" />
                                </div>
                            </div>
                        </div>

                        {/* 2. Value & Economics */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-10">Pricing & Values</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Selling Price (USD) *</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 font-bold">$</span>
                                        <Input type="number" step="0.01" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} className="h-14 pl-10 bg-background border-border text-foreground font-syne font-black text-xl focus:border-primary/50 focus:ring-0 rounded-none" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Comparison Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 font-bold">$</span>
                                        <Input type="number" step="0.01" value={formData.originalPrice} onChange={(e) => handleInputChange("originalPrice", e.target.value)} className="h-14 pl-10 bg-background border-border text-muted-foreground font-syne font-bold focus:border-border/50 focus:ring-0 rounded-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Media Hub */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-10">Visual Assets</h2>
                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Master Image URL</Label>
                                    <Input value={formData.image} onChange={(e) => handleInputChange("image", e.target.value)} className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none" />
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Interaction Hover URL</Label>
                                    <Input value={formData.hoverImage} onChange={(e) => handleInputChange("hoverImage", e.target.value)} className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground flex items-center justify-between">Additional Gallery Stack <span className="text-[8px] text-primary font-black">MULTI-DIMENSIONAL</span></Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {formData.gallery.map((url, idx) => (
                                        <div key={idx} className="relative group/field">
                                            <Input value={url} onChange={(e) => { const n = [...formData.gallery]; n[idx] = e.target.value; setFormData({ ...formData, gallery: n }) }} placeholder={`Perspective ${idx + 1}`} className="h-14 bg-background border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none pr-10" />
                                            {idx === formData.gallery.length - 1 && <Button type="button" variant="ghost" size="icon" onClick={() => setFormData({ ...formData, gallery: [...formData.gallery, ""] })} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hover:bg-primary/10 rounded-none"><Plus className="h-4 w-4" /></Button>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 4. Color DNA */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-2">Shade Palette</h2>
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-10">Manage color variants and their specific visual mapping.</p>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-6 p-6 border border-dashed border-border group-hover:border-primary/30 transition-colors">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Color Name</Label>
                                        <Input value={currentColor.name} onChange={(e) => setCurrentColor({ ...currentColor, name: e.target.value })} placeholder="Midnight Jet" className="h-12 bg-background border-border text-foreground font-syne uppercase font-bold text-xs focus:ring-0 rounded-none" />
                                    </div>
                                    <div className="flex gap-4">
                                        <Input type="color" value={currentColor.hex} onChange={(e) => setCurrentColor({ ...currentColor, hex: e.target.value })} className="w-12 h-12 p-0 border-none cursor-pointer rounded-none" />
                                        <Input value={currentColor.images[0]} onChange={(e) => setCurrentColor({ ...currentColor, images: [e.target.value] })} placeholder="Image URL" className="flex-1 h-12 bg-background border-border text-foreground font-inter text-xs focus:ring-0 rounded-none" />
                                        <Button type="button" variant="outline" onClick={addColorVariant} className="h-12 w-12 border-primary text-primary hover:bg-primary hover:text-white rounded-none"><Plus className="h-5 w-5" /></Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {colorVariants.map((variant, idx) => (
                                        <div key={idx} className="bg-background border border-border p-4 relative group/v">
                                            <div className="w-6 h-6 border border-border mb-3" style={{ backgroundColor: variant.hex }} />
                                            <p className="text-[10px] font-syne font-black text-foreground uppercase truncate">{variant.name}</p>
                                            <button onClick={(e) => { e.preventDefault(); removeColorVariant(idx); }} className="absolute top-2 right-2 opacity-0 group-hover/v:opacity-100 text-red-500 transition-opacity"><X className="h-3 w-3" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 5. Size Matrix */}
                        <div className="bg-card border border-border p-10 shadow-sm">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4 mb-2">Size Distribution</h2>
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-10">Select standard fleet sizes or define custom labels.</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].map((sz) => (
                                    <button key={sz} type="button" onClick={() => { if (variants.includes(sz)) setVariants(variants.filter(v => v !== sz)); else setVariants([...variants, sz]) }} className={cn("h-14 border font-syne font-black text-xs transition-all uppercase tracking-widest", variants.includes(sz)? "bg-primary border-primary text-primary-foreground shadow-lg" : "bg-background border-border text-muted-foreground hover:border-primary/50")}>{sz}</button>
                                ))}
                            </div>
                            {variants.length > 0 && <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-2">{variants.map((v, i) => (<div key={i} className="bg-muted px-4 py-2 font-syne font-bold text-[9px] uppercase tracking-widest text-primary flex items-center gap-2">{v}<button onClick={() => setVariants(variants.filter(x => x !== v))} className="hover:text-foreground"><X className="w-2.5 h-2.5" /></button></div>))}</div>}
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-card border border-border p-8 shadow-sm space-y-8 sticky top-10">
                            <h2 className="text-xs font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground border-l-2 border-primary pl-4">Logistics Hub</h2>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground">Collection *</Label>
                                <select value={formData.category_id} onChange={(e) => handleInputChange("category_id", e.target.value)} className="w-full h-14 bg-background border border-border text-foreground font-bold font-syne uppercase text-[11px] px-6 rounded-none appearance-none focus:border-primary/50 outline-none cursor-pointer" required>
                                    <option value="">Select Collection</option>
                                    {categoriesList.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                                <Button type="submit" disabled={loading} className="w-full h-18 bg-primary text-primary-foreground hover:bg-black hover:text-white transition-all duration-300 font-syne font-black uppercase tracking-[0.2em] rounded-none text-sm shadow-[0_10px_30px_rgba(148,182,39,0.2)] active:scale-[0.98]">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Launch This Style"}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
