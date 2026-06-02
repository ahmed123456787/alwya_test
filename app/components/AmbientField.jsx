"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * AmbientField — a single page-wide aurora layer that morphs as you scroll.
 *
 * Why this exists:
 *   Without it, each section's entry animation feels like a separate "scene
 *   cut." With it, there's one continuous atmospheric layer that travels
 *   the entire page — a through-line that ties the cuts together.
 *
 * Three soft radial blobs (cyan, magenta, gold) drift across the viewport
 * along different scroll mappings so the composition never feels static.
 * The whole thing sits at -z-50 so it's behind everything, never blocks
 * pointer events, and obeys prefers-reduced-motion via globals.css.
 *
 * Performance: 3 fixed-position blurred divs. GPU comps the blur once,
 * then transform-only changes keep it on the compositor thread.
 */
export default function AmbientField() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 28,
    mass: 0.6,
  });

  // Cyan: drifts top-left → center → bottom-right across the page
  const cyanX = useTransform(smooth, [0, 0.5, 1], ["-10vw", "30vw", "60vw"]);
  const cyanY = useTransform(smooth, [0, 0.5, 1], ["-5vh", "40vh", "85vh"]);
  const cyanOpacity = useTransform(smooth, [0, 0.1, 0.9, 1], [0.55, 0.85, 0.85, 0.4]);
  const cyanScale = useTransform(smooth, [0, 0.5, 1], [1.1, 1, 1.2]);

  // Magenta: drifts bottom-right → top → bottom-left (counter motion)
  const magentaX = useTransform(smooth, [0, 0.4, 1], ["80vw", "20vw", "-10vw"]);
  const magentaY = useTransform(smooth, [0, 0.5, 1], ["85vh", "10vh", "70vh"]);
  const magentaOpacity = useTransform(smooth, [0, 0.2, 0.7, 1], [0.3, 0.6, 0.7, 0.4]);

  // Gold: appears mid-page, fades out near footer (subtle accent only)
  const goldOpacity = useTransform(smooth, [0, 0.35, 0.65, 1], [0, 0.5, 0.5, 0]);
  const goldX = useTransform(smooth, [0, 1], ["60vw", "10vw"]);
  const goldY = useTransform(smooth, [0, 1], ["60vh", "30vh"]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      <motion.div
        style={{
          x: cyanX,
          y: cyanY,
          opacity: cyanOpacity,
          scale: cyanScale,
          background:
            "radial-gradient(circle, rgba(94,255,155,0.22) 0%, rgba(94,255,155,0.06) 35%, transparent 65%)",
        }}
        className="absolute w-[85vw] h-[85vh] blur-3xl rounded-full will-change-transform"
      />
      <motion.div
        style={{
          x: magentaX,
          y: magentaY,
          opacity: magentaOpacity,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.05) 40%, transparent 65%)",
        }}
        className="absolute w-[70vw] h-[70vh] blur-3xl rounded-full will-change-transform"
      />
      <motion.div
        style={{
          x: goldX,
          y: goldY,
          opacity: goldOpacity,
          background:
            "radial-gradient(circle, rgba(250,204,21,0.14) 0%, rgba(250,204,21,0.04) 40%, transparent 65%)",
        }}
        className="absolute w-[55vw] h-[55vh] blur-3xl rounded-full will-change-transform"
      />
    </div>
  );
}
