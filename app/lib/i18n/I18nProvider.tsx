"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, {
  applyDocumentLocale,
  getStoredLocale,
  LOCALE_STORAGE_KEY,
  type AppLocale,
} from "./config";

export type { AppLocale };

export function setAppLocale(locale: AppLocale) {
  void i18n.changeLanguage(locale);
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  applyDocumentLocale(locale);
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const locale = getStoredLocale();
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
    applyDocumentLocale(locale);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
