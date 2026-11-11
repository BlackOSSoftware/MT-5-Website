import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

const columns = [
  {
    title: "Markets",
    links: [
      { label: "Forex", href: "/markets/forex" },
      { label: "Crypto", href: "/markets/crypto" },
      { label: "indices", href: "/markets/indices" },
      { label: "Metals", href: "/markets/metal" },
    ],
  },
  {
    title: "Trading",
    links: [
      { label: "Accounts", href: "/trading/account" },
      { label: "Platform", href: "/trading/platform" },
      { label: "Conditions", href: "/trading/condition" },
      { label: "Market hours", href: "/trading/market-time" },
      { label: "Funding", href: "/trading/deposit-withdrawal" },
      { label: "Economic calendar", href: "/economic-calendar" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why Oceana", href: "/why-choose-us" },
      { label: "Reviews", href: "/reviews" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="ink-surface border-t border-white/10">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div className="space-y-5">
          <Link href="/" className="inline-flex items-center rounded-xl bg-white px-3 py-1.5" aria-label="Oceana home">
            <Image src="/oceana-logo.png" alt="Oceana" width={2172} height={724} className="h-8 w-auto object-contain" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Multi-asset trading for people who want clear pricing and a quieter path from idea to order.
          </p>
          <a
            href="mailto:info@oceanaprofx.com"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
          >
            <Mail size={15} className="text-[var(--accent-soft)]" />
            info@oceanaprofx.com
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>Â© {new Date().getFullYear()} Oceana. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Trading leveraged products involves significant risk. Capital is at risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
