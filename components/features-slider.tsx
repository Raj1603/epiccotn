"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const features = [
    {
        title: "Antimicrobial",
        image: "/images/epiccotn/antimicrobial-poster.png",
        description: "Naturally inhibits bacteria growth and prevents odors."
    },
    {
        title: "Advanced Features",
        image: "/images/epiccotn/features.png",
        description: "Four-layer protection system for complete confidence."
    },
    {
        title: "Hidden Pocket",
        image: "/images/epiccotn/hidden-pocket-poster.png",
        description: "Discrete storage for small essentials when you're on the move."
    },
    {
        title: "Pad Holder",
        image: "/images/epiccotn/pad-holder-poster.png",
        description: "Secure placement for extra protection whenever you need it."
    },
    {
        title: "The Science",
        image: "/images/epiccotn/science.png",
        description: "Engineered with pH-balanced bamboo fibres for ultimate health."
    },
    {
        title: "Seamless Fit",
        image: "/images/epiccotn/seamless-fit-poster.png",
        description: "Designed to be invisible under your most form-fitting clothes."
    }
]

export function FeaturesSlider() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )

    return (
        <section className="bg-[#FAFAFA] py-20 border-b border-border overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <p className="font-syne font-bold text-[11px] tracking-[0.16em] uppercase text-lime mb-4">Features Overview</p>
                        <h2 className="font-syne text-[clamp(32px,4vw,56px)] font-bold leading-[1] tracking-[-0.025em] uppercase text-[#0A0A0A]">Engineered for<br/>Your Lifestyle.</h2>
                    </div>
                    <p className="font-inter text-[15px] font-light leading-[1.75] text-text-mid max-w-[400px]">
                        Every pair of Epiccotn is a masterpiece of textile engineering, combining traditional comfort with modern wellness technology.
                    </p>
                </div>

                <Carousel
                    plugins={[plugin.current]}
                    className="w-full relative group"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4 lg:-ml-6">
                        {features.map((feature, i) => (
                            <CarouselItem key={i} className="pl-4 lg:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative group/card cursor-pointer"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#F0F0F0] border border-border transition-all group-hover/card:border-lime/30">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover/card:opacity-90" />
                                        
                                        <div className="absolute bottom-0 left-0 right-0 p-8">
                                            <p className="font-syne font-bold text-[10px] text-lime tracking-[0.12em] uppercase mb-2">0{i + 1}</p>
                                            <h3 className="font-syne text-2xl font-bold text-white uppercase tracking-tight mb-2">{feature.title}</h3>
                                            <p className="text-white/60 text-sm font-light leading-relaxed max-w-[260px] opacity-0 translate-y-4 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    <div className="absolute -top-16 right-0 flex gap-3">
                        <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full bg-black text-white border-none hover:bg-neutral-800 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center">
                            <ArrowLeft className="w-6 h-6" strokeWidth={3} />
                        </CarouselPrevious>
                        <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full bg-black text-white border-none hover:bg-neutral-800 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center">
                            <ArrowRight className="w-6 h-6" strokeWidth={3} />
                        </CarouselNext>
                    </div>
                </Carousel>
            </div>
        </section>
    )
}
