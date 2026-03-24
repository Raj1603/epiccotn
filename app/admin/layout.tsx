import Link from "next/link"
import { redirect } from "next/navigation"
import { Package, LayoutDashboard, ShoppingBag, ArrowLeft, Tag, Settings, Users, BarChart3 } from "lucide-react"
import { getUserProfile } from "@/lib/fetchers"
import { Header } from "@/components/header"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const profile = await getUserProfile()

    if (!profile) {
        redirect("/login")
    }

    const isAdmin = profile.role === "admin" || profile.email === "rajijaymuna1603@gmail.com"

    if (!isAdmin) {
        redirect("/")
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-inter" suppressHydrationWarning>
            {/* Top Bar for Admin */}
            <div className="h-[60px] border-b border-border bg-black flex items-center justify-between px-6 lg:px-8">
                <Link href="/admin" className="font-syne text-[20px] font-extrabold text-foreground tracking-[-0.02em] flex items-center">
                    Epiccotn<span className="text-lime text-base ml-0.5 mt-1 font-black">Admin</span>
                    <span className="w-1.5 h-1.5 bg-lime ml-1 mt-1.5" />
                </Link>
                
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-syne font-bold text-lime uppercase tracking-widest">{profile.role}</span>
                        <span className="text-[12px] text-muted-foreground font-medium">{profile.email}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-black border-r border-border hidden md:flex flex-col">
                    <nav className="flex-1 p-6 space-y-2">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold font-syne uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border border-transparent"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Overview
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold font-syne uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border border-transparent"
                        >
                            <Package className="h-4 w-4" />
                            Orders
                        </Link>
                        <Link
                            href="/admin/products"
                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold font-syne uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border border-transparent"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Products
                        </Link>
                        <Link
                            href="/admin/categories"
                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold font-syne uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border border-transparent"
                        >
                            <Tag className="h-4 w-4" />
                            Categories
                        </Link>
                        <div className="h-px bg-border my-4" />
                        <Link
                            href="/admin/analytics"
                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold font-syne uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border border-transparent"
                        >
                            <BarChart3 className="h-4 w-4" />
                            Insights
                        </Link>
                    </nav>

                    <div className="p-6 border-t border-border bg-muted/20">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 w-full py-3 text-[10px] font-bold font-syne uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all bg-muted hover:bg-muted/80"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Return to Shop
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-background">
                    <div className="p-8 lg:p-12 max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
