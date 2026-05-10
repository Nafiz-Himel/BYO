import { cache } from "react"
import { connectDB } from "./mongodb"
import { Product } from "./models/Product"
import { Category } from "./models/Category"
import type { Product as ProductType, Collection } from "./mock-data"

export const getFeaturedProducts = cache(async (limit = 6): Promise<ProductType[]> => {
  try {
    await connectDB()
    const products = await Product.find({ featured: true })
      .populate("category", "name slug")
      .limit(limit)
      .lean()

    return products.map(mapProduct)
  } catch (e) {
    console.error("getFeaturedProducts error:", e)
    return []
  }
})

export const getProductBySlug = cache(async (slug: string): Promise<ProductType | null> => {
  try {
    await connectDB()
    const product = await Product.findOne({ slug }).populate("category", "name slug").lean()
    if (!product) return null
    return mapProduct(product)
  } catch (e) {
    console.error("getProductBySlug error:", e)
    return null
  }
})

export const getProducts = cache(
  async ({
    category,
    sizes,
    minPrice,
    maxPrice,
    sortBy,
    page = 1,
    limit = 9,
    search,
  }: {
    category?: string
    sizes?: string[]
    minPrice?: number
    maxPrice?: number
    sortBy?: string
    page?: number
    limit?: number
    search?: string
  } = {}): Promise<{ products: ProductType[]; total: number; totalPages: number }> => {
    try {
      await connectDB()

      const filter: Record<string, unknown> = {}

      if (category && category !== "all") {
        const cat = await Category.findOne({ slug: category }).lean()
        if (cat) filter.category = cat._id
      }

      if (sizes && sizes.length > 0) {
        filter.sizes = { $in: sizes }
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        const priceFilter: Record<string, number> = {}
        if (minPrice !== undefined) priceFilter.$gte = minPrice
        if (maxPrice !== undefined) priceFilter.$lte = maxPrice
        filter.price = priceFilter
      }

      if (search) {
        filter.$text = { $search: search }
      }

      let sort: Record<string, 1 | -1> = { createdAt: -1 }
      switch (sortBy) {
        case "price-asc":
          sort = { price: 1 }
          break
        case "price-desc":
          sort = { price: -1 }
          break
        case "name":
          sort = { name: 1 }
          break
        case "newest":
        default:
          sort = { createdAt: -1 }
          break
      }

      const skip = (page - 1) * limit

      const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
          .populate("category", "name slug")
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
      ])

      return {
        products: products.map(mapProduct),
        total,
        totalPages: Math.ceil(total / limit),
      }
    } catch (e) {
      console.error("getProducts error:", e)
      return { products: [], total: 0, totalPages: 0 }
    }
  },
)

export const getCollections = cache(async (): Promise<Collection[]> => {
  try {
    await connectDB()
    const categories = await Category.find({}).lean()
    const images = [
      "/luxury-autumn-fashion-collection-dark-moody.jpg",
      "/minimalist-luxury-fashion-white-clean-aesthetic.jpg",
      "/urban-luxury-streetwear-fashion-dark-elegant.jpg",
    ]

    return categories.map((cat, i) => ({
      id: (cat._id as { toString(): string }).toString(),
      name: cat.name + " Collection",
      subtitle: `Explore our ${cat.name.toLowerCase()} collection`,
      image: images[i % images.length],
      slug: cat.slug as string,
    }))
  } catch (e) {
    console.error("getCollections error:", e)
    return []
  }
})

export const getAllProducts = cache(async (): Promise<ProductType[]> => {
  try {
    await connectDB()
    const products = await Product.find({}).populate("category", "name slug").lean()
    return products.map(mapProduct)
  } catch (e) {
    console.error("getAllProducts error:", e)
    return []
  }
})

export const getCategories = cache(async () => {
  try {
    await connectDB()
    const cats = await Category.find({}).lean()
    return [
      { value: "all", label: "All Categories" },
      ...cats.map((c) => ({ value: c.slug as string, label: c.name as string })),
    ]
  } catch (e) {
    console.error("getCategories error:", e)
    return [{ value: "all", label: "All Categories" }]
  }
})

function mapProduct(product: Record<string, unknown>): ProductType {
  const categoryObj = product.category as Record<string, string> | undefined
  const id = (product._id as { toString(): string }).toString()
  return {
    id,
    name: product.name as string,
    slug: product.slug as string,
    price: product.price as number,
    originalPrice: product.originalPrice as number | undefined,
    description: product.description as string,
    details: (product.details as string) || "",
    sizingGuide: (product.sizingGuide as string) || "",
    shipping: (product.shipping as string) || "",
    category: (categoryObj?.slug as ProductType["category"]) || (product.category as string),
    sizes: product.sizes as string[],
    images: product.images as string[],
    featured: (product.featured as boolean) || false,
    isNew: (product.isNew as boolean) || false,
  }
}
