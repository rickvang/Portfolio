import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("NEXT_PUBLIC_SITE_URL must be a valid URL")
    .default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL").optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY cannot be empty").optional(),
});

function optionalEnvValue(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function vercelSiteUrl(input: NodeJS.ProcessEnv) {
  const hostname =
    optionalEnvValue(input.VERCEL_PROJECT_PRODUCTION_URL) ??
    optionalEnvValue(input.VERCEL_URL);

  if (!hostname) return undefined;
  return /^https?:\/\//.test(hostname) ? hostname : `https://${hostname}`;
}

export function parseEnv(input: NodeJS.ProcessEnv) {
  const parsed = envSchema.safeParse({
    NODE_ENV: input.NODE_ENV,
    NEXT_PUBLIC_SITE_URL:
      optionalEnvValue(input.NEXT_PUBLIC_SITE_URL) ?? vercelSiteUrl(input),
    NEXT_PUBLIC_SUPABASE_URL: optionalEnvValue(input.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optionalEnvValue(input.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  });

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return parsed.data;
}

export const env = parseEnv(process.env);

export function getSupabaseConfig(config = env) {
  const { NEXT_PUBLIC_SUPABASE_URL: url, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key } = config;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local.",
    );
  }

  return { key, url };
}
