"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Truck, Shield, RotateCcw, UserCircle, LogIn, ArrowRight, Loader2, Minus, Plus, Trash2, Edit } from "lucide-react"
import { toast } from "sonner"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, clearCart, updateQuantity, removeItem } = useCart()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [authChecking, setAuthChecking] = useState(true)
    const supabase = createClient()

    // Check auth status
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user || null)
            setAuthChecking(false)
        }
        checkAuth()
    }, [supabase])

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        shippingMethod: "standard",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingCost = formData.shippingMethod === "express" ? 15 : 8
    const total = subtotal + shippingCost

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(price)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.email) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email"

        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.address) newErrors.address = "Address is required"
        if (!formData.city) newErrors.city = "City is required"
        if (!formData.state) newErrors.state = "State is required"
        if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Please fill in all required fields")
            return
        }

        if (items.length === 0) {
            toast.error("Your cart is empty")
            return
        }

        setLoading(true)

        try {
            // Create order object
            const order = {
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                total_amount: Math.round(total * 100),
                status: "pending",
                items: items.map(item => ({
                    id: item.id,
                    product: {
                        name: item.name,
                        image: item.image,
                    },
                    quantity: item.quantity,
                    price_at_time: Math.round(item.price * 100),
                    selectedSize: item.selectedSize,
                    selectedColor: item.selectedColor,
                }))
            }

            // Save to localStorage for demo
            const existingOrders = localStorage.getItem("demoOrders")
            const orders = existingOrders ? JSON.parse(existingOrders) : []
            orders.unshift(order)
            localStorage.setItem("demoOrders", JSON.stringify(orders))

            // Simulate processing
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Clear cart and redirect
            clearCart()
            toast.success("Order placed successfully!")
            router.push("/dashboard")
        } catch (error: any) {
            console.error("Order error:", error)
            toast.error(error.message || "Failed to place order")
            setLoading(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    if (authChecking) {
        return (
            <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
                <Header />
                <main className="flex-grow flex items-center justify-center pt-24 pb-20">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-lime" />
                        <p className="text-sm text-white/40 font-syne font-bold uppercase tracking-[0.2em]">Securing your session...</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col bg-black">
                <Header />
                <main className="flex-grow flex items-center justify-center p-4 pt-24 pb-20">
                    <div className="max-w-md w-full bg-[#0A0A0A] border border-white/10 overflow-hidden transform transition-all duration-700 hover:border-lime/30">
                        <div className="relative h-44 bg-black flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                            <div className="relative text-center z-10">
                                <h2 className="text-4xl font-bold text-white font-syne tracking-tight">Epiccotn<span className="text-lime text-2xl align-top">.</span></h2>
                                <div className="h-0.5 w-8 bg-lime/30 mx-auto mt-4 rounded-full" />
                            </div>
                        </div>

                        <div className="p-10 text-center">
                            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10 group">
                                <UserCircle className="h-10 w-10 text-white transition-transform group-hover:text-lime group-hover:scale-110" />
                            </div>
                            <h1 className="text-2xl font-bold text-white tracking-tight font-syne uppercase">Secure Checkout</h1>
                            <p className="mt-4 text-white/50 leading-relaxed text-[13px] px-4 font-inter">Experience personalized wellness. Create an account to track your orders, manage subscriptions, and join our health community.</p>

                            <div className="mt-10 space-y-4">
                                <button
                                    onClick={() => router.push(`/login?next=/checkout`)}
                                    className="w-full h-14 bg-lime text-black font-syne font-bold uppercase tracking-[0.15em] text-xs transition-all hover:bg-lime-dk"
                                >
                                    Sign In to Proceed
                                </button>

                                <button
                                    onClick={() => router.push(`/signup?next=/checkout`)}
                                    className="w-full h-14 bg-transparent border border-white/10 text-white font-syne font-bold uppercase tracking-[0.15em] text-xs transition-all hover:bg-white/5 hover:border-white/30"
                                >
                                    Create an Account
                                </button>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
                                <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                    <Shield className="h-5 w-5 text-white" />
                                    <span className="text-[9px] uppercase font-syne font-bold text-white/60 tracking-[0.1em]">Secure Data</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                    <Truck className="h-5 w-5 text-white" />
                                    <span className="text-[9px] uppercase font-syne font-bold text-white/60 tracking-[0.1em]">Global Care</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
                <Header />
                <main className="flex-grow pt-28 pb-20 flex items-center justify-center">
                    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                        <h1 className="text-4xl font-bold text-white mb-4 font-syne uppercase">Your cart is empty</h1>
                        <p className="text-white/40 mb-10 font-inter">Add some items to your cart to checkout and begin your wellness journey.</p>
                        <Button onClick={() => router.push("/")} className="bg-lime text-black hover:bg-lime-dk font-syne font-bold uppercase tracking-wider h-14 px-10 transition-all">
                            Continue Shopping
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-black selection:bg-lime selection:text-black">
            <Header />
            <main className="flex-grow pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Left Column - Forms */}
                            <div className="space-y-12">
                                {/* Contact Section */}
                                <section>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="font-syne font-bold text-lime text-sm tracking-wider uppercase">01</span>
                                        <h2 className="text-2xl font-bold text-white font-syne uppercase tracking-tight">Contact Information</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                className={cn(
                                                    "h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none",
                                                    errors.email && "border-red-500"
                                                )}
                                                placeholder="you@example.com"
                                            />
                                            {errors.email && <p className="text-[10px] text-red-500 mt-1 uppercase font-syne tracking-wider font-bold">{errors.email}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">Phone Number (optional)</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                className="h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Delivery Section */}
                                <section>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="font-syne font-bold text-lime text-sm tracking-wider uppercase">02</span>
                                        <h2 className="text-2xl font-bold text-white font-syne uppercase tracking-tight">Delivery Address</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">First name</Label>
                                                <Input
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                    className={cn(
                                                        "h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none",
                                                        errors.firstName && "border-red-500"
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">Last name</Label>
                                                <Input
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                    className={cn(
                                                        "h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none",
                                                        errors.lastName && "border-red-500"
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">Street Address</Label>
                                            <Input
                                                id="address"
                                                value={formData.address}
                                                onChange={(e) => handleInputChange("address", e.target.value)}
                                                className={cn(
                                                    "h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none",
                                                    errors.address && "border-red-500"
                                                )}
                                                placeholder="123 Main St"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="apartment" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">Apartment, suite, etc. (optional)</Label>
                                            <Input
                                                id="apartment"
                                                value={formData.apartment}
                                                onChange={(e) => handleInputChange("apartment", e.target.value)}
                                                className="h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none"
                                                placeholder="Apt 4B"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">City</Label>
                                                <Input
                                                    id="city"
                                                    value={formData.city}
                                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                                    className={cn(
                                                        "h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none",
                                                        errors.city && "border-red-500"
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">State</Label>
                                                <Input
                                                    id="state"
                                                    value={formData.state}
                                                    onChange={(e) => handleInputChange("state", e.target.value)}
                                                    className={cn(
                                                        "h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none",
                                                        errors.state && "border-red-500"
                                                    )}
                                                    placeholder="CA"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="zipCode" className="font-syne text-[11px] uppercase tracking-wider text-white/60 ml-1 font-bold">ZIP code</Label>
                                                <Input
                                                    id="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                                    className={cn(
                                                        "h-14 bg-white/5 border-white/10 text-white font-inter focus:border-lime focus:ring-0 transition-all rounded-none",
                                                        errors.zipCode && "border-red-500"
                                                    )}
                                                    placeholder="90210"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Shipping Method */}
                                <section>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="font-syne font-bold text-lime text-sm tracking-wider uppercase">03</span>
                                        <h2 className="text-2xl font-bold text-white font-syne uppercase tracking-tight">Shipping Method</h2>
                                    </div>
                                    <RadioGroup value={formData.shippingMethod} onValueChange={(value) => handleInputChange("shippingMethod", value)} className="gap-4">
                                        <div 
                                            onClick={() => handleInputChange("shippingMethod", "standard")}
                                            className={cn(
                                                "flex items-center justify-between p-6 border transition-all cursor-pointer",
                                                formData.shippingMethod === "standard" ? "border-lime bg-lime/5" : "border-white/10 bg-white/5 hover:border-white/30"
                                            )}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="standard" id="standard" className="border-white/30 text-lime" />
                                                <div>
                                                    <Label htmlFor="standard" className="cursor-pointer font-syne font-bold text-white uppercase tracking-wider text-sm">
                                                        Standard Shipping
                                                    </Label>
                                                    <p className="text-[10px] text-white/40 font-syne font-bold tracking-wider uppercase">3-5 Business Days</p>
                                                </div>
                                            </div>
                                            <span className="font-syne font-bold font-bold text-white tracking-wider text-sm">{formatPrice(8)}</span>
                                        </div>

                                        <div 
                                            onClick={() => handleInputChange("shippingMethod", "express")}
                                            className={cn(
                                                "flex items-center justify-between p-6 border transition-all cursor-pointer",
                                                formData.shippingMethod === "express" ? "border-lime bg-lime/5" : "border-white/10 bg-white/5 hover:border-white/30"
                                            )}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value="express" id="express" className="border-white/30 text-lime" />
                                                <div>
                                                    <Label htmlFor="express" className="cursor-pointer font-syne font-bold text-white uppercase tracking-wider text-sm">
                                                        Express Delivery
                                                    </Label>
                                                    <p className="text-[10px] text-white/40 font-syne font-bold tracking-wider uppercase">1-2 Business Days</p>
                                                </div>
                                            </div>
                                            <span className="font-syne font-bold font-bold text-white tracking-wider text-sm">{formatPrice(15)}</span>
                                        </div>
                                    </RadioGroup>
                                </section>

                                {/* Benefits */}
                                <div className="py-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-lime">
                                            <Truck className="h-4 w-4" />
                                        </div>
                                        <span className="text-[9px] font-syne font-bold text-white/60 tracking-[0.15em] uppercase leading-tight">Fast Global<br/>Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-lime">
                                            <Shield className="h-4 w-4" />
                                        </div>
                                        <span className="text-[9px] font-syne font-bold text-white/60 tracking-[0.15em] uppercase leading-tight">Secure<br/>Encrypted Pay</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-lime">
                                            <RotateCcw className="h-4 w-4" />
                                        </div>
                                        <span className="text-[9px] font-syne font-bold text-white/60 tracking-[0.15em] uppercase leading-tight">30-Day Comfort<br/>Guarantee</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="lg:pl-8">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 lg:sticky lg:top-24">
                                    <div className="flex items-start justify-between mb-8">
                                        <h2 className="text-xl font-bold text-white font-syne uppercase tracking-tight">Order Summary</h2>
                                        <span className="font-syne text-[11px] text-white/60 uppercase tracking-wider font-bold">{items.length} Items</span>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="space-y-8 mb-10 max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
                                        {items.map((item) => (
                                            <div key={`${item.id}-${item.selectedColor}`} className="flex gap-6 group">
                                                <div className="relative w-24 h-24 bg-black border border-white/5 overflow-hidden flex-shrink-0">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="flex-1 py-1 flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="font-syne font-bold text-[11px] text-white uppercase tracking-wider pr-4 leading-tight">{item.name}</h3>
                                                            <button 
                                                                type="button"
                                                                onClick={() => removeItem(item.id, item.selectedColor, item.selectedSize)}
                                                                className="text-white/30 hover:text-red-400 transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                        <p className="text-[11px] text-white/40 font-syne tracking-wider uppercase mt-1 mb-1 font-bold">{item.subtitle}</p>
                                                        {item.selectedColor && (
                                                            <div className="flex items-center justify-between mt-2">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: item.selectedColor }} />
                                                                    <span className="text-[11px] text-white/40 font-syne tracking-wider uppercase font-bold">{item.selectedColor}</span>
                                                                    <span className="text-[11px] text-white/20 mx-1">/</span>
                                                                    <span className="text-[11px] text-white/40 font-syne tracking-wider uppercase font-bold">{item.selectedSize || "L"}</span>
                                                                </div>
                                                                <Link 
                                                                    href={`/products/${item.id}`}
                                                                    className="text-white/20 hover:text-white transition-colors"
                                                                >
                                                                    <Edit className="w-3 h-3" />
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center border border-white/10 bg-white/5 h-8">
                                                            <button 
                                                                type="button"
                                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedColor, item.selectedSize)}
                                                                className="w-7 h-full flex items-center justify-center text-white/60 hover:text-lime transition-colors disabled:opacity-30 disabled:hover:text-white/60"
                                                                disabled={item.quantity <= 1}
                                                                aria-label="Decrease quantity"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="w-6 text-center text-[11px] font-syne font-bold text-white">{item.quantity}</span>
                                                            <button 
                                                                type="button"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                                                                className="w-7 h-full flex items-center justify-center text-white/60 hover:text-lime transition-colors"
                                                                aria-label="Increase quantity"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <p className="font-syne font-bold text-sm text-lime tracking-tight">{formatPrice(item.price * item.quantity)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-4 pt-8 border-t border-white/10">
                                        <div className="flex justify-between items-center">
                                            <span className="font-syne text-[11px] uppercase tracking-wider text-white/60 font-bold">Subtotal</span>
                                            <span className="font-syne font-bold text-white text-sm">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-syne text-[11px] uppercase tracking-wider text-white/60 font-bold">Estimated Shipping</span>
                                            <span className="font-syne font-bold text-white text-sm">{formatPrice(shippingCost)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/10">
                                            <span className="font-syne font-bold text-lg text-white uppercase tracking-tight">Total Amount</span>
                                            <span className="font-syne font-extrabold text-2xl text-lime tracking-tight">{formatPrice(total)}</span>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <Button 
                                        type="submit" 
                                        disabled={loading} 
                                        className="w-full mt-10 h-16 bg-lime text-black hover:bg-lime-dk font-syne font-bold uppercase tracking-[0.2em] text-[13px] rounded-none shadow-[0_20px_40px_-10px_rgba(200,245,66,0.15)] transition-all active:scale-[0.98]"
                                    >
                                        {loading ? "Processing Securely..." : "Complete Purchase →"}
                                    </Button>

                                    <div className="mt-8 flex items-center justify-center gap-2.5 opacity-30">
                                        <Shield className="h-3 w-3 text-white" />
                                        <p className="text-[10px] font-syne font-bold text-white uppercase tracking-wider">
                                            Level 1 PCI Compliant Checkout
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
