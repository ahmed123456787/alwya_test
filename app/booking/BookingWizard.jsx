"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1Identity from "./steps/Step1Identity";
import Step2Service from "./steps/Step2Service";
import Step3Schedule from "./steps/Step3Schedule";
import Step4Confirm from "./steps/Step4Confirm";
import Stepper from "./Stepper";

/**
 * BookingWizard — 4-step state-driven appointment flow.
 *
 *   step 1 → patient identity (lastname, firstname, DOB)
 *   step 2 → service selection (9 cards) → service detail confirm
 *   step 3 → date selection + contact info (phone, email, wilaya)
 *   step 4 → summary + PDF download (window.print → "Save as PDF")
 *
 * State lives in a single `data` object that all step components mutate via
 * setData. URL state would be nice (deep links + back button) but adds router
 * complexity; we can lift to searchParams later if needed.
 */
export default function BookingWizard() {
  const [step, setStep] = useState(1);
  // step 2 has two sub-views: list + detail
  const [step2View, setStep2View] = useState("list"); // "list" | "detail"
  const [data, setData] = useState({
    lastname: "",
    firstname: "",
    dob: "",
    service: null, // SERVICES entry
    date: null, // Date instance
    phone: "",
    email: "",
    wilaya: "",
  });

  const goNext = () => setStep((s) => Math.min(4, s + 1));
  const goBack = () => {
    if (step === 2 && step2View === "detail") {
      setStep2View("list");
      return;
    }
    setStep((s) => Math.max(1, s - 1));
  };

  return (
    <div className="min-h-screen bg-ink-950 text-white relative overflow-hidden">
      {/* ambient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(94,255,155,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(222,181,73,0.06) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* slim header */}
      <header className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 pt-5 sm:pt-6 pb-2 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Back to Ibsar Center home"
        >
          <img
            src="/logo.png"
            alt="Ibsar Center"
            className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
            style={{ filter: "brightness(1.1)" }}
          />
        </a>
        <a
          href="/"
          className="text-xs sm:text-sm text-white/55 hover:text-glow-cyan transition-colors flex items-center gap-1.5"
        >
          <span aria-hidden>←</span>
          <span>Home</span>
        </a>
      </header>

      {/* page title */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 pt-4 sm:pt-6 pb-4 text-center">
        <h1
          className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight"
          dir="rtl"
          lang="ar"
        >
          تحديد موعد
        </h1>
        <p className="mt-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-glow-cyan/65">
          Appointment Booking
        </p>
      </div>

      {/* stepper */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 py-6 sm:py-8">
        <Stepper current={step} />
      </div>

      {/* step body */}
      <main className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={step + "_" + step2View}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 1 && (
              <Step1Identity data={data} setData={setData} onNext={goNext} />
            )}
            {step === 2 && (
              <Step2Service
                data={data}
                setData={setData}
                view={step2View}
                setView={setStep2View}
                onBack={goBack}
                onNext={goNext}
              />
            )}
            {step === 3 && (
              <Step3Schedule
                data={data}
                setData={setData}
                onBack={goBack}
                onNext={goNext}
              />
            )}
            {step === 4 && <Step4Confirm data={data} onBack={goBack} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
