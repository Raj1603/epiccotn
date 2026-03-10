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
import Link from "next/link"
import Image from "next/image"
import { Category } from "@/lib/types"

interface CategorySliderProps {
    categories: Category[]
}

export function CategorySlider({ categories }: CategorySliderProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    if (!categories || categories.length === 0) return null

    return (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12" suppressHydrationWarning>
            <div className="flex justify-between items-center mb-8" suppressHydrationWarning>
                <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
                <div className="flex gap-2" suppressHydrationWarning>
                    {/* The Carousel arrows will be handled by the library, but we can style them */}
                </div>
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
                suppressHydrationWarning
            >
                <CarouselContent className="-ml-4" suppressHydrationWarning>
                    {categories.map((cat) => (
                        <CarouselItem key={cat.slug} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-[12.5%]" suppressHydrationWarning>
                            <Link
                                href={cat.href || `/collections/${cat.slug}`}
                                className="group block"
                                suppressHydrationWarning
                            >
                                <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow" suppressHydrationWarning>
                                    <Image
                                        src={cat.image || "/images/osyndo_logo.svg"}
                                        alt={cat.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" suppressHydrationWarning />
                                </div>
                                <h3 className="text-sm font-bold text-center text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                                    {cat.name}
                                </h3>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden group-hover:flex -left-4 bg-white/90 border-transparent text-gray-900 hover:bg-white shadow-lg h-10 w-10" />
                <CarouselNext className="hidden group-hover:flex -right-4 bg-white/90 border-transparent text-gray-900 hover:bg-white shadow-lg h-10 w-10" />
            </Carousel>
        </section>
    )
}
