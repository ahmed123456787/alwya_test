"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { nextAvailableDates, arWeekday, formatDateDDMMYYYY, WILAYAS } from "../services";

const PHONE_RE = /^(\+?213|0)\s?\d(\s?\d){8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Step3Schedule({ data, setData, onBack, onNext }) {
  const dates = useMemo(() => nextAvailableDates(8, 2), []);
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!data.date) errs.date = true;
    if (!data.phone.trim()) errs.phone = "required";
    else if (!PHONE_RE.test(data.phone.replace(/\s/g, ""))) errs.phone = "format";
    if (!data.email.trim()) errs.email = "required";
    else if (!EMAIL_RE.test(data.email.trim())) errs.email = "format";
    if (!data.wilaya) errs.wilaya = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext();
  };

  return (
    <form onSubmit={submit} className="space-y-7">
      <div className="text-center">
        <h2
          className="font-display text-xl sm:text-2xl md:text-[1.6rem] leading-tight max-w-2xl mx-auto"
          dir="rtl"
          lang="ar"
        >
          اختر التاريخ الذي يناسبك من بين التواريخ المتاحة
        </h2>
        <p className="mt-2 text-sm text-white/55">
          Pick a date, then complete your contact info
        </p>
      </div>

      {/* date grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {dates.map((d, i) => {
          const iso = d.toISOString();
          const selected = data.date?.toISOString() === iso;
          return (
            <motion.button
              key={iso}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setData((s) => ({ ...s, date: d }))}
              className={`rounded-2xl border px-4 py-3.5 text-center transition-all ${
                selected
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-white/10 bg-white/3 hover:border-glow-cyan/40 hover:bg-white/5"
              }`}
            >
              <div
                className={`text-xs tracking-[0.2em] uppercase mb-1 ${
                  selected ? "text-emerald-300" : "text-white/50"
                }`}
              >
                <span dir="rtl" lang="ar">
                  {arWeekday(d)}
                </span>
              </div>
              <div className="font-display text-lg">{formatDateDDMMYYYY(d)}</div>
            </motion.button>
          );
        })}
      </div>
      {errors.date && (
        <p className="text-xs text-red-400 text-center">
          Please pick an appointment date.
        </p>
      )}

      <p className="text-[11px] text-white/40 text-center flex items-center justify-center gap-2">
        <Calendar className="w-3 h-3" />
        Clinic hours: Sat–Thu · 08:30 – 16:30 (closed Friday)
      </p>

      {/* contact info */}
      <div className="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <ReadOnly label="Last name · اللقب" value={data.lastname} />
          <ReadOnly label="First name · الاسم" value={data.firstname} />
        </div>
        <ReadOnly label="Date of birth · تاريخ الميلاد" value={data.dob} />

        <Field
          label="Phone · رقم الهاتف"
          type="tel"
          value={data.phone}
          onChange={(v) => setData((s) => ({ ...s, phone: v }))}
          placeholder="+213 ..."
          error={
            errors.phone === "required"
              ? "Phone is required"
              : errors.phone === "format"
              ? "Invalid Algerian phone number"
              : null
          }
        />

        <Field
          label="Email · البريد الإلكتروني"
          type="email"
          value={data.email}
          onChange={(v) => setData((s) => ({ ...s, email: v }))}
          placeholder="you@example.com"
          error={
            errors.email === "required"
              ? "Email is required"
              : errors.email === "format"
              ? "Invalid email address"
              : null
          }
        />

        <div>
          <label className="block text-xs tracking-[0.18em] uppercase text-glow-cyan/80 mb-2">
            Wilaya · الولاية
          </label>
          <select
            value={data.wilaya}
            onChange={(e) => setData((s) => ({ ...s, wilaya: e.target.value }))}
            className={`w-full rounded-xl bg-white/5 border px-4 py-3.5 text-base text-white focus:outline-none focus:border-glow-cyan transition-colors ${
              errors.wilaya ? "border-red-500/60" : "border-white/10"
            }`}
          >
            <option value="" className="bg-ink-950">
              — Select wilaya —
            </option>
            {WILAYAS.map((w) => (
              <option key={w} value={w} className="bg-ink-950">
                {w}
              </option>
            ))}
          </select>
          {errors.wilaya && (
            <p className="mt-2 text-xs text-red-400">Wilaya is required.</p>
          )}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-glow-cyan text-ink-950 px-7 py-3 text-sm sm:text-base font-semibold shadow-[0_0_40px_-5px_rgba(94,255,155,0.6)] hover:shadow-[0_0_60px_-5px_rgba(94,255,155,0.85)] transition-shadow"
        >
          Confirm · تأكيد الموعد →
        </motion.button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, error, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.18em] uppercase text-glow-cyan/80 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl bg-white/5 border px-4 py-3.5 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-glow-cyan transition-colors ${
          error ? "border-red-500/60" : "border-white/10"
        }`}
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function ReadOnly({ label, value }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.18em] uppercase text-white/40 mb-2">
        {label}
      </label>
      <div className="w-full rounded-xl bg-white/2 border border-white/8 px-4 py-3 text-base text-white/70">
        {value || "—"}
      </div>
    </div>
  );
}
