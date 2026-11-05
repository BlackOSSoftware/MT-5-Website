import type { Metadata } from "next";
import SimplePage from "../components/SimplePage";
import PageStructuredData from "../components/seo/PageStructuredData";
import { buildPageMetadata } from "../lib/seo";

const PAGE_SEO = {
  title: "Log in | Access your oceanaprofx portal",
  description:
    "Sign in to the oceanaprofx client portal to manage your account, funding, and live positions.",
  path: "/login",
  pageKeywords: ["oceanaprofx login", "trading account login", "client portal"],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function LoginPage() {
  return (
    <>
      <PageStructuredData
        title={PAGE_SEO.title}
        description={PAGE_SEO.description}
        path={PAGE_SEO.path}
      />
      <SimplePage
        title="Log in to your portal"
        description="Access your dashboard, manage funds, and monitor open positions from one secure client area."
        primaryLabel="Go to login"
        primaryHref="https://user.oceanaprofx.com/login"
        eyebrow="Client portal"
        points={[
          "View balances, equity, and open positions",
          "Deposit, withdraw, and transfer between accounts",
          "Launch the trading terminal in one click",
        ]}
      />
    </>
  );
}
