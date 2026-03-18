"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, X, Droplets, Shield, Leaf, Wind, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"

interface WellnessProductDetailProps {
    product: {
        id: string
        name: string
        price: number
        description?: string
    }
}

const COLORS = [
    { name: "Lavender", value: "#d4a5d4", class: "bg-[#d4a5d4]" },
    { name: "Sage Green", value: "#c5d8c5", class: "bg-[#c5d8c5]" },
    { name: "Silk White", value: "#ffffff", class: "bg-white border border-gray-200" },
]

const SIZES = ["XS", "S", "M", "L", "XL"]

export function WellnessProductDetail({ product }: WellnessProductDetailProps) {
    const cart = useCart()
    const [selectedColor, setSelectedColor] = useState(COLORS[0])
    const [selectedSize, setSelectedSize] = useState("M")
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = () => {
        setIsAdding(true)
        cart.addItem({
            ...product,
            slug: "everyday-panty",
            subtitle: "Natural Wisdom & Modern Science",
            category: "Wellness",
            categorySlug: "wellness",
            brand: "Epiccotn",
            image: "/images/epiccotn/hero.png",
        }, 1, `${selectedColor.name} / ${selectedSize}`)

        setTimeout(() => {
            setIsAdding(false)
            window.dispatchEvent(new CustomEvent('openCart'))
        }, 800)
    }

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    }

    const staggeredFade = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { staggerChildren: 0.2 }
    }

    const childFade = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 }
    }

    return (
        <div className="wellness-theme min-h-screen">
            {/* Hero & Purchase Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--background)] py-20 lg:py-0">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="z-10"
                    >
                        <span className="text-[var(--primary)] font-medium tracking-widest uppercase text-sm mb-4 block">
                            Innovation in Intimacy
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight mb-6">
                            Rediscover Your <br />
                            <span className="italic text-[var(--primary)]">Comfort</span>
                        </h1>

                        <div className="space-y-8 mb-10">
                            {/* Color Selection */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4 block">Color: {selectedColor.name}</label>
                                <div className="flex gap-4">
                                    {COLORS.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={cn(
                                                "w-10 h-10 rounded-full transition-all duration-300 relative",
                                                color.class,
                                                selectedColor.name === color.name ? "ring-2 ring-[var(--primary)] ring-offset-4 scale-110" : "hover:scale-105"
                                            )}
                                            aria-label={color.name}
                                        >
                                            {selectedColor.name === color.name && (
                                                <Check className={cn("absolute inset-0 m-auto w-4 h-4", color.name === 'Silk White' ? "text-gray-900" : "text-white")} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4 block">Size: {selectedSize}</label>
                                <div className="flex flex-wrap gap-3">
                                    {SIZES.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "w-14 h-12 rounded-xl border flex items-center justify-center text-sm font-medium transition-all duration-300",
                                                selectedSize === size
                                                    ? "bg-gray-900 text-white border-gray-900 shadow-lg"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-900"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                            <Button
                                size="lg"
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className="bg-gray-900 hover:bg-black text-white px-10 h-14 rounded-full flex-1 relative overflow-hidden group shadow-xl transition-all"
                            >
                                <AnimatePresence mode="wait">
                                    {isAdding ? (
                                        <motion.div
                                            key="adding"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <ShoppingCart className="w-5 h-5 animate-bounce" />
                                            Adding...
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="flex items-center justify-between w-full"
                                        >
                                            <span>Add to Cart</span>
                                            <span className="opacity-60 text-sm font-normal ml-4 border-l border-white/20 pl-4">${product.price}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>

                        <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="font-bold text-gray-900">4.9/5</span>
                                <span className="underline cursor-pointer">320+ Reviews</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            <p>Ships next day</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative h-[500px] lg:h-[650px] w-full"
                    >
                        <Image
                            src="/images/epiccotn/hero.png"
                            alt="Epiccotn Everyday Panty Hero"
                            fill
                            className="object-contain rounded-[2.5rem]"
                            priority
                        />
                        <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-[var(--primary)] opacity-10 blur-[100px] rounded-full" />
                        <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-[var(--accent)] opacity-20 blur-[100px] rounded-full" />
                    </motion.div>
                </div>
            </section>

            {/* Founder's Narrative */}
            <section id="story" className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <motion.div {...fadeIn}>
                        <h2 className="text-3xl md:text-4xl font-serif mb-8 text-gray-800">Designed by Women, for Every Body</h2>
                        <div className="w-16 h-1 bg-[var(--accent)] mx-auto mb-10" />
                        <p className="text-lg text-gray-600 mb-6 italic leading-relaxed">
                            "We believe that wellness begins with the first layer you put on your body. Our mission is to create innerwear that nurtures both women and the planet, without compromise."
                        </p>
                        <p className="font-serif text-gray-900">— Founder, Epiccotn</p>
                    </motion.div>
                </div>
            </section>

            {/* Why: Problem/Solution Grid */}
            <section className="py-24 bg-[var(--background)]">
                <div className="container mx-auto px-6 text-center mb-16">
                    <motion.h2 {...fadeIn} className="text-4xl font-serif mb-4">Why Epiccotn?</motion.h2>
                    <motion.p {...fadeIn} className="text-gray-600 max-w-2xl mx-auto">Common pain points addressed with elegant functionality.</motion.p>
                </div>

                <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            problem: "Limited Period Features",
                            solution: "Built-in Pad Holder",
                            icon: <X className="text-red-400 w-5 h-5" />,
                            solveIcon: <Check className="text-green-500 w-5 h-5" />
                        },
                        {
                            problem: "Poor Hygiene & Odor",
                            solution: "Antimicrobial Protection",
                            icon: <X className="text-red-400 w-5 h-5" />,
                            solveIcon: <Check className="text-green-500 w-5 h-5" />
                        },
                        {
                            problem: "Visible Panty Lines (VPL)",
                            solution: "Invisible Seamless Fit",
                            icon: <X className="text-red-400 w-5 h-5" />,
                            solveIcon: <Check className="text-green-500 w-5 h-5" />
                        },
                        {
                            problem: "Lack of Discreet Storage",
                            solution: "Hidden Front Pocket",
                            icon: <X className="text-red-400 w-5 h-5" />,
                            solveIcon: <Check className="text-green-500 w-5 h-5" />
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full"
                        >
                            <div className="mb-6 flex justify-between items-start">
                                <div className="bg-red-50 p-2 rounded-lg">{item.icon}</div>
                                <div className="bg-green-50 p-2 rounded-lg">{item.solveIcon}</div>
                            </div>
                            <div className="flex-grow">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Problem</div>
                                <h3 className="text-lg font-medium text-gray-500 mb-4 line-through decoration-red-200">{item.problem}</h3>
                                <div className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-1">Wellness Solution</div>
                                <p className="text-xl font-serif text-gray-900">{item.solution}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section id="science" className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[500px]"
                        >
                            <Image
                                src="/images/epiccotn/diagram.png"
                                alt="Science of Epiccotn Diagram"
                                fill
                                className="object-contain rounded-[2.5rem]"
                            />
                        </motion.div>

                        <motion.div
                            {...staggeredFade}
                            className="space-y-12"
                        >
                            <motion.div variants={childFade}>
                                <h2 className="text-4xl font-serif mb-6">Scientific Nurturing</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    We've engineered every fiber to support your skin's natural microbiome while providing medical-grade protection.
                                </p>
                            </motion.div>

                            <div className="grid gap-8">
                                <motion.div variants={childFade} className="flex gap-4">
                                    <div className="bg-[var(--primary)]/20 p-4 rounded-xl h-fit">
                                        <Droplets className="text-[var(--primary)] w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif mb-2 text-gray-900">Probiotic Skin Finish</h4>
                                        <p className="text-gray-600">A revolutionary finish containing active probiotics that balance the skin's healthy flora and prevent dryness.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Fabric Section */}
            <section className="py-24 px-6 md:px-12">
                <div className="container mx-auto max-w-7xl bg-[var(--accent)]/30 rounded-[3rem] p-10 md:p-24 overflow-hidden relative">
                    <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-white/60 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="grid md:grid-cols-2 gap-16 items-center relative z-10 flex-row-reverse">
                        <motion.div
                            {...staggeredFade}
                            className="order-2 md:order-1"
                        >
                            <span className="text-green-800 font-bold uppercase tracking-widest text-sm mb-4 block">Signature Material</span>
                            <h2 className="text-4xl md:text-5xl font-sans mb-8 text-gray-900 leading-tight">The Wisdom of Trees.</h2>
                            <p className="text-gray-800 text-xl mb-12 leading-relaxed font-light">
                                Ethically sourced, incredibly soft. Our proprietary blend of <strong className="text-green-900 font-bold bg-white/50 px-2 rounded-md">Organic Bamboo</strong> and Lyocell is 3x more breathable than standard cotton and requires 80% less water to produce.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white border-b-2 shadow-sm flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                                    <div className="bg-green-100 p-3 rounded-full mb-4">
                                        <Leaf className="text-green-700 w-6 h-6" />
                                    </div>
                                    <span className="text-gray-900 font-bold text-sm uppercase tracking-wide">Sustainable<br/>Sourcing</span>
                                </div>
                                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white border-b-2 shadow-sm flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                                    <div className="bg-blue-50 p-3 rounded-full mb-4">
                                        <Wind className="text-blue-500 w-6 h-6" />
                                    </div>
                                    <span className="text-gray-900 font-bold text-sm uppercase tracking-wide">Ultra<br/>Breathable</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] md:h-[500px] order-1 md:order-2 w-full"
                        >
                            <Image
                                src="/images/epiccotn/pocket.png"
                                alt="Epiccotn Bamboo Fabric Detail"
                                fill
                                className="object-cover rounded-[2rem] shadow-xl border-4 border-white"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Absorbency & Care Section (Slide 5-6) */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[500px]"
                        >
                            <Image
                                src="/images/epiccotn/back.png"
                                alt="Absorbency Features"
                                fill
                                className="object-contain rounded-[2.5rem]"
                            />
                        </motion.div>

                        <motion.div {...staggeredFade} className="space-y-8">
                            <motion.div variants={childFade}>
                                <h2 className="text-4xl font-serif mb-6">Advanced Absorbency</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Natural wisdom meets modern science. Our multi-layer protection is designed for your lightest and moderate flow days.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-pink-50 p-2 rounded-full">
                                            <Droplets className="text-pink-500 w-5 h-5" />
                                        </div>
                                        <p className="text-gray-900 font-medium">Absorbs up to 50 ml of fluid</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-50 p-2 rounded-full">
                                            <Wind className="text-blue-500 w-5 h-5" />
                                        </div>
                                        <p className="text-gray-900 font-medium">Total Odor Protection</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
                        <motion.div {...staggeredFade} className="order-2 md:order-1 space-y-8">
                            <motion.div variants={childFade}>
                                <h2 className="text-4xl font-serif mb-6">Smart Design Innovation</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Our patented pad holder technology ensures security and comfort during high-intensity activities.
                                </p>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex gap-3"><Check className="text-[var(--primary)] w-5 h-5" /> Secure Fit Technology</li>
                                    <li className="flex gap-3"><Check className="text-[var(--primary)] w-5 h-5" /> Breathable Layering</li>
                                    <li className="flex gap-3"><Check className="text-[var(--primary)] w-5 h-5" /> Easy-wash Durability</li>
                                </ul>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[500px] order-1 md:order-2"
                        >
                            <Image
                                src="/images/epiccotn/crotch.png"
                                alt="Smart Design Detail"
                                fill
                                className="object-contain rounded-[2.5rem]"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ & Details Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif mb-4 text-gray-900">Details & FAQ</h2>
                        <p className="text-gray-500 italic">Everything you need to know about your new daily companion.</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "How do I care for my Everyday Panty?",
                                a: "Machine wash on cold with like colors. Tumble dry on low or hang dry to preserve the probiotic finish. Avoid bleach and fabric softeners."
                            },
                            {
                                q: "What is the primary material?",
                                a: "Our signature blend consists of 65% Organic Bamboo, 30% Lyocell, and 5% Spandex for the perfect balance of breathability, softness, and stretch."
                            },
                            {
                                q: "Is the probiotic finish safe for sensitive skin?",
                                a: "Yes, it is specifically designed to be hypoallergenic. The probiotics are encapsulated and slowly release as you wear the garment, helping to maintain your skin's natural healthy microbiome."
                            },
                            {
                                q: "Do these work with menstrual pads?",
                                a: "Absolutely. We've integrated hidden, secure holders that prevent pad slippage during high-movement activities while remaining completely invisible from the outside."
                            }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="border-b border-gray-100 pb-6"
                            >
                                <h4 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h4>
                                <p className="text-gray-600 leading-relaxed font-serif italic text-sm">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-gray-100 italic font-serif text-sm text-gray-400">
                        <div className="text-center">Ships from: California</div>
                        <div className="text-center">Eco-Friendly Packaging</div>
                        <div className="text-center">Ethically Manufactured</div>
                        <div className="text-center">Climate Neutral Cert.</div>
                    </div>
                </div>
            </section>
            {/* Competition Comparison Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2 {...fadeIn} className="text-4xl font-serif mb-4 text-gray-900">Epiccotn vs. The Competition</motion.h2>
                        <motion.p {...fadeIn} className="text-gray-500 italic">Leading the way in innovation and comfort.</motion.p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="py-6 px-4 font-serif text-lg text-gray-400">Feature / Brand</th>
                                    <th className="py-6 px-4 font-serif text-lg text-gray-900">Epiccotn</th>
                                    <th className="py-6 px-4 font-serif text-lg text-gray-400">Traditional</th>
                                    <th className="py-6 px-4 font-serif text-lg text-gray-400">Synthetic</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { f: "Seamless/Invisible Fit", e: "Yes (Core)", t: "No (Thick)", s: "Variable" },
                                    { f: "Organic Bamboo/Lyocell", e: "Yes (Core)", t: "No", s: "No" },
                                    { f: "Probiotic Textile Finish", e: "Yes (Refined)", t: "No", s: "No" },
                                    { f: "Built-in Pad Holder", e: "Yes (Integrated)", t: "No", s: "Optional" },
                                    { f: "Hidden Front Pocket", e: "Yes (Functional)", t: "No", s: "No" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 group hover:bg-gray-50 transition-colors">
                                        <td className="py-6 px-4 font-medium text-gray-700">{row.f}</td>
                                        <td className="py-6 px-4 text-[var(--primary)] font-bold flex items-center gap-2">
                                            <Check className="w-4 h-4" /> {row.e}
                                        </td>
                                        <td className="py-6 px-4 text-gray-400">{row.t}</td>
                                        <td className="py-6 px-4 text-gray-400">{row.s}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Core Customer Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeIn}>
                            <h2 className="text-4xl font-serif mb-8 text-gray-900">The Wellness-Conscious Woman</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Our core customer prioritizes holistic well-being, an active lifestyle, and mindful consumption. She demands innerwear that feels good all day, every day.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { t: "Health & Wellness Enthusiast", d: "Prioritizes holistic well-being and active living." },
                                    { t: "Eco-Conscious", d: "Seeks sustainable products and sourcing transparency." },
                                    { t: "Practical & Functional", d: "Appreciates smart design that solves real-world problems." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{item.t}</h4>
                                            <p className="text-sm text-gray-500">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100"
                        >
                            <div className="text-center">
                                <Star className="w-12 h-12 text-amber-400 mx-auto mb-6 fill-amber-400" />
                                <h3 className="text-3xl font-serif mb-4 text-gray-900">98% Satisfaction</h3>
                                <p className="text-gray-500 italic">"I finally found underwear that understands my body's needs throughout the entire month."</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-[var(--primary)] text-white text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <motion.div {...fadeIn}>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8">Ready to transition to true comfort?</h2>
                        <p className="text-xl mb-12 opacity-90">Experience the difference of scientific wellness. Your skin will thank you.</p>
                        <Button
                            size="lg"
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className="bg-white text-[var(--primary)] hover:bg-gray-100 px-12 py-8 text-xl rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95"
                        >
                            {isAdding ? "Adding..." : "Shop the Everyday Panty"}
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
