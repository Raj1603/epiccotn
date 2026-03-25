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
    <div className="min-h-screen flex flex-col bg-black selection:bg-lime selection:text-black">
      <Header notifications={notifications} />
      
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-40 pb-24 relative overflow-hidden">
        {/* Background text decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syne text-[clamp(100px,25vw,320px)] font-black text-white/[0.02] tracking-tighter uppercase select-none pointer-events-none">
          CONTACT
        </div>

        <div className="w-full max-w-xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <p className="font-syne font-bold text-[10px] lg:text-[11px] tracking-[0.2em] uppercase text-lime mb-3 lg:mb-4">Get in Touch</p>
            <h1 className="font-syne text-[clamp(36px,8vw,64px)] font-extrabold text-white tracking-tight uppercase leading-[1.0] lg:leading-[0.9]">
              Innovation in<br />
              <span className="text-lime">Dialogue.</span>
            </h1>
          </div>

          {/* Form */}
          <ContactForm />

          {/* Contact Info Footer */}
          <div className="text-center space-y-4 border-t border-white/5 pt-12">
            <h2 className="font-syne font-bold text-[10px] font-bold text-white/30 tracking-[0.15em] uppercase mb-4">Direct Channels</h2>
            <p className="font-syne text-[20px] font-bold text-white tracking-tight">support@epiccotn.com</p>
            <div className="flex flex-col gap-1">
              <p className="font-inter text-[12px] text-white/40 uppercase tracking-wider">(MON - FRI, 10 am – 6 pm)</p>
              <p className="font-inter text-[10px] text-white/20 italic pt-2">Please allow 24-48 hours for our team to deep-dive into your inquiry.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
