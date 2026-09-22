import Link from "next/link";

import { PostEditorForm } from "@/components/post-editor-form";
import { AdminSetupState } from "@/components/admin-setup-state";
import { createPost } from "@/app/admin/actions";
import { hasSupabaseConfig } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  if (!hasSupabaseConfig()) return <AdminSetupState />;

  return (
    <main className="site-shell admin-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Author workflow</p>
          <h1 className="admin-heading">New draft</h1>
        </div>
        <Link className="button button-secondary" href="/admin/posts">All posts</Link>
      </header>
      <section className="content-section admin-editor" aria-labelledby="new-post-heading">
        <div className="section-heading">
          <p className="eyebrow">Draft</p>
          <h2 id="new-post-heading">Start with a clear idea.</h2>
        </div>
        <PostEditorForm action={createPost} />
      </section>
    </main>
  );
}
