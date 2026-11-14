"use client";

import { useMemo, useState, type ComponentType } from "react";
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
import { useTranslation } from "react-i18next";
import HeroSection from "./HeroSection";
import MarketsOrbit from "./MarketsOrbit";
import SocialShowcase from "./SocialShowcase";
import Reveal from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";
import CtaBand from "../ui/CtaBand";

function ReasonCard({
  icon: Icon,
  title,
  body,
}: {
  icon: ComponentType<{ size?: number }>;
  title: string;
  body: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={open}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
      className={`group relative flex min-h-[140px] cursor-pointer gap-5 overflow-hidden rounded-[15px] bg-[#2aa8b8] p-6 sm:p-8 ${
        open ? "is-open" : ""
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute right-0 top-0 z-0 rounded-tr-[15px] rounded-bl-full bg-[#9ed7f0] transition-all duration-500 ease-out group-hover:h-full group-hover:w-full group-hover:rounded-[15px] group-active:h-full group-active:w-full group-active:rounded-[15px] ${
          open ? "h-full w-full rounded-[15px]" : "h-[22%] w-[22%]"
        }`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 left-0 z-0 rounded-bl-[15px] rounded-tr-full bg-[#9ed7f0] transition-all duration-500 ease-out group-hover:h-full group-hover:w-full group-hover:rounded-[15px] group-active:h-full group-active:w-full group-active:rounded-[15px] ${
          open ? "h-full w-full rounded-[15px]" : "h-[22%] w-[22%]"
        }`}
      />
      <span
        className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-500 group-hover:bg-[#2aa8b8]/25 group-hover:text-[#0a2744] group-active:bg-[#2aa8b8]/25 group-active:text-[#0a2744] ${
          open ? "bg-[#2aa8b8]/25 text-[#0a2744]" : "bg-white/20 text-white"
        }`}
      >
        <Icon size={20} />
      </span>
      <div className="relative z-10">
        <h3
          className={`font-display text-xl font-semibold transition-colors duration-500 group-hover:text-[#0a2744] group-active:text-[#0a2744] ${
            open ? "text-[#0a2744]" : "text-white"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 leading-relaxed transition-colors duration-500 group-hover:text-[#0a2744]/80 group-active:text-[#0a2744]/80 ${
            open ? "text-[#0a2744]/80" : "text-white/85"
          }`}
        >
          {body}
        </p>
      </div>
    </article>
  );
}

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

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  const markets = useMemo(
    () => [
      { nameKey: "forex" as const, href: "/markets/forex", icon: LineChart, tag: "EUR/USD" },
      { nameKey: "crypto" as const, href: "/markets/crypto", icon: Bitcoin, tag: "BTC/USD" },
      { nameKey: "indices" as const, href: "/markets/indices", icon: BarChart3, tag: "US30" },
      { nameKey: "metals" as const, href: "/markets/metal", icon: Coins, tag: "XAU/USD" },
    ],
    [],
  );

  const reasons = useMemo(
    () => [
      { icon: Receipt, title: t("landing.reason1Title"), body: t("landing.reason1Body") },
      { icon: Gauge, title: t("landing.reason2Title"), body: t("landing.reason2Body") },
      { icon: ShieldCheck, title: t("landing.reason3Title"), body: t("landing.reason3Body") },
    ],
    [t, i18n.language],
  );

  const conditions = useMemo(
    () => [
      { market: t("landing.cond1Market"), pricing: t("landing.cond1Pricing"), hours: t("landing.cond1Hours") },
      { market: t("landing.cond2Market"), pricing: t("landing.cond2Pricing"), hours: t("landing.cond2Hours") },
      { market: t("landing.cond3Market"), pricing: t("landing.cond3Pricing"), hours: t("landing.cond3Hours") },
      { market: t("landing.cond4Market"), pricing: t("landing.cond4Pricing"), hours: t("landing.cond4Hours") },
    ],
    [t, i18n.language],
  );

  const platformPoints = useMemo(
    () => [
      { icon: MonitorSmartphone, text: t("landing.platformPoint1") },
      { icon: LineChart, text: t("landing.platformPoint2") },
      { icon: Wallet, text: t("landing.platformPoint3") },
    ],
    [t, i18n.language],
  );

  const steps = useMemo(
    () => [
      { n: "01", title: t("landing.step1Title"), body: t("landing.step1Body") },
      { n: "02", title: t("landing.step2Title"), body: t("landing.step2Body") },
      { n: "03", title: t("landing.step3Title"), body: t("landing.step3Body") },
    ],
    [t, i18n.language],
  );

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
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow={t("landing.marketsEyebrow")}
              title={t("landing.marketsTitle")}
              description={t("landing.marketsDesc")}
            />
            <ul className="mt-8 space-y-3">
              {markets.map((m) => (
                <li key={m.nameKey}>
                  <Link
                    href={m.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]"
                  >
                    {t(`landing.${m.nameKey}`)}
                    <span className="font-medium text-[var(--text-muted)]">· {m.tag}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-[var(--primary)] opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/markets/forex" className="btn-primary btn-sm">
                {t("landing.exploreMarkets")}
              </Link>
              <Link href="/trading/market-time" className="btn-ghost btn-sm">
                {t("landing.marketHours")} <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <Reveal from="right" className="min-h-[320px] lg:min-h-[420px]">
            <MarketsOrbit />
          </Reveal>
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              eyebrow={t("landing.whyEyebrow")}
              title={t("landing.whyTitle")}
              description={t("landing.whyDesc")}
            />
            <Reveal delay={0.1} className="mt-8">
              <Link href="/why-choose-us" className="btn-primary">
                {t("landing.whyCta")}
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-5">
            {reasons.map((r, i) => (
              <Reveal key={r.title} from="right" delay={i * 0.08}>
                <ReasonCard icon={r.icon} title={r.title} body={r.body} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <SocialShowcase />

      <Section>
        <SectionHeader
          eyebrow={t("landing.conditionsEyebrow")}
          title={t("landing.conditionsTitle")}
          action={
            <Link href="/trading/condition" className="btn-ghost btn-sm">
              {t("landing.conditionsCta")} <ArrowUpRight size={15} />
            </Link>
          }
        />
        <Reveal className="card mt-12 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="bg-[var(--background-deep)] text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  <th className="px-6 py-4 font-semibold">{t("landing.colMarket")}</th>
                  <th className="px-6 py-4 font-semibold">{t("landing.colPricing")}</th>
                  <th className="px-6 py-4 font-semibold">{t("landing.colAccess")}</th>
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
              eyebrow={t("landing.platformEyebrow")}
              title={t("landing.platformTitle")}
              description={t("landing.platformDesc")}
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
                {t("landing.platformCta")}
              </Link>
            </Reveal>
          </div>
          <div className="relative w-full">
            <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(18,194,233,0.25),transparent_65%)] blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/oceana-fx-pro-platform.png"
              alt="Oceana Pro Fx trading platform"
              className="relative z-10 h-auto w-full rounded-2xl border border-white/10 bg-white shadow-[0_28px_60px_-28px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow={t("landing.stepsEyebrow")}
          title={t("landing.stepsTitle")}
          align="center"
        />
        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div
            className="absolute left-[16%] right-[16%] top-7 hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--card-border) 15%, var(--card-border) 85%, transparent)",
            }}
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
