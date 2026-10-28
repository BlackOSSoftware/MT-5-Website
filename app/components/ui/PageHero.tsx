"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Cta = { label: string; href: string; variant?: "primary" | "ghost" | "accent" };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  ctas?: Cta[];
  compact?: boolean;
};

const btnClass = {
  primary: "btn-primary",
  ghost: "btn-ghost border-white/35 text-white hover:bg-white/10",
  accent: "btn-accent",
} as const;

export default function PageHero({
  eyebrow = "oceanaprofx",
  title,
  description,
  imageSrc,
  imageAlt = "",
  ctas = [],
  compact = false,
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={`relative overflow-hidden border-b border-[var(--card-border)] ${
        compact ? "min-h-[52vh]" : "min-h-[70vh]"
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${prefersReducedMotion ? "" : "hero-pan"}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(11,18,32,0.94)_0%,rgba(11,18,32,0.72)_48%,rgba(11,18,32,0.45)_100%)]" />
      </div>

      <div
        className={`relative mx-auto flex w-full max-w-6xl flex-col justify-end px-4 md:px-6 ${
          compact ? "min-h-[52vh] pb-12 pt-24" : "min-h-[70vh] pb-16 pt-28"
        }`}
      >
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/60"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          {description}
        </motion.p>
        {ctas.length > 0 ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {ctas.map((cta) => {
              const external = cta.href.startsWith("http");
              const variant = cta.variant ?? "primary";
              return (
                <Link
                  key={cta.href + cta.label}
                  href={cta.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={
                    variant === "ghost"
                      ? btnClass.ghost
                      : variant === "accent"
                        ? btnClass.accent
                        : btnClass.primary
                  }
                >
                  {cta.label}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
