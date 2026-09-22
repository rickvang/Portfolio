import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/posts";

export async function getCurrentUser() {
  if (!hasSupabaseConfig()) return null;

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
