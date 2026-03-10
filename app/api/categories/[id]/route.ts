import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("id", id)
            .single()

        if (error) throw error

        return NextResponse.json(data)
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
            .from("categories")
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

        // Check if there are products using this category
        const { count, error: countError } = await supabase
            .from("products")
            .select("*", { count: 'exact', head: true })
            .eq("category_id", id)

        if (countError) throw countError

        if (count && count > 0) {
            return NextResponse.json({
                error: "Cannot delete category that has active products. Please reassign the products first."
            }, { status: 400 })
        }

        const { error } = await supabase
            .from("categories")
            .delete()
            .eq("id", id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
