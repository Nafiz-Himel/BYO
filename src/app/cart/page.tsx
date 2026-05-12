"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"

import { CartItemRow } from "@/components/cart-item-row"
import { CartSummary } from "@/components/cart-summary"
import { CheckoutSuccessDialog } from "@/components/checkout-success-dialog"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsCheckingOut(false)
    setShowSuccess(true)
    clearCart()
  }

  const handleContinueShopping = () => {
    setShowSuccess(false)
    router.push("/shop")
  }

  return (
    <>
      {/* Page Header */}
      <section className="py-12 lg:py-16 px-6 lg:px-10 border-b border-border/40">
        <div className="container mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Your Selection</p>
          <h1 className="font-serif text-3xl lg:text-5xl tracking-wide">Shopping Cart</h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-10 lg:py-16 px-6 lg:px-10">
        <div className="container mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Discover our curated collection of luxury essentials and find pieces that speak to your style.
              </p>
              <Link href="/shop">
                <Button className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 tracking-widest text-xs px-8">
                  START SHOPPING
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-medium tracking-widest uppercase">
                    {items.length} Item{items.length !== 1 ? "s" : ""}
                  </h2>
                  <Link
                    href="/shop"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div>
                  {items.map((item) => (
                    <CartItemRow
                      key={`${item.product.id}-${item.size}`}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="lg:sticky lg:top-24">
                  <CartSummary subtotal={subtotal} onCheckout={handleCheckout} isCheckingOut={isCheckingOut} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <CheckoutSuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        onContinueShopping={handleContinueShopping}
      />
    </>
  )
}
