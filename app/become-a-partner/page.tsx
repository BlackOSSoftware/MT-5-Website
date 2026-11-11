import type { Metadata } from "next";
import { BecomeAPartnerPageView } from "../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../components/seo/PageStructuredData";
import { buildPageMetadata } from "../lib/seo";

const PAGE_SEO = {
  title: "Become a Partner | Collaborate with oceanaprofx",
  description:
    "Partner with oceanaprofx as an introducing broker, affiliate, business, technology, or strategic partner. Submit a partnership inquiry and grow with a multi-asset trading platform.",
  path: "/become-a-partner",
  pageKeywords: [
    "become a partner oceanaprofx",
    "introducing broker partnership",
    "forex affiliate program",
    "trading platform partnership",
    "business partnership trading",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function BecomeAPartnerPage() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <BecomeAPartnerPageView />
    </>
  );
}
