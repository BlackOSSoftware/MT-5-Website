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
  ChevronDown,
  Clock3,
  Coins,
  DollarSign,
  Gem,
  LineChart,
  Menu,
  Monitor,
  Moon,
  ScrollText,
  Sun,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LOGIN_URL, SIGNUP_URL } from "../components/ui/CtaBand";

type NavChild = { label: string; href: string; description: string; icon: LucideIcon };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Markets",
    children: [
      { label: "Forex", href: "/markets/forex", description: "Majors, minors and crosses, 24/5", icon: DollarSign },
      { label: "Crypto", href: "/markets/crypto", description: "Digital pairs around the clock", icon: Bitcoin },
      { label: "Indexes", href: "/markets/indexes", description: "Benchmark exposure and hedges", icon: LineChart },
      { label: "Metals", href: "/markets/metal", description: "Gold, silver and hard assets", icon: Gem },
    ],
  },
  {
    label: "Trading",
    children: [
      { label: "Accounts", href: "/trading/account", description: "Core, Prime and Elite tiers", icon: Wallet },
      { label: "Platform", href: "/trading/platform", description: "Web and mobile workspace", icon: Monitor },
      { label: "Conditions", href: "/trading/condition", description: "Pricing posture and access", icon: ScrollText },
      { label: "Market hours", href: "/trading/market-time", description: "Sessions mapped to markets", icon: Clock3 },
      { label: "Funding", href: "/trading/deposit-withdrawal", description: "Deposits and withdrawals", icon: Coins },
      { label: "Economic calendar", href: "/economic-calendar", description: "Macro releases and forecasts", icon: CalendarDays },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About", href: "/about", description: "Who we are and how we work", icon: Building2 },
      { label: "Why Oceana", href: "/why-choose-us", description: "What we optimize for", icon: Award },
      { label: "Reviews", href: "/reviews", description: "Real feedback, no invented quotes", icon: BadgeCheck },
      { label: "Regulation", href: "/regulation", description: "Verification and governance", icon: ScrollText },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
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

  // Close menus on navigation.
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

  const openGroup = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setDesktopGroup(label);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setDesktopGroup(null), 120);
  };

  const isActive = (item: NavItem) =>
    item.href ? pathname === item.href : Boolean(item.children?.some((c) => pathname === c.href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[rgba(5,9,20,0.82)] shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-b border-transparent bg-[rgba(5,9,20,0.35)] backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center rounded-xl bg-white px-3 py-1.5 shadow-sm" aria-label="Oceana home">
          <Image
            src="/oceana-logo.png"
            alt="Oceana"
            width={2172}
            height={724}
            className="h-7 w-auto object-contain sm:h-8"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full"
                      style={{ background: "var(--brand-gradient)" }}
                    />
                  ) : null}
                </Link>
              );
            }

            const open = desktopGroup === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openGroup(item.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setDesktopGroup(open ? null : item.label)}
                  className={`relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active || open ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                  {active ? (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full"
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
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                    >
                      <div
                        className={`grid gap-1 rounded-2xl border border-white/10 bg-[rgba(9,15,32,0.96)] p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl ${
                          item.children.length > 4 ? "w-[560px] grid-cols-2" : "w-[300px]"
                        }`}
                      >
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          const here = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`group flex items-start gap-3 rounded-xl p-3 transition-colors ${
                                here ? "bg-white/[0.07]" : "hover:bg-white/[0.06]"
                              }`}
                            >
                              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-[var(--accent-soft)] transition-colors group-hover:border-[var(--accent)]/40">
                                <Icon size={16} />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-white">{child.label}</span>
                                <span className="block text-xs leading-snug text-white/50">{child.description}</span>
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/35 hover:text-white"
            aria-label="Toggle color theme"
          >
            <Sun size={16} className="theme-icon-sun" />
            <Moon size={16} className="theme-icon-moon" />
          </button>
          <Link
            href={LOGIN_URL}
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-white/75 transition hover:text-white sm:inline-flex"
          >
            Log in
          </Link>
          <Link href={SIGNUP_URL} className="btn-primary btn-sm hidden sm:inline-flex">
            Open account
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
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
                  if (!item.children) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href!}
                        className={`block rounded-xl px-4 py-3 text-[15px] font-medium ${
                          pathname === item.href ? "bg-white/[0.07] text-white" : "text-white/80 hover:bg-white/[0.05]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  const open = mobileGroup === item.label;
                  return (
                    <div key={item.label} className="rounded-xl">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-white/85 hover:bg-white/[0.05]"
                        onClick={() => setMobileGroup(open ? null : item.label)}
                        aria-expanded={open}
                      >
                        {item.label}
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
                                    {child.label}
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
                <Link href={SIGNUP_URL} className="btn-primary w-full">
                  Open account
                </Link>
                <Link href={LOGIN_URL} className="btn-glass w-full">
                  Log in
                </Link>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
