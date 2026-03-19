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
            <div className="hidden lg:block relative bg-neutral-900">
                <div className="absolute inset-0 bg-[url('/images/epiccotn/hero.png')] bg-cover bg-center opacity-50" />
                <div className="relative h-full flex items-center justify-center p-12">
                    <div className="text-white max-w-lg">
                        <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
                        <p className="text-lg text-white/80">Manage your orders, saved items, and account details.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
                        <p className="mt-2 text-gray-600">Enter your details to access your account</p>
                    </div>

                    {/* Error Message Display */}
                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                            <p className="text-sm font-medium">{errorMessage}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
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
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
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
                                    className="h-11 pr-10"
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
                        </div>

                        <Button type="submit" className="w-full h-11 bg-neutral-900 hover:bg-neutral-800" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Sign in
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-bold text-gray-900 hover:underline">
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

