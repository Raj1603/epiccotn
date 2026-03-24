"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function WellnessSustainability() {
  return (
    <section id="about-us" className="py-[100px] px-6 lg:px-16 bg-black border-y border-white/5 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Content - Epiccotn contents */}
        <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-[580px]">
          <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-white/30 mb-6 flex items-center gap-2">
            EPICCOTN <span className="text-lime">×</span> THE PERFECT BLEND
          </p>
          <h2 className="font-syne text-[clamp(32px,4.5vw,64px)] font-bold leading-[1] tracking-[-0.03em] uppercase text-white mb-8">
            A Beautiful<br/>Combination of<br/><span className="text-lime">Bamboo</span> &amp; Cotton
          </h2>
          <p className="font-inter text-[18px] font-light leading-[1.7] text-white/40 mb-10">
            We&apos;ve engineered the ultimate high-performance fabric by blending the natural moisture-wicking power of sustainable Bamboo with the timeless softness of organic Cotton. This perfect synergy creates a breathable, durable, and impossibly soft garment that works as hard as you do.
          </p>
        </motion.div>

        {/* Right Visual - Collaboration Box */}
        <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <div className="flex items-center justify-center relative scale-90 lg:scale-100">
            {/* Box 1 - Epiccotn */}
            <div className="w-[300px] h-[400px] bg-black relative flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
              <div className="relative z-10 text-white font-syne text-[36px] font-bold tracking-[-0.03em] flex items-center">
                Epiccotn<span className="w-2.5 h-2.5 bg-lime ml-0.5 mt-2" />
              </div>
            </div>

            {/* The X */}
            <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center pointer-events-none">
              <div className="relative w-10 h-10">
                <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white rotate-45 shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white -rotate-45 shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
              </div>
            </div>

            {/* Box 2 - Bamboo Trees */}
            <div className="w-[300px] h-[400px] bg-[#F9F9F9] relative flex items-center justify-center overflow-hidden border border-gray-100 shadow-2xl -ml-1">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#linen-pattern)" /></svg>
              </div>
              <div className="relative z-10 p-10 flex flex-col items-center gap-4 text-center">
                <Image 
                  src="/images/epiccotn/bamboo_nature_logo.png" 
                  alt="Organic Bamboo" 
                  width={220} 
                  height={220}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <pattern id="linen-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="10" y2="10" stroke="#000" strokeWidth="0.5" />
            <line x1="10" y1="0" x2="0" y2="10" stroke="#000" strokeWidth="0.5" />
          </pattern>
        </defs>
      </svg>
    </section>
  )
}
