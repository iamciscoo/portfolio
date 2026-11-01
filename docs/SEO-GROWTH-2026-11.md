# Search audit and portfolio growth plan

Reviewed 1 November 2026. Canonical website: [justcisco.business](https://justcisco.business/). These are point-in-time findings, not ranking or traffic guarantees.

## Verified findings

| Check                             | Result                                                                                                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full-site Search Console property | Added `https://justcisco.business/` and Google auto-verified ownership through the existing HTML tag.                                                                                                                                                   |
| Previous property                 | `https://justcisco.business/en/` tracks only that language prefix. It remains available.                                                                                                                                                                |
| Sitemap                           | Submitted `/sitemap.xml` to the full-site property. Google reported **Success**, 50 discovered pages and zero videos.                                                                                                                                   |
| English homepage                  | Search Console reports **URL is on Google**, a successful smartphone crawl, indexing allowed and the inspected URL selected as canonical.                                                                                                               |
| English pricing                   | Initially **Discovered - currently not indexed**. Google's live test confirmed **URL is available to Google** and **Page can be indexed**. A manual indexing request was accepted into Google's priority crawl queue; indexing itself is still pending. |
| Public technical crawl            | All 50 sitemap URLs returned HTTP 200, a matching canonical, a title, a description, one H1 and the verification tag. None had an unintended `noindex`.                                                                                                 |
| Language setup                    | Five localized versions; sitemap and page metadata include language alternatives and English `x-default`.                                                                                                                                               |
| Fictional concept demos           | Intentionally excluded from the sitemap and marked `noindex, follow`. They must not be presented as real clients.                                                                                                                                       |
| Performance evidence              | Search Console reports were still processing. No search traffic, query-volume, conversion or field Core Web Vitals figures are claimed.                                                                                                                 |

Search Console's Manual Actions and Security Issues reports both showed **No issues detected**. This is Google's current report status, not a general security audit of the application.

The public crawl checks metadata and HTTP responses. It does not establish rankings, prove every page is indexed, test email delivery or replace field performance data. Existing application code and environment configuration were preserved during this follow-up.

## What will make the biggest difference

### 1. Make the two real projects do more selling

Use GloboExpats and iPhone Service TZ as evidence: the business problem, your exact contribution, screenshots, key decisions and the live result. A short screen recording showing a real workflow is more useful than another generic “I build websites” post. Link the post to that project's case study, then offer the relevant package.

Add results only when you can substantiate them. Do not invent conversion improvements, client quotes, team ownership or technology stacks. If a client permits a testimonial or a credit link, agree on the exact wording with them first.

### 2. Give each visitor a relevant next step

For people comparing costs, share `/sw/pricing` or `/en/pricing`. For a business owner researching a developer, use the services page and a relevant real case study. For employers or collaborators, use the projects or about page. The pricing page already exposes clear packages, domains, notification limits, hosting and update costs; keep those details current.

Prioritize English and Kiswahili content for the Tanzanian offer, while preserving the Russian, French and Spanish versions. This is a proposed commercial focus based on the current TZS offer, not measured country or query demand.

### 3. Build useful content around actual buying questions

Research starting points, not measured high-volume keywords:

| Buyer question / search wording        | Best existing destination | Useful next content                                                                                     |
| -------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| “website developer Tanzania”           | `/en/services`            | A real project walkthrough explaining how you scope a business website.                                 |
| “website pricing Tanzania”             | `/en/pricing`             | What TZS 450,000 buys, what changes at each tier, and recurring costs.                                  |
| “bei ya kutengeneza tovuti”            | `/sw/pricing`             | A Kiswahili explanation of choosing a landing page, email or WhatsApp package.                          |
| “WhatsApp website notifications”       | Services and pricing      | Explain the three specified destination chats and the optional monthly add-on with a realistic example. |
| “Francis Mwambene” / “Cisco developer” | Homepage and about        | Consistent name, authentic profile and links to the same official site.                                 |

Start with one strong English explanation and one natural Kiswahili version based on the packages you actually sell. Use them in short social posts and link back to the relevant existing page. Create a separate permanent guide only when it adds substantial help beyond the pricing page. Do not generate dozens of thin city or service pages.

Public pricing pages reviewed at [Simplicity](https://simplicitysoftwares.co.tz/pricing) and [Growsoft](https://growsoft.co.tz/landing-page?package=starter) show clear scope and cost breakdowns. The useful pattern is helping buyers choose; their turnaround times, guarantees and business claims are not yours to copy.

### 4. Make the official link consistent

Use `justcisco.business` as the official domain on public profiles and permitted project credits. Link directly to a relevant localized page when sharing a specific offer. The repository README now links to the canonical website, packages and Kiswahili version. The repository's About link already points to the custom domain.

Suggested bio for the owner to review and publish: “Francis Mwambene (Cisco). Websites and web apps for businesses. Explore my work and website packages at justcisco.business.”

Ask satisfied clients for an honest testimonial and permission to display it. Participate helpfully in communities where business owners already ask website questions. Avoid bought backlinks, directory spam and mass unsolicited messages. No social posts, messages or client requests were sent as part of this audit.

### 5. Measure qualified enquiries

Once Search Console data is ready, compare the last 28 days by page, query and country. Look for pages receiving impressions but few clicks, and queries with clear buying intent. Improve titles and content based on those actual findings rather than guessing from positions alone.

Count genuine website enquiries and where visitors say they found you. If analytics are added later, measure pricing visits, enquiry submissions and WhatsApp clicks without logging message contents, phone numbers or emails. This audit does not add tracking software or change consent behavior.

## Four-week sequence

| When   | Action                                                                                                                              | Evidence to review                                                         |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Week 1 | Let Google process the new sitemap; prepare an authentic walkthrough of each real project; update the owner's chosen profile links. | Sitemap status, indexed key URLs and the two finished walkthroughs.        |
| Week 2 | Publish one useful package explanation in English and Kiswahili; share the relevant pricing and case-study links.                   | Actual buyer questions and qualified enquiries, not just reactions.        |
| Week 3 | With client permission, add one genuine testimonial or project credit; improve answers to repeated buyer questions.                 | Approved wording, source of the feedback and referral visits if available. |
| Week 4 | Review Search Console's available 28-day data by page, country and query; choose the next content improvement from the results.     | Impressions, clicks, click-through rate and enquiry quality.               |

Do not repeatedly resubmit an unchanged sitemap or request indexing for every URL. Google may take days or weeks, and requesting indexing does not guarantee inclusion. A Google Business Profile is an option only if the business meets Google's in-person customer-contact eligibility rules; do not create a fictional office or service-area presence for an online-only business.

## Primary guidance

- [Google Search Essentials](https://developers.google.com/search/docs/essentials): useful content, descriptive words, crawlable links and relevant communities.
- [People-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): first-hand experience, accurate claims and original value.
- [URL-prefix property scope](https://support.google.com/webmasters/answer/34592): a path-limited property excludes other language paths.
- [URL Inspection](https://support.google.com/webmasters/answer/9012289): live tests, crawl requests and indexing limitations.
- [Business Profile eligibility](https://support.google.com/business/answer/13763036): in-person customer-contact requirements.
