import { describe, expect, it } from "vitest";

import { env, getSupabaseConfig, parseEnv } from "@/lib/env";

describe("environment configuration", () => {
  it("has a safe local default URL", () => {
    expect(env.NEXT_PUBLIC_SITE_URL).toMatch(/^https?:\/\//);
  });

  it("normalizes blank optional Vercel values to safe fallbacks", () => {
    const configured = parseEnv({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "   ",
      NEXT_PUBLIC_SUPABASE_URL: "",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: " ",
      VERCEL_PROJECT_PRODUCTION_URL: "portfolio-acme-dd4d.vercel.app",
    });

    expect(configured.NEXT_PUBLIC_SITE_URL).toBe("https://portfolio-acme-dd4d.vercel.app");
    expect(configured.NEXT_PUBLIC_SUPABASE_URL).toBeUndefined();
    expect(configured.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).toBeUndefined();
  });

  it("keeps invalid non-empty URLs visible as configuration errors", () => {
    expect(() =>
      parseEnv({
        NODE_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "not-a-url",
        NEXT_PUBLIC_SUPABASE_URL: "also-not-a-url",
      }),
    ).toThrowError(/Invalid environment configuration/);
  });

  it("retains the public Supabase configuration when it is provided", () => {
    const configured = parseEnv({
      NODE_ENV: "test",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_fixture",
    });

    expect(configured.NEXT_PUBLIC_SUPABASE_URL).toBe("https://example.supabase.co");
    expect(getSupabaseConfig(configured)).toEqual({
      key: "sb_publishable_fixture",
      url: "https://example.supabase.co",
    });
    expect(() =>
      getSupabaseConfig(
        parseEnv({
          NODE_ENV: "test",
          NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
        }),
      ),
    ).toThrowError(/Supabase is not configured/);
  });
});
