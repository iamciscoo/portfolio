# Verification record

Verified locally on Windows, 22 October 2026, with Node.js 22.23.2 and npm 10.9.8.

## Two-variable contact revision, 23 October 2026

The current contact setup requires only `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. The sender is fixed to Resend's default domain, so the destination must be the Resend account email. Vercel supplies deployment-domain values automatically. The earlier shared-Redis records below describe a retired configuration.

All 63 unit/API tests pass, including the complete production route with only those two configured values, a real in-memory limiter and a mocked email provider. Tests cover acknowledgements, five allowed requests followed by refusal, separate clients, bucket capacity/expiry, cold-start resets, cross-origin rejection, forwarded-host spoofing and automatic metadata domains. The five focused browser checks pass for contact validation, templates, optional phone, form accessibility and metadata endpoints. No real email was sent.

ESLint, strict TypeScript and the production build with 81 generated routes pass. The production dependency audit reports no vulnerabilities. The limiter is bounded best-effort per instance, not a shared deployment-wide quota. Existing `.env.local` contents are unchanged. See `DEPLOYMENT.md` for the two-variable Vercel setup and provider restrictions.

## Previous mobile clarity revision

52 unit/API tests, ESLint and the 81-route production build pass. The full expanded browser suite passed all 64 cases, including 75 localized route combinations, five viewport widths, accessibility, templates, new concepts, themes, keyboard navigation, reduced motion and no-JavaScript content. Phone checks at 320px and 390px cover all five languages, larger body type, less repeated copy, earlier website displays and zero page overflow.

Template placement is verified between the brief label and textarea. The phone selector spans the textarea width (350px at a 390px viewport). Selection preserves existing text until an explicit replace/apply action, keeps contact details intact and focuses the editable brief. The English phone hero measured 455.5px, with 16px body type and 28px leading. Mobile background travel is limited to 24px, hero copy stays fixed, and reduced motion removes decorative transforms. A browser-only inversion of the compact travel branch was rejected by the motion assertion, without modifying source or server files.

The mobile arrow link retains an explicit translated accessible name when its visible label is condensed. After this final semantic adjustment, all five mobile clarity cases passed on the final production build, including the phone accessibility scan. The source and documentation audit finds no literal or encoded em dashes in tracked text. Browser contact POSTs remain intercepted and no live email was sent. Preview uses port 3000 only. See `MOBILE-CLARITY.md` for design changes and production screenshots.

## Prior revisions

## Earlier compact studio revision

52 unit/API tests, ESLint, strict TypeScript and the production build pass. The build generates 81 routes including special endpoints. All 75 combinations of five languages and 15 portfolio/demo routes render with localized metadata; the five-width responsive suite includes both new shop and tour concepts.

The expanded full browser run passed 59 of 60 cases. Its remaining no-JavaScript test used an ambiguous single-link selector after a second project CTA was added. That selector now explicitly targets the case-study link. After the final horizontal-rail cleanup, all 23 affected browser cases passed in a final production run, including that no-JavaScript case, all five composition widths, normal/reduced motion, keyboard controls, touch input, both themes, photo viewers and new-demo interactions/accessibility. The other 37 cases had passed in the full run. The final rerun covers the components affected by the last cleanup.

The normal-motion rail regression confirms no internal vertical overflow. Removing the old vertical project animation avoids transient scrollbars inside the horizontal track. The final desktop rail measured 719px for both client and scroll height. The English mobile hero measured 434.75px at 390px width. Every published photo was checked for actual WebP bytes: 26 files, zero exceptions. The optimized image endpoint returned `image/webp` even with an AVIF-first Accept header.

A browser-only mutation changed the sample basket total to ignore quantity. The existing quantity-total assertion rejected it. No source or server file was changed by that experiment. The final shop regression passes quantity changes and removal against the unmodified implementation. All browser contact POSTs remain intercepted; no live email, order, payment or booking was sent.

Final production screenshots in `refinement-preview/`: `home-new-desktop.webp`, `home-new-mobile.webp`, `home-horizontal-work.webp`, `rail-new-mobile.webp`, `shop-new-desktop.webp`, `shop-new-mobile.webp`, `tours-new-desktop.webp`, `tours-new-mobile.webp` and `photo-viewer-mobile.webp`. Photos were decoded before capture. Port 3000 is the only Portfolio preview listener. See `COMPACT-STUDIO.md` for the interaction design, saved artwork and full prompts.

## Previous photo revision

Previous photo/showcase revision: 52 unit/API tests and 52 browser tests pass. Strict TypeScript, ESLint and production build pass (71 generated routes including special endpoints). All 65 combinations of five languages and 13 portfolio/demo routes render with localized metadata. New browser checks verify transparent project stages, complete browser displays and visible phone displays at 1440, 768, 390 and 320 pixels; fresh Instagram photo paths; Original/Enhanced switching; translated controls on small phones; focus return; and photo-viewer accessibility. About opens with the new boat photograph and includes the new TIMUN assembly photo. Four AI-assisted clarity variants preserve originals for comparison. Only port 3000 is used for the Portfolio preview. See `PHOTOS-AND-DISPLAYS.md` for exact sources, output dimensions and the editing prompt.

The prior cinematic revision also passed five-width and short-height hero checks, both-theme About accessibility and an 18-frame scroll harness with no dead scroll and all marked text cues above 4.5:1 contrast. Its hero and animation implementation are unchanged in this revision. French and Spanish dictionaries, content, flags, URL switching and inquiry language validation remain implemented. See `CINEMATIC-REFINEMENT.md` for that artwork and verification.

A photo-comparison mutation experiment swapped the Original/Enhanced status condition in an isolated browser's intercepted JavaScript response. The same status assertion used by the regression test rejected the mutation, then passed against the unmodified production response. No source, build files or server state were changed by this experiment.

The Code Review and Quality regression experiment removed French/Spanish from server validation temporarily: the localized-template test failed as expected. After restoring the exact source bytes, all 26 contact tests passed again. No mutation remains. Browser tests intercept contact POSTs and this revision sent no live email. The initial unconfigured-provider limits below describe earlier builds; email is now configured locally. The prior sample-email incident is documented in `SOFTWARE-INQUIRIES.md`.

Current photo/showcase proof screenshots in `refinement-preview/`: `showcase-globo.webp`, `showcase-iphone.webp`, `about-opening.webp`, `about-opening-mobile.webp`, `about-desktop.webp`, `about-moments.webp`, `photo-enhanced.webp` and `photo-original.webp`. Photographs were decoded before final capture; showcase crops come from full-page screenshots to avoid sticky-header overlays. Prior hero/navigation proof remains in `hero-desktop.webp`, `hero-mobile.webp`, `hero-short-screen.webp`, `nav-hover.webp`, `fr-hero.webp` and `es-hero.webp`. Temporary scroll frames/report are under `tmp/scrollcraft-qa/cinematic-desktop/`; the reference harness is unchanged and the existing sticky-header sampling adaptation was applied in memory. Aborted Next prefetch requests at browser shutdown are logged by the harness; page navigation and all route checks pass.

The following original-build checks and integration notes are retained as historical evidence; the current passing counts are above.

- Strict TypeScript check and ESLint: passing.
- Unit and API tests: 37 passing. These cover locale recognition, dictionary completeness, Zod field boundaries, HTML escaping, streamed body-size enforcement, Origin checks, missing configuration, rate-limit refusal/failure, provider errors, acknowledged success and stable retry keys. Shared Redis integration is tested with HTTP test doubles, never a production secret.
- Browser checks: 34 tests pass. All 39 English, Russian and Kiswahili route combinations render. Home, contact, a real case study and all four demos fit 320, 390, 768, 1280 and 1440 pixel viewports in every locale. Photography/story/project/studio/contact sequences have screenshots at these widths; About, Journey and both case studies were also inspected.
- Interactions: SVG-flag language menus support keyboard operation, checked state, Escape/focus restoration and full names inside mobile navigation. Switching preserves paths, query strings and hashes; mobile navigation closes; theme persists; filters and galleries work; inquiries show localized errors; demo requests remain local. A separate production smoke check verified touch taps through mobile navigation into Russian.
- Automated axe WCAG A/AA checks: no violations on the home page, contact page or four studio concepts. Automated checks do not replace a full human accessibility audit.
- Production build: passing. Portfolio content and demo pages are statically generated in three languages; contact remains dynamic. No build-time font or live-site fetch is required.
- Production smoke checks cover the portfolio, localized content, all concepts, sitemap, robots and Open Graph image endpoint.
- A mutation check deliberately weakened name validation; the malformed-name test failed as expected. The production validation was then restored and the full unit suite passed.
- Desktop and mobile site verification used isolated Chrome with saved screenshots. The owner-authorized authenticated Chrome session was used only to visually review the two requested Instagram profiles and retrieve selected personal photographs. No credentials or cookies were extracted.
- Reduced-motion hydration reports no browser errors; decorative transforms and sticky holds are removed immediately. The full home content and native project links work with JavaScript disabled. This check caught and led to removal of the unnecessary locale loading/Suspense boundary.

## Refinement scroll and production evidence

The actual Scroll Craft doctor and workspace procedures passed all required checks. The supplied shoot harness captured 18 per-act frames for each of desktop, mobile and reduced motion. Production runs report all sampled heading cues above 4.5:1 and no detected dead scroll. There are no video scrubs or long pinned acts; those engine-specific checks are not claimed. Separate browser assertions confirm hero transform changes and reduced-motion output.

The upstream harness hides fixed chrome before contrast sampling, but not sticky chrome. An in-memory one-line adaptation also hides `.site-header` in the background-only sampling shot; the reference checkout stays unchanged. Original reports are retained. Mobile development captures also sampled the Next dev badge over a heading; final production captures remove that development-only artifact. See `docs/REFINEMENT.md` for the exact adaptation.

The production harness records expected `ERR_ABORTED` cancellations of Next's speculative `_rsc` link prefetches as sections leave the viewport. Actual route navigations, images and metadata endpoints succeed; no runtime console or hydration errors occurred. These cancellations are not failed form submissions or navigation failures.

A local, unthrottled production sample observed LCP 1.63s / CLS 0.0008 at 1440px and LCP 0.16s / CLS 0 at 390px, with responsive image caching and no simulated network latency. These are single-machine smoke measurements, not field Core Web Vitals or a Lighthouse score. The hero is prioritized, other photographs are lazy-loaded, and motion uses transforms rather than layout or per-scroll React state updates.

Selected screenshots and JSON summaries are in `docs/refinement-preview/`. Full temporary screenshots/reports remain in `tmp/refinement-qa/`, `tmp/production-qa/` and `tmp/scrollcraft-qa/`. Lint, strict TypeScript, 37 unit/API tests, 34 browser tests, production build and production route/touch smoke checks all pass. Runtime dependency audit remains clean.

## Dependency review

`npm audit --omit=dev --audit-level=high` reports zero runtime vulnerabilities. Full audit reports five linked high-severity findings through `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. The root advisory is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), a deeply nested glob-pattern denial of service in braces ≤3.0.3. The registry's latest braces release at review was 3.0.3, with no compatible patched release available. npm's suggested forced remediation downgrades the Next ESLint configuration across a major version and is not applied.

This dependency is reachable only in developer/CI lint tooling using repository-controlled patterns, not the deployed application request path. Do not pass untrusted glob expressions into lint tools. Review again by 21 November 2026 or when a compatible patch appears. CI blocks high/critical runtime advisories. This is a documented development-tooling deferral, not a claim of a completely clean full audit.

Package versions are pinned and the authoritative npm lockfile is committed. Lifecycle scripts are disabled; required native dependencies use published prebuilt binaries.

## Integration limits

The initial source commit was pushed successfully to `iamciscoo/portfolio` on `main`. GitHub Actions [run 39790579156](https://github.com/iamciscoo/portfolio/actions/runs/39790579156) failed before any job steps ran: GitHub reports, "The job was not started because your account is locked due to a billing issue." This is an account-level CI blocker; no failing application check was reported by that run. Resolve the account billing issue and rerun the workflow to obtain hosted CI results. Local lint, typecheck, 37 unit/API tests, 23 browser tests and the production build passed.

Email is now configured locally by the parallel agent. One sample browser inquiry was accepted by the provider before that change was detected; this was disclosed to the owner. Inbox delivery was not independently checked. All subsequent browser contact POSTs are intercepted by the shared test fixture, and provider behaviour is verified with isolated test doubles. See `SOFTWARE-INQUIRIES.md` for the incident and current verification details. No environment credentials were changed or committed.

Vercel deployment requires the owner's connected Vercel account and project/environment configuration. A successful local build and GitHub push are not a cloud deployment. No field performance or production Core Web Vitals measurements are claimed.

The original CV remains private. Authentic profile photography is now implemented, with sources and approval recorded in `public/images/profile/manifest.json`. An approved public CV, current degree/enrollment dates and project technology stacks remain owner content tasks. A specifically identified Russia photograph is optional; no current image is assigned that location without evidence.
