import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];

export function hasSupabaseConfig() {
  return process.env.E2E_USE_FIXTURES !== "true" && Boolean(
    env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export async function getPublishedPosts(): Promise<Post[]> {
  if (!hasSupabaseConfig()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load published posts: ${error.message}`);
  }

  return (data ?? []) as Post[];
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  if (!hasSupabaseConfig()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load published post: ${error.message}`);
  }

  return data as Post | null;
}

export async function getAuthorPosts(authorId: string): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", authorId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load author posts: ${error.message}`);
  }

  return (data ?? []) as Post[];
}

export async function getAuthorPost(postId: string, authorId: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("author_id", authorId)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load author post: ${error.message}`);
  }

  return data as Post | null;
}
