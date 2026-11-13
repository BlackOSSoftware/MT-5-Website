"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Monitor,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SIGNUP_URL } from "@/app/components/ui/CtaBand";
import HeroLiveDevices from "./HeroLiveDevices";

const ease = [0.22, 1, 0.36, 1] as const;

const LINE_KEYS = ["smarter", "better", "faster", "clearer", "further"] as const;

const HERO_BGS = [
  "/images/hero-bg-forex-halo.png",
  "/images/hero-bg-market-icons.png",
  "/images/hero-bg-team-triumph.png",
] as const;

const ROTATE_MS = 4500;

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const reduce = useReducedMotion();
  const prefersReduced = reduce === true;
  const [lineIndex, setLineIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const rotateLines = useMemo(
    () =>
      LINE_KEYS.map((key) => ({
        key,
        before: t(`hero.line_${key}_before`),
        accent: t(`hero.line_${key}_accent`),
        after: t(`hero.line_${key}_after`),
      })),
    [t, i18n.language],
  );

  const trustItems = useMemo(
    () => [
      { icon: ShieldCheck, label: t("hero.trustSecurity") },
      { icon: MonitorSmartphone, label: t("hero.trustDevices") },
      { icon: Wallet, label: t("hero.trustPricing") },
    ],
    [t, i18n.language],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReduced) return;
    const id = window.setInterval(() => {
      setLineIndex((i) => (i + 1) % LINE_KEYS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [mounted, prefersReduced]);

  const enter = (delay: number, y = 22) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  const devicesEnter = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, x: 28, y: 12 },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { duration: 0.9, delay: 0.3, ease },
      };

  const active = rotateLines[lineIndex] ?? rotateLines[0];

  return (
    <section className="relative isolate overflow-hidden bg-[#e8f3fc] text-white">
      <div aria-hidden className="absolute inset-0">
        {HERO_BGS.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              backgroundImage: `url('${src}')`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
              opacity: i === lineIndex % HERO_BGS.length ? 1 : 0,
              willChange: i === lineIndex % HERO_BGS.length ? "opacity" : "auto",
            }}
          />
        ))}
      </div>

      <div
        aria-hidden
        className="absolute inset-0 hidden bg-gradient-to-r from-[var(--ink-950)]/92 via-[var(--ink-950)]/70 to-[var(--ink-950)]/20 md:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--ink-950)]/88 via-[var(--ink-950)]/55 to-[var(--ink-950)]/35 md:hidden"
      />

      <div className="container-x relative grid min-h-[100svh] items-center gap-8 pb-16 pt-28 md:grid-cols-[1fr_minmax(280px,0.95fr)] md:gap-4 md:pb-24 md:pt-36 lg:gap-8">
        <div className="max-w-2xl">
          <motion.div
            {...enter(0.1)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 backdrop-blur-sm"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">
              {t("hero.badge")}
            </span>
          </motion.div>

          <h1
            className="relative mt-6 min-h-[1.15em] font-display text-[2.6rem] font-semibold leading-[1.08] sm:text-6xl lg:text-[4.4rem]"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${active.key}-${i18n.language}`}
                initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -24 }}
                transition={{ duration: 0.65, ease }}
                className="absolute inset-x-0 top-0 block"
              >
                {active.before}
                <span className="text-gradient">{active.accent}</span>
                {active.after}
              </motion.span>
            </AnimatePresence>
          </h1>

          <motion.p
            {...enter(0.3)}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {t("hero.body")}
          </motion.p>

          <motion.div {...enter(0.45)} className="mt-9 flex flex-wrap gap-3">
            <Link href="/trading/platform" className="btn-glass group">
              <Monitor size={16} />
              {t("hero.explorePlatform")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link href={SIGNUP_URL} className="btn-primary group">
              <Sparkles size={16} />
              {t("hero.tryDemoNow")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>

          <motion.ul
            {...enter(0.6)}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm text-white/65"
              >
                <Icon size={15} className="text-[var(--accent-soft)]" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div {...devicesEnter} className="relative z-10 w-full justify-self-end">
          <HeroLiveDevices />
        </motion.div>
      </div>
    </section>
  );
}
