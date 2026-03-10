"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardOrders() {
    const [orders, setOrders] = useState<any[]>([])

    useEffect(() => {
        const savedOrders = localStorage.getItem("demoOrders")
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders))
        }
    }, [])

    if (orders.length === 0) {
        return (
            <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="text-gray-500 mt-2 mb-6">Looks like you haven't made any purchases yet.</p>
                <Button asChild>
                    <Link href="/">Start Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="divide-y divide-gray-100">
            {orders.map((order) => (
                <div key={order.id} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-xs text-gray-500">
                                Placed on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                {order.status}
                            </span>
                            <span className="font-bold text-gray-900">
                                {(order.total_amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
