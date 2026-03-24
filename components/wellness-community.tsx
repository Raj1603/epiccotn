"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star, MessageCircle, Heart, Instagram } from "lucide-react"

const TESTIMONIALS = [
    {
        name: "Sarah M.",
        role: "Fitness Enthusiast",
        text: "I used to struggle with chafing during long runs. Epiccotn changed everything. The seamless design is literally a lifesaver.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        name: "Elena G.",
        role: "Yoga Instructor",
        text: "The fabric feels like a second skin. Knowing it's designed for hygiene gives me so much peace of mind during practice.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        name: "Jasmine T.",
        role: "Healthcare Professional",
        text: "On 12-hour shifts, comfort isn't optional. These are the only panties I've found that actually prevent moisture buildup all day.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=200&h=200"
    }
]

const GALLERY = [
    "/images/wellnessfit/hero.png",
    "/images/wellnessfit/technology.png",
    "/images/wellnessfit/fabric.png",
    "/images/wellnessfit/hero.png", // Reuse hero for now
]

export function WellnessCommunity() {
    return (
        <section className="py-24 bg-white wellness-theme overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-syne font-bold uppercase tracking-tight mb-4">Crafted for Your Life</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Every pair of Epiccotn is a testament to quality, comfort, and sustainable wellness.</p>
                    </motion.div>
                </div>

                {/* Aesthetic Gallery Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {GALLERY.map((img, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100"
                        >
                            <Image
                                src={img}
                                alt="Lifestyle Overview"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110"
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="font-syne font-bold text-[11px] tracking-[0.2em] uppercase text-text-dim flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Join the Epiccotn movement
                    </p>
                </div>
            </div>
        </section>
    )
}
