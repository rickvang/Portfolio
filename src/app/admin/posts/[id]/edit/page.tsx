import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { AdminSetupState } from "@/components/admin-setup-state";
import { PostEditorForm } from "@/components/post-editor-form";
import { PostStatusActions } from "@/components/post-status-actions";
import { updatePost } from "@/app/admin/actions";
import { getCurrentUser } from "@/lib/auth";
import { getAuthorPost, hasSupabaseConfig } from "@/lib/posts";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: EditPostPageProps) {
  if (!hasSupabaseConfig()) return <AdminSetupState />;

  const user = await getCurrentUser();
  if (!user) redirect("/admin/login?next=/admin/posts");

  const { id } = await params;
  const post = await getAuthorPost(id, user.id);
  if (!post) notFound();

  return (
    <main className="site-shell admin-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Author workflow · {post.status}</p>
          <h1 className="admin-heading">Edit post</h1>
        </div>
        <Link className="button button-secondary" href="/admin/posts">All posts</Link>
      </header>
      <section className="content-section admin-editor" aria-labelledby="edit-post-heading">
        <div className="section-heading">
          <p className="eyebrow">Content</p>
          <h2 id="edit-post-heading">Keep the note useful.</h2>
        </div>
        <PostEditorForm
          action={updatePost}
          initialValues={{
            content: post.content,
            excerpt: post.excerpt,
            id: post.id,
            slug: post.slug,
            title: post.title,
          }}
        />
        <div className="admin-status-panel">
          <p className="eyebrow">Publishing</p>
          <PostStatusActions postId={post.id} status={post.status} />
        </div>
      </section>
    </main>
  );
}
