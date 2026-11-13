import type { Metadata } from "next";
import { TradingMobileAppPageView } from "../../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Mobile App | oceanaprofx",
  description:
    "Download the Oceana Android app for live watchlists, charts, tickets, and the same account balance as the web platform.",
  path: "/trading/mobile-app",
  pageKeywords: [
    "mobile trading app",
    "android trading app",
    "forex watchlist app",
    "oceanaprofx app",
    "trade on the go",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <TradingMobileAppPageView />
    </>
  );
}
