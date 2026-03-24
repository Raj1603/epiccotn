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
      {title && <h2 className="text-3xl font-sans text-gray-900 mb-12 text-center">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href || `/collections/${category.slug}`}
            className="group relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-[2rem] shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
          >
            <Image
              src={resolveCategoryImage(category.slug, category.image)}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center transition-transform duration-700">
                <span className="text-white/70 text-[10px] tracking-[0.3em] uppercase mb-2">Explore Collection</span>
                <h3 className="text-2xl font-sans text-white mb-4">{category.name}</h3>
                <div className="h-[1px] w-0 bg-white/50 transition-all duration-700 group-hover:w-full" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
