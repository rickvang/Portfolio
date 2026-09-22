export default function Loading() {
  return (
    <main className="site-shell" aria-busy="true">
      <div className="loading-block" />
      <div className="loading-block loading-block-short" />
      <p>Loading…</p>
    </main>
  );
}
