"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function AddCategoryPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        image: "",
        sort_order: "0"
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Auto-generate slug from name
        if (field === "name" && !formData.slug) {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            setFormData((prev) => ({ ...prev, slug }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name) {
            toast.error("Name is required")
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    sort_order: parseInt(formData.sort_order) || 0
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || "Failed to create category")
            }

            toast.success("Category created successfully!")
            router.push("/admin/products") // Redirect back to products to use the new category
        } catch (err: any) {
            toast.error(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/products" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
                <p className="text-gray-500 mt-2">Create a new category for your products.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Category Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="e.g. Premium Cases"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => handleInputChange("slug", e.target.value)}
                                placeholder="premium-cases"
                            />
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Auto-generated from name if left blank</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (optional)</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Describe this category..."
                                rows={3}
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL (optional)</Label>
                                <Input
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) => handleInputChange("image", e.target.value)}
                                    placeholder="/images/categories/cases.jpg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => handleInputChange("sort_order", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-gray-900 hover:bg-gray-800 text-white min-w-[140px]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Category"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
