import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Get authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json(
                { error: "Unauthorized - Please login first" },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { items, total, customerInfo, shippingMethod } = body

        // Create order
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert({
                user_id: user.id,
                total_amount: Math.round(total * 100), // Convert to cents
                status: "pending",
                shipping_address: {
                    firstName: customerInfo.firstName,
                    lastName: customerInfo.lastName,
                    address: customerInfo.address,
                    apartment: customerInfo.apartment,
                    city: customerInfo.city,
                    state: customerInfo.state,
                    zipCode: customerInfo.zipCode,
                    country: customerInfo.country,
                },
                contact_info: {
                    email: customerInfo.email,
                    phone: customerInfo.phone,
                },
                shipping_method: shippingMethod,
            })
            .select()
            .single()

        if (orderError) {
            console.error("Order creation error:", orderError)
            return NextResponse.json(
                { error: "Failed to create order" },
                { status: 500 }
            )
        }

        // Create order items
        const orderItems = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price_at_time: Math.round(item.price * 100), // Convert to cents
        }))

        const { error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItems)

        if (itemsError) {
            console.error("Order items error:", itemsError)
            // Order was created but items failed - should handle this better in production
            return NextResponse.json(
                { error: "Failed to add items to order" },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, orderId: order.id })
    } catch (error: any) {
        console.error("Order API error:", error)
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        )
    }
}
