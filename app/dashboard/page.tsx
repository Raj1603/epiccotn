import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Package, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getOrders, getUserProfile, getNavigationCategories, getNotifications } from "@/lib/fetchers"
import { createClient } from "@/lib/supabase/server"

import { DashboardOrders } from "@/components/dashboard-orders"

export default async function DashboardPage() {
    const user = await getUserProfile()
    if (!user) {
        redirect("/login")
    }

    const navCategories = await getNavigationCategories()
    const notifications = await getNotifications()

    // Sign out action
    async function signOut() {
        "use server"
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect("/")
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header notifications={notifications} />

            <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Welcome Header */}
                    <div className="flex items-center justify-between bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.full_name || 'Wellness Partner'}</h1>
                            <p className="text-gray-500 mt-1">{user.email}</p>
                        </div>
                        <form action={signOut}>
                            <Button variant="outline" className="flex items-center gap-2">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </form>
                    </div>

                    {/* Order History */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Package className="h-5 w-5 text-gray-400" />
                                Order History
                            </h2>
                        </div>
                        <DashboardOrders />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
