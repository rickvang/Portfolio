import Link from "next/link";

export function AdminSetupState() {
  return (
    <main className="site-shell error-page">
      <p className="eyebrow">Author workflow</p>
      <h1>Supabase is not configured.</h1>
      <p className="lede">
        Add the public Supabase URL and publishable key to the local environment before using the author tools.
      </p>
      <Link className="button" href="/">
        Return home
      </Link>
    </main>
  );
}
