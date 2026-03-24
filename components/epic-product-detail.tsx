"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

/* ─── Static data ─────────────────────────────────────────── */
const COLORS = [
  { name: "Blush",  hex: "#C4907A", bg: "from-[#2C1E18] via-[#3A2520] to-[#281A14]", image: "/images/epiccotn/hero_confident_woman.png" },
  { name: "Sage",   hex: "#8A9E7E", bg: "from-[#141E12] via-[#1C2A18] to-[#121A10]", image: "/images/epiccotn/lifestyle.png" },
  { name: "Sand",   hex: "#C8B898", bg: "from-[#281E14] via-[#382418] to-[#221A10]", image: "/images/epiccotn/back.png" },
  { name: "Night",  hex: "#3A3850", bg: "from-[#10101C] via-[#181828] to-[#0C0C18]", image: "/images/epiccotn/crotch.png" },
]

const SIZES = ["XS","S","M","L","XL","2XL","3XL","4XL"]
const OOS   = ["3XL"]

const FEATURES = [
  {
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    title: "ProTech 4-Layer",
    desc:  "Absorbs 35ml. Leak-proof 8+ hrs.",
  },
  {
    icon: <path d="M12 2a5 5 0 0 1 5 5c0 5-5 8-5 8S7 12 7 7a5 5 0 0 1 5-5z"/>,
    title: "Antibacterial",
    desc:  "Bamboo kun stays fresh naturally.",
  },
  {
    icon: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
    title: "5× Breathable",
    desc:  "Micro-gap fibres vs cotton.",
  },
  {
    icon: <><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    title: "Ships in 24hrs",
    desc:  "Express dispatch. Free above $50.",
  },
]

const ACCORDION = [
  {
    q: "Fabric & Materials",
    a: "100% OEKO-TEX certified organic bamboo outer shell. ProTech 4-layer inner system — moisture-wicking transfer layer, absorbent core, ultrasonic leak-proof barrier. Zero PFAS, zero synthetic fragrances, zero phthalates. Naturally pH balanced for intimate skin.",
  },
  {
    q: "Size & Fit",
    a: "Available XS to 4XL. Each size individually graded — not stretched — for true proportional fit. 4-way stretch waistband, no-roll construction, flat-lock seams for zero chafe. When between sizes, size up for overnight wear.",
  },
  {
    q: "Care Instructions",
    a: "Rinse cold after use. Machine wash gentle, 30°C max. Do not tumble dry — hang dry to preserve the ProTech core. No fabric softener. Properly cared for, your Epiccotn lasts 2+ years with full performance.",
  },
  {
    q: "Delivery & Returns",
    a: "Express dispatch within 24 hours. Free shipping above $50. Free returns within 30 days — if you don't love your first pair, full refund guaranteed. Our Comfort Guarantee applies to all first orders with no conditions.",
  },
]

const RELATED = [
  { ghost:"HEAVY", badge:"Bestseller",  name:"Bamboo Overnight",  desc:"Heavy flow · Up to 35ml · 8hr protection", price:"$16.90", bg:"from-[#2C1E18] to-[#281410]", image:"/images/epiccotn/pad-holder-poster.png" },
  { ghost:"LIGHT", badge:null,          name:"Bamboo Everyday",   desc:"Light flow · Up to 15ml · All-day wear",  price:"$12.90", bg:"from-[#141E12] to-[#101A0E]", image:"/images/epiccotn/seamless-fit-poster.png" },
  { ghost:"BUNDLE",badge:"Best Value",  name:"Starter Bundle",    desc:"All 3 flow levels · Save 15%",           price:"$38.90", bg:"from-[#101018] to-[#0E0E20]", image:"/images/epiccotn/antimicrobial-poster.png" },
  { ghost:"SPORT", badge:null,          name:"Bamboo Sport",      desc:"Active fit · Sweat-wicking · All-day",   price:"$14.90", bg:"from-[#201616] to-[#180E0E]", image:"/images/epiccotn/hidden-pocket-poster.png" },
]

/* ─── Component ───────────────────────────────────────────── */
interface Props { product: Product; isAdmin?: boolean }

export function EpicProductDetail({ product, isAdmin }: Props) {
  const [colorIdx,   setColorIdx]   = useState(0)
  const [selectedSz, setSelectedSz] = useState<string | null>(null)
  const [qty,        setQty]        = useState(1)
  const [bundle,     setBundle]     = useState(false)
  const [openAcc,    setOpenAcc]    = useState<number | null>(null)
  const [added,      setAdded]      = useState(false)
  const { addItem } = useCart()

  const basePrice   = product.price ?? 14.90
  const origPrice   = product.originalPrice ?? Number((basePrice * 1.33).toFixed(2))
  const savePct     = Math.round((1 - basePrice / origPrice) * 100)
  const bundleExtra = 26.90
  const totalPrice  = basePrice * qty + (bundle ? bundleExtra : 0)

  const handleAdd = () => {
    if (!selectedSz) { toast.error("Please select a size"); return }
    addItem(product, qty, col.name, selectedSz)
    window.dispatchEvent(new CustomEvent("openCart"))
    setAdded(true)
    toast.success("Added to cart!")
    setTimeout(() => setAdded(false), 2000)
  }

  const col = COLORS[colorIdx]

  return (
    <div className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen font-inter antialiased" suppressHydrationWarning>


      {/* ── 2-col product wrap ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#FFFFFF]/[0.08]" style={{ minHeight: "calc(100vh - 96px)" }}>

        {/* ── LEFT: Sticky Gallery ─────────────────────────── */}
        <div className="lg:sticky lg:top-[96px] lg:h-[calc(100vh-96px)] grid border-b lg:border-b-0 lg:border-r border-[#FFFFFF]/[0.08] overflow-hidden"
             style={{ gridTemplateColumns: "64px 1fr" }}>

          {/* thumb rail */}
          <div className="flex flex-col gap-[2px] p-3 bg-[#111111] border-r border-[#FFFFFF]/[0.08]">
            {COLORS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIdx(i)}
                className={cn(
                  "w-11 h-[52px] flex-shrink-0 border cursor-pointer transition-all relative overflow-hidden flex items-center justify-center",
                  colorIdx === i ? "border-[#C8F542]" : "border-transparent hover:border-[#FFFFFF]/30"
                )}
              >
                <Image src={c.image} alt={c.name} fill className="object-cover" sizes="44px" />
              </button>
            ))}
          </div>

          {/* main view */}
          <div className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br transition-all duration-500", col.bg)}>
            {/* product image */}
            <Image
              src={col.image}
              alt={`Bamboo Classic — ${col.name}`}
              fill
              className="object-cover transition-all duration-700 opacity-90"
              sizes="50vw"
              priority
            />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/20 pointer-events-none" />

            {/* badge TL */}
            <div className="absolute top-[18px] left-[18px] z-10 font-syne font-bold text-[10px] tracking-[0.12em] uppercase bg-[#0A0A0A]/75 backdrop-blur-md border border-[#FFFFFF]/[0.08] text-[#FFFFFF]/45 px-3 py-[5px]">
              Bamboo Classic — {col.name}
            </div>

            {/* color dot TR */}
            <div className="absolute top-[18px] right-[18px] z-10 w-[10px] h-[10px] rounded-full border border-[#FFFFFF]/20 transition-all duration-300"
                 style={{ background: col.hex }}/>

            {/* badge BL */}
            <div className="absolute bottom-[18px] left-[18px] z-10 flex items-center gap-2 bg-[#C8F542]/[0.08] border border-[#C8F542]/20 px-[14px] py-[6px]">
              <div className="w-[5px] h-[5px] rounded-full bg-[#C8F542] flex-shrink-0"/>
              <span className="font-syne font-bold text-[10px] text-[#C8F542] tracking-[0.10em] uppercase">OEKO-TEX Certified</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product Info ───────────────────────────── */}
        <div className="px-8 lg:px-14 py-12 overflow-y-auto flex flex-col gap-0">


          {/* heading */}
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.08, duration:.5 }}
            className="font-syne text-[clamp(40px,4.5vw,64px)] font-extrabold leading-[.9] tracking-[-0.03em] uppercase text-[#FFFFFF] mb-2">
            Rediscover<br/>Your
            <span className="text-[#C8F542] italic text-[.82em] block"> Comfort.</span>
          </motion.h1>



          {/* price */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.16, duration:.5 }}
            className="flex items-baseline gap-2.5 mb-7">
            <span className="font-syne font-bold text-[38px] text-[#FFFFFF] tracking-[-0.02em] leading-none">
              ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="font-syne font-bold text-[20px] text-[#FFFFFF]/45 line-through">${origPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="font-syne font-bold text-[10px] tracking-[.10em] uppercase bg-[#C8F542]/10 border border-[#C8F542]/25 text-[#C8F542] px-[10px] py-1">
              Save {savePct}%
            </span>
          </motion.div>

          {/* colour */}
          <p className="font-syne font-bold text-[10px] tracking-[0.16em] uppercase text-[#FFFFFF]/45 mb-2.5">
            Colour: <span className="text-[#FFFFFF]">{col.name}</span>
          </p>
          <div className="flex gap-2 flex-wrap mb-6">
            {COLORS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIdx(i)}
                style={{ background: c.hex }}
                className={cn(
                  "w-8 h-8 border-2 cursor-pointer transition-all relative outline-none",
                  colorIdx === i ? "border-[#C8F542] ring-1 ring-[#C8F542]/40 ring-offset-2 ring-offset-[#0A0A0A]" : "border-transparent hover:border-[#FFFFFF]/30"
                )}
                title={c.name}
              >
                {colorIdx === i && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-3 h-3" viewBox="0 0 13 13" fill="none" stroke="#0A0A0A" strokeWidth="2.5"><polyline points="2 6.5 5.5 10 11 3"/></svg>
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* size */}
          <p className="font-syne font-bold text-[10px] tracking-[0.16em] uppercase text-[#FFFFFF]/45 mb-2.5">
            Size: <span className="text-[#FFFFFF]">{selectedSz ?? "Select"}</span>
          </p>
          <div className="flex gap-1.5 flex-wrap mb-2">
            {SIZES.map(sz => {
              const oos = OOS.includes(sz)
              return (
                <button key={sz}
                  disabled={oos}
                  onClick={() => setSelectedSz(sz)}
                  className={cn(
                    "min-w-[48px] h-[42px] px-3 font-syne text-[12px] font-bold tracking-[.04em] uppercase border transition-all",
                    oos
                      ? "opacity-25 cursor-not-allowed line-through border-[#FFFFFF]/[0.08] text-[#FFFFFF]/70"
                      : selectedSz === sz
                        ? "bg-[#C8F542] border-[#C8F542] text-[#0A0A0A]"
                        : "bg-transparent border-[#FFFFFF]/[0.08] text-[#FFFFFF]/70 hover:border-[#FFFFFF]/30 hover:text-[#FFFFFF]"
                  )}
                >{sz}</button>
              )
            })}
          </div>

          {/* qty */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-syne font-bold text-[10px] tracking-[0.16em] uppercase text-[#FFFFFF]/45">Qty</span>
            <div className="flex items-center border border-[#FFFFFF]/[0.08]">
              <button onClick={() => setQty(q => Math.max(1, q-1))}
                className="w-[38px] h-[38px] flex items-center justify-center text-[#FFFFFF]/45 hover:text-[#C8F542] hover:bg-[#C8F542]/5 transition-all text-lg">
                −
              </button>
              <div className="w-11 h-[38px] flex items-center justify-center font-syne font-bold text-[13px] text-[#FFFFFF] border-x border-[#FFFFFF]/[0.08]">
                {qty}
              </div>
              <button onClick={() => setQty(q => q+1)}
                className="w-[38px] h-[38px] flex items-center justify-center text-[#FFFFFF]/45 hover:text-[#C8F542] hover:bg-[#C8F542]/5 transition-all text-lg">
                +
              </button>
            </div>
          </div>


          {/* CTA */}
          <div className="flex flex-col gap-2 mb-10">
            <button onClick={handleAdd}
              className={cn(
                "w-full flex items-center justify-between font-syne text-[14px] font-extrabold tracking-[.05em] uppercase px-8 py-[18px] transition-all",
                added
                  ? "bg-[#A8D020] text-[#0A0A0A]"
                  : "bg-[#C8F542] hover:bg-[#A8D020] hover:-translate-y-[1px] text-[#0A0A0A]"
              )}>
              <span>{added ? "Added!" : "Add to Cart"}</span>
              <span className="font-syne font-bold text-[15px]">${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </button>
          </div>

        </div>
      </div>


    </div>
  )
}
