# Verification record

Verified locally on Windows, 22 October 2026, with Node.js 22.23.2 and npm 10.9.8.

- Strict TypeScript check and ESLint: passing.
- Unit and API tests: 37 passing. These cover locale recognition, dictionary completeness, Zod field boundaries, HTML escaping, streamed body-size enforcement, Origin checks, missing configuration, rate-limit refusal/failure, provider errors, acknowledged success and stable retry keys. Shared Redis integration is tested with HTTP test doubles, never a production secret.
- Browser checks: 23 tests pass. All English, Russian and Kiswahili route combinations render. Home, contact, a real case study and all four demos fit 320, 768, 1024 and 1440 pixel viewports in every locale.
- Interactions: language switching preserves paths and service query strings; mobile navigation closes correctly; theme persists; project/timeline/gallery filters work; modal details open and close; inquiries show localized errors; demo requests remain local.
- Automated axe WCAG A/AA checks: no violations on the home page, contact page or four studio concepts. Automated checks do not replace a full human accessibility audit.
- Production build: passing. Portfolio content and demo pages are statically generated in three languages; contact remains dynamic. No build-time font or live-site fetch is required.
- Production smoke checks cover the portfolio, localized content, all concepts, sitemap, robots and Open Graph image endpoint.
- A mutation check deliberately weakened name validation; the malformed-name test failed as expected. The production validation was then restored and the full unit suite passed.
- Desktop and mobile visual review used isolated Chrome with saved screenshots. No unrelated browser sessions were accessed.

## Dependency review

`npm audit --omit=dev --audit-level=high` reports zero runtime vulnerabilities. Full audit reports five linked high-severity findings through `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. The root advisory is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), a deeply nested glob-pattern denial of service in braces ≤3.0.3. The registry's latest braces release at review was 3.0.3, with no compatible patched release available. npm's suggested forced remediation downgrades the Next ESLint configuration across a major version and is not applied.

This dependency is reachable only in developer/CI lint tooling using repository-controlled patterns, not the deployed application request path. Do not pass untrusted glob expressions into lint tools. Review again by 21 November 2026 or when a compatible patch appears. CI blocks high/critical runtime advisories. This is a documented development-tooling deferral, not a claim of a completely clean full audit.

Package versions are pinned and the authoritative npm lockfile is committed. Lifecycle scripts are disabled; required native dependencies use published prebuilt binaries.

## Integration limits

The initial source commit was pushed successfully to `iamciscoo/portfolio` on `main`. GitHub Actions [run 39790579156](https://github.com/iamciscoo/portfolio/actions/runs/39790579156) failed before any job steps ran: GitHub reports, "The job was not started because your account is locked due to a billing issue." This is an account-level CI blocker; no failing application check was reported by that run. Resolve the account billing issue and rerun the workflow to obtain hosted CI results. Local lint, typecheck, 37 unit/API tests, 23 browser tests and the production build passed.

No real email was sent. No Resend or shared rate-limiter credentials were supplied. Provider acceptance/failure behavior is verified through test doubles and the local form correctly reports unavailable delivery. Real inbox delivery needs a configured sending domain, credentials and an authorized end-to-end check.

Vercel deployment requires the owner's connected Vercel account and project/environment configuration. A successful local build and GitHub push are not a cloud deployment. No field performance or production Core Web Vitals measurements are claimed.

The original CV remains private. Authentic profile photos, an approved public CV, current degree/enrollment dates and project technology-stack confirmation remain owner content tasks. Institution and project contributions provided in this chat have been incorporated.
