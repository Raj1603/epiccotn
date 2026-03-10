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
        price: "",
        originalPrice: "",
        category_id: "",
        badge: "",
        image: "",
        hoverImage: "",
        gallery: ["", "", "", "", ""],
    })

    const [colorVariants, setColorVariants] = useState<ColorVariant[]>([])
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
            setCategoriesList(data)
        } catch (error) {
            console.error("Failed to load categories")
        }
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
                price: data.price ? data.price.toString() : "",
                originalPrice: data.originalPrice ? data.originalPrice.toString() : "",
                category_id: data.categoryId || "",
                badge: data.badge || "",
                image: data.image || "",
                hoverImage: data.hoverImage || "",
                gallery: data.gallery || ["", "", "", "", ""],
            })

            if (data.color_variants) {
                setColorVariants(data.color_variants)
            }
        } catch (error) {
            toast.error("Failed to load product")
        } finally {
            setFetching(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.price || !formData.category_id) {
            toast.error("Please fill in required fields: Name, Price, and Category")
            return
        }

        setLoading(true)
        try {
            const images = [formData.image, formData.hoverImage, ...formData.gallery].filter(Boolean)
            const poductData = {
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                description: formData.description,
                price: Math.round(parseFloat(formData.price) * 100),
                compare_at_price: formData.originalPrice ? Math.round(parseFloat(formData.originalPrice) * 100) : null,
                category_id: formData.category_id,
                images: images,
            }

            const response = await fetch(`/api/products/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(poductData),
            })

            if (!response.ok) throw new Error("Failed to update product")

            toast.success("Product updated successfully!")
            router.push("/admin/products")
        } catch (err: any) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    if (fetching) return <div className="p-8">Loading...</div>

    return (
        <div suppressHydrationWarning>
            <div className="mb-8">
                <Link href="/admin/products" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                            <div>
                                <Label htmlFor="name">Product Name *</Label>
                                <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
                            </div>
                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" value={formData.slug} onChange={(e) => handleInputChange("slug", e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={6} />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Price (USD) *</Label>
                                    <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} required />
                                </div>
                                <div>
                                    <Label htmlFor="originalPrice">Original Price</Label>
                                    <Input id="originalPrice" type="number" step="0.01" value={formData.originalPrice} onChange={(e) => handleInputChange("originalPrice", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="image">Main Image URL</Label>
                                    <Input id="image" value={formData.image} onChange={(e) => handleInputChange("image", e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="hoverImage">Hover Image URL</Label>
                                    <Input id="hoverImage" value={formData.hoverImage} onChange={(e) => handleInputChange("hoverImage", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Gallery Images</h2>
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
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category & Status</h2>
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
                                </select>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <Button type="submit" disabled={loading} className="w-full bg-gray-900 hover:bg-gray-800">
                                {loading ? "Updating..." : "Update Product"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
