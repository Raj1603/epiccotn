"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, CheckCircle2, User } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const REVIEWS = [
    {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        date: "2 days ago",
        title: "Life changing comfort",
        content: "I've tried many different brands, but nothing compares to the Everyday Panty. The bamboo fabric is so soft and I love the peace of mind the silver ion tech provides. Definitely worth the investment!",
        verified: true,
        helpful: 24
    },
    {
        id: 2,
        author: "Elena G.",
        rating: 5,
        date: "1 week ago",
        title: "Perfection in design",
        content: "The laser-cut edges are truly seamless. I can wear these under my tightest leggings with zero VPL. The probiotic finish really does make a difference in how my skin feels after a long day.",
        verified: true,
        helpful: 12
    },
    {
        id: 3,
        author: "Jasmine T.",
        rating: 4,
        date: "2 weeks ago",
        title: "Excellent quality",
        content: "Very high quality material. The fit is true to size. I only wish there were more neutral color options, but the Lavender is beautiful.",
        verified: true,
        helpful: 8
    }
]

export function WellnessReviews() {
    return (
        <section id="reviews" className="py-24 bg-[var(--background)] wellness-theme">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Summary Column */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif mb-4 text-gray-900">Customer Reviews</h2>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="text-5xl font-bold text-gray-900">4.9</div>
                                <div>
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
                                    </div>
                                    <p className="text-sm text-gray-500">Based on 320 reviews</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: "5 Star", value: 92 },
                                { label: "4 Star", value: 6 },
                                { label: "3 Star", value: 2 },
                                { label: "2 Star", value: 0 },
                                { label: "1 Star", value: 0 },
                            ].map((rating) => (
                                <div key={rating.label} className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600 w-12">{rating.label}</span>
                                    <Progress value={rating.value} className="h-2 bg-white" />
                                    <span className="text-sm text-gray-400 w-8">{rating.value}%</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all">
                            Write a Review
                        </button>
                    </div>

                    {/* Detailed Reviews Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {REVIEWS.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <User className="text-gray-400 w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-900">{review.author}</h4>
                                                {review.verified && (
                                                    <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Verified Buyer
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex text-amber-400 gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={i < review.rating ? "fill-current w-3 h-3" : "w-3 h-3 text-gray-200"} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400">{review.date}</span>
                                </div>

                                <h5 className="text-lg font-bold mb-3 text-gray-900">{review.title}</h5>
                                <p className="text-gray-600 leading-relaxed mb-6 italic">"{review.content}"</p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span>Helpful ({review.helpful})</span>
                                    </button>
                                    <button className="text-sm text-gray-400 hover:underline">Report</button>
                                </div>
                            </motion.div>
                        ))}

                        <button className="w-full py-4 text-gray-500 font-medium hover:text-gray-900 transition-colors">
                            View All 320 Reviews
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
