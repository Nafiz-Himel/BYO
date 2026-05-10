import mongoose, { Schema } from "mongoose"

const NewsletterSchema = new Schema({
  email: { type: String, required: true, unique: true },
  ip: { type: String },
}, { timestamps: true })

export const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", NewsletterSchema)