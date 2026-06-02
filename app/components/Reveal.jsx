"use client";

import { motion } from "framer-motion";

/**
 * Reveal — drop-in scroll-into-view animation.
 *
 * Variants:
 *   "up"      — slide up + fade (legacy default)
 *   "fade"    — pure opacity
 *   "scale"   — zoom in
 *   "left"    — slide from left
 *   "right"   — slide from right
 *   "mask"    — clip-path curtain wipe (cinematic, slower)
 *   "rise"    — Hero-style rise from below an overflow mask
 *
 * Wrap any section piece (headline kicker, paragraph, card grid) in <Reveal>
 * to get a clean stagger when it scrolls into view.
 */
const EXPO_OUT = [0.16, 1, 0.3, 1];

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  left: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  // Mask variant uses clip-path: an inset that opens from bottom to top.
  // The container should be `overflow-hidden` (we set inline style) so the
  // wipe reads as a curtain rising.
  mask: {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.001 },
    show: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
  },
  rise: {
    hidden: { y: "100%" },
    show: { y: 0 },
  },
};

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration,
  className = "",
  once = true,
  ...rest
}) {
  // Mask variant looks best slower; auto-bump duration if caller didn't set one.
  const computedDuration = duration ?? (variant === "mask" ? 1.4 : 0.9);

  const M = motion[Tag] || motion.div;

  // For rise, the inner motion needs to be inside an overflow-hidden box.
  if (variant === "rise") {
    return (
      <span className={`inline-block overflow-hidden align-bottom ${className}`}>
        <motion.span
          initial="hidden"
          whileInView="show"
          viewport={{ once, margin: "-60px" }}
          variants={VARIANTS.rise}
          transition={{ duration: computedDuration, delay, ease: EXPO_OUT }}
          className="inline-block"
          {...rest}
        >
          {children}
        </motion.span>
      </span>
    );
  }

  return (
    <M
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={VARIANTS[variant] || VARIANTS.up}
      transition={{ duration: computedDuration, delay, ease: EXPO_OUT }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}
