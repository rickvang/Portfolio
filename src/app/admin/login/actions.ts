"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import type { PostActionState } from "@/lib/admin";
import { hasSupabaseConfig } from "@/lib/posts";
import { createClient } from "@/lib/supabase/server";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  next: z.string().optional(),
});

export async function signIn(_previousState: PostActionState, formData: FormData): Promise<PostActionState> {
  if (!hasSupabaseConfig()) return { error: "Supabase is not configured for this environment." };

  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next"),
  });

  if (!parsed.success) return { error: "Enter a valid email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { error: "Unable to sign in with those credentials." };

  const nextPath = parsed.data.next?.startsWith("/") && !parsed.data.next.startsWith("//")
    ? parsed.data.next
    : "/admin/posts";
  redirect(nextPath);
}
