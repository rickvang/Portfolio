import type { ReactNode } from "react";

type ArtifactFrameProps =
  | {
      children: ReactNode;
      label: string;
      note?: string;
      state: "derived";
    }
  | {
      children?: never;
      label: string;
      note?: string;
      state: "deferred" | "redacted";
    };

const stateLabels = {
  derived: "Text-derived view",
  deferred: "Source media deferred",
  redacted: "Source detail withheld",
} as const;

const placeholderMessages = {
  deferred:
    "Source media is not shown while ownership and client-disclosure review is incomplete.",
  redacted:
    "Client-specific source detail is withheld. No replacement screen or illustration is shown.",
} as const;

export function ArtifactFrame({ children, label, note, state }: ArtifactFrameProps) {
  return (
    <figure className="artifact-frame" data-artifact-state={state}>
      <div className="artifact-frame-header">
        <strong className="artifact-frame-label">{label}</strong>
        <span className="artifact-frame-state">{stateLabels[state]}</span>
      </div>
      <div className="artifact-frame-body">
        {state === "derived" ? (
          children
        ) : (
          <div className="artifact-frame-empty" role="note">
            <strong>{state === "deferred" ? "Media not included" : "Source detail withheld"}</strong>
            <p>{placeholderMessages[state]}</p>
          </div>
        )}
      </div>
      <figcaption>
        {note ??
          (state === "derived"
            ? "This view is composed from the approved case-study text."
            : placeholderMessages[state])}
      </figcaption>
    </figure>
  );
}

