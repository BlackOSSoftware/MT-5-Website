"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Markets",
    children: [
      { label: "Forex", href: "/markets/forex" },
      { label: "Crypto", href: "/markets/crypto" },
      { label: "Indexes", href: "/markets/indexes" },
      { label: "Metals", href: "/markets/metal" },
    ],
  },
  {
    label: "Trading",
    children: [
      { label: "Accounts", href: "/trading/account" },
      { label: "Platform", href: "/trading/platform" },
      { label: "Conditions", href: "/trading/condition" },
      { label: "Market hours", href: "/trading/market-time" },
      { label: "Funding", href: "/trading/deposit-withdrawal" },
      { label: "Economic calendar", href: "/economic-calendar" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About", href: "/about" },
      { label: "Why oceanaprofx", href: "/why-choose-us" },
      { label: "Reviews", href: "/reviews" },
      { label: "Regulation", href: "/regulation" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const [desktopOpenGroup, setDesktopOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDesktopOpenGroup(null);
  }, [pathname]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  const isChildActive = (children: NavChild[]) =>
    children.some((child) => pathname === child.href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[color-mix(in_srgb,var(--background)_90%,transparent)] backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="oceanaprofx"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded object-cover"
            priority
          />
          <span className="font-display truncate text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">
            oceanaprofx
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            if (!item.children) {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={[
                    "rounded px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-[var(--primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            }

            const activeGroup = isChildActive(item.children);
            const open = desktopOpenGroup === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDesktopOpenGroup(item.label)}
                onMouseLeave={() => setDesktopOpenGroup(null)}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  className={[
                    "inline-flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors",
                    activeGroup
                      ? "text-[var(--primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open ? (
                  <div className="absolute left-0 top-full min-w-[210px] pt-2">
                    <div className="rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] py-1.5 shadow-[0_16px_40px_-24px_var(--shadow-color)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--foreground)]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--card-border)] text-[var(--foreground)] hover:bg-[var(--hover-bg)]"
            aria-label="Toggle color theme"
          >
            <Sun size={16} className="theme-icon-sun" />
            <Moon size={16} className="theme-icon-moon" />
          </button>
          <Link
            href="https://user.oceanaprofx.com/login"
            className="hidden text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] sm:inline"
          >
            Log in
          </Link>
          <Link href="https://user.oceanaprofx.com/signup" className="btn-primary !py-2.5">
            Open account
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--card-border)] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden border-t border-[var(--card-border)] bg-[var(--card-bg)] transition-all lg:hidden",
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 border-t-0 opacity-0",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-6xl space-y-0.5 px-4 py-3" aria-label="Mobile">
          {NAV_ITEMS.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--hover-bg)]"
                >
                  {item.label}
                </Link>
              );
            }

            const open = mobileOpenGroup === item.label;
            return (
              <div key={item.label}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium"
                  onClick={() => setMobileOpenGroup(open ? null : item.label)}
                  aria-expanded={open}
                >
                  {item.label}
                  <ChevronDown size={14} className={open ? "rotate-180" : ""} />
                </button>
                {open
                  ? item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-md px-6 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--foreground)]"
                      >
                        {child.label}
                      </Link>
                    ))
                  : null}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
