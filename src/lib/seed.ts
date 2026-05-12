import { config } from "dotenv"
config({ path: ".env.local" })

import { connectDB } from "./mongodb"
import { Product } from "./models/Product"
import { Category } from "./models/Category"

const categories = [
  { name: "Shirts", slug: "shirts" },
  { name: "Trousers", slug: "trousers" },
  { name: "Outerwear", slug: "outerwear" },
  { name: "Accessories", slug: "accessories" },
]

const products = [
  {
    name: "Cashmere Blend Overcoat",
    slug: "cashmere-blend-overcoat",
    price: 1250,
    originalPrice: 1500,
    description: "A timeless overcoat crafted from the finest Italian cashmere blend.",
    details: "80% Cashmere, 20% Wool. Fully lined with silk. Horn buttons. Made in Italy.",
    sizingGuide: "Model is 6'1\" wearing size M. Fits true to size with room for layering.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-cashmere-overcoat-camel-elegant.jpg"],
    featured: true,
    isNew: false,
  },
  {
    name: "Silk Twill Shirt",
    slug: "silk-twill-shirt",
    price: 485,
    description: "Luxurious silk twill shirt with a relaxed fit.",
    details: "100% Mulberry Silk. Mother-of-pearl buttons.",
    sizingGuide: "Model is 5'10\" wearing size S.",
    shipping: "Complimentary shipping on all orders.",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-silk-shirt-ivory-elegant-minimal.jpg"],
    featured: true,
    isNew: true,
  },
  {
    name: "Wool Tailored Trousers",
    slug: "wool-tailored-trousers",
    price: 595,
    description: "Impeccably tailored trousers in premium Italian wool.",
    details: "100% Virgin Wool. Full lining. Made in Italy.",
    sizingGuide: "Model is 6'0\" wearing size 32.",
    shipping: "Complimentary shipping on all orders.",
    category: "trousers",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-wool-trousers-charcoal-tailored-elegant.jpg"],
    featured: true,
    isNew: false,
  },
  {
    name: "Leather Tote Bag",
    slug: "leather-tote-bag",
    price: 890,
    description: "Handcrafted leather tote in buttery soft calfskin.",
    details: "100% Calfskin Leather. Brass hardware. Made in Spain.",
    sizingGuide: "Dimensions: 15\"W x 12\"H x 5\"D.",
    shipping: "Complimentary shipping on all orders.",
    category: "accessories",
    sizes: ["One Size"],
    images: ["/luxury-leather-tote-bag-black-minimalist.jpg"],
    featured: true,
    isNew: false,
  },
  {
    name: "Merino Knit Sweater",
    slug: "merino-knit-sweater",
    price: 425,
    description: "Fine-gauge merino wool sweater with a contemporary crew neck.",
    details: "100% Extra-fine Merino Wool. 12-gauge knit.",
    sizingGuide: "Model is 5'11\" wearing size M.",
    shipping: "Complimentary shipping on all orders.",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-merino-sweater-charcoal.jpg"],
    featured: true,
    isNew: true,
  },
  {
    name: "Linen Relaxed Shirt",
    slug: "linen-relaxed-shirt",
    price: 345,
    description: "Breathable pure linen shirt with a relaxed silhouette.",
    details: "100% Belgian Linen. Coconut shell buttons.",
    sizingGuide: "Model is 6'0\" wearing size M. Oversized fit.",
    shipping: "Complimentary shipping on all orders.",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-linen-shirt-white-minimal.jpg"],
    featured: true,
    isNew: false,
  },
  {
    name: "Cotton Chino Trousers",
    slug: "cotton-chino-trousers",
    price: 295,
    description: "Classic chino trousers in premium stretch cotton.",
    details: "98% Cotton, 2% Elastane.",
    sizingGuide: "Model is 6'1\" wearing size 32.",
    shipping: "Complimentary shipping on all orders.",
    category: "trousers",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-chino-trousers-navy-elegant.jpg"],
    featured: false,
    isNew: false,
  },
  {
    name: "Wool Blazer",
    slug: "wool-blazer",
    price: 895,
    description: "Refined single-breasted blazer in Super 120s wool.",
    details: "100% Super 120s Wool. Half-canvassed construction. Made in Italy.",
    sizingGuide: "Model is 6'0\" wearing size 40R.",
    shipping: "Complimentary shipping on all orders.",
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-wool-blazer-navy-elegant.jpg"],
    featured: false,
    isNew: true,
  },
  {
    name: "Leather Belt",
    slug: "leather-belt",
    price: 245,
    description: "Hand-stitched leather belt with a minimalist brushed silver buckle.",
    details: "100% Full-grain Leather. Brushed sterling silver buckle.",
    sizingGuide: "Available in sizes 30-42.",
    shipping: "Complimentary shipping on all orders.",
    category: "accessories",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-leather-belt-black-minimal.jpg"],
    featured: false,
    isNew: false,
  },
  {
    name: "Quilted Vest",
    slug: "quilted-vest",
    price: 650,
    description: "Lightweight quilted vest with premium goose down fill.",
    details: "Outer: 100% Nylon. Fill: 90% Goose Down, 10% Feather.",
    sizingGuide: "Model is 5'11\" wearing size M.",
    shipping: "Complimentary shipping on all orders.",
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    images: ["/placeholder.svg"],
    featured: false,
    isNew: false,
  },
]

async function seed() {
  await connectDB()
  console.log("Connected to MongoDB")

  await Category.deleteMany({})
  await Product.deleteMany({})
  console.log("Cleared old data")

  const createdCategories = await Category.insertMany(categories)
  console.log("Categories inserted")

  const categoryMap = new Map(
    createdCategories.map((c) => [c.slug, c._id])
  )

  const productsWithCategory = products.map((p) => ({
    ...p,
    category: categoryMap.get(p.category),
  }))

  await Product.insertMany(productsWithCategory)
  console.log("Products inserted")

  try {
    await Product.collection.createIndex({ name: "text" })
    console.log("Text index on 'name' created for search")
  } catch (e) {
    console.log("Text index may already exist:", e)
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
