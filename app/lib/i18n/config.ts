"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const LOCALES = ["en", "ar"] as const;
export type AppLocale = (typeof LOCALES)[number];
export const LOCALE_STORAGE_KEY = "locale";

export function getStoredLocale(): AppLocale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

/** Layout stays LTR — only text language changes (avoids broken reverse UI). */
export function applyDocumentLocale(locale: AppLocale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = locale;
  root.dir = "ltr";
  root.classList.toggle("lang-ar", locale === "ar");
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export default i18n;
