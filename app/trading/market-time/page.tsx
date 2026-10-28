import type { Metadata } from "next";
import { TradingMarketTimePageView } from "../../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Market Time Sessions | oceanaprofx",
  description:
    "Track global trading sessions and market time windows with oceanaprofx to improve timing, liquidity awareness and execution decisions.",
  path: "/trading/market-time",
  pageKeywords: [
    "market time",
    "forex session timing",
    "london session trading",
    "new york session trading",
    "asia session trading",
    "best time to trade forex",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <TradingMarketTimePageView />
    </>
  );
}
