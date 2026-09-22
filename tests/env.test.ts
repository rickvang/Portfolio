import { describe, expect, it } from "vitest";

import { env, getSupabaseConfig, parseEnv } from "@/lib/env";

describe("environment configuration", () => {
  it("has a safe local default URL", () => {
    expect(env.NEXT_PUBLIC_SITE_URL).toMatch(/^https?:\/\//);
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
