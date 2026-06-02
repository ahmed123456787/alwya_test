"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useT } from "./LanguageProvider";

export default function Footer() {
  const { t } = useT();
  const [logoOk, setLogoOk] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogoOk(true);
    img.onerror = () => setLogoOk(false);
    img.src = "/logo.png";
  }, []);
  return (
    <footer className="relative border-t border-emerald-500/10 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 grid sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 sm:gap-10">
        <div>
          <div className="flex items-center gap-2">
            {logoOk ? (
              <img
                src="/logo.png"
                alt="Ibsar Center"
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
              />
            ) : (
              <>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-glow-cyan via-iris-500 to-glow-magenta flex items-center justify-center">
                  <Eye className="w-4 h-4 text-ink-950" strokeWidth={2.5} />
                </div>
                <span className="font-display text-lg sm:text-xl">
                  {t.brand.name}
                  <span className="text-glow-cyan">.</span>
                </span>
              </>
            )}
          </div>
          <p className="mt-4 text-sm text-white/55 max-w-xs leading-relaxed">
            {t.footer.tagline}
          </p>
        </div>
        {/* Care column: every item is a category of /#services */}
        <Col
          title={t.footer.cols.care.title}
          items={t.footer.cols.care.items}
          hrefFor={() => "#services"}
        />
        {/* Clinic column: items map 1:1 to page sections by index.
            Order in the dictionary is: About, The Doctor, Patients, Services. */}
        <Col
          title={t.footer.cols.clinic.title}
          items={t.footer.cols.clinic.items}
          hrefFor={(_, i) =>
            ["#about", "#doctors", "#testimonials", "#services"][i] || "#"
          }
        />
        {/* Contact column: phones → tel:, @handle → instagram, address → maps */}
        <Col
          title={t.footer.cols.contact.title}
          items={t.footer.cols.contact.items}
          hrefFor={(it) => {
            if (/^\+?\d/.test(it)) return "tel:" + it.replace(/[^\d+]/g, "");
            if (it.startsWith("@"))
              return "https://www.instagram.com/" + it.slice(1);
            return (
              "https://www.google.com/maps/search/?api=1&query=" +
              encodeURIComponent(it)
            );
          }}
          externalFor={(it) => !/^\+?\d/.test(it)}
        />
      </div>
      <div className="mt-10 sm:mt-12 border-t border-emerald-500/10 pt-6 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-3 sm:gap-4 text-xs text-white/60">
        <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
        <p>
          {t.footer.tail.pre}
          <a
            href="https://www.thrivedoc.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-glow-magenta hover:text-glow-cyan transition-colors underline-offset-4 hover:underline"
          >
            {t.footer.tail.em}
          </a>
          {t.footer.tail.post}
        </p>
      </div>
    </footer>
  );
}

function Col({ title, items, hrefFor, externalFor }) {
  return (
    <div>
      <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-glow-cyan/70 mb-3 sm:mb-4">
        {title}
      </p>
      <ul className="space-y-2 text-sm text-white/70">
        {items.map((it, i) => {
          // Phone numbers and @handles need explicit LTR direction in RTL UI
          const looksLatin = /\+?\d{2,}|^@/.test(it);
          const href = hrefFor ? hrefFor(it, i) : null;
          const external = externalFor ? externalFor(it, i) : false;
          return (
            <li
              key={it}
              dir={looksLatin ? "ltr" : undefined}
              className={looksLatin ? "text-start" : ""}
            >
              {href ? (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="hover:text-glow-cyan transition-colors"
                  data-cursor="hover"
                >
                  {it}
                </a>
              ) : (
                <span>{it}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
