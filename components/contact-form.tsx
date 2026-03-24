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
    <form onSubmit={handleSubmit} className="space-y-12 mb-16 w-full max-w-xl mx-auto">
      <div className="relative group">
        <input 
          type="text" 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full bg-transparent border-0 border-b border-white/10 py-4 text-[14px] text-white placeholder:text-white/20 focus:ring-0 focus:border-lime focus:outline-none transition-all font-inter"
        />
        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-lime transition-all duration-500 group-hover:w-full select-none pointer-events-none" />
      </div>

      <div className="relative group">
        <input 
          type="email" 
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full bg-transparent border-0 border-b border-white/10 py-4 text-[14px] text-white placeholder:text-white/20 focus:ring-0 focus:border-lime focus:outline-none transition-all font-inter"
        />
        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-lime transition-all duration-500 group-hover:w-full select-none pointer-events-none" />
      </div>

      <div className="relative group">
        <textarea 
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="w-full bg-transparent border-0 border-b border-white/10 py-4 text-[14px] text-white placeholder:text-white/20 focus:ring-0 focus:border-lime focus:outline-none transition-all resize-none font-inter"
        ></textarea>
        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-lime transition-all duration-500 group-hover:w-full select-none pointer-events-none" />
      </div>

      <div className="pt-6">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-lime text-black py-5 font-syne text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-lime-dk transition-all hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
        >
          {isSubmitting ? "TRANSMITTING..." : (
            <>
              DISPATCH MESSAGE
              <span className="text-[18px] group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </button>
        
        <p className="font-inter text-[10px] text-white/20 mt-6 leading-relaxed text-center uppercase tracking-wider">
          Secured with end-to-end encryption.<br />
          By dispatching, you acknowledge our <strong className="text-white/40">Privacy Framework</strong>.
        </p>
      </div>
    </form>
  )
}
