
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getCategoryBySlug, getProductsByCategory, getNavigationCategories, getNotifications, getUserProfile } from "@/lib/fetchers"
import type { Product } from "@/lib/data"

// Group products by device/subcategory for Cases
function groupProductsByDevice(products: Product[]) {
    const groups: Record<string, Product[]> = {}

    products.forEach(product => {
        // Extract device type from subtitle or name (e.g., "iPhone 17 Pro Max", "iPhone 16", etc.)
        const deviceMatch = product.subtitle?.match(/(iPhone \d+[^|]*)/i) ||
            product.name.match(/(iPhone \d+[^|]*)/i)

        const device = deviceMatch ? deviceMatch[1].trim() : "Other"

        if (!groups[device]) {
            groups[device] = []
        }
        groups[device].push(product)
    })

    return groups
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const [category, products, navCategories, notifications, user] = await Promise.all([
        getCategoryBySlug(slug),
        getProductsByCategory(slug),
        getNavigationCategories(),
        getNotifications(),
        getUserProfile()
    ])

    const isAdmin = user?.role === 'admin'

    if (!category && products.length === 0) {
        notFound()
    }

    // Fallback name if category object not found but products exist
    const categoryName = category?.name || slug.replace("-", " ")
    const heroImage = category?.image || "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2000&auto=format&fit=crop"

    // Group products by device for Cases category
    const isCasesCategory = slug === "cases" || categoryName.toLowerCase().includes("case")
    const productGroups = isCasesCategory ? groupProductsByDevice(products) : { "All Products": products }
    const deviceCategories = Object.keys(productGroups).sort()

    return (
        <div className="min-h-screen bg-white" suppressHydrationWarning>
            <Header navigationCategories={navCategories} notifications={notifications} />

            <main className="pt-20">
                {/* Enhanced Hero Banner */}
                <div className="relative h-[240px] md:h-[320px] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden" suppressHydrationWarning>
                    <Image
                        src={heroImage}
                        alt={categoryName}
                        fill
                        className="object-cover opacity-50 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" suppressHydrationWarning />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4" suppressHydrationWarning>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight capitalize">
                            {categoryName}
                        </h1>
                        <p className="text-white/90 max-w-2xl text-base md:text-lg font-light">
                            Premium gear designed for your everyday carry.
                        </p>
                    </div>
                </div>

                {/* Product Sections */}
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
                    {deviceCategories.map((device, idx) => {
                        const deviceProducts = productGroups[device]

                        return (
                            <div key={device} className={idx === 0 ? "pt-8 pb-10" : "py-10"} suppressHydrationWarning>
                                {/* Section Header - Only show if grouped by device */}
                                {isCasesCategory && deviceCategories.length > 1 && (
                                    <div className="mb-10" suppressHydrationWarning>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                            {device}
                                        </h2>
                                        <div className="h-0.5 w-16 bg-gray-900 mt-3" />
                                    </div>
                                )}

                                {/* Product Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-14" suppressHydrationWarning>
                                    {deviceProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
                                    ))}
                                </div>
                            </div>
                        )
                    })}

                    {products.length === 0 && (
                        <div className="text-center py-32">
                            <h3 className="text-2xl font-semibold text-gray-900">No products found</h3>
                            <p className="text-gray-600 mt-3 text-lg">Check back later for new arrivals in this collection.</p>
                            <Link
                                href="/"
                                className="inline-block mt-8 px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Return Home
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
