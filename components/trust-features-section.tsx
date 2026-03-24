"use client"

import { ShieldCheck, Truck, MessageSquare } from "lucide-react"
import Link from "next/link"

const FEATURES = [
    {
        icon: <ShieldCheck className="w-8 h-8 stroke-[1]" />,
        title: "Quality Guarantee",
        description: "High-quality materials. Soft, supportive, and crafted with care.",
        linkText: "Check our New Products",
        href: "/products"
    },
    {
        icon: <Truck className="w-8 h-8 stroke-[1]" />,
        title: "Worldwide Shipping",
        description: "Spend $100 more and Get Free Shipping",
        linkText: "Check our Best Sellers",
        href: "/#best-sellers"
    },
    {
        icon: <MessageSquare className="w-8 h-8 stroke-[1]" />,
        title: "Customer Care",
        description: "Not Happy? We'll make it right.",
        linkText: "Send a Message Here",
        href: "/contact"
    }
]

export function TrustFeaturesSection() {
    return (
        <section className="py-20 px-6 lg:px-14 bg-white border-t border-border">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                {FEATURES.map((feature, i) => (
                    <div key={i} className="flex flex-col items-center text-center space-y-4">
                        <div className="text-black mb-2">
                            {feature.icon}
                        </div>
                        <h3 className="font-syne text-[11px] font-bold uppercase tracking-[0.14em] text-black">
                            {feature.title}
                        </h3>
                        <p className="font-inter text-[13px] font-light text-black/60 leading-relaxed max-w-[240px]">
                            {feature.description}
                        </p>
                        <Link 
                            href={feature.href} 
                            className="font-inter text-[12px] font-medium text-black underline underline-offset-4 decoration-black/20 hover:decoration-black transition-colors"
                        >
                            {feature.linkText}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}
