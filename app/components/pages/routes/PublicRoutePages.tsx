"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import {
  Clock3,
  Mail,
  MessageSquareText,
  Shield,
  Wallet,
} from "lucide-react";
import { useCreateInquiry } from "../../../hooks/useCreateInquiry";
import PageHero from "../../ui/PageHero";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.2 },
};

const IMAGES = {
  account:
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=2400&q=80",
  platform:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80",
  conditions:
    "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=2400&q=80",
  marketTime:
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2400&q=80",
  payments:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=2400&q=80",
  about:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
  why:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
  reviews:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
  regulation:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=80",
  contact:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80",
} as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
      {children}
    </p>
  );
}

export function TradingAccountPageView() {
  const plans = [
    {
      name: "Core",
      pricing: "Standard pricing",
      lev: "Up to 1:200",
      focus: "Balanced entry for new and steady strategies",
    },
    {
      name: "Prime",
      pricing: "Active pricing",
      lev: "Up to 1:300",
      focus: "Higher activity and tighter workflow needs",
    },
    {
      name: "Elite",
      pricing: "Institutional pricing",
      lev: "Tailored",
      focus: "Custom structure for larger flow",
    },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Trading accounts"
        title="Account structures that match how you actually trade."
        description="Pick a tier aligned with your frequency, size, and risk posture — then fund and go live."
        imageSrc={IMAGES.account}
        ctas={[
          {
            label: "Open account",
            href: "https://user.oceanaprofx.com/signup",
            variant: "accent",
          },
          { label: "View conditions", href: "/trading/condition", variant: "ghost" },
        ]}
      />

      <section className="border-b border-[var(--card-border)] bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <SectionLabel>Plans</SectionLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Choose the structure that fits your desk.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-[var(--card-border)] bg-[var(--card-border)] md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className="bg-[var(--card-bg)] p-6 sm:p-8">
                <p className="font-display text-2xl font-bold text-[var(--foreground)]">
                  {plan.name}
                </p>
                <p className="mt-4 text-sm text-[var(--text-muted)]">{plan.focus}</p>
                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between gap-4 border-t border-[var(--card-border)] pt-3">
                    <dt className="text-[var(--text-muted)]">Pricing</dt>
                    <dd className="font-semibold text-[var(--foreground)]">{plan.pricing}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-[var(--card-border)] pt-3">
                    <dt className="text-[var(--text-muted)]">Leverage</dt>
                    <dd className="font-semibold text-[var(--foreground)]">{plan.lev}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background-deep)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <SectionLabel>Activation</SectionLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            From registration to live in a clear sequence.
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Register",
              "Verify identity",
              "Map risk profile",
              "Fund securely",
              "Trade live",
            ].map((step, idx) => (
              <li key={step}>
                <p className="font-display text-3xl font-bold text-[var(--primary)]/20">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-semibold text-[var(--foreground)]">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

export function TradingPlatformPageView() {
  const tools = [
    {
      title: "Web trading",
      body: "Browser-based charts and tickets for focused desktop sessions.",
    },
    {
      title: "Mobile access",
      body: "Monitor positions and react when you are away from the desk.",
    },
    {
      title: "Account controls",
      body: "Funding, reporting, and access settings in one operational layer.",
    },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Platform"
        title="A workspace that stays out of your way."
        description="Charts, tickets, balances, and funding stay aligned across web and mobile — so your attention stays on the market."
        imageSrc={IMAGES.platform}
        ctas={[
          {
            label: "Open account",
            href: "https://user.oceanaprofx.com/signup",
            variant: "accent",
          },
          {
            label: "Launch portal",
            href: "https://user.oceanaprofx.com/login",
            variant: "ghost",
          },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {tools.map((t) => (
              <motion.article key={t.title} {...fadeIn} className="border-l-2 border-[var(--primary)] pl-5">
                <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {t.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function TradingConditionPageView() {
  const rows = [
    ["Forex majors", "Session-aware pricing", "Low-latency routing"],
    ["Gold (XAU/USD)", "Depth-led pricing", "Extended hours"],
    ["US indexes", "Benchmark-aligned", "Cash session focus"],
    ["Core crypto", "Market-linked", "24/7 access"],
  ];

  return (
    <main>
      <PageHero
        eyebrow="Trading conditions"
        title="Know the rules of the book before you size up."
        description="Pricing posture, access windows, and risk controls — written for clarity, not brochure gloss."
        imageSrc={IMAGES.conditions}
        ctas={[
          {
            label: "Open account",
            href: "https://user.oceanaprofx.com/signup",
            variant: "accent",
          },
          { label: "Contact desk", href: "/contact", variant: "ghost" },
        ]}
      />

      <section className="border-b border-[var(--card-border)] bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <SectionLabel>Instrument overview</SectionLabel>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)] text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  <th className="pb-3 pr-4 font-medium">Market</th>
                  <th className="pb-3 pr-4 font-medium">Pricing</th>
                  <th className="pb-3 font-medium">Execution</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--card-border)]">
                    <td className="py-4 pr-4 font-semibold text-[var(--foreground)]">{row[0]}</td>
                    <td className="py-4 pr-4 text-[var(--text-muted)]">{row[1]}</td>
                    <td className="py-4 text-[var(--text-muted)]">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background-deep)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <SectionLabel>Risk posture</SectionLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Controls that stay visible.
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Configurable stop and limit placement beside the ticket",
              "Clear margin visibility before you commit size",
              "Session-aware instrument availability",
              "Support path for account-critical questions",
            ].map((item) => (
              <li
                key={item}
                className="border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-4 text-sm text-[var(--text-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export function TradingMarketTimePageView() {
  const sessions = [
    { name: "Asia", window: "Tokyo-led hours", focus: "JPY crosses, regional risk" },
    { name: "London", window: "European cash open", focus: "EUR, GBP, metals liquidity" },
    { name: "New York", window: "US cash + overlap", focus: "USD majors, indexes" },
    { name: "Crypto", window: "Continuous", focus: "Digital pairs around the clock" },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Market hours"
        title="Trade when your market is awake."
        description="Map sessions to your strategy — from Tokyo open through the New York close, plus continuous crypto."
        imageSrc={IMAGES.marketTime}
        ctas={[
          { label: "Economic calendar", href: "/economic-calendar", variant: "accent" },
          {
            label: "Open account",
            href: "https://user.oceanaprofx.com/signup",
            variant: "ghost",
          },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-px overflow-hidden rounded-md border border-[var(--card-border)] bg-[var(--card-border)] sm:grid-cols-2">
            {sessions.map((s) => (
              <article key={s.name} className="bg-[var(--card-bg)] p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[var(--primary)]">
                  <Clock3 size={18} />
                  <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
                    {s.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm font-medium text-[var(--foreground)]">{s.window}</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{s.focus}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--text-muted)]">
            Exact instrument hours can vary by symbol. Confirm availability on the platform before planning entries.
          </p>
        </div>
      </section>
    </main>
  );
}

export function TradingDepositWithdrawalPageView() {
  return (
    <main>
      <PageHero
        eyebrow="Funding"
        title="Move money in and out with a clear process."
        description="Deposit to trade. Withdraw when you are ready. Both paths are designed for verification, auditability, and straightforward status updates."
        imageSrc={IMAGES.payments}
        ctas={[
          {
            label: "Open account",
            href: "https://user.oceanaprofx.com/signup",
            variant: "accent",
          },
          { label: "Ask about funding", href: "/contact", variant: "ghost" },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--hover-bg)] text-[var(--primary)]">
              <Wallet size={18} />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--foreground)]">Deposits</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
              <li className="border-l-2 border-[var(--primary)] pl-4">
                Supported methods shown in your portal after verification
              </li>
              <li className="border-l-2 border-[var(--primary)] pl-4">
                Status updates while funds are processing
              </li>
              <li className="border-l-2 border-[var(--primary)] pl-4">
                Balance reflection once the deposit clears
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--hover-bg)] text-[var(--primary)]">
              <Shield size={18} />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--foreground)]">Withdrawals</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
              <li className="border-l-2 border-[var(--accent)] pl-4">
                Requests reviewed against account verification
              </li>
              <li className="border-l-2 border-[var(--accent)] pl-4">
                Prefer returning funds via the original deposit path when required
              </li>
              <li className="border-l-2 border-[var(--accent)] pl-4">
                Clear next steps if additional documents are needed
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export function AboutPageView() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="A trading company built around clarity, not clutter."
        description="oceanaprofx exists to give multi-asset traders a calmer path from market idea to live order — with pricing you can read and support that routes to the right desk."
        imageSrc={IMAGES.about}
        ctas={[
          { label: "Why choose us", href: "/why-choose-us", variant: "accent" },
          { label: "Contact", href: "/contact", variant: "ghost" },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Focus",
                body: "Forex, crypto, indexes, and metals in one account — without forcing you through noise.",
              },
              {
                title: "Standard",
                body: "Transparent cost language, steady execution priorities, and operational discipline.",
              },
              {
                title: "Promise",
                body: "We would rather under-claim than invent guarantees. Ask us directly when you need specifics.",
              },
            ].map((item) => (
              <article key={item.title} className="border-l-2 border-[var(--primary)] pl-5">
                <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function WhyChooseUsPageView() {
  const items = [
    {
      title: "Readable pricing",
      body: "Cost structure is explained before you commit size — not buried after the fact.",
    },
    {
      title: "Multi-asset access",
      body: "Move between forex, crypto, indexes, and metals without changing platforms.",
    },
    {
      title: "Session-aware design",
      body: "Workflows respect when liquidity is deep and when it is thin.",
    },
    {
      title: "Human support path",
      body: "Inquiries route to the relevant desk instead of a generic queue.",
    },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Why oceanaprofx"
        title="What we optimize for — and what we do not."
        description="We optimize for clarity, execution discipline, and usable risk controls. We do not optimize for hype, fake urgency, or invented awards."
        imageSrc={IMAGES.why}
        ctas={[
          {
            label: "Open account",
            href: "https://user.oceanaprofx.com/signup",
            variant: "accent",
          },
          { label: "About the company", href: "/about", variant: "ghost" },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="space-y-10">
            {items.map((item) => (
              <article key={item.title} className="border-l-2 border-[var(--accent)] pl-5">
                <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-[var(--text-muted)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ReviewsPageView() {
  return (
    <main>
      <PageHero
        eyebrow="Reviews"
        title="Feedback from real traders — not invented quotes."
        description="We do not publish fabricated testimonials. If you trade with oceanaprofx and want to share experience, contact support and tell us what worked and what did not."
        imageSrc={IMAGES.reviews}
        ctas={[
          { label: "Share feedback", href: "/contact", variant: "accent" },
          {
            label: "Open account",
            href: "https://user.oceanaprofx.com/signup",
            variant: "ghost",
          },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <SectionLabel>What we ask for</SectionLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Useful feedback looks like this.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Which markets you trade most",
              "How execution felt in busy sessions",
              "Where onboarding or funding could improve",
            ].map((item) => (
              <li
                key={item}
                className="border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-6 text-sm text-[var(--text-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export function RegulationPageView() {
  return (
    <main>
      <PageHero
        eyebrow="Regulation & governance"
        title="Compliance is process — not a slogan."
        description="Account verification, fund handling, and internal controls exist to protect operational integrity. Ask us for the current regulatory and entity details that apply to your region."
        imageSrc={IMAGES.regulation}
        ctas={[
          { label: "Contact compliance", href: "/contact", variant: "accent" },
          { label: "About oceanaprofx", href: "/about", variant: "ghost" },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Verification",
                body: "Identity and account checks before higher limits and withdrawals.",
              },
              {
                title: "Operational controls",
                body: "Internal review paths for funding, risk, and support escalations.",
              },
              {
                title: "Transparency",
                body: "We state what we can substantiate. Regional licensing details are confirmed on request.",
              },
            ].map((item) => (
              <article key={item.title} className="border-l-2 border-[var(--primary)] pl-5">
                <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
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

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.title ||
      !payload.description
    ) {
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
        description="Send a clear request. We route it to the relevant team and reply with next steps — not a generic autoresponder."
        imageSrc={IMAGES.contact}
      />

      <section className="border-b border-[var(--card-border)] bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <a
            href="mailto:support@oceanaprofx.com"
            className="inline-flex items-center gap-3 text-[var(--foreground)] hover:text-[var(--primary)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--hover-bg)] text-[var(--primary)]">
              <Mail size={18} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Email
              </span>
              <span className="font-semibold">support@oceanaprofx.com</span>
            </span>
          </a>
        </div>
      </section>

      <section className="bg-[var(--background-deep)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:py-20">
          <form
            className="border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="font-display text-2xl font-bold text-[var(--foreground)]">
              Send a request
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              All fields are required. We typically respond within one business day.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                <select
                  className="field"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
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
                  className="field min-h-[140px] resize-y"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </label>
            </div>

            {formError ? (
              <p className="mt-4 text-sm text-[var(--danger)]" role="alert">
                {formError}
              </p>
            ) : null}
            {createInquiryMutation.isSuccess ? (
              <p className="mt-4 text-sm text-[var(--success)]" role="status">
                Inquiry submitted successfully. We will get back to you soon.
              </p>
            ) : null}
            {createInquiryMutation.isError ? (
              <p className="mt-4 text-sm text-[var(--danger)]" role="alert">
                {createInquiryMutation.error instanceof Error
                  ? createInquiryMutation.error.message
                  : "Failed to submit inquiry."}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={createInquiryMutation.isPending}
              className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {createInquiryMutation.isPending ? "Submitting…" : "Submit request"}
            </button>
          </form>

          <aside className="space-y-4">
            <article className="border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
                How we respond
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Your request is triaged to the correct desk.",
                  "Account-critical issues get priority handling.",
                  "You receive clear next steps, not vague replies.",
                ].map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                  >
                    <MessageSquareText
                      size={14}
                      className="mt-0.5 shrink-0 text-[var(--primary)]"
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
                Prefer email?
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Write to{" "}
                <a
                  href="mailto:support@oceanaprofx.com"
                  className="font-semibold text-[var(--primary)] hover:underline"
                >
                  support@oceanaprofx.com
                </a>{" "}
                with your account email and a short description of the issue.
              </p>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
