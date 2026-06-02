"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Check } from "lucide-react";
import { arWeekday, formatDateDDMMYYYY } from "../services";

export default function Step4Confirm({ data, onBack }) {
  const handleDownload = () => {
    // Trigger the browser's "Save as PDF" via print dialog.
    // The @media print styles in print.css will give a clean A4 prescription.
    window.print();
  };

  if (!data.service || !data.date) {
    return (
      <p className="text-center text-white/55">
        Missing data — please go back and complete previous steps.
      </p>
    );
  }

  return (
    <div className="space-y-7">
      {/* success banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 mb-4">
          <Check className="w-8 h-8 text-emerald-300" strokeWidth={3} />
        </div>
        <h2 className="font-display text-2xl sm:text-3xl">
          Appointment confirmed
        </h2>
        <p
          className="mt-2 text-sm text-white/70"
          dir="rtl"
          lang="ar"
        >
          قم باستخراج ورقة موعدك وتقديمها يوم الفحص
        </p>
      </motion.div>

      {/* the prescription card — this is what prints */}
      <div
        id="appointment-prescription"
        className="rounded-3xl border border-white/10 bg-white/3 overflow-hidden"
      >
        <div className="px-5 sm:px-7 py-5 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Ibsar Center" className="h-16 sm:h-20 w-auto object-contain" />
            <div className="leading-tight">
              <div className="font-display text-base">Ibsar Center</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-glow-cyan/65">
                Ophthalmology Group · Blida
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/45">
              Reference
            </div>
            <div className="font-mono text-sm text-glow-cyan">
              {generateRef(data)}
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-7 py-5 space-y-5">
          {/* service summary */}
          <Section title="Service · الخدمة">
            <p className="text-base sm:text-lg" dir="rtl" lang="ar">
              {data.service.titleAr}
            </p>
            <p className="text-xs text-white/55 mt-0.5">{data.service.titleEn}</p>
            <p className="mt-2 text-sm text-glow-gold">
              {data.service.price.toLocaleString()} DZD
            </p>
          </Section>

          {/* date */}
          <Section title="Date & time · التاريخ والوقت">
            <p className="text-base sm:text-lg">
              <span dir="rtl" lang="ar">
                {arWeekday(data.date)}
              </span>{" "}
              · {formatDateDDMMYYYY(data.date)}
            </p>
            <p className="text-xs text-white/55 mt-0.5">
              08:30 – 16:30 · check-in at 08:30
            </p>
          </Section>

          {/* patient */}
          <Section title="Patient · المريض">
            <Row label="Last name" value={data.lastname} />
            <Row label="First name" value={data.firstname} />
            <Row label="Date of birth" value={data.dob} />
            <Row label="Phone" value={data.phone} />
            <Row label="Email" value={data.email} />
            <Row label="Wilaya" value={data.wilaya} />
          </Section>

          {/* clinic instructions */}
          <Section title="Instructions · تعليمات">
            <ul className="space-y-1.5 text-sm text-white/75 list-disc list-inside" dir="rtl" lang="ar">
              <li>تأكدوا من إحضار هذه الورقة يوم الفحص.</li>
              <li>الوصول إلى المركز على الساعة 8:30 صباحا.</li>
              <li>عدم ارتداء العدسات اللاصقة 24 ساعة قبل الفحص.</li>
              <li>قد يستغرق الفحص عدة ساعات حسب نوع الخدمة.</li>
              <li>في حالة التغيب، يجب أخذ موعد جديد عبر الموقع.</li>
            </ul>
          </Section>
        </div>

        <div className="px-5 sm:px-7 py-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45">
          <span>Bab Es-Sabet, Blida · Algeria</span>
          <span>+213 799 380 260</span>
        </div>
      </div>

      {/* actions — hidden when printing */}
      <div className="print:hidden flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          type="button"
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full bg-glow-cyan text-ink-950 px-7 py-3 text-sm sm:text-base font-semibold shadow-[0_0_40px_-5px_rgba(94,255,155,0.6)] hover:shadow-[0_0_60px_-5px_rgba(94,255,155,0.85)] transition-shadow"
        >
          <Download className="w-4 h-4" />
          Download · تحميل
        </motion.button>
      </div>

      <p className="print:hidden text-[11px] text-white/35 text-center">
        Choose <span className="text-glow-cyan">"Save as PDF"</span> in the print
        dialog to download your appointment paper.
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.25em] uppercase text-glow-cyan/65 mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline gap-3 text-sm">
      <span className="text-white/45 w-28 shrink-0">{label}</span>
      <span className="text-white/90">{value || "—"}</span>
    </div>
  );
}

function generateRef(data) {
  // Short deterministic-ish reference: IB-YYYYMMDD-XXXX
  const d = data.date;
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const seed = `${data.lastname}${data.firstname}${data.service.slug}`
    .toLowerCase()
    .split("")
    .reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) % 65536, 7);
  const tag = seed.toString(36).toUpperCase().padStart(4, "0").slice(-4);
  return `IB-${ymd}-${tag}`;
}
