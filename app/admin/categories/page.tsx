"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, LayoutGrid } from "lucide-react"
import { toast } from "sonner"
import type { Category } from "@/lib/types"

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories")
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            toast.error("Failed to load categories")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category? Products in this category will become uncategorized.")) return

        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
            })

            const result = await response.json()

            if (response.ok) {
                toast.success("Category deleted successfully")
                fetchCategories()
            } else {
                toast.error(result.error || "Failed to delete")
            }
        } catch (error) {
            toast.error("Failed to delete category")
        }
    }

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <LayoutGrid className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-500">Loading categories...</p>
                </div>
            </div>
        )
    }

    return (
        <div suppressHydrationWarning>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-500 mt-1">{categories.length} total categories</p>
                </div>
                <Link href="/admin/categories/add">
                    <Button className="bg-gray-900 hover:bg-gray-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            </div>

            {/* Categories Table */}
            {filteredCategories.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <LayoutGrid className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or add a new category.</p>
                    <Link href="/admin/categories/add">
                        <Button className="bg-gray-900 hover:bg-gray-800">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Category
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Slug
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCategories.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                    <Image
                                                        src={cat.image || "/images/osyndo_logo.svg"}
                                                        alt={cat.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {cat.slug}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${!cat.parent_id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {!cat.parent_id ? 'Root' : 'Subcategory'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/categories/edit/${cat.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(cat.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
