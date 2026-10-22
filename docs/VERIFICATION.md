# Verification record

Verified locally on Windows, 22 October 2026, with Node.js 22.23.2 and npm 10.9.8.

Latest continuation: 52 unit/API tests and 43 browser tests pass after adding optional phone details, editable templates and software services while preserving the parallel agent's artwork. See `SOFTWARE-INQUIRIES.md` for the current verification and live-email test note. The initial unconfigured-provider limits below describe the earlier build; email is now configured locally, and regression tests explicitly intercept contact submissions.

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
