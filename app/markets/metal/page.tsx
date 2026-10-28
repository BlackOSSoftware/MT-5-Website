import type { Metadata } from "next";
import MarketShowcase from "../../components/markets/MarketShowcase";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Metals | Gold, silver & more on oceanaprofx",
  description:
    "Trade gold, silver, and related metal instruments on oceanaprofx with transparent pricing and steady execution.",
  path: "/markets/metal",
  pageKeywords: [
    "metals",
    "gold",
    "silver",
    "XAU/USD",
    "XAG/USD",
    "oceanaprofx metals",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <MarketShowcase
        variant="metal"
        badge="Metals"
        title="Precious metals with clear pricing."
        subtitle="Position in gold, silver, and related instruments using a transparent execution framework."
        intro="Metal markets are often used for inflation positioning, risk balancing, and directional commodity views. oceanaprofx provides access to core precious instruments with readable costs and platform stability when policy or risk events move prices."
        heroImageSrc="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=2400&q=80"
        heroImageAlt="Gold bar tooling and metal surfaces"
        symbolsTitle="Key metal instruments"
        symbols={[
          { symbol: "XAU/USD", name: "Gold vs US Dollar", note: "Global risk and inflation proxy" },
          { symbol: "XAG/USD", name: "Silver vs US Dollar", note: "Monetary plus industrial exposure" },
          { symbol: "XPT/USD", name: "Platinum vs US Dollar", note: "Specialized demand-driven metal" },
          { symbol: "XPD/USD", name: "Palladium vs US Dollar", note: "Automotive cycle-sensitive" },
          { symbol: "XAUEUR", name: "Gold vs Euro", note: "Regional hedge alternative" },
          { symbol: "XAGEUR", name: "Silver vs Euro", note: "Euro-zone commodity view" },
        ]}
        whatIsTitle="What are metal trading instruments?"
        whatIsCode="MTI"
        whatIsDescription="Metal instruments track the relative pricing of precious commodities against currencies. Traders use these markets for portfolio balance, inflation-related positioning, and tactical directional trades when uncertainty rises."
        featureTitle="How metal access is typically used"
        features={[
          "Balance risk during uncertainty and risk-off phases",
          "Position around inflation and central-bank policy shifts",
          "Follow momentum in commodity-led cycles",
          "Diversify beyond currencies and equity benchmarks",
        ]}
        pulseTitle="Metals market snapshot"
        pulseSubtitle="Coverage and drivers for traders who treat metals as part of a broader plan."
        metrics={[
          { label: "Core Metals", value: "6+", detail: "Gold, silver, and specialty instruments" },
          { label: "Use Cases", value: "Dual", detail: "Hedging and directional opportunities" },
          { label: "Market Drivers", value: "Macro", detail: "Rates, inflation, and global risk sentiment" },
          { label: "Execution Layer", value: "Pro", detail: "Stable routing and order management" },
        ]}
        edgeTitle="How we approach metals"
        edgeCards={[
          {
            title: "Portfolio balance access",
            description: "Add metals alongside forex, crypto, and indexes in one account structure.",
          },
          {
            title: "Event-session readiness",
            description: "Stay able to act around major policy and inflation releases without platform drama.",
          },
          {
            title: "Transparent cost view",
            description: "Judge setup quality with clearer pricing and execution visibility before you size.",
          },
        ]}
        journeyTitle="Four steps into metals"
        journeySteps={[
          { title: "Register profile", description: "Set up account access and basic trading preferences." },
          { title: "Fund account", description: "Add capital and calibrate your risk allocation." },
          { title: "Select instrument", description: "Choose gold, silver, or a specialty metal market." },
          { title: "Trade with control", description: "Execute setups and manage exposure deliberately." },
        ]}
      />
    </>
  );
}
