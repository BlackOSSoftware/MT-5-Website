"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Award,
  BadgeCheck,
  Bitcoin,
  Building2,
  CalendarDays,
  Clock3,
  Coins,
  DollarSign,
  Gem,
  Handshake,
  LineChart,
  Mail,
  Monitor,
  PieChart,
  ScrollText,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const columns: {
  titleKey: "markets" | "trading" | "company";
  icon: LucideIcon;
  links: { labelKey: string; href: string; icon: LucideIcon }[];
}[] = [
  {
    titleKey: "markets",
    icon: TrendingUp,
    links: [
      { labelKey: "forex", href: "/markets/forex", icon: DollarSign },
      { labelKey: "crypto", href: "/markets/crypto", icon: Bitcoin },
      { labelKey: "indices", href: "/markets/indices", icon: LineChart },
      { labelKey: "metals", href: "/markets/metal", icon: Gem },
    ],
  },
  {
    titleKey: "trading",
    icon: Monitor,
    links: [
      { labelKey: "mobileApp", href: "/trading/mobile-app", icon: Smartphone },
      { labelKey: "webPlatform", href: "/trading/platform", icon: Monitor },
      { labelKey: "socialTrading", href: "/trading/social-trading", icon: Users },
      { labelKey: "pamm", href: "/trading/pamm", icon: PieChart },
      { labelKey: "accounts", href: "/trading/account", icon: Wallet },
      { labelKey: "conditions", href: "/trading/condition", icon: ScrollText },
      { labelKey: "marketHours", href: "/trading/market-time", icon: Clock3 },
      { labelKey: "funding", href: "/trading/deposit-withdrawal", icon: Coins },
      { labelKey: "economicCalendar", href: "/economic-calendar", icon: CalendarDays },
    ],
  },
  {
    titleKey: "company",
    icon: Building2,
    links: [
      { labelKey: "about", href: "/about", icon: Building2 },
      { labelKey: "whyOceana", href: "/why-choose-us", icon: Award },
      { labelKey: "reviews", href: "/reviews", icon: BadgeCheck },
      { labelKey: "partner", href: "/partners", icon: Handshake },
      { labelKey: "contact", href: "/contact", icon: Mail },
    ],
  },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="ink-surface border-t border-white/10">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div className="space-y-5">
          <Link href="/" className="inline-flex items-center rounded-xl bg-white px-3 py-1.5" aria-label="Oceana home">
            <Image src="/logo-wave.png" alt="Oceana" width={2172} height={724} className="h-10 w-auto object-contain" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">{t("footer.tagline")}</p>
          <a
            href="mailto:info@oceanaprofx.com"
            className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
          >
            <Mail size={15} className="text-[var(--accent-soft)]" />
            info@oceanaprofx.com
          </a>
        </div>

        {columns.map((col) => {
          const ColIcon = col.icon;
          return (
            <div key={col.titleKey}>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                <ColIcon size={13} className="text-[var(--accent-soft)]" />
                {t(`footer.${col.titleKey}`)}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2.5 text-sm text-white/65 transition hover:text-white"
                      >
                        <Icon size={14} className="shrink-0 text-white/35" />
                        {t(`nav.${link.labelKey}`)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>{t("footer.rights", { year })}</p>
          <p className="max-w-xl md:text-right">{t("footer.risk")}</p>
        </div>
      </div>
    </footer>
  );
}
