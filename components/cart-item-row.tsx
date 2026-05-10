"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/lib/cart-context"

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void
  onRemove: (productId: string, size: string) => void
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const { product, quantity, size } = item

  return (
    <div className="flex gap-4 py-6 border-b border-border/40">
      {/* Product Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div>
            <Link
              href={`/shop/${product.slug}`}
              className="font-medium text-sm hover:text-accent transition-colors line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">Size: {size}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full flex-shrink-0"
            onClick={() => onRemove(product.id, size)}
            aria-label={`Remove ${product.name} from cart`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-end justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md bg-transparent"
              onClick={() => onUpdateQuantity(product.id, size, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="w-10 h-8 flex items-center justify-center text-sm">{quantity}</div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md bg-transparent"
              onClick={() => onUpdateQuantity(product.id, size, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-medium">${(product.price * quantity).toLocaleString()}</p>
            {quantity > 1 && <p className="text-xs text-muted-foreground">${product.price.toLocaleString()} each</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
