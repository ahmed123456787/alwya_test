"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useT } from "./LanguageProvider";
import { LOCALES, localeMeta } from "../lib/i18n";

/**
 * LanguageSwitcher — compact pill that expands on hover/click.
 * Variant: "desktop" (animated dropdown) or "mobile" (inline row).
 */
export default function LanguageSwitcher({ variant = "desktop" }) {
  const { locale, setLocale } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (variant !== "desktop") return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [variant]);

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2">
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`min-w-[48px] h-11 px-3 rounded-full text-xs font-semibold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
                active
                  ? "bg-glow-cyan text-ink-950 shadow-[0_0_18px_-4px_rgba(94,255,155,0.7)]"
                  : "bg-white/5 text-white/70 border border-glow-cyan/15 hover:text-white"
              }`}
            >
              {localeMeta[l].label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        data-cursor="hover"
        className="group flex items-center gap-2 rounded-full border border-glow-cyan/20 bg-white/5 px-3 py-2 text-xs text-white/80 hover:border-glow-cyan/60 hover:text-white transition-colors"
      >
        <Globe className="w-3.5 h-3.5 text-glow-cyan" />
        <span className="font-semibold tracking-wider">
          {localeMeta[locale].label}
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          y: open ? 0 : -6,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl border border-glow-cyan/15 bg-ink-900/95 backdrop-blur-xl p-1.5 shadow-2xl z-50"
      >
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-glow-cyan/10 text-glow-cyan"
                  : "text-white/80 hover:bg-white/5"
              }`}
            >
              <span>{localeMeta[l].name}</span>
              <span
                className={`text-[10px] tracking-widest ${
                  active ? "text-glow-cyan" : "text-white/60"
                }`}
              >
                {localeMeta[l].label}
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
