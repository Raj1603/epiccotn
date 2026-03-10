import Link from "next/link"
import { redirect } from "next/navigation"
import { Package, LayoutDashboard, ShoppingBag, ArrowLeft, Tag } from "lucide-react"
import { getUserProfile } from "@/lib/fetchers"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Fetch user profile which includes the role from 'profiles' table
    const profile = await getUserProfile()

    if (!profile) {
        // Not logged in - redirect to login
        redirect("/login")
    }

    // Check if user has admin role
    const isAdmin = profile.role === "admin" || profile.email === "rajijaymuna1603@gmail.com"

    if (!isAdmin) {
        // Not an admin - redirect to homepage
        console.log("Access denied - not admin:", profile.email)
        redirect("/")
    }

    console.log("Admin access granted:", profile.email)

    return (
        <div className="min-h-screen bg-gray-50 flex" suppressHydrationWarning>
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold tracking-tight text-gray-900">Osyndo Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100"
                    >
                        <LayoutDashboard className="h-5 w-5 text-gray-400" />
                        Overview
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                    >
                        <Package className="h-5 w-5 text-gray-400" />
                        Orders
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ShoppingBag className="h-5 w-5 text-gray-400" />
                        Products
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                    >
                        <Tag className="h-5 w-5 text-gray-400" />
                        Categories
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-400" />
                        Back to Shop
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
