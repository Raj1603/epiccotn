"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [categoryId, setCategoryId] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        image: "",
        sort_order: "0"
    })

    useEffect(() => {
        params.then(({ id }) => {
            setCategoryId(id)
            fetchCategory(id)
        })
    }, [])

    const fetchCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/categories/${id}`)
            const data = await response.json()

            setFormData({
                name: data.name || "",
                slug: data.slug || "",
                description: data.description || "",
                image: data.image || "",
                sort_order: (data.sort_order ?? 0).toString()
            })
        } catch (error) {
            toast.error("Failed to load category")
        } finally {
            setFetching(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`/api/categories/${categoryId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    sort_order: parseInt(formData.sort_order) || 0
                }),
            })

            if (response.ok) {
                toast.success("Category updated successfully!")
                router.push("/admin/categories")
            } else {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to update")
            }
        } catch (err: any) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-500">Loading category...</p>
            </div>
        )
    }

    return (
        <div suppressHydrationWarning>
            <div className="mb-8">
                <Link href="/admin/categories" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Categories
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                    <div>
                        <Label htmlFor="name">Category Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => {
                                const name = e.target.value
                                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                                setFormData({ ...formData, name, slug })
                            }}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description (optional)</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div>
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="/images/category.jpg"
                        />
                    </div>

                    <div>
                        <Label htmlFor="sort_order">Sort Order</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            value={formData.sort_order}
                            onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Link href="/admin/categories">
                        <Button type="button" variant="outline">Cancel</Button>
                    </Link>
                    <Button type="submit" disabled={loading} className="bg-gray-900 hover:bg-gray-800">
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
