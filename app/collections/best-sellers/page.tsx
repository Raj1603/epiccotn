import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { FeatureBanner } from "@/components/feature-banner"
import { getProducts, getNavigationCategories, getNotifications, getUserProfile } from "@/lib/fetchers"
import Image from "next/image"

export const metadata = {
  title: "Best Sellers | Osyndo®",
  description: "Shop our most popular products - iPhone cases, Apple Watch bands, chargers, and wallets.",
}

export default async function BestSellersPage() {
  const [products, navCategories, notifications, user] = await Promise.all([
    getProducts(),
    getNavigationCategories(),
    getNotifications(),
    getUserProfile()
  ])

  const isAdmin = user?.role === 'admin'

  const bestSellers = products.slice(0, 6)

  // Multi-Category Grouping
  const homeWellness = products.filter(p =>
    p.categorySlug?.includes('health') ||
    p.categorySlug?.includes('kitchen') ||
    p.categorySlug?.includes('pet') ||
    p.categorySlug?.includes('sport')
  )
  const gourmetBeauty = products.filter(p =>
    p.categorySlug?.includes('grocery') ||
    p.categorySlug?.includes('beauty')
  )
  const techGear = products.filter(p =>
    p.categorySlug?.includes('case') ||
    p.categorySlug?.includes('charging') ||
    p.categorySlug?.includes('band') ||
    p.categorySlug?.includes('gear') ||
    p.categorySlug?.includes('cable') ||
    p.categorySlug?.includes('adapter')
  )

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <Header navigationCategories={navCategories} notifications={notifications} />

      <main className="pt-[88px]">
        {/* Hero */}
        <HeroSection
          title="Osyndo® Essentials"
          subtitle="A Curated Collection for the Modern Lifestyle"
          image="https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          mobileImage="https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800"
          height="medium"
          overlay
          align="center"
        />

        {/* Best Sellers Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <h2 className="text-2xl font-bold mb-1">Best Sellers</h2>
          {/* <p className="text-muted-foreground mb-6">Now Featuring iPhone 17 Cases</p> */}
          <ProductGrid products={bestSellers} columns={6} isAdmin={isAdmin} />
        </section>

        {/* Design Philosophy Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <FeatureBanner
            title="Design Excellence"
            description="At Osyndo, we believe that the objects you interact with every day should be as beautiful as they are functional. From the kitchen counter to your tech toolkit, we select only the finest materials and most innovative designs to elevate your modern lifestyle."
            image="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800"
          />
        </section>

        {/* Home & Wellness Group */}
        {homeWellness.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
            <ProductGrid products={homeWellness} title="Home, Wellness & Pets" columns={5} isAdmin={isAdmin} />
          </section>
        )}

        {/* Values Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <FeatureBanner
            title="Elevated Living"
            description="We don't just curate products; we curate experiences. Our mission is to integrate wellness, style, and technology into a single, cohesive ecosystem. Whether it's a gourmet meal or a perfectly organized workspace, Osyndo is here to enhance every personal moment."
            image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
            reverse
          />
        </section>

        {/* Gourmet & Beauty Group */}
        {gourmetBeauty.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
            <ProductGrid products={gourmetBeauty} title="Gourmet & Personal Care" columns={4} isAdmin={isAdmin} />
          </section>
        )}

        {/* Tech & Gear Group */}
        {techGear.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
            <ProductGrid products={techGear} title="Premium Tech & Gear" columns={6} isAdmin={isAdmin} />
          </section>
        )}

        {/* Global Catalog Link Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <div className="relative aspect-[21/9] bg-card rounded-xl overflow-hidden group">
            <Image src="https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Beauty & Wellness" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-4">Discover the Collection</h3>
                <p className="text-white/80 max-w-md mx-auto mb-6">Explore our curated selection of high-end essentials across all categories.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
