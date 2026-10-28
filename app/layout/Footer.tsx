import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Markets",
    links: [
      { label: "Forex", href: "/markets/forex" },
      { label: "Crypto", href: "/markets/crypto" },
      { label: "Indexes", href: "/markets/indexes" },
      { label: "Metals", href: "/markets/metal" },
    ],
  },
  {
    title: "Trading",
    links: [
      { label: "Accounts", href: "/trading/account" },
      { label: "Platform", href: "/trading/platform" },
      { label: "Conditions", href: "/trading/condition" },
      { label: "Funding", href: "/trading/deposit-withdrawal" },
      { label: "Calendar", href: "/economic-calendar" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why us", href: "/why-choose-us" },
      { label: "Reviews", href: "/reviews" },
      { label: "Regulation", href: "/regulation" },
      { label: "Contact", href: "/contact" },
      { label: "Partners", href: "/partners" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b1220] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-6 md:py-16">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="oceanaprofx"
              width={36}
              height={36}
              className="h-9 w-9 rounded object-cover"
            />
            <span className="font-display text-xl font-bold tracking-tight">
              oceanaprofx
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/65">
            Multi-asset trading for people who want clear pricing and a quieter
            path from idea to order.
          </p>
          <a
            href="mailto:support@oceanaprofx.com"
            className="inline-block text-sm font-medium text-white/80 hover:text-white"
          >
            support@oceanaprofx.com
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} oceanaprofx. All rights reserved.</p>
          <p>Trading involves risk. Capital is at risk.</p>
        </div>
      </div>
    </footer>
  );
}
