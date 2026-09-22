"use client";

import { useActionState } from "react";

import type { PostActionState } from "@/lib/admin";

type PostEditorAction = (
  previousState: PostActionState,
  formData: FormData,
) => Promise<PostActionState>;

type PostEditorFormProps = {
  action: PostEditorAction;
  initialValues?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string | null;
    content?: string;
  };
};

export function PostEditorForm({ action, initialValues = {} }: PostEditorFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="admin-form">
      {initialValues.id && <input name="id" type="hidden" value={initialValues.id} />}
      <div className="form-row">
        <label htmlFor="post-title">Title</label>
        <input id="post-title" name="title" required defaultValue={initialValues.title ?? ""} />
      </div>
      <div className="form-row">
        <label htmlFor="post-slug">Slug</label>
        <input id="post-slug" name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required defaultValue={initialValues.slug ?? ""} />
      </div>
      <div className="form-row">
        <label htmlFor="post-excerpt">Excerpt</label>
        <textarea id="post-excerpt" name="excerpt" rows={3} defaultValue={initialValues.excerpt ?? ""} />
      </div>
      <div className="form-row">
        <label htmlFor="post-content">Content</label>
        <textarea id="post-content" name="content" required rows={12} defaultValue={initialValues.content ?? ""} />
      </div>
      {state.error && <p className="feedback-error" role="alert">{state.error}</p>}
      <button className="button" disabled={pending} type="submit">
        {pending ? "Saving…" : initialValues.id ? "Save changes" : "Create draft"}
      </button>
    </form>
  );
}
