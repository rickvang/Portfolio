# Release and design history

Issue #6 Phase 7 closes the recorded UI/release audit findings as follows:

- **Supabase session refresh:** `/admin/:path*` requests pass through the request-scoped Supabase SSR refresh helper before Server Components consume auth cookies; missing configuration remains a no-op rather than a failed request.
- **Focus-ring contrast:** keyboard focus uses the documented two-tone light/dark ring instead of a single orange outline that could disappear against accent or dark surfaces.
- **Notes navigation assertion:** the public Notes browser journey asserts the Notes link carries `aria-current="page"`.
- **Destructive-action confirmation:** `DeletePostForm` requires an explicit native checkbox and `deletePost` independently validates the confirmation value before auth or deletion; the harness verifies that an unchecked form cannot submit and that the confirmed path reaches the server boundary.
- **Production harness link:** public browser coverage asserts no `/dev/harness` link is exposed; the development surfaces remain guarded from production.
- **Health/readiness semantics:** `/api/health` reports `status: "ready"` only when Supabase is configured and otherwise reports `status: "degraded"` with `readiness.overall: false`, while keeping the liveness response available for local/CI startup checks.



### Personal Practice motion language

Issue #47 adds one restrained motion vocabulary to the Personal Practice shell:

- a shared orange desktop rail marker follows the active navigation item and temporarily tracks hover/focus;
- the rail, Home headline, supporting copy, action links, and first structural rule use a one-time entrance sequence that completes in roughly 330 ms;
- Selected Work rows use a subtle surface/divider response and a 3–4 px arrow translation for pointer hover and keyboard focus;
- narrow navigation remains static;
- `prefers-reduced-motion: reduce` removes entrance animations, marker glide, and work-row translations while preserving the same visible states.

Motion may reinforce orientation and affordance, but it must not carry content meaning, create required delays, loop, parallax, or replace focus/active semantics.

### Reduced warm chroma selection

Issue #43 compared the shipped warm palette against lower-chroma warm and near-neutral candidates on the real Personal Practice surface. Candidate B was selected for production.

- Canvas: `#f7f6f2`
- Surface: `#fffefc`
- Muted surface: `#e8e7e4`
- Strong surface: `#dcdcd9`
- Border: `#cfcfcc`

Foreground, muted text, orange accent, semantic status colors, typography, spacing, IA, and content remain unchanged. The production palette uses fixed semantic tokens; the experimental A/B/C selector and candidate-generation UI do not ship.
