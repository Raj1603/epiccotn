import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"

const googleSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Epiccotn | The Everyday Panty",
  description:
    "Revolutionary innerwear for women's daily wellness. Fusing natural wisdom with modern textile science for unparalleled comfort and confidence.",
  keywords: ["Epiccotn", "Everyday Panty", "women's wellness", "antimicrobial innerwear", "bamboo underwear"],
  generator: 'Epiccotn'
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${googleSans.variable} font-sans antialiased bg-white`}>
        {children}
        <Toaster position="top-right" expand={true} richColors />
        <Analytics />
      </body>
    </html>
  )
}
