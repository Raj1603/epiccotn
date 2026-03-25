import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProductById, getUserProfile } from "@/lib/fetchers"
import { EpicProductDetail } from "@/components/epic-product-detail"
import { TrustFeaturesSection } from "@/components/trust-features-section"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)
  return {
    title: product ? `${product.name} | Epiccotn` : "Product | Epiccotn",
    description: product?.subtitle ?? "Discover premium bamboo wellness innerwear by Epiccotn.",
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, user] = await Promise.all([
    getProductById(id),
    getUserProfile()
  ])

  const isAdmin = user?.role === 'admin'

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]" suppressHydrationWarning>
      <Header />
      <main className="pt-24 pb-0">
        <EpicProductDetail product={product} isAdmin={isAdmin} />
        <TrustFeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
