import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProductById, getNavigationCategories, getNotifications, getUserProfile } from "@/lib/fetchers"
import { ProductDetail } from "@/components/product-detail"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, navCategories, notifications, user] = await Promise.all([
    getProductById(id),
    getNavigationCategories(),
    getNotifications(),
    getUserProfile()
  ])

  const isAdmin = user?.role === 'admin'

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigationCategories={navCategories} notifications={notifications} />
      <main className="pt-24 pb-16">
        <ProductDetail product={product} isAdmin={isAdmin} />
      </main>
      <Footer />
    </div>
  )
}
