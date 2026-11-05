"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "../ui/PageHero";
import Reveal from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";
import CtaBand, { LOGIN_URL, SIGNUP_URL } from "../ui/CtaBand";

type MarketVariant = "forex" | "crypto" | "indexes" | "metal";

type MarketSymbol = { symbol: string; name: string; note: string };
type Metric = { label: string; value: string; detail: string };
type EdgeCard = { title: string; description: string };
type JourneyStep = { title: string; description: string };

type MarketShowcaseProps = {
  variant: MarketVariant;
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  /** Kept for API compatibility; the hero renders a built-in visual. */
  heroImageSrc?: string;
  heroImageAlt?: string;
  whatIsTitle: string;
  whatIsCode: string;
  whatIsDescription: string;
  featureTitle: string;
  features: string[];
  symbolsTitle: string;
  symbols: MarketSymbol[];
  pulseTitle: string;
  pulseSubtitle: string;
  metrics: Metric[];
  edgeTitle: string;
  edgeCards: EdgeCard[];
  journeyTitle: string;
  journeySteps: JourneyStep[];
};

export default function MarketShowcase(props: MarketShowcaseProps) {
  const {
    badge,
    title,
    subtitle,
    intro,
    whatIsTitle,
    whatIsCode,
    whatIsDescription,
    featureTitle,
    features,
    symbolsTitle,
    symbols,
    pulseTitle,
    pulseSubtitle,
    metrics,
    edgeTitle,
    edgeCards,
    journeyTitle,
    journeySteps,
  } = props;

  return (
    <main>
      <PageHero
        eyebrow={badge}
        title={title}
        description={`${subtitle} ${intro}`}
        ctas={[
          { label: "Open account", href: SIGNUP_URL, variant: "primary" },
          { label: "Trade now", href: LOGIN_URL, variant: "ghost" },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader eyebrow={whatIsCode} title={whatIsTitle} description={whatIsDescription} />
          <Reveal from="right" className="card p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">{featureTitle}</h3>
            <ul className="mt-6 grid gap-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[var(--text-muted)]">
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "var(--brand-gradient)" }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="deep">
        <SectionHeader
          eyebrow="Instruments"
          title={symbolsTitle}
          action={
            <Link href="/trading/market-time" className="btn-ghost btn-sm">
              Market hours <ArrowUpRight size={15} />
            </Link>
          }
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {symbols.map((item, idx) => (
            <Reveal key={item.symbol} delay={(idx % 3) * 0.06}>
              <Link
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex h-full items-start justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-[var(--foreground)]">{item.symbol}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground)]/80">{item.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{item.note}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--card-border)] text-[var(--primary)] transition group-hover:border-transparent group-hover:bg-[var(--primary)] group-hover:text-white">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeader dark eyebrow="Market pulse" title={pulseTitle} description={pulseSubtitle} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07} className="glass-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{m.label}</p>
              <p className="mt-3 font-display text-3xl font-semibold text-white">{m.value}</p>
              <p className="mt-2 text-sm text-white/60">{m.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Our edge" title={edgeTitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {edgeCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07}>
              <article className="card card-hover h-full p-6 sm:p-7">
                <span className="font-display text-sm font-semibold text-[var(--primary)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-[var(--foreground)]">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--text-muted)]">{card.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep">
        <SectionHeader eyebrow="How to start" title={journeyTitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map((step, idx) => (
            <Reveal key={step.title} from="left" delay={idx * 0.08} className="relative">
              <div className="card h-full p-6">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl font-display text-sm font-semibold text-white"
                  style={{ background: "var(--brand-gradient)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-[var(--foreground)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
