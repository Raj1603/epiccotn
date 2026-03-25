import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { resolveProductImage } from '@/lib/image-fallbacks'

export async function GET(request: NextRequest) {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const categorySlug = searchParams.get('category')
    const slug = searchParams.get('slug')

    let query = supabase.from('products').select('*, categories(*)')

    if (categorySlug) {
        // We need to join with categories to filter by category slug
        // Supabase allows filtering on referenced tables
        // query = query.eq('categories.slug', categorySlug) 
        // Note: Filtering on foreign tables in Supabase JS SDK can be tricky with !inner.
        // A simpler approach if the relationship is category_id -> categories.id:

        // 1. First find the category info for this slug
        const { data: category } = await supabase
            .from('categories')
            .select('id, name')
            .eq('slug', categorySlug)
            .single()

        if (category) {
            // 2. Find ALL categories with this name to handle duplicates/split data
            const { data: relatedCats } = await supabase
                .from('categories')
                .select('id')
                .eq('name', category.name)

            const catIds = relatedCats?.map(c => c.id) || [category.id]
            query = query.in('category_id', catIds)
        } else {
            return NextResponse.json([])
        }
    }

    if (slug) {
        query = query.eq('slug', slug)
    }

    const { data: products, error } = await query

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Map to UI Product format
    const mappedProducts = (products || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        subtitle: item.description || '',
        description: item.description || '',
        price: item.price / 100,
        originalPrice: item.compare_at_price ? item.compare_at_price / 100 : undefined,
        image: resolveProductImage(item.slug, item.images?.[0]),
        images: item.images || [],
        category: item.categories?.name || 'Uncategorized',
        categorySlug: item.categories?.slug || 'uncategorized',
        badge: item.badge,
        colorVariants: item.color_variants || [],
        variants: item.variants || []
    }))

    return NextResponse.json(mappedProducts)
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const body = await request.json()

        console.log("POST /api/products - Incoming data:", JSON.stringify(body, null, 2))

        // Check for duplicate slug manually to provide better error
        if (body.slug) {
            const { data: existing } = await supabase
                .from('products')
                .select('id')
                .eq('slug', body.slug)
                .single()

            if (existing) {
                console.warn(`Product with slug ${body.slug} already exists`)
                return NextResponse.json({
                    error: `A product with the slug "${body.slug}" already exists. Please use a different name or slug.`,
                    code: "DUPLICATE_SLUG"
                }, { status: 400 })
            }
        }

        // Define only the columns that definitely exist in the schema to avoid 500 errors
        const safeBody: any = {
            name: body.name,
            slug: body.slug,
            description: body.description,
            price: body.price,
            compare_at_price: body.compare_at_price,
            category_id: body.category_id,
            images: body.images || [],
            badge: body.badge,
            stock_status: body.stock_status || 'in_stock'
        }

        const { data, error } = await supabase
            .from('products')
            .insert([safeBody])
            .select()
            .single()

        if (error) {
            console.error("Supabase error during insert:", error)
            return NextResponse.json({
                error: error.message || "Database insert failed",
                code: error.code || "DB_ERROR"
            }, { status: 500 })
        }

        // Automatically create a notification for the new product
        try {
            const { error: notifError } = await supabase
                .from('notifications')
                .insert([
                    {
                        title: "New Product Available",
                        description: `${data.name} has just been added to the shop!`,
                        image: data.images?.[0] || null,
                        link: `/products/${data.slug}`,
                        active: true
                    }
                ])

            if (notifError) {
                console.error("Failed to create notification for new product:", notifError)
            } else {
                console.log("Announcement notification created successfully")
            }
        } catch (nErr) {
            console.error("Unexpected error creating notification:", nErr)
        }

        console.log("Product created successfully:", data.id)
        return NextResponse.json(data)
    } catch (err: any) {
        console.error("Product API Panic (POST):", err)
        return NextResponse.json({
            error: err.message || "An unexpected error occurred on the server",
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            message: String(err)
        }, { status: 500 })
    }
}
