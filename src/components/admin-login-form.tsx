"use client";

import { useActionState } from "react";

import { signIn } from "@/app/admin/login/actions";

type AdminLoginFormProps = {
  nextPath: string;
};

export function AdminLoginForm({ nextPath }: AdminLoginFormProps) {
  const [state, action, pending] = useActionState(signIn, {});

  return (
    <form action={action} className="admin-form">
      <input name="next" type="hidden" value={nextPath} />
      <div className="form-row">
        <label htmlFor="admin-email">Email</label>
        <input autoComplete="email" id="admin-email" name="email" required type="email" />
      </div>
      <div className="form-row">
        <label htmlFor="admin-password">Password</label>
        <input autoComplete="current-password" id="admin-password" name="password" required type="password" />
      </div>
      {state.error && <p className="feedback-error" role="alert">{state.error}</p>}
      <button className="button" disabled={pending} type="submit">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
