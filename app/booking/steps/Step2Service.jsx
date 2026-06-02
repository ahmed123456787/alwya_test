"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Eye, ScanEye, Activity, Droplet, Gauge, HeartPulse, Sun, Moon, Baby } from "lucide-react";
import { SERVICES } from "../services";

const ICONS = {
  "bilan-refractif":         ScanEye,
  "bilan-cataracte":         Eye,
  "bilan-keratocone":        Activity,
  "bilan-surface-oculaire":  Droplet,
  "bilan-glaucome":          Gauge,
  "bilan-diabete":           HeartPulse,
  "consultation-matinee":    Sun,
  "consultation-apres-midi": Moon,
  "examen-pediatrique":      Baby,
};

export default function Step2Service({
  data,
  setData,
  view,
  setView,
  onBack,
  onNext,
}) {
  if (view === "list") {
    return (
      <div className="space-y-6">
        <div className="text-center mb-2">
          <h2
            className="font-display text-2xl sm:text-3xl mb-2"
            dir="rtl"
            lang="ar"
          >
            اختر الخدمة على حسب حالتك المرضية
          </h2>
          <p className="text-sm text-white/55">
            Choose the service that matches your condition
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.slug] || Eye;
            const selected = data.service?.slug === s.slug;
            return (
              <motion.button
                key={s.slug}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setData((d) => ({ ...d, service: s }));
                  setView("detail");
                }}
                className={`group relative text-right p-4 rounded-2xl border transition-all overflow-hidden ${
                  selected
                    ? "border-glow-gold/60 bg-glow-gold/8"
                    : "border-white/10 bg-white/3 hover:border-glow-cyan/40 hover:bg-white/5"
                }`}
                dir="rtl"
                lang="ar"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      s.color === "gold"
                        ? "bg-glow-gold/15 border border-glow-gold/30"
                        : "bg-glow-cyan/10 border border-glow-cyan/25"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        s.color === "gold" ? "text-glow-gold" : "text-glow-cyan"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-white/40">
                    {s.price.toLocaleString()} DZD
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-snug">
                  {s.titleAr}
                </h3>
                <p className="mt-1 text-[11px] text-white/40 ltr:text-left rtl:text-left">
                  {s.titleEn}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div className="pt-4 flex items-center justify-start">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>
    );
  }

  // -------- DETAIL VIEW --------
  const s = data.service;
  if (!s) {
    setView("list");
    return null;
  }
  const Icon = ICONS[s.slug] || Eye;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-glow-cyan/10 border border-glow-cyan/30 mb-4">
          <Icon className="w-7 h-7 text-glow-cyan" />
        </div>
        <h2
          className="font-display text-xl sm:text-2xl md:text-3xl leading-tight max-w-2xl mx-auto"
          dir="rtl"
          lang="ar"
        >
          {s.titleAr}
        </h2>
        <p className="mt-2 text-xs sm:text-sm tracking-[0.2em] uppercase text-glow-cyan/65">
          {s.titleEn}
        </p>
      </div>

      <div
        className="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-7 text-[15px] sm:text-base leading-loose text-white/80"
        dir="rtl"
        lang="ar"
      >
        {s.descAr}
      </div>

      <div className="rounded-2xl border border-glow-gold/30 bg-glow-gold/8 px-5 py-4 flex items-center justify-between gap-4">
        <span className="text-sm text-white/75">
          Estimated cost · التكلفة التقديرية
        </span>
        <span className="text-xl sm:text-2xl font-display text-glow-gold">
          {s.price.toLocaleString()} <span className="text-base">DZD</span>
        </span>
      </div>

      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setView("list")}
          className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Change service
        </button>
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-glow-cyan text-ink-950 px-7 py-3 text-sm sm:text-base font-semibold shadow-[0_0_40px_-5px_rgba(94,255,155,0.6)] hover:shadow-[0_0_60px_-5px_rgba(94,255,155,0.85)] transition-shadow"
        >
          Book appointment · تحديد موعد →
        </motion.button>
      </div>
    </div>
  );
}
