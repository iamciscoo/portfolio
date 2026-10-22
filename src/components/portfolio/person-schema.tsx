import { profile } from "@/content/profile";
import Script from "next/script";
import { siteUrl } from "@/lib/metadata";
export function PersonSchema() {
  return (
    <Script
      id="person-schema"
      strategy="afterInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          alternateName: profile.alias,
          url: siteUrl,
          jobTitle: "Software Developer & Product Builder",
          sameAs: [profile.github, ...profile.instagram],
          nationality: { "@type": "Country", name: "Tanzania" },
        }).replace(/</g, "\u003c"),
      }}
    />
  );
}
