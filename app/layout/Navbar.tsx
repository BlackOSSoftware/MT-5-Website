"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Bitcoin,
  Building2,
  CalendarDays,
  CandlestickChart,
  ChevronDown,
  Clock3,
  Coins,
  DollarSign,
  Gem,
  Handshake,
  Home,
  LineChart,
  LogIn,
  Mail,
  Menu,
  Monitor,
  Moon,
  PieChart,
  ScrollText,
  Smartphone,
  Sun,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_URL } from "../components/ui/CtaBand";
import { setAppLocale, type AppLocale } from "../lib/i18n/I18nProvider";

type NavChild = { labelKey: string; descKey?: string; href: string; icon: LucideIcon };
type NavItem = { labelKey: string; href?: string; icon: LucideIcon; children?: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { labelKey: "home", href: "/", icon: Home },
  {
    labelKey: "markets",
    icon: TrendingUp,
    children: [
      { labelKey: "forex", descKey: "forexDesc", href: "/markets/forex", icon: DollarSign },
      { labelKey: "crypto", descKey: "cryptoDesc", href: "/markets/crypto", icon: Bitcoin },
      { labelKey: "indices", descKey: "indicesDesc", href: "/markets/indices", icon: LineChart },
      { labelKey: "metals", descKey: "metalsDesc", href: "/markets/metal", icon: Gem },
    ],
  },
  {
    labelKey: "trading",
    icon: CandlestickChart,
    children: [
      { labelKey: "mobileApp", descKey: "mobileAppDesc", href: "/trading/mobile-app", icon: Smartphone },
      { labelKey: "webPlatform", descKey: "webPlatformDesc", href: "/trading/platform", icon: Monitor },
      { labelKey: "socialTrading", descKey: "socialTradingDesc", href: "/trading/social-trading", icon: Users },
      { labelKey: "pamm", descKey: "pammDesc", href: "/trading/pamm", icon: PieChart },
      { labelKey: "accounts", descKey: "accountsDesc", href: "/trading/account", icon: Wallet },
      { labelKey: "conditions", descKey: "conditionsDesc", href: "/trading/condition", icon: ScrollText },
      { labelKey: "marketHours", descKey: "marketHoursDesc", href: "/trading/market-time", icon: Clock3 },
      { labelKey: "funding", descKey: "fundingDesc", href: "/trading/deposit-withdrawal", icon: Coins },
      { labelKey: "economicCalendar", descKey: "economicCalendarDesc", href: "/economic-calendar", icon: CalendarDays },
    ],
  },
  {
    labelKey: "company",
    icon: Building2,
    children: [
      { labelKey: "about", descKey: "aboutDesc", href: "/about", icon: Building2 },
      { labelKey: "whyOceana", descKey: "whyOceanaDesc", href: "/why-choose-us", icon: Award },
      { labelKey: "reviews", descKey: "reviewsDesc", href: "/reviews", icon: BadgeCheck },
    ],
  },
  { labelKey: "partner", href: "/become-a-partner", icon: Handshake },
  { labelKey: "contact", href: "/contact", icon: Mail },
];

function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const locale = (i18n.language?.startsWith("ar") ? "ar" : "en") as AppLocale;

  return (
    <div
      className="inline-flex shrink-0 items-center rounded-full border border-white/15 p-0.5"
      role="group"
      aria-label={t("common.language")}
    >
      {(["en", "ar"] as AppLocale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setAppLocale(code)}
          className={`rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide transition sm:text-[11px] ${
            locale === code
              ? "bg-[var(--primary)] text-white"
              : "text-white/60 hover:text-white"
          }`}
          aria-pressed={locale === code}
        >
          {code === "en" ? "EN" : "AR"}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [desktopGroup, setDesktopGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setDesktopGroup(null);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  const openGroup = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setDesktopGroup(key);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setDesktopGroup(null), 120);
  };

  const isActive = (item: NavItem) =>
    item.href ? pathname === item.href : Boolean(item.children?.some((c) => pathname === c.href));

  const navLabel = (key: string) => t(`nav.${key}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[rgba(5,9,20,0.82)] shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-b border-transparent bg-[rgba(5,9,20,0.35)] backdrop-blur-md"
      }`}
    >
      <div className="container-x grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-4">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center rounded-xl bg-white px-2.5 py-1.5 shadow-sm sm:px-3"
          aria-label="Oceana home"
        >
          <Image
            src="/logo-wave.png"
            alt="Oceana"
            width={2172}
            height={724}
            className="h-9 w-auto object-contain sm:h-10"
            priority
          />
        </Link>

        <nav
          className="hidden min-w-0 items-center justify-center gap-0.5 lg:flex xl:gap-1"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const ItemIcon = item.icon;
            const itemLabel = navLabel(item.labelKey);
            const linkCls = `relative inline-flex max-w-full items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[12.5px] font-medium transition-colors xl:gap-1.5 xl:px-3 xl:text-sm ${
              active || desktopGroup === item.labelKey
                ? "text-white"
                : "text-white/65 hover:text-white"
            }`;

            if (!item.children) {
              return (
                <Link key={item.labelKey} href={item.href!} className={linkCls}>
                  <ItemIcon size={14} className="hidden shrink-0 opacity-80 xl:inline" />
                  <span className="truncate">{itemLabel}</span>
                  {active ? (
                    <span
                      className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full"
                      style={{ background: "var(--brand-gradient)" }}
                    />
                  ) : null}
                </Link>
              );
            }

            const open = desktopGroup === item.labelKey;
            return (
              <div
                key={item.labelKey}
                className="relative"
                onMouseEnter={() => openGroup(item.labelKey)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setDesktopGroup(open ? null : item.labelKey)}
                  className={linkCls}
                >
                  <ItemIcon size={14} className="hidden shrink-0 opacity-80 xl:inline" />
                  <span className="truncate">{itemLabel}</span>
                  <ChevronDown
                    size={13}
                    className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                  {active ? (
                    <span
                      className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full"
                      style={{ background: "var(--brand-gradient)" }}
                    />
                  ) : null}
                </button>

                <AnimatePresence>
                  {open ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    >
                      <div
                        className={`grid gap-1 rounded-xl border border-white/10 bg-[rgba(9,15,32,0.96)] p-2 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl ${
                          item.children.length > 4 ? "w-[min(560px,90vw)] grid-cols-2" : "w-[280px]"
                        }`}
                      >
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          const here = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`group flex items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                                here ? "bg-white/[0.07]" : "hover:bg-white/[0.06]"
                              }`}
                            >
                              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-[var(--accent-soft)]">
                                <Icon size={16} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-white">
                                  {navLabel(child.labelKey)}
                                </span>
                                {child.descKey ? (
                                  <span className="mt-0.5 block text-xs leading-snug text-white/50">
                                    {navLabel(child.descKey)}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/35 hover:text-white sm:h-10 sm:w-10"
            aria-label="Toggle color theme"
          >
            <Sun size={16} className="theme-icon-sun" />
            <Moon size={16} className="theme-icon-moon" />
          </button>
          <Link
            href={LOGIN_URL}
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-white/75 transition hover:text-white xl:inline-flex"
          >
            <LogIn size={15} className="opacity-80" />
            {t("common.login")}
          </Link>
          <Link
            href="/open-account"
            className="btn-primary btn-sm hidden items-center gap-1.5 whitespace-nowrap xl:inline-flex"
          >
            <UserPlus size={15} />
            {t("common.openAccount")}
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white sm:h-10 sm:w-10 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-72px)] bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 right-0 top-full z-50 flex h-[calc(100dvh-72px)] w-full max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-[var(--ink-900)] px-4 pb-8 pt-4 lg:hidden"
            >
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const ItemIcon = item.icon;
                  const itemLabel = navLabel(item.labelKey);
                  if (!item.children) {
                    return (
                      <Link
                        key={item.labelKey}
                        href={item.href!}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium ${
                          pathname === item.href ? "bg-white/[0.07] text-white" : "text-white/80 hover:bg-white/[0.05]"
                        }`}
                      >
                        <ItemIcon size={17} className="text-[var(--accent-soft)]" />
                        {itemLabel}
                      </Link>
                    );
                  }
                  const open = mobileGroup === item.labelKey;
                  return (
                    <div key={item.labelKey} className="rounded-xl">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-white/85 hover:bg-white/[0.05]"
                        onClick={() => setMobileGroup(open ? null : item.labelKey)}
                        aria-expanded={open}
                      >
                        <span className="inline-flex items-center gap-3">
                          <ItemIcon size={17} className="text-[var(--accent-soft)]" />
                          {itemLabel}
                        </span>
                        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-0.5 pb-2 pl-2">
                              {item.children.map((child) => {
                                const Icon = child.icon;
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                                      pathname === child.href ? "bg-white/[0.07] text-white" : "text-white/65 hover:text-white"
                                    }`}
                                  >
                                    <Icon size={15} className="text-[var(--accent-soft)]" />
                                    {navLabel(child.labelKey)}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto grid gap-2 pt-8">
                <Link href="/open-account" className="btn-primary inline-flex w-full items-center justify-center gap-2">
                  <UserPlus size={16} />
                  {t("common.openAccount")}
                </Link>
                <Link href={LOGIN_URL} className="btn-glass inline-flex w-full items-center justify-center gap-2">
                  <LogIn size={16} />
                  {t("common.login")}
                </Link>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
