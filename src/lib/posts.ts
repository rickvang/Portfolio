import { env } from "@/lib/env";
import { portfolioFixtures } from "@/lib/fixtures";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];

const FIXTURE_TIMESTAMP = "2026-09-20T12:00:00.000Z";

export function hasSupabaseConfig() {
  return Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

function fixturePosts(): Post[] {
  return portfolioFixtures.posts.map((post) => ({
    author_id: null,
    content: post.content,
    created_at: FIXTURE_TIMESTAMP,
    excerpt: post.excerpt,
    id: post.id,
    metadata: {},
    published_at: post.publishedAt,
    slug: post.slug,
    status: post.status,
    title: post.title,
    updated_at: FIXTURE_TIMESTAMP,
  }));
}

export async function getPublishedPosts(): Promise<Post[]> {
  if (!hasSupabaseConfig()) return fixturePosts().filter((post) => post.status === "published");

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

  // The checked-in contract is replaced by CLI-generated types once the local
  // Supabase schema has been started; keep the adapter return type explicit meanwhile.
  return (data ?? []) as Post[];
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  if (!hasSupabaseConfig()) {
    return fixturePosts().find((post) => post.slug === slug && post.status === "published") ?? null;
  }

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
