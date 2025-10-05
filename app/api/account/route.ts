import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function DELETE() {
  try {
    const supabase = await getSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete user's notes (cascades to embeddings via foreign key)
    await supabase.from("notes").delete().eq("user_id", user.id)

    // Delete user's messages
    await supabase.from("messages").delete().eq("user_id", user.id)

    // Note: Deleting the auth user requires admin privileges
    // In production, you would call a Supabase Edge Function or admin API
    // For now, we'll just delete the user's data

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting account:", error)
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 })
  }
}
