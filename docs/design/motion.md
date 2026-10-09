# Cinematic motion contract

Motion supports continuity and hierarchy; it never carries the only copy of state or delays task completion.

| Pattern | Trigger | Duration / easing | Interruption | Repeat behavior | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Active rail marker + link state | Route/pathname changes, hover, or focus | `150ms` / `--ease-standard` | The newest route/pointer/focus state wins immediately; CSS transitions reverse naturally | Every applicable route or interaction state change | State changes immediately; active text + marker remain visible |
| Public chapter entry | A public route/page node mounts | `240ms` / `--ease-standard` | Navigation/unmount cancels the prior animation; the next route begins from its own current state | Once per public page mount, including direct loads | No animation; content renders at final opacity/position |
| Homepage thesis staging | Homepage mounts | `320ms` / `--ease-emphasized`, 0–110ms capped delays | Navigation/unmount wins; there is no queued sequence | Once per homepage mount | Coordinate, statement, and support render immediately in final state |
| Personal Practice homepage flow field | Homepage mounts; pointer gently offsets the field | Continuous slow canvas curves; particles cross in roughly 27–40s | Unmount cancels the frame and resize observer; preference changes immediately stop/restart motion | Owner-requested continuous hero motion only | One centered static frame, redrawn on resize; no pointer motion |
| Case-study chapter staging | Shared case-study renderer mounts | `320ms` / `--ease-standard`, 0–160ms capped delays | Navigation/unmount wins; anchors remain native and immediate | Once per case-study mount | Chapters render immediately in final state |
| Mobile drawer entry | Menu changes from closed to open | drawer `240ms` / `--ease-emphasized`; backdrop `150ms` / `--ease-standard` | Escape, backdrop/close action, or route selection closes immediately; no exit animation is allowed to delay focus recovery | Every explicit open | No animation; drawer appears in final position |
| Mobile drawer close | Escape, close control, backdrop, or route selection | `0ms` intentional | Close/focus recovery is authoritative | Every close | Same immediate behavior |
| Button / link affordance | Hover or focus state changes | `150ms` / `--ease-standard` | Latest pointer/focus state wins; transitions may reverse | Every interaction | Effectively immediate |
| Feedback message entry | Success/error feedback node appears | `150ms` / `--ease-standard` | New feedback replaces/cancels the prior node animation | Once per newly mounted feedback message | No animation |
| Case-study entry | Shared case-study page mounts | Inherits public chapter entry until the case-study template introduces a justified override | Navigation/unmount wins | Once per case-study mount | Inherits final-state rendering |
| Media reveal | Media is added and approved for a case study | **Not implemented yet.** Default requirement is visible content without JS; any later reveal must stay within `240ms` and use existing easing tokens | Scrolling/navigation must never leave media hidden | At most once per media item per page mount | Media renders immediately |

### Motion implementation rules

1. Prefer CSS transitions/animations for presentational motion; do not add a motion dependency while these patterns remain expressible in the platform.
2. Keep entering content visible throughout the effect. The current chapter reveal begins at 0.96 opacity rather than 0.
3. Close, cancellation, route navigation, browser history, keyboard input, and focus recovery take priority over completing an animation.
4. Do not queue animations. If state changes while an effect is running, current state becomes authoritative.
5. Motion may repeat when a user explicitly repeats an interaction or mounts a new route; it must not loop for decoration except for the owner-requested Personal Practice homepage flow field. This narrow exception uses the existing canvas, stays behind readable copy, and does not extend to other decorative motion.
6. A pattern is not implementation-complete until its reduced-motion behavior is defined and verified.
7. The shared case-study template groups existing typed sections into visible chapters and stages those chapter blocks on mount. Chapter anchors remain native and immediate; media reveal remains deferred until approved media exists, and no hidden placeholder DOM is created solely to demonstrate motion.
