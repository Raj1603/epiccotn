"use client"

import { useState, useEffect } from "react"
import { Search, Package, Calendar, User, ShoppingCart, ArrowRight, Eye, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const storedOrders = localStorage.getItem("demoOrders")
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders))
        }
        setLoading(false)
    }, [])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price / 100)
    }

    const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <Clock className="h-10 w-10 text-lime animate-pulse" />
                <p className="text-[10px] font-syne font-bold text-white/30 uppercase tracking-[0.2em]">Syncing orders...</p>
            </div>
        )
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500" suppressHydrationWarning>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-extrabold text-foreground font-syne uppercase tracking-tight">Orders</h1>
                <p className="text-muted-foreground font-medium text-sm mt-2">Process and fulfill Epiccotn customer styles.</p>
            </div>

            {/* Quick Stats Mock */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Pending", count: orders.filter(o => o.status === "pending").length, color: "text-amber-600" },
                    { label: "Shipped", count: 0, color: "text-blue-600" },
                    { label: "Delivered", count: 0, color: "text-primary" },
                    { label: "Cancelled", count: 0, color: "text-red-600" }
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-4 py-3 flex items-center justify-between shadow-sm">
                        <span className="text-[9px] font-syne font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                        <span className={cn("text-lg font-black font-syne", stat.color)}>{stat.count}</span>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                <Input
                    placeholder="Search by Order ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-card border-border text-foreground font-inter focus:border-primary/50 focus:ring-0 rounded-none transition-all placeholder:text-muted-foreground/20 shadow-sm"
                />
            </div>

            {/* Orders Table */}
            <div className="bg-card border border-border rounded-none overflow-hidden shadow-sm">
                {filteredOrders.length === 0 ? (
                    <div className="py-24 text-center">
                        <Package className="h-10 w-10 text-muted-foreground/10 mx-auto mb-4" />
                        <p className="text-[10px] font-syne font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">No orders recorded yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-muted/20">
                                    <th className="px-8 py-5 text-left text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Transaction</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Style Selection</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Total Value</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Process Status</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-muted/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[11px] font-black font-syne text-foreground uppercase tracking-tight">#{order.id.slice(-6)}</span>
                                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-2">
                                                {order.items.map((item: any, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-8 h-10 bg-muted border border-border relative overflow-hidden flex-shrink-0">
                                                            <img src={item.product.image} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-bold text-foreground uppercase tracking-tight">{item.product.name} x {item.quantity}</div>
                                                            <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
                                                                {item.selectedSize || "L"} / {item.selectedColor || "Standard"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black font-syne text-primary">{formatPrice(order.total_amount)}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    order.status === "pending" ? "bg-amber-500" : "bg-primary"
                                                )} />
                                                <span className="text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-widest">
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <Button variant="ghost" size="sm" className="h-10 px-4 text-[10px] font-syne font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-none border border-transparent hover:border-border">
                                                    Details <Eye className="w-3 h-3 ml-2" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-10 px-4 text-[10px] font-syne font-bold uppercase tracking-widest text-primary-foreground bg-primary hover:bg-foreground transition-all rounded-none">
                                                    Fulfill <ArrowRight className="w-3 h-3 ml-2" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
