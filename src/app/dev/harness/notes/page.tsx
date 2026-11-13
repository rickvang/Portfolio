import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NoteArticle } from "@/components/note-article";
import { PersonalPracticeShell } from "@/components/personal-practice-shell";
import { editorialDrafts } from "@/lib/editorial-drafts";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Notes preview | Rick Vang",
  robots: { index: false, follow: false },
};

type NotesPreviewProps = {
  searchParams: Promise<{ slug?: string | string[] }>;
};

export default async function NotesPreview({ searchParams }: NotesPreviewProps) {
  if (process.env.NODE_ENV === "production") notFound();

  const params = await searchParams;
  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug)
    ?? "taskosaur-workspace-and-docs";
  const draft = editorialDrafts.find((entry) => entry.slug === slug);
  if (!draft) notFound();

  return (
    <PersonalPracticeShell pathname={`/notes/${draft.slug}`}>
      <aside className="public-page" aria-label="Local Notes preview">
        <p className="case-study-review-banner" role="note">
          Local preview · {draft.reviewStatus === "published" ? "This article is published." : "This article is unpublished."}
        </p>
        <nav className="state-controls" aria-label="Article previews">
          {editorialDrafts.map((entry) => (
            <Link
              aria-current={entry.slug === draft.slug ? "page" : undefined}
              href={`/dev/harness/notes?slug=${entry.slug}`}
              key={entry.id}
            >
              {entry.title}
            </Link>
          ))}
        </nav>
      </aside>
      <NoteArticle post={{ ...draft, content: draft.intro }} preview />
    </PersonalPracticeShell>
  );
}
