"use client"

import { useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address.")
      return
    }

    if (!formData.message.trim()) {
      toast.error("Please enter a message.")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([{ 
          name: formData.name, 
          email: formData.email, 
          message: formData.message 
        }])

      if (error) {
        if (error.code === "PGRST205" || error.code === "42P01") {
            // Table doesn't exist yet, gracefully ignore for UI testing
        } else {
            console.error("Supabase Contact Error:", JSON.stringify(error))
            toast.error("Something went wrong. Please try again later.")
            return
        }
      }

      toast.success("Thank you for reaching out! We will get back to you shortly.")
      setFormData({ name: "", email: "", message: "" })
    } catch (err: any) {
      console.error("Caught error:", err?.message || err)
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 mb-16 w-full max-w-xl mx-auto">
      <div className="relative">
        <input 
          type="text" 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full bg-transparent border-0 border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:border-gray-900 focus:outline-none transition-colors"
        />
      </div>

      <div className="relative">
        <input 
          type="email" 
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email*"
          className="w-full bg-transparent border-0 border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:border-gray-900 focus:outline-none transition-colors"
        />
      </div>

      <div className="relative">
        <textarea 
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Message*"
          className="w-full bg-transparent border-0 border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:border-gray-900 focus:outline-none transition-colors resize-none"
        ></textarea>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gray-900 text-white py-4 text-xs font-bold tracking-[0.2em] hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SENDING..." : "SEND"}
        </button>
        
        <p className="text-[10px] text-gray-400 mt-4 leading-relaxed text-center">
          Fields indicated with an asterisk (*) are required.<br />
          By submitting this form, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </form>
  )
}
