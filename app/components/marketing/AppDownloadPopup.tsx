"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, ShieldCheck, Smartphone, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const API_BASE = String(process.env.NEXT_PUBLIC_API_BASE_URL || "").trim();
/** Only shown as a live button when a real store listing URL is configured. */
const PLAY_STORE_URL = String(process.env.NEXT_PUBLIC_PLAY_STORE_URL || "").trim();

function apiOrigin(): string {
  try {
    return API_BASE ? new URL(API_BASE).origin : "";
  } catch {
    return "";
  }
}

/**
 * Same APK the client portal ships: env override → backend /downloads/OceanaProFx .apk.
 * The admin-managed release URL (if any) replaces this once /app-update/info loads.
 */
function fallbackApkUrl(): string {
  const fromEnv = String(process.env.NEXT_PUBLIC_ANDROID_APK_URL || "").trim();
  if (fromEnv) return fromEnv;
  const origin = apiOrigin();
  return origin ? `${origin}/downloads/OceanaProFx%20.apk` : "";
}

function absolutize(url: string): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  const origin = apiOrigin();
  return origin ? `${origin}${url.startsWith("/") ? "" : "/"}${url}` : "";
}

type ReleaseInfo = { apkUrl: string; version: string };

function useAndroidRelease(enabled: boolean): ReleaseInfo {
  const [info, setInfo] = useState<ReleaseInfo>({ apkUrl: fallbackApkUrl(), version: "" });

  useEffect(() => {
    if (!enabled || !API_BASE) return;
    const controller = new AbortController();
    fetch(`${API_BASE.replace(/\/$/, "")}/app-update/info?platform=android`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const data = json?.data;
        const apk = absolutize(String(data?.apkUrl || ""));
        setInfo((prev) => ({
          apkUrl: apk || prev.apkUrl,
          version: String(data?.latestVersionName || ""),
        }));
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => controller.abort();
  }, [enabled]);

  return info;
}

function PlayStoreGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path fill="#34d399" d="M3.6 2.3 13.4 12 3.6 21.7a1.6 1.6 0 0 1-.6-1.3V3.6c0-.5.2-1 .6-1.3Z" />
      <path fill="#12c2e9" d="m16.6 8.8-3.2 3.2-9.8-9.7c.3-.2.8-.3 1.3-.1l11.7 6.6Z" />
      <path fill="#fb7185" d="m16.6 15.2-11.7 6.6c-.5.2-1 .1-1.3-.1l9.8-9.7 3.2 3.2Z" />
      <path fill="#fbbf24" d="m20.3 10.6-3.7-1.8-3.2 3.2 3.2 3.2 3.7-1.8c1-.6 1-2.2 0-2.8Z" />
    </svg>
  );
}

function PhonePreview() {
  return (
    <div className="relative mx-auto w-[210px]" aria-hidden>
      <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(47,91,255,0.45),transparent_65%)] blur-2xl" />
      <div className="relative rounded-[34px] border border-white/15 bg-[#050914] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#0c142b,#070d1d)]">
          <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-white/10" />
          <div className="px-4 pb-5 pt-4">
            <div className="flex items-center justify-between">
              <Image src="/logo-wave.png" alt="" width={2172} height={724} className="h-5 w-auto drop-shadow-[0_2px_8px_rgba(61,123,255,0.4)]" />
              <span className="rounded-full bg-[#34d399]/15 px-2 py-0.5 text-[9px] font-semibold text-[#34d399]">
                LIVE
              </span>
            </div>
            <p className="mt-4 text-[9px] uppercase tracking-wider text-white/40">Portfolio</p>
            <div className="mt-1 h-3 w-24 rounded bg-white/80" />
            <svg viewBox="0 0 160 60" className="mt-3 w-full">
              <defs>
                <linearGradient id="pp-a" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3d7bff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#3d7bff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,48 L20,40 L40,44 L60,30 L80,34 L100,20 L120,24 L140,10 L160,14 L160,60 L0,60 Z" fill="url(#pp-a)" />
              <path d="M0,48 L20,40 L40,44 L60,30 L80,34 L100,20 L120,24 L140,10 L160,14" fill="none" stroke="#12c2e9" strokeWidth="2" />
            </svg>
            <div className="mt-3 space-y-1.5">
              {["Forex", "Metals", "Crypto"].map((m, i) => (
                <div key={m} className="flex items-center justify-between rounded-lg bg-white/[0.05] px-2.5 py-2">
                  <span className="text-[10px] font-semibold text-white/80">{m}</span>
                  <span className={`h-1.5 w-10 rounded-full ${i === 1 ? "bg-[#fb7185]/60" : "bg-[#34d399]/60"}`} />
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <div className="rounded-lg bg-[#e5484d] py-1.5 text-center text-[9px] font-bold text-white">SELL</div>
              <div className="rounded-lg bg-[#2f5bff] py-1.5 text-center text-[9px] font-bold text-white">BUY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Floating "Download app" button (bottom-right, all marketing pages) + premium modal. */
export default function AppDownloadPopup() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const release = useAndroidRelease(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group fixed bottom-5 right-5 z-[90] inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[rgba(7,13,29,0.92)] py-2 pl-2 pr-4 text-white shadow-[0_20px_45px_-18px_rgba(47,91,255,0.75)] backdrop-blur-xl sm:bottom-7 sm:right-7"
        aria-label="Download the Oceana app"
      >
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[var(--primary)]">
          <Download size={18} className="relative" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[13px] font-semibold">Download app</span>
          <span className="hidden text-[11px] text-white/55 sm:block">Trade on the go</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[rgba(3,6,14,0.72)] backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="app-download-title"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="ink-surface relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)]"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg">
                      <Image src="/oceana-icon.png" alt="Oceana app" width={512} height={512} className="h-full w-full object-contain" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-soft)]">Mobile app</p>
                      <p className="font-display text-lg font-semibold text-white">
                        Oceana{release.version ? <span className="ml-2 text-xs font-medium text-white/45">v{release.version}</span> : null}
                      </p>
                    </div>
                  </div>

                  <h3 id="app-download-title" className="mt-6 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Your trading desk, <span className="text-gradient">in your pocket.</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                    Monitor positions, place and manage orders, and fund your account from your phone — signed in with your
                    Oceana account.
                  </p>

                  <ul className="mt-6 grid gap-2.5 text-sm text-white/75">
                    <li className="flex items-center gap-2.5">
                      <Zap size={15} className="text-[var(--accent-soft)]" /> Place and manage orders quickly on mobile
                    </li>
                    <li className="flex items-center gap-2.5">
                      <ShieldCheck size={15} className="text-[var(--accent-soft)]" /> Secure sign-in with your account credentials
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Smartphone size={15} className="text-[var(--accent-soft)]" /> Android app available now
                    </li>
                  </ul>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {PLAY_STORE_URL ? (
                      <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black px-4 py-3 text-white transition hover:border-white/40"
                      >
                        <PlayStoreGlyph />
                        <span className="leading-tight">
                          <span className="block text-[10px] uppercase tracking-wider text-white/60">Get it on</span>
                          <span className="block text-base font-semibold">Google Play</span>
                        </span>
                      </a>
                    ) : (
                      <div
                        aria-disabled
                        className="flex cursor-not-allowed items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white/50"
                        title="Google Play listing coming soon"
                      >
                        <span className="opacity-60">
                          <PlayStoreGlyph />
                        </span>
                        <span className="leading-tight">
                          <span className="block text-[10px] uppercase tracking-wider">Google Play</span>
                          <span className="block text-base font-semibold">Coming soon</span>
                        </span>
                      </div>
                    )}

                    {release.apkUrl ? (
                      <a
                        href={release.apkUrl}
                        download
                        className="flex items-center gap-3 rounded-xl bg-[var(--primary)] px-4 py-3 text-white shadow-[0_12px_26px_-14px_rgba(47,91,255,0.7)] transition hover:bg-[var(--primary-dark)]"
                      >
                        <span className="grid h-6 w-6 place-items-center">
                          <Download size={20} />
                        </span>
                        <span className="leading-tight">
                          <span className="block text-[10px] uppercase tracking-wider text-white/75">Direct download</span>
                          <span className="block text-base font-semibold">Android APK</span>
                        </span>
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-4 text-xs text-white/45">
                    After downloading, open the APK and allow installation from this source if your phone asks.
                  </p>
                </div>

                <div className="hidden md:block">
                  <PhonePreview />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
