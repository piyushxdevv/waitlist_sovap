"use server"

import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function joinWaitlist(email: string) {
  try {
    const supabase = await createClient()

    const fromEmail = process.env.RESEND_FROM_EMAIL

    if (!fromEmail || fromEmail === "onboarding@resend.dev") {
      console.error("[v0] RESEND_FROM_EMAIL is not configured properly!")
      console.error("[v0] Current value:", fromEmail || "NOT SET")
      console.error(
        "[v0] Please set RESEND_FROM_EMAIL to an email from your verified domain (e.g., noreply@yourdomain.com)",
      )
    }

    // Insert email into waitlist
    const { data, error } = await supabase.from("waitlist").insert({ email }).select().single()

    if (error) {
      if (error.code === "23505") {
        return {
          success: true,
          message: "You're already on the waitlist! We'll notify you when we launch.",
        }
      }
      throw error
    }

    let emailSent = false
    try {
      if (!fromEmail || fromEmail === "onboarding@resend.dev") {
        throw new Error(
          "RESEND_FROM_EMAIL environment variable is not set to a verified domain email. " +
            "Please add RESEND_FROM_EMAIL in Project Settings with an email from your verified domain.",
        )
      }

      console.log("[v0] Attempting to send email to:", email)
      console.log("[v0] Using from address:", fromEmail)

      const result = await resend.emails.send({
        from: `SOVAP Team <${fromEmail}>`,
        to: email,
        subject: "Welcome to SOVAP - Your Cybersecurity Journey Begins! 🛡️",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #111827; font-size: 28px; margin-bottom: 8px;">Welcome to SOVAP!</h1>
              <p style="color: #6B7280; font-size: 14px; margin: 0;">Your Personalized AI Tutor for Cybersecurity</p>
            </div>
            
            <div style="background: #F9FAFB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #111827; font-size: 20px; margin-top: 0; margin-bottom: 16px;">You're on the waitlist! 🎉</h2>
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
                Thank you for joining SOVAP. We're excited to help you on your journey from beginner to cybersecurity engineer.
              </p>
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin: 0;">
                Our AI-powered platform will provide you with personalized learning paths, hands-on labs, and career guidance tailored to your goals.
              </p>
            </div>

            <div style="margin-bottom: 24px;">
              <h3 style="color: #111827; font-size: 18px; margin-bottom: 12px;">What to expect:</h3>
              <ul style="color: #4B5563; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                <li>Adaptive learning that matches your pace and skill level</li>
                <li>Safe, hands-on practice in ethical hacking & penetration testing</li>
                <li>Preparation for top certifications (CEH, OSCP, CISSP)</li>
                <li>24/7 AI mentor to answer your cybersecurity questions</li>
              </ul>
            </div>

            <div style="background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
              <p style="color: #1E40AF; font-size: 14px; margin: 0; line-height: 1.5;">
                <strong>Stay tuned!</strong> We'll notify you as soon as we launch. Get ready to accelerate your cybersecurity career.
              </p>
            </div>

            <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; margin-top: 32px;">
              <p style="color: #6B7280; font-size: 14px; margin: 0;">
                Best regards,<br/>
                <strong style="color: #111827;">The SOVAP Team</strong>
              </p>
              <p style="color: #9CA3AF; font-size: 12px; margin-top: 16px;">
                Questions? Reply to this email - we'd love to hear from you!
              </p>
            </div>
          </div>
        `,
      })

      console.log("[v0] Email sent successfully:", result)
      emailSent = true

      // Update the database to mark as notified
      const { error: updateError } = await supabase.from("waitlist").update({ notified: true }).eq("id", data.id)

      if (updateError) {
        console.error("[v0] Failed to update notified status:", updateError)
      } else {
        console.log("[v0] Successfully updated notified status for:", email)
      }
    } catch (emailError: any) {
      console.error("[v0] Failed to send email:", emailError)
      console.error("[v0] Error message:", emailError?.message)
      console.error(
        "[v0] If you see a 403 error, make sure RESEND_FROM_EMAIL is set to an email from your verified domain",
      )

      // Still return success since the email was saved to the database
      return {
        success: true,
        message: "Successfully joined the waitlist! (Email notification pending - please configure RESEND_FROM_EMAIL)",
      }
    }

    return {
      success: true,
      message: emailSent
        ? "Successfully joined the waitlist! Check your email for confirmation."
        : "Successfully joined the waitlist!",
    }
  } catch (error) {
    console.error("[v0] Error joining waitlist:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}

export async function getWaitlistCount() {
  try {
    const supabase = await createClient()

    const { count, error } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

    if (error) throw error

    return { count: count || 0 }
  } catch (error) {
    console.error("[v0] Error getting waitlist count:", error)
    return { count: 0 }
  }
}
