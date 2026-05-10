export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  description: string
  details: string
  sizingGuide: string
  shipping: string
  category: "shirts" | "trousers" | "outerwear" | "accessories"
  sizes: string[]
  images: string[]
  featured: boolean
  isNew: boolean
}

export interface Collection {
  id: string
  name: string
  subtitle: string
  image: string
  slug: string
}

export const collections: Collection[] = [
  {
    id: "1",
    name: "Autumn Essence",
    subtitle: "Embrace the season's warmth",
    image: "/luxury-autumn-fashion-collection-dark-moody.jpg",
    slug: "autumn-essence",
  },
  {
    id: "2",
    name: "Minimal Form",
    subtitle: "Purity in design",
    image: "/minimalist-luxury-fashion-white-clean-aesthetic.jpg",
    slug: "minimal-form",
  },
  {
    id: "3",
    name: "Urban Edge",
    subtitle: "Contemporary sophistication",
    image: "/urban-luxury-streetwear-fashion-dark-elegant.jpg",
    slug: "urban-edge",
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Cashmere Blend Overcoat",
    slug: "cashmere-blend-overcoat",
    price: 1250,
    originalPrice: 1500,
    description:
      "A timeless overcoat crafted from the finest Italian cashmere blend. Features a clean silhouette with notched lapels and a single-breasted closure.",
    details: "80% Cashmere, 20% Wool. Fully lined with silk. Horn buttons. Made in Italy. Dry clean only.",
    sizingGuide:
      "Model is 6'1\" wearing size M. Fits true to size with room for layering. Refer to our size chart for exact measurements.",
    shipping:
      "Complimentary shipping on all orders. Estimated delivery: 3-5 business days. Express shipping available.",
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/luxury-cashmere-overcoat-camel-elegant.jpg",
      "/luxury-cashmere-overcoat-back-view.jpg",
      "/luxury-cashmere-overcoat-detail.jpg",
    ],
    featured: true,
    isNew: false,
  },
  {
    id: "2",
    name: "Silk Twill Shirt",
    slug: "silk-twill-shirt",
    price: 485,
    description:
      "Luxurious silk twill shirt with a relaxed fit. Features mother-of-pearl buttons and French seams throughout.",
    details: "100% Mulberry Silk. Mother-of-pearl buttons. French seam construction. Hand wash or dry clean.",
    sizingGuide: "Model is 5'10\" wearing size S. Relaxed fit, consider sizing down for a more fitted look.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/luxury-silk-shirt-ivory-elegant-minimal.jpg",
      "/luxury-silk-shirt-detail-collar.jpg",
      "/luxury-silk-shirt-cuff-detail.jpg",
    ],
    featured: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Wool Tailored Trousers",
    slug: "wool-tailored-trousers",
    price: 595,
    description: "Impeccably tailored trousers in premium Italian wool. Features a high-rise waist and pleated front.",
    details: "100% Virgin Wool. Full lining. Side and back pockets. Made in Italy. Dry clean only.",
    sizingGuide: "Model is 6'0\" wearing size 32. Fits true to size. Available in regular and long inseams.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "trousers",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/luxury-wool-trousers-charcoal-tailored-elegant.jpg",
      "/luxury-wool-trousers-detail-waist.jpg",
      "/luxury-wool-trousers-side-view.jpg",
    ],
    featured: true,
    isNew: false,
  },
  {
    id: "4",
    name: "Leather Tote Bag",
    slug: "leather-tote-bag",
    price: 890,
    description: "Handcrafted leather tote in buttery soft calfskin. Spacious interior with multiple compartments.",
    details: "100% Calfskin Leather. Cotton twill lining. Brass hardware. Interior zip pocket. Made in Spain.",
    sizingGuide: 'Dimensions: 15"W x 12"H x 5"D. Strap drop: 10".',
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "accessories",
    sizes: ["One Size"],
    images: [
      "/luxury-leather-tote-bag-black-minimalist.jpg",
      "/luxury-leather-tote-bag-interior.jpg",
      "/luxury-leather-tote-bag-detail.jpg",
    ],
    featured: true,
    isNew: false,
  },
  {
    id: "5",
    name: "Merino Knit Sweater",
    slug: "merino-knit-sweater",
    price: 425,
    description: "Fine-gauge merino wool sweater with a contemporary crew neck. Perfect for layering.",
    details: "100% Extra-fine Merino Wool. 12-gauge knit. Ribbed cuffs and hem. Hand wash recommended.",
    sizingGuide: "Model is 5'11\" wearing size M. Relaxed fit.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-merino-sweater-charcoal.jpg", "/luxury-merino-sweater-detail.jpg", "/luxury-merino-sweater-styled.jpg"],
    featured: true,
    isNew: true,
  },
  {
    id: "6",
    name: "Linen Relaxed Shirt",
    slug: "linen-relaxed-shirt",
    price: 345,
    description: "Breathable pure linen shirt with a relaxed silhouette. Features a camp collar and patch pocket.",
    details: "100% Belgian Linen. Coconut shell buttons. Enzyme washed for softness. Machine washable.",
    sizingGuide: "Model is 6'0\" wearing size M. Oversized fit, consider sizing down for regular fit.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "shirts",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-linen-shirt-white-minimal.jpg", "/luxury-linen-shirt-collar-detail.jpg", "/luxury-linen-shirt-styled.jpg"],
    featured: true,
    isNew: false,
  },
  {
    id: "7",
    name: "Cotton Chino Trousers",
    slug: "cotton-chino-trousers",
    price: 295,
    description: "Classic chino trousers in premium stretch cotton. Features a slim fit with tapered leg.",
    details: "98% Cotton, 2% Elastane. Slant pockets. Button-through back pockets. Machine washable.",
    sizingGuide: "Model is 6'1\" wearing size 32. Slim fit with slight stretch for comfort.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "trousers",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-chino-trousers-navy-elegant.jpg", "/luxury-chino-trousers-detail-waist.jpg", "/luxury-chino-trousers-styled.jpg"],
    featured: false,
    isNew: false,
  },
  {
    id: "8",
    name: "Wool Blazer",
    slug: "wool-blazer",
    price: 895,
    description: "Refined single-breasted blazer in Super 120s wool. Features natural shoulder construction.",
    details: "100% Super 120s Wool. Half-canvassed construction. Bemberg lining. Horn buttons. Made in Italy.",
    sizingGuide: "Model is 6'0\" wearing size 40R. Fits true to size.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-wool-blazer-navy-elegant.jpg", "/luxury-wool-blazer-lapel-detail.jpg", "/luxury-wool-blazer-styled.jpg"],
    featured: false,
    isNew: true,
  },
  {
    id: "9",
    name: "Leather Belt",
    slug: "leather-belt",
    price: 245,
    description: "Hand-stitched leather belt with a minimalist brushed silver buckle.",
    details: "100% Full-grain Leather. Brushed sterling silver buckle. Hand-stitched. Made in Spain.",
    sizingGuide: "Available in sizes 30-42. Measure your waist where you typically wear your pants.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "accessories",
    sizes: ["S", "M", "L", "XL"],
    images: ["/luxury-leather-belt-black-minimal.jpg", "/luxury-leather-belt-buckle-detail.jpg", "/luxury-leather-belt-coiled.jpg"],
    featured: false,
    isNew: false,
  },
  {
    id: "10",
    name: "Quilted Vest",
    slug: "quilted-vest",
    price: 650,
    description: "Lightweight quilted vest with premium goose down fill. Perfect for transitional weather.",
    details: "Outer: 100% Nylon. Fill: 90% Goose Down, 10% Feather. Snap closure. Machine washable.",
    sizingGuide: "Model is 5'11\" wearing size M. Regular fit.",
    shipping: "Complimentary shipping on all orders. Estimated delivery: 3-5 business days.",
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    featured: false,
    isNew: false,
  },
]

export const categories = [
  { value: "all", label: "All Categories" },
  { value: "shirts", label: "Shirts" },
  { value: "trousers", label: "Trousers" },
  { value: "outerwear", label: "Outerwear" },
  { value: "accessories", label: "Accessories" },
] as const

export const sizes = ["S", "M", "L", "XL"] as const

export const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
] as const
