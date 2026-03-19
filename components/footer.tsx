import Link from "next/link"
import { Instagram, Facebook, Youtube, Leaf, Shield, MessageSquare } from "lucide-react"
import { NewsletterForm } from "./newsletter-form"

const footerLinks = {
  wellness: [
    { name: "Everyday Panty", href: "/" },
    { name: "Our Story", href: "/#story" },
    { name: "Community", href: "#" },
  ],
  science: [
    { name: "Advanced Tech", href: "/#science" },
    { name: "Probiotic Finish", href: "/#science" },
    { name: "Ethical Sourcing", href: "/#science" },
  ],
  support: [
    { name: "Shipping & Returns", href: "#" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact Us", href: "#" },
  ],
}

export function Footer() {
  return (
    <>
      {/* 3-Column Trust Banner */}
      <div className="bg-gray-50 pt-20 pb-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="pt-8 md:pt-0 flex flex-col items-center group">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-green-700" />
            </div>
            <h4 className="font-serif text-lg mb-2 text-gray-900">Premium Fabric Innovation</h4>
            <p className="text-gray-500 text-sm">Experience Breathable, Quality and Comfort</p>
          </div>
          <div className="pt-8 md:pt-0 flex flex-col items-center group">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-blue-700" />
            </div>
            <h4 className="font-serif text-lg mb-2 text-gray-900">Customer Satisfaction</h4>
            <p className="text-gray-500 text-sm">Secure, Confident & Every Day</p>
          </div>
          <div className="pt-8 md:pt-0 flex flex-col items-center group">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-pink-700" />
            </div>
            <h4 className="font-serif text-lg mb-2 text-gray-900">Get In Touch</h4>
            <p className="text-gray-500 text-sm">Experience world class support</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer id="contact" className="bg-white text-gray-600 border-t border-gray-100 wellness-theme relative overflow-hidden" suppressHydrationWarning>
      
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 relative z-10" suppressHydrationWarning>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 lg:gap-20" suppressHydrationWarning>

          <div className="col-span-2 lg:col-span-2 space-y-10" suppressHydrationWarning>
            <span className="text-4xl md:text-5xl font-sans font-black text-gray-900 tracking-tighter">
              Epiccotn<span className="text-[var(--primary)] text-5xl leading-none">.</span>
            </span>
            <p className="text-gray-500 max-w-sm leading-relaxed text-lg font-light">
              Fusing natural wisdom with modern textile science to empower women's health and daily confidence.
            </p>

            <div className="space-y-5 max-w-sm pt-4">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] font-sans">Join the Wellness Journey</h4>
              <NewsletterForm />
              <p className="text-[10px] text-gray-400">By subscribing, you agree to our Privacy Policy.</p>
            </div>

            <div className="flex items-center gap-6" suppressHydrationWarning>
              <a href="https://www.instagram.com/epiccotn1/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="https://www.facebook.com/profile.php?id=61588227026428" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors"><Facebook className="h-6 w-6" /></a>
              <a href="https://www.youtube.com/@epiccotn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors"><Youtube className="h-6 w-6" /></a>
            </div>
          </div>

          <div suppressHydrationWarning>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] mb-8 font-sans">Wellness</h3>
            <ul className="space-y-4">
              {footerLinks.wellness.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-[var(--primary)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div suppressHydrationWarning>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] mb-8 font-sans">Science</h3>
            <ul className="space-y-4">
              {footerLinks.science.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-[var(--primary)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div suppressHydrationWarning>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] mb-8 font-sans">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-[var(--primary)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6" suppressHydrationWarning>
          <span className="text-sm text-gray-400 font-serif" suppressHydrationWarning>
            © {new Date().getFullYear()} Epiccotn Inc. All Rights Reserved.
          </span>
          <div className="flex gap-8 text-xs text-gray-400 uppercase tracking-widest" suppressHydrationWarning>
            <span>Natural Wisdom</span>
            <span>•</span>
            <span>Modern Science</span>
            <span>•</span>
            <span>Premium Comfort</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

