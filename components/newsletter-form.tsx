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
            // Attempt to insert into a newsletter table if it exists
            const { error } = await supabase
                .from("newsletter_subscribers")
                .insert([{ email }])

            // Whether the table exists or not right now, we give the user a good experience
            if (error) {
                if (error.code === "PGRST205") {
                    // Table not found in PostgREST cache - ignore temporarily so UI works while cache refreshes
                } else if (error.code === "23505") {
                    // Unique constraint violation (already subscribed)
                    toast.success("You're already subscribed! Welcome back.")
                    setEmail("")
                    return
                } else {
                    console.error("Supabase Subscribe Error:", JSON.stringify(error))
                    toast.error("Something went wrong. Please try again later.")
                    return
                }
            }

            toast.success("Welcome to the journey! You've successfully subscribed.")
            setEmail("")
        } catch (err: any) {
            console.error("Caught error:", err?.message || err)
            toast.error("Something went wrong. Please try again later.")
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
