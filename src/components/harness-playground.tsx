"use client";

import Link from "next/link";
import { useState } from "react";

import { CaseStudyTemplate } from "@/components/case-study-template";
import { ContactForm, type ContactStatus } from "@/components/contact-form";
import { EditorialDraftPreview } from "@/components/editorial-draft-preview";
import { AdminWorkflowPreview } from "@/components/admin-workflow-preview";
import { ImportedContentPreview } from "@/components/imported-content-preview";
import { PostList } from "@/components/post-list";
import { DeletePostForm } from "@/components/post-status-actions";
import { ProjectList } from "@/components/project-list";
import { caseStudyCatalog } from "@/lib/case-studies";
import { personaLedDesignDraft } from "@/lib/editorial-drafts";
import { importedContent } from "@/lib/imported-content";
import {
  harnessStates,
  portfolioFixtures,
  postsForState,
  projectsForState,
  type HarnessState,
} from "@/lib/fixtures";

const contactStatusForState: Record<HarnessState, ContactStatus> = {
  success: "success",
  loading: "idle",
  empty: "idle",
  error: "error",
  disabled: "idle",
  "long-content": "idle",
};

type HarnessPlaygroundProps = {
  initialState?: HarnessState;
};

export function HarnessPlayground({ initialState = "success" }: HarnessPlaygroundProps) {
  const [state, setState] = useState<HarnessState>(initialState);

  function resetHarness() {
    setState("success");
  }

  const disabled = state === "disabled";

  return (
    <main className="site-shell harness-shell" data-harness-state={state} data-testid="harness-root">
      <header className="harness-header">
        <div>
          <p className="eyebrow">Local-only development surface</p>
          <h1>Development harness</h1>
          <p className="lede">
            Deterministic UI states for the first portfolio slice. Use this page to inspect behavior before
            connecting real content or external services.
          </p>
        </div>
        <button className="button button-secondary" onClick={resetHarness} type="button">
          Reset harness
        </button>
      </header>

      <section className="harness-controls" aria-labelledby="state-controls-heading">
        <div>
          <p className="eyebrow">State matrix</p>
          <h2 id="state-controls-heading">Choose a fixture state</h2>
        </div>
        <div className="state-controls" data-testid="state-controls" role="group" aria-label="Fixture states">
          {harnessStates.map((option) => (
            <button
              aria-pressed={state === option}
              className={state === option ? "button state-button is-selected" : "button button-secondary state-button"}
              key={option}
              onClick={() => setState(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="surface-grid" aria-label="Harness component previews">
        <article className="surface-card">
          <p className="eyebrow">Public shell</p>
          <h2>Navigation verification</h2>
          <p>
            Exercise the production rail and drawer with deterministic route and initial-drawer states.
          </p>
          <p>
            <Link className="text-link" href="/dev/harness/shell?route=work">
              Open shell harness
            </Link>
          </p>
        </article>
        <article className="surface-card">
          <p className="eyebrow">Content adapter</p>
          <h2>{portfolioFixtures.profile.name}</h2>
          <p>{portfolioFixtures.profile.summary}</p>
        </article>
        <article className="surface-card">
          <p className="eyebrow">Contact flow</p>
          <ContactForm
            disabled={disabled}
            initialStatus={contactStatusForState[state]}
            key={`contact-${state}`}
          />
        </article>
        <article className="surface-card">
          <p className="eyebrow">Destructive action</p>
          <h2>Delete confirmation</h2>
          <p>Uses the production delete form with a non-production fixture identifier.</p>
          <DeletePostForm postId="00000000-0000-0000-0000-000000000001" />
        </article>
      </section>

      <section className="harness-section" aria-labelledby="imported-content-section-heading">
        <div>
          <p className="eyebrow">Draft content boundary</p>
          <h2 id="imported-content-section-heading">Imported source review</h2>
        </div>
        <ImportedContentPreview content={importedContent} />
      </section>

      <section className="harness-section" aria-labelledby="case-study-template-heading">
        <div>
          <p className="eyebrow">Shared case-study template</p>
          <h2 id="case-study-template-heading">Draft case-study review</h2>
          <p className="lede">
            Imported and authored drafts use the same renderer intended for approved public case studies, with
            review-only provenance and evidence controls added locally.
          </p>
        </div>
        <div className="case-study-review-stack" data-testid="case-study-review-stack">
          {caseStudyCatalog.map((caseStudy) => (
            <CaseStudyTemplate caseStudy={caseStudy} key={caseStudy.id} mode="review" />
          ))}
        </div>
      </section>

      <section className="harness-section" aria-labelledby="editorial-draft-heading">
        <div>
          <p className="eyebrow">Editorial draft</p>
          <h2 id="editorial-draft-heading">Persona-led design article review</h2>
          <p className="lede">
            This source-backed article remains separate from the published post adapter until editorial approval.
          </p>
        </div>
        <EditorialDraftPreview draft={personaLedDesignDraft} />
      </section>

      <section className="harness-section" aria-labelledby="projects-heading">
        <div>
          <p className="eyebrow">Reusable component</p>
          <h2 id="projects-heading">Project list</h2>
        </div>
        <ProjectList projects={projectsForState(state)} state={state} />
      </section>

      <section className="harness-section" aria-labelledby="posts-heading">
        <div>
          <p className="eyebrow">Content boundary</p>
          <h2 id="posts-heading">Posts preview</h2>
        </div>
        <PostList posts={postsForState(state)} state={state} />
      </section>

      <section className="harness-section" aria-labelledby="author-workflow-heading">
        <div>
          <p className="eyebrow">Author workflow</p>
          <h2 id="author-workflow-heading">Posts administration preview</h2>
        </div>
        <AdminWorkflowPreview state={state} />
      </section>
    </main>
  );
}
