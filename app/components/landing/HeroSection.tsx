"use client";

import PageHero from "../ui/PageHero";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80";

export default function HeroSection() {
  return (
    <PageHero
      eyebrow="oceanaprofx"
      title="Markets move fast. Your platform should feel calm."
      description="Trade forex, crypto, indexes, and metals from one account — with pricing you can read and execution built for busy sessions."
      imageSrc={HERO_IMAGE}
      imageAlt="City skyline representing global markets"
      ctas={[
        {
          label: "Open account",
          href: "https://user.oceanaprofx.com/signup",
          variant: "accent",
        },
        { label: "Explore markets", href: "/markets/forex", variant: "ghost" },
      ]}
    />
  );
}
