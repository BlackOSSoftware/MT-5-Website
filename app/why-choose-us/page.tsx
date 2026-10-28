import type { Metadata } from "next";
import { WhyChooseUsPageView } from "../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../components/seo/PageStructuredData";
import { buildPageMetadata } from "../lib/seo";

const PAGE_SEO = {
  title: "Why Choose oceanaprofx | Execution, Pricing and Trust",
  description:
    "Discover why traders choose oceanaprofx for execution quality, transparent pricing, platform stability and reliable support.",
  path: "/why-choose-us",
  pageKeywords: [
    "why choose oceanaprofx",
    "best broker features",
    "low latency trading broker",
    "transparent trading pricing",
    "trusted forex broker benefits",
    "professional broker advantages",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <WhyChooseUsPageView />
    </>
  );
}
