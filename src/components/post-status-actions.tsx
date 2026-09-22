"use client";

import { type FormEvent, useActionState } from "react";

import { deletePost, setPostStatus } from "@/app/admin/posts/actions";

function StatusForm({ label, postId, status }: { label: string; postId: string; status: "draft" | "published" | "archived" }) {
  const [state, action, pending] = useActionState(setPostStatus, {});

  return (
    <form action={action}>
      <input name="id" type="hidden" value={postId} />
      <input name="status" type="hidden" value={status} />
      <button className="button button-secondary" disabled={pending} type="submit">
        {pending ? "Updating…" : label}
      </button>
      {state.error && <span className="feedback-error" role="alert">{state.error}</span>}
    </form>
  );
}

export function DeletePostForm({ postId }: { postId: string }) {
  const [deleteState, deleteAction, deletePending] = useActionState(deletePost, {});

  function confirmDelete(event: FormEvent<HTMLFormElement>) {
    if (!window.confirm("Delete this post? This action cannot be undone.")) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteAction} data-testid="delete-post-form" onSubmit={confirmDelete}>
      <input name="id" type="hidden" value={postId} />
      <button className="button button-danger" disabled={deletePending} type="submit">
        {deletePending ? "Deleting…" : "Delete"}
      </button>
      {deleteState.error && <span className="feedback-error" role="alert">{deleteState.error}</span>}
    </form>
  );
}

export function PostStatusActions({ postId, status }: { postId: string; status: "draft" | "published" | "archived" }) {
  return (
    <div className="admin-actions">
      {status !== "published" && <StatusForm label="Publish" postId={postId} status="published" />}
      {status !== "archived" && <StatusForm label="Archive" postId={postId} status="archived" />}
      {status !== "draft" && <StatusForm label="Move to draft" postId={postId} status="draft" />}
      <DeletePostForm postId={postId} />
    </div>
  );
}
