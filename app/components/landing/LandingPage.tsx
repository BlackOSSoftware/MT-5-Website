"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Bitcoin,
  Coins,
  Gauge,
  LineChart,
  MonitorSmartphone,
  Receipt,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import HeroSection from "./HeroSection";
import Reveal from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";
import ChartVisual from "../ui/ChartVisual";
import CtaBand from "../ui/CtaBand";

const markets = [
  {
    name: "Forex",
    href: "/markets/forex",
    icon: LineChart,
    copy: "Majors and crosses with session-aware depth when London and New York overlap.",
    tags: ["EUR/USD", "GBP/USD", "USD/JPY"],
  },
  {
    name: "Crypto",
    href: "/markets/crypto",
    icon: Bitcoin,
    copy: "Round-the-clock pairs for strategies that do not wait for the cash open.",
    tags: ["BTC/USD", "ETH/USD"],
  },
  {
    name: "Indices",
    href: "/markets/indices",
    icon: BarChart3,
    copy: "Benchmark exposure for directional views and portfolio hedges.",
    tags: ["US30", "NAS100", "SPX500"],
  },
  {
    name: "Metals",
    href: "/markets/metal",
    icon: Coins,
    copy: "Gold, silver, and hard-asset instruments with transparent cost structure.",
    tags: ["XAU/USD", "XAG/USD"],
  },
] as const;

const tickerSymbols = [
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "AUD/USD",
  "XAU/USD",
  "XAG/USD",
  "BTC/USD",
  "ETH/USD",
  "US30",
  "NAS100",
  "SPX500",
  "USD/CAD",
] as const;

const reasons = [
  {
    icon: Receipt,
    title: "Costs before clicks",
    body: "See how pricing is structured before you size a position. No soft language around spreads.",
  },
  {
    icon: Gauge,
    title: "Execution under pressure",
    body: "Routing is tuned for the moments depth thins â€” opens, overlaps, and news windows.",
  },
  {
    icon: ShieldCheck,
    title: "Risk beside the ticket",
    body: "Controls sit next to the order flow so exposure stays intentional, not accidental.",
  },
] as const;

const conditions = [
  { market: "Forex majors", pricing: "Session-aware", hours: "24/5" },
  { market: "Gold (XAU/USD)", pricing: "Depth-led", hours: "Extended" },
  { market: "US Indices", pricing: "Benchmark-aligned", hours: "Cash session" },
  { market: "Core crypto", pricing: "Market-linked", hours: "24/7" },
] as const;

const platformPoints = [
  { icon: MonitorSmartphone, text: "Same account and balance on web and Android" },
  { icon: LineChart, text: "Live charts with order entry beside the chart" },
  { icon: Wallet, text: "Deposits, withdrawals, and transfers from the client portal" },
] as const;

const steps = [
  { n: "01", title: "Register", body: "Create your profile and complete a short verification path." },
  { n: "02", title: "Fund", body: "Deposit with methods that match how you already move money." },
  { n: "03", title: "Trade", body: "Enter live markets from web or mobile with the same balance." },
] as const;

export default function LandingPage() {
  return (
    <main>
      <HeroSection />

      <div className="overflow-hidden border-b border-[var(--card-border)] bg-[var(--card-bg)] py-4">
        <div className="marquee-track flex w-max gap-10 opacity-70">
          {[...tickerSymbols, ...tickerSymbols].map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="flex items-center gap-2.5 whitespace-nowrap font-display text-sm font-semibold tracking-wide text-[var(--text-muted)]"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-gradient)" }} />
              {s}
            </span>
          ))}
        </div>
      </div>

      <Section>
        <SectionHeader
          eyebrow="Markets"
          title="Four asset classes. One trading account."
          description="Switch instruments without switching platforms or mental models."
          action={
            <Link href="/trading/market-time" className="btn-ghost btn-sm">
              Market hours <ArrowUpRight size={15} />
            </Link>
          }
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.name} delay={i * 0.07}>
                <Link href={m.href} className="card card-hover group flex h-full flex-col p-6">
                  <span className="icon-tile">
                    <Icon size={20} />
                  </span>
                  <p className="mt-6 font-display text-2xl font-semibold text-[var(--foreground)]">{m.name}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{m.copy}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--card-border)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
                    View market
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              eyebrow="Why Oceana"
              title="Built for traders who prefer signal over noise."
              description="Every part of the stack is designed to keep costs visible, execution steady, and risk under your control."
            />
            <Reveal delay={0.1} className="mt-8">
              <Link href="/why-choose-us" className="btn-primary">
                Why traders choose us
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.title} from="right" delay={i * 0.08}>
                  <article className="card card-hover flex gap-5 p-6 sm:p-8">
                    <span className="icon-tile shrink-0">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">{r.title}</h3>
                      <p className="mt-2 leading-relaxed text-[var(--text-muted)]">{r.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Conditions"
          title="Straight answers on pricing and access."
          action={
            <Link href="/trading/condition" className="btn-ghost btn-sm">
              Full trading conditions <ArrowUpRight size={15} />
            </Link>
          }
        />
        <Reveal className="card mt-12 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="bg-[var(--background-deep)] text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  <th className="px-6 py-4 font-semibold">Market</th>
                  <th className="px-6 py-4 font-semibold">Pricing</th>
                  <th className="px-6 py-4 font-semibold">Access</th>
                </tr>
              </thead>
              <tbody>
                {conditions.map((row) => (
                  <tr
                    key={row.market}
                    className="border-t border-[var(--card-border)] transition-colors hover:bg-[var(--hover-bg)]"
                  >
                    <td className="px-6 py-5 font-semibold text-[var(--foreground)]">{row.market}</td>
                    <td className="px-6 py-5 text-[var(--text-muted)]">{row.pricing}</td>
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                        {row.hours}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              dark
              eyebrow="Platform"
              title="One workspace at the desk and in your pocket."
              description="Charts, tickets, balances, and funding stay aligned â€” whether you are managing risk on a monitor or checking exposure on the move."
            />
            <ul className="mt-8 grid gap-4">
              {platformPoints.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal as="li" key={p.text} from="left" delay={0.1 + i * 0.08} className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-[var(--accent-soft)]">
                      <Icon size={18} />
                    </span>
                    <span className="text-white/80">{p.text}</span>
                  </Reveal>
                );
              })}
            </ul>
            <Reveal delay={0.3} className="mt-10">
              <Link href="/trading/platform" className="btn-primary">
                Explore the platform
              </Link>
            </Reveal>
          </div>
          <Reveal from="right" className="relative">
            <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(18,194,233,0.25),transparent_65%)] blur-2xl" />
            <ChartVisual />
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Get started" title="Three steps from registration to live." align="center" />
        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div
            className="absolute left-[16%] right-[16%] top-7 hidden h-px md:block"
            style={{ background: "linear-gradient(90deg, transparent, var(--card-border) 15%, var(--card-border) 85%, transparent)" }}
            aria-hidden
          />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="relative text-center">
              <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[var(--primary)] font-display text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(47,91,255,0.6)]">
                {s.n}
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-[var(--foreground)]">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
