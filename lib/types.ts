export interface ColorVariant {
    name: string
    hex: string
    images: string[] // First: main image, Second: hover image
}

export interface Product {
    id: string
    name: string
    slug: string
    subtitle: string
    price: number
    originalPrice?: number
    image: string
    hoverImage?: string
    colorVariants?: ColorVariant[]
    badge?: string
    savePercent?: number
    variants?: string[]
    category: string
    categorySlug: string
    brand: string
}

export interface Category {
    id: string
    name: string
    slug: string
    image?: string
    href: string
    parent_id?: string | null
    badge?: string | null
    sort_order?: number
}

// Navigation specific types matching the UI component needs
export interface NavigationItem {
    name: string
    href?: string
    badge?: string
}

export interface NavigationColumn {
    title: string
    slug?: string
    image?: string
    items: NavigationItem[]
}

export interface NavigationCategory {
    name: string
    slug: string
    columns: NavigationColumn[]
}

export interface Notification {
    id: string
    title: string
    description: string
    image: string
    time: string | null
    link?: string
    badge?: string
}

export interface Address {
    line1: string
    line2?: string // Optional
    city: string
    state: string
    postal_code: string
    country: string
}

export interface OrderItem {
    id: string
    product: Product
    quantity: number
    price: number
}

export interface Order {
    id: string
    created_at: string
    status: string
    total_amount: number
    items: OrderItem[]
    shipping_address?: Address
}

export interface UserProfile {
    id: string
    email: string
    full_name?: string
    role?: 'admin' | 'user'
}
