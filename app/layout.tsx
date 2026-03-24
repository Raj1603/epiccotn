import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Syne, Syne_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import "./globals.css"

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
const syneFont = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})
const syneMonoFont = Syne_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Epiccotn",
  description: "Innovation in Intimacy",
  keywords: ["Epiccotn", "Everyday Panty", "women's wellness", "antimicrobial innerwear", "bamboo underwear"],
  generator: 'Epiccotn'
}

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
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
      <body suppressHydrationWarning className={`${interFont.variable} ${syneFont.variable} ${syneMonoFont.variable} font-sans antialiased bg-background text-foreground selection:bg-lime selection:text-white min-h-screen flex flex-col`}>
        {children}
        <Toaster 
          position="top-right" 
          expand={true} 
          toastOptions={{
            duration: 3000,
            className: "rounded-none border border-border bg-background text-foreground font-syne uppercase tracking-wider shadow-2xl px-5 py-4 text-[11px] font-bold"
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
