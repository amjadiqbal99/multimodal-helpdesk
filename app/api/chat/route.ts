import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message } = await request.json()

    // Save user message
    await supabase.from("messages").insert({
      user_id: user.id,
      role: "user",
      content: message,
    })

    // Retrieve relevant notes (simple keyword search for RAG)
    const { data: allNotes } = await supabase.from("notes").select("*")

    // Simple relevance scoring based on keyword matching
    const relevantNotes =
      allNotes
        ?.map((note) => {
          const searchTerms = message.toLowerCase().split(" ")
          const noteText = `${note.title} ${note.content}`.toLowerCase()
          const score = searchTerms.filter((term) => noteText.includes(term)).length
          return { ...note, score }
        })
        .filter((note) => note.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3) || []

    // Build context from relevant notes
    const context =
      relevantNotes.length > 0
        ? `Here are some relevant notes from the user's knowledge base:\n\n${relevantNotes
            .map((note) => `Title: ${note.title}\nContent: ${note.content}`)
            .join("\n\n")}`
        : "No relevant notes found in the user's knowledge base."

    // Generate AI response
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant that answers questions based on the user's notes. 
Use the provided context to answer questions accurately. If the context doesn't contain relevant information, 
say so and provide a general helpful response. Be concise and friendly.`,
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${message}`,
        },
      ],
    })

    // Save assistant message with sources
    await supabase.from("messages").insert({
      user_id: user.id,
      role: "assistant",
      content: text,
      sources: relevantNotes.map((note) => ({
        title: note.title,
        content: note.content.substring(0, 200),
      })),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in chat:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
