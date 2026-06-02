"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  dict,
  DEFAULT_LOCALE,
  LOCALES,
  RTL_LOCALES,
  localeMeta,
} from "../lib/i18n";

const Ctx = createContext({
  locale: DEFAULT_LOCALE,
  t: dict[DEFAULT_LOCALE],
  setLocale: () => {},
  isRTL: false,
});

const STORAGE_KEY = "ibsar-center-locale";

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  // hydrate from storage / browser language
  useEffect(() => {
    let chosen = DEFAULT_LOCALE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LOCALES.includes(saved)) {
        chosen = saved;
      } else {
        const nav = (navigator.language || "").slice(0, 2).toLowerCase();
        if (LOCALES.includes(nav)) chosen = nav;
      }
    } catch (_) {}
    setLocaleState(chosen);
    setMounted(true);
  }, []);

  // sync <html lang/dir>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.lang = locale;
    html.dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (!LOCALES.includes(next)) return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {}
    setLocaleState(next);
  }, []);

  const value = {
    locale,
    t: dict[locale],
    setLocale,
    isRTL: RTL_LOCALES.includes(locale),
    meta: localeMeta[locale],
    mounted,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT() {
  return useContext(Ctx);
}
