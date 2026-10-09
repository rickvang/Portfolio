"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="copy-control">
      <button onClick={copy} type="button">
        {state === "copied" ? "Copied" : "Copy email"}
        <span aria-hidden="true"> {state === "copied" ? "✓" : "⧉"}</span>
      </button>
      <p aria-live="polite" className={state === "failed" ? "copy-error" : "sr-only"} role="status">
        {state === "copied" && "Email address copied."}
        {state === "failed" && `Could not copy. Select ${email} to copy it manually.`}
      </p>
    </div>
  );
}
