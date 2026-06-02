"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Eye } from "lucide-react";
import MagneticButton from "./MagneticButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "./LanguageProvider";

export default function Navbar() {
  const { t, isRTL } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoOk, setLogoOk] = useState(false);

  // Probe for /logo.png. If it loads cleanly, swap in the real logo.
  // If it 404s, stay on the text fallback — no broken icon ever appears.
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogoOk(true);
    img.onerror = () => setLogoOk(false);
    img.src = "/logo.png";
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open — without this, the page
  // underneath can scroll behind the overlay and the layout looks broken on
  // small viewports.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    // Compensate for the scrollbar disappearing so the page doesn't shift
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  // Close the mobile menu on Escape — easy out for accidental opens.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "#services",     label: t.nav.services },
    { href: "#doctors",      label: t.nav.doctor },
    { href: "#about",        label: t.nav.about },
    { href: "#testimonials", label: t.nav.patients },
    { href: "/booking",      label: t.nav.appointment },
  ];

  return (
    <>
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ink-950/75 border-b border-emerald-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-28 sm:h-32 flex items-center justify-between gap-2">
        <a href="/" className="relative flex items-center gap-2 sm:gap-3 group flex-shrink-0" aria-label="Ibsar Center — home">
          {logoOk ? (
            <span className="relative inline-block">
              {/* soft emerald halo so the logo reads against any backdrop */}
              <span
                aria-hidden
                className="absolute inset-0 -m-3 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "radial-gradient(circle, rgba(94,255,155,0.40) 0%, rgba(94,255,155,0) 70%)",
                }}
              />
              <img
                src="/logo.png"
                alt="Ibsar Center"
                className="relative h-20 sm:h-24 lg:h-28 w-auto object-contain"
                style={{ filter: "brightness(1.15) contrast(1.05) drop-shadow(0 2px 14px rgba(0,0,0,0.5))" }}
              />
            </span>
          ) : (
            <>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-glow-cyan via-iris-500 to-glow-magenta flex items-center justify-center"
              >
                <Eye className="w-4 h-4 text-ink-950" strokeWidth={2.5} />
                <span className="absolute inset-0 rounded-full blur-md bg-glow-cyan/50 group-hover:bg-glow-magenta/40 transition-colors" />
              </motion.div>
              <div className="leading-tight">
                <span className="font-display text-lg sm:text-xl tracking-tight block">
                  {t.brand.name}
                  <span className="text-glow-cyan">.</span>
                </span>
                <span className="hidden sm:block text-[9px] tracking-[0.3em] uppercase text-glow-cyan/70">
                  {t.brand.sub}
                </span>
              </div>
            </>
          )}
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm text-white/70 hover:text-white transition-colors group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-2 h-px w-0 bg-gradient-to-r from-glow-cyan to-glow-magenta transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <MagneticButton
            href="/booking"
            className="hidden md:inline-flex rounded-full bg-glow-cyan text-ink-950 px-4 lg:px-5 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold shadow-[0_0_30px_-5px_rgba(94,255,155,0.6)] whitespace-nowrap"
          >
            <span>{t.nav.bookNow}</span>
            <span aria-hidden>{isRTL ? "←" : "→"}</span>
          </MagneticButton>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-white p-1.5 -mr-1.5"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

    </motion.header>

    {/* ----------------------------- Mobile menu -----------------------------
        A full-viewport overlay rendered OUTSIDE the fixed header so the page
        underneath is fully covered (no hero CTA bleeding through). z-40 sits
        just under the header bar (z-50) so the close button stays tappable.
    ------------------------------------------------------------------------ */}
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden fixed inset-0 z-40 bg-ink-950/97 backdrop-blur-2xl overflow-y-auto"
        >
          {/* Push contents below the navbar bar so the X stays visible */}
          <div className="pt-28 sm:pt-32 px-6 pb-10 min-h-full flex flex-col">
            <ul className="flex-1 space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-2xl sm:text-3xl font-display text-white/90 hover:text-glow-cyan transition-colors py-4 border-b border-white/5"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-10 pt-6 border-t border-emerald-500/10 space-y-5"
            >
              <a
                href="/booking"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-glow-cyan text-ink-950 px-6 py-4 text-base font-semibold shadow-[0_0_40px_-5px_rgba(94,255,155,0.6)]"
              >
                {t.nav.bookNow} <span aria-hidden>{isRTL ? "←" : "→"}</span>
              </a>
              <div className="flex justify-center">
                <LanguageSwitcher variant="mobile" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
