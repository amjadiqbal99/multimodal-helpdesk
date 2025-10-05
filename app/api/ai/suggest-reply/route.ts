import { NextResponse } from "next/server"
import { redactPII } from "@/lib/mock"

export async function POST(request: Request) {
  try {
    const { ticketId, tone, includeCitations, citedIds, piiRedaction } = await request.json()

    // TODO: Implement real AI reply generation using AI SDK
    // const { text } = await generateText({
    //   model: "openai/gpt-4.1",
    //   prompt: `Generate a ${tone} support reply...`,
    // })

    let draft = `Hi Sarah,\n\nThank you for reaching out. I understand how frustrating login issues can be, especially when you have an important meeting coming up.\n\nI've reviewed your account and found that there was a temporary issue with our authentication service that may have affected your login attempts. I've reset your session on our end.\n\nPlease try the following steps:\n1. Clear your browser cache and cookies\n2. Use the password reset link I've sent to your email\n3. Try logging in with the new password\n\nIf you're still experiencing issues, please let me know immediately and I'll escalate this to our engineering team.\n\nBest regards,\nAlex`

    if (piiRedaction) {
      draft = redactPII(draft)
    }

    const citations = includeCitations
      ? [
          { id: "TKT-089", title: "Login issues after password reset" },
          { id: "TKT-067", title: "Authentication error on dashboard" },
        ]
      : []

    return NextResponse.json({ draft, citations })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 })
  }
}
