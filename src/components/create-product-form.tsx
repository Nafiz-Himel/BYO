"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createProductAction } from "@/lib/actions/product"

const initialState = { success: false, message: "" }

export function CreateProductForm() {
  const [state, formAction, pending] = useActionState(createProductAction, initialState)

  return (
    <form action={formAction} className="space-y-6">
      {state?.message && (
        <div
          className={`p-4 rounded-lg text-sm ${
            state.success ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" placeholder="Cashmere Blend Overcoat" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" placeholder="cashmere-blend-overcoat" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" name="price" type="number" step="0.01" min="0" placeholder="1250" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price ($)</Label>
          <Input id="originalPrice" name="originalPrice" type="number" step="0.01" min="0" placeholder="1500" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Product description..." required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Details</Label>
        <Textarea id="details" name="details" placeholder="80% Cashmere, 20% Wool..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sizingGuide">Sizing Guide</Label>
          <Textarea id="sizingGuide" name="sizingGuide" placeholder="Model is 6'1 wearing size M..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping">Shipping Info</Label>
          <Textarea id="shipping" name="shipping" placeholder="Complimentary shipping..." />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          required
          className="w-full h-10 px-3 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="shirts">Shirts</option>
          <option value="trousers">Trousers</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sizes">Sizes (comma-separated)</Label>
        <Input id="sizes" name="sizes" placeholder="S, M, L, XL" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Images</Label>
        <Input id="images" name="images" type="file" multiple accept="image/*" />
        <p className="text-xs text-muted-foreground">Upload product images. Will be stored in Cloudflare R2.</p>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isNew" className="rounded" />
          <span className="text-sm">New Arrival</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="featured" className="rounded" />
          <span className="text-sm">Featured</span>
        </label>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full h-14 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 tracking-widest text-sm disabled:opacity-50"
      >
        {pending ? "CREATING..." : "CREATE PRODUCT"}
      </Button>
    </form>
  )
}
