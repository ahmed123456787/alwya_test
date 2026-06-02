"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Latin-only character check (letters, spaces, hyphens, apostrophes)
const LATIN_RE = /^[A-Za-zÀ-ÿ\s'\-]+$/;

export default function Step1Identity({ data, setData, onNext }) {
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!data.lastname.trim()) errs.lastname = true;
    else if (!LATIN_RE.test(data.lastname.trim())) errs.lastname = "latin";
    if (!data.firstname.trim()) errs.firstname = true;
    else if (!LATIN_RE.test(data.firstname.trim())) errs.firstname = "latin";
    if (!data.dob) errs.dob = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext();
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div
        className="rounded-2xl border border-glow-gold/30 bg-glow-gold/8 px-5 py-3.5 text-sm text-glow-gold text-center"
        dir="rtl"
        lang="ar"
      >
        يرجى الكتابة بالأحرف اللاتينية · Please use Latin letters
      </div>

      <Field
        label="Last name · اللقب"
        value={data.lastname}
        onChange={(v) => setData((d) => ({ ...d, lastname: v }))}
        error={errors.lastname}
        placeholder="e.g. Kameche"
      />

      <Field
        label="First name · الاسم"
        value={data.firstname}
        onChange={(v) => setData((d) => ({ ...d, firstname: v }))}
        error={errors.firstname}
        placeholder="e.g. Ibrahim"
      />

      <div>
        <label className="block text-xs tracking-[0.18em] uppercase text-glow-cyan/80 mb-2">
          Date of birth · تاريخ الميلاد
        </label>
        <input
          type="date"
          value={data.dob}
          onChange={(e) => setData((d) => ({ ...d, dob: e.target.value }))}
          max={new Date().toISOString().slice(0, 10)}
          className={`w-full rounded-xl bg-white/5 border px-4 py-3.5 text-base text-white focus:outline-none focus:border-glow-cyan transition-colors ${
            errors.dob ? "border-red-500/60" : "border-white/10"
          }`}
        />
        {errors.dob && (
          <p className="mt-2 text-xs text-red-400">Date of birth is required.</p>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between gap-3">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </a>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-glow-cyan text-ink-950 px-7 py-3 text-sm sm:text-base font-semibold shadow-[0_0_40px_-5px_rgba(94,255,155,0.6)] hover:shadow-[0_0_60px_-5px_rgba(94,255,155,0.85)] transition-shadow"
        >
          Next · إرسال →
        </motion.button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.18em] uppercase text-glow-cyan/80 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl bg-white/5 border px-4 py-3.5 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-glow-cyan transition-colors ${
          error ? "border-red-500/60" : "border-white/10"
        }`}
      />
      {error === true && (
        <p className="mt-2 text-xs text-red-400">This field is required.</p>
      )}
      {error === "latin" && (
        <p className="mt-2 text-xs text-red-400">
          Latin letters only · أحرف لاتينية فقط
        </p>
      )}
    </div>
  );
}
