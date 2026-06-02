"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Sparkles,
  Activity,
  Baby,
  Microscope,
  Droplets,
  Sun,
  Stethoscope,
  ScanEye,
} from "lucide-react";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";
import SectionScene from "./SectionScene";
import { useT } from "./LanguageProvider";

const icons = [Sparkles, ScanEye, Eye, Activity, Sun, Microscope, Droplets, Baby, Stethoscope];
const accents = [
  "from-glow-cyan/50 to-iris-500/10",
  "from-iris-400/40 to-glow-magenta/15",
  "from-glow-magenta/40 to-iris-500/10",
  "from-glow-cyan/40 to-iris-700/10",
  "from-glow-magenta/35 to-iris-600/10",
  "from-iris-400/40 to-glow-cyan/15",
  "from-glow-cyan/40 to-glow-magenta/10",
  "from-glow-magenta/40 to-iris-400/10",
  "from-iris-500/40 to-glow-cyan/10",
];

export default function Services() {
  const { t, isRTL } = useT();

  return (
    <SectionScene id="services" tint="cyan" className="py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-8 sm:gap-10 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-glow-cyan">
                {t.services.kicker}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 sm:mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] sm:leading-[1.05]">
                {t.services.heading.pre}
                <span className="italic text-gradient">
                  {t.services.heading.em}
                </span>
                {t.services.heading.post}
                <br className="hidden sm:block" />{" "}
                {t.services.heading.line2}
              </h2>
            </Reveal>
          </div>
          <Reveal
            variant="fade"
            delay={0.2}
            className="max-w-sm text-sm sm:text-base text-white/65"
          >
            {t.services.intro}
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.services.items.map((s, i) => {
            const Icon = icons[i] || Sparkles;
            const accent = accents[i] || accents[0];
            return (
              <motion.div
                key={s.title + i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: (i % 3) * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                data-cursor="hover"
              >
                <TiltCard
                  className="group gradient-border p-6 sm:p-7 overflow-hidden cursor-pointer h-full"
                  max={7}
                >
                  <div
                    className={`absolute -top-20 ${isRTL ? "-left-20" : "-right-20"} w-56 h-56 rounded-full bg-gradient-to-br ${accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700`}
                  />
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: -10, scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-glow-cyan/10 border border-glow-cyan/30 flex items-center justify-center mb-5 sm:mb-6 group-hover:border-glow-cyan/70 group-hover:bg-glow-cyan/20 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-glow-cyan" />
                    </motion.div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-glow-cyan/60 mb-2">
                      {s.tag}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl mb-3 group-hover:text-gradient transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-white/65 leading-relaxed">
                      {s.desc}
                    </p>
                    <div className="mt-5 sm:mt-6 flex items-center gap-2 text-sm text-white/75 group-hover:text-glow-cyan transition-colors">
                      {t.services.learnMore}
                      <span
                        className={`transition-transform group-hover:${
                          isRTL ? "-translate-x-1" : "translate-x-1"
                        }`}
                      >
                        {isRTL ? "←" : "→"}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionScene>
  );
}
