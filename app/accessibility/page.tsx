import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNavigationCategories, getNotifications } from "@/lib/fetchers"

export default async function AccessibilityPage() {
    const navCategories = await getNavigationCategories()
    const notifications = await getNotifications()

    return (
        <div className="min-h-screen bg-white">
            <Header navigationCategories={navCategories} notifications={notifications} />

            <main className="max-w-[1000px] mx-auto px-4 sm:px-6 py-32">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Accessibility Statement</h1>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                    <p>Osyndo is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Conformance Status</h2>
                    <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. We strive to conform to WCAG 2.1 level AA standards.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Feedback</h2>
                    <p>We welcome your feedback on the accessibility of Osyndo. Please let us know if you encounter accessibility barriers on our site.</p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
