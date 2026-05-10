"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CheckoutSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinueShopping: () => void
}

export function CheckoutSuccessDialog({ open, onOpenChange, onContinueShopping }: CheckoutSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <DialogTitle className="font-serif text-2xl">Order Confirmed</DialogTitle>
          <DialogDescription className="text-base">
            Thank you for your purchase. Your order has been received and is being processed. You will receive a
            confirmation email shortly.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 p-4 rounded-xl bg-muted">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order Number</p>
          <p className="font-mono text-lg">#AETH-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 tracking-widest text-xs"
            onClick={onContinueShopping}
          >
            CONTINUE SHOPPING
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
