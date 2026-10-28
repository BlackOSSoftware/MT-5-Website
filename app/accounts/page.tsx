import type { Metadata } from "next";
import SimplePage from "../components/SimplePage";
import PageStructuredData from "../components/seo/PageStructuredData";
import { buildPageMetadata } from "../lib/seo";

const PAGE_SEO = {
  title: "Accounts | Compare oceanaprofx trading accounts",
  description:
    "Review oceanaprofx account options and open the structure that fits your trading style and activity level.",
  path: "/accounts",
  pageKeywords: [
    "oceanaprofx accounts",
    "trading account types",
    "open online trading account",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function AccountsPage() {
  return (
    <>
      <PageStructuredData
        title={PAGE_SEO.title}
        description={PAGE_SEO.description}
        path={PAGE_SEO.path}
      />
      <SimplePage
        title="Trading accounts"
        description="Compare Core, Prime, and Elite structures — then open the account that matches your frequency and risk posture."
        primaryLabel="View account details"
        primaryHref="/trading/account"
        imageSrc="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Currency notes"
      />
    </>
  );
}
