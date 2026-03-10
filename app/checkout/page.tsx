"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Truck, Shield, RotateCcw, UserCircle, LogIn, ArrowRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useEffect } from "react"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, clearCart } = useCart()
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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                    <p className="text-sm text-neutral-500 font-medium tracking-wide">Securing your session...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24">
                <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl shadow-[var(--primary)]/10 border border-neutral-100 overflow-hidden transform transition-all duration-700 hover:shadow-[var(--primary)]/20">
                    <div className="relative h-44 bg-[var(--background)] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[10s] hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
                        <div className="relative text-center z-10">
                            <h2 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Epiccotn<span className="text-[var(--primary)] text-2xl align-top">™</span></h2>
                            <div className="h-0.5 w-12 bg-[var(--primary)]/30 mx-auto mt-4 rounded-full" />
                        </div>
                    </div>

                    <div className="p-10 text-center">
                        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--background)] border border-[var(--primary)]/10 shadow-inner group">
                            <UserCircle className="h-10 w-10 text-[var(--primary)] transition-transform group-hover:scale-110" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">Secure Checkout</h1>
                        <p className="mt-4 text-gray-500 leading-relaxed text-sm px-4">Experience personalized wellness. Create an account to track your orders, manage subscriptions, and join our health community.</p>

                        <div className="mt-10 space-y-4">
                            <button
                                onClick={() => router.push(`/login?next=/checkout`)}
                                className="w-full h-14 bg-gray-900 hover:bg-black text-white font-bold rounded-full shadow-xl shadow-gray-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                            >
                                <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                <span className="uppercase tracking-[0.2em] text-[10px]">Sign In to Proceed</span>
                            </button>

                            <button
                                onClick={() => router.push(`/signup?next=/checkout`)}
                                className="w-full h-14 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                            >
                                <UserCircle className="h-4 w-4" />
                                <span className="uppercase tracking-[0.2em] text-[10px]">Create an Account</span>
                            </button>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-2 gap-8">
                            <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                <Shield className="h-5 w-5 text-gray-900" />
                                <span className="text-[9px] uppercase font-black text-gray-900 tracking-[0.1em]">Secure Data</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                <Truck className="h-5 w-5 text-gray-900" />
                                <span className="text-[9px] uppercase font-black text-gray-900 tracking-[0.1em]">Global Care</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 font-serif italic">Your cart is empty</h1>
                    <p className="text-gray-600 mb-8">Add some items to your cart to checkout</p>
                    <Button onClick={() => router.push("/")} className="bg-gray-900 hover:bg-gray-800 rounded-full px-8">
                        Continue Shopping
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column - Forms */}
                        <div className="space-y-8">
                            {/* Contact Section */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className={errors.email ? "border-red-500" : ""}
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone (optional)</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Section */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                className={errors.firstName ? "border-red-500" : ""}
                                            />
                                            {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                className={errors.lastName ? "border-red-500" : ""}
                                            />
                                            {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                            className={errors.address ? "border-red-500" : ""}
                                            placeholder="123 Main St"
                                        />
                                        {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                                        <Input
                                            id="apartment"
                                            value={formData.apartment}
                                            onChange={(e) => handleInputChange("apartment", e.target.value)}
                                            placeholder="Apt 4B"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                value={formData.city}
                                                onChange={(e) => handleInputChange("city", e.target.value)}
                                                className={errors.city ? "border-red-500" : ""}
                                            />
                                            {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="state">State</Label>
                                            <Input
                                                id="state"
                                                value={formData.state}
                                                onChange={(e) => handleInputChange("state", e.target.value)}
                                                className={errors.state ? "border-red-500" : ""}
                                                placeholder="CA"
                                            />
                                            {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="zipCode">ZIP code</Label>
                                            <Input
                                                id="zipCode"
                                                value={formData.zipCode}
                                                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                                className={errors.zipCode ? "border-red-500" : ""}
                                                placeholder="90210"
                                            />
                                            {errors.zipCode && <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Method */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Method</h2>
                                <RadioGroup value={formData.shippingMethod} onValueChange={(value) => handleInputChange("shippingMethod", value)}>
                                    <div className="flex items-center justify-between p-4 border rounded-lg mb-3 hover:border-gray-900 cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <RadioGroupItem value="standard" id="standard" />
                                            <Label htmlFor="standard" className="cursor-pointer font-medium">
                                                Standard Shipping
                                            </Label>
                                        </div>
                                        <span className="font-semibold">{formatPrice(8)}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-gray-900 cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <RadioGroupItem value="express" id="express" />
                                            <Label htmlFor="express" className="cursor-pointer font-medium">
                                                Express Shipping (2-3 days)
                                            </Label>
                                        </div>
                                        <span className="font-semibold">{formatPrice(15)}</span>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Benefits */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <Truck className="h-5 w-5 text-gray-600" />
                                        <span>Free returns within 30 days</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <Shield className="h-5 w-5 text-gray-600" />
                                        <span>2-Year Warranty included</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <RotateCcw className="h-5 w-5 text-gray-600" />
                                        <span>Secure checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div>
                            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={`${item.id}-${item.selectedColor}`} className="flex gap-4">
                                            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h3>
                                                <p className="text-xs text-gray-500">{item.subtitle}</p>
                                                {item.selectedColor && <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="border-t pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-semibold text-gray-900">{formatPrice(shippingCost)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t pt-3">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Button type="submit" disabled={loading} className="w-full mt-6 h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold">
                                    {loading ? "Processing..." : "Place Order"}
                                </Button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    Secure checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
