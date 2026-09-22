import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

export function createClient() {
  const { key, url } = getSupabaseConfig();
  return createBrowserClient<Database>(url, key);
}
