import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNavigationCategories, getNotifications } from "@/lib/fetchers"
import { WellnessProductDetail } from "@/components/wellness-product-detail"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Everyday Panty | Epiccotn",
    description: "Experience the ultimate in comfort and wellness with the Epiccotn Everyday Panty. Featuring Silver Ion infusion, Probiotic finish, and Organic Bamboo/Lyocell fabric.",
}

export default async function EverydayPantyPage() {
    const [navCategories, notifications] = await Promise.all([
        getNavigationCategories(),
        getNotifications()
    ])

    // Placeholder product data for the Everyday Panty
    const product = {
        id: "everyday-panty-001",
        name: "Everyday Panty",
        price: 45.00,
        description: "A revolutionary innerwear item designed for daily wellness, comfort, and confidence."
    }

    return (
        <div className="min-h-screen">
            <Header notifications={notifications} />
            <main className="pt-20">
                <WellnessProductDetail product={product} />
            </main>
            <Footer />
        </div>
    )
}
