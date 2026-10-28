"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../ui/PageHero";

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

const FALLBACK: Record<MarketVariant, string> = {
  forex:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2400&q=80",
  crypto:
    "https://images.unsplash.com/photo-1518544887873-2e7e72d20029?auto=format&fit=crop&w=2400&q=80",
  indexes:
    "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=2400&q=80",
  metal:
    "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=2400&q=80",
};

export default function MarketShowcase(props: MarketShowcaseProps) {
  const {
    variant,
    badge,
    title,
    subtitle,
    intro,
    heroImageSrc,
    heroImageAlt,
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

  const reduce = useReducedMotion();
  const hero = heroImageSrc || FALLBACK[variant];

  return (
    <main>
      <PageHero
        eyebrow={badge}
        title={title}
        description={`${subtitle} ${intro}`}
        imageSrc={hero}
        imageAlt={heroImageAlt ?? ""}
        ctas={[
          {
            label: "Open account",
            href: "https://user.oceanaprofx.com/signup",
            variant: "accent",
          },
          {
            label: "Trade now",
            href: "https://user.oceanaprofx.com/login",
            variant: "ghost",
          },
        ]}
      />

      <section className="border-b border-[var(--card-border)] bg-[var(--background)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {whatIsCode}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
              {whatIsTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
              {whatIsDescription}
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
              {featureTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {features.map((f) => (
                <li
                  key={f}
                  className="border-l-2 border-[var(--primary)] pl-4 text-sm text-[var(--text-muted)]"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--card-border)] bg-[var(--background-deep)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {symbolsTitle}
          </h2>
          <div className="mt-8 divide-y divide-[var(--card-border)] border-y border-[var(--card-border)]">
            {symbols.map((item, idx) => (
              <motion.div
                key={item.symbol}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-baseline justify-between gap-3 py-5"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-[var(--foreground)]">
                    {item.symbol}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {item.name} — {item.note}
                  </p>
                </div>
                <Link
                  href="https://user.oceanaprofx.com/signup"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] hover:underline"
                >
                  Trade <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--card-border)] bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {pulseTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">{pulseSubtitle}</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {m.label}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-[var(--foreground)]">
                  {m.value}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--card-border)] bg-[var(--background-deep)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {edgeTitle}
          </h2>
          <div className="mt-10 space-y-8">
            {edgeCards.map((card) => (
              <article
                key={card.title}
                className="border-l-2 border-[var(--accent)] pl-5"
              >
                <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
                  {card.title}
                </h3>
                <p className="mt-2 leading-relaxed text-[var(--text-muted)]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {journeyTitle}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, idx) => (
              <div key={step.title}>
                <p className="font-display text-3xl font-bold text-[var(--primary)]/20">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="https://user.oceanaprofx.com/signup"
              className="btn-primary"
            >
              Open account
            </Link>
            <Link href="/contact" className="btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
