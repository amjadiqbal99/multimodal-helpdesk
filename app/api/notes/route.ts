import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

let mockNotes: Array<{
  id: string
  user_id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}> = [
  {
    id: "1",
    user_id: "mock-user",
    title: "Welcome to AI Notes",
    content: "This is a demo note. Connect Supabase to persist your notes to a database.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json(mockNotes)
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: notes, error } = await supabase.from("notes").select("*").order("updated_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(notes)
  } catch (error) {
    console.error("[v0] Error fetching notes:", error)
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()
    const { title, content } = await request.json()

    if (!supabase) {
      const newNote = {
        id: Date.now().toString(),
        user_id: "mock-user",
        title,
        content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockNotes.unshift(newNote)
      return NextResponse.json(newNote)
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: note, error } = await supabase
      .from("notes")
      .insert({
        user_id: user.id,
        title,
        content,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(note)
  } catch (error) {
    console.error("[v0] Error creating note:", error)
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()
    const { id, title, content } = await request.json()

    if (!supabase) {
      const noteIndex = mockNotes.findIndex((n) => n.id === id)
      if (noteIndex !== -1) {
        mockNotes[noteIndex] = {
          ...mockNotes[noteIndex],
          title,
          content,
          updated_at: new Date().toISOString(),
        }
        return NextResponse.json(mockNotes[noteIndex])
      }
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: note, error } = await supabase.from("notes").update({ title, content }).eq("id", id).select().single()

    if (error) throw error

    return NextResponse.json(note)
  } catch (error) {
    console.error("[v0] Error updating note:", error)
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()
    const { id } = await request.json()

    if (!supabase) {
      mockNotes = mockNotes.filter((n) => n.id !== id)
      return NextResponse.json({ success: true })
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase.from("notes").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting note:", error)
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
  }
}
