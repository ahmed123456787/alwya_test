"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { GraduationCap, Stethoscope, Award, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import SectionScene from "./SectionScene";
import { useT } from "./LanguageProvider";

const icons = [GraduationCap, Stethoscope, Award, MapPin];

/**
 * Doctors — desktop: pinned portrait + scrubbed credentials.
 *
 *  On desktop (lg+), the section is taller than the viewport (~180vh) so
 *  there's scroll runway. The portrait sticks to the viewport center while
 *  credentials and bio panels rise into place as you scroll. The portrait
 *  itself also responds — slight scale + emerald color-grade intensifies as
 *  you move through the section, then eases out.
 *
 *  On mobile, the layout falls back to the previous stacked design (portrait
 *  on top, bio + credentials below). No sticky scrubbing — phones can't
 *  spare the scroll runway or the rAF budget for it.
 */
export default function Doctors() {
  const { t } = useT();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // Portrait choreography (desktop only — refs ignored at mobile via hidden lg:block)
  const portraitScale = useTransform(smooth, [0, 0.5, 1], [1.0, 1.05, 1.02]);
  const gradeOpacity = useTransform(smooth, [0, 0.4, 0.8, 1], [0.25, 0.5, 0.55, 0.7]);
  const namePlateY = useTransform(smooth, [0, 0.3], ["20px", "0px"]);
  const namePlateOpacity = useTransform(smooth, [0.05, 0.25], [0, 1]);
  const bioOpacity = useTransform(smooth, [0.3, 0.5], [0, 1]);
  const bioY = useTransform(smooth, [0.3, 0.5], ["20px", "0px"]);

  // Credentials — each card has its own entry window along scroll progress.
  // Spread 0.35 → 0.85 across the 4 cards.
  const credWindows = [
    [0.35, 0.45],
    [0.45, 0.55],
    [0.55, 0.65],
    [0.65, 0.75],
  ];

  return (
    <SectionScene
      id="doctors"
      tint="magenta"
      className="relative overflow-hidden lg:min-h-[180vh]"
    >
      <div ref={ref} className="relative">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-20 sm:py-28 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_auto] items-end gap-8 sm:gap-10 mb-12 sm:mb-16">
            <div>
              <Reveal>
                <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-glow-magenta">
                  {t.doctors.kicker}
                </span>
              </Reveal>
              <Reveal delay={0.1} variant="mask">
                <h2 className="mt-3 sm:mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] sm:leading-[1.05]">
                  {t.doctors.heading.pre}
                  <br />
                  {t.doctors.heading.line2pre}
                  <span className="italic text-gradient">
                    {t.doctors.heading.em}
                  </span>
                  {t.doctors.heading.line2post}
                </h2>
              </Reveal>
            </div>
            <Reveal variant="right" delay={0.2}>
              <a
                href="/booking"
                className="hidden lg:inline-flex items-center gap-3 rounded-full border border-glow-cyan/30 px-5 py-3 text-sm hover:border-glow-cyan/70 hover:bg-glow-cyan/5 transition-colors"
              >
                {t.doctors.cta}
              </a>
            </Reveal>
          </div>

          {/* ------ MOBILE (lg:hidden): original stacked layout, no scrub ------ */}
          <div className="lg:hidden">
            <Reveal variant="left" duration={1}>
              <div>
                <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-emerald-500/20 bg-ink-900">
                  <img
                    src="/doctor.png"
                    alt={t.doctors.name}
                    className="absolute inset-0 w-full h-full object-cover object-[center_18%] sm:object-[center_top]"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(3,40,24,0.7) 0%, rgba(5,46,30,0.2) 50%, rgba(3,18,11,0.85) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(3,18,11,0) 45%, rgba(3,18,11,0.75) 80%, rgba(3,18,11,0.95) 100%)",
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute left-4 right-4 bottom-4 rounded-xl bg-ink-950/85 backdrop-blur-md border border-emerald-500/25 px-4 py-3 z-10"
                  >
                    <p className="text-[9px] tracking-[0.3em] uppercase text-glow-cyan/70">
                      {t.doctors.leadLabel}
                    </p>
                    <h3 className="font-display text-xl mt-0.5">{t.doctors.name}</h3>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="mt-4 rounded-2xl border border-emerald-500/15 bg-white/3 p-5"
                >
                  <p className="text-sm text-white/75 leading-relaxed">
                    {t.doctors.bio}
                  </p>
                </motion.div>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {t.doctors.credentials.map((c, i) => {
                const Icon = icons[i] || GraduationCap;
                return (
                  <motion.div
                    key={c.title + i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -6 }}
                    className="gradient-border p-5 sm:p-6 group cursor-default"
                    data-cursor="hover"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-glow-cyan/10 border border-glow-cyan/30 flex items-center justify-center mb-3 sm:mb-4 group-hover:rotate-6 transition-transform">
                      <Icon className="w-5 h-5 text-glow-cyan" />
                    </div>
                    <h4 className="font-display text-lg sm:text-xl mb-1">
                      {c.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                      {c.detail}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ------ DESKTOP (lg+): pinned portrait + scrubbed credentials ------ */}
          <div className="hidden lg:grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
            {/* LEFT: sticky portrait pins as credentials scroll past on the right */}
            <div className="sticky top-32 self-start">
              <motion.div
                style={{ scale: portraitScale }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-emerald-500/20 bg-ink-900 will-change-transform"
              >
                <img
                  src="/doctor.png"
                  alt={t.doctors.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />

                {/* Emerald color grade — intensifies as you scroll through */}
                <motion.div
                  style={{ opacity: gradeOpacity }}
                  className="absolute inset-0 pointer-events-none mix-blend-multiply"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(3,40,24,0.85) 0%, rgba(5,46,30,0.25) 50%, rgba(3,18,11,0.95) 100%)",
                    }}
                  />
                </motion.div>

                {/* Bottom darkening for legibility */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(3,18,11,0) 40%, rgba(3,18,11,0.7) 75%, rgba(3,18,11,0.95) 100%)",
                  }}
                />

                {/* Name plate — fades in early */}
                <motion.div
                  style={{ y: namePlateY, opacity: namePlateOpacity }}
                  className="absolute left-5 right-5 bottom-5 rounded-2xl bg-ink-950/90 backdrop-blur-xl border border-emerald-500/25 p-5 z-10"
                >
                  <p className="text-xs tracking-[0.3em] uppercase text-glow-cyan/70 mb-2">
                    {t.doctors.leadLabel}
                  </p>
                  <h3 className="font-display text-3xl">{t.doctors.name}</h3>
                  <motion.p
                    style={{ y: bioY, opacity: bioOpacity }}
                    className="mt-4 text-sm text-white/75 leading-relaxed"
                  >
                    {t.doctors.bio}
                  </motion.p>
                </motion.div>

                {/* Light sweep over the photo */}
                <div className="pointer-events-none absolute inset-0 mix-blend-overlay">
                  <div className="absolute -top-10 left-0 w-full h-32 animate-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl" />
                </div>
              </motion.div>
            </div>

            {/* RIGHT: credentials stack — each card scrubs in on its own window */}
            <div className="space-y-6 lg:pt-8">
              {t.doctors.credentials.map((c, i) => {
                const Icon = icons[i] || GraduationCap;
                return (
                  <ScrubCard
                    key={c.title + i}
                    smooth={smooth}
                    window={credWindows[i] || [0.3 + i * 0.1, 0.5 + i * 0.1]}
                    icon={Icon}
                    title={c.title}
                    detail={c.detail}
                  />
                );
              })}

              {/* Closing CTA at the bottom of the scrub */}
              <ClosingCta smooth={smooth} cta={t.doctors.cta} />
            </div>
          </div>
        </div>
      </div>
    </SectionScene>
  );
}

/** ScrubCard — one credential, animated based on a window of scroll progress. */
function ScrubCard({ smooth, window, icon: Icon, title, detail }) {
  const [start, end] = window;
  const y = useTransform(smooth, [start, end], [60, 0]);
  const opacity = useTransform(smooth, [start, (start + end) / 2, end, 1], [0, 1, 1, 0.85]);
  const scale = useTransform(smooth, [start, end], [0.96, 1]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="gradient-border p-7 group cursor-default will-change-transform"
      data-cursor="hover"
    >
      <div className="w-12 h-12 rounded-xl bg-glow-cyan/10 border border-glow-cyan/30 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
        <Icon className="w-5 h-5 text-glow-cyan" />
      </div>
      <h4 className="font-display text-xl mb-1.5">{title}</h4>
      <p className="text-sm text-white/65 leading-relaxed">{detail}</p>
    </motion.div>
  );
}

/** ClosingCta — final reveal after the credentials, near the end of the scrub. */
function ClosingCta({ smooth, cta }) {
  const y = useTransform(smooth, [0.78, 0.9], [40, 0]);
  const opacity = useTransform(smooth, [0.78, 0.9], [0, 1]);

  return (
    <motion.a
      href="/booking"
      style={{ y, opacity }}
      className="inline-flex items-center gap-3 rounded-full bg-glow-cyan text-ink-950 px-7 py-4 text-base font-semibold shadow-[0_0_40px_-5px_rgba(94,255,155,0.6)] hover:shadow-[0_0_60px_-5px_rgba(94,255,155,0.85)] transition-shadow mt-2"
    >
      {cta}
      <span aria-hidden>→</span>
    </motion.a>
  );
}
