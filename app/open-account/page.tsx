import type { Metadata } from "next";
import SimplePage from "../components/SimplePage";
import PageStructuredData from "../components/seo/PageStructuredData";
import { buildPageMetadata } from "../lib/seo";

const PAGE_SEO = {
  title: "Open account | Start trading with oceanaprofx",
  description:
    "Create your oceanaprofx account to trade forex, crypto, indexes, and metals with a clear onboarding path.",
  path: "/open-account",
  pageKeywords: [
    "open oceanaprofx account",
    "trading account signup",
    "broker account opening",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function OpenAccountPage() {
  return (
    <>
      <PageStructuredData
        title={PAGE_SEO.title}
        description={PAGE_SEO.description}
        path={PAGE_SEO.path}
      />
      <SimplePage
        title="Open a live trading account"
        description="Create your profile, complete verification, fund your account, and start trading across major markets."
        primaryLabel="Create account"
        primaryHref="https://user.oceanaprofx.com/signup"
        imageSrc="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Professional at work"
      />
    </>
  );
}
