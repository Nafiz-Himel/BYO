import mongoose, { Schema } from "mongoose"

const ProductSchema = new Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  sizes: [{ type: String }],
  featured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  details: { type: String },
  sizingGuide: { type: String },
  shipping: { type: String },
}, { timestamps: true, suppressReservedKeysWarning: true })

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)