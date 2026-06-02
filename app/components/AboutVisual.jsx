"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * AboutVisual — "Refraction Reveal" (v3, clinical)
 *
 * The previous version overlapped the word with a lens path and ended in a
 * particle burst (read as celebratory, off-brand for ophthalmology).
 *
 * New 4-phase loop (~9s, no particles):
 *   1. CALIBRATE (1.8s) — 8 rays sweep inward in a symmetric starburst, a
 *      vertical scan-line passes once across the field.
 *   2. WRITE     (3.4s) — إبصار is drawn as a gold stroked outline, then the
 *      gold fill bleeds in. The word stands alone — no lens behind it.
 *   3. HOLD      (2.4s) — rays recede gracefully, leaving the clear word with
 *      a soft breathing glow.
 *   4. FADE      (1.4s) — the word fades smoothly out; the scan-line returns.
 *
 * Performance notes
 *   • Pure SVG primitives — no filters, no blur, no canvas.
 *   • IntersectionObserver pauses the entire loop when off-screen.
 *   • Seeded math so SSR & client positions match (no hydration mismatch).
 *
 * Layout (within a -50..50 viewBox)
 *   • Top band     y = -43 : "DIAGNOSTIC · SCAN" HUD label + pulsing dot
 *   • Center       y =  0  : word + rays + scan line
 *   • Bottom band  y = +41 : multilingual caption ticker
 *   • Corners ±44         : calibration crosshairs
 */
export default function AboutVisual() {
  const wrapRef = useRef(null);
  const [phase, setPhase] = useState(0); // 0 calibrate, 1 write, 2 hold, 3 fade
  const [captionIdx, setCaptionIdx] = useState(0);
  const [inView, setInView] = useState(false);

  // ---- cursor parallax → 3D tilt (subtle)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(my, { stiffness: 90, damping: 18 });
  const rotY = useSpring(mx, { stiffness: 90, damping: 18 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      mx.set(Math.max(-1, Math.min(1, dx)) * 6);
      my.set(Math.max(-1, Math.min(1, dy)) * -5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // ---- viewport gate
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // ---- 4-phase loop
  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setPhase(0); await wait(1800); // calibrate
        if (cancelled) return;
        setPhase(1); await wait(3400); // write
        if (cancelled) return;
        setPhase(2); await wait(2400); // hold
        if (cancelled) return;
        setPhase(3); await wait(1400); // fade
      }
    };
    run();
    return () => { cancelled = true; };
  }, [inView]);

  // ---- caption ticker
  const captions = ["VISION", "وضوح", "CLARITY", "إبصار", "VOIR"];
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(
      () => setCaptionIdx((i) => (i + 1) % captions.length),
      2200
    );
    return () => clearInterval(id);
  }, [inView, captions.length]);

  // ---- 8 symmetric rays
  const rays = useMemo(
    () => Array.from({ length: 8 }, (_, i) => (i * 360) / 8),
    []
  );

  // word is visible during WRITE (1) and HOLD (2); fades during FADE (3); hidden during CALIBRATE (0)
  const wordFill   = phase === 1 || phase === 2 ? 1 : 0;
  const wordStroke = phase === 0 ? 200 : 0; // stroke-dashoffset
  const showRays   = phase === 0 || phase === 1;

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square max-w-[340px] sm:max-w-md lg:max-w-xl mx-auto w-full"
      style={{ perspective: 900 }}
    >
      <motion.svg
        viewBox="-50 -50 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="goldFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f5e6a8" />
            <stop offset="55%"  stopColor="#deb549" />
            <stop offset="100%" stopColor="#8a6a1a" />
          </linearGradient>
          <linearGradient id="rayStroke" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="rgba(94,255,155,0)" />
            <stop offset="55%"  stopColor="rgba(94,255,155,0.85)" />
            <stop offset="100%" stopColor="rgba(222,181,73,1)" />
          </linearGradient>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(222,181,73,0.30)" />
            <stop offset="60%"  stopColor="rgba(222,181,73,0.07)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* ambient contour rings */}
        {[44, 38].map((r, i) => (
          <motion.circle
            key={r}
            cx="0" cy="0" r={r}
            fill="none"
            stroke="rgba(94,255,155,0.12)"
            strokeWidth="0.18"
            strokeDasharray={i === 0 ? "0.6 1.4" : "0.3 1.0"}
            initial={{ rotate: 0 }}
            animate={inView ? { rotate: i ? -360 : 360 } : {}}
            transition={{ duration: 50 + i * 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0 0" }}
          />
        ))}

        {/* top HUD label */}
        <g transform="translate(-9, -43)">
          <motion.circle
            cx="-3" cy="0" r="0.8"
            fill="#5effa3"
            animate={inView ? { opacity: [0.3, 1, 0.3] } : {}}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <text
            x="0" y="0"
            textAnchor="start"
            dominantBaseline="middle"
            fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
            fontSize="2.6"
            fill="rgba(94,255,155,0.7)"
            letterSpacing="1.2"
          >
            DIAGNOSTIC · SCAN
          </text>
        </g>

        {/* breathing halo behind the word during HOLD phase */}
        <motion.circle
          cx="0" cy="0" r="22"
          fill="url(#halo)"
          animate={{
            opacity: phase === 2 ? [0.55, 0.85, 0.55] : phase === 1 ? 0.5 : 0,
          }}
          transition={{
            duration: phase === 2 ? 2.4 : 0.8,
            repeat: phase === 2 ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* 8 symmetric starburst rays */}
        {rays.map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const r2 = (n) => Math.round(n * 100) / 100;
          const x1 = r2(Math.cos(rad) * 42);
          const y1 = r2(Math.sin(rad) * 42);
          const x2 = r2(Math.cos(rad) * 18);
          const y2 = r2(Math.sin(rad) * 18);
          const len = r2(Math.hypot(x2 - x1, y2 - y1));
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#rayStroke)"
              strokeWidth="0.32"
              strokeLinecap="round"
              style={{ strokeDasharray: len }}
              initial={{ strokeDashoffset: len, opacity: 0 }}
              animate={
                phase === 0
                  ? { strokeDashoffset: 0, opacity: 1 }
                  : phase === 1
                  ? { strokeDashoffset: 0, opacity: 0.55 }
                  : { strokeDashoffset: len, opacity: 0 }
              }
              transition={{
                strokeDashoffset: {
                  duration: phase === 0 ? 1.5 : phase === 2 || phase === 3 ? 1.2 : 0.8,
                  delay: (i % 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: { duration: 0.6, delay: (i % 4) * 0.07 },
              }}
            />
          );
        })}

        {/* vertical scan line — sweeps once during CALIBRATE, once during FADE */}
        <motion.line
          x1="0" y1="-32" x2="0" y2="32"
          stroke="rgba(94,255,155,0.55)"
          strokeWidth="0.25"
          initial={{ x: -32, opacity: 0 }}
          animate={
            phase === 0 || phase === 3
              ? { x: [-32, 32], opacity: [0, 1, 0] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.6, ease: "easeInOut", times: [0, 0.5, 1] }}
        />

        {/* the Arabic word — solo, no lens behind it */}
        <motion.text
          x="0" y="0"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'Tajawal', 'Cairo', sans-serif"
          fontSize="24"
          fontWeight="700"
          fill="url(#goldFill)"
          stroke="rgba(222,181,73,0.95)"
          strokeWidth="0.32"
          dir="rtl"
          lang="ar"
          initial={{ fillOpacity: 0, strokeDasharray: 200, strokeDashoffset: 200 }}
          animate={{
            fillOpacity: wordFill,
            strokeDashoffset: wordStroke,
          }}
          transition={{
            strokeDashoffset: {
              duration: phase === 1 ? 2.4 : 0.6,
              ease: phase === 1 ? "easeOut" : "easeIn",
            },
            fillOpacity: {
              duration: phase === 1 ? 1.2 : phase === 3 ? 1.4 : 0.4,
              delay: phase === 1 ? 1.4 : 0,
              ease: phase === 3 ? "easeIn" : "easeOut",
            },
          }}
        >
          إبصار
        </motion.text>

        {/* bottom caption ticker */}
        <g transform="translate(0, 41)">
          <text
            x="0" y="-4"
            textAnchor="middle"
            fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
            fontSize="2.2"
            fill="rgba(94,255,155,0.5)"
            letterSpacing="1.8"
          >
            TO SEE
          </text>
          {captions.map((c, i) => (
            <motion.text
              key={c}
              x="0" y="2.5"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="'Tajawal', 'Cairo', ui-monospace, monospace"
              fontSize="3.6"
              fontWeight="500"
              fill="#5effa3"
              letterSpacing="1.4"
              initial={false}
              animate={{
                opacity: i === captionIdx ? 1 : 0,
                y:
                  i === captionIdx
                    ? 2.5
                    : i === (captionIdx - 1 + captions.length) % captions.length
                    ? 0
                    : 5,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {c}
            </motion.text>
          ))}
        </g>

        {/* corner calibration ticks */}
        {[[-44, -44], [44, -44], [-44, 44], [44, 44]].map(([x, y], i) => (
          <g key={i} stroke="rgba(94,255,155,0.5)" strokeWidth="0.22">
            <line x1={x - 1.6} y1={y} x2={x + 1.6} y2={y} />
            <line x1={x} y1={y - 1.6} x2={x} y2={y + 1.6} />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
