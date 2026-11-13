import type { Metadata } from "next";
import { TradingPlatformPageView } from "../../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Web Platform | oceanaprofx",
  description:
    "Trade on the Oceana web platform in your browser — live charts, tickets, watchlists, balances, and funding on laptop and tablet.",
  path: "/trading/platform",
  pageKeywords: [
    "web trading platform",
    "browser trading terminal",
    "forex web platform",
    "oceanaprofx portal",
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
