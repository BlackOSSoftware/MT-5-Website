import type { Metadata } from "next";
import SimplePage from "../components/SimplePage";
import PageStructuredData from "../components/seo/PageStructuredData";
import { buildPageMetadata } from "../lib/seo";

const PAGE_SEO = {
  title: "Partners | Affiliate and IB opportunities",
  description:
    "Partner with oceanaprofx through affiliate or introducing broker models. Contact us for current commercial terms.",
  path: "/partners",
  pageKeywords: [
    "oceanaprofx partners",
    "introducing broker program",
    "forex affiliate program",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function PartnersPage() {
  return (
    <>
      <PageStructuredData
        title={PAGE_SEO.title}
        description={PAGE_SEO.description}
        path={PAGE_SEO.path}
      />
      <SimplePage
        title="Partner with Oceana"
        description="Affiliate and introducing broker models are available. Reach out for current commercial terms — we do not publish unverified reward claims."
        primaryLabel="Talk to partnerships"
        primaryHref="/contact"
        eyebrow="Partners"
        points={[
          "Affiliate and introducing broker models",
          "Commercial terms shared directly by our team",
          "Track referrals and network from your portal",
        ]}
      />
    </>
  );
}
