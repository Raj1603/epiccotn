import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { Product } from "@/lib/types"

export interface CartItem extends Product {
    quantity: number
    selectedColor?: string
    selectedSize?: string
}

interface CartStore {
    items: CartItem[]
    addItem: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void
    removeItem: (productId: string, selectedColor?: string, selectedSize?: string) => void
    updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void
    clearCart: () => void
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1, selectedColor, selectedSize) => {
                const currentItems = get().items
                const existingItem = currentItems.find(
                    (item) => item.id === product.id && 
                             item.selectedColor === selectedColor && 
                             item.selectedSize === selectedSize
                )

                if (existingItem) {
                    return set({
                        items: currentItems.map((item) =>
                            item.id === product.id && 
                            item.selectedColor === selectedColor && 
                            item.selectedSize === selectedSize
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    })
                }

                set({
                    items: [...currentItems, { ...product, quantity, selectedColor, selectedSize }],
                })
            },
            removeItem: (id, selectedColor, selectedSize) => {
                set({ 
                    items: get().items.filter((item) => 
                        !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
                    ) 
                })
            },
            updateQuantity: (id, quantity, selectedColor, selectedSize) => {
                set({
                    items: get().items.map((item) =>
                        item.id === id && 
                        item.selectedColor === selectedColor && 
                        item.selectedSize === selectedSize 
                            ? { ...item, quantity } : item
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
