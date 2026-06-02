"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedEye() {
  const wrapRef = useRef(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.min(Math.hypot(dx, dy), 90);
      const angle = Math.atan2(dy, dx);
      setPupil({
        x: Math.cos(angle) * (dist / 90) * 28,
        y: Math.sin(angle) * (dist / 90) * 16,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[560px] aspect-square mx-auto"
    >
      {/* outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,255,155,0.22) 0%, rgba(0,0,0,0) 60%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-6 rounded-full border border-white/5 animate-spin-slower" />
      <div className="absolute inset-12 rounded-full border border-white/5 animate-spin-slow [animation-direction:reverse]" />

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="iris" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eff9b" />
            <stop offset="35%" stopColor="#34d399" />
            <stop offset="70%" stopColor="#047857" />
            <stop offset="100%" stopColor="#03120b" />
          </radialGradient>
          <radialGradient id="irisRing" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="75%" stopColor="rgba(250,204,21,0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="sclera" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0a0d18" />
            <stop offset="100%" stopColor="#05060a" />
          </linearGradient>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* sclera halo */}
        <circle cx="200" cy="200" r="170" fill="url(#sclera)" />

        {/* eye shape mask */}
        <clipPath id="eyeShape">
          <path d="M40,200 Q200,40 360,200 Q200,360 40,200 Z" />
        </clipPath>

        <g clipPath="url(#eyeShape)">
          {/* eye white */}
          <rect width="400" height="400" fill="#f5f7ff" />

          {/* iris */}
          <g
            style={{
              transform: `translate(${pupil.x}px, ${pupil.y}px)`,
              transition: "transform 0.18s ease-out",
            }}
          >
            <circle cx="200" cy="200" r="78" fill="url(#iris)" />
            {/* iris fibers */}
            {Array.from({ length: 36 }).map((_, i) => {
              const a = (i / 36) * Math.PI * 2;
              const x1 = 200 + Math.cos(a) * 30;
              const y1 = 200 + Math.sin(a) * 30;
              const x2 = 200 + Math.cos(a) * 76;
              const y2 = 200 + Math.sin(a) * 76;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
              );
            })}
            {/* pupil */}
            <circle cx="200" cy="200" r="28" fill="#05060a" />
            {/* highlights */}
            <circle cx="182" cy="184" r="9" fill="#fff" />
            <circle cx="216" cy="210" r="3" fill="#fff" opacity="0.8" />
          </g>

          {/* veins / shadow */}
          <path
            d="M60,200 Q120,160 200,170"
            stroke="rgba(0,0,0,0.05)"
            fill="none"
            strokeWidth="1"
          />
        </g>

        {/* eye outline */}
        <path
          d="M40,200 Q200,40 360,200 Q200,360 40,200 Z"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
        />

        {/* eyelid blink */}
        <g
          style={{
            transformOrigin: "200px 200px",
            transform: blink ? "scaleY(1)" : "scaleY(0)",
            transition: blink
              ? "transform 0.08s ease-in"
              : "transform 0.18s ease-out",
          }}
        >
          <path
            d="M40,200 Q200,40 360,200 Q200,360 40,200 Z"
            fill="url(#lid)"
          />
        </g>

        {/* scan ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="rgba(94,255,155,0.55)"
          strokeDasharray="6 14"
          strokeWidth="1"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="rgba(250,204,21,0.3)"
          strokeDasharray="2 10"
          strokeWidth="1"
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
      </svg>

      {/* labels floating around — animated entry + gentle float */}
      {[
        { t: "20/20 vision", x: "4%", y: "8%", d: 0 },
        { t: "SMILE PRO ready", x: "72%", y: "14%", d: 0.4 },
        { t: "Cornea · stable", x: "78%", y: "78%", d: 0.8 },
        { t: "Retina · clear", x: "2%", y: "76%", d: 1.2 },
      ].map((l, i) => (
        <motion.div
          key={l.t}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1 + l.d, duration: 0.8 }}
          style={{ left: l.x, top: l.y }}
          className="absolute data-tag animate-leaf"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            className="block"
          >
            {l.t}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
