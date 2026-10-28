import type { Metadata } from "next";
import MarketShowcase from "../../components/markets/MarketShowcase";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Crypto | Digital asset pairs on oceanaprofx",
  description:
    "Trade leading crypto pairs on oceanaprofx with clear conditions, continuous market access, and practical risk controls.",
  path: "/markets/crypto",
  pageKeywords: [
    "crypto",
    "BTC/USD",
    "ETH/USD",
    "digital assets",
    "oceanaprofx crypto",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <MarketShowcase
        variant="crypto"
        badge="Crypto"
        title="Digital markets with structure, not noise."
        subtitle="Trade leading crypto pairs with transparent conditions and tools built for high-volatility sessions."
        intro="Crypto moves on liquidity, sentiment, and catalysts — often outside traditional market hours. oceanaprofx gives you access to active large-cap pairs with clear execution feedback and risk controls you can actually use when volatility rises."
        heroImageSrc="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2400&q=80"
        heroImageAlt="Trader using a laptop"
        symbolsTitle="Active crypto pairs"
        symbols={[
          { symbol: "BTC/USD", name: "Bitcoin vs US Dollar", note: "Institutional crypto benchmark" },
          { symbol: "ETH/USD", name: "Ethereum vs US Dollar", note: "Smart-contract market leader" },
          { symbol: "SOL/USD", name: "Solana vs US Dollar", note: "High-beta trend instrument" },
          { symbol: "XRP/USD", name: "XRP vs US Dollar", note: "Payments narrative market" },
          { symbol: "ADA/USD", name: "Cardano vs US Dollar", note: "Cycle rotation candidate" },
          { symbol: "BNB/USD", name: "BNB vs US Dollar", note: "Exchange ecosystem pair" },
        ]}
        whatIsTitle="What are crypto trading pairs?"
        whatIsCode="CTP"
        whatIsDescription="A crypto pair reflects the value relationship between a digital asset and fiat (or another asset). Traders use these instruments to follow trends, rotate across names, and manage risk when volatility regimes shift quickly."
        featureTitle="Where crypto access helps"
        features={[
          "Follow momentum with breakout or pullback approaches",
          "Respond to catalysts without leaving the same platform",
          "Diversify alongside forex, indexes, and metals",
          "Apply position limits when volatility expands",
        ]}
        pulseTitle="Crypto market snapshot"
        pulseSubtitle="Coverage and operating context for traders who want facts before size."
        metrics={[
          { label: "Core Pairs", value: "30+", detail: "Most active large-cap instruments" },
          { label: "Volatility Cycles", value: "24/7", detail: "Continuous global digital market" },
          { label: "Execution", value: "Low-Latency", detail: "Fast order acknowledgment and fills" },
          { label: "Risk Controls", value: "Multi-Layer", detail: "Position and exposure safeguards" },
        ]}
        edgeTitle="How we support crypto workflows"
        edgeCards={[
          {
            title: "Stable under load",
            description: "Infrastructure is built to stay usable during volume spikes and sharp moves.",
          },
          {
            title: "Clear position view",
            description: "See exposure across pairs so scaling entries and exits stays intentional.",
          },
          {
            title: "Operational reliability",
            description: "Keep attention on the setup — not on platform interruptions under stress.",
          },
        ]}
        journeyTitle="Four steps into a crypto workflow"
        journeySteps={[
          { title: "Activate account", description: "Set up your profile and secure access credentials." },
          { title: "Allocate capital", description: "Fund your account and define risk limits first." },
          { title: "Pick market", description: "Select the crypto pair that matches your thesis." },
          { title: "Trade & refine", description: "Execute, review fills, and adjust with discipline." },
        ]}
      />
    </>
  );
}
