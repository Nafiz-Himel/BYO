"use client"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string
  onSizeChange: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium tracking-wide">Size</span>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors underline">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={cn(
              "min-w-[48px] h-12 px-4 rounded-lg border text-sm font-medium transition-all",
              selectedSize === size
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent border-border hover:border-foreground",
            )}
            role="radio"
            aria-checked={selectedSize === size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  max?: number
}

export function QuantitySelector({ quantity, onQuantityChange, max = 10 }: QuantitySelectorProps) {
  return (
    <div>
      <span className="text-sm font-medium tracking-wide block mb-3">Quantity</span>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-lg bg-transparent"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="w-16 h-12 flex items-center justify-center bg-card border border-border rounded-lg">
          <span className="text-sm font-medium">{quantity}</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-lg bg-transparent"
          onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
