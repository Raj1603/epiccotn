"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

function LoginContent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    const next = searchParams.get("next") || "/dashboard"

    useEffect(() => {
        // specific check to see if we are already logged in (e.g. from email link)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                router.push(next)
            }
        }
        checkSession()
    }, [router, supabase.auth, next])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("") // Clear previous errors

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setErrorMessage(error.message)
                setLoading(false)
                return
            }

            if (data.session) {
                toast.success("Successfully logged in!")
                router.refresh()
                router.push(next)
            }
        } catch (error: any) {
            setErrorMessage(error?.message || "An unexpected error occurred")
            setLoading(false)
        }
    }

    return (
        <div suppressHydrationWarning className="min-h-screen grid lg:grid-cols-2">
            <div className="hidden lg:block relative bg-[#000]">
                <div className="absolute inset-0 bg-[url('/images/epiccotn/hero.png')] bg-cover bg-center opacity-70" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative h-full flex items-center justify-center p-12 z-10">
                    <div className="text-[#FFFFFF] max-w-lg">
                        <h1 className="text-[clamp(40px,5vw,64px)] font-syne font-bold leading-[0.95] tracking-tight uppercase mb-6">Welcome Back</h1>
                        <p className="text-lg text-[#FFFFFF]/80 font-light leading-relaxed font-inter">Manage your orders, saved items, and account details.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-syne font-bold text-foreground uppercase tracking-tight">Sign in</h2>
                        <p className="mt-4 text-foreground/60 font-inter font-light">Enter your details to access your account</p>
                    </div>

                    {/* Error Message Display */}
                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                            <p className="text-sm font-medium">{errorMessage}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="font-syne text-[11px] font-bold uppercase tracking-wider text-foreground/60">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-14 bg-transparent border-border rounded-none focus-visible:ring-lime text-foreground px-4 text-base"
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="font-syne text-[11px] font-bold uppercase tracking-wider text-foreground/60">Password</Label>
                                <Link href="/forgot-password" className="font-syne text-[10px] font-bold uppercase tracking-wider text-lime hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-14 bg-transparent border-border rounded-none focus-visible:ring-lime text-foreground px-4 text-base pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 text-foreground/40 hover:text-foreground/80 transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-14 bg-lime hover:bg-lime-dk text-black rounded-none font-syne font-bold uppercase tracking-widest text-[13px] transition-all hover:-translate-y-[2px]" disabled={loading}>
                            {loading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : null}
                            Sign In
                        </Button>
                    </form>

                    <div className="text-center text-[13px] font-inter border-t border-border pt-8 mt-10">
                        <span className="text-foreground/50">Don't have an account? </span>
                        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-bold text-foreground hover:text-lime transition-colors">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    )
}

