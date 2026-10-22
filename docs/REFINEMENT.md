# Portfolio refinement - 22 October 2026

The owner explicitly requested implementation and delegated creative decisions. Existing routes, locales, real-project links, concept demos, metadata, Resend and deployment configuration are retained.

| Before | After | Why |
| --- | --- | --- |
| Graphic portrait placeholders | Authentic photo print with blue backing and identity caption | Introduce the person and connect his photography with the existing brand |
| Short About block | Three chapters beside a sticky candid portrait | Explain Tanzania, current study in Russia and solo versus team contributions |
| Small home project cards | Broad exhibits with independent desktop and phone motion | Give real interfaces and contributions room |
| Uniform studio rhythm | Asymmetric proportions and staggered placement, preserving four brands | Make exploration varied without changing the demos |
| Static timeline | Native-scroll progress line and restrained milestone emphasis | Help readers follow education and work |
| Generic closing block | Grouped personal portrait, name/location and large invitation | End with an approachable contact path |
| EN/RU/SW select | SVG flags, full names, checked state and keyboard menu | Consistent Windows rendering and clear navigation |

## Sources and decisions

Read the actual [Scroll Craft skill](https://github.com/nateherkai/scroll-craft/blob/75d81f74e83692add18cd7a8a8e078b8a887a579/plugins/nateherk-design/skills/scroll-craft/SKILL.md) and hero-depth, feel, devices, taste, uniqueness, verify and approved-collection references. The reference checkout remains in ignored `tmp/scroll-craft-reference`; it was not installed globally. Workspace and doctor scripts passed required checks. Only the optional generation key is absent. The workspace brief is `docs/scrollcraft/builds/refinement/BRIEF.md`.

Emil Design Engineering and Impeccable were located in the installed Hermes plugin and read. Frontend engineering, incremental implementation, git workflow and browser-testing guidance were also used. `PRODUCT.md` and `DESIGN.md` record the direction. The original font/palette remain, with a small Georgia italic personal accent. Uploaded photography was preferred for hero/lifestyle. No generated likeness is used.

Motion follows the [official useScroll API](https://motion.dev/docs/react-use-scroll). The control uses [Radix Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu) for keyboard, focus and radio selection, with [next-intl navigation](https://next-intl.dev/docs/routing/navigation) retaining locale routing. The one added runtime dependency is the Radix dropdown package, consistent with the existing dialog architecture.

## Progressive rendering fixes

The no-JavaScript test initially exposed the existing locale loading boundary: React streamed the page into a hidden Suspense segment while the skeleton stayed visible. Removing that unnecessary boundary makes the complete server-rendered page readable without JavaScript. Native links still work; interactive menus and validation require JavaScript as before.

Reduced-motion verification exposed differing server/client transform attributes when the media-query hook changed the first client render. Transform props are now deterministic across hydration; CSS media queries suppress decorative transforms and sticky holds immediately. Timeline emphasis has no hidden initial state. Content and CTAs never depend on animation completing.

## Verification evidence

See `VERIFICATION.md` for final results. Browser assertions live in `tests/e2e/refinement.spec.ts` and `portfolio.spec.ts`. Screenshots and Scroll Craft reports are under ignored `tmp/refinement-qa` and `tmp/scrollcraft-qa`; selected review images are in `docs/refinement-preview/`.

The supplied shoot harness was first used unchanged for per-act screenshots and contrast inspection. It hides fixed chrome in its background-only contrast shot; this app has a sticky header. Final production runs use one in-memory sampling adaptation, leaving the reference checkout intact:

```js
// Upstream sampling guard:
if (getComputedStyle(el).position !== "fixed") return;
// React portfolio sampling guard:
if (getComputedStyle(el).position !== "fixed" && !el.matches(".site-header")) return;
```

This changes only the bare-background diagnostic shot; screenshots of the actual page retain the header. Run against the production server to avoid the Next development badge. Both original and adapted reports are retained. Final runs use `--width 1440 --height 900 --per-act 3`, `--width 390 --height 844 --per-act 3`, and the latter with `--reduced-motion`.

`sc-ready` means progressive server markup is ready; `data-sc-act`, `data-sc-stage` and `data-sc-cue` expose actual compositions. No standalone Scroll Craft DOM/video engine is loaded and no engine/video-specific diagnostics are claimed. Native transforms, reduced motion, keyboard menus and no-JavaScript readability have separate assertions.
