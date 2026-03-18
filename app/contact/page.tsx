import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNotifications } from "@/lib/fetchers"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Epiccotn",
  description: "Get in touch with the Epiccotn team for any questions or support.",
}

export default async function ContactPage() {
  const [notifications] = await Promise.all([
    getNotifications()
  ])

  return (
    <div className="min-h-screen flex flex-col wellness-theme bg-white">
      <Header notifications={notifications} />
      
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-32 pb-24">
        <div className="w-full max-w-xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-sans text-gray-900 text-center mb-16">Contact</h1>

          {/* Form */}
          <ContactForm />

          {/* Contact Info Footer */}
          <div className="text-center space-y-2 border-t border-gray-100 pt-12">
            <h2 className="text-xs font-bold text-gray-500 tracking-[0.15em] uppercase mb-4">Or Reach Us Here</h2>
            <p className="text-base text-gray-900">support@epiccotn.com</p>
            <p className="text-xs text-gray-500">(MON - FRI, 10 am – 6 pm)</p>
            <p className="text-[10px] text-gray-400 pt-2">Please allow 24-48 hours for us to revert back.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
