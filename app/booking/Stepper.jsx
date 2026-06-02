"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STEPS = [
  { n: 1, ar: "البيانات", en: "Identity" },
  { n: 2, ar: "الخدمة", en: "Service" },
  { n: 3, ar: "الموعد", en: "Schedule" },
  { n: 4, ar: "التأكيد", en: "Confirm" },
];

export default function Stepper({ current }) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {STEPS.map((s, i) => {
          const done = s.n < current;
          const active = s.n === current;
          return (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 relative">
                <motion.div
                  layout
                  initial={false}
                  animate={{
                    backgroundColor: done
                      ? "rgb(16,185,129)"
                      : active
                      ? "rgb(222,181,73)"
                      : "rgba(255,255,255,0.05)",
                    borderColor: done
                      ? "rgb(16,185,129)"
                      : active
                      ? "rgb(222,181,73)"
                      : "rgba(94,255,155,0.2)",
                    color: done || active ? "#03120b" : "rgba(255,255,255,0.5)",
                    scale: active ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center text-sm sm:text-base font-semibold"
                >
                  {done ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                  ) : (
                    s.n
                  )}
                </motion.div>
                <span
                  className={`text-[9px] sm:text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    done || active ? "text-white/85" : "text-white/35"
                  }`}
                >
                  {s.en}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-1 sm:mx-2 mb-5 sm:mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/8" />
                  <motion.div
                    initial={false}
                    animate={{
                      scaleX: s.n < current ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left center" }}
                    className="absolute inset-0 bg-emerald-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
