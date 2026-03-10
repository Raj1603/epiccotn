interface QuoteSectionProps {
  quote: string
  author: string
  role?: string
}

export function QuoteSection({ quote, author, role }: QuoteSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <blockquote className="text-lg md:text-xl lg:text-2xl text-muted-foreground italic mb-6 text-pretty">
          &quot;{quote}&quot;
        </blockquote>
        <div>
          <p className="font-semibold">— {author}</p>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      </div>
    </section>
  )
}
