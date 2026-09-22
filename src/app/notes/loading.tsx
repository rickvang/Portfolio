export default function NotesLoading() {
  return (
    <main aria-busy="true" className="site-shell" data-testid="notes-loading">
      <section className="hero notes-hero">
        <p className="eyebrow">Notes</p>
        <h1>Loading published notes.</h1>
        <div aria-hidden="true" className="loading-block" />
      </section>
    </main>
  );
}
