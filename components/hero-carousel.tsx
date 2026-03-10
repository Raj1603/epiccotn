"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const HERO_SLIDES = [
    {
        title: "Shop We made...",
        subtitle: "New Arrivals",
        image: "https://cdn.shopify.com/s/files/1/0384/6721/files/856504014742_A_LOGO_162057a5-e74b-4a6e-95ab-7994957346d4.jpg?v=1750191396",
        cta: { text: "Shop Now", href: "/collections/best-sellers" }
    },
    {
        title: "Titanium Bands",
        subtitle: "Engineered for Apple Watch",
        image: "https://cdn.shopify.com/s/files/1/0384/6721/files/sport-band-45mm-black-back.jpg?v=1762975245",
        cta: { text: "View Collection", href: "/collections/apple-watch-main" }
    },
    {
        title: "Base One Max",
        subtitle: "Official MagSafe Charging",
        image: "https://cdn.shopify.com/s/files/1/0384/6721/files/856504014049_B_iPhone.jpg?v=1758036362",
        cta: { text: "Learn More", href: "/collections/charging-main" }
    }
]

interface Slide {
    title?: string
    subtitle?: string
    image?: string
    cta?: { text: string; href: string }
}

export function HeroCarousel({ slides }: { slides?: Slide[] }) {
    return (
        <Carousel
            opts={{
                loop: true,
                align: "start",
            }}
            plugins={[
                Autoplay({
                    delay: 5000,
                    stopOnInteraction: false,
                }),
            ]}
            className="w-full relative"
            suppressHydrationWarning
        >
            <CarouselContent suppressHydrationWarning>
                {(slides && slides.length ? slides : HERO_SLIDES).map((slide, index) => (
                    <CarouselItem key={index} className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full" suppressHydrationWarning>
                        <div className="absolute inset-0 bg-gray-50/50 overflow-hidden" suppressHydrationWarning>
                            {/* Blurred background version of the image for full-screen feel */}
                            <Image
                                src={slide.image || HERO_SLIDES[index]?.image || ""}
                                alt=""
                                fill
                                className="object-cover blur-2xl opacity-20 scale-110"
                                priority={index === 0}
                            />
                            {/* Sharp, contained image to ensure product is fully visible */}
                            <Image
                                src={slide.image || HERO_SLIDES[index]?.image || ""}
                                alt={slide.title || ""}
                                fill
                                className="object-contain p-8 sm:p-12 md:p-16 transition-opacity duration-700"
                                priority={index === 0}
                            />
                        </div>

                        <div className="absolute inset-0 flex items-end sm:items-center justify-center sm:justify-start p-6 sm:p-12 md:p-20 lg:p-32" suppressHydrationWarning>
                            <div className="bg-white/60 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] max-w-sm border border-white/40 shadow-2xl animate-in fade-in slide-in-from-left-8 duration-1000" suppressHydrationWarning>
                                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500">
                                    {slide.subtitle || 'New Arrival'}
                                </span>
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-gray-900 leading-tight">
                                    {slide.title}
                                </h1>
                                {slide.cta && (
                                    <Button
                                        asChild
                                        size="default"
                                        className="rounded-full px-8 bg-gray-900 text-white hover:bg-black transition-all hover:scale-105 shadow-lg"
                                    >
                                        <Link href={slide.cta.href}>{slide.cta.text}</Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/90 border-transparent text-gray-900 hover:bg-white shadow-xl h-10 w-10 sm:h-12 sm:w-12" />
            <CarouselNext className="right-4 bg-white/90 border-transparent text-gray-900 hover:bg-white shadow-xl h-10 w-10 sm:h-12 sm:w-12" />
        </Carousel>
    )
}
