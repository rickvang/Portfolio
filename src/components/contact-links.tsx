"use client";

import { useEffect, useId, useRef, useState } from "react";

type ContactLinksProps = { email: string; linkedInUrl: string };

export function ContactLinks({ email, linkedInUrl }: ContactLinksProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tipId = useId();
  const fallback = useRef<HTMLInputElement>(null);
  useEffect(() => { if (state === "failed") { fallback.current?.focus(); fallback.current?.select(); } }, [state]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 2500);
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="practice-contact" role="group" aria-label="Contact Rick">
      <button className="practice-connection" type="button" aria-label="Copy email address" aria-describedby={tipId} onClick={copyEmail} data-copied={state === "copied"}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
        <span className="practice-contact-tip" id={tipId}><strong>{state === "copied" ? "Copied" : "Copy email"}</strong><span>{email}</span></span>
      </button>
      <a className="practice-connection" href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn, opens in a new tab">
        <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52zM7.93 18.75H4.98V9.2h2.95v9.55zM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.31h.04c.39-.74 1.36-1.52 2.8-1.52 2.99 0 3.55 1.97 3.55 4.53v5.23z"/></svg>
        <span className="practice-contact-tip">LinkedIn</span>
      </a>
      <p className={state === "failed" ? "practice-contact-error" : "practice-contact-status"} role="status">
        {state === "copied" && "Email address copied."}
        {state === "failed" && <>Could not copy. Select and copy: <input ref={fallback} aria-label="Email address to copy manually" value={email} readOnly onFocus={(event) => event.currentTarget.select()} /></>}
      </p>
    </div>
  );
}
