"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, User, Share2, Bookmark } from "lucide-react"

const BLOG_DATA: Record<string, any> = {
  "sustainable-benefits-of-hemp": {
    title: "The Sustainable Benefits of Hemp Clothing",
    subtitle: "Regenerating the earth one fiber at a time.",
    content: "Heaps of evidence suggest hemp is one of the most sustainable crops in the world. It requires 50% less water than traditional cotton and absolutely zero pesticides. At Epiccotn, we believe in using these regenerative fibers to not only protect your skin but also restore the planet.\n\nHemp is a bioremediator, meaning it cleans the soil by absorbing toxins and heavy metals as it grows. This makes it a perfect companion for our organic cotton blends, ensuring every piece you wear is as good for the earth as it is for you.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1200",
    date: "March 24, 2026",
    author: "Wellness Team",
    readTime: "5 min read"
  },
  "benefits-of-wearing-linen": {
    title: "The Benefits of Wearing Linen Clothing",
    subtitle: "Breathability redefined for modern living.",
    content: "Linen is naturally hypoallergenic and highly breathable. Its unique porous structure allows for superior moisture-wicking and heat regulation, making it the perfect year-round companion for daily comfort.\n\nDerived from the flax plant, linen is one of the strongest natural fibers known to man. It becomes softer and more lustrous with every wash, promising a lifetime of comfort that only gets better with age.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200",
    date: "March 20, 2026",
    author: "Wellness Team",
    readTime: "4 min read"
  },
  "bamboo-vs-cotton-wellness": {
    title: "Bamboo vs. Cotton: The Ultimate Wellness Blend",
    subtitle: "Why we believe in the hybrid approach.",
    content: "Our signature blend takes the high tensile strength of premium cotton and merges it with the silky smoothness of bamboo. This creates a fabric that is resilient, incredibly soft, and naturally antimicrobial.\n\nWhile cotton provides structure and familiarity, bamboo adds a technical edge that conventional textiles lack—natural odor resistance and superior thermal regulation. It's the ultimate fabric for intimate wellness.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200",
    date: "March 15, 2026",
    author: "Wellness Team",
    readTime: "6 min read"
  }
}

import { use } from "react"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = BLOG_DATA[slug]

  if (!post) return <div className="min-h-screen flex items-center justify-center text-white bg-black">Post not found</div>

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime selection:text-black flex flex-col pt-[60px]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] lg:h-[70vh] w-full flex items-center justify-center overflow-hidden border-b border-border">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="relative z-10 max-w-[1000px] w-full px-6 text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-syne font-bold text-white/50 uppercase tracking-[0.2em] hover:text-lime transition-colors group mb-4">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Wisdom
                </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                <span className="font-syne text-[11px] font-bold text-lime tracking-[0.16em] uppercase mb-4 block">
                    Wellness Edition · {post.date}
                </span>
                <h1 className="font-syne text-[clamp(40px,6vw,92px)] font-bold leading-[0.9] tracking-[-0.04em] uppercase text-white shadow-sm">
                    {post.title}
                </h1>
                <p className="font-inter text-[18px] lg:text-[22px] font-light text-white/60 mt-6 max-w-[700px] mx-auto italic tracking-tight">
                    "{post.subtitle}"
                </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-6 lg:px-16 bg-black relative">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-12">
            
            {/* Sidebar Left: Meta */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="hidden lg:flex flex-col gap-8 sticky top-32 h-fit">
                <div className="space-y-1">
                    <p className="font-syne text-[10px] font-bold text-white/20 uppercase tracking-widest">Written by</p>
                    <p className="font-syne text-[13px] font-bold text-white">{post.author}</p>
                </div>
                <div className="space-y-1">
                    <p className="font-syne text-[10px] font-bold text-white/20 uppercase tracking-widest">Read Time</p>
                    <p className="font-syne text-[13px] font-bold text-white">{post.readTime}</p>
                </div>
                <div className="pt-8 flex flex-col gap-4">
                    <button className="w-10 h-10 border border-border flex items-center justify-center hover:border-lime transition-colors group">
                        <Share2 className="w-4 h-4 text-text-dim group-hover:text-white" />
                    </button>
                    <button className="w-10 h-10 border border-border flex items-center justify-center hover:border-lime transition-colors group">
                        <Bookmark className="w-4 h-4 text-text-dim group-hover:text-white" />
                    </button>
                </div>
            </motion.div>

            {/* Main Content */}
            <article className="max-w-[800px] mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="font-inter text-[18px] lg:text-[21px] leading-[1.8] text-white/70 font-light space-y-10 whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </div>

                    <div className="mt-20 p-12 lg:p-16 border-l-[4px] border-lime bg-white/[0.03] backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 font-syne text-[64px] text-white/[0.03] font-extrabold select-none">"</div>
                        <p className="font-syne text-[20px] lg:text-[24px] font-bold text-white leading-tight tracking-tight relative z-10">
                            "Sustainable fashion isn't just a choice; it's a responsibility we owe to our bodies and our future."
                        </p>
                    </div>
                </motion.div>
            </article>

            {/* Sidebar Right: Empty or Navigation */}
            <div className="hidden lg:block" />
          </div>
        </section>

        {/* ═══ PRE-FOOTER CTA ═══ */}
        <section className="py-24 px-6 border-t border-border bg-black text-center overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syne text-[12vw] font-extrabold text-white/[0.02] uppercase pointer-events-none whitespace-nowrap">
                {post.title.split(' ')[0]}
            </div>
            <div className="relative z-10 max-w-[600px] mx-auto space-y-8">
                <h3 className="font-syne text-[28px] lg:text-[36px] font-bold uppercase tracking-tight">Enjoyed this story?</h3>
                <p className="font-inter text-[15px] text-text-dim font-light leading-relaxed">
                    Subscribe to our wellness journey for more insights into sustainable textiles and intimate care.
                </p>
                <Link href="/" className="inline-block bg-lime text-black font-syne font-bold text-[12px] tracking-[0.1em] uppercase px-14 py-4 hover:bg-lime-dk transition-all hover:-translate-y-1">
                    Join the Journey
                </Link>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
