# Deployment to Vercel

1. Push the verified source to the owner's GitHub repository.
2. Sign into Vercel and choose **Add New → Project → Import Git Repository**. Select `iamciscoo/portfolio`.
3. Keep the **Next.js** framework preset and root directory `./`. Build command: `npm run build`; install command: `npm ci --ignore-scripts`. Use Node.js 22.x or later compatible with the package engine. The production runtime is Node.js; a static export would disable the contact endpoint.
4. Add all six variables in `.env.example`. Set them independently for Production and any Preview environment that should send email. Keep server-side keys secret. Set `NEXT_PUBLIC_SITE_URL` to the exact canonical HTTPS origin, without a trailing slash.
5. Provision shared Upstash Redis REST access for production rate limiting. The endpoint fails closed if this store is absent or unavailable. No inquiry contents are stored in Redis.
6. Deploy. Confirm the home page, a Russian and Kiswahili route, both case studies, all four demos, sitemap and robots responses. Confirm the canonical origin and hreflang URLs.
7. Submit one authorized real inquiry and verify that Resend returns a message ID and the destination receives the notification. A successful API acknowledgement means the provider accepted the message, not that final inbox delivery is guaranteed. Inspect provider delivery events if delivery is delayed. Avoid sending test messages to anyone who has not authorized them.

## Domain

In Vercel **Project Settings → Domains**, add your chosen domain. Add exactly the DNS records shown by Vercel at your DNS provider, and wait for the domain to be verified. If you prefer `www`, choose that as the primary domain and redirect the apex (or vice versa). Update `NEXT_PUBLIC_SITE_URL` to the chosen primary origin and redeploy, so metadata, sitemap and the contact Origin check agree.

## Resend sending domain

In Resend **Domains**, add a domain/subdomain you control, such as `mail.example.com`. Copy the exact SPF/DKIM records Resend provides to your DNS provider; do not guess their values. Wait for verified status. Set `CONTACT_FROM_EMAIL` to an address on that verified domain, for example `Cisco Portfolio <inquiries@mail.example.com>`. Set `CONTACT_TO_EMAIL` to your desired inbox, and keep `RESEND_API_KEY` server-side. The requester becomes `replyTo`, never the sender.

## Release review

- Replace graphic profile placeholders with approved authentic photos and alt text.
- Add a privacy-reviewed CV only if it should be publicly downloadable.
- Confirm current degree and enrollment dates and both project implementation stacks.
- Run lint, typecheck, unit tests, browser checks and production build.
- Review the dependency audit notes in `VERIFICATION.md`.
- Check contact consent, shared rate limiting, sender-domain verification and actual delivery.
- For rollback, redeploy a prior successful Vercel deployment; keep production environment configuration intact.

No Vercel credentials were supplied in this workspace. Repository readiness and a successful local production build do not imply a cloud deployment.
