import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Cart | AETHER",
  description: "Review your selected items and proceed to checkout.",
}

export default function CartLayout({ children }: { children: ReactNode }) {
  return children
}
