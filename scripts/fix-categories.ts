import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const epiccotnCategories = [
    { name: 'Bamboo Series', slug: 'bamboo-series', description: 'Ultra-soft, antibacterial bamboo fiber essentials.' },
    { name: 'Pima Cotton', slug: 'pima-cotton', description: 'The world\'s finest cotton for elevated comfort.' },
    { name: 'Seamless Silk', slug: 'seamless-silk', description: 'Zero-line luxury for under-dress styling.' },
    { name: 'Bikini Cut', slug: 'bikini-cut', description: 'Classic silhouettes with a modern material twist.' },
    { name: 'Thong Hub', slug: 'thong-hub', description: 'Discrete comfort engineered for all-day wear.' },
    { name: 'Luxe Collection', slug: 'luxe-collection', description: 'High-end finishes for special moments.' },
    { name: 'Everyday Essentials', slug: 'everyday-essentials', description: 'Built for daily reliability and freshness.' }
]

async function cleanAndPopulate() {
    console.log('--- CLEANING LOGISTICS HUB ---')
    
    // 1. Check for current categories
    const { data: current } = await supabase.from('categories').select('id, name')
    console.log(`Found ${current?.length || 0} placeholder categories (e.g., Apple Watch).`)

    // 2. Delete ALL existing categories (Careful, this wipes them!)
    console.log('Removing placeholders...')
    const { error: delError } = await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000') // Deletes all

    if (delError) {
        console.error('Failed to wipe placeholders:', delError)
        return
    }

    // 3. Insert Epiccotn Identity Categories
    console.log('Inserting Epiccotn Collection Pillars...')
    const { data, error } = await supabase.from('categories').insert(epiccotnCategories)

    if (error) {
        console.error('Failed to insert Epiccotn data:', error)
    } else {
        console.log('SUCCESS: The Logistics Hub is now strictly EPICCOTN.')
    }
}

cleanAndPopulate()
