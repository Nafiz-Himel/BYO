"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { products } from "@/lib/mock-data"

interface CommandSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const handleSelect = (slug: string) => {
    onOpenChange(false)
    router.push(`/shop/${slug}`)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search products..." />
      <CommandList>
        <CommandEmpty>No products found.</CommandEmpty>
        <CommandGroup heading="Products">
          {products.map((product) => (
            <CommandItem
              key={product.id}
              value={product.name}
              onSelect={() => handleSelect(product.slug)}
              className="cursor-pointer"
            >
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{product.name}</span>
                <span className="text-sm text-muted-foreground">
                  ${product.price.toLocaleString()} · {product.category}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
