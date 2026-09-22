"use client";

import { useState } from "react";

import { ContactForm, type ContactStatus } from "@/components/contact-form";
import { AdminWorkflowPreview } from "@/components/admin-workflow-preview";
import { PostList } from "@/components/post-list";
import { ProjectList } from "@/components/project-list";
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
