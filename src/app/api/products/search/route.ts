import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Product } from "@/lib/models/Product"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  if (!q || q.trim().length === 0) {
    return NextResponse.json({ products: [] })
  }

  try {
    await connectDB()

    const products = await Product.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } },
    )
      .populate("category", "name slug")
      .sort({ score: { $meta: "textScore" } })
      .limit(20)
      .lean()

    const mapped = products.map((product) => {
      const categoryObj = product.category as Record<string, string> | undefined
      const id = (product._id as { toString(): string }).toString()
      return {
        id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice || null,
        description: product.description,
        category: categoryObj?.slug || product.category,
        images: product.images,
      }
    })

    return NextResponse.json({ products: mapped })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ products: [] }, { status: 500 })
  }
}
