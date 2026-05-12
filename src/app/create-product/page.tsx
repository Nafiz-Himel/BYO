import type { Metadata } from "next"

import { CreateProductForm } from "@/components/create-product-form"

export const metadata: Metadata = {
  title: "Create Product | AETHER Admin",
  description: "Add a new product to the AETHER collection.",
}

export default function CreateProductPage() {
  return (
    <>
      <div className="flex-1 py-16 px-6 lg:px-10">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Admin</p>
            <h1 className="font-serif text-3xl lg:text-4xl tracking-wide">Create Product</h1>
          </div>
          <CreateProductForm />
        </div>
      </div>
    </>
  )
}
