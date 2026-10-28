import type { Metadata } from "next";
import Link from "next/link";
import PageStructuredData from "../components/seo/PageStructuredData";
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

export default function EconomicCalendarPage() {
  return (
    <>
      <PageStructuredData
        title={PAGE_SEO.title}
        description={PAGE_SEO.description}
        path={PAGE_SEO.path}
      />

      <main>
        <section className="border-b border-white/10 bg-[#0b1220] text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Market pulse
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Economic calendar
            </h1>
            <p className="mt-4 max-w-xl text-white/65">
              Track macro releases and forecasts. Times adjust to the calendar
              timezone settings inside the widget.
            </p>
          </div>
        </section>

        <section className="bg-[var(--background)]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[minmax(0,1fr)_320px] md:px-6 md:py-14">
            <div className="overflow-hidden rounded-md border border-[var(--card-border)] bg-[var(--card-bg)]">
              <iframe
                title="Economic Calendar"
                src="https://sslecal2.investing.com?ecoDayBackground=%23f4f6f8&columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=23&lang=1"
                width="100%"
                height="720"
                frameBorder="0"
                allowTransparency
                loading="lazy"
                className="min-h-[540px] w-full"
              />
            </div>

            <aside className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  How to read it
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
                  <li className="border-l-2 border-[var(--primary)] pl-4">
                    High-impact events can move majors and indexes quickly.
                  </li>
                  <li className="border-l-2 border-[var(--primary)] pl-4">
                    Compare actual vs forecast for surprise direction.
                  </li>
                  <li className="border-l-2 border-[var(--primary)] pl-4">
                    Plan risk before the release — not during the spike.
                  </li>
                </ul>
              </div>
              <Link href="/markets/forex" className="btn-primary">
                Browse forex markets
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
