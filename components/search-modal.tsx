"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, X, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Product } from "@/lib/types"

interface SearchModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Simple debounce hook implementation if not exists
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
    const router = useRouter()
    const [query, setQuery] = React.useState("")
    const debouncedQuery = useDebounceValue(query, 500)
    const [results, setResults] = React.useState<Product[]>([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!debouncedQuery) {
            setResults([])
            return
        }

        async function fetchResults() {
            setLoading(true)
            try {
                // We'll call a server action or an API route. 
                // Since `searchProducts` is a server component function, we should ideally access it via API 
                // or a server action passed down. But here, let's use a standard client->server fetch pattern 
                // if we don't have Server Actions setup for this specific small interaction yet.
                // However, making `searchProducts` a Server Action is cleaner.
                // For now, let's assume we can hit an API endpoint if we created one, OR use a server action.
                // Wait, I didn't create an API route for search.
                // I'll create a simple API route for search or just use a Server Action.
                // Let's create `app/api/search/route.ts` next to keep it standard REST.

                const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
                if (!res.ok) throw new Error('Search failed')
                const data = await res.json()
                setResults(data)
            } catch (error) {
                console.error(error)
                setResults([])
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [debouncedQuery])

    const handleSelect = (slug: string) => {
        onOpenChange(false)
        router.push(`/products/${slug}`)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white gap-0">
                <DialogTitle className="sr-only">Search Products</DialogTitle>
                <div className="flex items-center border-b border-gray-100 px-4 py-3">
                    <Search className="h-5 w-5 text-gray-400 mr-3" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="border-0 focus-visible:ring-0 px-0 text-base h-auto placeholder:text-gray-400"
                        autoFocus
                    />
                    {query && (
                        <button onClick={() => setQuery("")} className="ml-2 text-gray-400 hover:text-gray-600">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {loading ? (
                        <div className="p-8 flex justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                    ) : results.length > 0 ? (
                        <div className="py-2">
                            {results.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleSelect(product.slug)}
                                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                >
                                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{product.subtitle}</p>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {(product.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : query && !loading ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            No results found for "{query}"
                        </div>
                    ) : null}

                    {!query && (
                        <div className="p-4 bg-gray-50/50">
                            <p className="text-xs font-medium text-gray-500 mb-2">Popular Searches</p>
                            <div className="flex flex-wrap gap-2">
                                {['iPhone Case', 'Apple Watch Band', 'Wallet', 'Cable'].map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => setQuery(term)}
                                        className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-md hover:border-gray-400 transition-colors"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
