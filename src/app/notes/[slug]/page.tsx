import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPublishedPostBySlug } from "@/lib/posts";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Note not found | Rick Vang",
      description: "The requested note is not published.",
      robots: { index: false, follow: false },
    };
  }

  const description = post.excerpt ?? "Published note from Rick Vang.";
  const canonical = `/notes/${post.slug}`;

  return {
    title: `${post.title} | Rick Vang`,
    description,
    alternates: { canonical },
    openGraph: {
      description,
      title: post.title,
      type: "article",
      url: canonical,
    },
    twitter: {
      card: "summary",
      description,
      title: post.title,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">
          Rick Vang
        </Link>
        <Link className="button button-secondary" href="/notes">
          All notes
        </Link>
      </header>

      <article className="post-detail">
        <p className="eyebrow">Published note</p>
        <h1>{post.title}</h1>
        {post.excerpt && <p className="lede">{post.excerpt}</p>}
        <div className="post-content">
          {post.content.split("\n").map((paragraph, index) => <p key={`${post.id}-${index}`}>{paragraph}</p>)}
        </div>
      </article>
    </main>
  );
}
