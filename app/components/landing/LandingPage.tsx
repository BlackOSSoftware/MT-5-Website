"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HeroSection from "./HeroSection";

const markets = [
  {
    name: "Forex",
    href: "/markets/forex",
    copy: "Majors and crosses with session-aware depth when London and New York overlap.",
  },
  {
    name: "Crypto",
    href: "/markets/crypto",
    copy: "Round-the-clock pairs for strategies that do not wait for the cash open.",
  },
  {
    name: "Indexes",
    href: "/markets/indexes",
    copy: "Benchmark exposure for directional views and portfolio hedges.",
  },
  {
    name: "Metals",
    href: "/markets/metal",
    copy: "Gold, silver, and hard-asset instruments with transparent cost structure.",
  },
] as const;

const reasons = [
  {
    title: "Costs before clicks",
    body: "See how pricing is structured before you size a position. No soft language around spreads.",
  },
  {
    title: "Execution under pressure",
    body: "Routing is tuned for the moments depth thins — opens, overlaps, and news windows.",
  },
  {
    title: "Risk beside the ticket",
    body: "Controls sit next to the order flow so exposure stays intentional, not accidental.",
  },
] as const;

const conditions = [
  { market: "Forex majors", pricing: "Session-aware", hours: "24/5" },
  { market: "Gold (XAU/USD)", pricing: "Depth-led", hours: "Extended" },
  { market: "US indexes", pricing: "Benchmark-aligned", hours: "Cash session" },
  { market: "Core crypto", pricing: "Market-linked", hours: "24/7" },
] as const;

const steps = [
  {
    n: "01",
    title: "Register",
    body: "Create your profile and complete a short verification path.",
  },
  {
    n: "02",
    title: "Fund",
    body: "Deposit with methods that match how you already move money.",
  },
  {
    n: "03",
    title: "Trade",
    body: "Enter live markets from web or mobile with the same balance.",
  },
] as const;

const fade = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, amount: 0.2 },
};

export default function LandingPage() {
  const reduce = useReducedMotion();

  return (
    <main>
      <HeroSection />

      <section className="border-b border-[var(--card-border)] bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div {...(reduce ? {} : fade)} className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Markets
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Four asset classes. One trading account.
            </h2>
            <p className="mt-3 text-[var(--text-muted)]">
              Switch instruments without switching platforms or mental models.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-[var(--card-border)] bg-[var(--card-border)] sm:grid-cols-2">
            {markets.map((m, i) => (
              <motion.div
                key={m.name}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href={m.href}
                  className="group flex h-full flex-col justify-between bg-[var(--card-bg)] p-6 transition-colors hover:bg-[var(--hover-bg)] sm:p-8"
                >
                  <div>
                    <p className="font-display text-2xl font-bold text-[var(--foreground)]">
                      {m.name}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                      {m.copy}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
                    View market
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--card-border)] bg-[var(--background-deep)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-6 md:py-24">
          <motion.div
            {...(reduce ? {} : fade)}
            className="md:sticky md:top-28 md:self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Why oceanaprofx
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Built for traders who prefer signal over noise.
            </h2>
          </motion.div>
          <div className="space-y-10">
            {reasons.map((r, i) => (
              <motion.article
                key={r.title}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="border-l-2 border-[var(--primary)] pl-5"
              >
                <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
                  {r.title}
                </h3>
                <p className="mt-2 leading-relaxed text-[var(--text-muted)]">
                  {r.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--card-border)] bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div {...(reduce ? {} : fade)} className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Conditions
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Straight answers on pricing and access.
            </h2>
          </motion.div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)] text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  <th className="pb-3 pr-4 font-medium">Market</th>
                  <th className="pb-3 pr-4 font-medium">Pricing</th>
                  <th className="pb-3 font-medium">Access</th>
                </tr>
              </thead>
              <tbody>
                {conditions.map((row) => (
                  <tr
                    key={row.market}
                    className="border-b border-[var(--card-border)]"
                  >
                    <td className="py-4 pr-4 font-semibold text-[var(--foreground)]">
                      {row.market}
                    </td>
                    <td className="py-4 pr-4 text-[var(--text-muted)]">
                      {row.pricing}
                    </td>
                    <td className="py-4 text-[var(--text-muted)]">{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/trading/condition"
            className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] hover:underline"
          >
            Full trading conditions <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className="border-b border-[var(--card-border)] bg-[var(--background-deep)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-14 md:px-6 md:py-24">
          <motion.div {...(reduce ? {} : fade)}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Platform
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              One workspace at the desk and in your pocket.
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
              Charts, tickets, balances, and funding stay aligned — whether you
              are managing risk on a monitor or checking exposure on the move.
            </p>
            <Link href="/trading/platform" className="btn-primary mt-8">
              Explore the platform
            </Link>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-md"
          >
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
              alt="Trading analytics on screen"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[var(--card-border)] bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div {...(reduce ? {} : fade)}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Get started
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Three steps from registration to live.
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <p className="font-display text-4xl font-bold text-[var(--primary)]/20">
                  {s.n}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-[var(--foreground)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1220] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 md:flex-row md:items-end md:justify-between md:px-6 md:py-24">
          <div className="max-w-lg">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready when the market is.
            </h2>
            <p className="mt-3 text-white/65">
              Open a live account and trade with the same focused stack we built
              for disciplined desks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://user.oceanaprofx.com/signup"
              className="btn-accent"
            >
              Open account
            </Link>
            <Link
              href="/contact"
              className="btn-ghost border-white/30 text-white hover:bg-white/10"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
