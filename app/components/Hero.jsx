"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeft, Play, Sparkles } from "lucide-react";
import HeroVideo from "./HeroVideo";
import MagneticButton from "./MagneticButton";
import { useT } from "./LanguageProvider";

// Character-level entrance: each glyph rises from below its own mask line,
// with a tight stagger that adds a typewriter-on-film cadence.
// Arabic stays at word-level (see render branch) — splitting Arabic
// characters destroys ligature shaping (e.g. "ال" becomes 2 disconnected
// glyphs instead of the joined form).
const charVariant = {
  hidden: { y: "115%", opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.25 + i * 0.035,
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Build a word-grouped structure for the headline so words wrap as units
// (otherwise inline-block per-char spans let the browser break mid-word —
// "anew" became "ane / w" on narrow viewports).
// Returns: [{ word, chars: [{ char, idx, isEmphasized }], isEmphasized }, ...]
function splitForChars(words, emphasizedWord) {
  let runningIdx = 0;
  return words.map((w) => {
    const isEm = w === emphasizedWord;
    const chars = [];
    for (const ch of w) {
      chars.push({ char: ch, idx: runningIdx++, isEmphasized: isEm });
    }
    return { word: w, chars, isEmphasized: isEm };
  });
}

export default function Hero() {
  const { t, isRTL, locale } = useT();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content parallax — text rises and fades as you scroll past
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // Tags drift gently with scroll
  const tagsY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const tagsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const tags = [
    { t: t.hero.tags?.[0] || "20/20 vision",    pos: "top-24 left-6 sm:top-28 sm:left-10" },
    { t: t.hero.tags?.[1] || "SMILE PRO ready", pos: "top-24 right-6 sm:top-28 sm:right-10" },
    { t: t.hero.tags?.[2] || "Cornea · stable", pos: "bottom-24 right-6 sm:bottom-28 sm:right-10" },
    { t: t.hero.tags?.[3] || "Retina · clear",  pos: "bottom-24 left-6 sm:bottom-28 sm:left-10" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-20 lg:pb-24 overflow-hidden isolate"
    >
      {/* ---------- LAYER 1: full-bleed video background ---------- */}
      <HeroVideo sectionRef={ref} />

      {/* ---------- LAYER 3: floating tags around the section ---------- */}
      <motion.div
        style={{ y: tagsY, opacity: tagsOpacity }}
        className="absolute inset-0 pointer-events-none z-20 hidden sm:block"
      >
        {tags.map((tag, i) => (
          <motion.div
            key={tag.t}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.25, duration: 0.8 }}
            className={`absolute ${tag.pos} data-tag`}
          >
            {tag.t}
          </motion.div>
        ))}
      </motion.div>

      {/* ---------- LAYER 4: hero content ---------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-30 mx-auto max-w-5xl px-5 sm:px-6 lg:px-10 text-center flex flex-col items-center will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-glow-cyan/30 bg-glow-cyan/10 px-3 py-1.5 text-[11px] sm:text-xs text-glow-cyan/95 mb-6 sm:mb-8 max-w-full"
        >
          <Sparkles className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{t.hero.kicker}</span>
        </motion.div>

        <h1 className="font-display text-[2.8rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] leading-[0.95] tracking-tight max-w-4xl">
          {locale === "ar" ? (
            // Arabic: word-level rise (character splitting would break ligatures).
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="block"
            >
              {t.hero.headlineWords.slice(0, -1).join(" ")}{" "}
              <span className="italic text-gradient">
                {t.hero.emphasizedWord}
              </span>
            </motion.span>
          ) : (
            // Latin: character-by-character rise. CRITICAL: each WORD is
            // wrapped in `inline-block whitespace-nowrap` so the browser
            // breaks BETWEEN words but never inside one (previously "anew"
            // would split to "ane / w" on narrow viewports). Per-character
            // overflow-hidden masks keep the rise effect intact.
            splitForChars(t.hero.headlineWords, t.hero.emphasizedWord).map((wordObj, wi, arr) => (
              <span key={`w-${wi}`} className="inline-block">
                <span className="inline-block whitespace-nowrap align-bottom">
                  {wordObj.chars.map((c) => (
                    <span
                      key={`c-${c.idx}`}
                      className="inline-block overflow-hidden align-bottom"
                      aria-hidden="true"
                    >
                      <motion.span
                        variants={charVariant}
                        initial="hidden"
                        animate="show"
                        custom={c.idx}
                        className={`inline-block ${c.isEmphasized ? "italic text-gradient" : ""}`}
                      >
                        {c.char}
                      </motion.span>
                    </span>
                  ))}
                </span>
                {/* word separator — a regular breaking space between words */}
                {wi < arr.length - 1 && <span>&nbsp;</span>}
              </span>
            ))
          )}
          {/* Screen-reader friendly: provide the full headline as plain text
              once, since the per-char spans above are decorative. */}
          {locale !== "ar" && (
            <span className="sr-only">{t.hero.headlineWords.join(" ")}</span>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed"
        >
          {t.hero.paragraph.intro}
          <span className="text-glow-cyan">
            {t.hero.paragraph.highlight}
          </span>
          {t.hero.paragraph.outro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <MagneticButton
            href="/booking"
            className="rounded-full bg-glow-cyan text-ink-950 px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-[0_0_40px_-5px_rgba(94,255,155,0.6)] hover:shadow-[0_0_60px_-5px_rgba(94,255,155,0.85)] transition-shadow"
          >
            <span>{t.hero.cta}</span>
            <Arrow className="w-4 h-4" />
          </MagneticButton>
          <a
            href="#services"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-glow-cyan/30 bg-ink-950/40 px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:border-glow-cyan/60 transition-colors"
          >
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-glow-cyan/40 flex items-center justify-center group-hover:bg-glow-cyan/10 transition-colors">
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5 text-glow-cyan" />
            </span>
            {t.hero.cta2}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/55"
        >
          {t.hero.trust.map((p, i) => (
            <span key={p} className="flex items-center gap-x-4 sm:gap-x-6">
              {p}
              {i < t.hero.trust.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-glow-cyan/40 ml-4 sm:ml-6" />
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ---------- LAYER 5: scroll hint ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 sm:bottom-6 inset-x-0 hidden sm:flex justify-center z-30"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.4em] text-glow-cyan/60 uppercase">
          {t.hero.scroll}
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="block w-px h-10 bg-gradient-to-b from-glow-cyan/70 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
