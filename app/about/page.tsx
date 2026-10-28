import type { Metadata } from "next";
import { AboutPageView } from "../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../components/seo/PageStructuredData";
import { buildPageMetadata } from "../lib/seo";

const PAGE_SEO = {
  title: "About oceanaprofx | Professional Multi-Asset Trading Company",
  description:
    "Learn about oceanaprofx, our trading philosophy, platform reliability, execution standards and commitment to transparent client-focused operations.",
  path: "/about",
  pageKeywords: [
    "about oceanaprofx",
    "trading company profile",
    "broker mission and vision",
    "transparent brokerage company",
    "professional trading infrastructure",
    "trusted forex and cfd broker",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function AboutPage() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <AboutPageView />
    </>
  );
}
