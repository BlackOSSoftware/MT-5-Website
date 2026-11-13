"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  LayoutDashboard,
  PieChart,
  Radio,
  Users,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const STRATEGIES = [
  { name: "Nova Desk", rank: "#1", ret: "+24.5%", pnl: "$12.4k", win: "68%", hue: "47, 91, 255" },
  { name: "Aurora FX", rank: "#2", ret: "+18.2%", pnl: "$9.1k", win: "62%", hue: "18, 194, 233" },
  { name: "Summit Core", rank: "#3", ret: "+15.7%", pnl: "$7.6k", win: "59%", hue: "61, 123, 255" },
  { name: "Polar Edge", rank: "#4", ret: "+12.4%", pnl: "$5.2k", win: "57%", hue: "56, 189, 248" },
  { name: "Ledger Pro", rank: "#5", ret: "+10.8%", pnl: "$4.1k", win: "55%", hue: "129, 140, 248" },
  { name: "Harbor Quant", rank: "#6", ret: "+9.3%", pnl: "$3.4k", win: "54%", hue: "34, 211, 238" },
] as const;

const NAV = [
  { labelKey: "nav.accounts", icon: LayoutDashboard },
  { labelKey: "nav.funding", icon: Wallet },
  { labelKey: "nav.socialTrading", icon: Users, active: true },
  { labelKey: "nav.pamm", icon: PieChart },
  { labelKey: "social.f3Title", icon: Radio },
] as const;

function MiniChart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 36" className="h-7 w-full sm:h-9" aria-hidden>
      <path
        d="M0 28 C12 26, 18 20, 28 18 S48 22, 58 14 S78 6, 90 10 S108 16, 120 4"
        fill="none"
        stroke={`rgb(${color})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 28 C12 26, 18 20, 28 18 S48 22, 58 14 S78 6, 90 10 S108 16, 120 4 V36 H0 Z"
        fill={`rgba(${color}, 0.14)`}
      />
    </svg>
  );
}

export default function SocialShowcase() {
  const { t } = useTranslation();
  const features = [
    { title: t("social.f1Title"), body: t("social.f1Body") },
    { title: t("social.f2Title"), body: t("social.f2Body") },
    { title: t("social.f3Title"), body: t("social.f3Body") },
  ];

  return (
    <section className="ink-surface overflow-hidden">
      <div className="container-x py-16 sm:py-20 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Copy — first on mobile */}
          <div className="order-1 lg:order-2">
            <p className="eyebrow !text-[var(--accent-soft)]">{t("social.eyebrow")}</p>
            <h2 className="mt-3 font-display text-[1.65rem] font-semibold leading-[1.15] text-white sm:mt-4 sm:text-3xl md:text-4xl">
              {t("social.title")}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:mt-4 sm:text-base">
              {t("social.body")}
            </p>

            <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-7">
              {features.map((f, i) => (
                <li
                  key={f.title}
                  className={`relative pl-4 ${i === features.length - 1 ? "opacity-45" : ""}`}
                >
                  <span
                    className="absolute bottom-1 left-0 top-1 w-[3px] rounded-full bg-[var(--primary)] shadow-[0_0_12px_rgba(47,91,255,0.8)]"
                    aria-hidden
                  />
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{f.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <Link
                href="/trading/social-trading"
                className="btn-primary w-full justify-center sm:w-auto"
              >
                {t("social.ctaSocial")}
              </Link>
              <Link
                href="/trading/pamm"
                className="btn-glass w-full justify-center sm:w-auto"
              >
                {t("social.ctaPamm")} <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Dashboard mock */}
          <div className="relative order-2 min-w-0 lg:order-1">
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] opacity-60 blur-2xl sm:-inset-6 sm:opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, rgba(47,91,255,0.35), transparent 60%)",
              }}
              aria-hidden
            />
            <div className="overflow-hidden rounded-xl border border-[var(--primary)]/55 bg-[#070d1d] shadow-[0_0_0_1px_rgba(47,91,255,0.2),0_28px_80px_-28px_rgba(47,91,255,0.55)] sm:rounded-2xl">
              <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[128px_1fr] md:grid-cols-[148px_1fr]">
                {/* Sidebar */}
                <aside className="border-r border-white/8 bg-[#050914] p-1.5 sm:p-3">
                  <div className="mb-3 hidden items-center gap-2 px-1 sm:mb-4 sm:flex">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--primary)] text-[10px] font-bold text-white">
                      O
                    </span>
                    <span className="font-display text-xs font-semibold text-white">Oceana</span>
                  </div>
                  <nav className="flex flex-col items-center gap-1 sm:items-stretch sm:space-y-1 sm:gap-0">
                    {NAV.map((item) => {
                      const Icon = item.icon;
                      const active = "active" in item && item.active;
                      return (
                        <div
                          key={item.labelKey}
                          className={`flex items-center justify-center gap-2 rounded-lg px-1.5 py-2 text-[11px] font-medium sm:justify-start sm:px-2.5 ${
                            active
                              ? "bg-[var(--primary)]/15 text-[var(--accent-soft)]"
                              : "text-white/45"
                          }`}
                        >
                          <Icon size={14} className="shrink-0" />
                          <span className="hidden sm:inline">{t(item.labelKey)}</span>
                        </div>
                      );
                    })}
                  </nav>
                </aside>

                {/* Main */}
                <div className="min-w-0 p-2.5 sm:p-4">
                  <div className="mb-2.5 flex flex-col gap-2 sm:mb-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-display text-sm font-semibold text-white sm:text-base">
                        {t("social.panelTitle")}
                      </h3>
                      <p className="mt-0.5 line-clamp-1 text-[10px] text-white/45 sm:text-xs">
                        {t("social.panelDesc")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {[t("social.tabLeaderboard"), t("social.tabFollowers"), t("social.tabMasters")].map(
                        (label, i) => (
                          <span
                            key={label}
                            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold sm:px-2.5 sm:py-1 sm:text-[10px] ${
                              i === 0
                                ? "bg-[var(--primary)] text-white"
                                : "border border-white/10 bg-white/[0.04] text-white/55"
                            }`}
                          >
                            {label}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mb-2.5 hidden flex-wrap gap-1.5 sm:mb-3 sm:flex">
                    {[t("social.filterAll"), t("social.filterLow"), t("social.filterBalanced")].map(
                      (label, i) => (
                        <span
                          key={label}
                          className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                            i === 0 ? "bg-white/10 text-white" : "text-white/40"
                          }`}
                        >
                          {label}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 md:grid-cols-3">
                    {STRATEGIES.map((s, i) => (
                      <div
                        key={s.name}
                        className={`rounded-lg border border-white/8 bg-[#0c142b] p-2 sm:rounded-xl sm:p-2.5 ${
                          i >= 4 ? "hidden md:block" : ""
                        }`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span
                            className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white sm:h-7 sm:w-7 sm:text-[10px]"
                            style={{ background: `rgba(${s.hue}, 0.85)` }}
                          >
                            {s.name.slice(0, 1)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[10px] font-semibold text-white sm:text-[11px]">
                              {s.name}
                            </p>
                            <p className="text-[8px] text-white/40 sm:text-[9px]">
                              {s.rank} · Master
                            </p>
                          </div>
                        </div>
                        <div className="mt-1.5 sm:mt-2">
                          <MiniChart color={s.hue} />
                        </div>
                        <div className="mt-1 grid grid-cols-3 gap-0.5 text-center sm:mt-1.5 sm:gap-1">
                          <div>
                            <p className="text-[7px] uppercase tracking-wide text-white/35 sm:text-[8px]">
                              Return
                            </p>
                            <p className="text-[9px] font-semibold text-[var(--accent-soft)] sm:text-[10px]">
                              {s.ret}
                            </p>
                          </div>
                          <div>
                            <p className="text-[7px] uppercase tracking-wide text-white/35 sm:text-[8px]">
                              P&amp;L
                            </p>
                            <p className="text-[9px] font-semibold text-white/80 sm:text-[10px]">
                              {s.pnl}
                            </p>
                          </div>
                          <div>
                            <p className="text-[7px] uppercase tracking-wide text-white/35 sm:text-[8px]">
                              Win
                            </p>
                            <p className="text-[9px] font-semibold text-white/80 sm:text-[10px]">
                              {s.win}
                            </p>
                          </div>
                        </div>
                        <div className="mt-1.5 flex gap-1 sm:mt-2 sm:gap-1.5">
                          <span className="flex-1 rounded-md border border-white/10 py-1 text-center text-[8px] font-medium text-white/55 sm:text-[9px]">
                            {t("social.details")}
                          </span>
                          <span className="flex-1 rounded-md bg-[var(--primary)] py-1 text-center text-[8px] font-semibold text-white shadow-[0_6px_14px_-8px_rgba(47,91,255,0.9)] sm:text-[9px]">
                            {t("social.follow")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
