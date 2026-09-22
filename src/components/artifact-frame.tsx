import type { ReactNode } from "react";

type ArtifactFrameState = "derived" | "deferred";

type ArtifactFrameProps = {
  children?: ReactNode;
  label: string;
  note?: string;
  state?: ArtifactFrameState;
};

const stateLabels: Record<ArtifactFrameState, string> = {
  derived: "Content-derived view",
  deferred: "Source media deferred",
};

export function ArtifactFrame({ children, label, note, state = "derived" }: ArtifactFrameProps) {
  return (
    <figure className="artifact-frame" data-artifact-state={state}>
      <div className="artifact-frame-header">
        <span className="artifact-frame-label">{label}</span>
        <span className="artifact-frame-state">{stateLabels[state]}</span>
      </div>
      <div className="artifact-frame-body">
        {children ??
          (state === "deferred" ? (
            <div className="artifact-frame-empty">
              <strong>Source media deferred</strong>
              <p>The original project media is not shown in this state.</p>
            </div>
          ) : null)}
      </div>
      {note && <figcaption>{note}</figcaption>}
    </figure>
  );
}
