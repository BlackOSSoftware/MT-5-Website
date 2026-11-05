import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export const SIGNUP_URL = "https://user.oceanaprofx.com/signup";
export const LOGIN_URL = "https://user.oceanaprofx.com/login";

/** Closing call-to-action used at the bottom of every marketing page. */
export default function CtaBand({
  title = "Ready when the market is.",
  description = "Open a live account in minutes and trade forex, crypto, indexes, and metals from one balance.",
  primary = { label: "Open account", href: SIGNUP_URL },
  secondary = { label: "Talk to us", href: "/contact" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const external = (href: string) => href.startsWith("http");
  return (
    <section className="bg-[var(--background)] pb-20 md:pb-28">
      <div className="container-x">
        <Reveal className="ink-surface overflow-hidden rounded-[28px] px-6 py-14 sm:px-12 md:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-3 text-white/65">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={primary.href}
                target={external(primary.href) ? "_blank" : undefined}
                rel={external(primary.href) ? "noopener noreferrer" : undefined}
                className="btn-primary group"
              >
                {primary.label}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={secondary.href}
                target={external(secondary.href) ? "_blank" : undefined}
                rel={external(secondary.href) ? "noopener noreferrer" : undefined}
                className="btn-glass"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
