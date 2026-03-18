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
                        <h2 className="text-4xl md:text-5xl font-serif mb-4">Trusted by the Epiccotn Community</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto italic">Real stories of comfort, confidence, and wellness.</p>
                        <div className="mt-6 flex items-center justify-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
                            <span className="ml-2 text-gray-900 font-bold">4.9/5 Average Rating</span>
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--background)] p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center shadow-sm"
                        >
                            <div className="relative w-20 h-20 mb-6">
                                <Image
                                    src={t.image}
                                    alt={t.name}
                                    fill
                                    className="object-cover rounded-full border-4 border-white shadow-md"
                                />
                            </div>
                            <p className="text-gray-600 mb-6 leading-relaxed italic">"{t.text}"</p>
                            <div>
                                <h4 className="font-bold text-gray-900">{t.name}</h4>
                                <p className="text-xs text-[var(--primary)] uppercase tracking-widest font-medium">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Aesthetic Gallery Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {GALLERY.map((img, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-square overflow-hidden rounded-3xl"
                        >
                            <Image
                                src={img}
                                alt="Community Lifestyle"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Instagram className="w-8 h-8" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Join 50,000+ women in the Epiccotn journey
                    </p>
                </div>
            </div>
        </section>
    )
}
