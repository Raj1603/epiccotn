"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff, CheckCircle2, Mail, ArrowRight, RefreshCcw } from "lucide-react"
import { toast } from "sonner"

function SignupContent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    const next = searchParams.get("next") || "/dashboard"

    // Listen for auth state changes (Live Sync)
    useEffect(() => {
        if (!success) return

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
                    toast.success("Email verified! Redirecting...")
                    router.push(next)
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [success, supabase, router, next])

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
                    data: {
                        full_name: fullName,
                    },
                },
            })

            if (error) {
                toast.error("Signup failed: " + error.message)
            } else {
                setSuccess(true)
                toast.success("Account created! Please check your email.")
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleResendEmail = async () => {
        setResending(true)
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
                }
            })
            if (error) throw error
            toast.success("Verification email resent!")
        } catch (error: any) {
            toast.error(error.message || "Failed to resend email")
        } finally {
            setResending(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen grid lg:grid-cols-2">
                <div className="hidden lg:block relative bg-neutral-900">
                    <div className="absolute inset-0 bg-[url('/images/epiccotn/lifestyle.png')] bg-cover bg-center opacity-50" />
                    <div className="relative h-full flex items-center justify-center p-12">
                        <div className="text-white max-w-lg">
                            <h1 className="text-4xl font-bold mb-6 font-sans italic">Epiccotn®</h1>
                            <h2 className="text-3xl font-bold mb-4">Almost there.</h2>
                            <p className="text-lg text-white/80">We've sent a verification link to your email. Once confirmed, you'll be redirected to continue where you left off.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center p-8 bg-background">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="h-20 w-20 bg-lime/10 rounded-full flex items-center justify-center border border-lime/20 shadow-sm">
                                    <Mail className="h-10 w-10 text-lime" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-syne font-bold text-foreground uppercase tracking-tight">Verify your email</h2>
                            <p className="mt-4 text-foreground/60 font-inter font-light leading-relaxed">
                                A confirmation link has been sent to:<br />
                                <span className="font-bold text-foreground">{email}</span>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-none border-border hover:bg-black/5 transition-all font-syne font-bold uppercase tracking-wider text-[12px] text-foreground"
                                onClick={handleResendEmail}
                                disabled={resending}
                            >
                                {resending ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <RefreshCcw className="mr-3 h-5 w-5" />}
                                Resend verification email
                            </Button>

                            <div className="text-center pt-4">
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="text-[11px] font-syne font-bold uppercase tracking-widest text-foreground/40 hover:text-lime transition-colors underline underline-offset-4"
                                >
                                    Used the wrong email? Use another one
                                </button>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-border text-center">
                            <p className="text-[10px] uppercase font-syne font-bold tracking-widest text-foreground/20">
                                Having trouble? Contact <Link href="/support" className="text-lime hover:underline">customer support</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="hidden lg:block relative bg-[#0A0A0A]">
                <div className="absolute inset-0 bg-[url('/images/epiccotn/hero_sleeping_woman_new.png')] bg-cover bg-center opacity-85" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative h-full flex items-center justify-center p-12 z-10">
                    <div className="text-[#FFFFFF] max-w-lg">
                        <h1 className="text-[clamp(40px,5vw,64px)] font-syne font-bold leading-[0.95] tracking-tight uppercase mb-6">Join Epiccotn</h1>
                        <p className="text-lg text-[#FFFFFF]/80 font-inter font-light leading-relaxed">Create an account to track orders and get exclusive access.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-10">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-flex font-syne text-[24px] font-extrabold text-foreground tracking-[-0.02em] items-center mb-10">
                            Epiccotn<span className="w-2 h-2 bg-lime ml-0.5 mt-1.5" />
                        </Link>
                        <h2 className="text-3xl font-syne font-bold text-foreground uppercase tracking-tight">Create an account</h2>
                        <p className="mt-4 text-foreground/60 font-inter font-light">Enter your details to get started</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="fullName" className="font-syne text-[11px] font-bold uppercase tracking-wider text-foreground/60">Full Name</Label>
                            <Input
                                id="fullName"
                                placeholder="Jane Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="h-14 bg-transparent border-border rounded-none focus-visible:ring-lime text-foreground px-4 text-base"
                            />
                        </div>
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
                            <Label htmlFor="password" className="font-syne text-[11px] font-bold uppercase tracking-wider text-foreground/60">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-14 bg-transparent border-border rounded-none focus-visible:ring-lime text-foreground px-4 text-base pr-12"
                                    minLength={6}
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
                            <p className="font-syne text-[10px] uppercase tracking-wider text-foreground/40">Must be at least 6 characters long</p>
                        </div>

                        <Button type="submit" className="w-full h-14 bg-lime hover:bg-lime-dk text-black rounded-none font-syne font-bold uppercase tracking-widest text-[13px] transition-all hover:-translate-y-[2px]" disabled={loading}>
                            {loading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : null}
                            Create Account
                        </Button>
                    </form>

                    <div className="text-center text-[13px] font-inter border-t border-border pt-8 mt-10">
                        <span className="text-foreground/50">Already have an account? </span>
                        <Link href="/login" className="font-bold text-foreground hover:text-lime transition-colors">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            </div>
        }>
            <SignupContent />
        </Suspense>
    )
}

