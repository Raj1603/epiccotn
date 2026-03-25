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
        <div className="min-h-screen bg-[#FDFDFD]" suppressHydrationWarning>
            <Header notifications={notifications} />
            <main className="pt-32 pb-32 px-6 lg:px-14">
                <div className="max-w-[1440px] mx-auto">
                    <header className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
                        <div className="space-y-6">
                            <h1 className="font-syne text-[clamp(48px,8vw,110px)] font-extrabold leading-[0.8] tracking-[-0.05em] uppercase text-[#0A0A0A]">
                                The Core<br/><span className="text-lime-600 italic">Fleet.</span>
                            </h1>
                            <p className="font-inter text-[16px] font-light text-neutral-500 max-w-[460px] leading-relaxed">
                                Engineered with ProTech™ 4-layer technology and woven with ultra-fine organic bamboo silk for unrivaled daily wellness.
                            </p>
                        </div>
                    </header>

                    {products.length === 0 ? (
                        <div className="py-32 border-t border-neutral-100 flex flex-col items-center justify-center text-center">
                            <p className="font-syne font-bold text-[12px] text-neutral-300 uppercase tracking-[0.4em]">Awaiting Logistics Dispatch</p>
                            <p className="mt-4 font-inter text-neutral-400 text-sm italic">The production fleet is charging. Check back soon.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                            {products.map((product) => (
                                <div key={product.id} className="group">
                                    <ProductCard product={product} theme="light" showCartButton={false} />
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
