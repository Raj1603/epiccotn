"use client"

import { useState, useEffect } from "react"
import { 
    Tag, 
    Plus, 
    MoreVertical, 
    LayoutGrid, 
    ShoppingBag, 
    TrendingUp, 
    ArrowUpRight,
    Leaf,
    Layers,
    Smile,
    RefreshCw,
    Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [purging, setPurging] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/categories")
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            toast.error("Failed to load taxonomies")
        } finally {
            setLoading(false)
        }
    }

    const purgeAndSeed = async () => {
        if (!confirm("This will remove all placeholder categories (Apple Watch, etc.) and replace them with Epiccotn DNA. Continue?")) return
        
        try {
            setPurging(true)
            const response = await fetch("/api/admin/seed-epiccotn", { method: "POST" })
            const result = await response.json()
            
            if (result.success) {
                toast.success("Epiccotn DNA active. Logistics hub cleared.")
                fetchCategories()
            } else {
                toast.error(result.error || "Failed to purge placeholders")
            }
        } catch (error) {
            toast.error("Process error")
        } finally {
            setPurging(false)
        }
    }

    const pillars = [
        { icon: Leaf, label: "Materials", count: categories.filter(c => c.name.toLowerCase().includes('bamboo') || c.name.toLowerCase().includes('cotton')).length || 2, sub: "Bamboo & Cotton Hub" },
        { icon: Layers, label: "Silhouettes", count: Math.max(1, Math.ceil(categories.length / 2)), sub: "Styles & Shapes" },
        { icon: Smile, label: "Collections", count: 2, sub: "Occasion Based" }
    ]

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20" suppressHydrationWarning>
            {/* ... Header ... */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold text-foreground font-syne uppercase tracking-tight">Taxonomy</h1>
                    <p className="text-muted-foreground font-medium text-sm font-inter">Organize the Epiccotn catalog for maximum discoverability.</p>
                </div>
                <div className="flex gap-4">
                    <Button 
                        variant="outline" 
                        onClick={purgeAndSeed}
                        disabled={purging}
                        className="border-red-100 text-red-500 hover:bg-red-50 font-syne font-bold uppercase tracking-widest text-[9px] h-12 px-6 rounded-none transition-all"
                    >
                        {purging ? <RefreshCw className="h-3 w-3 mr-2 animate-spin" /> : <Trash2 className="h-3 w-3 mr-2" />}
                        Purge Template Data
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-foreground font-syne font-bold uppercase tracking-widest text-[11px] h-12 px-8 rounded-none transition-all shadow-md">
                        <Plus className="h-4 w-4 mr-2" />
                        New Taxonomy
                    </Button>
                </div>
            </div>

            {/* Pillar Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pillars.map((pillar, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-none flex items-center gap-5 shadow-sm group">
                        <div className="p-4 bg-muted/50 rounded-none group-hover:bg-primary/10 transition-colors">
                            <pillar.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-widest mb-1">{pillar.label}</p>
                            <p className="text-2xl font-black font-syne text-foreground tracking-tighter">{pillar.count} Active</p>
                            <p className="text-[9px] text-muted-foreground/60 uppercase font-bold mt-1 tracking-wider font-inter">{pillar.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Grid */}
            <div className="space-y-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-[10px] font-bold font-syne uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-primary" />
                        Collection Pillars & Style Hubs
                    </h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30">
                        {[1, 2, 3].map(i => <div key={i} className="h-60 bg-muted animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <div key={cat.id || i} className="group bg-card border border-border rounded-none overflow-hidden hover:border-foreground transition-all duration-500 shadow-sm relative">
                                <div className="p-10 relative">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-10 h-10 border border-border flex items-center justify-center bg-background group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                            <Tag className="w-4 h-4" />
                                        </div>
                                        <button className="text-muted-foreground/20 hover:text-foreground">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-syne font-black text-primary uppercase tracking-[0.2em] mb-2">Collection</p>
                                            <h3 className="text-3xl font-extrabold font-syne text-foreground tracking-tighter uppercase leading-none">{cat.name}</h3>
                                        </div>

                                        <div className="pt-8 border-t border-border flex items-end justify-between">
                                            <div className="space-y-1">
                                                <p className="text-[8px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Inventory Hub</p>
                                                <div className="flex items-center gap-2">
                                                    <ShoppingBag className="w-3 h-3 text-muted-foreground/30" />
                                                    <span className="text-sm font-black font-syne text-foreground tracking-tight">Active SKU Fleet</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center justify-end gap-1 text-[11px] font-black font-syne text-emerald-600">
                                                    +8.2% <TrendingUp className="w-3 h-3" />
                                                </div>
                                                <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">Velocity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-5 text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/30 border-t border-border transition-all flex items-center justify-center gap-3 group/btn">
                                    ANALYZE PERFORMANCE <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        ))}

                        <button className="h-full min-h-[340px] border-2 border-dashed border-border flex flex-col items-center justify-center gap-6 hover:border-primary/50 hover:bg-primary/[0.01] transition-all group">
                            <div className="w-14 h-14 bg-muted/50 group-hover:bg-primary/10 transition-all flex items-center justify-center">
                                <Plus className="w-6 h-6 text-muted-foreground/40 group-hover:text-primary" />
                            </div>
                            <p className="text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.3em]">Expand Taxonomy</p>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
