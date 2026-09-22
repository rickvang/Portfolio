import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell error-page">
      <p className="eyebrow">404</p>
      <h1>That page is not available.</h1>
      <Link className="button" href="/">
        Return home
      </Link>
    </main>
  );
}
