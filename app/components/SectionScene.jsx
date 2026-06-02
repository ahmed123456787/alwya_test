"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * SectionScene — choreographed entry wrapper for a top-level section.
 *
 * What it does as the section scrolls into view:
 *   1. An aurora gradient pulses up from below (radial, brand-tinted).
 *   2. A thin horizontal "scene line" draws itself across the top.
 *   3. Children fade up with a single shared timing (caller controls layout).
 *
 * Usage:
 *   <SectionScene id="services" tint="cyan">
 *     ...your section content...
 *   </SectionScene>
 *
 * Tints: "cyan" (default), "magenta", "gold".
 */
const TINTS = {
  cyan: "rgba(94,255,155,0.18)",
  magenta: "rgba(232,121,249,0.16)",
  gold: "rgba(250,204,21,0.12)",
};

export default function SectionScene({
  children,
  id,
  tint = "cyan",
  className = "",
  pulseSize = "60vw",
}) {
  const ref = useRef(null);
  // Track scroll progress through the section so the aurora can ride along.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // Aurora: rises into view (translateY) and dims as the section exits.
  const auroraY = useTransform(smooth, [0, 0.25, 0.75, 1], ["20%", "-2%", "-8%", "-25%"]);
  const auroraOpacity = useTransform(smooth, [0, 0.2, 0.7, 1], [0, 1, 1, 0]);
  const auroraScale = useTransform(smooth, [0, 0.5, 1], [0.85, 1.05, 1.15]);

  // Scene line: width draws from 0 → 100% as you enter the section.
  const lineScaleX = useTransform(smooth, [0, 0.2], [0, 1]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative isolate ${className}`}
    >
      {/* Aurora pulse — sits behind everything, never blocks pointer events */}
      <motion.div
        aria-hidden
        style={{
          y: auroraY,
          opacity: auroraOpacity,
          scale: auroraScale,
          width: pulseSize,
          height: pulseSize,
          background: `radial-gradient(circle, ${TINTS[tint] || TINTS.cyan} 0%, transparent 65%)`,
        }}
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 blur-3xl -z-10"
      />

      {/* Scene line — a thin emerald hairline that draws across the top */}
      <motion.div
        aria-hidden
        style={{ scaleX: lineScaleX, transformOrigin: "left center" }}
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-glow-cyan/40 to-transparent"
      />

      {children}
    </section>
  );
}
