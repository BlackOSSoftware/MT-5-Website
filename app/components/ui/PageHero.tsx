"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import ChartVisual from "./ChartVisual";

type Cta = { label: string; href: string; variant?: "primary" | "ghost" | "accent" };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  /** Optional right-hand photo; used when `visual` is not provided. */
  imageSrc?: string;
  imageAlt?: string;
  /** contain = fit UI frame; cover = fill box (default). */
  imageFit?: "cover" | "contain";
  ctas?: Cta[];
  compact?: boolean;
  /** Optional right-hand visual; defaults to the illustrative chart on full heroes. */
  visual?: ReactNode;
  highlights?: string[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function PageHero({
  eyebrow = "Oceana",
  title,
  description,
  imageSrc,
  imageAlt = "",
  imageFit = "cover",
  ctas = [],
  compact = false,
  visual,
  highlights,
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const showVisual = visual !== null && !compact;
  const enter = (delay: number, x = 0, y = 18) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, x, y },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="ink-surface">
      <div
        className={`container-x grid items-center gap-12 ${
          compact ? "pb-16 pt-32 md:pb-20 md:pt-36" : "pb-20 pt-32 md:pb-28 md:pt-40"
        } ${showVisual ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}
      >
        <div className={showVisual ? "" : "max-w-3xl"}>
          <motion.p {...enter(0, -24, 0)} className="eyebrow !text-[var(--accent-soft)]">
            {eyebrow}
          </motion.p>
          <motion.h1
            {...enter(0.08)}
            className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.25rem]"
          >
            {title}
          </motion.h1>
          <motion.p
            {...enter(0.16)}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {description}
          </motion.p>

          {ctas.length > 0 ? (
            <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap gap-3">
              {ctas.map((cta) => {
                const external = cta.href.startsWith("http");
                const ghost = cta.variant === "ghost";
                return (
                  <Link
                    key={cta.href + cta.label}
                    href={cta.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`group ${ghost ? "btn-glass" : "btn-primary"}`}
                  >
                    {cta.label}
                    {!ghost ? (
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    ) : null}
                  </Link>
                );
              })}
            </motion.div>
          ) : null}

          {highlights?.length ? (
            <motion.ul {...enter(0.32)} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {h}
                </li>
              ))}
            </motion.ul>
          ) : null}
        </div>

        {showVisual ? (
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, x: 40 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.8, delay: 0.2, ease },
                })}
            className={`relative ${imageSrc || visual ? "block" : "hidden lg:block"}`}
          >
            <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(47,91,255,0.22),transparent_65%)] blur-2xl" />
            {visual ??
              (imageSrc ? (
                <div
                  className={
                    imageFit === "contain"
                      ? "relative mx-auto flex max-h-[min(560px,70vh)] max-w-md items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#07101f]/80 p-3 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.7)] sm:max-w-lg sm:p-4"
                      : "relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_28px_60px_-28px_rgba(0,0,0,0.7)]"
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={
                      imageFit === "contain"
                        ? "mx-auto h-auto max-h-[min(520px,66vh)] w-auto max-w-full object-contain"
                        : "h-auto w-full object-cover"
                    }
                  />
                </div>
              ) : (
                <ChartVisual />
              ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
