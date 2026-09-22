"use client";

import { FormEvent, useState } from "react";

export type ContactStatus = "idle" | "success" | "error";

type ContactFormProps = {
  disabled?: boolean;
  initialStatus?: ContactStatus;
};

export function ContactForm({
  disabled = false,
  initialStatus = "idle",
}: ContactFormProps) {
  const [status, setStatus] = useState<ContactStatus>(initialStatus);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!disabled) setStatus("success");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" placeholder="Your name" disabled={disabled} />
      </div>
      <div className="form-row">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          disabled={disabled}
        />
      </div>
      <div className="form-row">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="What would you like to talk about?"
          disabled={disabled}
        />
      </div>
      <button className="button" type="submit" disabled={disabled}>
        Send message
      </button>
      <div aria-live="polite" className="form-feedback">
        {status === "success" && <p className="feedback-success">Message ready to send.</p>}
        {status === "error" && (
          <p className="feedback-error" role="alert">
            Something went wrong. Try again.
          </p>
        )}
        {disabled && <p>The form is disabled in this state.</p>}
      </div>
    </form>
  );
}
