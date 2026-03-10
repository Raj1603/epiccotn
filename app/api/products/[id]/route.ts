import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { resolveProductImage } from "@/lib/image-fallbacks"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("products")
            .select("*, categories(*)")
            .eq("id", id)
            .single()

        if (error) throw error

        // Map to UI Product format
        const mappedData = {
            id: data.id,
            name: data.name,
            slug: data.slug,
            subtitle: data.description || '',
            description: data.description || '',
            price: data.price / 100,
            originalPrice: data.compare_at_price ? data.compare_at_price / 100 : undefined,
            image: data.images?.[0] || '',
            hoverImage: data.images?.[1] || '',
            gallery: data.images && data.images.length > 2 ? data.images.slice(2) : ["", "", "", "", ""],
            category: data.categories?.name || 'Uncategorized',
            categoryName: data.categories?.name || 'Uncategorized',
            categoryId: data.category_id,
            badge: data.badge || '',
            color_variants: data.color_variants || []
        }

        return NextResponse.json(mappedData)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = await createClient()
        const body = await request.json()

        const { data, error } = await supabase
            .from("products")
            .update(body)
            .eq("id", id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = await createClient()

        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
