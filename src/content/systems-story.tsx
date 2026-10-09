import Link from "next/link";

/* CW-97: owner-approved case-study content, 2026-10-09. */
export function DesignSystemsStory({ clientIpDisclaimer }: { clientIpDisclaimer?: string }) {
  return (
    <article className="approved-story" data-case-study-status="approved">

 <Link className="back" href="/work">← All work</Link>

<header className="hero">
<div className="system-hero">
<div>
<p className="eyebrow">Design Systems
</p>
<h1>A common foundation.<br /><em>Different expressions.</em>
</h1>
<p className="intro">Teams redesigning legacy capabilities needed a more consistent starting point. I designed the platform framework as part of a collaborative effort to build a core library.
</p>
</div>
<figure className="system-stack">
<div className="system-layer"><span>Apply</span><strong>Workflows &amp; screens</strong>
<p>Starting points for recurring tasks
</p>
</div>
<div className="system-layer"><span>Adapt</span><strong>Density &amp; interface guidance</strong>
<p>Different needs across surfaces
</p>
</div>
<div className="system-layer"><span>Share</span><strong>Styles &amp; foundations</strong>
<p>Reusable design decisions
</p>
</div>
<figcaption>A conceptual map of the library&apos;s responsibilities.
</figcaption>
</figure>
</div>
<dl className="meta">
<div>
<dt>My contribution
</dt>
<dd>Platform framework design &amp; early-adopter collaboration
</dd>
</div>
<div>
<dt>Shared work
</dt>
<dd>Foundations, templates, patterns &amp; lightweight governance
</dd>
</div>
</dl>
</header>

<section className="chapter" id="system-foundation">
<p className="eyebrow">01 / Choose what to share
</p>
<div className="split">
<div>
<h2>Start with the work<br />teams already have.
</h2>
<p>We audited existing patterns alongside user scenarios to identify duplication and decide where consistency would help. Stakeholder workshops aligned the goals; developer feedback helped us understand feasibility.
</p>
<p>This gave us material to organize and refine into the core library. The foundations held reusable styles and tokens that teams could use as a common starting point.
</p>
</div>
<p className="story-callout">A shared foundation still needs to accommodate the surface being designed.
</p>
</div>
</section>

<section className="chapter" id="system-density">

<p className="eyebrow">02 / Adapt to the surface
</p>
<h2>One foundation.<br />Two kinds of reading.
</h2>

<p className="lead">We maintained display marketing guidance alongside enterprise interface guidance. A page introducing an idea and a screen supporting daily work needed different hierarchies.
</p>

<div className="density-demo">

<figure className="density-example">
<div className="surface-ui marketing-screen" role="img" aria-label="Fictional Fieldwork marketing homepage with site navigation, a product message and a call to action.">
<div className="surface-topbar"><strong className="surface-brand">▧ Fieldwork</strong>
<div className="marketing-links"><span>Product</span><span>How it works</span>
</div><span className="surface-login">Log in ↗</span>
</div>
<div className="marketing-body"><span className="marketing-kicker">BUILT FOR WORK ON SITE</span>
<h4>Keep every<br />site moving.
</h4>
<p>Bring requests, people and the next step together. Less chasing updates. More time for the work.
</p><span className="marketing-cta">Explore Fieldwork <span aria-hidden="true">→</span></span>
</div>
<div className="marketing-footer"><span>Plan the work.</span><span>Keep everyone in step.</span><span>Move it forward.</span>
</div>
</div>
<figcaption>
<h3>Introduce one idea
</h3>
<p>Large type and open space give the message priority. The next step is easy to find.
</p>
</figcaption>
</figure>

<figure className="density-example">
<div className="surface-ui operations-screen" role="img" aria-label="Fictional Fieldwork application with work navigation, search, status filters and a request table.">
<div className="surface-topbar"><strong className="surface-brand">▧ Fieldwork</strong>
<div className="app-links"><span className="active">Work</span><span>People</span><span>Reports</span>
</div><span className="surface-user">AM</span>
</div>
<div className="operations-body">
<div className="operations-heading">
<div><span className="operations-location">NORTH SITE / WORKSPACE</span>
<h4>Work overview
</h4>
</div><span className="operations-add">+ New request</span>
</div>
<div className="operations-tabs"><span className="active">All work <b>4</b></span><span>Assigned to me <b>2</b></span><span>Completed</span>
</div>
<div className="operations-tools"><span className="operations-search">⌕ &nbsp; Search requests</span><span className="operations-filter">Status ▾</span>
</div>
<table>
<thead>
<tr>
<th>Request
</th>
<th>Owner
</th>
<th>Status
</th>
</tr>
</thead>
<tbody>
<tr>
<td><small>REQ-104</small>Equipment inspection
</td>
<td>A. Morgan
</td>
<td><span className="work-status progress">In progress</span>
</td>
</tr>
<tr>
<td><small>REQ-105</small>Site preparation
</td>
<td>S. Lee
</td>
<td><span className="work-status ready">Ready</span>
</td>
</tr>
<tr>
<td><small>REQ-106</small>Inventory check
</td>
<td>J. Kim
</td>
<td><span className="work-status progress">In progress</span>
</td>
</tr>
<tr>
<td><small>REQ-107</small>Service request
</td>
<td>M. Chen
</td>
<td><span className="work-status review-status">In review</span>
</td>
</tr>
</tbody>
</table>
<div className="operations-footer"><span>4 requests</span><span>‹ &nbsp; 1 &nbsp; ›</span>
</div>
</div>
</div>
<figcaption>
<h3>Compare several items
</h3>
<p>Compact spacing and aligned fields help people scan owners and status without losing their place.
</p>
</figcaption>
</figure>

</div>
<p className="note">Illustrative comparison with fictional content, not original project screens or styles.
</p>

</section>

<section className="chapter" id="system-use">
<p className="eyebrow">03 / Make reuse practical
</p>

<div className="split">
<div>
<h2>A starting point<br />people could adapt.
</h2>
<p>We created reusable screens that designers could duplicate and modify for a use case. Workflow patterns connected those screens to recurring tasks.
</p>
<p>The library brought the foundations and interface guidance into everyday design work.
</p>
</div>

<aside className="adoption-note">
<p className="eyebrow">My part in adoption
</p>
<h3>Work with the first teams using it.
</h3>
<p>I worked with early adopters to build trust in the platform framework. Their collaboration was part of making the shared starting point useful.
</p>
<p>Keeping the system prioritized remained a challenge. Documentation, incremental rollouts and feedback supported the team&apos;s ongoing library work.
</p>
</aside>
</div>

</section>

{clientIpDisclaimer && (
  <aside className="note" aria-label="Client intellectual property note">
    <p>{clientIpDisclaimer}</p>
  </aside>
)}

<nav className="closing" aria-label="Return from Design Systems"><Link href="/work">← Back to all work</Link>
</nav>

    </article>
  );
}
