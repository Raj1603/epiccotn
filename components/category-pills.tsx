"use client"

import Link from "next/link"
import Image from "next/image"
import { DEFAULT_PLACEHOLDER } from "@/lib/image-fallbacks"

interface CategoryPill {
  name: string
  image: string
  href: string
  color?: string
}

const categoryPills: CategoryPill[] = [
  {
    name: "Best Sellers",
    image: DEFAULT_PLACEHOLDER,
    href: "/collections/best-sellers",
    color: "bg-amber-100",
  },
  {
    name: "Power",
    image: DEFAULT_PLACEHOLDER,
    href: "/collections/power",
    color: "bg-red-100",
  },
  {
    name: "Accessories",
    image: DEFAULT_PLACEHOLDER,
    href: "/collections/accessories",
    color: "bg-emerald-100",
  },
  {
    name: "Bands",
    image: DEFAULT_PLACEHOLDER,
    href: "/collections/bands",
    color: "bg-orange-100",
  },
]

export function CategoryPills() {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {categoryPills.map((pill) => (
        <Link
          key={pill.name}
          href={pill.href}
          className={`flex items-center gap-2 pl-1 pr-4 py-1 rounded-full ${pill.color} hover:opacity-80 transition-opacity`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white">
            <Image
              src={pill.image || DEFAULT_PLACEHOLDER}
              alt={pill.name}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-900">{pill.name}</span>
        </Link>
      ))}
    </div>
  )
}
