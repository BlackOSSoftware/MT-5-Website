import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass, LineChart } from "lucide-react";

export const metadata = {
  title: "Page not found | oceanaprofx",
  description: "The page you are looking for does not exist. Head back home or explore oceanaprofx markets.",
};

export default function NotFound() {
  return (
    <main className="ink-surface">
      <div className="container-x flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-6 py-20 text-center">
        {/* Decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,91,255,0.28),transparent_65%)] blur-3xl"
        />

        <p className="eyebrow !text-[var(--accent-soft)]">Error 404</p>

        <h1 className="mt-6 font-display text-[5rem] font-semibold leading-none tracking-tight text-white sm:text-[8rem] lg:text-[10rem]">
          <span className="text-gradient">4</span>0<span className="text-gradient">4</span>
        </h1>

        <h2 className="mt-6 font-display text-2xl font-semibold text-white sm:text-3xl">
          This page slipped through the spread.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
          The link may be outdated or the page may have moved. Head back home
          or jump straight into the markets.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <Link href="/markets/forex" className="btn-glass group">
            <LineChart size={16} />
            Explore Markets
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link href="/contact" className="btn-glass group">
            <Compass size={16} />
            Contact Support
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/45">
          <Link href="/about" className="transition-colors hover:text-white">About</Link>
          <Link href="/trading/platform" className="transition-colors hover:text-white">Platform</Link>
          <Link href="/trading/account" className="transition-colors hover:text-white">Accounts</Link>
          <Link href="/become-a-partner" className="transition-colors hover:text-white">Become a Partner</Link>
        </div>
      </div>
    </main>
  );
}
