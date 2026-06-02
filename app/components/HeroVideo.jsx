"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * HeroVideo — full-bleed cinematic background, frame-scrubbed by scroll.
 *
 * Performance notes:
 * • No blur() filters on the video element (GPU killer at full-bleed size).
 * • Overlays kept to 3 cheap solid/gradient layers.
 * • Single rAF gate on currentTime writes.
 * • On touch devices we fall back to autoplay loop (mobile can't seek smoothly).
 */
export default function HeroVideo({ src = "/hero.mp4", sectionRef }) {
  const videoRef = useRef(null);
  const localRef = useRef(null);
  // Always use a local positioned wrapper as the scroll target — this avoids
  // the "ref is not yet hydrated" warning when a parent ref is forwarded.
  const target = localRef;

  const [errored, setErrored] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        (window.matchMedia("(hover: none)").matches ||
          "ontouchstart" in window)
    );
  }, []);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  // Light spring — tight tracking, not floaty
  const smooth = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    mass: 0.25,
  });

  // Cheap scroll-driven cosmetics (no blur, no rotate, no letterbox)
  const scale = useTransform(smooth, [0, 1], [1.02, 1.12]);
  const veil = useTransform(smooth, [0, 1], [0.4, 0.85]);

  // Frame scrubbing
  useMotionValueEvent(smooth, "change", (p) => {
    if (errored || isTouch) return;
    const v = videoRef.current;
    if (!v || !duration) return;
    if (v._pending) return;
    v._pending = true;
    requestAnimationFrame(() => {
      try {
        const t = Math.min(duration - 0.001, Math.max(0, p * duration));
        if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
      } catch (_) {}
      v._pending = false;
    });
  });

  // Desktop = paused (scrubbed by scroll). Touch = autoplay loop.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    if (isTouch) {
      v.loop = true;
      v.autoplay = true;
      v.play().catch(() => {});
    } else {
      v.loop = false;
      v.autoplay = false;
      v.pause();
      try {
        v.currentTime = 0;
      } catch (_) {}
    }
  }, [isTouch, duration]);

  return (
    <div
      ref={localRef}
      aria-hidden
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      {!errored && !isTouch && (
        <motion.div
          style={{ scale }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              setDuration(e.currentTarget.duration || 0);
              try {
                e.currentTarget.currentTime = 0;
              } catch (_) {}
            }}
            onError={() => setErrored(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* single readability/grade gradient — opacity drives with scroll */}
      <motion.div
        style={{
          opacity: veil,
          background:
            "linear-gradient(180deg, rgba(3,28,18,0.75) 0%, rgba(3,28,18,0.45) 40%, rgba(3,18,11,0.95) 100%)",
        }}
        className="absolute inset-0"
      />
    </div>
  );
}
