import { NextResponse } from "next/server";

import { hasSupabaseConfig } from "@/lib/posts";

export function GET() {
  const supabaseConfigured = hasSupabaseConfig();

  return NextResponse.json({
    checks: {
      app: "available",
      supabase: supabaseConfigured ? "configured" : "not_configured",
    },
    readiness: {
      app: true,
      supabase: supabaseConfigured,
    },
    service: "rickvang.com",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
