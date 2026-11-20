import { InterfaceGuidancePreview } from "@/components/interface-guidance-preview";
import { InterfaceLabPreview } from "@/components/interface-lab-preview";
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
    <h1>Selected work across<br /><em>products and systems.</em>
    </h1>
    </div>
    <p className="intro">A few examples of how I work through product problems, build shared patterns and help teams use them.
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
        <p>I helped define shared workflow patterns, Figma libraries and a layout starter teams could adapt.
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
        <p>I gave AI role-specific work context and dependencies to consider when assessing product ideas.
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
        <p>I helped create a shared library for redesigning legacy products, with guidance for different product surfaces.
        </p><span className="read">Explore the case study <span aria-hidden="true">→</span></span>
        </Link>
        </article>)}

        {approvedSlugs.includes("ui-design-practices") && (<article className="project" data-practice-work="ui-design-practices">
        <Link href="/work/ui-design-practices">
        <figure className="project-image practice">
        <InterfaceGuidancePreview />
        </figure>
        <div className="project-meta"><span>Design &amp; implementation</span><span aria-hidden="true">↗</span>
        </div>
        <h3>UI Design Practices
        </h3>
        <p>I make decisions about layout, interaction and implementation clear enough for a team to build from.
        </p><span className="read">Explore the case study <span aria-hidden="true">→</span></span>
        </Link>
        </article>)}

        {approvedSlugs.includes("ui-systems-lab") && (<article className="project" data-practice-work="ui-systems-lab">
        <Link href="/work/ui-systems-lab">
        <figure className="project-image practice">
        <InterfaceLabPreview />
        </figure>
        <div className="project-meta"><span>Independent UI systems lab</span><span aria-hidden="true">↗</span>
        </div>
        <h3>UI Systems Lab
        </h3>
        <p>I’m building a UI library and a place to try its patterns in prototype flows.
        </p><span className="read">Explore the lab <span aria-hidden="true">→</span></span>
        </Link>
        </article>)}

    </div>

    <p className="gallery-note">Client screens are modified to protect intellectual property. The AI Systems and UI Design Practices previews are illustrative. {approvedSlugs.includes("ui-systems-lab") && "The UI Systems Lab preview is an illustration."}
    </p>

    </section>
    <footer className="page-close">
    <p>Want to know more about how I work?
    </p>
    <Link href="/about">About me <span aria-hidden="true">→</span>
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
    <h1>Product design,<br /><em>systems and implementation.</em>
    </h1>
    <div className="about-intro">
    <p className="lead">I help teams turn complex workflows into products people can understand and teams can keep improving.
    </p>
    <p>I have over 13 years of experience across product design, systems thinking and implementation. I care about tools that help people spend less time fighting fires and more time on the work they came to do.
    </p>
    </div>
    </header>

    <dl className="stats" aria-label="Experience summary">{stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value.replace(/\+$/, "")}<span aria-hidden="true">{stat.value.endsWith("+") ? "+" : ""}</span><span className="sr-only">{stat.value.endsWith("+") ? " or more" : ""}</span></dd></div>)}</dl>

    <section className="approach">
    <div>
    <p className="eyebrow">How I contribute
    </p>
    <h2>How I work with a team.
    </h2>
    <p>I work from the task and its constraints through to a design the team can build and maintain.
    </p>
    </div>
    <div className="approach-list">
    <div>
    <h3>Understand the workflow.
    </h3>
    <p>I look at what people need to do, the decisions they make and the handoffs that shape the task.
    </p>
    <Link href="/work/ai-systems">See AI Systems <span aria-hidden="true">↗</span>
    </Link>
    </div>
    <div>
    <h3>Build shared foundations.
    </h3>
    <p>I identify repeated design decisions and make patterns teams can reuse or adapt to their product.
    </p>
    <Link href="/work/design-systems">See Design Systems <span aria-hidden="true">↗</span>
    </Link>
    </div>
    <div>
    <h3>Work through implementation.
    </h3>
    <p>I work with developers to make interaction, accessibility and edge cases clear before implementation.
    </p>
    <Link href="/work/ui-design-practices">See UI Design Practices <span aria-hidden="true">↗</span>
    </Link>
    </div>
    </div>
    </section>

    <footer className="page-close">
    <p>Have a product or design problem to work through?
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
    <h1>Tell me what<br /><em>you’re working on.</em>
    </h1>
    <p className="intro">I’m open to product design roles, collaboration and questions about my work. Send me a note.
    </p>
    </header>

    <section className="contact-panel" aria-label="Contact Rick">
    <div className="contact-label"><span>Email me</span><span>Direct contact</span>
    </div>
    <Link className="email" href={`mailto:${contact.email}`}>{contact.email} <span aria-hidden="true">↗</span>
    </Link>
    <div className="contact-bottom">
    <p>Tell me a little about your team and what you’re trying to solve.
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
    <p>I work across product workflows, design systems and AI-assisted design.
    </p>
    <Link href="/work" className="text-link">Explore the work <span aria-hidden="true">→</span>
    </Link>
    </div>
    </div>

    </article>);
}
