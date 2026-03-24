import { getAdminStats } from "@/lib/fetchers"
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
    const stats = await getAdminStats()

    if (!stats) {
        return <div className="p-8 text-white/50 font-syne uppercase tracking-widest text-[10px]">Access Denied</div>
    }

    const cards = [
        {
            title: "Total Revenue",
            value: (stats.totalRevenue / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            icon: DollarSign,
            color: "text-primary",
            bg: "bg-primary/10",
            trend: "+12.5%"
        },
        {
            title: "Active Orders",
            value: stats.totalOrders,
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-600/10",
            trend: "+4 new"
        },
        {
            title: "Total Products",
            value: stats.totalProducts,
            icon: ShoppingBag,
            color: "text-purple-600",
            bg: "bg-purple-600/10",
            trend: "Epiccotn Line"
        }
    ]

    return (
        <div className="space-y-12 animate-in fade-in duration-700" suppressHydrationWarning>
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold text-foreground font-syne uppercase tracking-tight">Overview</h1>
                <p className="text-muted-foreground font-medium text-sm">Real-time performance of your Epiccotn store.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-card border border-border p-8 rounded-none group hover:border-primary/30 transition-all duration-500 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 ${card.bg} rounded-none`}>
                                <card.icon className={`h-6 w-6 ${card.color}`} />
                            </div>
                            <span className="text-[10px] font-syne font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1 group-hover:text-primary transition-colors">
                                {card.trend} <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-syne font-bold text-muted-foreground uppercase tracking-[0.2em]">{card.title}</p>
                            <p className="text-4xl font-black text-foreground font-syne tracking-tighter">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-card border border-border p-8 shadow-sm">
                    <h3 className="text-xs font-bold font-syne uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-3">
                        <span className="w-1 h-3 bg-primary" />
                        Quick Management
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/products/add" className="p-4 bg-background border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group">
                            <p className="text-[10px] font-syne font-bold text-foreground uppercase tracking-widest group-hover:text-primary">Add New Product</p>
                            <p className="text-[9px] text-muted-foreground mt-1 uppercase">Launch a new style</p>
                        </Link>
                        <Link href="/admin/orders" className="p-4 bg-background border border-border hover:border-foreground/20 transition-all">
                            <p className="text-[10px] font-syne font-bold text-foreground uppercase tracking-widest">Process Orders</p>
                            <p className="text-[9px] text-muted-foreground mt-1 uppercase">View pending shipments</p>
                        </Link>
                    </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="bg-card border border-border p-8 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xs font-bold font-syne uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
                            <span className="w-1 h-3 bg-primary" />
                            Growth Metrics
                        </h3>
                        <TrendingUp className="w-4 h-4 text-primary opacity-30" />
                    </div>
                    <div className="h-32 flex items-end gap-1.5 px-2">
                        {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-muted hover:bg-primary/50 transition-all duration-500 cursor-help group relative" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary px-2 py-0.5 text-[8px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
