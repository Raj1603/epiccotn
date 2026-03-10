import Image from "next/image"
import Link from "next/link"
import { getProducts } from "@/lib/fetchers"

export async function CommunitySection() {
  // Fetch a few products to showcase as community tiles when explicit community posts aren't available.
  const products = await getProducts()
  const posts = products.slice(0, 4)

  return (
    <section className="py-12 md:py-16" suppressHydrationWarning>
      <h2 className="text-2xl font-bold mb-6 px-4 sm:px-6">From the Osyndo Community</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6" suppressHydrationWarning>
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="group relative aspect-[4/5] bg-card rounded-xl overflow-hidden"
            suppressHydrationWarning
          >
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              suppressHydrationWarning
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" suppressHydrationWarning />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity" suppressHydrationWarning>
              <span className="text-sm font-medium text-white" suppressHydrationWarning>{p.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
