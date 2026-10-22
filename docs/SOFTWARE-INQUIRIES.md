# Homepage and software inquiry update

Continued from the parallel agent's uncommitted postcard-art changes. Preserved its portrait/landscape artwork, profile paths and About placement; the removed outdoor upload stays removed. No environment file was changed.

## Homepage

Revisited `just.cisco` in authenticated Chrome. Watched the GloboExpats desk video and the warm city-window video in the “Clearing up some drafts” carousel. Their contrast of a blue-lit working environment and warm travel light complements the existing charcoal/cobalt and Tanzania–Russia artwork.

The working-video still was captured from the visible Chrome player and cropped to exclude Instagram controls, comments and account details. It is optimized as `public/images/profile/cisco-work-video-still.webp` (400 × 570). The video itself uses a blob format unsupported by the browser download tool. The homepage uses the verified still and links to the original clip. No unrelated comments, account information, audio or credentials are republished. The image manifest records source and approval.

Shortened the hero to “Built by Cisco. Made to work.” Added an editorial behind-the-build section tied to the real GloboExpats case study, plus a dedicated software-help section. Existing routes, studio identities, scroll layers, responsive layouts and reduced-motion treatment are retained.

## Services and form contract

- Added `windows`, `software` and `gaming` service IDs to the shared client/server schema and service catalogue, translated into English, Russian and Swahili.
- Added optional `phone`: absent/empty remains valid; formatted numbers permit 7–15 digits and ordinary international punctuation, with a 40-character limit. Letters, control characters and HTML are rejected. This does not claim carrier or number-ownership verification.
- Phone is included in both email formats through a shared row formatter. It does not affect provider headers or reply-to. Existing origin checks, body cap, rate limit, HTML encoding, idempotency and acknowledged-success behaviour remain.
- Five brief templates: business website, application, Windows install, software error and game setup. Selection previews; explicit application changes service/brief and focuses the editable text. Existing contacts remain unchanged; existing briefs require the clearly labeled replacement action. The consent checkbox is never preselected.
- The phone is used only to respond to the inquiry. The application does not store contact details in localStorage, cookies or a new database.

## Verification and email note

52 unit/API tests and 43 browser tests passed. These cover absent/invalid/international phone formats, provider email contents, service/template consistency, multilingual templates, preservation of contact details, explicit brief replacement, all routes/demos, keyboard menus, accessibility, reduced motion, no-JavaScript content and the five requested widths. After correcting the stylesheet import order, all nine inquiry/software browser tests passed again, including visible homepage actions at 1440 × 630 in all three languages. A 1536 × 630 production screenshot separately verifies the actions end at 596px. Strict TypeScript, ESLint and production build passed. Runtime audit reports zero vulnerabilities.

The extra Portfolio preview and development servers were stopped. The production preview is the only Portfolio listener, at `127.0.0.1:3000`; ports 3001 and 3002 are closed. Unrelated system services were left running.

The parallel agent had configured `.env.local` with live email delivery. Before that change was detected, one browser test submitted the sample “Template Visitor” inquiry (`visitor@example.com`, test phone `+255 712 345 678`, gaming service). The API returned success, meaning the provider accepted it; inbox delivery was not independently checked. The recipient was the configured inquiry destination, not the sample reply-to address. No further live submissions were made.

The shared Playwright fixture now intercepts every contact POST with an unavailable test response, so regression runs cannot send live inquiry email even when they reuse a configured server. The API/provider boundary remains covered by isolated unit tests. No credentials were printed, committed or changed.

Latest screenshots are in `docs/refinement-preview/`; temporary viewport captures are under `tmp/inquiry-software-qa/`.
