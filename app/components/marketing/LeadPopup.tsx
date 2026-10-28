"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const popupImage =
  "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=1400&q=80";

export default function LeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 6500);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close popup"
            onClick={close}
            className="absolute inset-0 bg-black/55"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[0_30px_70px_-45px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="relative h-36 sm:h-44">
              <Image src={popupImage} alt="" fill sizes="100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_60%,rgba(0,0,0,0.4)_100%)]" />
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Dismiss"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur hover:bg-black/65"
            >
              <X size={16} />
            </button>

            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Start Trading Today
              </p>
              <h3 className="mt-2 text-2xl font-black text-[var(--foreground)] sm:text-3xl">
                Open your account in minutes.
              </h3>
              <p className="mt-3 text-sm text-[var(--text-muted)] sm:text-base">
                Get access to forex, crypto, indexes, and metals with transparent pricing and execution discipline.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="https://user.oceanaprofx.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[linear-gradient(90deg,var(--secondary),var(--primary))] px-6 py-3 text-sm font-semibold text-[var(--card-bg)]"
                >
                  Open Account
                </Link>
                <Link
                  href="/contact"
                  onClick={close}
                  className="rounded-xl border border-[var(--card-border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--hover-bg)]"
                >
                  Talk to Support
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
