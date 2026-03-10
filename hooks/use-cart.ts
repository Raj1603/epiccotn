import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { Product } from "@/lib/types"

export interface CartItem extends Product {
    quantity: number
    selectedColor?: string
}

interface CartStore {
    items: CartItem[]
    addItem: (product: Product, quantity?: number, selectedColor?: string) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1, selectedColor) => {
                const currentItems = get().items
                const existingItem = currentItems.find(
                    (item) => item.id === product.id && item.selectedColor === selectedColor
                )

                if (existingItem) {
                    return set({
                        items: currentItems.map((item) =>
                            item.id === product.id && item.selectedColor === selectedColor
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    })
                }

                set({
                    items: [...currentItems, { ...product, quantity, selectedColor }],
                })
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) })
            },
            updateQuantity: (id, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
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
