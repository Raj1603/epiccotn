import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()
    const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .is('parent_id', null)
        .order('name')

    if (error) {
        console.error("Categories fetch error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Deduplicate by name if there are multiple root categories with same name (e.g. from migrations)
    const seenNames = new Set<string>()
    const uniqueCategories = (categories || []).filter(cat => {
        if (seenNames.has(cat.name)) return false
        seenNames.add(cat.name)
        return true
    })

    console.log("Fetched unique root categories:", uniqueCategories.length)
    return NextResponse.json(uniqueCategories)
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const body = await request.json()

        if (!body.name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 })
        }

        const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

        // Check for duplicate slug
        const { data: existing } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', slug)
            .single()

        if (existing) {
            return NextResponse.json({ error: `Category with slug "${slug}" already exists` }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('categories')
            .insert([{
                name: body.name,
                slug: slug,
                description: body.description || null,
                image: body.image || null,
                sort_order: body.sort_order || 0
            }])
            .select()
            .single()

        if (error) {
            console.error("Supabase insert error:", error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (err: any) {
        console.error("Category API Error (POST):", err)
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
    }
}
