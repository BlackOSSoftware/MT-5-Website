import type { Metadata } from "next";
import { TradingPammPageView } from "../../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "PAMM | oceanaprofx",
  description:
    "Allocate capital through oceanaprofx PAMM with clear manager structure, proportional results, and governed access.",
  path: "/trading/pamm",
  pageKeywords: [
    "PAMM",
    "PAMM account",
    "managed forex account",
    "oceanaprofx PAMM",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <TradingPammPageView />
    </>
  );
}
