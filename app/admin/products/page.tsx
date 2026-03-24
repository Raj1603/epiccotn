"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Package, Filter, MoreHorizontal, ExternalLink, Leaf, ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

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
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <Package className="h-10 w-10 text-lime animate-pulse" />
                <p className="text-[10px] font-syne font-bold text-white/30 uppercase tracking-[0.2em]">Inventory loading...</p>
            </div>
        )
    }

    // Mock Stock Healthy data
    const getStockHealth = (id: number) => {
        const levels = ["Healthy", "Low Stock", "Out of Stock", "Restocked"];
        const status = levels[id % levels.length];
        return {
            status,
            color: status === "Healthy" ? "bg-emerald-500" : 
                   status === "Low Stock" ? "bg-amber-500" : 
                   status === "Out of Stock" ? "bg-red-500" : "bg-blue-500"
        };
    }

    const getMaterialSplit = (category: string) => {
        if (category === "Bamboo Blend") return "70% BM / 30% CT";
        if (category === "Cotton Luxe") return "100% Cotton";
        return "Hybrid Blend";
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500" suppressHydrationWarning>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold text-foreground font-syne uppercase tracking-tight">Catalog</h1>
                    <p className="text-muted-foreground font-medium text-sm">Fine-tune the Epiccotn style lineup.</p>
                </div>
                <Link href="/admin/products/add">
                    <Button className="bg-primary text-primary-foreground hover:bg-foreground font-syne font-bold uppercase tracking-widest text-[11px] h-12 px-8 rounded-none transition-all shadow-md">
                        <Plus className="h-4 w-4 mr-2" />
                        Launch New Style
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-2 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search styles, SKUs, materials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-14 bg-card border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none transition-all placeholder:text-muted-foreground/30 shadow-sm"
                    />
                </div>
                <div className="relative h-14">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full h-full bg-card border border-border text-foreground text-xs font-bold font-syne uppercase tracking-widest px-6 appearance-none focus:border-primary/50 outline-none rounded-none cursor-pointer shadow-sm"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat} className="bg-white text-foreground">
                                {cat === "all" ? "All Collections" : cat}
                            </option>
                        ))}
                    </select>
                    <Filter className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30 pointer-events-none" />
                </div>
                <div className="bg-muted/30 h-14 border border-border flex items-center justify-center gap-6 px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Healthy</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Low</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-none overflow-hidden shadow-sm">
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-muted/20">
                                <th className="px-8 py-5 text-left text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Product Archetype</th>
                                <th className="px-8 py-5 text-left text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Material Split</th>
                                <th className="px-8 py-5 text-left text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Retail Value</th>
                                <th className="px-8 py-5 text-left text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Stock Health</th>
                                <th className="px-8 py-5 text-right text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredProducts.map((product) => {
                                const health = getStockHealth(Number(product.id));
                                return (
                                <tr key={product.id} className="group hover:bg-muted/20 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-5">
                                            <div className="h-16 w-14 bg-muted border border-border flex-shrink-0 relative overflow-hidden group-hover:border-primary/20 transition-all shadow-sm">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-[14px] font-extrabold font-syne text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[8px] font-bold text-muted-foreground/30 border border-border px-2 py-0.5 uppercase tracking-widest flex items-center gap-1.5 group-hover:border-primary/20 transition-colors">
                                                        <span className="w-1 h-1 bg-border group-hover:bg-primary transition-colors" />
                                                        Ref: {product.id.toString().padStart(4, '0')}
                                                    </span>
                                                    {product.badge && (
                                                        <span className="text-[8px] font-black text-primary bg-primary/5 px-2 py-0.5 uppercase tracking-[0.2em]">{product.badge}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1.5">
                                            <div className="text-[10px] font-bold font-syne text-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                <Leaf className="w-3 h-3 text-primary" />
                                                {product.category || "Bamboo Blend"}
                                            </div>
                                            <div className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-widest border-l-2 border-primary/30 pl-2">
                                                {getMaterialSplit(product.category)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black font-syne text-foreground tracking-tighter">{formatPrice(product.price)}</span>
                                            {product.originalPrice && (
                                                <span className="text-[10px] text-muted-foreground/30 line-through font-bold tracking-widest">{formatPrice(product.originalPrice)}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-2">
                                            <div className={cn(
                                                "h-1 w-24 bg-muted overflow-hidden relative"
                                            )}>
                                                <div className={cn("absolute inset-0 h-full transition-all duration-500", health.color)} style={{ width: health.status === "Healthy" ? "80%" : "20%" }} />
                                            </div>
                                            <span className="text-[9px] font-black font-syne text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                                                <div className={cn("w-1.5 h-1.5 rounded-full", health.color)} />
                                                {health.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                            <Link href={`/products/${product.id}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground/30 hover:text-foreground hover:bg-white rounded-none border border-transparent hover:border-border transition-all">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/products/edit/${product.id}`}>
                                                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground/30 hover:text-foreground hover:bg-white rounded-none border border-transparent hover:border-border transition-all">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(product.id)}
                                                className="h-10 w-10 text-muted-foreground/30 hover:text-red-500 hover:bg-red-50 rounded-none border border-transparent hover:border-red-100 transition-all"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                
                {filteredProducts.length === 0 && (
                    <div className="py-24 text-center">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground/10 mx-auto mb-4" />
                        <p className="text-[10px] font-syne font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">Catalog search returned no matching styles</p>
                    </div>
                )}
            </div>
        </div>
    )
}
