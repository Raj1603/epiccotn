"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

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
            console.log("Loaded categories for dropdown:", data)
            setCategoriesList(data)
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
        <div>
            {/* Header */}
            <div className="mb-8">
                <Link href="/admin/products" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder="Modern Leather Case"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="slug" className={slugConflict ? "text-red-500" : ""}>Slug</Label>
                                    <Input
                                        id="slug"
                                        value={formData.slug}
                                        onChange={(e) => handleInputChange("slug", e.target.value)}
                                        placeholder="modern-leather-case"
                                        className={slugConflict ? "border-red-500 focus:ring-red-500" : ""}
                                    />
                                    {slugConflict ? (
                                        <p className="text-xs text-red-500 mt-1 font-medium underline animate-pulse">
                                            This slug is already taken. Please slightly change the name or slug above.
                                        </p>
                                    ) : (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {manualSlug ? "Manually edited" : "Auto-generated from name"}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="subtitle">Subtitle</Label>
                                    <Input
                                        id="subtitle"
                                        value={formData.subtitle}
                                        onChange={(e) => handleInputChange("subtitle", e.target.value)}
                                        placeholder="iPhone 16 Pro Max | Horween®"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Product description..."
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Price (USD) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        placeholder="59.99"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="originalPrice">Original Price (optional)</Label>
                                    <Input
                                        id="originalPrice"
                                        type="number"
                                        step="0.01"
                                        value={formData.originalPrice}
                                        onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                                        placeholder="79.99"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="image">Main Image URL</Label>
                                    <Input
                                        id="image"
                                        value={formData.image}
                                        onChange={(e) => handleInputChange("image", e.target.value)}
                                        placeholder="/images/product-main.jpg"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="hoverImage">Hover Image URL (optional)</Label>
                                    <Input
                                        id="hoverImage"
                                        value={formData.hoverImage}
                                        onChange={(e) => handleInputChange("hoverImage", e.target.value)}
                                        placeholder="/images/product-hover.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Gallery Images (Infographics, etc.)</h2>
                            <p className="text-sm text-gray-500 mb-4">Add up to 7+ images total for a premium vertical stack.</p>
                            <div className="space-y-3">
                                {formData.gallery.map((url, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <Input
                                            value={url}
                                            onChange={(e) => {
                                                const newGallery = [...formData.gallery]
                                                newGallery[idx] = e.target.value
                                                setFormData({ ...formData, gallery: newGallery })
                                            }}
                                            placeholder={`Gallery Image ${idx + 1} URL`}
                                        />
                                        {idx === formData.gallery.length - 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setFormData({ ...formData, gallery: [...formData.gallery, ""] })}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Color Variants */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Variants</h2>

                            {/* Existing Variants */}
                            {colorVariants.length > 0 && (
                                <div className="mb-6 space-y-3">
                                    {colorVariants.map((variant, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-8 h-8 rounded-full border-2 border-gray-300" style={{ backgroundColor: variant.hex }} />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{variant.name}</p>
                                                <p className="text-xs text-gray-500">{variant.images.length} image(s)</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeColorVariant(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add New Variant */}
                            <div className="space-y-4 p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Color Name</Label>
                                        <Input
                                            value={currentColor.name}
                                            onChange={(e) => setCurrentColor({ ...currentColor, name: e.target.value })}
                                            placeholder="Black"
                                        />
                                    </div>
                                    <div>
                                        <Label>Color Hex</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={currentColor.hex}
                                                onChange={(e) => setCurrentColor({ ...currentColor, hex: e.target.value })}
                                                className="w-16"
                                            />
                                            <Input
                                                value={currentColor.hex}
                                                onChange={(e) => setCurrentColor({ ...currentColor, hex: e.target.value })}
                                                placeholder="#000000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label>Image URLs</Label>
                                    {currentColor.images.map((img, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <Input
                                                value={img}
                                                onChange={(e) => {
                                                    const newImages = [...currentColor.images]
                                                    newImages[idx] = e.target.value
                                                    setCurrentColor({ ...currentColor, images: newImages })
                                                }}
                                                placeholder="/images/product-black-1.jpg"
                                            />
                                            {idx === currentColor.images.length - 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentColor({ ...currentColor, images: [...currentColor.images, ""] })}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <Button type="button" variant="outline" onClick={addColorVariant} className="w-full">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Color Variant
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Category & Status */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category & Status</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="category_id">Category *</Label>
                                    <select
                                        id="category_id"
                                        value={formData.category_id}
                                        onChange={(e) => {
                                            if (e.target.value === "ADD_NEW") {
                                                router.push("/admin/categories/add")
                                            } else {
                                                handleInputChange("category_id", e.target.value)
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        <option value="ADD_NEW" className="font-bold text-blue-600">+ Add New Category</option>
                                        {categoriesList.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor="badge">Badge/Label</Label>
                                    <select
                                        id="badge"
                                        value={formData.badge}
                                        onChange={(e) => handleInputChange("badge", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    >
                                        <option value="">None</option>
                                        <option value="NEW">New</option>
                                        <option value="TOP SELLER">Top Seller</option>
                                        <option value="SAVE">Save</option>
                                        <option value="HOT">Hot</option>
                                        <option value="LIMITED EDITION">Limited Edition</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="space-y-3">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gray-900 hover:bg-gray-800"
                                >
                                    {loading ? "Creating..." : "Create Product"}
                                </Button>
                                <Link href="/admin/products" className="block">
                                    <Button type="button" variant="outline" className="w-full">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
