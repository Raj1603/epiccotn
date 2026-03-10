import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNavigationCategories, getNotifications } from "@/lib/fetchers"

export default async function PrivacyPage() {
    const navCategories = await getNavigationCategories()
    const notifications = await getNotifications()

    return (
        <div className="min-h-screen bg-white">
            <Header navigationCategories={navCategories} notifications={notifications} />

            <main className="max-w-[1000px] mx-auto px-4 sm:px-6 py-32">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                    <p>At Osyndo, we take your privacy seriously. This policy describes how we collect, use, and handle your personal information when you use our website and services.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our support team. This may include your name, email address, shipping address, and payment information.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you about your orders and promotional offers.</p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
