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

        // Map to UI Product format with Admin Compatibility
        const mappedData = {
            ...data, // Include all raw database fields (category_id, price, compare_at_price, images)
            id: data.id,
            name: data.name,
            slug: data.slug,
            subtitle: data.description?.split('\n')[0] || '', // Guess subtitle from first line
            description: data.description || '',
            price: data.price, // Return RAW for Admin to handle division
            originalPrice: data.compare_at_price,
            images: data.images || [],
            category: data.categories?.name || 'Uncategorized',
            categoryName: data.categories?.name || 'Uncategorized',
            categoryId: data.category_id,
            category_id: data.category_id, // Duplicate for UI compatibility
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
