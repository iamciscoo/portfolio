# Search setup

The portfolio includes translated search titles and descriptions for its eight main pages in English, Kiswahili, Russian, French and Spanish. Each indexable page has a canonical URL and reciprocal language alternatives, including an English `x-default` fallback. Project pages also have matching Open Graph and Twitter previews.

Person, WebSite and project CreativeWork structured data are rendered in the initial HTML. They use the owner's approved profile and projects. Concept demo pages remain `noindex, follow` and are excluded from the sitemap so their fictional business identities do not compete with the portfolio.

## Google Search Console

Use the verified **`https://justcisco.business/`** URL-prefix property for the whole HTTPS site. The older `/en/` property covers only English URLs. The root property includes all five languages and the root sitemap. On 1 November 2026, Google verified the root property through the existing HTML tag and processed `sitemap.xml` successfully, discovering 50 pages. Discovery does not mean all 50 are indexed. See [the audit and growth plan](SEO-GROWTH-2026-11.md).

The locale root layout uses Next.js `metadata.verification.google` to publish the owner's Google verification tag in the document head, including the homepage reached after the root URL redirects to a language. This verification value is intentionally public and must remain in place after verification.

After deployment:

1. Open the site's **URL-prefix** property in Search Console, choose **HTML tag**, and click **Verify**. This tag does not verify a Domain property, which requires DNS verification.
2. Under **Sitemaps**, submit `sitemap.xml` on the site's canonical production domain.
3. Use **URL Inspection** for the homepage, services and pricing pages. Test the live URL and request indexing where appropriate.
4. Monitor indexing and search performance in Search Console. Publishing these changes does not guarantee rankings or immediate indexing.

Canonical metadata, structured data and the sitemap use the hosting platform's production-domain environment variable; they do not require a new manually configured URL. When changing domains, verify the new property, configure redirects and redeploy so those URLs stay consistent.

References: [Google ownership verification](https://support.google.com/webmasters/answer/9008080), [localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), and [site names](https://developers.google.com/search/docs/appearance/site-names).
