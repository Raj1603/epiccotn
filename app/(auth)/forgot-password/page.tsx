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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
                    <p className="text-gray-600">
                        We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span>.
                    </p>
                    <div className="pt-2">
                        <Link href="/login">
                            <Button variant="outline" className="w-full">
                                Return to details
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-gray-400">
                        Didn't receive it? Check your spam folder.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
                    <p className="text-gray-600">Enter your email and we'll send you a link to reset your password</p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
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

                    <Button type="submit" className="w-full h-11 bg-neutral-900 hover:bg-neutral-800" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Send Reset Link
                    </Button>
                </form>

                <div className="text-center">
                    <Link href="/login" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
