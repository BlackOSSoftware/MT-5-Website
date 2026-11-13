import type { Metadata } from "next";
import { TradingSocialPageView } from "../../components/pages/routes/PublicRoutePages";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Social Trading | oceanaprofx",
  description:
    "Follow strategies and copy trades on oceanaprofx with clear performance stats and deliberate risk controls.",
  path: "/trading/social-trading",
  pageKeywords: [
    "social trading",
    "copy trading",
    "strategy following",
    "oceanaprofx social trading",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <TradingSocialPageView />
    </>
  );
}
