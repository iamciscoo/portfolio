# Francis Mwambene / Cisco

The mobile reading pass shortens repeated copy, improves type spacing and keeps hero text steady during gentle background movement. Inquiry templates sit directly above "Tell me what you need" and fill the editable brief immediately when selected. Em dashes are removed from tracked source and documentation. See `docs/MOBILE-CLARITY.md` for behavior and proof.

A multilingual personal portfolio and interactive design studio with six industry concepts, built with Next.js App Router, React, TypeScript, Tailwind, next-intl, Motion, Radix Dialog, React Hook Form, Zod and Resend. Prepared for Vercel. No application database is required.

The homepage has compact horizontal rails for real projects and concepts, with touch, keyboard and button navigation. PACE demonstrates an online shop with a sample basket; SAFIRI demonstrates a tour company with itineraries and enquiry previews. Every example offers a similar custom website for the visitor's brand. Mobile has a shorter hero and tap feedback. All published photography and Next Image responses use WebP. See `docs/COMPACT-STUDIO.md` for the design, new image prompts and verification scope.

## Run locally

Use Node.js 22.12+ and npm 10.9.8 (the package manager used for the lockfile).

```sh
npm ci --ignore-scripts
npm run dev
```

Open http://127.0.0.1:3000/en. The supported locales are `/en`, `/ru`, `/sw`, `/fr` and `/es`; navigation and demo return links preserve the selected language. `/` negotiates the locale with English as fallback. Keep the local preview on port 3000.

To run the production server locally, use `npm run build` followed by `npm start`. Public pages work without email credentials; the inquiry endpoint stays unavailable until its production configuration is complete.

Dependency lifecycle scripts are disabled in `.npmrc`. Next.js and Sharp use their prebuilt platform packages; no blanket script approval is needed. Commit the lockfile when updating dependencies.

## Checks

The GitHub Quality workflow is manual-only because hosted jobs currently cannot start due to an account billing lock (run `40028822025`). Pushes still deploy through Vercel. Run the checks below before pushing; after resolving GitHub billing, the workflow can be run from Actions or its push/pull-request triggers restored.

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
- `src/messages/{en,ru,sw,fr,es}.json`: UI, metadata and validation copy.
- `src/demos/<industry>/content.ts`: localized, explicitly fictional demonstration content.

Update content files without changing React components. No CMS or database is required. Localized long-form content uses complete `{en, ru, sw, fr, es}` objects; the `l` helper requires all five translations. Dictionary completeness is tested.

### Add authentic photos

The owner-requested cinematic Tanzania-to-Russia artwork replaces the earlier flat postcard and is clearly labeled as an imagined landscape. About opens with a boat photograph from Instagram and includes a TIMUN assembly photo, the personal narrative, portraits and a captured GloboExpats work-video still with its original clip link. Both Instagram profiles were visually reviewed in authenticated Chrome. Four photographs have owner-authorized AI-assisted clarity variants; originals are preserved as source records. The viewer shows only the selected photo, with no original comparison controls. AI reconstruction may change fine details. See `docs/PHOTOS-AND-DISPLAYS.md` for photo sources, actual dimensions and the editing prompt, and `docs/CINEMATIC-REFINEMENT.md` for hero artwork details.

Sources, public-display approval and placement are recorded in `public/images/profile/manifest.json`. Update that manifest alongside `src/content/profile.ts` when replacing a photo. Next Image provides responsive formats and sizes; the hero is prioritized. See `docs/REFINEMENT.md`, `PRODUCT.md` and `DESIGN.md` for design decisions and verification.

### Publish an approved CV

The supplied PDF contains a personal phone number, address and birth date, so it has **not** been copied into the public folder. Prepare an approved PDF without private details, place it in `public/cv/francis-mwambene.pdf`, and set `profile.cvUrl` to `/cv/francis-mwambene.pdf`. The download link appears automatically on the home page.

Don State Technical University and the project contributions are owner-confirmed. Current qualification and enrollment dates remain nullable. The University of Dar es Salaam entry is explicitly historical and does not imply current enrollment or a completed degree. Exact project technology stacks remain unpublished until confirmed. No testimonials, achievements or business performance metrics have been invented.

## Real project research

Case studies use the public [GloboExpats](https://globoexpats.com/), its [team page](https://globoexpats.com/about), and [iPhone Service TZ](https://iphoneservicetz.com/), reviewed 22 October 2026. The owner confirmed Product Manager plus full-stack team contributions at GloboExpats and independent development of the complete iPhone Service TZ website. Live-site screenshots were captured at desktop and mobile sizes. The public GloboExpats title is Product Lead; the portfolio follows the owner-confirmed role.

Studio concepts are fictional, with illustrative stock photography. They do not claim to be paying clients. Their forms validate and preview requests locally, without storage, email or real reservations. Photo origins are recorded in `docs/ASSETS.md`.

## Contact email

The inquiry form includes an optional phone/WhatsApp number and five editable brief templates. Windows installation, software troubleshooting and game setup are available alongside web/product services. Selecting a template immediately replaces the service and brief; contact details and other options remain unchanged. The text stays editable. Selecting the write-your-own option keeps the current brief. Both HTML and plain-text inquiry emails include a supplied phone number. Numbers are validated on the client and server and are not written to browser storage.

Browser regression tests intercept contact POSTs so a configured local Resend account cannot send test messages. Unit/API tests use provider doubles. See `docs/SOFTWARE-INQUIRIES.md` for the latest verification and the one sample inquiry accepted before this safeguard was added.

Create a new `.env.local` manually from `.env.example`; never overwrite an existing environment file. Set:

```dotenv
RESEND_API_KEY=your_server_side_key
CONTACT_TO_EMAIL=your_destination_address
```

These are the only two variables you need to add in Vercel. The sender is `Cisco Portfolio <onboarding@resend.dev>`, so the destination must be the email address associated with your Resend account. [Resend documents this restriction](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain). The sender can be changed in the contact route if a verified domain is added later. No real secret belongs in Git. The public profile email is used only for the direct `mailto` alternative.

The server checks Origin, JSON content type, actual streamed body size (16 KiB), strict Zod validation and a honeypot. Email HTML escapes user input. Resend idempotency keys make retries of the same submission safe; the browser also prevents simultaneous submissions. Success requires a provider message ID. Missing credentials return HTTP 503 rather than a false success. No client confirmation email is sent by default.

### Request limits and deployment URLs

An expiring in-memory limiter permits five submissions per ten-minute bucket per HMAC-hashed IP, with at most 1,000 stored buckets per process. It uses a process-local random secret, stores no inquiry contents, and requires no Redis account or credentials. This is best-effort protection per running instance: counters reset on cold starts and are not shared across Vercel instances. It is not a deployment-wide quota.

Vercel supplies trusted forwarded IP headers. If you deploy elsewhere, review the trusted-proxy boundary before enabling email. The browser Origin must match the current request host, so production domains and previews work without a manually configured URL. Explicit cross-site browser requests are rejected. Metadata, sitemap and sharing URLs use Vercel's automatic production-domain variable, falling back to the deployment URL and then the local development URL. Keep access to Vercel's system environment variables enabled; there is no site-URL variable to add manually.

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
src/messages/                English, Russian, Kiswahili, French and Spanish dictionaries
src/lib/                     Metadata, validation, email and rate limiting
tests/                       Unit/API and browser tests
public/                      Local fonts, real project captures and concept photography
```
