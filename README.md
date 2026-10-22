# Francis Mwambene / Cisco

A multilingual personal portfolio and interactive design studio, built with Next.js App Router, React, TypeScript, Tailwind, next-intl, Motion, Radix Dialog, React Hook Form, Zod and Resend. Prepared for Vercel. No application database is required.

## Run locally

Use Node.js 22.12+ and npm 10.9.8 (the package manager used for the lockfile).

```sh
npm ci --ignore-scripts
npm run dev
```

Open http://127.0.0.1:3000/en. The supported locales are `/en`, `/ru`, and `/sw`; navigation and demo return links preserve the selected language. `/` negotiates the locale with English as fallback.

To run the production server locally, use `npm run build` followed by `npm start`. Public pages work without email credentials; the inquiry endpoint stays unavailable until its production configuration is complete.

Dependency lifecycle scripts are disabled in `.npmrc`. Next.js and Sharp use their prebuilt platform packages; no blanket script approval is needed. Commit the lockfile when updating dependencies.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

The Playwright configuration uses installed Chrome on Windows. For other systems, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an installed Chromium executable, or use `npx playwright install chromium` and remove the explicit `launchOptions.executablePath`. Tests start the development server when one is not already running. See `docs/VERIFICATION.md` for results and limits.

## Content and assets

- `src/content/profile.ts`: identity, confirmed university, public links, photographs and approved CV URL.
- `src/content/experience.ts`: filterable education and work milestones.
- `src/content/projects.ts`: roles, contributions, case studies and confirmed technology stacks.
- `src/content/skills.ts`: verified capabilities and an unpublished list of technologies awaiting confirmation.
- `src/content/services.ts`, `demos.ts`: services and studio catalogue.
- `src/messages/{en,ru,sw}.json`: UI, metadata and validation copy.
- `src/demos/<industry>/content.ts`: localized, explicitly fictional demonstration content.

Update content files without changing React components. No CMS or database is required. Localized long-form content uses `{en, ru, sw}` objects with English fallback. Dictionary completeness is tested.

### Add authentic photos

The site currently shows explicitly labeled graphic placeholders. No synthetic portrait is presented as Francis. Instagram was inaccessible during research.

1. Add `hero.webp` (portrait, ideally 1600×1900), `headshot.webp` (1200×1400), and `lifestyle.webp` (1800×1200) to `public/images/profile/`.
2. Update the corresponding `src` in `profile.photos` and set `confirmed: true`.
3. Optional gallery items use `{src, alt}` in `profile.photos.gallery`.

Next Image handles responsive sizes, WebP/AVIF negotiation and lazy loading; the hero is prioritized. See `public/images/profile/README.md` for crop guidance.

### Publish an approved CV

The supplied PDF contains a personal phone number, address and birth date, so it has **not** been copied into the public folder. Prepare an approved PDF without private details, place it in `public/cv/francis-mwambene.pdf`, and set `profile.cvUrl` to `/cv/francis-mwambene.pdf`. The download link appears automatically on the home page.

Don State Technical University and the project contributions are owner-confirmed. Current qualification and enrollment dates remain nullable. The University of Dar es Salaam entry is explicitly historical and does not imply current enrollment or a completed degree. Exact project technology stacks remain unpublished until confirmed. No testimonials, achievements or business performance metrics have been invented.

## Real project research

Case studies use the public [GloboExpats](https://globoexpats.com/), its [team page](https://globoexpats.com/about), and [iPhone Service TZ](https://iphoneservicetz.com/), reviewed 22 October 2026. The owner confirmed Product Manager plus full-stack team contributions at GloboExpats and independent development of the complete iPhone Service TZ website. Live-site screenshots were captured at desktop and mobile sizes. The public GloboExpats title is Product Lead; the case study explains the owner-preferred title.

Studio concepts are fictional, with illustrative stock photography. They do not claim to be paying clients. Their forms validate and preview requests locally, without storage, email or real reservations. Photo origins are recorded in `docs/ASSETS.md`.

## Contact email

Create a new `.env.local` manually from `.env.example`; never overwrite an existing environment file. Set:

```dotenv
RESEND_API_KEY=your_server_side_key
CONTACT_TO_EMAIL=your_destination_address
CONTACT_FROM_EMAIL=Cisco Portfolio <inquiries@your-verified-domain.example>
NEXT_PUBLIC_SITE_URL=https://your-domain.example
UPSTASH_REDIS_REST_URL=https://your-shared-rate-limit-instance.example
UPSTASH_REDIS_REST_TOKEN=your_server_side_token
```

No real secret belongs in Git. Resend must verify your sending domain before a production sender can be used. The destination is configurable. The CV-derived public email is used only for the direct `mailto` alternative.

The server checks Origin, JSON content type, actual streamed body size (16 KiB), strict Zod validation and a honeypot. Email HTML escapes user input. Resend idempotency keys make retries of the same submission safe; the browser also prevents simultaneous submissions. Success requires a provider message ID. Missing credentials return HTTP 503 rather than a false success. No client confirmation email is sent by default.

### Production rate limiting

Local development has an expiring in-memory limiter. Production **requires** the shared Redis REST variables above and fails closed without them. An atomic Redis script permits five submissions per ten-minute bucket per HMAC-hashed IP; keys expire after 20 minutes. Redis stores only a hashed key and count, not inquiry contents. This small shared store is necessary for consistent limiting across Vercel instances. Provision Upstash Redis through Vercel Marketplace or your own account, then add the REST URL and token.

Vercel supplies trusted forwarded IP headers. If you deploy elsewhere, update the trusted-proxy boundary in the route before enabling production email. The Origin must match `NEXT_PUBLIC_SITE_URL`, including scheme and port; set the variable separately in each Vercel environment. If you need live email in preview deployments, use that preview's exact URL.

Inquiry contents are sent only to the configured Resend destination; the app does not persist them or log PII. Set mailbox/Resend retention to suit your operational policy (suggested: delete unsuccessful inquiries after 90 days). The contact form explains its purpose and requires consent.

## GitHub and Vercel

Remote supplied by the owner: `https://github.com/iamciscoo/portfolio.git`.

```sh
git add .
git commit -m "feat: build multilingual Cisco portfolio and design studio"
git push -u origin main
```

Only run these manually if the current work has not already been committed/pushed; inspect `git status` first. No forced push is needed. See `docs/DEPLOYMENT.md` for Vercel import, environment variables, custom domain and sender-domain verification. No cloud deployment is claimed until a verified deployment URL is available.

## Structure

```text
src/app/[locale]/(portfolio)/  Portfolio shell and pages
src/app/[locale]/studio/[slug]/  Independent studio layouts
src/app/api/contact/          Secure server-side inquiry endpoint
src/components/              Shared accessible presentation and interactions
src/content/                 Owner-editable structured content
src/demos/                   Four fictional brands and shared preview primitives
src/i18n/                    next-intl routing, navigation and request configuration
src/messages/                English, Russian and Kiswahili dictionaries
src/lib/                     Metadata, validation, email and rate limiting
tests/                       Unit/API and browser tests
public/                      Local fonts, real project captures and concept photography
```
