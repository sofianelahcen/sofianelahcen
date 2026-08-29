import {
  instagramUrl,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site-config";
import type { SiteContent } from "@/lib/site-data";

export function StructuredData({
  profile,
  archive,
}: {
  profile: SiteContent["profile"];
  archive: SiteContent["archive"];
}) {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: siteName,
    jobTitle: "Art Director",
    description: siteDescription,
    url: `${siteUrl}/`,
    ...(profile.email ? { email: `mailto:${profile.email}` } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    knowsAbout: [
      "Art Direction",
      "Creative Direction",
      "Photography",
      "Advertising",
      "Brand Strategy",
      "Branding",
    ],
    sameAs: [profile.instagram || instagramUrl],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: siteName,
    description: siteDescription,
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#person` },
  };

  const gallery = {
    "@type": "CollectionPage",
    "@id": `${siteUrl}/#archive`,
    name: "Archive",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    hasPart: archive.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      ...(project.year && /^\d{4}$/.test(project.year)
        ? { dateCreated: project.year }
        : {}),
      creator: { "@id": `${siteUrl}/#person` },
      ...(project.cover?.src ? { image: project.cover.src } : {}),
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, gallery],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
