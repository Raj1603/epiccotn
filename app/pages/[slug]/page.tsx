
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNavigationCategories, getNotifications } from "@/lib/fetchers"

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const navCategories = await getNavigationCategories()
    const notifications = await getNotifications()

    // Simple static content mapping for now
    // In a real app, this would come from a CMS or MDX files
    const pages: Record<string, { title: string; content: string }> = {
        "about": {
            title: "About Us",
            content: "We prioritize design and quality over everything else. We create products that we want to use ourselves. Founded on the principle that tech accessories should be as beautiful as the devices they protect, Osyndo has grown into a premium lifestyle brand."
        },
        "our-process": {
            title: "Our Process",
            content: "Every detail considered, from the first sketch to the final stitch. We use only the finest materials, including Horween leather from one of America's oldest tanneries. Our manufacturing partners are chosen for their attention to detail and commitment to quality."
        }
    }

    const page = pages[slug]

    if (!page) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white">
            <Header navigationCategories={navCategories} notifications={notifications} />

            <main className="max-w-[1000px] mx-auto px-4 sm:px-6 py-32">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{page.title}</h1>
                <div className="prose prose-lg max-w-none text-gray-600">
                    <p>{page.content}</p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
