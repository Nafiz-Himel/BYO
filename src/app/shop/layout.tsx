import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Shop | AETHER",
  description: "Browse our curated collection of luxury clothing.",
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children
}
