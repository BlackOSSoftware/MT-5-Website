import type { Metadata } from "next";
import MarketShowcase from "../../components/markets/MarketShowcase";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Forex | Currency pairs on oceanaprofx",
  description:
    "Trade major, minor, and selected cross currency pairs on oceanaprofx with clear pricing and weekday session access.",
  path: "/markets/forex",
  pageKeywords: [
    "forex",
    "currency pairs",
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",
    "oceanaprofx forex",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <MarketShowcase
        variant="forex"
        badge="Forex"
        title="Currency markets, explained without the noise."
        subtitle="Trade 45+ pairs across Asia, London, and New York with readable pricing and steady order handling."
        intro="FX runs around the clock on weekdays. oceanaprofx gives you access to major, minor, and selected cross pairs so you can express macro views, manage currency exposure, and work within the session windows that match your strategy."
        heroImageSrc="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=2400&q=80"
        heroImageAlt="Fan of US dollar banknotes"
        symbolsTitle="Major and cross pairs"
        symbols={[
          { symbol: "EUR/USD", name: "Euro vs US Dollar", note: "Most liquid major pair" },
          { symbol: "GBP/USD", name: "British Pound vs US Dollar", note: "Volatility-rich trend pair" },
          { symbol: "USD/JPY", name: "US Dollar vs Japanese Yen", note: "Macro-sensitive benchmark" },
          { symbol: "AUD/USD", name: "Australian Dollar vs US Dollar", note: "Commodity cycle proxy" },
          { symbol: "USD/CAD", name: "US Dollar vs Canadian Dollar", note: "Energy-linked setup" },
          { symbol: "EUR/JPY", name: "Euro vs Japanese Yen", note: "Cross pair momentum favorite" },
        ]}
        whatIsTitle="What are forex currency pairs?"
        whatIsCode="FCP"
        whatIsDescription="Forex instruments are quoted in pairs, where one currency is priced against another. That relative valuation lets traders express macro, policy, and sentiment views while managing exposure with directional or hedging strategies."
        featureTitle="What FX access is useful for"
        features={[
          "Go long or short depending on your view",
          "Trade across weekday sessions — Asia, London, New York",
          "Manage currency exposure alongside other markets",
          "Work rate-differential setups when conditions support them",
        ]}
        pulseTitle="Forex market snapshot"
        pulseSubtitle="A concise view of coverage and session structure — useful context before you size a trade."
        metrics={[
          { label: "Tradable Pairs", value: "45+", detail: "Major, minor, and selected cross pairs" },
          { label: "Sessions", value: "3", detail: "Asia, London, New York market cycle" },
          { label: "Trading Window", value: "24/5", detail: "Continuous weekday currency access" },
          { label: "Order Routing", value: "Tier-1", detail: "Liquidity routed for consistent fills" },
        ]}
        edgeTitle="How we approach FX execution"
        edgeCards={[
          {
            title: "Session-aware liquidity",
            description: "Order handling respects when each regional window is deepest — and when it is thin.",
          },
          {
            title: "Readable pricing",
            description: "Costs and spreads stay visible so you can judge setup quality before committing size.",
          },
          {
            title: "Practical risk tools",
            description: "Stops, exposure checks, and position updates stay close at hand when momentum shifts.",
          },
        ]}
        journeyTitle="Four steps from account to first FX trade"
        journeySteps={[
          { title: "Create profile", description: "Open your account and choose your base currency." },
          { title: "Fund wallet", description: "Add capital and set a risk profile you can stick to." },
          { title: "Select pair", description: "Pick majors, minors, or crosses that match your setup." },
          { title: "Execute & manage", description: "Enter, monitor, and adjust positions in real time." },
        ]}
      />
    </>
  );
}
