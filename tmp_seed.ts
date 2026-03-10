import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://vqawluvnnmlgzywghsie.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_m_BHZU2LsKWmq1yHHuzi2Q_AbG55arZ"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const generateImages = (baseUrl: string, count: number) => {
    return Array.from({ length: count }, (_, i) =>
        `${baseUrl}?sig=${i}`
    )
}

const SEED_DATA = {
    categories: [
        { name: "Daily Wellness", slug: "daily-wellness", sort_order: 10, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800" },
        { name: "Sleep & Recovery", slug: "sleep-recovery", sort_order: 20, image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=800" },
        { name: "Active Care", slug: "active-care", sort_order: 30, image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800" },
        { name: "The Science", slug: "the-science", sort_order: 40, image: "https://images.unsplash.com/photo-1532187875605-2fe358a71424?q=80&w=800" }
    ],
    products: [
        // Daily Wellness
        { category_slug: "daily-wellness", name: "Everyday Panty - Silver Edition", price: 4500, images: generateImages("https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800", 7) },
        { category_slug: "daily-wellness", name: "Wellness Seamless Bra", price: 5500, images: generateImages("https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800", 7) },
        { category_slug: "daily-wellness", name: "Comfort Hipster Pack", price: 8500, images: generateImages("https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800", 7) },

        // Sleep & Recovery
        { category_slug: "sleep-recovery", name: "Bamboo Silk Sleep Set", price: 12000, images: generateImages("https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=800", 7) },
        { category_slug: "sleep-recovery", name: "Silver Ion Night Mask", price: 2500, images: generateImages("https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=800", 7) },
        { category_slug: "sleep-recovery", name: "Nurture Lounge Robe", price: 9500, images: generateImages("https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=800", 7) },

        // Active Care
        { category_slug: "active-care", name: "Movement Thong - Probiotic", price: 3800, images: generateImages("https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800", 7) },
        { category_slug: "active-care", name: "High-Rise Balance Brief", price: 4200, images: generateImages("https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800", 7) },

        // The Science
        { category_slug: "the-science", name: "Microbiome Care Mist", price: 2800, images: generateImages("https://images.unsplash.com/photo-1532187875605-2fe358a71424?q=80&w=800", 7) }
    ]
}

async function runSeed() {
    console.log("Starting seed...")
    try {
        // 1. Seed Categories
        const { data: createdCats, error: catError } = await supabase
            .from("categories")
            .upsert(SEED_DATA.categories, { onConflict: 'slug' })
            .select()

        if (catError) throw catError
        console.log(`Upserted ${createdCats.length} categories.`)

        // Map slugs to IDs
        const catMap = new Map(createdCats.map(c => [c.slug, c.id]))

        // 2. Seed Products
        const productsWithIds = SEED_DATA.products.map(p => ({
            name: p.name,
            slug: p.name.toLowerCase().replace(/®/g, "").replace(/ /g, "-").replace(/[^\w-]/g, ""),
            price: p.price,
            images: p.images,
            category_id: catMap.get(p.category_slug),
            description: `Experience professional-grade quality with the ${p.name}. Designed for performance and built to last, it's the perfect addition to your lifestyle.`
        }))

        const { error: prodError } = await supabase
            .from("products")
            .upsert(productsWithIds, { onConflict: 'slug' })

        if (prodError) throw prodError
        console.log(`Upserted ${productsWithIds.length} products.`)

        console.log("Seed completed successfully!")
    } catch (error) {
        console.error("Seeding error:", error)
        process.exit(1)
    }
}

runSeed()
