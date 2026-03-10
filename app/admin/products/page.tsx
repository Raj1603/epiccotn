"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Package } from "lucide-react"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

export default function AdminProductsPage() {
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/products")
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            toast.error("Failed to load products")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                toast.success("Product deleted successfully")
                fetchProducts()
            } else {
                throw new Error("Failed to delete")
            }
        } catch (error) {
            toast.error("Failed to delete product")
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(price)
    }

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const categories = ["all", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))]

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-500">Loading products...</p>
                </div>
            </div>
        )
    }

    return (
        <div suppressHydrationWarning>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 mt-1">{products.length} total products</p>
                </div>
                <Link href="/admin/products/add">
                    <Button className="bg-gray-900 hover:bg-gray-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            if (e.target.value === "add-new") {
                                router.push("/admin/categories/add")
                            } else {
                                setSelectedCategory(e.target.value)
                            }
                        }}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                        <option value="add-new" className="font-bold text-blue-600">
                            + Add Category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat === "all" ? "All Categories" : cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Table */}
            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">
                        {searchQuery || selectedCategory !== "all"
                            ? "Try adjusting your filters"
                            : "Get started by adding your first product"}
                    </p>
                    {!searchQuery && selectedCategory === "all" && (
                        <Link href="/admin/products/add">
                            <Button className="bg-gray-900 hover:bg-gray-800">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Product
                            </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-12 w-12 flex-shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    <div className="text-sm text-gray-500">{product.subtitle}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                {product.category || "Uncategorized"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatPrice(product.price)}</div>
                                            {product.originalPrice && (
                                                <div className="text-sm text-gray-500 line-through">
                                                    {formatPrice(product.originalPrice)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {product.badge && (
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {product.badge}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/products/edit/${product.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(product.id)}
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
