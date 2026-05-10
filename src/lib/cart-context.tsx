"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { Product } from "./mock-data"

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number, size: string) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = "aether-cart"

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    console.warn("Failed to load cart from localStorage")
  }
  return []
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    console.warn("Failed to save cart to localStorage")
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(loadCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      saveCart(items)
    }
  }, [items, hydrated])

  const addItem = useCallback((product: Product, quantity: number, size: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id && item.size === size)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }
      return [...prev, { product, quantity, size }]
    })
  }, [])

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size)
        return
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.size === size ? { ...item, quantity } : item,
        ),
      )
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
