import { createClient } from '@/lib/supabase/server'
import { Product, Category, NavigationCategory, Notification } from '@/lib/types'
import { resolveProductImage, resolveCategoryImage } from '@/lib/image-fallbacks'

// Mapper to convert DB product to UI Product
function mapProduct(item: any): Product {
    return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        subtitle: item.subtitle || item.description || '',
        price: item.price / 100,
        originalPrice: item.compare_at_price ? item.compare_at_price / 100 : undefined,
        image: resolveProductImage(item.slug, (item.images && item.images.length > 0 && item.images[0]) || undefined),
        hoverImage: (item.images && item.images.length > 1 && item.images[1]) || (item.images && item.images.length > 0 && item.images[0]) || undefined,
        category: item.categories?.name || 'Uncategorized',
        categorySlug: item.categories?.slug || 'uncategorized',
        brand: 'Epiccotn',
    }
}

export async function getNavigationCategories(): Promise<NavigationCategory[]> {
    const supabase = await createClient()
    const { data: allCategories, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })

    if (error || !allCategories) {
        console.error('Error fetching navigation:', error)
        return []
    }

    // Build Tree: Root -> Columns -> Items
    // NO LONGER FILTERING BY LEGACY SLUGS. Show all categories that are configured for the brand.
    const roots = allCategories.filter((c: any) => !c.parent_id)

    return roots.map((root: any) => {
        const columns = allCategories.filter((c: any) => c.parent_id === root.id)
        return {
            name: root.name,
            slug: root.slug,
            columns: columns.map((col: any) => {
                const items = allCategories.filter((c: any) => c.parent_id === col.id)
                return {
                    title: col.name,
                    slug: col.slug,
                    image: resolveCategoryImage(root.slug, col.image),
                    items: items.map((item: any) => ({
                        name: item.name,
                        href: `/collections/${item.slug}`,
                        badge: item.badge
                    }))
                }
            })
        }
    })
}

export async function getNotifications(): Promise<Notification[]> {
    const supabase = await createClient()

    // Fetch all products to serve as hero announcements
    const { data: latestProducts, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

    if (error || !latestProducts) return []

    // Removed legacy blocklist. Trusting the Epiccotn-only database.
    return latestProducts.map((p: any) => ({
        id: p.id,
        title: "New Style Released",
        description: `${p.name} is now available in the shop!`,
        image: resolveProductImage(p.slug, (p.images && p.images[0]) || undefined),
        time: 'Just now',
        link: `/products/${p.slug}`,
        badge: p.badge || 'EPICCOTN DNA'
    }))
}

// Fetch only top-level categories for the homepage slider
export async function getRootCategories(): Promise<Category[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .is('parent_id', null)
        .order('sort_order', { ascending: true })

    if (error || !data) return []

    return data.map(item => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        image: item.image,
        href: `/collections/${item.slug}`,
    }))
}

export async function getProducts(): Promise<Product[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug)')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching products:', error)
        return []
    }

    // Removed legacy tech blocklist. Full Epiccotn catalog visibility.
    return data.map(mapProduct)
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !data) return undefined

    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        image: data.image,
        href: `/collections/${data.slug}`,
    }
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
    const supabase = await createClient()

    // 1. First get the target category info
    const { data: category } = await supabase
        .from('categories')
        .select('id, name')
        .eq('slug', slug)
        .single()

    if (!category) return []

    // 2. Find ALL categories that share this name (to handle duplicates/split data)
    const { data: relatedCategories } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category.name)

    const categoryIds = relatedCategories?.map(c => c.id) || [category.id]

    // 3. Fetch products linked to ANY of those category IDs
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(slug)')
        .in('category_id', categoryIds)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching products by category:', error)
        return []
    }

    return data.map(mapProduct)
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const supabase = await createClient()

    // Check if input is a valid UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    let query = supabase
        .from('products')
        .select('*, categories(slug)')

    if (isUuid) {
        query = query.eq('id', id)
    } else {
        query = query.eq('slug', id)
    }

    const { data, error } = await query.single()

    if (error || !data) return undefined

    return mapProduct(data)
}

export async function getUserProfile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch integration profile if exists
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return {
        id: user.id,
        email: user.email!,
        full_name: profile?.full_name || '',
        ...profile
    }
}

export async function getOrders() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (*)
            )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching orders:", error)
        return []
    }

    // Map to nice format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((order: any) => ({
        id: order.id,
        created_at: order.created_at,
        status: order.status,
        total_amount: order.total_amount,
        shipping_address: order.shipping_address,
        items: order.order_items.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price_at_purchase,
            product: mapProduct(item.products)
        }))
    }))
}

export async function searchProducts(query: string): Promise<Product[]> {
    if (!query) return []
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(slug)')
        .ilike('name', `%${query}%`)
        .limit(10)

    if (error) {
        console.error("Error searching products:", error)
        return []
    }

    return data.map(mapProduct)
}

export async function getAdminStats() {
    const supabase = await createClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // Check role
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()

    // Parallel fetch
    const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('total_amount'),
        supabase.from('products').select('id', { count: 'exact' })
    ])

    const totalRevenue = ordersRes.data?.reduce((acc: any, order: any) => acc + order.total_amount, 0) || 0
    const totalOrders = ordersRes.data?.length || 0
    const totalProducts = productsRes.count || 0

    return {
        totalRevenue,
        totalOrders,
        totalProducts
    }
}

export async function getAllOrders() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            profiles:user_id (email, full_name),
            order_items (
                quantity,
                price_at_purchase
            )
        `)
        .order('created_at', { ascending: false })

    if (error) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((order: any) => ({
        id: order.id,
        created_at: order.created_at,
        status: order.status,
        customer: order.profiles?.email || 'Guest',
        total: order.total_amount,
        itemsCount: order.order_items.length
    }))
}
