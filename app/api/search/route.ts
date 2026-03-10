import { NextResponse } from 'next/server'
import { searchProducts } from '@/lib/fetchers'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
        return NextResponse.json([])
    }

    const products = await searchProducts(query)
    return NextResponse.json(products)
}
