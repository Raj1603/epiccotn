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
            <div className="p-12 text-center bg-black/50">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <Package className="h-8 w-8 text-white/20" />
                </div>
                <h3 className="text-lg font-medium text-white uppercase font-syne tracking-tight">No orders yet</h3>
                <p className="text-white/40 mt-2 mb-6 font-inter text-sm">Looks like you haven't made any purchases yet.</p>
                <Button asChild className="bg-lime text-black hover:bg-lime/90 font-syne font-bold uppercase tracking-wider text-xs px-8">
                    <Link href="/">Start Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="divide-y divide-white/10 bg-black/50">
            {orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-white/[0.02] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                        <div>
                            <p className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-xs text-white/60 mt-1 font-inter">
                                Placed on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-lime/10 text-lime border border-lime/20">
                                {order.status}
                            </span>
                            <span className="font-bold text-lime font-mono">
                                {order.total_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="relative w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white uppercase font-syne tracking-tight">{item.product.name}</p>
                                    <p className="text-xs text-white/40 font-mono uppercase">Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
