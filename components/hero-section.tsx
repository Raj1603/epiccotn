import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  subtitle?: string
  image: string
  mobileImage?: string
  cta?: {
    text: string
    href: string
  }
  overlay?: boolean
  align?: "left" | "center" | "right"
  height?: "small" | "medium" | "large" | "full"
}

export function HeroSection({
  title,
  subtitle,
  image,
  mobileImage,
  cta,
  overlay = true,
  align = "left",
  height = "large",
}: HeroSectionProps) {
  const heightClasses = {
    small: "h-[300px] md:h-[400px]",
    medium: "h-[400px] md:h-[500px]",
    large: "h-[500px] md:h-[600px] lg:h-[700px]",
    full: "h-screen",
  }

  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  return (
    <section className={`relative ${heightClasses[height]} overflow-hidden`} suppressHydrationWarning>
      {/* Desktop image */}
      <Image src={image} alt="" fill className="object-cover hidden md:block" priority />
      {/* Mobile image */}
      <Image src={mobileImage || image} alt="" fill className="object-cover md:hidden" priority />

      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />}

      <div
        suppressHydrationWarning
        className={`relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12 md:pb-16 lg:pb-20 ${alignClasses[align]}`}
      >
        <div className="max-w-xl" suppressHydrationWarning>
          {subtitle && <p className="text-sm md:text-base font-medium text-white/80 mb-2">{subtitle}</p>}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">{title}</h1>
          {cta && (
            <Button asChild variant="secondary" size="lg" className="mt-2">
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
