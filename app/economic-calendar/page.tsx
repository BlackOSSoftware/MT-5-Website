import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import PageStructuredData from "../components/seo/PageStructuredData";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import CtaBand from "../components/ui/CtaBand";
import { buildPageMetadata } from "../lib/seo";

const PAGE_SEO = {
  title: "Economic Calendar | Macro releases for traders",
  description:
    "Follow macroeconomic releases, forecasts, and revisions in a live calendar view aligned to your timezone.",
  path: "/economic-calendar",
  pageKeywords: [
    "economic calendar",
    "forex news calendar",
    "macroeconomic releases",
    "trading event calendar",
  ],
} as const;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO);

const TIPS = [
  "High-impact events can move majors and indices quickly.",
  "Compare actual vs forecast for surprise direction.",
  "Plan risk before the release â€” not during the spike.",
];

export default function EconomicCalendarPage() {
  return (
    <>
      <PageStructuredData
        title={PAGE_SEO.title}
        description={PAGE_SEO.description}
        path={PAGE_SEO.path}
      />

      <main>
        <PageHero
          compact
          eyebrow="Market pulse"
          title="Economic calendar"
          description="Track macro releases and forecasts. Times adjust to the calendar timezone settings inside the widget."
        />

        <section className="bg-[var(--background-deep)]">
          <div className="container-x grid gap-6 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Reveal className="card min-w-0 overflow-hidden">
              <iframe
                title="Economic Calendar"
                src="https://sslecal2.investing.com?ecoDayBackground=%23f4f6f8&columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=23&lang=1"
                width="100%"
                height="720"
                frameBorder="0"
                allowTransparency
                loading="lazy"
                className="block min-h-[540px] w-full bg-white"
              />
            </Reveal>

            <aside className="grid content-start gap-5">
              <Reveal from="right" className="card p-6">
                <p className="eyebrow">How to read it</p>
                <ul className="mt-5 grid gap-4">
                  {TIPS.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                        style={{ background: "var(--brand-gradient)" }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal from="right" delay={0.08} className="ink-surface rounded-[var(--radius-lg)] p-6">
                <p className="font-display text-lg font-semibold text-white">Trade the release</p>
                <p className="mt-2 text-sm text-white/60">
                  Majors and indices react first. See what you can trade.
                </p>
                <Link href="/markets/forex" className="btn-primary btn-sm mt-5">
                  Browse forex markets
                </Link>
              </Reveal>
            </aside>
          </div>
        </section>

        <CtaBand />
      </main>
    </>
  );
}
