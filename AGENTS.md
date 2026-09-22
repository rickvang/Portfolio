# Portfolio repository instructions

## Purpose

This repository owns the rickvang.com web application. It is independent from the Persona Workspace coordination repository and from the canonical Persona-Library content repository.

## Development contract

- Use pnpm and the Node version declared in `package.json`.
- Read `ARCHITECTURE.md` and `DECISIONS.md` before changing system boundaries.
- Read `DESIGN.md` before making visual changes or adding reusable components.
- For reusable component work, use the canonical `component-builder` method from `SkillRepo` when it is available in the shared workspace.
- Keep product content separate from reusable UI and infrastructure.
- Add or update deterministic fixtures in `fixtures/seed.json` when a state needs to be represented in the harness.
- Keep `/dev/harness` local-only. It must not be accessible in production.
- Prefer accessible queries and user-visible behavior in Playwright tests.
- Do not add external services, secrets, databases, or deployment configuration without an explicit decision and documentation.
- Add Supabase schema changes as migrations and keep RLS enabled on exposed tables.
- Run the narrowest relevant checks while iterating and `pnpm verify` before completing substantial changes.
- Run `pnpm test:e2e` for browser verification; its runner owns and cleans up the temporary dev server. Use `PW_REUSE_SERVER=true` only when invoking Playwright directly against a server you started separately.

## Definition of done

A change is complete when its behavior is implemented, the relevant harness state exists, documentation is current, and applicable lint, type, unit, browser, and build checks have run successfully.
