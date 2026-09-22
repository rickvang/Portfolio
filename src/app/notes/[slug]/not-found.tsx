import Link from "next/link";

export default function NoteNotFound() {
  return (
    <main className="site-shell error-page">
      <p className="eyebrow">Note not found</p>
      <h1>That note is not published.</h1>
      <p className="lede">It may still be a draft, archived, or the link may be incorrect.</p>
      <Link className="button" href="/notes">
        View published notes
      </Link>
    </main>
  );
}
