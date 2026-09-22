export default function NotesLoading() {
  return (
    <section aria-busy="true" className="public-page" data-testid="notes-loading">
      <div className="hero notes-hero">
        <p className="eyebrow">Notes</p>
        <h1>Loading published notes.</h1>
        <div aria-hidden="true" className="loading-block" />
      </div>
    </section>
  );
}
