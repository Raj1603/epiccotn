"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${location.origin}/auth/callback?next=/update-password`,
            })

            if (error) {
                toast.error("Failed to send reset email: " + error.message)
            } else {
                setSuccess(true)
                toast.success("Reset link sent!")
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="w-full max-w-md bg-background border border-border rounded-xl shadow-lg p-8 text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 bg-lime/10 rounded-full flex items-center justify-center">
                            <Mail className="h-8 w-8 text-lime" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-syne font-bold text-foreground uppercase tracking-tight">Check your email</h2>
                    <p className="text-foreground/60 font-inter font-light">
                        We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>.
                    </p>
                    <div className="pt-2">
                        <Link href="/login">
                            <Button variant="outline" className="w-full border-border hover:bg-black/5 text-foreground">
                                Return to details
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-foreground/40 font-inter">
                        Didn't receive it? Check your spam folder.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md bg-background border border-border rounded-xl shadow-lg p-8 space-y-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-syne font-bold text-foreground uppercase tracking-tight">Reset Password</h1>
                    <p className="text-foreground/60 font-inter font-light leading-relaxed">Enter your email and we'll send you a link to reset your password</p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="email" className="font-syne text-[11px] font-bold uppercase tracking-wider text-foreground/60">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 bg-transparent border-border rounded-none focus-visible:ring-lime text-foreground"
                        />
                    </div>

                    <Button type="submit" className="w-full h-12 bg-lime hover:bg-lime-dk text-black rounded-none font-syne font-bold uppercase tracking-widest text-[12px] transition-all" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Send Reset Link
                    </Button>
                </form>

                <div className="text-center pt-4">
                    <Link href="/login" className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
