"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Package, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Order {
    id: string
    date: string
    total: number
    status: string
    items: Array<{
        id: string
        name: string
        image: string
        quantity: number
        price: number
    }>
}

export function AccountContent() {
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        const savedOrders = localStorage.getItem("orderHistory")
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders))
        }

        const email = localStorage.getItem("userEmail")
        if (email) {
            setUserEmail(email)
        }
    }, [])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(price)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
                            {userEmail && (
                                <div className="flex items-center gap-2 text-gray-600 mt-1">
                                    <Mail className="h-4 w-4" />
                                    <span className="text-sm">{userEmail}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Order History
                        </h2>
                        <span className="text-sm text-gray-500">{orders.length} orders</span>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                            <p className="text-gray-500 mb-6">
                                Looks like you haven't made any purchases yet.
                            </p>
                            <Button
                                onClick={() => router.push("/")}
                                className="bg-gray-900 hover:bg-gray-800"
                            >
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                                            <p className="text-sm text-gray-600 mt-1">{formatDate(order.date)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
