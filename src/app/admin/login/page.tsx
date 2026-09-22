import Link from "next/link";

import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminSetupState } from "@/components/admin-setup-state";
import { hasSupabaseConfig } from "@/lib/posts";

type AdminLoginPageProps = {
  searchParams: Promise<{ next?: string | string[] }>;
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  if (!hasSupabaseConfig()) return <AdminSetupState />;

  const params = await searchParams;
  const requestedNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
    ? requestedNext
    : "/admin/posts";

  return (
    <main className="site-shell auth-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">
          Rick Vang
        </Link>
        <Link className="button button-secondary" href="/">
          Back home
        </Link>
      </header>
      <section className="auth-card" aria-labelledby="admin-login-heading">
        <p className="eyebrow">Author workflow</p>
        <h1 id="admin-login-heading">Sign in to manage posts.</h1>
        <p className="lede">Draft, publish, and maintain the notes that appear on the public site.</p>
        <AdminLoginForm nextPath={nextPath} />
      </section>
    </main>
  );
}
