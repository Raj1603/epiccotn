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
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md bg-background border border-border rounded-xl shadow-lg p-8 space-y-8">
                <div className="space-y-2 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-lime/10 rounded-full flex items-center justify-center">
                            <Lock className="h-6 w-6 text-lime" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-syne font-bold text-foreground uppercase tracking-tight">Set New Password</h1>
                    <p className="text-foreground/60 font-inter font-light">Please enter your new password below</p>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="password" title="password" className="font-syne text-[11px] font-bold uppercase tracking-wider text-foreground/60">New Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="h-12 bg-transparent border-border rounded-none focus-visible:ring-lime text-foreground"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-foreground/40 hover:text-foreground/80 transition-colors focus:outline-none"
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

                    <Button type="submit" className="w-full h-12 bg-lime hover:bg-lime-dk text-black rounded-none font-syne font-bold uppercase tracking-widest text-[12px] transition-all" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Update Password
                    </Button>
                </form>
            </div>
        </div>
    )
}
