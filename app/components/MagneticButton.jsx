"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * MagneticButton — a button-like element whose contents subtly follow the cursor.
 * Drop in like an <a>: href, onClick, children, className all forwarded.
 */
export default function MagneticButton({
  as: Tag = "a",
  href,
  onClick,
  children,
  className = "",
  strength = 0.35,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  // inner content has a softer follow (more responsive)
  const ix = useTransform(sx, (v) => v * 0.4);
  const iy = useTransform(sy, (v) => v * 0.4);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[Tag] || motion.a;

  return (
    <MotionTag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
      data-cursor="hover"
      {...rest}
    >
      <motion.span style={{ x: ix, y: iy }} className="inline-flex items-center gap-3 pointer-events-none">
        {children}
      </motion.span>
    </MotionTag>
  );
}
