import { getSupabaseServerClient } from "@/lib/supabase/server"
import { SettingsClient } from "@/components/settings-client"

export default async function SettingsPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <SettingsClient user={user!} />
}
