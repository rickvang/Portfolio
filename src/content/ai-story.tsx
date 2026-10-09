import Link from "next/link";

/* CW-97: owner-approved case-study content, 2026-10-09. */
export function AiSystemsStory() {
  return (
    <article className="approved-story" data-case-study-status="approved">

<Link className="back" href="/work">← All work</Link>

<header className="hero ai-hero">
<p className="eyebrow">AI-assisted discovery / Context framework
</p>
<h1>Give AI a model<br /><em>of people&apos;s work.</em>
</h1>
<p className="intro">I built a framework that connected research-grounded personas with a map of how their roles depended on each other. It gave AI a richer basis for evaluating product ideas and reasoning about workflows, information needs and different users&apos; screens.
</p>
<dl className="meta">
<div>
<dt>My contribution
</dt>
<dd>Persona structure, cross-persona dependencies &amp; synthesis
</dd>
</div>
<div>
<dt>Application
</dt>
<dd>An AI council for product and UX exploration
</dd>
</div>
<div>
<dt>Source material
</dt>
<dd>Public role information, whitepapers &amp; industry forums
</dd>
</div>
</dl>
</header>

<section className="chapter" id="ai-synthesis">
<p className="eyebrow">01 / Change the context behind the answer
</p>
<h2>A believable profile is a start.<br />Understanding the work goes further.
</h2>
<p className="lead">Earlier outputs described a person&apos;s background and broad goals. I wanted the AI to consider what that person needed to decide, the information they relied on and the people they depended on.
</p>
<div className="scaffold-comparison">
<div className="shared-prompt"><span>THE SAME PRODUCT QUESTION</span>
<p>Would a work-tracking system help this team?
</p>
</div>
<div className="scaffold-columns">
<figure className="scaffold-case">
<header><span>Basic persona generation</span>
<h3>Typical persona model
</h3>
</header>
<svg viewBox="0 0 520 490" role="img" aria-label="Typical manager persona with three layers: a persona snapshot, broad goals and concerns, and an illustrative sentiment about keeping team work organized.">
<path d="M35 232 V392 M275 222 V382 M145 287 V447" stroke="#ccd2c5" strokeDasharray="3 5" fill="none">
</path>
<g>
<path d="M35 392 L145 447 L275 382 L275 394 L145 459 L35 404 Z" fill="#e6e9e2" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M35 392 L165 327 L275 382 L145 447 Z" fill="#f9faf7" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M277 386 H306" fill="none" stroke="#adb3aa">
</path>
<text x="318" y="384" fontSize="14" fontWeight="600" fill="#283429">Manager snapshot
</text>
<text x="318" y="405" fontSize="11" fill="#6a7368">Age, background, team manager
</text>
<text x="318" y="422" fontSize="11" fill="#6a7368">Day-in-the-life blurb
</text>
</g>
<g>
<path d="M35 312 L145 367 L275 302 L275 314 L145 379 L35 324 Z" fill="#d8e2cc" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M35 312 L165 247 L275 302 L145 367 Z" fill="#edf2e5" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M277 306 H306" fill="none" stroke="#adb3aa">
</path>
<text x="318" y="304" fontSize="14" fontWeight="600" fill="#283429">Goals & concerns
</text>
<text x="318" y="325" fontSize="11" fill="#6a7368">Stay organized, meet deadlines
</text>
<text x="318" y="342" fontSize="11" fill="#6a7368">Avoid competing demands
</text>
</g>
<g>
<path d="M35 232 L145 287 L275 222 L275 234 L145 299 L35 244 Z" fill="#ead5c4" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M35 232 L165 167 L275 222 L145 287 Z" fill="#f8ede3" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M277 226 H306" fill="none" stroke="#adb3aa">
</path>
<text x="318" y="224" fontSize="14" fontWeight="600" fill="#283429">Typical sentiment
</text>
<text x="318" y="245" fontSize="11" fill="#6a7368">“I want to see how
</text>
<text x="318" y="262" fontSize="11" fill="#6a7368">my team is progressing.”
</text>
</g>
</svg>
<div className="sample-answer"><span className="answer-label">Illustrative system response</span>
<p>A work-tracking system could help a manager keep the team organized, monitor progress and stay on top of deadlines.
</p>
<div className="role-responses" aria-label="Illustrative manager assessment">
<figure>
<figcaption>Manager
</figcaption>
<p>Bring assignments, due dates and status into one view. A manager could see who is working on each task, follow up on overdue work and adjust priorities as demands change.
</p>
</figure>
</div>
<p className="answer-decision"><strong>Prioritize visibility.</strong> Start with task assignment, progress tracking and deadline reminders so the manager can keep work on schedule.
</p>
</div>
</figure>
<figure className="scaffold-case">
<header><span>Persona Framework</span>
<h3>The system I built.
</h3>
</header>
<svg viewBox="0 0 520 490" role="img" aria-label="Exploded layers: public research, individual working context, role-specific needs, a cross-persona dependency sheet, and UX synthesis into handoff workflows and role-specific screens.">
<path d="M35 72 V392 M275 62 V382 M145 127 V447" stroke="#ccd2c5" strokeDasharray="3 5" fill="none">
</path>
<g>
<path d="M35 392 L145 447 L275 382 L275 394 L145 459 L35 404 Z" fill="#dce2d4" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M35 392 L165 327 L275 382 L145 447 Z" fill="#f0f2eb" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M277 386 H306" fill="none" stroke="#adb3aa">
</path>
<text x="318" y="384" fontSize="14" fontWeight="600" fill="#283429">Public research
</text>
<text x="318" y="405" fontSize="11" fill="#6a7368">Role descriptions, whitepapers
</text>
<text x="318" y="422" fontSize="11" fill="#6a7368">Industry forums
</text>
</g>
<g>
<path d="M35 312 L145 367 L275 302 L275 314 L145 379 L35 324 Z" fill="#d8e2cc" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M35 312 L165 247 L275 302 L145 367 Z" fill="#edf2e5" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M277 306 H306" fill="none" stroke="#adb3aa">
</path>
<text x="318" y="304" fontSize="14" fontWeight="600" fill="#283429">Working context
</text>
<text x="318" y="325" fontSize="11" fill="#6a7368">Goals, pains, constraints
</text>
<text x="318" y="342" fontSize="11" fill="#6a7368">Trust & adoption
</text>
</g>
<g>
<path d="M35 232 L145 287 L275 222 L275 234 L145 299 L35 244 Z" fill="#ead5c4" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M35 232 L165 167 L275 222 L145 287 Z" fill="#f8ede3" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M277 226 H306" fill="none" stroke="#adb3aa">
</path>
<text x="318" y="224" fontSize="14" fontWeight="600" fill="#283429">Role-specific needs
</text>
<text x="318" y="245" fontSize="11" fill="#6a7368">Responsibilities, decisions
</text>
<text x="318" y="262" fontSize="11" fill="#6a7368">Tools & information
</text>
</g>
<g>
<path d="M35 152 L145 207 L275 142 L275 154 L145 219 L35 164 Z" fill="#d2dce7" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M35 152 L165 87 L275 142 L145 207 Z" fill="#e8edf3" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M277 146 H306" fill="none" stroke="#adb3aa">
</path>
<text x="318" y="144" fontSize="14" fontWeight="600" fill="#283429">Cross-persona map
</text>
<text x="318" y="165" fontSize="11" fill="#6a7368">Dependencies, shared data
</text>
<text x="318" y="182" fontSize="11" fill="#6a7368">Handoffs between roles
</text>
</g>
<g>
<path d="M35 72 L145 127 L275 62 L275 74 L145 139 L35 84 Z" fill="#e8ebe4" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M35 72 L165 7 L275 62 L145 127 Z" fill="#fff" stroke="#a9ada7" strokeWidth="1">
</path>
<path d="M277 66 H306" fill="none" stroke="#adb3aa">
</path>
<text x="318" y="64" fontSize="14" fontWeight="600" fill="#283429">UX synthesis
</text>
<text x="318" y="85" fontSize="11" fill="#6a7368">Handoff workflows
</text>
<text x="318" y="102" fontSize="11" fill="#6a7368">Management & worker views
</text>
</g>
</svg>
<div className="sample-answer grounded-answer"><span className="answer-label">Illustrative system response</span>
<p>A work-tracking system could help if it makes blocked work easier to resolve. A shared task list alone would leave the coordination problem in place.
</p>
<div className="role-responses" aria-label="Illustrative system assessment">
<figure>
<figcaption>Director
</figcaption>
<p>Show how unresolved dependencies affect delivery commitments and capacity. That helps a director decide which work to prioritize or resource differently.
</p>
</figure>
<figure>
<figcaption>Manager
</figcaption>
<p>Connect each blocker to an owner, the people waiting on it and the work it holds up. A team view should help a manager intervene before a missed handoff becomes a delay.
</p>
</figure>
<figure>
<figcaption>Worker
</figcaption>
<p>Keep the next task, missing input and person who can unblock it together. Reporting a blocker should update the team view without asking the worker to enter it twice.
</p>
</figure>
</div>
<p className="answer-decision"><strong>Prioritize the handoff.</strong> Start with flagging a blocker, assigning its resolution and showing the delivery impact. More reporting is only valuable if it helps someone act.
</p>
</div>
</figure>
</div>
</div>
</section>

<section className="chapter" id="ai-context">
<p className="eyebrow">02 / Structure what matters
</p>
<div className="split">
<div>
<h2>Connect the facets.<br />Make uncertainty visible.
</h2>
<p>The persona instructions organized source material around practical work: goals, responsibilities, workflows, decision rights, collaborators, tools and data. Trust requirements and adoption barriers gave the AI reasons to question an idea&apos;s usefulness.
</p>
<p>I used publicly available role information, whitepapers and leading industry forums. The instructions kept evidence, assumptions and questions for real research distinct.
</p>
</div>
<figure className="persona-structure">
<header><span>From the persona-generation instructions</span>
<h3>A working-context profile
</h3>
</header>
<dl>
<div>
<dt>Goals &amp; stakes
</dt>
<dd>Success measures, motivations and risks to avoid
</dd>
</div>
<div>
<dt>Work &amp; authority
</dt>
<dd>Responsibilities, exceptions, decisions and escalation
</dd>
</div>
<div>
<dt>People &amp; information
</dt>
<dd>Collaborators, handoffs, tools, data and trust concerns
</dd>
</div>
<div>
<dt>Adoption &amp; implications
</dt>
<dd>Objections, proof needed and consequences for product design
</dd>
</div>
</dl>
<figcaption>Condensed from the original instructions. Confidence, assumptions and validation questions apply across the profile.
</figcaption>
</figure>
</div>
</section>

<section className="chapter" id="ai-dependencies">
<p className="eyebrow">03 / Model the work between roles
</p>
<h2>The handoff connects the screens.
</h2>
<p className="lead">A cross-persona dependency sheet mapped how roles worked together. That gave UX questions a context for deciding where handoff workflows and different management views were needed.
</p>
<figure className="dependency-example">
<header><span>Illustrative application</span>
<h3>One blocker. Different decisions.
</h3>
</header>
<div className="dependency-grid">

<div className="dependency-role"><span className="dependency-step">01 / Worker</span>
<h4>Flag what stops the task.
</h4>

<div className="handoff-ui" role="img" aria-label="Illustrative worker work queue. Equipment inspection is blocked pending a site access permit owned by Sam Lee.">

<div className="hui-bar"><b>Fieldwork</b><span>AM</span>
</div>
<div className="hui-content">
<div className="hui-title"><strong>My work</strong><span>Today · Oct 14</span>
</div>
<div className="hui-tabs"><b>Assigned to me <i>3</i></b><span>Completed</span>
</div>

<div className="hui-task selected">
<div className="hui-row"><small>WK-104 · North site</small><span className="hui-status blocked">Blocked</span>
</div><strong>Equipment inspection</strong><small>Due today · 10:00 AM</small>
</div>

<div className="hui-blocker"><b>Waiting on site access permit</b><span>Resolution owner <strong>Sam Lee</strong></span><span>Raised by <strong>Alex Morgan</strong></span>
<div className="hui-action">View blocker <span>↗</span>
</div>
</div>

<div className="hui-task">
<div className="hui-row"><strong>Update equipment log</strong><small>1:00 PM</small>
</div><small>North site · Ready to start</small>
</div>
<div className="hui-task">
<div className="hui-row"><strong>Review delivery notes</strong><small>3:30 PM</small>
</div><small>West site · Ready to start</small>
</div>

</div>
</div>
<p className="dependency-handoff">Worker flags the missing permit → the manager sees who can resolve it.
</p>
</div>

<div className="dependency-role"><span className="dependency-step">02 / Manager</span>
<h4>Resolve the dependency.
</h4>

<div className="handoff-ui" role="img" aria-label="Illustrative team management screen. Alex Morgan is blocked on a permit from Sam Lee. Two follow-on tasks are affected and the issue is escalated.">

<div className="hui-bar"><b>Fieldwork</b><span>JT</span>
</div>
<div className="hui-content">
<div className="hui-title"><strong>Team work</strong><span>4 people</span>
</div>
<div className="hui-tabs"><b>People</b><span>Schedule</span><span>Dependencies <i>1</i></span>
</div>

<div className="hui-person"><span className="hui-avatar">AM</span>
<div><strong>Alex Morgan</strong><small>Equipment inspection</small>
</div><span className="hui-status blocked">Blocked</span>
</div>

<div className="hui-dependency"><small>DEPENDENCY · WK-104</small><strong>Site access permit</strong>
<div className="hui-person compact"><span className="hui-avatar">SL</span>
<div><strong>Sam Lee</strong><small>Permit owner · awaiting approval</small>
</div>
</div>
<div className="hui-impact">Inspection → sign-off → site handover
</div>
<div className="hui-row"><small>2 follow-on tasks affected</small><span className="hui-status">Escalated ↗</span>
</div>
</div>

<div className="hui-person"><span className="hui-avatar">JK</span>
<div><strong>Jamie Kim</strong><small>Asset inventory</small>
</div><span className="hui-status ready">On track</span>
</div>
<div className="hui-person"><span className="hui-avatar">MC</span>
<div><strong>Morgan Chen</strong><small>Delivery review</small>
</div><small>Due today</small>
</div>

</div>
</div>
<p className="dependency-handoff">Manager connects the blocked tasks → the director sees the delivery impact.
</p>
</div>

<div className="dependency-role"><span className="dependency-step">03 / Director</span>
<h4>Make the priority call.
</h4>

<div className="handoff-ui" role="img" aria-label="Illustrative delivery dashboard. One of three sites is at risk. North site handover is affected by the access permit, prompting a priority decision.">

<div className="hui-bar"><b>Fieldwork</b><span>RV</span>
</div>
<div className="hui-content">
<div className="hui-title"><strong>Delivery overview</strong><span>This week ▾</span>
</div>
<div className="hui-metrics">
<div><b>3</b><span>Active sites</span>
</div>
<div><b className="risk-number">1</b><span>At risk</span>
</div>
<div><b>2</b><span>Tasks affected</span>
</div>
</div>

<div className="hui-chart">
<div><strong>Site readiness</strong><small>Ready / planned tasks</small>
</div>
<div className="hui-chart-row"><span>North</span><i><em style={{"width": "60%"}}></em></i><b>6 / 10</b>
</div>
<div className="hui-chart-row"><span>West</span><i><em style={{"width": "90%"}}></em></i><b>9 / 10</b>
</div>
<div className="hui-chart-row"><span>East</span><i><em style={{"width": "80%"}}></em></i><b>8 / 10</b>
</div>
</div>

<div className="hui-risk">
<div className="hui-row"><b>North site handover</b><span className="hui-status blocked">At risk</span>
</div>
<p>Access permit holds up inspection and sign-off before Friday.
</p>
<div className="hui-action">Review priority <span>→</span>
</div>
</div>

</div>
</div>
<p className="dependency-handoff">Director sets the priority → the team can act on the same blocker.
</p>
</div>

</div>
<figcaption>Illustrative screens with fictional work and data. The same permit blocker connects individual work, team coordination and delivery decisions.
</figcaption>
</figure>
<p className="dependency-result">I brought the role perspectives together into a use-case scenario. The framework supported reasoning about the work across screens, beyond a list of features for individual users.
</p>
</section>

<section className="chapter" id="ai-reaction">
<p className="eyebrow">04 / What I observed
</p>
<div className="split">
<div>
<h2>Specific enough to feel<br />like familiar work.
</h2>
<p>The responses felt more like feedback from someone working in the industry. They reflected priorities, pains and constraints that a demographic sketch had not captured.
</p>
<p>At a company where confidentiality and security were top priorities, colleagues asked whether I had supplied internal documents to a public AI.
</p>
</div>
<aside className="adoption-note">
<p className="eyebrow">The source of that specificity
</p>
<h3>I had used only publicly available material.
</h3>
<p>The framework gathered and connected that material around people&apos;s work and the relationships between their roles.
</p>
</aside>
</div>
<p className="synthesis-note">This was my observed experience with generated perspectives, not a validation study or a substitute for research with real users.
</p>
</section>

<nav className="closing" aria-label="Return from AI Systems"><Link href="/work">← Back to all work</Link>
</nav>

    </article>
  );
}
