"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Instagram,
  Facebook,
  CalendarCheck,
  Clock,
  ShieldCheck,
} from "lucide-react";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";
import { useT } from "./LanguageProvider";

export default function Contact() {
  const { t, isRTL } = useT();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[80vw] h-[420px] sm:h-[620px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(94,255,155,0.2) 0%, rgba(250,204,21,0.1) 40%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 sm:gap-10 items-end mb-12 sm:mb-16">
          <div>
            <Reveal>
              <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-glow-magenta">
                {t.contact.kicker}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 sm:mt-4 font-display text-5xl sm:text-6xl md:text-7xl leading-[1.08] sm:leading-[1.02]">
                {t.contact.heading.pre}
                <br className="hidden sm:block" />
                {t.contact.heading.line2pre}
                <span className="italic text-gradient">
                  {t.contact.heading.em}
                </span>
                {t.contact.heading.line2post}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 sm:gap-10">
          {/* Booking CTA card — replaced the old inline form.
              The full multi-step flow lives at /booking. */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="gradient-border p-6 sm:p-8 md:p-10 spotlight relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(94,255,155,0.35) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-glow-cyan/30 bg-glow-cyan/10 px-3 py-1 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-glow-cyan mb-5">
                <CalendarCheck className="w-3 h-3" />
                {t.contact.bookingCta.badge}
              </div>

              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
                {t.contact.bookingCta.headPre}
                <span className="italic text-gradient">
                  {t.contact.bookingCta.headEm}
                </span>
                {t.contact.bookingCta.headPost}
              </h3>
              <p className="text-sm sm:text-base text-white/65 max-w-md mb-7 leading-relaxed">
                {t.contact.bookingCta.body}
              </p>

              <ul className="space-y-2.5 mb-8">
                {t.contact.bookingCta.bullets.map((line, i) => {
                  const Icon = [ShieldCheck, Clock, CalendarCheck][i] || CalendarCheck;
                  return (
                    <li
                      key={line}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <span className="w-7 h-7 rounded-full bg-glow-cyan/10 border border-glow-cyan/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-glow-cyan" />
                      </span>
                      {line}
                    </li>
                  );
                })}
              </ul>

              <MagneticButton
                href="/booking"
                className="rounded-full bg-glow-cyan text-ink-950 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-[0_0_40px_-5px_rgba(94,255,155,0.6)] hover:shadow-[0_0_60px_-5px_rgba(94,255,155,0.85)] transition-shadow"
              >
                <span>{t.contact.bookingCta.cta}</span>
                <Arrow className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="space-y-4 sm:space-y-5"
          >
            <Info
              icon={Phone}
              title={t.contact.info.callTitle}
              lines={t.contact.info.callLines}
              kind="phone"
            />
            <Info
              icon={MapPin}
              title={t.contact.info.visitTitle}
              lines={t.contact.info.visitLines}
              kind="address"
            />
            <div className="gradient-border p-5 sm:p-6">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-glow-cyan/70 mb-3">
                {t.contact.info.followTitle}
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook,  href: "https://www.facebook.com/ophtalmologie.kameche", label: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/ibsar_center", label: "Instagram" },
                  // YouTube icon removed — no real channel URL was provided.
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ibsar Center on ${s.label}`}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="w-11 h-11 sm:w-11 sm:h-11 rounded-xl bg-glow-cyan/10 border border-glow-cyan/30 flex items-center justify-center hover:bg-glow-cyan/20 hover:border-glow-cyan/70 transition-colors"
                    data-cursor="hover"
                  >
                    <s.icon className="w-4 h-4 text-glow-cyan" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
              <p className="mt-3 sm:mt-4 text-xs text-white/60">
                @ibsar_center
              </p>
            </div>
            <div className="gradient-border p-5 sm:p-6">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-glow-magenta mb-3">
                {t.contact.info.emergencyTitle}
              </p>
              <p className="text-sm sm:text-base text-white/85">
                {t.contact.info.emergencyText.pre}
                <a
                  href={`tel:${t.contact.info.emergencyText.phone.replace(/[^\d+]/g, "")}`}
                  dir="ltr"
                  className="text-glow-cyan font-semibold whitespace-nowrap inline-block hover:underline underline-offset-4"
                  data-cursor="hover"
                >
                  {t.contact.info.emergencyText.phone}
                </a>
                {t.contact.info.emergencyText.post}
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, title, lines, kind }) {
  // For phones: each numeric line becomes a tel: link.
  // For addresses: all lines combined into a single Google Maps search link
  //   wrapped around the block so the whole card is tappable on mobile.
  const isAddress = kind === "address";
  const mapsHref = isAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        // Drop the city/country trailing line if it's the same in every locale;
        // joining all lines is safest — Google handles fuzzy queries well.
        lines.join(", ")
      )}`
    : null;

  const inner = (
    <>
      <div className="w-10 h-10 rounded-xl bg-glow-cyan/10 border border-glow-cyan/30 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-glow-cyan" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-glow-cyan/70">
          {title}
        </p>
        {lines.map((l, i) => {
          // Phone numbers / addresses with digits need explicit dir="ltr"
          // so they don't get bidi-reordered in the RTL Arabic context.
          const looksNumeric = /\+?\d{2,}/.test(l);
          const baseCls = `${
            i === 0
              ? "mt-1 text-white text-sm sm:text-base"
              : "text-white/55 text-xs sm:text-sm mt-0.5"
          } ${looksNumeric ? "text-start" : ""}`;

          // Phone column: each numeric line is its own tel: link.
          // The trailing "Sat–Thu · Morning & Afternoon" line is non-numeric,
          // stays as a plain <p>.
          if (kind === "phone" && looksNumeric) {
            const telHref = "tel:" + l.replace(/[^\d+]/g, "");
            return (
              <p key={i} dir="ltr" className={baseCls}>
                <a
                  href={telHref}
                  className="hover:text-glow-cyan transition-colors"
                  data-cursor="hover"
                >
                  {l}
                </a>
              </p>
            );
          }
          return (
            <p
              key={i}
              dir={looksNumeric ? "ltr" : undefined}
              className={baseCls}
            >
              {l}
            </p>
          );
        })}
      </div>
    </>
  );

  // For the address card, wrap the entire body in one tap-target → Maps.
  if (isAddress) {
    return (
      <motion.a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4 }}
        className="gradient-border p-5 sm:p-6 flex items-start gap-3 sm:gap-4 hover:border-glow-cyan/60 transition-colors"
        data-cursor="hover"
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="gradient-border p-5 sm:p-6 flex items-start gap-3 sm:gap-4"
      data-cursor="hover"
    >
      {inner}
    </motion.div>
  );
}
