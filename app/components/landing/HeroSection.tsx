"use client";

import PageHero from "../ui/PageHero";
import { SIGNUP_URL } from "../ui/CtaBand";

export default function HeroSection() {
  return (
    <PageHero
      eyebrow="Oceana"
      title="Markets move fast. Your platform should feel calm."
      description="Trade forex, crypto, indices, and metals from one account â€” with pricing you can read and execution built for busy sessions."
      ctas={[
        { label: "Try Demo Account", href: SIGNUP_URL, variant: "primary" },
        { label: "Explore markets", href: "/markets/forex", variant: "ghost" },
      ]}
      highlights={["Four asset classes, one balance", "Web and Android", "Transparent pricing"]}
    />
  );
}
