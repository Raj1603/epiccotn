import { ProductCard } from "./product-card"
import type { Product } from "@/lib/data"

interface ProductGridProps {
  products: Product[]
  title?: string
  columns?: 2 | 3 | 4 | 5 | 6
  isAdmin?: boolean
}

export function ProductGrid({ products, title, columns = 4, isAdmin }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  }

  return (
    <section>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`} suppressHydrationWarning>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
        ))}
      </div>
    </section>
  )
}
