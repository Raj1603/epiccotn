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
        <div className="min-h-screen bg-black flex flex-col">
            <Header notifications={notifications} />

            <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Welcome Header */}
                    <div className="flex items-center justify-between bg-offblack p-8 rounded-2xl shadow-sm border border-white/10">
                        <div>
                            <h1 className="text-2xl font-bold text-white uppercase font-syne tracking-tight">Welcome back, {user.full_name || 'Wellness Partner'}</h1>
                            <p className="text-white/40 mt-1 font-inter">{user.email}</p>
                        </div>
                        <form action={signOut}>
                            <Button variant="outline" className="flex items-center gap-2 border-white/10 hover:bg-white/5 text-white">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </form>
                    </div>

                    {/* Order History */}
                    <div className="bg-offblack rounded-2xl shadow-sm border border-white/10 overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white uppercase font-syne tracking-tight flex items-center gap-2">
                                <Package className="h-5 w-5 text-lime" />
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
