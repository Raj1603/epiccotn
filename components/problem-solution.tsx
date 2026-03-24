"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const problems = [
  {
    index: "01",
    problem: "Limited Period Features",
    solution: "Built-In Pad Holder",
    description: "Secure internal pocket holds your pad in place — no shifting, no bunching. Freedom to move without worry.",
    image: "/images/epiccotn/pad-holder-poster.png"
  },
  {
    index: "02",
    problem: "Poor Hygiene & Odour",
    solution: "Antimicrobial Protection",
    description: "Bamboo's natural kun property inhibits bacteria growth. Stays fresh for 8+ hours — no synthetic chemicals needed.",
    image: "/images/epiccotn/antimicrobial-poster.png"
  },
  {
    index: "03",
    problem: "Visible Panty Lines (VPL)",
    solution: "Invisible Seamless Fit",
    description: "Ultrasonic flat-lock seams vanish under any clothing. Zero bulk, zero lines — designed to be completely invisible.",
    image: "/images/epiccotn/seamless-fit-poster.png"
  },
  {
    index: "04",
    problem: "Lack of Discreet Storage",
    solution: "Hidden Front Pocket",
    description: "A concealed interior pocket for cards, cash, or a spare pad — discreet, secure, and completely invisible from outside.",
    image: "/images/epiccotn/hidden-pocket-poster.png"
  }
]

export function ProblemSolution() {
  return (
    <section className="bg-[#0A0A0A] py-24 px-6 lg:px-16 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          <div className="max-w-[800px]">
            <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-[#C8F542] mb-4">Engineered for Her</p>
            <h2 className="font-syne text-[clamp(36px,5vw,68px)] font-extrabold leading-[0.93] tracking-[-0.03em] uppercase text-[#FFFFFF]">
              Every Problem.<br /><span className="text-[#FFFFFF]/20">One</span> Solution.
            </h2>
          </div>
          <p className="font-inter text-[14px] font-light leading-[1.75] text-[#FFFFFF]/40 max-w-[340px] lg:text-right">
            Common pain points women face every day — addressed with intelligent bamboo engineering and elegant functionality.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5 border border-white/5">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="bg-[#161616] group/card relative flex flex-col transition-transform duration-500 hover:-translate-y-1.5 hover:z-10 cursor-default"
            >
              {/* image area */}
              <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.solution}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* dark overlay gradient on image bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent pointer-events-none" />
                
                {/* top-right index dot */}
                <span className="absolute top-4 right-4 font-syne font-bold text-[11px] text-[#C8F542] tracking-wider bg-[#0A0A0A]/75 backdrop-blur-md border border-[#C8F542]/20 px-2.5 py-1 z-10">
                  {item.index}
                </span>

                {/* vs badge over image bottom */}
                <div className="absolute bottom-4 left-0 right-0 px-4 flex items-center justify-center gap-3 z-10">
                  <div className="w-[34px] h-[34px] rounded-full bg-[#1A0A0A] border border-[#E8556A]/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="#E8556A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>
                  </div>
                  <div className="flex-1 h-[1px] bg-[#FFFFFF]/10" />
                  <div className="w-[34px] h-[34px] rounded-full bg-[#0A140A] border border-[#C8F542]/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="#C8F542" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 7 6 11 12 3"/></svg>
                  </div>
                </div>
              </div>

              {/* text body */}
              <div className="p-6 pt-7 flex flex-col items-start flex-1">
                <p className="font-syne font-bold text-[9px] tracking-[0.14em] uppercase text-[#E8556A]/70 mb-1.5">Problem</p>
                <p className="font-syne text-[12px] font-semibold tracking-wide uppercase text-[#FFFFFF]/30 line-through decoration-[#E8556A]/30 mb-5 leading-tight">
                  {item.problem}
                </p>
                
                {/* divider */}
                <div className="h-[1px] w-full bg-gradient-to-r from-[#C8F542] to-transparent opacity-25 mb-5" />
                
                <p className="font-syne font-bold text-[9px] tracking-[0.14em] uppercase text-[#C8F542] mb-2">Wellness Solution</p>
                <h3 className="font-syne text-[clamp(16px,1.8vw,20px)] font-extrabold leading-[1.1] tracking-tight text-[#FFFFFF] uppercase mb-3 text-balance">
                  {item.solution}
                </h3>
                <p className="font-inter text-[12px] font-light leading-[1.65] text-[#FFFFFF]/40">
                  {item.description}
                </p>
              </div>

              {/* bottom accent bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8F542] scale-x-0 origin-left transition-transform duration-500 group-hover/card:scale-x-100" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
