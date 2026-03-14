"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ComingSoon() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("https://formspree.io/f/xkoqzzvb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-serif text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/coming-soon-bg.png"
          alt="Cotton Field"
          fill
          className="object-cover opacity-60 transition-transform duration-[10s] hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-medium tracking-[0.2em] uppercase mb-2">
            Epic Cotton
          </h1>
          <div className="w-64 h-px bg-white/30 mx-auto border-b border-dashed border-white/50" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-normal tracking-wider uppercase mb-4">
            We Are Developing
          </h2>
          <div className="max-w-3xl h-px bg-white/30 mx-auto border-b border-dashed border-white/50" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-xl bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl"
        >
          <h3 className="text-2xl font-medium mb-2">Contact Us</h3>
          <p className="text-white/70 mb-8 italic">Drop us a line!</p>

          {status === "success" ? (
            <div className="py-8 text-center">
              <p className="text-green-400 text-lg font-medium">✓ Message sent!</p>
              <p className="text-white/60 mt-2 text-sm">We&apos;ll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-white/50 text-sm underline underline-offset-4 hover:text-white transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Name"
                  className="bg-white/5 border-white/10 focus:border-white/30 transition-colors h-12 font-serif"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-white/5 border-white/10 focus:border-white/30 transition-colors h-12 font-serif"
                  required
                />
              </div>
              <Textarea
                name="message"
                placeholder="Message"
                className="bg-white/5 border-white/10 focus:border-white/30 transition-colors min-h-[120px] font-serif"
                required
              />
              {status === "error" && (
                <p className="text-red-400 text-sm font-serif">Oops! Something went wrong. Please try again.</p>
              )}
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full h-12 bg-white text-black hover:bg-white/90 transition-all font-semibold text-lg rounded-lg flex items-center justify-center gap-2 disabled:opacity-60 font-serif"
              >
                <Send className="w-4 h-4" />
                {status === "sending" ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-white/40 text-sm tracking-widest uppercase font-serif"
        >
          Our new site is coming soon
        </motion.p>
      </div>
    </div>
  )
}
