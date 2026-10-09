import Link from "next/link";

/* CW-97: owner-approved case-study content, 2026-10-09. */
export function IntegrationsStory() {
  return (
    <article className="approved-story" data-case-study-status="approved">

 <Link className="back" href="/work">← All work</Link>

<header className="hero">
<p className="eyebrow">Multi Product Integrations
</p>
<h1>Shared patterns.<br /><em>Room for different work.</em>
</h1>
<p className="intro">Designers were making similar workflow decisions across separate applications. I helped turn those repeated decisions into shared patterns, Figma libraries and a layout starter that teams could adapt.
</p>
<dl className="meta">
<div>
<dt>My contribution
</dt>
<dd>Workflow patterns &amp; layout framework
</dd>
</div>
<div>
<dt>Setting
</dt>
<dd>Work across engagements, including real estate
</dd>
</div>
<div>
<dt>Working with
</dt>
<dd>Design teammates &amp; frontend developers
</dd>
</div>
</dl>
</header>

<section className="chapter" id="integration-problem">
<p className="eyebrow">01 / The repeated decisions
</p>
<div className="split">
<div>
<h2>Different applications.<br />Familiar design problems.
</h2>
<p>Across the places I&apos;ve worked, teams often defined their own workflows even when the interactions overlapped. We wanted a common starting point that could support those shared needs.
</p>
<p>The work reached into everyday interface decisions: when to use a modal or drawer, where close controls belong, how information is read, and how labels relate to their values.
</p>
</div>
<figure className="field-specimen">
<div className="field-specimen-frame">
<div className="field-specimen-header"><span>FIELD PATTERNS</span><strong>Two ways to pair a label and value</strong>
</div>
<div className="rule-pair">
<div className="pair-example">
<h4>Label beside the value
</h4>
<div className="pair-card">
<div className="label-row"><span>Status</span><b>In progress</b>
</div>
</div>
</div>
<div className="pair-example">
<h4>Label above the value
</h4>
<div className="pair-card">
<div className="label-col"><span>Status</span><b>In progress</b>
</div>
</div>
</div>
</div>
</div>
<figcaption>Illustrative examples of the label/value arrangements we defined.
</figcaption>
</figure>
</div>
</section>

<section className="chapter" id="integration-choice">
<p className="eyebrow">02 / Adopt the better pattern
</p>
<h2>Consistency also meant<br />learning from another team.
</h2>
<p className="lead">Some applications had more developed dashboards and progressive-disclosure patterns. Their slide-in approach to creating and viewing records fit certain scenarios better than ours.
</p>
<div className="split">
<div>
<p>We adopted that approach and brought it into the shared Figma libraries and guidelines. The common system could incorporate a better solution that already existed elsewhere.
</p>
<p>My contribution focused on defining workflow patterns and representing them in the system. In one real-estate engagement, I worked with three teammates; we divided the pattern work and iterated together.
</p>
</div>
<figure className="record-example">
<div className="record-ui" role="img" aria-label="Illustrative service request interface. A selected request stays visible in the list while its details open in a drawer on the right.">

<div className="record-appbar"><span className="record-appmark" aria-hidden="true">▦</span><strong>Workspace</strong><span className="record-avatar">RV</span>
</div>

<div className="record-stage">
<div className="record-workspace">
<div className="record-toolbar">
<h4>Requests <span>8</span>
</h4><span className="record-new">+ New request</span>
</div>
<div className="record-search"><span aria-hidden="true">⌕</span> Search requests
</div>
<div className="record-table-head">Request <span>Status</span>
</div>
<div className="record-item"><small>REQ-103</small><strong>Access review</strong><span className="record-status">Open</span>
</div>
<div className="record-item is-selected"><small>REQ-104</small><strong>Equipment inspection</strong><span className="record-status">In progress</span>
</div>
<div className="record-item"><small>REQ-105</small><strong>Site preparation</strong><span className="record-status">Open</span>
</div>
<div className="record-item"><small>REQ-106</small><strong>Inventory check</strong><span className="record-status">Open</span>
</div>
</div>

<div className="record-drawer">
<div className="drawer-top"><span>REQUEST DETAILS</span><span className="drawer-close" aria-hidden="true">×</span>
</div><small className="record-id">REQ-104</small>
<h4>Equipment inspection
</h4><span className="drawer-status"><i></i>In progress</span>
<dl className="drawer-fields">
<div>
<dt>Assigned to
</dt>
<dd><span className="field-avatar">AM</span>A. Morgan
</dd>
</div>
<div>
<dt>Due date
</dt>
<dd>Oct 14
</dd>
</div>
<div>
<dt>Location
</dt>
<dd>North site
</dd>
</div>
</dl>
<div className="drawer-description"><span>Description</span>
<p>Inspect equipment and note any follow-up work before the next site visit.
</p>
</div>
<div className="drawer-actions"><span className="drawer-edit">Edit request</span><span className="drawer-more">•••</span>
</div>
</div>
</div>
</div>
<figcaption>Illustrative UI with fictional records. The detail drawer keeps the selected request in the context of the list.
</figcaption>
</figure>
</div>
<figure className="adoption-sequence">
<figcaption>
<h3>From a useful example to a shared pattern
</h3>
</figcaption>
<ol>
<li><span className="sequence-number">01</span>
<h3>Recognize a better fit
</h3>
<p>Another team&apos;s record workflow worked better for a particular scenario.
</p>
</li>
<li><span className="sequence-number">02</span>
<h3>Make it part of the library
</h3>
<p>We adopted the pattern in the shared Figma library and usage guidelines.
</p>
</li>
<li><span className="sequence-number">03</span>
<h3>Give other teams a starting point
</h3>
<p>The approach became available for reuse in applicable projects.
</p>
</li>
</ol>
</figure>
</section>

<section className="chapter" id="integration-reuse">
<p className="eyebrow">03 / Make it shared
</p>
<div className="split">
<div>
<h2>The library was one part.<br />Adoption was the other.
</h2>
<p>We built component libraries with guidance for the patterns we defined together. I also created a layout starter for designers working in different problem spaces.
</p>
<p>I worked with frontend developers to understand feasibility. They implemented the code.
</p>
<p>The libraries were generally adopted across the projects I worked on. More established teams found adaptation harder, so collaboration remained part of the work.
</p>
</div>
<div className="stack">
<div className="row"><b>01</b>
<div>
<h3>Define the recurring decision
</h3>
<p>Give designers a shared way to think about workflow and layout choices.
</p>
</div>
</div>
<div className="row"><b>02</b>
<div>
<h3>Put it into something usable
</h3>
<p>Figma components, guidelines and a layout starter made the definitions available in design work.
</p>
</div>
</div>
<div className="row"><b>03</b>
<div>
<h3>Let other work improve it
</h3>
<p>A shared system could adopt an approach another team had already developed.
</p>
</div>
</div>
</div>
</div>
</section>

<nav className="closing" aria-label="Return from Integrations"><Link href="/work">← Back to all work</Link>
</nav>

    </article>
  );
}
