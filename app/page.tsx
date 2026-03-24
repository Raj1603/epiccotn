import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturesSlider } from "@/components/features-slider"
import { ProblemSolution } from "@/components/problem-solution"
import { WellnessProductDetail } from "@/components/wellness-product-detail"
import { WellnessSustainability } from "@/components/wellness-sustainability"
import { BlogSection } from "@/components/blog-section"
import { TrustFeaturesSection } from "@/components/trust-features-section"

import { getNotifications } from "@/lib/fetchers"

export default async function HomePage() {
  const notifications = await getNotifications()

  return (
    <div className="min-h-screen" suppressHydrationWarning>
      <Header notifications={notifications} />
      <main>
        <HeroCarousel />
        <FeaturesSlider />
        <ProblemSolution />
        <WellnessProductDetail />
        <WellnessSustainability />
        <BlogSection />
        <TrustFeaturesSection />
      </main>
      <Footer />
    </div>
  )
}


