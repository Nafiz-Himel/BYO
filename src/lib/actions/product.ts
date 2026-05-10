"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { connectDB } from "../mongodb"
import { Product } from "../models/Product"
import { Category } from "../models/Category"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  price: z.coerce.number().positive("Price must be positive"),
  originalPrice: z.coerce.number().optional(),
  description: z.string().min(1, "Description is required"),
  details: z.string().optional(),
  sizingGuide: z.string().optional(),
  shipping: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  isNew: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
})

export async function createProductAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const price = formData.get("price") as string
  const originalPrice = formData.get("originalPrice") as string
  const description = formData.get("description") as string
  const details = formData.get("details") as string
  const sizingGuide = formData.get("sizingGuide") as string
  const shipping = formData.get("shipping") as string
  const category = formData.get("category") as string
  const sizesRaw = formData.get("sizes") as string
  const isNew = formData.get("isNew") === "on"
  const featured = formData.get("featured") === "on"
  const images = formData.getAll("images") as File[]

  const sizes = sizesRaw.split(",").map((s) => s.trim()).filter(Boolean)

  const result = productSchema.safeParse({
    name,
    slug,
    price: price || undefined,
    originalPrice: originalPrice || undefined,
    description,
    details,
    sizingGuide,
    shipping,
    category,
    sizes,
    isNew,
    featured,
  })

  if (!result.success) {
    return { success: false, message: result.error.errors[0].message }
  }

  try {
    await connectDB()

    const cat = await Category.findOne({ slug: category })
    if (!cat) {
      return { success: false, message: "Category not found" }
    }

    const existing = await Product.findOne({ slug })
    if (existing) {
      return { success: false, message: "A product with this slug already exists" }
    }

    const imageUrls: string[] = []

    if (process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET_NAME && process.env.R2_ENDPOINT) {
      const s3 = new S3Client({
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
      })

      for (const image of images) {
        if (image.size > 0) {
          const buffer = Buffer.from(await image.arrayBuffer())
          const key = `products/${slug}-${Date.now()}-${image.name}`

          await s3.send(
            new PutObjectCommand({
              Bucket: process.env.R2_BUCKET_NAME,
              Key: key,
              Body: buffer,
              ContentType: image.type,
            }),
          )

          imageUrls.push(`${process.env.R2_PUBLIC_URL || `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}`}/${key}`)
        }
      }
    }

    await Product.create({
      ...result.data,
      category: cat._id,
      images: imageUrls.length > 0 ? imageUrls : ["/placeholder.svg"],
    })

    revalidatePath("/")
    revalidatePath("/shop")
    revalidatePath(`/products/${slug}`)

    return { success: true, message: "Product created successfully!" }
  } catch (error) {
    console.error("Create product error:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}
