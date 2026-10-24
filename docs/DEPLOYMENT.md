# Deployment to Vercel

1. Push the verified source to the owner's GitHub repository.
2. Sign into Vercel and choose **Add New → Project → Import Git Repository**. Select `iamciscoo/portfolio`.
3. Keep the **Next.js** framework preset and root directory `./`. Build command: `npm run build`; install command: `npm ci --ignore-scripts`. Use Node.js 22.x or later compatible with the package engine. The production runtime is Node.js; a static export would disable the contact endpoint.
4. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` from `.env.example` under **Project Settings → Environment Variables**, selecting **Production**. The destination must be the email associated with the Resend account. The fixed sender is `Cisco Portfolio <onboarding@resend.dev>`. To enable WhatsApp alerts too, add the four server-side settings in [WHATSAPP-NOTIFICATIONS.md](WHATSAPP-NOTIFICATIONS.md). No sender, site URL or Redis variables are required.
5. Keep access to Vercel's system environment variables enabled. Metadata uses `VERCEL_PROJECT_PRODUCTION_URL`, falling back to `VERCEL_URL`; Vercel populates these automatically. The contact endpoint checks the browser Origin against the current request host, so custom domains and previews need no manual origin setting.
6. Save and redeploy. Confirm the home page, a Russian and Kiswahili route, both case studies, all six demos, sitemap and robots responses. Confirm the canonical origin and hreflang URLs.
7. Submit one authorized real inquiry and verify that Resend returns a message ID and the destination receives the notification. A successful API acknowledgement means the provider accepted the message, not that final inbox delivery is guaranteed. Inspect provider delivery events if delivery is delayed. Avoid sending test messages to anyone who has not authorized them.

## Domain

In Vercel **Project Settings → Domains**, add your chosen domain. Add exactly the DNS records shown by Vercel at your DNS provider, and wait for the domain to be verified. If you prefer `www`, choose that as the primary domain and redirect the apex (or vice versa). Redeploy after changing domains so generated metadata uses Vercel's updated production-domain value. No extra environment variable is needed.

## Sender and destination

The two-variable setup uses Resend's default `onboarding@resend.dev` sender. Resend permits this sender to deliver only to the email associated with the Resend account: set `CONTACT_TO_EMAIL` to that address. Visitors are set as `replyTo`, so replying to an inquiry addresses its author. Their addresses are never used as the sender. [Resend explains the default-domain restriction](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

If a different destination is needed later, first verify a domain in Resend and change the sender constant in `src/app/api/contact/route.ts` to an address on that domain. A custom sender is not required for receiving inquiries in the Resend account inbox.

## Basic rate limiting

The contact route retains a bounded in-memory limiter: five requests per ten-minute bucket per hashed IP, with at most 1,000 client buckets per process. Expired entries are removed and no inquiry content is stored. This requires no external service, but is best-effort per instance: it resets on cold starts and is not shared across Vercel instances. Origin checks, the honeypot, strict validation, body-size limits and provider idempotency remain active.

## Release review

- Replace graphic profile placeholders with approved authentic photos and alt text.
- Add a privacy-reviewed CV only if it should be publicly downloadable.
- Confirm current degree and enrollment dates and both project implementation stacks.
- Run lint, typecheck, unit tests, browser checks and production build.
- Review the dependency audit notes in `VERIFICATION.md`.
- Check contact consent, basic request limits, the Resend-account destination and actual delivery.
- For rollback, redeploy a prior successful Vercel deployment; keep production environment configuration intact.

No Vercel credentials were supplied in this workspace. Repository readiness and a successful local production build do not imply a cloud deployment.
