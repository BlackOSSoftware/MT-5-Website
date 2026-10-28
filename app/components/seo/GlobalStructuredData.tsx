import { SITE_NAME, SITE_URL } from "../../lib/seo";

export default function GlobalStructuredData() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            url: `${SITE_URL}/contact`,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": organizationId,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
