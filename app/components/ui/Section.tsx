import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Tone = "plain" | "deep" | "ink";

const TONE: Record<Tone, string> = {
  plain: "bg-[var(--background)]",
  deep: "bg-[var(--background-deep)]",
  ink: "ink-surface",
};

/** Consistent vertical rhythm + background tone for every content band. */
export function Section({
  children,
  tone = "plain",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${TONE[tone]} ${className}`}>
      <div className="container-x py-20 md:py-28">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        centered ? "items-center text-center md:flex-col md:items-center" : ""
      }`}
    >
      <div className={centered ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <p className={`eyebrow ${dark ? "!text-[var(--accent-soft)]" : ""}`}>{eyebrow}</p>
        ) : null}
        <h2
          className={`mt-4 font-display text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-[2.75rem] ${
            dark ? "text-white" : "text-[var(--foreground)]"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-4 text-base leading-relaxed md:text-lg ${
              dark ? "text-white/65" : "text-[var(--text-muted)]"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
