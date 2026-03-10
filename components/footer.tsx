import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"

const footerLinks = {
  wellness: [
    { name: "Everyday Panty", href: "/" },
    { name: "Our Story", href: "/#story" },
    { name: "Community", href: "#" },
  ],
  science: [
    { name: "Silver Ion Tech", href: "/#science" },
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
    <footer className="bg-white border-t border-gray-100 wellness-theme" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24" suppressHydrationWarning>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12" suppressHydrationWarning>

          <div className="col-span-2 lg:col-span-2 space-y-8" suppressHydrationWarning>
            <span className="text-3xl font-serif font-bold text-gray-900 tracking-tight">
              Epiccotn<span className="text-[var(--primary)]">™</span>
            </span>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Fusing natural wisdom with modern textile science to empower women's health and daily confidence.
            </p>

            <div className="space-y-4 max-w-sm">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-serif">Join the Wellness Journey</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-sm bg-gray-50 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all"
                />
                <button className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-black transition-all">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-gray-400">By subscribing, you agree to our Privacy Policy.</p>
            </div>

            <div className="flex items-center gap-6" suppressHydrationWarning>
              <a href="https://www.instagram.com/epiccotn1/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="https://www.facebook.com/profile.php?id=61588227026428" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors"><Facebook className="h-6 w-6" /></a>
              <a href="https://www.youtube.com/@epiccotn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors"><Youtube className="h-6 w-6" /></a>
            </div>
          </div>

          <div suppressHydrationWarning>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 font-serif">Wellness</h3>
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
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 font-serif">Science</h3>
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
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 font-serif">Support</h3>
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
  )
}

