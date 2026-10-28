import type { Metadata } from "next";
import { TradingAccountPageView } from "../../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Trading Account Details | oceanaprofx",
  description:
    "Review oceanaprofx trading account structures, pricing profiles and account setup flow for professional market participation.",
  path: "/trading/account",
  pageKeywords: [
    "trading account details",
    "forex account features",
    "broker account setup",
    "multi asset account specs",
    "pricing and leverage profile",
    "oceanaprofx account overview",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <TradingAccountPageView />
    </>
  );
}
