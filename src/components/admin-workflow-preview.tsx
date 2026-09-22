import type { HarnessState } from "@/lib/fixtures";

type AdminWorkflowPreviewProps = {
  state: HarnessState;
};

const stateCopy: Record<
  HarnessState,
  { label: string; message: string; tone: "success" | "muted" | "error" }
> = {
  success: {
    label: "Draft ready",
    message: "Create, edit, preview, and publish a post from one author workflow.",
    tone: "success",
  },
  loading: {
    label: "Checking session",
    message: "The author workspace is loading its session and post list.",
    tone: "muted",
  },
  empty: {
    label: "No drafts yet",
    message: "The empty state gives authors a clear first action.",
    tone: "muted",
  },
  error: {
    label: "Author tools unavailable",
    message: "The workspace could not load. The failure stays visible and actionable.",
    tone: "error",
  },
  disabled: {
    label: "Author tools disabled",
    message: "Actions remain visible while unavailable, so the disabled state is testable.",
    tone: "muted",
  },
  "long-content": {
    label: "Long draft title fixture",
    message: "Long titles and status metadata should wrap without breaking the row layout.",
    tone: "success",
  },
};

export function AdminWorkflowPreview({ state }: AdminWorkflowPreviewProps) {
  const copy = stateCopy[state];
  const disabled = state === "disabled" || state === "loading";

  return (
    <div
      className="admin-workflow-preview"
      data-testid="admin-workflow-preview"
      data-workflow-state={state}
    >
      <div className="workflow-preview-copy">
        <p className="eyebrow">Deterministic author fixture</p>
        <h3>{copy.label}</h3>
        <p className={copy.tone === "error" ? "feedback-error" : undefined}>{copy.message}</p>
      </div>
      <div className="workflow-preview-actions" aria-label="Author workflow actions">
        <button className="button" disabled={disabled} type="button">
          New draft
        </button>
        <button className="button button-secondary" disabled={disabled} type="button">
          Publish
        </button>
      </div>
    </div>
  );
}
