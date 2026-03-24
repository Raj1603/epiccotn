"use client"

import { BlogCard } from "./blog-card"
import Link from "next/link"

const FEATURED_POSTS = [
  {
    title: "The Sustainable Benefits of Hemp Clothing",
    excerpt: "As a conscious fashion enthusiast, you're likely aware of the environmental toll of the fashion industry. Billions of garments are produced annually using harmful chemicals and dyes, only to end up in landfills.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1200", 
    slug: "sustainable-benefits-of-hemp",
    date: "March 24, 2026"
  },
  {
    title: "The Benefits of Wearing Linen Clothing",
    excerpt: "Made from the fibers of the flax plant, linen is a popular textile that is fashioned into a diverse range of clothing styles available today. Long before the invention of writing, humans were creating fabrics.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200", 
    slug: "benefits-of-wearing-linen",
    date: "March 20, 2026"
  },
  {
    title: "Bamboo vs. Cotton: The Ultimate Wellness Blend",
    excerpt: "Why choose between the softness of cotton and the technical benefits of bamboo? Epiccotn blends the two to create a fabric that is not only antimicrobial and moisture-wicking but also incredibly gentle.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200",
    slug: "bamboo-vs-cotton-wellness",
    date: "March 15, 2026"
  }
]

export function BlogSection() {
    return (
        <section className="py-24 px-6 lg:px-14 bg-background overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="font-syne text-[32px] lg:text-[42px] font-extrabold text-white tracking-[-0.03em] uppercase leading-tight">
                            Wellness Stories
                        </h2>
                        <div className="h-[2px] w-20 bg-lime" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {FEATURED_POSTS.map((post) => (
                        <BlogCard key={post.slug} {...post} />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link href="/blog" className="inline-block bg-lime text-black font-syne font-bold text-[12px] tracking-[0.1em] uppercase px-12 py-4 hover:bg-lime-dk transition-all hover:-translate-y-1 active:translate-y-0">
                        View All
                    </Link>
                </div>
            </div>
        </section>
    )
}
