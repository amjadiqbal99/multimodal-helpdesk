import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ChatClient } from "@/components/chat-client"

export default async function ChatPage() {
  const supabase = await getSupabaseServerClient()

  const { data: messages } = await supabase.from("messages").select("*").order("created_at", { ascending: true })

  return <ChatClient initialMessages={messages || []} />
}
