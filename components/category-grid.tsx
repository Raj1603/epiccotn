import Link from "next/link"
import Image from "next/image"
import type { Category } from "@/lib/data"
import { resolveCategoryImage } from "@/lib/image-fallbacks"

interface CategoryGridProps {
  categories: Category[]
  title?: string
}

export function CategoryGrid({ categories, title }: CategoryGridProps) {
  return (
    <section>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative aspect-[4/3] bg-card rounded-xl overflow-hidden"
          >
            <Image
              src={resolveCategoryImage(category.slug, category.image)}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
