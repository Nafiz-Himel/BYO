import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {product.isNew && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground tracking-wider text-xs">
                NEW
              </Badge>
            )}
            {product.originalPrice && (
              <Badge variant="secondary" className="absolute top-4 right-4 tracking-wider text-xs">
                SALE
              </Badge>
            )}
          </div>
        </Link>
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-medium text-sm tracking-wide hover:text-accent transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Link href={`/products/${product.slug}`} className="block pt-2">
            <Button variant="outline" size="sm" className="w-full rounded-lg tracking-wider text-xs bg-transparent">
              VIEW PRODUCT
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
