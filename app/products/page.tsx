import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getProducts, getNotifications } from "@/lib/fetchers"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Catalog | Epiccotn",
    description: "Explore the full Epiccotn collection of premium bamboo and Pima Silk wellness innerwear.",
}

export default async function ProductsPage() {
    const [products, notifications] = await Promise.all([
        getProducts(),
        getNotifications()
    ])

    return (
        <div className="min-h-screen bg-[#0A0A0A]" suppressHydrationWarning>
            <Header notifications={notifications} />
            <main className="pt-32 pb-20 px-6 lg:px-14">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex flex-col mb-16">
                        <h1 className="font-syne text-[clamp(48px,6vw,90px)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase text-white mb-6">
                            Full<br/><span className="text-lime">Lineup.</span>
                        </h1>
                        <p className="font-inter text-[15px] font-light text-text-dim max-w-[400px] leading-relaxed">
                            Every piece engineered with ProTech science and optimized for your daily wellness journey.
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="py-20 border-t border-white/10 flex flex-col items-center justify-center text-center">
                            <p className="font-syne font-bold text-[14px] text-white/20 uppercase tracking-[0.2em]">No Styles Released Yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
                            {products.map((product) => (
                                <div key={product.id} className="bg-[#0A0A0A]">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
