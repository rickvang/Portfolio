import Link from "next/link";

import type { CaseStudy } from "@/lib/case-studies";
import styles from "./interface-lab-concept.module.css";

const storyUrl = "https://ui-starter.rickvang.com/?path=/story/patterns-create-a-record--create-record";

export function InterfaceLabConcept({ caseStudy }: { caseStudy: CaseStudy }) {
  const catalogUrl = caseStudy.sources.find((source) => source.id === "storybook-catalog")?.url;
  const sources = caseStudy.sources.filter((source) => source.id === "vite-repository" || source.id === "tanstack-repository");
  const context = caseStudy.sections.find((section) => section.kind === "context");
  const system = caseStudy.sections.find((section) => section.kind === "system-practice");
  const exploration = caseStudy.sections.find((section) => section.kind === "exploration");
  const reflection = caseStudy.sections.find((section) => section.kind === "reflection");

  return (
    <article className={styles.concept} data-case-study-status={caseStudy.reviewStatus}>
      <Link href="/work" className={styles.back}>← All work</Link>
      <header className={styles.hero}>
        <p className={styles.heroTop}>UI Systems Lab · Personal project · Interface design &amp; prototyping</p>
        <div className={styles.heroGrid}>
          <h1>Building a place to <em>think in UI.</em></h1>
          <div className={styles.heroAside}>
            <p>{caseStudy.summary}</p>
            {catalogUrl && <a className={styles.primary} href={catalogUrl} target="_blank" rel="noreferrer">Explore Storybook <span aria-hidden="true">↗</span></a>}
          </div>
        </div>
      </header>

      <section className={styles.why} aria-labelledby="why-title">
        <h2 id="why-title">{context?.title}</h2>
        <div className={styles.prose}>
          {context?.body?.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section id="the-work" className={styles.feature} aria-labelledby="feature-title">
        <div className={styles.featureIntro}>
          <h2 id="feature-title">{system?.title}</h2>
          <p>{system?.body}</p>
        </div>
        <figure className={styles.specimen}>
          <div className={styles.specimenTop}>Create a record / Illustrated pattern</div>
          <p className={styles.diagramIntro}>A form group brings reusable controls together. The pattern adds a result state to complete the example.</p>
          <div className={styles.exploded}>
            <div className={styles.foundationStrip}>
              <div className={styles.foundationIntro}><p className={styles.calloutLabel}>Shared foundations</p><h3>See the choices in the form</h3><p>Match each marker to an example in the form. These choices are reused throughout the interface.</p></div>
              <div className={styles.foundationChoices} aria-label="Foundation examples: color, type, and spacing">
                <div><div><span className={styles.foundationKey} aria-hidden="true">C</span><strong>Color</strong></div><small>Save button</small></div>
                <div><div><span className={styles.foundationKey} aria-hidden="true">T</span><strong>Type</strong></div><small>Field labels</small></div>
                <div><div><span className={styles.foundationKey} aria-hidden="true">S</span><strong>Spacing</strong></div><small>Between fields</small></div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.groupHeading}><span>Module</span><strong>Form group</strong></div>
              <p className={styles.groupDescription}>Two text fields and actions, grouped under one heading.</p>
              <div className={styles.formArt} aria-hidden="true">
                <strong>Project</strong>
                <span className={styles.markedLabel}>Project name <i className={styles.foundationKey}>T</i></span><div className={styles.inputArt}>Studio</div><small>Shown on the project home.</small>
                <span className={styles.descriptionLabel}>Description <i className={`${styles.foundationKey} ${styles.gapKey}`}>S</i></span><div className={styles.inputArt}>The design system for North.</div>
                <div className={styles.buttonArt}><span className={styles.markedButton}><b>Save</b><i className={styles.foundationKey}>C</i></span><span>Cancel</span></div>
              </div>
            </div>

            <div className={`${styles.callout} ${styles.fieldCallout}`}>
              <p className={styles.calloutLabel}>Component</p>
              <h3>Text field</h3>
              <p>Label, input, and optional hint.</p>
              <div className={styles.fieldSample} aria-hidden="true"><strong>Project name</strong><span>Studio</span><small>Shown on the project home.</small></div>
            </div>

            <div className={`${styles.callout} ${styles.actionCallout}`}>
              <p className={styles.calloutLabel}>Component + layout</p>
              <h3>Actions</h3>
              <p>Shared spacing keeps the buttons together at the end of the form.</p>
              <div className={styles.actionSample} aria-hidden="true"><div className={styles.actionPair}><span>Save</span><span className={styles.layoutGap}>↔</span><span>Cancel</span></div><small>Spacing between actions</small></div>
            </div>
          </div>

          <div className={styles.resultConnection}>
            <div><p className={styles.calloutLabel}>Pattern / Result state</p><h3>After save</h3><p>The story switches from the form to a confirmation with a way back.</p></div>
            <div className={styles.resultSample} aria-hidden="true"><span>Saved</span><p>Local demo state</p><strong>Back to the form</strong></div>
          </div>

          <figcaption>Illustrations based on the create-record Storybook source, shown in the portfolio’s colors. The example’s save action changes local UI state; it does not persist a record. <a href={storyUrl} target="_blank" rel="noreferrer">Open the story ↗</a></figcaption>
        </figure>
      </section>

      <section id="lab-flow" className={styles.practice} aria-labelledby="practice-title">
        <div className={styles.practiceHeading}><h2 id="practice-title">{exploration?.title}</h2><p>{exploration?.body}</p></div>
        <figure className={styles.flowComparison}>
          <div className={styles.flowVersions}>
            <div className={styles.flowVersion}>
              <h3>Rough flow</h3><p>Sketch the steps before the details.</p>
              <div className={`${styles.flowScreen} ${styles.roughScreen}`}>
                <div className={styles.flowScreenBar}>Project form</div>
                <div className={styles.roughScreenBody}><strong>Enter project details</strong><span /><span /><div>Save</div></div>
              </div>
              <div className={styles.screenLink}><span aria-hidden="true">↓</span> Save</div>
              <div className={`${styles.flowScreen} ${styles.roughScreen} ${styles.flowResult}`}><div className={styles.flowScreenBar}>Result</div><div>Show confirmation</div></div>
            </div>
            <div className={styles.flowTransition} aria-hidden="true"><span>Same task</span><strong>→</strong><span>More detail</span></div>
            <div className={styles.flowVersion}>
              <h3>With more detail</h3><p>Bring in fields, actions, and feedback.</p>
              <div className={styles.flowScreen}>
                <div className={styles.flowScreenBar}>Project form</div>
                <div className={styles.detailedScreenBody}><strong>Project name</strong><span>Studio</span><strong>Description</strong><span>The design system for North.</span><b>Save</b></div>
              </div>
              <div className={styles.screenLink}><span aria-hidden="true">↓</span> Save</div>
              <div className={`${styles.flowScreen} ${styles.flowResult}`}><div className={styles.flowScreenBar}>Result</div><div><span className={styles.flowSaved}>Saved</span><small>Local demo state</small></div></div>
            </div>
          </div>
          <figcaption>Illustrative example: the same form-to-result flow at two levels of detail. This is not a screenshot or a record of a completed study.</figcaption>
        </figure>
        <p className={styles.note}>The Vite and TanStack starters are separate projects with parallel patterns. {sources.map((source, i) => <span key={source.id}>{i > 0 && " · "}<a href={source.url} target="_blank" rel="noreferrer">{source.id === "vite-repository" ? "Vite source" : "TanStack source"} ↗</a></span>)}</p>
      </section>

      <section className={styles.next} aria-labelledby="next-title">
        <h2 id="next-title">{reflection?.title}</h2>
        <div><p>{reflection?.body}</p>{catalogUrl && <a href={catalogUrl} target="_blank" rel="noreferrer">Explore the catalog ↗</a>}</div>
      </section>
      <footer className={styles.footer}><Link href="/work">← Back to all work</Link><span>UI Systems Lab / A work in progress</span></footer>
    </article>
  );
}
