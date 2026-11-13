"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

export const SIGNUP_URL = "https://user.oceanaprofx.com/signup";
export const LOGIN_URL = "https://user.oceanaprofx.com/login";

/** Closing call-to-action used at the bottom of every marketing page. */
export default function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t("cta.title");
  const resolvedDescription = description ?? t("cta.description");
  const resolvedPrimary = primary ?? { label: t("cta.primary"), href: SIGNUP_URL };
  const resolvedSecondary = secondary ?? { label: t("cta.secondary"), href: "/contact" };
  const external = (href: string) => href.startsWith("http");

  return (
    <section className="bg-[var(--background)] pb-20 md:pb-28">
      <div className="container-x">
        <Reveal className="ink-surface overflow-hidden rounded-2xl px-6 py-14 sm:px-12 md:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {resolvedTitle}
              </h2>
              <p className="mt-3 text-white/65">{resolvedDescription}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={resolvedPrimary.href}
                target={external(resolvedPrimary.href) ? "_blank" : undefined}
                rel={external(resolvedPrimary.href) ? "noopener noreferrer" : undefined}
                className="btn-primary group"
              >
                {resolvedPrimary.label}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={resolvedSecondary.href}
                target={external(resolvedSecondary.href) ? "_blank" : undefined}
                rel={external(resolvedSecondary.href) ? "noopener noreferrer" : undefined}
                className="btn-glass"
              >
                {resolvedSecondary.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
