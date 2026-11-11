"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MonitorSmartphone, ShieldCheck, Wallet } from "lucide-react";
import { SIGNUP_URL } from "../ui/CtaBand";

const ease = [0.22, 1, 0.36, 1] as const;

const trustItems = [
  { icon: ShieldCheck, label: "Bank-grade security" },
  { icon: MonitorSmartphone, label: "Web & Android" },
  { icon: Wallet, label: "Transparent pricing" },
] as const;

export default function HeroSection() {
  const reduce = useReducedMotion();

  const enter = (delay: number, y = 22) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease },
        };

  const bgEnter = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 1.04 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.4, delay: 0.1, ease },
      };

  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink-950)] text-white">
      {/* Prioritize the hero art for the current viewport. */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-devices.webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-mobile.webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />

      {/* Desktop / tablet hero art — full-bleed background */}
      <motion.div
        aria-hidden
        {...bgEnter}
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: "url('/images/hero-devices.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 32%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Mobile hero art — portrait composition, full-bleed background */}
      <motion.div
        aria-hidden
        {...bgEnter}
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: "url('/images/hero-mobile.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Ambient blue / cyan glow — static, no motion */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(47,91,255,0.22),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(18,194,233,0.14),transparent_65%)] blur-3xl"
      />

      {/* Readability scrims — keep copy legible, devices visible */}
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-gradient-to-r from-[var(--ink-950)]/80 via-[var(--ink-950)]/50 to-[var(--ink-950)]/20 md:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--ink-950)]/65 via-[var(--ink-950)]/30 to-[var(--ink-950)]/85 md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--ink-950)] to-transparent"
      />

      <div className="container-x relative flex min-h-[100svh] items-center pb-16 pt-28 md:pb-24 md:pt-40">
        {/* LEFT — copy */}
        <div className="max-w-2xl">
          <motion.div
            {...enter(0, 0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">
              Next-Generation Trading Platform
            </span>
          </motion.div>

          <motion.h1
            {...enter(0.08)}
            className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl lg:text-[4.4rem]"
          >
            Trade <span className="text-gradient">Smarter</span>.
            <br />
            Manage <span className="text-gradient">Better</span>.
          </motion.h1>

          <motion.p
            {...enter(0.16)}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            One premium workspace for forex, crypto, Indices, and metals — live
            charts, fast execution, and risk tools that keep every decision
            visible from open to close.
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/trading/platform"
              className="btn-glass group"
            >
              Explore Platform
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              Get Started
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>

          <motion.ul {...enter(0.32)} className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
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
      </div>
    </section>
  );
}
