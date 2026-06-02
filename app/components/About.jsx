"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import AboutVisual from "./AboutVisual";
import { useT } from "./LanguageProvider";

export default function About() {
  const { t } = useT();
  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <AboutVisual />
        </motion.div>

        <div>
          <Reveal>
            <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-glow-magenta">
              {t.about.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 sm:mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] sm:leading-[1.05]">
              {t.about.heading.pre}
              <span className="italic text-gradient">{t.about.heading.em}</span>
              <br className="hidden sm:block" />{" "}
              {t.about.heading.line2}
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={0.25}>
            <p className="mt-5 sm:mt-6 text-white/65 leading-relaxed text-base sm:text-lg max-w-lg">
              {t.about.paragraph}
            </p>
          </Reveal>

          <ul className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
            {t.about.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 w-5 h-5 rounded-full bg-glow-cyan/15 border border-glow-cyan/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-glow-cyan" />
                </span>
                <span className="text-sm sm:text-base text-white/85">{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
