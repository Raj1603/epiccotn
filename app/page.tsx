import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNavigationCategories, getNotifications } from "@/lib/fetchers"
import { WellnessProductDetail } from "@/components/wellness-product-detail"
import { WellnessCommunity } from "@/components/wellness-community"

export default async function HomePage() {
  const [notifications] = await Promise.all([
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
        <WellnessCommunity />
      </main>
      <Footer />
    </div>
  )
}


