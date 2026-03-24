"use client"

import { useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export function NewsletterForm() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email address.")
            return
        }

        setIsSubmitting(true)

        try {
            const { error } = await supabase
                .from("newsletter_subscribers")
                .insert([{ email }])

            if (error) {
                console.error("Supabase Newsletter Error:", error)
                if (error.code === "PGRST205") {
                    // Table not found in cache - usually resolves after a moment
                    toast.info("Setting things up, please try again in a moment.")
                } else if (error.code === "23505") {
                    toast.success("You're already subscribed! Welcome back.")
                    setEmail("")
                    return
                } else if (error.code === "42P01") {
                    toast.error("Database table missing. Please run the newsletter SQL script.")
                    return
                } else {
                    toast.error(`Something went wrong (Error ${error.code}). Please try again later.`)
                    return
                }
            } else {
                toast.success("Welcome to the journey! You've successfully subscribed.")
                setEmail("")
            }
        } catch (err: any) {
            console.error("Newsletter Catch Error:", err)
            toast.error("Connection error. Please check your internet and try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 text-sm bg-gray-50 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all outline-none"
            />
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
        </form>
    )
}
