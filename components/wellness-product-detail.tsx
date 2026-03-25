"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Droplets, Wind, Shield, Plus, Circle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function WellnessProductDetail() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="bg-black text-white selection:bg-lime selection:text-black">
      
      {/* ═══ STATS BAR ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
        {[
          { num: "100", unit: "%", label: "Organic Bamboo" },
          { num: "04", unit: "Lyr", label: "ProTech shield" },
          { num: "35", unit: "ml", label: "Max Absorbency" },
          { num: "150", unit: "+", label: "Pads replaced per year" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
            className="p-9 lg:px-10 border-r border-b lg:border-b-0 border-border flex flex-col gap-2 hover:bg-lime/5 transition-colors"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-syne font-bold text-[40px] font-normal text-white leading-none">{stat.num}</span>
              <span className="font-syne font-bold text-[18px] text-lime leading-none">{stat.unit}</span>
            </div>
            <span className="font-inter text-[12px] text-text-dim tracking-[0.02em]">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* ═══ WHY BAMBOO ═══ */}
      <section className="py-[100px] px-6 lg:px-16 border-b border-border" id="whySwitch">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Why switch</p>
              <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase">Why Switch to<br/>Bamboo Fabric?</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:text-right">
              <p className="font-inter text-[15px] font-light leading-[1.75] text-text-mid max-w-[480px]">
                Skin-loving fabric, hypoallergenic and chemical-free. Every fibre engineered to work harder than what you&apos;re wearing now.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border">
            {[
              { num: "01", icon: <Droplets className="w-11 h-11 text-lime stroke-[1.2]" />, title: "3X Faster Sweat Absorption", desc: "Micro-channel bamboo fibres draw moisture away from skin 3× faster than conventional cotton." },
              { num: "02", icon: <Wind className="w-11 h-11 text-lime stroke-[1.2]" />, title: "5X More Breathable", desc: "Natural Micro-Gaps in bamboo's hollow fibre structure create continuous airflow. Cooler, fresher." },
              { num: "03", icon: <Shield className="w-11 h-11 text-lime stroke-[1.2]" />, title: "Natural Antibacterial", desc: "Bamboo's kun property inhibits bacteria growth naturally — no synthetic antimicrobials." },
              { num: "04", icon: (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11 text-lime">
                  <path d="M46.5 28.5C46.5 36.5 40 43 32 43C24 43 17.5 36.5 17.5 28.5C17.5 20.5 24 14 32 14C40 14 46.5 20.5 46.5 28.5Z" strokeDasharray="2 2" className="opacity-30" />
                  <path d="M42.5 28.5C42.5 34.299 37.799 39 32 39C26.201 39 21.5 34.299 21.5 28.5C21.5 22.701 26.201 18 32 18C37.799 18 42.5 22.701 42.5 28.5Z" />
                  <path d="M37.5 41L21 57.5M21 57.5L28 57.5M21 57.5L21 50.5" strokeWidth="2"/>
                  <path d="M31.5 45L15 61.5M15 61.5L22 61.5" strokeWidth="2" className="opacity-50"/>
                  <path d="M43.5 37L27 53.5M27 53.5L34 53.5" strokeWidth="2" className="opacity-50"/>
                  <text x="32" y="32.5" fontSize="9" textAnchor="middle" fontWeight="900" fontFamily="sans-serif" fill="currentColor" stroke="none">UV</text>
                </svg>
              ), title: "UPF 50+ Protection", desc: "Certified UPF 50+ blocks 98% of UV radiation. Natural protection built into every fibre." },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
                className="p-11 lg:px-8 border-r border-b lg:border-b-0 border-border relative overflow-hidden group hover:bg-white/5 transition-colors cursor-default"
              >
                <span className="absolute top-6 right-6 font-syne font-bold text-[11px] text-white/10 tracking-[0.1em]">{card.num}</span>
                <div className="mb-6">{card.icon}</div>
                <h3 className="font-syne text-[16px] font-bold tracking-[-0.01em] uppercase mb-3 leading-[1.2]">{card.title}</h3>
                <p className="text-[13px] font-light text-text-dim leading-[1.7]">{card.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-lime scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FABRIC SYSTEM ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
        {/* Left */}
        <div className="p-16 px-6 lg:px-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Scientific Nurturing</p>
            <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase">4-Layer<br/>ProTech<br/>System.</h2>
            
            <div className="flex flex-col gap-[2px] mt-12">
              {[
                { name: "Ultra-soft bamboo shell", cl: "bg-white/10 border-l-lime" },
                { name: "Moisture-wicking transfer", cl: "bg-white/5 border-l-lime/50" },
                { name: "ProTech absorbent core", cl: "bg-white/5 border-l-lime/25" },
                { name: "Ultrasonic leak-proof barrier", cl: "bg-white/5 border-l-lime/10" },
              ].map((layer, i) => (
                <div key={i} className={cn("flex items-center justify-between p-5 px-7 cursor-default relative overflow-hidden group border-l-[3px] transition-all hover:pl-9", layer.cl)}>
                  <div className="absolute inset-y-0 left-0 w-0 bg-lime/10 transition-all duration-300 group-hover:w-full" />
                  <span className="relative z-10 font-syne text-[13px] font-semibold tracking-[0.04em] uppercase">{layer.name}</span>
                  <span className="relative z-10 font-syne font-bold text-[32px] text-white/5 leading-none">{i + 1}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <div className="p-16 px-6 lg:px-16 flex flex-col justify-center bg-lime/5">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Wisdom of Trees</p>
            <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase">Engineered<br/>for Her.</h2>
            
            <div className="flex flex-col mt-9">
              {[
                { t: "100% Organic Bamboo Shell", d: "Clinically proven pure. Softer than cotton. Naturally antibacterial. pH-balanced for intimate skin — no synthetic irritants, ever." },
                { t: "ProTech Absorbent Core", d: "Locks fluid away instantly. Holds up to 35ml — equivalent to 7 tampons — without ever feeling wet. Tested to 8+ hours." },
                { t: "Ultrasonic Leak-Proof Barrier", d: "Heat-bonded, not glued. No PFAS. No chemical waterproofing. Stays intact wash after wash — engineered to last 2+ years." },
                { t: "Dermatologist Approved", d: "Tested and verified safe for sensitive skin. Free from PFAS, phthalates, synthetic fragrances, and all known endocrine disruptors." },
              ].map((feat, i) => (
                <div key={i} className="py-6 border-b border-border flex gap-5 items-start cursor-default transition-all hover:pl-2 last:border-b-0">
                  <span className="font-syne font-bold text-[11px] text-lime tracking-[0.1em] shrink-0 pt-0.5">0{i + 1}</span>
                  <div>
                    <h3 className="font-syne text-[16px] font-bold tracking-[-0.01em] uppercase mb-1.5">{feat.t}</h3>
                    <p className="text-[13px] font-light text-text-dim leading-[1.65]">{feat.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ ABSORBENCY + CERTS ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
        {/* Left */}
        <div className="p-16 px-6 lg:px-16 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Advanced Absorbency</p>
            <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase">From Light<br/>Days to Your<br/>Heaviest.</h2>
            
            <div className="flex flex-col gap-7 mt-12">
              {[
                { n: "Light / Everyday", v: "Up to 15ml", w: "38%", no: "~3 tampons · everyday comfort" },
                { n: "Medium / Regular", v: "Up to 25ml", w: "64%", no: "~5 tampons · all-day protection" },
                { n: "Heavy / Overnight", v: "Up to 35ml", w: "90%", no: "~7 tampons · overnight confidence" },
              ].map((lvl, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2.5">
                    <span className="font-syne text-[13px] font-semibold tracking-[0.04em] uppercase">{lvl.n}</span>
                    <span className="font-syne font-bold text-[13px] text-lime">{lvl.v}</span>
                  </div>
                  <div className="h-1 bg-border relative">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-lime"
                      initial={{ width: 0 }}
                      whileInView={{ width: lvl.w }}
                      transition={{ duration: 1.4, ease: "easeOut", delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute -right-px -top-1 w-[2px] h-3 bg-lime opacity-60" />
                    </motion.div>
                  </div>
                  <p className="text-[12px] text-text-dim mt-2 italic">{lvl.no}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Right */}
        <div className="p-16 px-6 lg:px-16 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Certifications</p>
            <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase">You Read<br/>the Label.<br/>We Earn It.</h2>
            
            <div className="grid grid-cols-2 gap-3 mt-10">
              {[
                { icon: "🌱", n: "Purity Standard", d: "Every material tested and verified free of 100+ harmful substances." },
                { icon: "✓", n: "PFAS-Free", d: "Zero forever chemicals. Ultrasonic bonding replaces chemical waterproofing entirely." },
                { icon: "🧬", n: "Derm Tested", d: "Clinically tested for sensitive skin. pH balanced to maintain natural microbiome." },
                { icon: "♻️", n: "Eco-Certified", d: "GOTS certified organic. Bamboo uses 70% less water than cotton." }
              ].map((cert, i) => (
                <div key={i} className="border border-border p-6 px-5 transition-colors hover:border-lime/30">
                  <span className="text-[22px] mb-3 block">{cert.icon}</span>
                  <h3 className="font-syne text-[13px] font-bold tracking-[0.02em] uppercase mb-1.5">{cert.n}</h3>
                  <p className="text-[12px] text-text-dim leading-[1.6]">{cert.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ COMPARISON ═══ */}
      <section className="py-[100px] px-6 lg:px-16 border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col lg:flex-row justify-between items-end mb-14 gap-4">
            <div>
              <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Epiccotn vs. The Competition</p>
              <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase">The Only<br/>Comparison<br/>That Matters.</h2>
            </div>
            <p className="font-inter text-[15px] font-light leading-[1.75] text-text-mid max-w-[360px]">
              No other brand combines certified organic fabric with clinical-grade period protection and a 2-year lifespan. The data speaks clearly.
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            {/* Scroll hint gradient for mobile */}
            <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none lg:hidden" />
            
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse min-w-[700px] lg:min-w-0">
                <thead>
                  <tr>
                    <th className="font-syne font-bold text-[11px] tracking-[0.1em] uppercase py-4 px-7 text-left text-text-dim border-b border-border w-[30%]">Product Feature</th>
                    <th className="bg-lime/5 border-b border-lime/30 text-center relative w-[25%] px-4">
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-lime" />
                      <div className="flex flex-col items-center gap-1.5 py-4">
                        <span className="bg-lime text-black font-syne font-bold text-[9px] px-2.5 py-[3px] tracking-[0.08em] uppercase">Best Pick</span>
                        <span className="font-syne font-bold text-[11px] tracking-[0.1em] uppercase text-lime">Epiccotn</span>
                      </div>
                    </th>
                    <th className="font-syne font-bold text-[11px] tracking-[0.1em] uppercase py-4 px-7 text-left text-text-dim border-b border-border w-[22%]">Traditional Pads</th>
                    <th className="font-syne font-bold text-[11px] tracking-[0.1em] uppercase py-4 px-7 text-left text-text-dim border-b border-border w-[23%]">Synthetic Brands</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: "Organic certified fabric", e: "✓", t: "—", s: "—", c1: true, c2: false, c3: false },
                    { f: "PFAS-free construction", e: "✓", t: "—", s: "—", c1: true, c2: false, c3: false },
                    { f: "4-layer ProTech core", e: "✓", t: "—", s: "—", c1: true, c2: false, c3: false },
                    { f: "Dermatologist approved", e: "✓", t: "—", s: "Varies", c1: true, c2: false, c3: false, ts: true },
                    { f: "Lasts 2+ years", e: "✓", t: "—", s: "✓", c1: true, c2: false, c3: true },
                    { f: "Replaces 150+ pads/year", e: "✓", t: "—", s: "✓", c1: true, c2: false, c3: true },
                  ].map((row, i) => (
                    <tr key={i} className="group transition-colors">
                      <td className="py-4.5 px-7 text-[13px] font-light text-white/45 border-b border-border group-hover:bg-white/5 whitespace-nowrap">{row.f}</td>
                      <td className="py-4.5 px-7 bg-lime/10 text-center border-b border-border group-hover:bg-lime/20">
                        <span className="text-[16px] text-lime font-bold">{row.e}</span>
                      </td>
                      <td className="py-4.5 px-7 text-[13px] font-light border-b border-border group-hover:bg-white/5">
                        <span className="text-[16px] text-white/15">{row.t}</span>
                      </td>
                      <td className="py-4.5 px-7 text-[13px] font-light border-b border-border group-hover:bg-white/5 text-white/45">
                        <span className={cn("text-[16px]", row.c3 ? "text-lime font-bold" : row.ts ? "" : "text-white/15")}>{row.s}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="py-[100px] px-6 lg:px-16 border-b border-border" id="reviews">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col lg:flex-row justify-between items-end mb-14 gap-4">
            <div>
              <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Real Women, Real Results</p>
              <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase">Join the<br/>Movement.</h2>
            </div>
            {/* <Link href="#reviews" className="bg-transparent text-white font-syne text-[13px] font-semibold tracking-[0.06em] uppercase px-7 py-[0.8rem] border border-border-lt hover:bg-white/5 hover:border-white/35 transition-all">
              Read All Reviews →
            </Link> */}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-border">
            {[
              { body: `"I forgot I was wearing them. That's the highest compliment I can give period underwear. Nothing else comes close."`, author: "Sarah M. — Verified Buyer" },
              { body: `"Switched from tampons after 12 years. Zero leaks overnight. The bamboo is impossibly soft on sensitive skin."`, author: "Priya K. — Verified Buyer" },
              { body: `"Endometriosis, heavy flow, sensitive skin — Epiccotn ticks every single box. Worth every penny, every single month."`, author: "Amelia R. — Verified Buyer" },
            ].map((rev, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
                className="bg-offblack p-10 px-8 border-b-2 border-transparent hover:bg-white/5 hover:border-lime transition-all cursor-default"
              >
                <div className="text-lime text-[13px] tracking-[0.05em] mb-5">★★★★★</div>
                <p className="font-inter text-[16px] font-light leading-[1.6] text-white italic mb-6">{rev.body}</p>
                <p className="font-syne font-bold text-[11px] text-text-dim tracking-[0.1em] uppercase">{rev.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-b border-border" id="faq">
        <div className="p-16 px-6 lg:px-16 border-b md:border-b-0 md:border-r border-border">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Got Questions?</p>
            <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase">Details<br/>&amp; FAQ</h2>
            <div className="mt-10 p-7 border border-border flex flex-col gap-3">
              <h3 className="font-syne text-[16px] font-bold uppercase tracking-[-0.01em]">Still unsure?</h3>
              <p className="text-[13px] text-text-dim font-light leading-[1.6]">Our team replies within 2 hours. We&apos;ll help you find your perfect fit and absorbency level.</p>
              <Link href="/contact" className="bg-lime text-black font-syne text-[12px] font-bold uppercase tracking-[0.06em] px-6 py-3 mt-1 hover:bg-lime-dk transition-colors w-fit block decoration-none">
                Contact Support →
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="p-16 px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            {[
              { q: "How do I care for my Epiccotn?", a: "Rinse in cold water after use. Machine wash gentle at 30°C max. Do not tumble dry or use fabric softener — hang dry to preserve the ProTech core. Properly cared for, each pair lasts 2+ years with full performance." },
              { q: "When does it start working?", a: "Immediately — from the very first wear. No break-in period required. Epiccotn's bamboo shell and ProTech core are fully functional right out of the packaging." },
              { q: "Does it fit every body type?", a: "Yes. Epiccotn comes in XS to 4XL with 4-way stretch fabric and proportional grading — meaning each size is individually engineered for fit, not just stretched. Use our size guide if you're between sizes." },
              { q: "Can I use it with other period products?", a: "Absolutely. Many customers pair Epiccotn with a menstrual cup or disc on their heaviest days. For light-to-medium flow, Epiccotn works confidently as a complete standalone product." },
              { q: "What's your return policy?", a: "Free returns within 30 days, no questions asked. Don't like your first pair? It's on us — full refund guaranteed. This is our Comfort Guarantee and we stand behind it completely." },
            ].map((faq, i) => (
              <div key={i} className="border-b border-border group">
                <div onClick={() => toggleFaq(i)} className="flex justify-between items-center py-5 cursor-pointer font-syne text-[16px] font-semibold tracking-[-0.01em] uppercase text-white/75 hover:text-white transition-colors gap-5 select-none md:pr-4">
                  <span className={openFaq === i ? "text-white" : ""}>{faq.q}</span>
                  <div className={cn("shrink-0 w-6 h-6 border border-border flex items-center justify-center text-text-dim text-[16px] transition-all", openFaq === i ? "border-lime text-lime rotate-45" : "")}>
                    <Plus className={cn("w-4 h-4 transition-transform", openFaq === i ? "rotate-45" : "")} />
                  </div>
                </div>
                <div className={cn("font-inter text-[14px] font-light text-text-dim leading-[1.8] overflow-hidden transition-all duration-400 ease-out", openFaq === i ? "max-h-[180px] opacity-100 pb-6" : "max-h-0 opacity-0 pb-0")}>
                  {faq.a}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMFORT GUARANTEE REMOVED */}

      {/* ═══ PRE-FOOTER CTA ═══ */}
      <section className="min-h-[480px] flex flex-col items-center justify-center text-center p-[100px] px-6 relative overflow-hidden bg-black border-b border-border">
        {/* Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syne text-[clamp(80px,18vw,220px)] font-extrabold text-white/[0.025] whitespace-nowrap tracking-[-0.04em] uppercase pointer-events-none select-none">
          EPICCOTN
        </div>
        
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative z-10 w-full flex flex-col items-center">
          <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-5">Ready When You Are</p>
          <h2 className="font-syne text-[clamp(36px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.025em] uppercase text-white mb-3">
            Ready to<br/><span className="text-lime">Rediscover</span><br/>Comfort?
          </h2>
          <p className="font-inter text-[15px] font-light leading-[1.75] text-text-mid max-w-[520px] mb-12">
            First pair guarantee. Free returns. Ships in 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/products" className="bg-lime hover:bg-lime-dk text-black font-syne text-[14px] font-bold tracking-[0.06em] uppercase px-14 py-4 transition-all hover:-translate-y-[2px]">
              Shop Collection →
            </Link>
            {/* <Link href="/products" className="bg-black border border-border-lt hover:border-white/35 hover:bg-white/5 text-white font-syne text-[13px] font-semibold tracking-[0.06em] uppercase px-8 py-4 transition-all">
              Get the Starter Bundle
            </Link> */}
          </div>

          {/* TRUST STRIP REMOVED */}
        </motion.div>
      </section>
      
    </div>
  )
}
