"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  const handleSubscribe = async (e: React.FormEvent) => {
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
    <footer suppressHydrationWarning className="bg-offblack border-t border-border mt-auto">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-border">

          <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-border">
            <Link href="/" className="font-syne text-[24px] font-extrabold text-white tracking-[-0.02em] mb-4 flex items-center">
              Epiccotn<span className="w-2.5 h-2.5 bg-lime ml-0.5 mt-2" />
            </Link>
            <p className="font-inter text-[13px] font-light text-text-dim leading-[1.75] max-w-[280px] mb-8">
              Fusing natural wisdom with modern textile science to empower women&apos;s health and daily confidence.
            </p>

            <p className="font-syne font-bold text-[10px] text-text-dim tracking-[0.14em] uppercase mb-3">
              Join the Wellness Journey
            </p>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-[340px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3.5 py-2.5 bg-border border border-border border-r-0 text-white font-inter text-[13px] outline-none placeholder:text-white/45 focus:border-lime/40 focus:bg-lime/5 transition-colors"
                autoComplete="email"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-lime text-black font-syne font-bold text-[11px] tracking-[0.08em] uppercase whitespace-nowrap hover:bg-lime-dk transition-colors font-semibold disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? "WAIT..." : "SUBSCRIBE"}
              </button>
            </form>
            <p className="text-[11px] text-white/40 mt-2.5">
              By subscribing, you agree to our Privacy Policy.
            </p>

            <div className="flex gap-2.5 mt-7">
              <a href="https://www.instagram.com/epic.cotn1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 border border-border flex items-center justify-center bg-transparent transition-colors hover:border-lime/40 group">
                <Instagram className="w-[15px] h-[15px] stroke-[1.5] text-text-dim group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61588227026428" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 border border-border flex items-center justify-center bg-transparent transition-colors hover:border-lime/40 group">
                <Facebook className="w-[15px] h-[15px] stroke-[1.5] text-text-dim group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.youtube.com/@epiccotn" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 border border-border flex items-center justify-center bg-transparent transition-colors hover:border-lime/40 group">
                <Youtube className="w-[15px] h-[15px] stroke-[1.5] text-text-dim group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/company/epiccotn/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 border border-border flex items-center justify-center bg-transparent transition-colors hover:border-lime/40 group">
                <Linkedin className="w-[15px] h-[15px] stroke-[1.5] text-text-dim group-hover:text-white transition-colors" />
              </a>
              <a href="https://x.com/Epiccotn" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-8 h-8 border border-border flex items-center justify-center bg-transparent transition-colors hover:border-lime/40 group">
                <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-text-dim group-hover:fill-white transition-colors" aria-hidden="true">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-border">
            <p className="font-syne font-bold text-[10px] tracking-[0.14em] uppercase text-text-dim mb-6">Wellness</p>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link href="/products" className="font-inter text-[14px] font-light text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="text-[11px] text-border group-hover:text-lime transition-colors">→</span> Everyday Panty
                </Link>
              </li>
              <li>
                <Link href="/#about-us" className="font-inter text-[14px] font-light text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="text-[11px] text-border group-hover:text-lime transition-colors">→</span> Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-inter text-[14px] font-light text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="text-[11px] text-border group-hover:text-lime transition-colors">→</span> Blogs
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="font-inter text-[14px] font-light text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="text-[11px] text-border group-hover:text-lime transition-colors">→</span> Community
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-border">
            <p className="font-syne font-bold text-[10px] tracking-[0.14em] uppercase text-text-dim mb-6">Science</p>
            <ul className="flex flex-col gap-3.5">
              {["Advanced Tech", "Probiotic Finish", "Ethical Sourcing"].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="font-inter text-[14px] font-light text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="text-[11px] text-border group-hover:text-lime transition-colors">→</span> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 lg:p-14">
            <p className="font-syne font-bold text-[10px] tracking-[0.14em] uppercase text-text-dim mb-6">Support</p>
            <ul className="flex flex-col gap-3.5">
              {[
                { name: "Shipping & Returns", href: "#" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Contact Us", href: "/contact" },
                { name: "FAQs", href: "#" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="font-inter text-[14px] font-light text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="text-[11px] text-border group-hover:text-lime transition-colors">→</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-5 px-10 flex-wrap gap-3">
          <span className="font-syne font-bold text-[11px] text-white/20 tracking-[0.06em] uppercase">
            © {new Date().getFullYear()} EPICCOTN. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Accessibility", "Comfort Guarantee"].map((legal, i) => (
              <Link key={i} href="#" className="font-inter text-[12px] text-white/20 hover:text-white/50 transition-colors">
                {legal}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
