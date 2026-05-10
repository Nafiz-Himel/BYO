"use server"

import { z } from "zod"
import { headers } from "next/headers"
import { connectDB } from "../mongodb"
import { Newsletter } from "../models/Newsletter"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function subscribeToNewsletter(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string

  const result = newsletterSchema.safeParse({ email })
  if (!result.success) {
    return { success: false, message: result.error.errors[0].message }
  }

  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"

    await connectDB()

    const existing = await Newsletter.findOne({ email: result.data.email })
    if (existing) {
      return { success: false, message: "This email is already subscribed." }
    }

    await Newsletter.create({
      email: result.data.email,
      ip,
    })

    return { success: true, message: "Thank you! You've been subscribed." }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}
