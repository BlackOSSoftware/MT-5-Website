import Link from "next/link";
import { ArrowUpRight, Check, CandlestickChart, Headphones, Layers } from "lucide-react";
import PageHero from "./ui/PageHero";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";
import CtaBand from "./ui/CtaBand";

type SimplePageProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  eyebrow?: string;
  /** Short, factual checklist shown beside the hero copy. */
  points?: string[];
  /** Kept for API compatibility; heroes render a built-in visual. */
  imageSrc?: string;
  imageAlt?: string;
};

const NEXT_LINKS = [
  { icon: CandlestickChart, title: "Explore markets", body: "Forex, crypto, indices, and metals.", href: "/markets/forex" },
  { icon: Layers, title: "Trading accounts", body: "Compare Core, Prime, and Elite.", href: "/trading/account" },
  { icon: Headphones, title: "Contact support", body: "Reach the desk that can help.", href: "/contact" },
] as const;

export default function SimplePage({
  title,
  description,
  primaryLabel,
  primaryHref,
  eyebrow = "Oceana",
  points,
}: SimplePageProps) {
  return (
    <main>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        ctas={[
          { label: primaryLabel, href: primaryHref, variant: "primary" },
          { label: "Back to home", href: "/", variant: "ghost" },
        ]}
        visual={
          points?.length ? (
            <div className="glass-card p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">What to expect</p>
              <ul className="mt-6 grid gap-4">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-white/80">
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "var(--brand-gradient)" }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ) : undefined
        }
      />

      <Section>
        <SectionHeader eyebrow="Keep exploring" title="Where to next?" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {NEXT_LINKS.map((l, i) => {
            const Icon = l.icon;
            return (
              <Reveal key={l.href} delay={i * 0.07}>
                <Link href={l.href} className="card card-hover group flex h-full items-start gap-4 p-6">
                  <span className="icon-tile shrink-0">
                    <Icon size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-semibold text-[var(--foreground)]">{l.title}</span>
                    <span className="mt-1 block text-sm text-[var(--text-muted)]">{l.body}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[var(--primary)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
