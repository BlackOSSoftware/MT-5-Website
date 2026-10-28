import type { Metadata } from "next";
import LandingPage from "./components/landing/LandingPage";
import PageStructuredData from "./components/seo/PageStructuredData";
import { buildPageMetadata } from "./lib/seo";

const PAGE_SEO = {
  title: "oceanaprofx | Multi-asset trading, built for clarity",
  description:
    "Trade forex, crypto, indexes, and metals with oceanaprofx — clear pricing, disciplined execution, and a calmer trading stack.",
  path: "/",
  pageKeywords: [
    "oceanaprofx",
    "forex trading",
    "crypto trading",
    "index trading",
    "metals trading",
    "online trading platform",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Home() {
  return (
    <>
      <PageStructuredData
        title={PAGE_SEO.title}
        description={PAGE_SEO.description}
        path={PAGE_SEO.path}
      />
      <LandingPage />
    </>
  );
}
