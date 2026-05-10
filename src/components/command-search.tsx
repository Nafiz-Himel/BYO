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

interface SearchResult {
  id: string
  name: string
  slug: string
  price: number
  category: string
  images: string[]
}

interface CommandSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)

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

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.products || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (slug: string) => {
    onOpenChange(false)
    router.push(`/products/${slug}`)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search products..." value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>
          {loading ? "Searching..." : query ? "No products found." : "Type to search products..."}
        </CommandEmpty>
        <CommandGroup heading="Products">
          {results.map((product) => (
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
