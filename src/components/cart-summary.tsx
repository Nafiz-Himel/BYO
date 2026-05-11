import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CartSummaryProps {
  subtotal: number
  onCheckout: () => void
  isCheckingOut?: boolean
}

export function CartSummary({ subtotal, onCheckout, isCheckingOut }: CartSummaryProps) {
  const shipping = subtotal > 500 ? 0 : 25
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <Card className="rounded-xl border-border/40">
      <CardContent className="p-6">
        <h2 className="text-sm font-medium tracking-widest uppercase mb-6">Order Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-border/40 pt-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full h-14 mt-6 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 tracking-widest text-sm"
          onClick={onCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? "PROCESSING..." : "CHECKOUT"}
        </Button>

        {shipping > 0 && (
          <p className="text-xs text-center text-muted-foreground mt-4">
            Add ${(500 - subtotal).toLocaleString()} more for free shipping
          </p>
        )}
      </CardContent>
    </Card>
  )
}
