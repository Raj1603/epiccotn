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
                    <div className="absolute inset-0 bg-[url('/images/epiccotn/lifestyle.png')] bg-cover bg-center opacity-60" />
                    <div className="relative h-full flex items-center justify-center p-12">
                        <div className="text-white max-w-lg text-center">
                            <h1 className="text-4xl font-bold mb-6 font-serif">Epiccotn<span className="text-primary">™</span></h1>
                            <h2 className="text-3xl font-bold mb-4">Almost there.</h2>
                            <p className="text-lg text-white/80">We've sent a verification link to your email. Once confirmed, you'll be redirected to continue where you left off.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center p-8 bg-white">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="h-20 w-20 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-100 shadow-sm">
                                    <Mail className="h-10 w-10 text-neutral-900" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Verify your email</h2>
                            <p className="mt-4 text-gray-500 leading-relaxed">
                                A confirmation link has been sent to:<br />
                                <span className="font-semibold text-neutral-900">{email}</span>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-full border-neutral-200 hover:bg-neutral-50 transition-all font-medium"
                                onClick={handleResendEmail}
                                disabled={resending}
                            >
                                {resending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
                                Resend verification email
                            </Button>

                            <div className="text-center pt-4">
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
                                >
                                    Used the wrong email? Use another one
                                </button>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-neutral-100 text-center">
                            <p className="text-xs text-neutral-400">
                                Having trouble? Contact <Link href="/support" className="text-neutral-900 font-medium">customer support</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="hidden lg:block relative bg-neutral-900">
                <div className="absolute inset-0 bg-[url('/images/epiccotn/science.png')] bg-cover bg-center opacity-60" />
                <div className="relative h-full flex items-center justify-center p-12">
                    <div className="text-white max-w-lg text-center">
                        <h1 className="text-4xl font-bold mb-6 font-serif">Epiccotn<span className="text-primary">™</span></h1>
                        <p className="text-lg text-white/90 font-light italic">Natural Wisdom & Modern Science</p>
                        <hr className="my-6 border-white/20" />
                        <h2 className="text-3xl font-bold mb-4">Join Epiccotn</h2>
                        <p className="text-lg text-white/80">Create an account to track orders and get exclusive access.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
                        <p className="mt-2 text-gray-600">Enter your details to get started</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-11 pr-10"
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">Must be at least 6 characters long</p>
                        </div>

                        <Button type="submit" className="w-full h-11 bg-neutral-900 hover:bg-neutral-800" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Create Account
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link href="/login" className="font-bold text-gray-900 hover:underline">
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

