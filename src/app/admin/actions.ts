"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import type { PostActionState } from "@/lib/admin";
import { hasSupabaseConfig } from "@/lib/posts";
import { createClient } from "@/lib/supabase/server";

const postSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().max(300),
  content: z.string().trim().min(1),
});

async function requireAuthor() {
  if (!hasSupabaseConfig()) return { error: "Supabase is not configured for this environment." } as const;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return { error: "You must be signed in to manage posts." } as const;

  return { supabase, user: data.user } as const;
}

function readPostFields(formData: FormData) {
  return postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") ?? "",
    content: formData.get("content"),
  });
}

export async function createPost(_previousState: PostActionState, formData: FormData): Promise<PostActionState> {
  const author = await requireAuthor();
  if ("error" in author) return author;

  const parsed = readPostFields(formData);
  if (!parsed.success) return { error: "Use a title, a lowercase hyphenated slug, and non-empty content." };

  const { data, error } = await author.supabase
    .from("posts")
    .insert({
      author_id: author.user.id,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt || null,
      slug: parsed.data.slug,
      status: "draft",
      title: parsed.data.title,
    })
    .select("id")
    .single();

  if (error || !data) return { error: "Unable to create the draft. Check the slug and try again." };

  redirect(`/admin/posts/${data.id}/edit`);
}

export async function updatePost(_previousState: PostActionState, formData: FormData): Promise<PostActionState> {
  const author = await requireAuthor();
  if ("error" in author) return author;

  const id = z.string().uuid().safeParse(formData.get("id"));
  const parsed = readPostFields(formData);
  if (!id.success || !parsed.success) return { error: "The post details are invalid." };

  const { data, error } = await author.supabase
    .from("posts")
    .update({
      content: parsed.data.content,
      excerpt: parsed.data.excerpt || null,
      slug: parsed.data.slug,
      title: parsed.data.title,
    })
    .eq("id", id.data)
    .eq("author_id", author.user.id)
    .select("id")
    .maybeSingle();

  if (error || !data) return { error: "Unable to save the post. Check the slug and try again." };

  redirect(`/admin/posts/${data.id}/edit`);
}
