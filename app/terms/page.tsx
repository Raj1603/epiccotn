import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNavigationCategories, getNotifications } from "@/lib/fetchers"

export default async function TermsPage() {
    const navCategories = await getNavigationCategories()
    const notifications = await getNotifications()

    return (
        <div className="min-h-screen bg-white">
            <Header navigationCategories={navCategories} notifications={notifications} />

            <main className="max-w-[1000px] mx-auto px-4 sm:px-6 py-32">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Terms of Service</h1>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                    <p>Welcome to Osyndo. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Use of Site</h2>
                    <p>You may use our site for lawful purposes only. You are prohibited from violating or attempting to violate the security of the site or using it to harass others.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Product Information</h2>
                    <p>We attempt to be as accurate as possible with product descriptions. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, or error-free.</p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
