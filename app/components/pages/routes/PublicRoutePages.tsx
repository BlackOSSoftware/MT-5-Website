"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CandlestickChart,
  Check,
  Clock3,
  Compass,
  Gauge,
  Globe2,
  Headphones,
  Layers,
  Mail,
  MessageSquareText,
  MonitorSmartphone,
  Receipt,
  Scale,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useCreateInquiry } from "../../../hooks/useCreateInquiry";
import PageHero from "../../ui/PageHero";
import Reveal from "../../ui/Reveal";
import { Section, SectionHeader } from "../../ui/Section";
import CtaBand, { LOGIN_URL, SIGNUP_URL } from "../../ui/CtaBand";

type IconCard = { icon: LucideIcon; title: string; body: string };

function IconCardGrid({ items, cols = 3 }: { items: IconCard[]; cols?: 2 | 3 | 4 }) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={`mt-12 grid gap-5 ${grid}`}>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.title} delay={i * 0.07}>
            <article className="card card-hover h-full p-6 sm:p-7">
              <span className="icon-tile">
                <Icon size={20} />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="grid gap-4">
      {items.map((item, i) => (
        <Reveal as="li" key={item} from="left" delay={i * 0.06} className="flex items-start gap-3">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-white">
            <Check size={12} strokeWidth={3} />
          </span>
          <span className={`leading-relaxed ${dark ? "text-white/75" : "text-[var(--text-muted)]"}`}>{item}</span>
        </Reveal>
      ))}
    </ul>
  );
}

function NumberedSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, idx) => (
        <Reveal as="li" key={step} delay={idx * 0.07}>
          <div className="card h-full p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--primary)] font-display text-sm font-semibold text-white">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 font-display font-semibold text-[var(--foreground)]">{step}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

function InfoTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <Reveal className="card mt-12 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="bg-[var(--background-deep)] text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {head.map((h) => (
                <th key={h} className="px-6 py-4 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-[var(--card-border)] transition-colors hover:bg-[var(--hover-bg)]">
                {row.map((cell, i) => (
                  <td
                    key={cell}
                    className={`px-6 py-5 ${i === 0 ? "font-semibold text-[var(--foreground)]" : "text-[var(--text-muted)]"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function SplitPanel({ children, aside }: { children: ReactNode; aside: ReactNode }) {
  return (
    <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
      <div>{children}</div>
      <Reveal from="right">{aside}</Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function TradingAccountPageView() {
  const plans = [
    { name: "Core", pricing: "Standard pricing", lev: "Up to 1:200", focus: "Balanced entry for new and steady strategies" },
    { name: "Prime", pricing: "Active pricing", lev: "Up to 1:300", focus: "Higher activity and tighter workflow needs", featured: true },
    { name: "Elite", pricing: "Institutional pricing", lev: "Tailored", focus: "Custom structure for larger flow" },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Trading accounts"
        title="Account structures that match how you actually trade."
        description="Pick a tier aligned with your frequency, size, and risk posture â€” then fund and go live."
        ctas={[
          { label: "Try Demo Account", href: SIGNUP_URL, variant: "primary" },
          { label: "View conditions", href: "/trading/condition", variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="Plans" title="Choose the structure that fits your desk." align="center" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <article
                className={`relative flex h-full flex-col p-7 sm:p-8 ${
                  plan.featured ? "ink-surface rounded-[var(--radius-lg)] shadow-[0_30px_60px_-30px_rgba(47,91,255,0.6)]" : "card card-hover"
                }`}
              >
                {plan.featured ? (
                  <span
                    className="absolute right-6 top-6 rounded-full bg-[var(--primary)] px-3 py-1 text-[11px] font-semibold text-white"
                  >
                    Popular
                  </span>
                ) : null}
                <p className={`font-display text-3xl font-semibold ${plan.featured ? "text-white" : "text-[var(--foreground)]"}`}>
                  {plan.name}
                </p>
                <p className={`mt-3 text-sm ${plan.featured ? "text-white/65" : "text-[var(--text-muted)]"}`}>{plan.focus}</p>
                <dl className="mt-8 flex-1 space-y-0 text-sm">
                  {[
                    ["Pricing", plan.pricing],
                    ["Leverage", plan.lev],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className={`flex justify-between gap-4 border-t py-4 ${plan.featured ? "border-white/10" : "border-[var(--card-border)]"}`}
                    >
                      <dt className={plan.featured ? "text-white/55" : "text-[var(--text-muted)]"}>{k}</dt>
                      <dd className={`font-semibold ${plan.featured ? "text-white" : "text-[var(--foreground)]"}`}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 w-full ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  Open {plan.name}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep">
        <SectionHeader eyebrow="Activation" title="From registration to live in a clear sequence." />
        <NumberedSteps steps={["Register", "Verify identity", "Map risk profile", "Fund securely", "Trade live"]} />
      </Section>

      <CtaBand />
    </main>
  );
}

export function TradingPlatformPageView() {
  const tools: IconCard[] = [
    { icon: CandlestickChart, title: "Web trading", body: "Browser-based charts and tickets for focused desktop sessions." },
    { icon: Smartphone, title: "Mobile access", body: "Monitor positions and react when you are away from the desk." },
    { icon: SlidersHorizontal, title: "Account controls", body: "Funding, reporting, and access settings in one operational layer." },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Platform"
        title="A workspace that stays out of your way."
        description="Charts, tickets, balances, and funding stay aligned across web and mobile â€” so your attention stays on the market."
        ctas={[
          { label: "Try Demo Account", href: SIGNUP_URL, variant: "primary" },
          { label: "Launch portal", href: LOGIN_URL, variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="Tools" title="Everything you need, nothing you don't." />
        <IconCardGrid items={tools} />
      </Section>

      <Section tone="ink">
        <SplitPanel
          aside={
            <div className="glass-card p-7 sm:p-8">
              <CheckList
                dark
                items={[
                  "Live charts with order entry beside the chart",
                  "Market and pending orders with stop loss and take profit",
                  "Positions, pending orders, and history in one view",
                  "Switch between your trading accounts without signing out",
                ]}
              />
            </div>
          }
        >
          <SectionHeader
            dark
            eyebrow="One workspace"
            title="Desk and pocket, in sync."
            description="Open the trading terminal from the client portal on desktop, or download the Android app to manage the same account on the move."
          />
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <Link href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Launch portal
            </Link>
          </Reveal>
        </SplitPanel>
      </Section>

      <CtaBand />
    </main>
  );
}

export function TradingConditionPageView() {
  const rows = [
    ["Forex majors", "Session-aware pricing", "Low-latency routing"],
    ["Gold (XAU/USD)", "Depth-led pricing", "Extended hours"],
    ["US Indices", "Benchmark-aligned", "Cash session focus"],
    ["Core crypto", "Market-linked", "24/7 access"],
  ];

  return (
    <main>
      <PageHero
        eyebrow="Trading conditions"
        title="Know the rules of the book before you size up."
        description="Pricing posture, access windows, and risk controls â€” written for clarity, not brochure gloss."
        ctas={[
          { label: "Try Demo Account", href: SIGNUP_URL, variant: "primary" },
          { label: "Contact desk", href: "/contact", variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="Instrument overview" title="Pricing and execution by market." />
        <InfoTable head={["Market", "Pricing", "Execution"]} rows={rows} />
      </Section>

      <Section tone="deep">
        <SplitPanel
          aside={
            <div className="card p-7 sm:p-8">
              <CheckList
                items={[
                  "Configurable stop and limit placement beside the ticket",
                  "Clear margin visibility before you commit size",
                  "Session-aware instrument availability",
                  "Support path for account-critical questions",
                ]}
              />
            </div>
          }
        >
          <SectionHeader
            eyebrow="Risk posture"
            title="Controls that stay visible."
            description="Risk tools sit where decisions are made, so exposure is always a deliberate choice."
          />
        </SplitPanel>
      </Section>

      <CtaBand />
    </main>
  );
}

export function TradingMarketTimePageView() {
  const sessions = [
    { name: "Asia", window: "Tokyo-led hours", focus: "JPY crosses, regional risk" },
    { name: "London", window: "European cash open", focus: "EUR, GBP, metals liquidity" },
    { name: "New York", window: "US cash + overlap", focus: "USD majors, Indices" },
    { name: "Crypto", window: "Continuous", focus: "Digital pairs around the clock" },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Market hours"
        title="Trade when your market is awake."
        description="Map sessions to your strategy â€” from Tokyo open through the New York close, plus continuous crypto."
        ctas={[
          { label: "Economic calendar", href: "/economic-calendar", variant: "primary" },
          { label: "Try Demo Account", href: SIGNUP_URL, variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="Sessions" title="The trading day, session by session." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sessions.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.07}>
              <article className="card card-hover h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="icon-tile">
                    <Clock3 size={20} />
                  </span>
                  <span className="font-display text-xs font-semibold text-[var(--text-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-[var(--foreground)]">{s.name}</h3>
                <p className="mt-2 text-sm font-medium text-[var(--primary)]">{s.window}</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{s.focus}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 rounded-[var(--radius)] border border-dashed border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-4 text-sm text-[var(--text-muted)]">
          Exact instrument hours can vary by symbol. Confirm availability on the platform before planning entries.
        </Reveal>
      </Section>

      <CtaBand />
    </main>
  );
}

export function TradingDepositWithdrawalPageView() {
  const blocks = [
    {
      icon: Wallet,
      title: "Deposits",
      items: [
        "Supported methods shown in your portal after verification",
        "Status updates while funds are processing",
        "Balance reflection once the deposit clears",
      ],
    },
    {
      icon: Shield,
      title: "Withdrawals",
      items: [
        "Requests reviewed against account verification",
        "Prefer returning funds via the original deposit path when required",
        "Clear next steps if additional documents are needed",
      ],
    },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Funding"
        title="Move money in and out with a clear process."
        description="Deposit to trade. Withdraw when you are ready. Both paths are designed for verification, auditability, and straightforward status updates."
        ctas={[
          { label: "Try Demo Account", href: SIGNUP_URL, variant: "primary" },
          { label: "Ask about funding", href: "/contact", variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="How it works" title="Two clear paths for your funds." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} from={i === 0 ? "left" : "right"}>
                <article className="card h-full p-7 sm:p-8">
                  <span className="icon-tile">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-[var(--foreground)]">{b.title}</h3>
                  <div className="mt-6">
                    <CheckList items={b.items} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}

export function AboutPageView() {
  const pillars: IconCard[] = [
    { icon: Compass, title: "Focus", body: "Forex, crypto, Indices, and metals in one account â€” without forcing you through noise." },
    { icon: Scale, title: "Standard", body: "Transparent cost language, steady execution priorities, and operational discipline." },
    { icon: BadgeCheck, title: "Promise", body: "We would rather under-claim than invent guarantees. Ask us directly when you need specifics." },
  ];

  return (
    <main>
      <PageHero
        eyebrow="About"
        title="A trading company built around clarity, not clutter."
        description="Oceana exists to give multi-asset traders a calmer path from market idea to live order â€” with pricing you can read and support that routes to the right desk."
        ctas={[
          { label: "Why choose us", href: "/why-choose-us", variant: "primary" },
          { label: "Contact", href: "/contact", variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="What we stand for" title="Three principles behind every decision." />
        <IconCardGrid items={pillars} />
      </Section>

      <Section tone="ink">
        <SplitPanel
          aside={
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Layers, label: "Multi-asset", text: "Four asset classes, one account" },
                { icon: MonitorSmartphone, label: "Platforms", text: "Web terminal and Android app" },
                { icon: Headphones, label: "Support", text: "Requests routed to the right desk" },
                { icon: ShieldCheck, label: "Verification", text: "KYC before withdrawals" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="glass-card p-5">
                    <Icon size={20} className="text-[var(--accent-soft)]" />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{s.label}</p>
                    <p className="mt-1 font-display font-semibold text-white">{s.text}</p>
                  </div>
                );
              })}
            </div>
          }
        >
          <SectionHeader
            dark
            eyebrow="Our approach"
            title="Built for traders who want fewer surprises."
            description="We focus on the fundamentals â€” visible costs, steady execution, and a support path that leads somewhere."
          />
        </SplitPanel>
      </Section>

      <CtaBand />
    </main>
  );
}

export function WhyChooseUsPageView() {
  const items: IconCard[] = [
    { icon: Receipt, title: "Readable pricing", body: "Cost structure is explained before you commit size â€” not buried after the fact." },
    { icon: Globe2, title: "Multi-asset access", body: "Move between forex, crypto, Indices, and metals without changing platforms." },
    { icon: Gauge, title: "Session-aware design", body: "Workflows respect when liquidity is deep and when it is thin." },
    { icon: Headphones, title: "Human support path", body: "Inquiries route to the relevant desk instead of a generic queue." },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Why Oceana"
        title="What we optimize for â€” and what we do not."
        description="We optimize for clarity, execution discipline, and usable risk controls. We do not optimize for hype, fake urgency, or invented awards."
        ctas={[
          { label: "Try Demo Account", href: SIGNUP_URL, variant: "primary" },
          { label: "About the company", href: "/about", variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="Our edge" title="Four reasons traders stay." />
        <IconCardGrid items={items} cols={4} />
      </Section>

      <CtaBand />
    </main>
  );
}

export function ReviewsPageView() {
  const asks: IconCard[] = [
    { icon: CandlestickChart, title: "Your markets", body: "Which markets you trade most" },
    { icon: Gauge, title: "Execution", body: "How execution felt in busy sessions" },
    { icon: Sparkles, title: "Improvements", body: "Where onboarding or funding could improve" },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Reviews"
        title="Feedback from real traders â€” not invented quotes."
        description="We do not publish fabricated testimonials. If you trade with Oceana and want to share experience, contact support and tell us what worked and what did not."
        ctas={[
          { label: "Share feedback", href: "/contact", variant: "primary" },
          { label: "Try Demo Account", href: SIGNUP_URL, variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="What we ask for" title="Useful feedback looks like this." />
        <IconCardGrid items={asks} />
      </Section>

      <CtaBand
        title="Trading with us? Tell us how it went."
        description="Your feedback goes straight to the team that can act on it."
        primary={{ label: "Share feedback", href: "/contact" }}
        secondary={{ label: "Try Demo Account", href: SIGNUP_URL }}
      />
    </main>
  );
}

export function ContactPageView() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const createInquiryMutation = useCreateInquiry();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const payload = {
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      title: topic.trim(),
      description: message.trim(),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.title || !payload.description) {
      setFormError("Please fill all required fields.");
      return;
    }

    try {
      await createInquiryMutation.mutateAsync(payload);
      setFullName("");
      setEmail("");
      setPhone("");
      setTopic("General Inquiry");
      setMessage("");
    } catch {
      // surfaced via mutation error state
    }
  };

  return (
    <main>
      <PageHero
        compact
        eyebrow="Contact"
        title="Reach the desk that can actually help."
        description="Send a clear request. We route it to the relevant team and reply with next steps â€” not a generic autoresponder."
      />

      <Section tone="deep" className="-mt-px">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal from="left">
            <form className="card p-6 sm:p-9" onSubmit={handleSubmit} noValidate>
              <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">Send a request</h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                All fields are required. We typically respond within one business day.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Full name
                  <input
                    className="field"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Email
                  <input
                    type="email"
                    className="field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Phone
                  <input
                    className="field"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Topic
                  <select className="field" value={topic} onChange={(e) => setTopic(e.target.value)}>
                    <option>General Inquiry</option>
                    <option>Account Opening</option>
                    <option>Platform Support</option>
                    <option>Deposit & Withdrawal</option>
                    <option>Compliance Query</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)] sm:col-span-2">
                  Message
                  <textarea
                    className="field min-h-[150px] resize-y"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </label>
              </div>

              {formError ? (
                <p className="mt-5 rounded-[var(--radius)] bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]" role="alert">
                  {formError}
                </p>
              ) : null}
              {createInquiryMutation.isSuccess ? (
                <p className="mt-5 rounded-[var(--radius)] bg-[var(--success)]/10 px-4 py-3 text-sm text-[var(--success)]" role="status">
                  Inquiry submitted successfully. We will get back to you soon.
                </p>
              ) : null}
              {createInquiryMutation.isError ? (
                <p className="mt-5 rounded-[var(--radius)] bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]" role="alert">
                  {createInquiryMutation.error instanceof Error
                    ? createInquiryMutation.error.message
                    : "Failed to submit inquiry."}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={createInquiryMutation.isPending}
                className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {createInquiryMutation.isPending ? "Submittingâ€¦" : "Submit request"}
              </button>
            </form>
          </Reveal>

          <div className="grid content-start gap-5">
            <Reveal from="right">
              <a href="mailto:info@oceanaprofx.com" className="ink-surface group block rounded-[var(--radius-lg)] p-6 sm:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-[var(--accent-soft)]">
                  <Mail size={20} />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Email us</p>
                <p className="mt-1 flex items-center gap-2 font-display text-xl font-semibold text-white">
                  info@oceanaprofx.com
                  <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
                <p className="mt-3 text-sm text-white/60">
                  Include your account email and a short description of the issue.
                </p>
              </a>
            </Reveal>
            <Reveal from="right" delay={0.08}>
              <article className="card p-6 sm:p-7">
                <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">How we respond</h3>
                <ul className="mt-5 space-y-4">
                  {[
                    "Your request is triaged to the correct desk.",
                    "Account-critical issues get priority handling.",
                    "You receive clear next steps, not vague replies.",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                      <MessageSquareText size={16} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </Section>
    </main>
  );
}

const PARTNER_TOPIC = "Become a Partner";

const PARTNERSHIP_TYPES = [
  "Introducing Broker (IB)",
  "Affiliate Partner",
  "Business Partner",
  "Technology Partner",
  "Strategic Partnership",
  "Other",
] as const;

const PARTNER_PERKS: IconCard[] = [
  {
    icon: Globe2,
    title: "Global reach",
    body: "Introduce clients across forex, crypto, Indices, and metals markets.",
  },
  {
    icon: Receipt,
    title: "Transparent economics",
    body: "Clear partnership terms and reporting you can actually audit.",
  },
  {
    icon: Headphones,
    title: "Dedicated support",
    body: "A direct line to the team that handles partner operations.",
  },
  {
    icon: ShieldCheck,
    title: "Regulated-grade trust",
    body: "Build on a platform designed for disciplined, professional trading.",
  },
];

export function BecomeAPartnerPageView() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [partnershipType, setPartnershipType] = useState<string>(PARTNERSHIP_TYPES[0]);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const createInquiryMutation = useCreateInquiry();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const payload = {
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      // Topic is fixed — never read from user-editable state.
      title: PARTNER_TOPIC,
      description: [
        `Partnership Type: ${partnershipType}`,
        `Company / Organization: ${company.trim()}`,
        `Country: ${country.trim()}`,
        "",
        message.trim(),
      ].join("\n"),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !company.trim() ||
      !country.trim() ||
      !message.trim()
    ) {
      setFormError("Please fill all required fields.");
      return;
    }

    try {
      await createInquiryMutation.mutateAsync(payload);
      setFullName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setCountry("");
      setPartnershipType(PARTNERSHIP_TYPES[0]);
      setMessage("");
    } catch {
      // surfaced via mutation error state
    }
  };

  return (
    <main>
      <PageHero
        compact
        eyebrow="Partnerships"
        title="Become a Partner"
        description="Whether you are an individual, business, broker, or organization — collaborate with oceanaprofx and grow alongside a multi-asset trading platform built for clarity."
      />

      <Section tone="deep" className="-mt-px">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* LEFT — partnership intro */}
          <div>
            <Reveal from="left">
              <h2 className="font-display text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
                Build with a platform traders trust.
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
                We work with introducing brokers, affiliates, technology
                providers, and strategic partners who share our standard for
                transparent pricing and disciplined execution. Tell us about
                your audience and goals — we will route your inquiry to the
                right partnership desk.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {PARTNER_PERKS.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <Reveal key={perk.title} delay={0.08 + i * 0.06}>
                    <article className="card card-hover h-full p-5">
                      <span className="icon-tile">
                        <Icon size={18} />
                      </span>
                      <h3 className="mt-4 font-display text-base font-semibold text-[var(--foreground)]">
                        {perk.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                        {perk.body}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* RIGHT — partnership inquiry form */}
          <Reveal from="right">
            <form className="card p-6 sm:p-9" onSubmit={handleSubmit} noValidate>
              <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
                Partnership inquiry
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                All fields are required. We typically respond within one business day.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Full name
                  <input
                    className="field"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Email address
                  <input
                    type="email"
                    className="field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Phone number
                  <input
                    className="field"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Company / Organization name
                  <input
                    className="field"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    autoComplete="organization"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Country
                  <input
                    className="field"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    autoComplete="country-name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                  Partnership type
                  <select
                    className="field"
                    value={partnershipType}
                    onChange={(e) => setPartnershipType(e.target.value)}
                    required
                  >
                    {PARTNERSHIP_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--foreground)] sm:col-span-2">
                  Message
                  <textarea
                    className="field min-h-[150px] resize-y"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your audience, goals, and how you would like to collaborate."
                    required
                  />
                </label>
              </div>

              {formError ? (
                <p className="mt-5 rounded-[var(--radius)] bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]" role="alert">
                  {formError}
                </p>
              ) : null}
              {createInquiryMutation.isSuccess ? (
                <p className="mt-5 rounded-[var(--radius)] bg-[var(--success)]/10 px-4 py-3 text-sm text-[var(--success)]" role="status">
                  Partnership inquiry submitted successfully. Our partnerships team will get back to you soon.
                </p>
              ) : null}
              {createInquiryMutation.isError ? (
                <p className="mt-5 rounded-[var(--radius)] bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]" role="alert">
                  {createInquiryMutation.error instanceof Error
                    ? createInquiryMutation.error.message
                    : "Failed to submit inquiry."}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={createInquiryMutation.isPending}
                className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {createInquiryMutation.isPending ? "Submitting…" : "Submit partnership inquiry"}
              </button>
            </form>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Prefer to talk first?"
        description="Reach the partnerships desk directly and we will walk you through the options."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Try Demo Account", href: SIGNUP_URL }}
      />
    </main>
  );
}
