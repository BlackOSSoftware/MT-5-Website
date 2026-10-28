import type { Metadata } from "next";
import { TradingPlatformPageView } from "../../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Trading Platform | oceanaprofx",
  description:
    "Explore the oceanaprofx trading platform with multi-device access, execution tools, charting capabilities and risk controls.",
  path: "/trading/platform",
  pageKeywords: [
    "trading platform",
    "forex trading software",
    "web trading platform",
    "mobile trading app",
    "multi device trading",
    "advanced charting platform",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <TradingPlatformPageView />
    </>
  );
}
