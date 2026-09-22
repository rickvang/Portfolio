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
      overall: supabaseConfigured,
      supabase: supabaseConfigured,
    },
    service: "rickvang.com",
    status: supabaseConfigured ? "ready" : "degraded",
    timestamp: new Date().toISOString(),
  });
}
