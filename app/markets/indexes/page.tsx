import type { Metadata } from "next";
import MarketShowcase from "../../components/markets/MarketShowcase";
import PageStructuredData from "../../components/seo/PageStructuredData";
import { buildPageMetadata } from "../../lib/seo";

const PAGE_SEO = {
  title: "Indexes | Global benchmarks on oceanaprofx",
  description:
    "Trade major US, European, and Asian equity indexes on oceanaprofx — broad market exposure without stock-by-stock complexity.",
  path: "/markets/indexes",
  pageKeywords: [
    "indexes",
    "US30",
    "NAS100",
    "SPX500",
    "equity indexes",
    "oceanaprofx indexes",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

export default function Page() {
  return (
    <>
      <PageStructuredData title={PAGE_SEO.title} description={PAGE_SEO.description} path={PAGE_SEO.path} />
      <MarketShowcase
        variant="indexes"
        badge="Indexes"
        title="Broad market views in a single instrument."
        subtitle="Take directional exposure to major economies without building a stock-by-stock book."
        intro="Index products compress regional equity behavior into tradable instruments. oceanaprofx covers key US, European, and Asian benchmarks so you can express macro views, hedge equity risk, or trade session momentum with clear pricing."
        heroImageSrc="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=2400&q=80"
        heroImageAlt="Newspaper on a table"
        symbolsTitle="Benchmark index contracts"
        symbols={[
          { symbol: "US30", name: "Dow Jones Industrial", note: "US blue-chip sentiment" },
          { symbol: "NAS100", name: "Nasdaq 100", note: "Technology-led growth benchmark" },
          { symbol: "SPX500", name: "S&P 500", note: "Broad US equity indicator" },
          { symbol: "GER40", name: "Germany 40", note: "European industrial barometer" },
          { symbol: "UK100", name: "FTSE 100", note: "Large-cap UK index" },
          { symbol: "JPN225", name: "Nikkei 225", note: "Japan risk appetite gauge" },
        ]}
        whatIsTitle="What are index instruments?"
        whatIsCode="IDX"
        whatIsDescription="Index instruments track aggregated baskets of stocks and reflect the performance of key sectors or national markets. They let traders position around macro moves with less single-company event risk than holding individual names."
        featureTitle="Why traders use index exposure"
        features={[
          "Express broad economic sentiment with one instrument",
          "Reduce single-stock event risk in directional setups",
          "Build tactical hedges around equity allocations",
          "Align positions with regional session opens and overlaps",
        ]}
        pulseTitle="Index market snapshot"
        pulseSubtitle="Coverage and session context for planning entries around macro rhythm."
        metrics={[
          { label: "Benchmarks", value: "20+", detail: "Global index coverage across regions" },
          { label: "Session Opportunities", value: "3", detail: "Asia, Europe, US directional windows" },
          { label: "Trade Styles", value: "Multi", detail: "Intraday, swing, and hedge use-cases" },
          { label: "Market Focus", value: "Macro", detail: "Economy-wide directional expression" },
        ]}
        edgeTitle="A practical approach to index trading"
        edgeCards={[
          {
            title: "Macro theme clarity",
            description: "Map economic narratives to a defined index rather than a scattered stock list.",
          },
          {
            title: "Session-based timing",
            description: "Use regional openings and overlaps when liquidity and momentum are clearer.",
          },
          {
            title: "Portfolio overlay use",
            description: "Hedge or rebalance broader equity exposure without unwinding every holding.",
          },
        ]}
        journeyTitle="Four steps to an index plan"
        journeySteps={[
          { title: "Open trading access", description: "Complete registration and activate platform permissions." },
          { title: "Set allocation", description: "Fund the account and assign an index risk budget." },
          { title: "Choose benchmark", description: "Select the index that matches your macro thesis." },
          { title: "Execute strategy", description: "Deploy and manage positions across key sessions." },
        ]}
      />
    </>
  );
}
