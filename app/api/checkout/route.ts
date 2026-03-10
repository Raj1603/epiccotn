import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Dummy initialization if key is missing
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' as any })
    : null

export async function POST(req: Request) {
    if (!stripe) {
        return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const { items } = await req.json()
    // const origin = req.headers.get('origin')

    const lineItems = items.map((item: any) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image], // Stripe expects full URL
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents for Stripe (USD)
        },
        quantity: item.quantity,
    }))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/`,
        })

        return NextResponse.json({ url: session.url })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
