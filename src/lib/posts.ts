import { env } from "@/lib/env";
import {
  getPublishedEditorialNoteBySlug,
  getPublishedEditorialNotes,
  type EditorialDraft,
} from "@/lib/editorial-drafts";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];

export type PublishedPostSection = {
  id: string;
  heading: string;
  body: string[];
};

export type PublishedPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string[];
  status: "published";
  publishedAt: string | null;
  source: "source-controlled" | "supabase";
  sections: PublishedPostSection[];
};

function splitPostContent(content: string) {
  return content
    .split(/\n\s*\n|\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function editorialToPublishedPost(draft: EditorialDraft): PublishedPost {
  return {
    id: draft.id,
    slug: draft.slug,
    title: draft.title,
    excerpt: draft.excerpt,
    content: draft.intro,
    status: "published",
    publishedAt: draft.publishedOn ? `${draft.publishedOn}T00:00:00.000Z` : null,
    source: "source-controlled",
    sections: draft.sections.map((section) => ({
      id: section.id,
      heading: section.heading,
      body: section.body,
    })),
  };
}

function supabaseToPublishedPost(post: Post): PublishedPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: splitPostContent(post.content),
    status: "published",
    publishedAt: post.published_at,
    source: "supabase",
    sections: [],
  };
}

function sortPublishedPosts(posts: PublishedPost[]) {
  return posts.sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bTime - aTime;
  });
}

export function hasSupabaseConfig() {
  return process.env.E2E_USE_FIXTURES !== "true" && Boolean(
    env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export async function getPublishedPosts(): Promise<PublishedPost[]> {
  const authored = getPublishedEditorialNotes().map(editorialToPublishedPost);

  if (!hasSupabaseConfig()) return sortPublishedPosts(authored);

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

  const databasePosts = ((data ?? []) as Post[]).map(supabaseToPublishedPost);
  return sortPublishedPosts([...authored, ...databasePosts]);
}

export async function getPublishedPostBySlug(slug: string): Promise<PublishedPost | null> {
  const authored = getPublishedEditorialNoteBySlug(slug);
  if (authored) return editorialToPublishedPost(authored);

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

  return data ? supabaseToPublishedPost(data as Post) : null;
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
