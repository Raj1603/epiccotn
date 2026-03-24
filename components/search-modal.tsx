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
            <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-black/95 backdrop-blur-2xl border border-white/10 gap-0 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
                <DialogTitle className="sr-only">Search Products</DialogTitle>
                
                {/* Search Bar Header */}
                <div className="flex items-center border-b border-white/5 px-6 py-5">
                    <Search className="h-5 w-5 text-lime mr-4" strokeWidth={2} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search our collection..."
                        className="flex-1 bg-transparent border-0 focus:ring-0 px-0 font-syne text-[18px] font-bold text-white placeholder:text-white/20 outline-none"
                        autoFocus
                    />
                    <div className="flex items-center gap-3">
                        {loading && <Loader2 className="h-4 w-4 animate-spin text-lime" />}
                        {query && (
                            <button 
                                onClick={() => setQuery("")} 
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                        {/* <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded bg-white/5 px-2 font-syne font-bold text-[10px] font-medium text-white/30 tracking-wider border border-white/5 uppercase">
                            ESC
                        </kbd> */}
                    </div>
                </div>

                <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                    {loading && !results.length ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-lime" />
                            <p className="font-syne font-bold text-[10px] text-white/20 uppercase tracking-wider animate-pulse">Scanning Archive...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="p-4 grid grid-cols-1 gap-2">
                            <p className="px-3 font-syne font-bold text-[10px] text-white/20 uppercase tracking-[0.2em] mb-2">Results Foundry</p>
                            {results.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleSelect(product.slug)}
                                    className="group w-full flex items-center gap-4 px-4 py-3 bg-white/[0.02] hover:bg-lime/[0.05] border border-transparent hover:border-lime/20 transition-all duration-300 rounded-lg text-left"
                                >
                                    <div className="relative h-16 w-16 overflow-hidden bg-[#111] flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                            sizes="64px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-syne text-[15px] font-bold text-white group-hover:text-lime transition-colors truncate">{product.name}</p>
                                        <p className="font-inter text-[12px] text-white/40 truncate leading-relaxed">{product.subtitle}</p>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="font-syne font-bold text-[11px] text-lime/60 uppercase tracking-wider">{product.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-syne font-bold text-[16px] font-bold text-white">
                                            ${(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                        {product.originalPrice && (
                                            <p className="font-syne font-bold text-[11px] text-white/20 line-through">${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : query && !loading ? (
                        <div className="p-20 text-center flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center mb-4">
                                <Search className="w-5 h-5 text-white/10" />
                            </div>
                            <p className="font-syne text-[16px] text-white/60 mb-1 font-bold">No results found for &ldquo;{query}&rdquo;</p>
                            <p className="font-inter text-[13px] text-white/20">Expand your search to include more general terms or collections.</p>
                        </div>
                    ) : null}

                    {!query && (
                        <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                            <div className="flex flex-col md:flex-row gap-10">
                                <div className="flex-1">
                                    <p className="font-syne font-bold text-[10px] font-bold text-lime/40 mb-5 tracking-[0.2em] uppercase">Popular Inquiries</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Everyday Panty', 'Bamboo Collection', 'Seamless Fit', 'Wellness Journey', 'Sustainability'].map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => setQuery(term)}
                                                className="font-inter text-[12px] bg-white/[0.03] border border-white/10 px-4 py-2 hover:border-lime/40 hover:bg-lime/5 transition-all duration-300 text-white/60 hover:text-white"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden md:block w-[180px]">
                                    <p className="font-syne font-bold text-[10px] font-bold text-white/20 mb-5 tracking-[0.2em] uppercase">Quick Links</p>
                                    <div className="flex flex-col gap-3">
                                        {['New Arrivals', 'Best Sellers', 'Shop All', 'Sustainability'].map((link) => (
                                            <a key={link} href="#" className="font-inter text-[12px] text-white/40 hover:text-lime transition-colors flex items-center gap-2 group">
                                                <span className="w-px h-3 bg-white/10 group-hover:bg-lime transition-colors"/>
                                                {link}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
