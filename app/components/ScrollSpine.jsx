"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useT } from "./LanguageProvider";

/**
 * ScrollSpine — chapter-aware vertical indicator on the right edge.
 *
 * What it does:
 *   • A vertical hairline runs down the right side at viewport center.
 *   • A glowing pip travels along it as you scroll (driven by scrollYProgress).
 *   • Six chapter markers (Hero, Services, Doctor, About, Patients, Contact)
 *     are spaced along the line. The one nearest the pip "lights up" and
 *     shows its label.
 *   • Each marker is clickable — jumps to that section.
 *
 * Desktop only (lg+). On mobile the top ScrollProgress bar suffices; a
 * sidebar on a small screen would eat tap real estate.
 */
const CHAPTERS = [
  { id: "hero",         num: "00", key: "open" },
  { id: "services",     num: "01", key: "services" },
  { id: "doctors",      num: "02", key: "doctor" },
  { id: "about",        num: "03", key: "about" },
  { id: "testimonials", num: "04", key: "patients" },
  { id: "contact",      num: "05", key: "contact" },
];

export default function ScrollSpine() {
  const { t } = useT();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
  });

  const [activeIdx, setActiveIdx] = useState(0);

  // Track scrollY → pixel position to detect which section is in view.
  useEffect(() => {
    const ids = CHAPTERS.map((c) => c.id);
    const observe = () => {
      let bestIdx = 0;
      let bestDist = Infinity;
      const viewportCenter = window.innerHeight / 2;
      ids.forEach((id, i) => {
        // "hero" doesn't have an explicit id — fall back to top of page
        const el = id === "hero" ? document.body : document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActiveIdx(bestIdx);
    };
    observe();
    window.addEventListener("scroll", observe, { passive: true });
    window.addEventListener("resize", observe);
    return () => {
      window.removeEventListener("scroll", observe);
      window.removeEventListener("resize", observe);
    };
  }, []);

  const labelFor = (key) => {
    // Pull the same labels used by the navbar for consistency
    return (
      t.nav?.[key] ||
      ({
        open: "Open",
        services: "Services",
        doctor: "The Doctor",
        about: "About",
        patients: "Patients",
        contact: "Contact",
      })[key]
    );
  };

  // Pip Y position along the spine (the spine itself is 60vh tall).
  const pipY = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <aside
      aria-hidden
      className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-30 flex-col items-center"
    >
      {/* The line + traveling pip */}
      <div className="relative w-px h-[55vh] bg-white/8">
        <motion.div
          style={{ top: pipY }}
          className="absolute -translate-y-1/2 -left-[3px] w-[7px] h-[7px] rounded-full bg-glow-cyan shadow-[0_0_12px_2px_rgba(94,255,155,0.7)]"
        />

        {/* Chapter dots */}
        {CHAPTERS.map((c, i) => {
          const pct = (i / (CHAPTERS.length - 1)) * 100;
          const isActive = i === activeIdx;
          return (
            <a
              key={c.id}
              href={`#${c.id === "hero" ? "" : c.id}`}
              onClick={(e) => {
                if (c.id === "hero") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              aria-label={`Jump to ${labelFor(c.key)}`}
              className={`absolute -left-[5px] w-[11px] h-[11px] rounded-full border transition-all duration-300 pointer-events-auto cursor-pointer ${
                isActive
                  ? "bg-glow-cyan border-glow-cyan scale-100"
                  : "bg-ink-950 border-white/20 hover:border-glow-cyan/70 scale-75 hover:scale-100"
              }`}
              style={{ top: `${pct}%`, transform: "translateY(-50%) translateY(0)" }}
            >
              {/* Floating label, visible only when active */}
              <span
                className={`absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                  isActive
                    ? "opacity-100 text-glow-cyan translate-x-0"
                    : "opacity-0 text-white/40 translate-x-2"
                }`}
              >
                <span className="mr-3 font-mono text-white/30">{c.num}</span>
                {labelFor(c.key)}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
