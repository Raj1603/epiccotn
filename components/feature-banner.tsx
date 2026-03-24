import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FeatureBannerProps {
  title: string
  description: string
  image: string
  cta?: {
    text: string
    href: string
  }
  reverse?: boolean
  badge?: string
}

export function FeatureBanner({ title, description, image, cta, reverse = false, badge }: FeatureBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-card" suppressHydrationWarning>
      <div className={`grid md:grid-cols-2 min-h-[360px] ${reverse ? "md:flex-row-reverse" : ""}`} suppressHydrationWarning>
        {/* Image */}
        <div className={`relative aspect-[3/4] md:aspect-auto ${reverse ? "md:order-2" : ""}`} suppressHydrationWarning>
          <Image src={image} alt="" fill className="object-cover" />
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-center p-6 md:p-10 lg:p-12 ${reverse ? "md:order-1" : ""}`} suppressHydrationWarning>
          {badge && (
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{badge}</span>
          )}
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-3 leading-tight">{title}</h2>
          <p className="text-gray-600 mb-6 max-w-md">{description}</p>
          {cta && (
            <div suppressHydrationWarning>
              <Button asChild>
                <Link href={cta.href}>{cta.text}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
