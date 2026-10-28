"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

const popupImage =
  "https://plus.unsplash.com/premium_vector-1732296053749-4f94462c1933?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwfGVufDB8MHwwfHx8MA%3D%3D";

type DeviceType = "android" | "ios" | "other";
type Platform = "android" | "ios";

function detectDevice(): DeviceType {
  if (typeof window === "undefined") return "other";

  const ua = navigator.userAgent || navigator.vendor;
  const isAndroid = /android/i.test(ua);
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isAndroid) return "android";
  if (isIOS) return "ios";
  return "other";
}

export default function AppDownloadPopup() {
  const [open, setOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("other");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("android");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const runtimeDevice = detectDevice();
      setDeviceType(runtimeDevice);
      if (runtimeDevice === "ios") {
        setSelectedPlatform("ios");
      }
      if (runtimeDevice === "android") {
        setSelectedPlatform("android");
      }
    });
    const timer = window.setTimeout(() => setOpen(true), 11000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  const close = () => {
    setOpen(false);
  };

  const startAndroidDownload = async () => {
    try {
      const response = await fetch("/oceanaprofx.apk");
      if (!response.ok) {
        throw new Error("APK file is not reachable");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "oceanaprofx.apk";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
      setFeedback("Android APK download started.");
    } catch {
      const fallback = document.createElement("a");
      fallback.href = "/oceanaprofx.apk";
      fallback.download = "oceanaprofx.apk";
      document.body.appendChild(fallback);
      fallback.click();
      fallback.remove();
      setFeedback("Trying APK download. If blocked, allow downloads in browser.");
    }
  };

  const handleDownload = async () => {
    if (deviceType === "android") {
      await startAndroidDownload();
      return;
    }

    if (deviceType === "ios") {
      setFeedback("iOS app download will be available soon.");
      return;
    }

    if (selectedPlatform === "android") {
      await startAndroidDownload();
      return;
    }

    setFeedback("iOS app download is coming soon.");
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[100] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--secondary),var(--primary))] text-[var(--card-bg)] shadow-[0_18px_40px_-16px_var(--glow)]"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open app download popup"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--primary)]/35" />
        <Download size={22} className="relative z-10" />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[101] flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close popup"
              onClick={close}
              className="absolute inset-0 bg-black/60"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-3xl overflow-hidden rounded-[30px] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[0_40px_90px_-52px_rgba(0,0,0,0.78)]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="relative h-36 sm:h-44">
                <Image src={popupImage} alt="" fill sizes="100vw" className="object-cover" priority />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.5)_100%)]" />
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Dismiss"
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur hover:bg-black/65"
              >
                <X size={16} />
              </button>

              <div className="relative grid gap-5 p-5 sm:grid-cols-[1.2fr_1fr] sm:gap-6 sm:p-7">
                <div className="absolute -left-12 -top-14 h-36 w-36 rounded-full bg-[var(--primary)]/12 blur-2xl" />
                <div className="absolute -bottom-14 right-8 h-36 w-36 rounded-full bg-[var(--secondary)]/12 blur-2xl" />

                <div className="relative">
                  <p className="inline-flex items-center rounded-full border border-[var(--card-border)] bg-[var(--hover-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--secondary)]">
                    App Download
                  </p>
                  <h3 className="mt-3 text-2xl font-black leading-tight text-[var(--foreground)] sm:text-3xl">
                    Trade faster on
                    <span className="block bg-[linear-gradient(90deg,var(--secondary),var(--primary))] bg-clip-text text-transparent">
                      oceanaprofx Mobile
                    </span>
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-muted)] sm:text-base">
                    Device based smart download. Android gets APK instantly, iOS gets release update status.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="rounded-xl bg-[linear-gradient(90deg,var(--secondary),var(--primary))] px-6 py-3 text-sm font-semibold text-[var(--card-bg)]"
                    >
                      {deviceType === "android"
                        ? "Download for Android"
                        : deviceType === "ios"
                          ? "Download for iOS"
                          : selectedPlatform === "android"
                            ? "Download for Android"
                            : "Download for iOS"}
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-xl border border-[var(--card-border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--hover-bg)]"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--hover-bg)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Platform
                  </p>

                  <div className="mt-3 space-y-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform("android")}
                      disabled={deviceType !== "other"}
                      className={[
                        "flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition",
                        (deviceType === "android" || (deviceType === "other" && selectedPlatform === "android"))
                          ? "border-[var(--secondary)] bg-[var(--card-bg)] text-[var(--foreground)]"
                          : "border-[var(--card-border)] bg-[var(--card-bg)]/60 text-[var(--text-muted)]",
                        deviceType !== "other" ? "cursor-default opacity-90" : "hover:border-[var(--secondary)]/50",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Smartphone size={15} />
                        Android
                      </span>
                      <span className="text-xs font-semibold text-[var(--secondary)]">APK Ready</span>
                    </button>

                    {/* <button
                      type="button"
                      onClick={() => setSelectedPlatform("ios")}
                      disabled={deviceType !== "other"}
                      className={[
                        "flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition",
                        (deviceType === "ios" || (deviceType === "other" && selectedPlatform === "ios"))
                          ? "border-[var(--secondary)] bg-[var(--card-bg)] text-[var(--foreground)]"
                          : "border-[var(--card-border)] bg-[var(--card-bg)]/60 text-[var(--text-muted)]",
                        deviceType !== "other" ? "cursor-default opacity-90" : "hover:border-[var(--secondary)]/50",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Smartphone size={15} />
                        iOS
                      </span>
                      <span className="text-xs font-semibold text-[var(--text-muted)]">Coming Soon</span>
                    </button> */}
                  </div>

                  <p className="mt-3 text-xs text-[var(--text-muted)]">
                    {deviceType === "android"
                      ? "Android device detected."
                      : deviceType === "ios"
                        ? "iOS device detected."
                        : ""}
                  </p>
                </div>

                {feedback ? (
                  <p className="relative sm:col-span-2 rounded-lg border border-[var(--card-border)] bg-[var(--hover-bg)] px-3 py-2 text-sm text-[var(--text-muted)]">
                    {feedback}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
