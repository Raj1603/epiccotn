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
        <div className="min-h-screen bg-black pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/[0.03] backdrop-blur-md p-10 mb-12 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-lime/10 blur-[100px] pointer-events-none group-hover:bg-lime/20 transition-all duration-700" />
                    <div className="flex items-center gap-8 mb-4 relative z-10">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-none flex items-center justify-center relative">
                            <User className="h-10 w-10 text-white/50" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime" />
                        </div>
                        <div>
                            <span className="text-[10px] font-syne font-bold text-lime uppercase tracking-[0.3em] font-black mb-2 block">Premium Member</span>
                            <h1 className="text-3xl font-extrabold text-white uppercase font-syne tracking-tight">Account Dashboard</h1>
                            {userEmail && (
                                <div className="flex items-center gap-2 text-white/40 mt-2 hover:text-white/60 transition-colors cursor-default">
                                    <Mail className="h-3.5 w-3.5" />
                                    <span className="text-xs font-syne font-bold uppercase tracking-wider">{userEmail}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-md p-10 border border-white/10">
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                        <h2 className="text-xl font-bold text-white uppercase font-syne tracking-tight flex items-center gap-3">
                            <Package className="h-5 w-5 text-lime" />
                            Order History
                        </h2>
                        <span className="text-[10px] text-white/30 font-syne font-bold tracking-[0.2em] uppercase">{orders.length} Total Purchased</span>
                    </div>
                    
                    {orders.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-8">
                                <Package className="h-10 w-10 text-white/10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 uppercase font-syne tracking-wider">No history found</h3>
                            <p className="text-white/40 mb-10 font-inter italic max-w-xs mx-auto text-sm leading-relaxed">
                                You haven't explored our collection yet. Start your wellness journey today.
                            </p>
                            <Button
                                onClick={() => router.push("/")}
                                className="bg-lime text-black hover:bg-lime-dk font-syne uppercase tracking-[0.2em] text-[11px] font-bold px-12 h-14 rounded-none transition-all shadow-[0_20px_40px_-10px_rgba(200,245,66,0.1)]"
                            >
                                Shop Collection →
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="border border-white/5 p-8 hover:border-lime/20 transition-all bg-white/[0.01] group relative overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/5 gap-4">
                                        <div>
                                            <span className="text-[9px] text-lime font-syne font-bold uppercase tracking-[0.3em] font-black mb-1 block">Purchase Verified</span>
                                            <p className="text-xs text-white/60 font-syne font-bold uppercase tracking-wider">Order ID: {order.id.slice(0, 12)}</p>
                                            <p className="text-[11px] text-white/30 mt-2 font-syne font-bold uppercase tracking-wider">{formatDate(order.date)}</p>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-[9px] text-white/30 uppercase font-syne font-bold tracking-[0.2em] mb-1">Transaction Total</p>
                                            <p className="text-2xl font-bold text-lime font-syne font-bold tracking-tight">{formatPrice(order.total)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-6 group/item">
                                                <div className="relative w-20 h-20 bg-black border border-white/10 overflow-hidden flex-shrink-0 group-hover/item:border-white/20 transition-colors">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover opacity-60 group-hover/item:opacity-80 transition-opacity"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-white truncate font-syne uppercase text-xs tracking-[0.15em] mb-1">{item.name}</p>
                                                    <p className="text-[10px] text-white/30 font-syne font-bold uppercase tracking-wider">Volume: {item.quantity} Unit(s)</p>
                                                    <p className="text-[10px] text-white/30 font-syne font-bold uppercase tracking-wider mt-1">{formatPrice(item.price)} per unit</p>
                                                </div>
                                                <div className="hidden sm:block text-right">
                                                    <p className="font-bold text-white font-syne font-bold text-sm tracking-tight">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-lime font-syne font-bold">
                                                {order.status}
                                            </span>
                                        </div>
                                        <button className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors py-2 px-4 border border-white/10 hover:border-white/30">
                                            Manage Order
                                        </button>
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
