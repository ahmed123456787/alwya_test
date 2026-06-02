// Service catalog scraped from https://ibsar-center.com/specialites
// Single source of truth for the booking flow.
// Pricing in DZD (Algerian dinar). Descriptions are the real Arabic copy
// shortened slightly so step-2 detail pages don't run on forever.

export const SERVICES = [
  {
    slug: "bilan-refractif",
    titleAr: "فحوص وراديوات تصحيح النظر",
    titleEn: "Refractive Surgery Assessment",
    titleFr: "Bilan réfractif",
    price: 20000,
    color: "emerald",
    descAr:
      "هذه الفحوص (راديوات) تسمح بتحديد إمكانية القيام بعملية تصحيح النظر لنزع النظارات أو إنقاص سمكها. توجد عدة عمليات تصحيح بعضها بالليزر وبعضها بزرع عدسات. تخص الأشخاص الراشدين فوق 18 سنة الذين لا يعانون من أي مرض مزمن غير معدل، ولا تخص المرأة الحامل والمرضعة.",
  },
  {
    slug: "bilan-cataracte",
    titleAr: "فحوص وراديوات الماء الأبيض أو الكاتراكت",
    titleEn: "Cataract Assessment",
    titleFr: "Bilan cataracte",
    price: 20000,
    color: "emerald",
    descAr:
      "تسمح هذه الفحوص بتأكيد تشخيص الماء الأبيض، تحديد إمكانية وتاريخ العملية، نوع العدسة المزروعة، وتكاليفها. العملية سريعة ومجهرية، والتعافي عادة سهل خلال أيام.",
  },
  {
    slug: "bilan-keratocone",
    titleAr: "فحوص وراديوات قرنية مخروطية",
    titleEn: "Keratoconus Assessment",
    titleFr: "Bilan kératocône",
    price: 20000,
    color: "emerald",
    descAr:
      "فحوص متقدمة لتشخيص القرنية المخروطية وتحديد درجة تطورها، تتضمن طبوغرافيا القرنية وقياس السماكة. تساعد على تحديد العلاج المناسب من تثبيت القرنية أو زرع حلقات أو زرع عدسات.",
  },
  {
    slug: "bilan-surface-oculaire",
    titleAr: "فحوص وراديوات جفاف العين والحساسية",
    titleEn: "Dry Eye & Ocular Surface",
    titleFr: "Bilan surface oculaire",
    price: 20000,
    color: "emerald",
    descAr:
      "تقييم شامل لسطح العين، الدمع، والملتحمة. يساعد على تشخيص الجفاف، الحساسية، والتهابات الجفون، ووضع خطة علاجية مخصصة.",
  },
  {
    slug: "bilan-glaucome",
    titleAr: "فحوصات و راديوات ضغط العين (الماء الأزرق)",
    titleEn: "Glaucoma Assessment",
    titleFr: "Bilan glaucome",
    price: 20000,
    color: "emerald",
    descAr:
      "فحوص دقيقة لقياس ضغط العين، حقل الرؤية، وفحص العصب البصري. ضرورية للكشف المبكر عن الماء الأزرق ومتابعة العلاج لتفادي تدهور البصر.",
  },
  {
    slug: "bilan-diabete",
    titleAr: "فحوصات و راديوات اعتلال شبكية السكري",
    titleEn: "Diabetic Retinopathy Assessment",
    titleFr: "Bilan rétinopathie diabétique",
    price: 20000,
    color: "emerald",
    descAr:
      "فحص قاع العين وراديوات الشبكية لمرضى السكري. يكشف مبكرا عن المضاعفات على الشبكية ويحدد الحاجة للعلاج بالليزر أو الحقن داخل العين.",
  },
  {
    slug: "consultation-matinee",
    titleAr: "فحص عيون عادي · الفترة الصباحية",
    titleEn: "Standard Eye Exam — Morning",
    titleFr: "Consultation matinée",
    price: 3000,
    color: "gold",
    slot: "morning",
    descAr:
      "استشارة طب عيون عامة في الفترة الصباحية، تشمل فحص حدة البصر، ضغط العين، وقاع العين. مناسبة للفحص الدوري والشكاوى البصرية العامة.",
  },
  {
    slug: "consultation-apres-midi",
    titleAr: "فحص عيون عادي · الفترة المسائية",
    titleEn: "Standard Eye Exam — Afternoon",
    titleFr: "Consultation après-midi",
    price: 3000,
    color: "gold",
    slot: "afternoon",
    descAr:
      "استشارة طب عيون عامة في الفترة المسائية، تشمل فحص حدة البصر، ضغط العين، وقاع العين. مناسبة للفحص الدوري والشكاوى البصرية العامة.",
  },
  {
    slug: "examen-pediatrique",
    titleAr: "فحص عيون للأطفال",
    titleEn: "Pediatric Eye Exam",
    titleFr: "Examen pédiatrique",
    price: 3000,
    color: "gold",
    descAr:
      "فحص خاص بالأطفال يشمل قياس حدة البصر، الحول، والانكسار. ينصح به دوريا قبل دخول المدرسة وعند ظهور أي شكوى بصرية.",
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);

// Algerian wilayas — first 10 for a sensible dropdown, full 58 if you wire it later
export const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
  "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued",
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès",
  "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa",
];

/**
 * Generate the next N available appointment dates.
 * Clinic schedule: Sat–Thu (open), Friday closed.
 * @param {number} count - how many dates to return
 * @param {number} startOffsetDays - skip the first N days (e.g. 2 for "earliest = day-after-tomorrow")
 */
export function nextAvailableDates(count = 8, startOffsetDays = 2) {
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() + startOffsetDays);
  while (out.length < count) {
    const dow = d.getDay(); // 0=Sun … 5=Fri … 6=Sat
    if (dow !== 5) {
      // skip Fridays
      out.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

const AR_WEEKDAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export function arWeekday(date) {
  return AR_WEEKDAYS[date.getDay()];
}

export function formatDateDDMMYYYY(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
