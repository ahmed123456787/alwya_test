"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Reveal from "./Reveal";
import { useT } from "./LanguageProvider";

export default function Testimonials() {
  const { t, isRTL } = useT();
  return (
    <section id="testimonials" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iris-900/15 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal>
          <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-glow-cyan">
            {t.testimonials.kicker}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 sm:mt-4 font-display text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-[1.08] sm:leading-[1.05]">
            {t.testimonials.heading.pre}
            <span className="italic text-gradient">
              {t.testimonials.heading.em}
            </span>
            {t.testimonials.heading.post}
          </h2>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-4 sm:gap-5">
          {t.testimonials.items.map((r, i) => (
            <motion.figure
              key={r.name + i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              className="relative gradient-border p-6 sm:p-8 md:p-10 spotlight"
              data-cursor="hover"
            >
              <motion.div
                animate={{ rotate: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Quote
                  className={`absolute top-5 sm:top-6 ${
                    isRTL ? "left-5 sm:left-6" : "right-5 sm:right-6"
                  } w-8 h-8 sm:w-10 sm:h-10 text-glow-cyan/10`}
                />
              </motion.div>
              <blockquote
                lang={r.lang || undefined}
                dir={r.lang === "ar" ? "rtl" : r.lang === "en" ? "ltr" : undefined}
                className={`font-display leading-snug text-white/90 ${
                  r.lang === "ar"
                    ? "text-right text-2xl sm:text-3xl md:text-[1.75rem]"
                    : "text-xl sm:text-2xl md:text-3xl"
                }`}
                style={r.lang === "ar" ? { fontFamily: "'Tajawal', 'Cairo', sans-serif" } : undefined}
              >
                {r.lang === "ar" ? `« ${r.quote} »` : `"${r.quote}"`}
              </blockquote>
              <figcaption className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-glow-cyan to-iris-600 shadow-[0_0_25px_-5px_rgba(94,255,155,0.7)] flex-shrink-0" />
                <div>
                  <p className="text-sm">{r.name}</p>
                  <p className="text-xs text-white/60">{r.detail}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
