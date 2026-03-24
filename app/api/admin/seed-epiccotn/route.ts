import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const supabase = await createClient()

        console.log('--- PURGING NOMAD GOODSPLACEHOLDERS ---')

        // 1. Delete all existing categories (NOMAD GOODS)
        await supabase.from('categories').delete().neq('slug', 'epic-purger')

        // 2. Insert Epiccotn Collection Pillars
        const newCategories = [
            { name: 'The Bamboo Series', slug: 'bamboo-series', description: 'Engineered for softness and antibacterial wear.' },
            { name: 'Pima Silk Blend', slug: 'pima-silk', description: 'Elite cotton materials for special collections.' },
            { name: 'Signature Seamless', slug: 'seamless', description: 'Invisible lines under dress styling.' },
            { name: 'Luxe Bikini', slug: 'luxe-bikini', description: 'High-cut premium fit.' },
            { name: 'The Cloud Thong', slug: 'cloud-thong', description: 'Under-stated, over-comfortable.' },
            { name: 'Everyday Essentials', slug: 'everyday', description: 'Built for reliability.' }
        ]

        const { error } = await supabase.from('categories').insert(newCategories)

        if (error) throw error

        return NextResponse.json({ success: true, message: "Logistics Hub Purged and Repopulated with Epiccotn DNA." })
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message })
    }
}
