import Image from "next/image";
import Link from "next/link";
import contact from "../../content/profile/contact.json";
import { CopyEmail } from "@/app/(public)/contact/copy-email";
// Owner-approved CW-83 specimen, Portfolio #74. Page copy remains separate from the shared shell.
export function WorkPageContent({ approvedSlugs }: {
    approvedSlugs: readonly string[];
}) {
    return (<article id="work" className="portfolio-pages public-page">

    <header className="page-header work-header">
    <div>
    <p className="eyebrow">Selected work
    </p>
    <h1>Designing the parts.<br /><em>Connecting the whole.</em>
    </h1>
    </div>
    <p className="intro">Product experiences, shared foundations and the ways teams bring them into practice.
    </p>
    </header>

    <section aria-labelledby="gallery-heading">
    <h2 id="gallery-heading" className="sr-only">Case studies</h2>
    <div className="project-grid">

        {approvedSlugs.includes("multi-product-integrations") && (<article className="project" data-practice-work="multi-product-integrations">
        <Link href="/work/multi-product-integrations">
        <figure className="project-image ink"><Image src="/work-media/multi-product-integrations.png" alt="Overlapping service interfaces for work orders, inventory and activity." width={900} height={550} sizes="(max-width: 760px) 100vw, 50vw"/>
        </figure>
        <div className="project-meta"><span>Enterprise product design</span><span aria-hidden="true">↗</span>
        </div>
        <h3>Multi Product Integrations
        </h3>
        <p>Turning repeated workflow decisions into shared patterns, Figma libraries and a layout starter teams could adapt.
        </p><span className="read">Explore the case study <span aria-hidden="true">→</span></span>
        </Link>
        </article>)}

        {approvedSlugs.includes("ai-systems") && (<article className="project" data-practice-work="ai-systems">
        <Link href="/work/ai-systems">
        <figure className="project-image sage"><Image className="framework" src="/work-media/persona-framework-preview.svg" alt="Five layers connect public research to working context, role-specific needs, dependencies and UX synthesis." width={900} height={550} sizes="(max-width: 760px) 100vw, 50vw"/>
        </figure>
        <div className="project-meta"><span>AI &amp; working context</span><span aria-hidden="true">↗</span>
        </div>
        <h3>AI Systems
        </h3>
        <p>Giving AI the context to assess an idea against people’s work, decisions and dependencies.
        </p><span className="read">Explore the case study <span aria-hidden="true">→</span></span>
        </Link>
        </article>)}

        {approvedSlugs.includes("design-systems") && (<article className="project" data-practice-work="design-systems">
        <Link href="/work/design-systems">
        <figure className="project-image ink"><Image src="/work-media/design-systems.png" alt="Design-system foundations and interface patterns arranged across reusable screens." width={900} height={550} sizes="(max-width: 760px) 100vw, 50vw"/>
        </figure>
        <div className="project-meta"><span>Foundations &amp; adoption</span><span aria-hidden="true">↗</span>
        </div>
        <h3>Design Systems
        </h3>
        <p>A common foundation for legacy products, with room for different interfaces and ways of working.
        </p><span className="read">Explore the case study <span aria-hidden="true">→</span></span>
        </Link>
        </article>)}

        {approvedSlugs.includes("ui-design-practices") && (<article className="project" data-practice-work="ui-design-practices">
        <Link href="/work/ui-design-practices">
        <figure className="project-image practice">
        <div className="practice-board" aria-label="Illustrative interface guidance: layout, density and foundations">
        <div className="board-head"><span>Interface guidance</span><span>↗</span>
        </div>
        <div className="board-layout">
        <div className="mini-nav"><i></i><i></i><i></i>
        </div>
        <div><b>Layout</b>
        <div className="mini-columns"><i></i><i></i>
        </div>
        <div className="mini-line">
        </div>
        <div className="mini-line short">
        </div>
        </div>
        </div>
        <div className="board-bottom">
        <div><b>Density</b><i></i><i></i><i></i>
        </div>
        <div><b>Foundations</b>
        <div className="swatches"><i></i><i></i><i></i>
        </div><span>Aa</span>
        </div>
        </div>
        </div>
        </figure>
        <div className="project-meta"><span>Design &amp; implementation</span><span aria-hidden="true">↗</span>
        </div>
        <h3>UI Design Practices
        </h3>
        <p>Making design decisions explicit, from layout and interaction to the contracts that carry them into implementation.
        </p><span className="read">Explore the case study <span aria-hidden="true">→</span></span>
        </Link>
        </article>)}

    </div>

    <p className="gallery-note">Client screens are modified to protect intellectual property. The AI Systems and UI Design Practices previews are illustrative.
    </p>

    </section>
    <footer className="page-close">
    <p>More about the person behind the work.
    </p>
    <Link href="/about">Meet Rick <span aria-hidden="true">→</span>
    </Link>
    </footer>

    </article>);
}
export function AboutPageContent({ stats }: {
    stats: readonly {
        label: string;
        value: string;
    }[];
}) {
    return (<article id="about" className="portfolio-pages public-page">

    <header className="page-header about-header">
    <p className="eyebrow">About / Rick Vang
    </p>
    <h1>I’m most useful when<br />the challenge is<br /><em>bigger than a screen.</em>
    </h1>
    <div className="about-intro">
    <p className="lead">I help teams turn complex workflows into products people can understand—and teams can evolve.
    </p>
    <p>Over 13 years, I’ve worked at the intersection of product design, systems thinking and implementation. I care about giving people tools that help them spend less time fighting fires and more time on the work that matters to them.
    </p>
    </div>
    </header>

    <dl className="stats" aria-label="Experience summary">{stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value.replace(/\+$/, "")}<span aria-hidden="true">{stat.value.endsWith("+") ? "+" : ""}</span><span className="sr-only">{stat.value.endsWith("+") ? " or more" : ""}</span></dd></div>)}</dl>

    <section className="approach">
    <div>
    <p className="eyebrow">How I contribute
    </p>
    <h2>From understanding<br />to something useful.
    </h2>
    <p>Clarifying the problem, finding the structure and carrying the decisions through.
    </p>
    </div>
    <div className="approach-list">
    <div>
    <h3>Understand the work.
    </h3>
    <p>Start with what people need to do, the decisions they make and the people they depend on.
    </p>
    <Link href="/work/ai-systems">See AI Systems <span aria-hidden="true">↗</span>
    </Link>
    </div>
    <div>
    <h3>Build foundations teams can share.
    </h3>
    <p>Find the repeated decisions and give teams a useful starting point they can adapt to their context.
    </p>
    <Link href="/work/design-systems">See Design Systems <span aria-hidden="true">↗</span>
    </Link>
    </div>
    <div>
    <h3>Carry the intent into implementation.
    </h3>
    <p>Make design decisions clear enough to build, review and evolve—with human judgment throughout.
    </p>
    <Link href="/work/ui-design-practices">See UI Design Practices <span aria-hidden="true">↗</span>
    </Link>
    </div>
    </div>
    </section>

    <footer className="page-close">
    <p>Have a challenge that could use this kind of thinking?
    </p>
    <Link href="/contact">Let’s talk <span aria-hidden="true">→</span>
    </Link>
    </footer>

    </article>);
}
export function ContactPageContent() {
    return (<article id="contact" className="portfolio-pages public-page">

    <header className="page-header contact-header">
    <p className="eyebrow">Contact
    </p>
    <h1>Good work starts<br /><em>with a conversation.</em>
    </h1>
    <p className="intro">For product design opportunities, collaboration or a question about my work—get in touch.
    </p>
    </header>

    <section className="contact-panel" aria-label="Contact Rick">
    <div className="contact-label"><span>Email me</span><span>Direct contact</span>
    </div>
    <Link className="email" href={`mailto:${contact.email}`}>{contact.email} <span aria-hidden="true">↗</span>
    </Link>
    <div className="contact-bottom">
    <p>A little context about your team or the challenge is a good place to start.
    </p><CopyEmail email={contact.email}/>
    </div>
    </section>

    <div className="contact-secondary">
    <div>
    <p className="eyebrow">Elsewhere
    </p>
    <Link href={contact.linkedInUrl} className="linkedin">Connect on LinkedIn <span aria-hidden="true">↗</span>
    </Link>
    </div>
    <div>
    <p className="eyebrow">A starting point
    </p>
    <p>My work spans product workflows, design systems and AI-assisted design practice.
    </p>
    <Link href="/work" className="text-link">Explore the work <span aria-hidden="true">→</span>
    </Link>
    </div>
    </div>

    </article>);
}
