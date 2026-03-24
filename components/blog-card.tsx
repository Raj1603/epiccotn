"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface BlogCardProps {
    title: string
    excerpt: string
    image: string
    slug: string
    date: string
}

export function BlogCard({ title, excerpt, image, slug, date }: BlogCardProps) {
    return (
        <div className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-offblack mb-6">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            
            <div className="space-y-3">
                <span className="font-syne text-[10px] font-bold text-text-dim tracking-[0.14em] uppercase">
                    {date}
                </span>
                
                <h3 className="font-syne text-[18px] lg:text-[20px] font-extrabold text-white leading-tight tracking-tight uppercase group-hover:text-lime transition-colors duration-300">
                    {title}
                </h3>
                
                <p className="font-inter text-[13px] font-light text-text-dim leading-[1.75] line-clamp-2">
                    {excerpt}
                </p>
                
                <Link 
                    href={`/blog/${slug}`}
                    className="inline-flex items-center gap-2 text-[11px] font-syne font-bold text-white uppercase tracking-wider relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white/20 after:origin-right hover:after:origin-left after:scale-x-100 hover:after:scale-x-0 after:transition-transform"
                >
                    Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    )
}
