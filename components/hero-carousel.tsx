"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Droplets, Shield, Recycle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const carouselData = [
  {
    eyebrow: "THE SCIENCE OF REST",
    heading: "Nurturing Your Sleep",
    sub: "Our 4-layer ProTech core absorbs up to 35ml. Clinically tested, pure and safe, and loved by women with sensitive skin worldwide. Experience the deepest rest of your life.",
    icon: <Shield className="w-6 h-6" />,
    label: "Overnight Series",
    name: "Heavy Overnight",
    badge: "Toxin-Free Certified",
    bgText: "PURITY",
    image: "/images/epiccotn/hero_sleeping_woman_new.png",
  },
  {
    eyebrow: "THE ART OF COMFORT",
    heading: "Confident Every Day",
    sub: "Designed by Women, for Every Body. Organically certified bamboo period underwear — crafted for your comfort, your health, and your planet.",
    icon: <Droplets className="w-6 h-6" />,
    label: "Bestseller",
    name: "Bamboo Classic",
    badge: "3 colours · Free Returns",
    bgText: "COMFORT",
    image: "/images/epiccotn/hero_confident_woman.png",
  },
  {
    eyebrow: "THE WISDOM OF MOVEMENT",
    heading: "Freedom of Stretch",
    sub: "Bamboo is 5× more breathable than cotton, naturally hypoallergenic, and grown without pesticides. Try it risk-free with our Comfort Guarantee.",
    icon: <Recycle className="w-6 h-6" />,
    label: "Eco-Certified",
    name: "Starter Bundle",
    badge: "All 3 levels · Best Value",
    bgText: "FREEDOM",
    image: "/images/epiccotn/hero_stretching_woman.png",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }

  const slide = carouselData[currentSlide]

  return (
    <section className="relative w-full h-[85vh] min-h-[750px] overflow-hidden bg-[#FAFAFA] flex items-center justify-center pt-[60px]">
      
      {/* 1. Global Background Large Text (Behind everything) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-syne text-[clamp(280px,40vw,800px)] font-extrabold text-[#0A0A0A]/[0.015] leading-none tracking-[-0.05em] uppercase whitespace-nowrap"
          >
            {slide.bgText}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto h-full flex flex-col lg:flex-row items-center px-6 lg:px-20 z-10 pointer-events-none">
        
        {/* 2. LEFT CONTENT (Text) - Positioned higher to allow overlap */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center text-left py-12 lg:py-0 z-20 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="font-syne font-bold text-[13px] font-black tracking-[0.35em] uppercase text-[#000] mb-10 block opacity-40">
                {slide.eyebrow}
              </span>
              
              <h1 className="font-syne text-[clamp(48px,6vw,92px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#050505] mb-10 drop-shadow-sm">
                {slide.heading}
              </h1>

              <div className="flex flex-col gap-12">
                <p className="font-inter text-[18px] font-normal leading-[1.85] text-[#000] max-w-[480px] opacity-70">
                  {slide.sub}
                </p>

                <div className="flex items-center gap-6">
                  <Link 
                    href="/products"
                    className="h-16 px-16 bg-[#000] text-[#FFF] font-syne text-[12px] font-bold tracking-[0.25em] uppercase hover:bg-lime hover:text-black transition-all duration-300 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] flex items-center justify-center group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. RIGHT PARTITION (Boxed Image with Shadow) - Positioned lower */}
        <div className="w-full lg:w-[40%] h-[500px] lg:h-full flex items-center justify-center lg:justify-end z-10 pointer-events-auto">
          <div className="relative w-full max-w-[580px] aspect-[4/5] bg-neutral-200 group overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -15 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-4 lg:inset-x-0 inset-y-0 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.2)] overflow-hidden bg-white"
              >
                <Image
                  src={slide.image}
                  alt={slide.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 4. NAVIGATION (Forced High Contrast Circular Buttons) */}
      <div className="absolute inset-y-0 left-0 lg:left-8 flex items-center z-50 pointer-events-none">
        <button 
          onClick={handlePrev}
          className="w-16 h-16 rounded-full bg-white text-black border-2 border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 pointer-events-auto ml-4 scale-95 lg:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-8 h-8" strokeWidth={3} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 lg:right-8 flex items-center z-50 pointer-events-none">
        <button 
          onClick={handleNext}
          className="w-16 h-16 rounded-full bg-white text-black border-2 border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 pointer-events-auto mr-4 scale-95 lg:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-8 h-8" strokeWidth={3} />
        </button>
      </div>

      {/* 5. SLIDE INDICATORS (High contrast) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 z-50">
        <div className="flex gap-4">
          {carouselData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-700",
                currentSlide === i ? "w-16 bg-black" : "w-4 bg-black/10"
              )}
            />
          ))}
        </div>
        <span className="font-syne font-bold text-[14px] font-black tracking-[0.2em] text-black">
          {String(currentSlide + 1).padStart(2, '0')} — {String(carouselData.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
