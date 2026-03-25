import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const supabase = await createClient()

        console.log('--- PURGING LEGACY DATA ---')

        // 1. Clear existing products and categories
        await supabase.from('products').delete().neq('slug', 'keep-me')
        await supabase.from('categories').delete().neq('slug', 'epic-purger')

        // 2. Insert Epiccotn Category Pillars
        const { data: categories, error: catError } = await supabase.from('categories').insert([
            { name: 'The Bamboo Series', slug: 'bamboo-series', description: 'Engineered for softness and antimicrobial wear.' },
            { name: 'Signature Seamless', slug: 'seamless', description: 'Invisible lines under dress styling.' },
            { name: 'Everyday Essentials', slug: 'everyday', description: 'Built for reliability.' }
        ]).select()

        if (catError) throw catError

        const bambooCat = categories.find(c => c.slug === 'bamboo-series')
        const seamlessCat = categories.find(c => c.slug === 'seamless')

        // 3. Insert Flagship Products
        const newProducts = [
            {
                name: 'Essential Bamboo Brief',
                slug: 'essential-bamboo-brief',
                subtitle: 'Ultra-thin, seam-free bamboo silk with ProTech™ 4-layer core.',
                description: 'Designed for zero-show performance under athletic wear while providing peak antimicrobial protection. 95% Organic Bamboo Silk.',
                price: 1290, // In cents
                compare_at_price: 1850,
                category_id: seamlessCat?.id,
                badge: 'ELITE SERIES',
                color_variants: [
                    { name: 'Obsidian', hex: '#121212', bg: 'from-[#1A1A1A] to-[#121212]' },
                    { name: 'Rose Dust', hex: '#E2B4B4', bg: 'from-[#F5E6E6] to-[#E2B4B4]' }
                ],
                variants: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
                images: ['/images/products/essential-black.png']
            },
            {
                name: 'High-Rise Bamboo Brief',
                slug: 'high-rise-bamboo-brief',
                subtitle: 'Advanced 4-Layer absorption system inside our signature silhouette.',
                description: '8+ hours of leak-proof security for overnight comfort. Crafted from heavyweight bamboo cotton with ProTech™ Max-Capacity technology.',
                price: 1690,
                compare_at_price: 2400,
                category_id: bambooCat?.id,
                badge: 'OVERNIGHT MAX',
                color_variants: [
                    { name: 'Sage Moss', hex: '#5D6B5E', bg: 'from-[#6D7B6E] to-[#5D6B5E]' },
                    { name: 'Alpine White', hex: '#F9F9FB', bg: 'from-[#FFFFFF] to-[#F9F9FB]' }
                ],
                variants: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
                images: ['/images/products/high-rise-sage.png']
            }
        ]

        const { error: prodError } = await supabase.from('products').insert(newProducts)
        if (prodError) throw prodError

        return NextResponse.json({ success: true, message: "Epiccotn DNA active. Categories and Flagship styles populated." })
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message })
    }
}
