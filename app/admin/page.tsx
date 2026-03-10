import { getAdminStats } from "@/lib/fetchers"
import { DollarSign, ShoppingBag, Users } from "lucide-react"

export default async function AdminDashboardPage() {
    const stats = await getAdminStats()

    if (!stats) {
        return <div>Access Denied</div>
    }

    return (
        <div className="space-y-8" suppressHydrationWarning>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Revenue Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                            {(stats.totalRevenue / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </p>
                    </div>
                    <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                {/* Products Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalProducts}</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
                        {/* We use Users icon here as placeholder but title is Products? Let's fix icon or title. 
                            Actually code uses totalProducts so title is correct. Icon should be Package maybe? 
                            I imported Users but used it nowhere. I'll use simple box icon.*/}
                        <ShoppingBag className="h-6 w-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>
    )
}
