import { profile } from "@/content/profile";
import { siteName, siteUrl } from "@/lib/metadata";
import { locales } from "@/i18n/routing";
export function PersonSchema() {
  return (
    <script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: profile.name,
              alternateName: profile.alias,
              url: siteUrl,
              image: `${siteUrl}${profile.photos.headshot.src}`,
              jobTitle: "Software Developer & Product Builder",
              sameAs: [profile.github, ...profile.instagram],
              nationality: { "@type": "Country", name: "Tanzania" },
            },
            {
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              name: siteName,
              alternateName: profile.name,
              url: `${siteUrl}/`,
              inLanguage: locales,
              publisher: { "@id": `${siteUrl}/#person` },
            },
          ],
        }).replace(/</g, "\u003c"),
      }}
    />
  );
}
