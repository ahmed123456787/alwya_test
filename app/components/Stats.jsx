"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "./LanguageProvider";

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) =>
        setVal(to % 1 === 0 ? Math.round(v) : Math.round(v * 10) / 10),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useT();
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iris-900/15 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-5xl max-w-2xl mb-12 sm:mb-16 leading-tight"
        >
          {t.stats.heading.pre}
          <span className="text-gradient italic">{t.stats.heading.em}</span>
          {t.stats.heading.post}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-emerald-500/10 rounded-2xl overflow-hidden border border-emerald-500/15">
          {t.stats.items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="bg-ink-900 p-6 sm:p-8 lg:p-10 group cursor-default"
            >
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-gradient group-hover:scale-105 transition-transform origin-left">
                <Counter to={it.value} suffix={it.suffix} />
              </div>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/55">
                {it.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
