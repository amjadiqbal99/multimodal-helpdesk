import { getSupabaseServerClient } from "@/lib/supabase/server"
import { NotesClient } from "@/components/notes-client"

export default async function NotesPage() {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return <NotesClient initialNotes={[]} />
  }

  const { data: notes } = await supabase.from("notes").select("*").order("updated_at", { ascending: false })

  return <NotesClient initialNotes={notes || []} />
}
