"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { useT } from "./LanguageProvider";

/**
 * Marquee — scroll-velocity-driven horizontal scroller.
 *
 * Base speed: a slow constant drift (left-to-right rest cadence).
 * Boost:      scroll velocity is integrated in via a spring so fast scrolling
 *             punches the marquee into a sprint, then it eases back to base.
 * Direction:  scrolling down keeps it moving left; scrolling up briefly
 *             reverses direction for a satisfying "tug" effect.
 */
const BASE_VELOCITY = -1.4; // % per frame at rest (negative = leftward)

export default function Marquee() {
  const { t } = useT();
  // Duplicate items so the trailing copy can take over before the head wraps.
  const items = [...t.marquee, ...t.marquee, ...t.marquee];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Map raw px/s velocity into a unitless factor: 0 at rest, ±5 at sprint.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Wrap the x value so the marquee loops seamlessly. The track is 3 copies
  // wide; modulo into the middle copy's bounds.
  const x = useTransform(baseX, (v) => `${wrapPct(-33.333, 0, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * BASE_VELOCITY * (delta / 1000);

    // Scrolling reverses direction briefly; integrate velocity into the move.
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="marquee-wrap relative py-8 sm:py-12 border-y border-emerald-500/10 overflow-hidden bg-ink-900/40">
      <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {items.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-6 sm:gap-10 px-4 sm:px-6 whitespace-nowrap"
          >
            <span className="font-display text-2xl sm:text-3xl md:text-5xl text-white/10 hover:text-gradient transition-all duration-700">
              {p}
            </span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-glow-cyan/40" />
          </div>
        ))}
      </motion.div>
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-ink-950 to-transparent" />
    </section>
  );
}

// Tiny wrap helper — keeps a number within [min, max], wrapping around at edges.
function wrapPct(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}
