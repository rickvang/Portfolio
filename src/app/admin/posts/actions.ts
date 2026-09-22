"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import type { PostActionState } from "@/lib/admin";
import { hasSupabaseConfig } from "@/lib/posts";
import { createClient } from "@/lib/supabase/server";

const statusSchema = z.enum(["draft", "published", "archived"]);

async function requireAuthor() {
  if (!hasSupabaseConfig()) return { error: "Supabase is not configured for this environment." } as const;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return { error: "You must be signed in to manage posts." } as const;

  return { supabase, user: data.user } as const;
}

export async function setPostStatus(_previousState: PostActionState, formData: FormData): Promise<PostActionState> {
  const author = await requireAuthor();
  if ("error" in author) return author;

  const id = z.string().uuid().safeParse(formData.get("id"));
  const status = statusSchema.safeParse(formData.get("status"));
  if (!id.success || !status.success) return { error: "The post status is invalid." };

  const { error } = await author.supabase
    .from("posts")
    .update({
      published_at: status.data === "published" ? new Date().toISOString() : null,
      status: status.data,
    })
    .eq("id", id.data)
    .eq("author_id", author.user.id);

  if (error) return { error: "Unable to update the post status." };

  redirect(`/admin/posts/${id.data}/edit`);
}

export async function deletePost(_previousState: PostActionState, formData: FormData): Promise<PostActionState> {
  const id = z.string().uuid().safeParse(formData.get("id"));
  const confirmation = z.literal("delete").safeParse(formData.get("confirmDelete"));

  if (!id.success) return { error: "The post identifier is invalid." };
  if (!confirmation.success) return { error: "Confirm permanent deletion before continuing." };

  const author = await requireAuthor();
  if ("error" in author) return author;

  const { error } = await author.supabase.from("posts").delete().eq("id", id.data).eq("author_id", author.user.id);
  if (error) return { error: "Unable to delete the post." };

  redirect("/admin/posts");
}

export async function signOut() {
  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}
