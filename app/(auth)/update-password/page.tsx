"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff, Lock } from "lucide-react"
import { toast } from "sonner"

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) {
                toast.error("Failed to update password: " + error.message)
            } else {
                toast.success("Password updated successfully!")
                router.push("/dashboard")
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-8">
                <div className="space-y-2 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-neutral-100 rounded-full flex items-center justify-center">
                            <Lock className="h-6 w-6 text-neutral-600" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Set New Password</h1>
                    <p className="text-gray-600">Please enter your new password below</p>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="h-11 pr-10"
                                placeholder="Enter new password"
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
                        Update Password
                    </Button>
                </form>
            </div>
        </div>
    )
}
