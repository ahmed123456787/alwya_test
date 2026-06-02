// Centralised translation dictionary for Ibsar Center · Ophthalmology Group.
// Three locales: English (en), French (fr), Arabic (ar — RTL).

export const LOCALES = ["en", "fr", "ar"];
export const DEFAULT_LOCALE = "en";
export const RTL_LOCALES = ["ar"];

export const localeMeta = {
  en: { label: "EN", name: "English",  dir: "ltr" },
  fr: { label: "FR", name: "Français", dir: "ltr" },
  ar: { label: "ع",  name: "العربية",   dir: "rtl" },
};

export const dict = {
  // ---------------------------------------------------------------- ENGLISH
  en: {
    brand: { name: "Ibsar Center", sub: "Ophthalmology Group · Blida" },
    nav: {
      services: "Services",
      doctor: "The Doctor",
      about: "About",
      patients: "Patients",
      appointment: "Appointment",
      bookNow: "Book Now",
    },

    hero: {
      kicker: "SMILE PRO · Next-generation vision correction",
      headlineWords: ["See", "the", "world", "anew."],
      emphasizedWord: "anew.",
      paragraph: {
        intro:
          "Ibsar Center · Ophthalmology Group, Blida. A specialized practice equipped with the latest diagnostic and surgical technology — offering ",
        highlight: "SMILE PRO",
        outro:
          ", LASIK, advanced smart intraocular lenses, and full eye care for the whole family.",
      },
      cta: "Book a consultation",
      cta2: "Explore services",
      scroll: "Scroll",
      trust: ["SMILE PRO", "Femto-LASIK", "Smart IOLs", "Pediatric Care"],
    },

    marquee: [
      "SMILE PRO",
      "Femto-LASIK",
      "Cataract Surgery",
      "Keratoconus",
      "Smart IOLs",
      "Diabetic Retinopathy",
      "Glaucoma Care",
      "Dry Eye & Allergies",
      "Pediatric Ophthalmology",
    ],

    services: {
      kicker: "· 01 — Services",
      heading: { pre: "Every eye is a ", em: "universe", post: ".", line2: "We treat it that way." },
      intro:
        "Nine focused departments equipped with the latest diagnostic and surgical technology — under one calm roof in Blida.",
      items: [
        { title: "SMILE PRO",            tag: "Next-gen vision correction", desc: "Bladeless, flap-free femtosecond laser correction in under 10 seconds per eye. Discreet, minimally invasive, ultra-fast recovery." },
        { title: "Femto-LASIK",          tag: "Refractive surgery",         desc: "Customized laser correction for myopia, hyperopia and astigmatism — drive home the next morning with sharper-than-glasses vision." },
        { title: "Cataract Surgery",     tag: "Premium smart IOLs",         desc: "Phacoemulsification with toric, multifocal and EDOF intraocular lenses tailored to your daily vision needs." },
        { title: "Keratoconus",          tag: "Cross-linking · ICRS",       desc: "Topography-guided corneal cross-linking and intracorneal ring segments to stabilize and reshape the cornea." },
        { title: "Glaucoma Care",        tag: "Pressure monitoring",        desc: "OCT-driven optic-nerve monitoring, medical therapy and minimally-invasive glaucoma surgery to protect lifelong vision." },
        { title: "Diabetic Retinopathy", tag: "Retina screening",           desc: "Fundus imaging, OCT and anti-VEGF treatment to detect and reverse diabetic damage before vision is lost." },
        { title: "Dry Eye & Allergies",  tag: "Comfort therapy",            desc: "Full diagnostic workup with same-day relief: artificial tears, IPL, lid hygiene and allergy management protocols." },
        { title: "Pediatric Eye Care",   tag: "Children's vision",          desc: "Playful, unhurried exams for amblyopia, strabismus and refraction — building a lifetime of healthy vision." },
        { title: "General Consultation", tag: "Morning & afternoon",        desc: "Comprehensive eye exams for adults — refraction, intraocular pressure, anterior and posterior segment evaluation." },
      ],
      learnMore: "Learn more",
    },

    doctors: {
      kicker: "· 02 — The Doctor",
      heading: { pre: "The steady hands", line2pre: "behind ", em: "every clear view", line2post: "." },
      cta: "Book at Ibsar Center →",
      stampL: "· Ophthalmology",
      stampR: "Eye Surgery",
      leadLabel: "Lead Specialist",
      name: "Dr. Ibrahim Kameche",
      bio:
        "Lead ophthalmologist at Ibsar Center. A decade-plus of refractive, cataract and medical retina experience — driving the practice's investment in SMILE PRO and smart-lens technology.",
      credentials: [
        { title: "Specialist · Ophthalmology", detail: "Refractive, cataract & medical retina" },
        { title: "SMILE PRO Certified",         detail: "Latest-generation femtosecond laser" },
        { title: "Smart IOL Implantation",      detail: "Toric · Multifocal · EDOF lenses" },
        { title: "Based in Blida, Algeria",     detail: "Serving patients across the country" },
      ],
    },

    about: {
      kicker: "· 03 — About",
      heading: { pre: "A clinic ", em: "designed", line2: "around the patient." },
      paragraph:
        "A specialized ophthalmology center equipped with the latest diagnostic and treatment devices. Located in Blida — Bab Es-Sabet, Freedom Square — we combine cutting-edge surgical technology with warm, unhurried care.",
      points: [
        "Latest-generation diagnostic devices (OCT, topography, biometry)",
        "SMILE PRO femtosecond platform — flap-free vision correction",
        "Smart intraocular lenses for personalized cataract care",
        "Same-day appointments & morning / afternoon clinics",
      ],
    },

    stats: {
      heading: { pre: "Numbers that stand ", em: "eye to eye", post: " with our promise." },
      items: [
        { value: 12, suffix: "+", label: "Years of dedicated practice" },
        { value: 9,  suffix: "",  label: "Specialized services" },
        { value: 99, suffix: "%", label: "Patient satisfaction" },
        { value: 10, suffix: "s", label: "SMILE PRO laser pulse" },
      ],
    },

    testimonials: {
      kicker: "· 04 — Stories",
      heading: { pre: "The day they ", em: "saw clearly", post: " again." },
      items: [
        { quote: "الحمد لله و الشكر للطبيب كامش على العملية و حسن الاستقبال و التشخيص الدقيق بأحدث التقنيات و الحمد لله على النتيجة.", name: "Khawla Bfr",        detail: "Surgery patient · 2025",   lang: "ar" },
        { quote: "The surgery went well. Staff were well trained and the service was excellent. Nothing to complain about. I highly recommend.", name: "Assia Chaoui",      detail: "Surgery patient · 2025",   lang: "en" },
        { quote: "Finally, after 22 years of wearing glasses, I can see clearly without any effort. Thank you for your efforts, and thank you to Dr. Kameche and the other doctors.", name: "Saida Azil",        detail: "Refractive surgery · 2025", lang: "en" },
        { quote: "الحمد لله كنت أعاني من ضعف بصر شديد، لكن بعد إجرائي للعملية داخل عيادتكم عادت لي الحياة من جديد. ربي ينورها عليكم كيما نورتوها علينا.", name: "Badreddine Nihal",  detail: "Surgery patient · 2025",   lang: "ar" },
      ],
    },

    contact: {
      kicker: "· 05 — Appointment",
      heading: { pre: "Let's give you ", line2pre: "a ", em: "brighter", line2post: " view." },
      bookingCta: {
        badge: "Online booking",
        headPre: "Book your ",
        headEm: "appointment",
        headPost: " in 4 steps.",
        body: "Choose the right service for your condition, pick a date that works for you, and download your appointment paper.",
        bullets: [
          "Verified clinic schedule (Sat–Thu)",
          "Takes under 2 minutes",
          "Instant PDF appointment paper",
        ],
        cta: "Book appointment",
      },
      form: {
        name: "Full name",
        phone: "Phone",
        email: "Email",
        service: "Service",
        message: "Anything we should know?",
        submit: "Request appointment",
        success: "Thanks! We'll be in touch within 24 hours.",
      },
      serviceOptions: [
        "SMILE PRO", "Femto-LASIK", "Cataract Surgery", "Keratoconus",
        "Glaucoma Consultation", "Diabetic Retinopathy", "Dry Eye / Allergies",
        "Pediatric Eye Care", "General Consultation", "Not sure yet",
      ],
      info: {
        callTitle: "Call us",
        callLines: ["+213 799 380 260", "+213 663 837 102", "Sat–Thu · Morning & Afternoon"],
        visitTitle: "Visit the clinic",
        visitLines: [
          "Bab Es-Sabet, Freedom Square",
          "Caddery Omar Street #4 — Blida",
          "Blida, Algeria",
        ],
        followTitle: "Follow",
        emergencyTitle: "Emergency",
        emergencyText: { pre: "Sudden vision loss, flashes or eye trauma? Call our priority line — ", phone: "+213 799 380 260", post: "." },
      },
    },

    footer: {
      tagline: "Specialized ophthalmology center in Blida — restoring sight, restoring confidence.",
      cols: {
        care: { title: "Care",     items: ["SMILE PRO", "Femto-LASIK", "Cataract Surgery", "Keratoconus", "Glaucoma"] },
        clinic:{ title: "Clinic",   items: ["About", "The Doctor", "Patients", "Services"] },
        contact:{ title: "Contact", items: ["+213 799 380 260", "+213 663 837 102", "Bab Es-Sabet, Blida", "@ibsar_center"] },
      },
      copyright: "Ibsar Center · Ophthalmology Group, Blida. All rights reserved.",
      tail: { pre: "Developed by ", em: "ThriveDoc", post: " · 1st Medical Partner in Algeria" },
    },
  },

  // ----------------------------------------------------------------- FRENCH
  fr: {
    brand: { name: "Centre Ibsar", sub: "Groupe d'Ophtalmologie · Blida" },
    nav: {
      services: "Services",
      doctor: "Le Médecin",
      about: "À propos",
      patients: "Patients",
      appointment: "Rendez-vous",
      bookNow: "Réserver",
    },

    hero: {
      kicker: "SMILE PRO · Correction visuelle nouvelle génération",
      headlineWords: ["Voir", "le", "monde", "autrement."],
      emphasizedWord: "autrement.",
      paragraph: {
        intro:
          "Centre Ibsar · Groupe d'Ophtalmologie, Blida. Une clinique spécialisée équipée des dernières technologies de diagnostic et de chirurgie — offrant ",
        highlight: "SMILE PRO",
        outro:
          ", LASIK, des implants intraoculaires intelligents avancés et des soins ophtalmologiques complets pour toute la famille.",
      },
      cta: "Prendre rendez-vous",
      cta2: "Voir les services",
      scroll: "Défiler",
      trust: ["SMILE PRO", "Femto-LASIK", "Implants intelligents", "Pédiatrie"],
    },

    marquee: [
      "SMILE PRO",
      "Femto-LASIK",
      "Chirurgie de la cataracte",
      "Kératocône",
      "Implants intelligents",
      "Rétinopathie diabétique",
      "Glaucome",
      "Sécheresse oculaire & Allergies",
      "Ophtalmologie pédiatrique",
    ],

    services: {
      kicker: "· 01 — Services",
      heading: { pre: "Chaque œil est un ", em: "univers", post: ".", line2: "Nous le traitons ainsi." },
      intro:
        "Neuf départements dédiés équipés des dernières technologies de diagnostic et de chirurgie — sous un même toit serein à Blida.",
      items: [
        { title: "SMILE PRO",                  tag: "Correction visuelle nouvelle génération", desc: "Correction au laser femtoseconde sans lame, sans capot, en moins de 10 secondes par œil. Discrète, mini-invasive, récupération ultra-rapide." },
        { title: "Femto-LASIK",                tag: "Chirurgie réfractive",                    desc: "Correction laser personnalisée pour myopie, hypermétropie et astigmatisme — vision plus nette que les lunettes dès le lendemain." },
        { title: "Chirurgie de la cataracte",  tag: "Implants intelligents premium",           desc: "Phacoémulsification avec implants toriques, multifocaux et EDOF adaptés à votre quotidien visuel." },
        { title: "Kératocône",                 tag: "Cross-linking · ICRS",                    desc: "Cross-linking cornéen guidé par topographie et anneaux intracornéens pour stabiliser et remodeler la cornée." },
        { title: "Glaucome",                   tag: "Suivi de pression",                       desc: "Surveillance du nerf optique par OCT, traitement médical et chirurgie mini-invasive pour préserver la vue à vie." },
        { title: "Rétinopathie diabétique",    tag: "Dépistage rétinien",                      desc: "Imagerie du fond d'œil, OCT et anti-VEGF pour détecter et inverser les dommages diabétiques avant la perte de vue." },
        { title: "Sécheresse & Allergies",     tag: "Thérapie de confort",                     desc: "Bilan diagnostique complet et soulagement immédiat : larmes artificielles, IPL, hygiène palpébrale et protocoles anti-allergie." },
        { title: "Ophtalmologie pédiatrique",  tag: "Vision des enfants",                      desc: "Examens ludiques et sans hâte pour amblyopie, strabisme et réfraction — pour une vue saine toute une vie." },
        { title: "Consultation générale",      tag: "Matin & après-midi",                      desc: "Bilans ophtalmologiques complets pour adultes — réfraction, tension oculaire, segments antérieur et postérieur." },
      ],
      learnMore: "En savoir plus",
    },

    doctors: {
      kicker: "· 02 — Le Médecin",
      heading: { pre: "Les mains expertes", line2pre: "derrière ", em: "chaque vision restaurée", line2post: "." },
      cta: "Réserver au Centre Ibsar →",
      stampL: "· Ophtalmologie",
      stampR: "Chirurgie oculaire",
      leadLabel: "Spécialiste principal",
      name: "Dr Ibrahim Kameche",
      bio:
        "Ophtalmologiste principal au Centre Ibsar. Plus d'une décennie d'expérience en chirurgie réfractive, cataracte et rétine médicale — moteur de l'investissement du centre dans le SMILE PRO et les implants intelligents.",
      credentials: [
        { title: "Spécialiste · Ophtalmologie", detail: "Réfractif, cataracte & rétine médicale" },
        { title: "Certifié SMILE PRO",          detail: "Laser femtoseconde dernière génération" },
        { title: "Implants intelligents",        detail: "Implants toriques · multifocaux · EDOF" },
        { title: "Basé à Blida, Algérie",        detail: "Patients de tout le pays" },
      ],
    },

    about: {
      kicker: "· 03 — À propos",
      heading: { pre: "Une clinique ", em: "pensée", line2: "autour du patient." },
      paragraph:
        "Centre d'ophtalmologie spécialisé équipé des dernières technologies de diagnostic et de traitement. Situé à Blida — Bab Es-Sabet, Place de la Liberté — nous allions technologie chirurgicale de pointe et soins chaleureux sans précipitation.",
      points: [
        "Équipements de diagnostic dernière génération (OCT, topographie, biométrie)",
        "Plateforme SMILE PRO — correction sans capot",
        "Implants intraoculaires intelligents pour cataracte personnalisée",
        "Rendez-vous le jour même · cliniques matin et après-midi",
      ],
    },

    stats: {
      heading: { pre: "Des chiffres à la ", em: "hauteur", post: " de notre promesse." },
      items: [
        { value: 12, suffix: "+", label: "Années de pratique dédiée" },
        { value: 9,  suffix: "",  label: "Services spécialisés" },
        { value: 99, suffix: "%", label: "Satisfaction patient" },
        { value: 10, suffix: "s", label: "Impulsion laser SMILE PRO" },
      ],
    },

    testimonials: {
      kicker: "· 04 — Témoignages",
      heading: { pre: "Le jour où ils ont ", em: "revu clair", post: "." },
      items: [
        { quote: "الحمد لله و الشكر للطبيب كامش على العملية و حسن الاستقبال و التشخيص الدقيق بأحدث التقنيات و الحمد لله على النتيجة.", name: "Khawla Bfr",        detail: "Patient opéré · 2025",         lang: "ar" },
        { quote: "The surgery went well. Staff were well trained and the service was excellent. Nothing to complain about. I highly recommend.", name: "Assia Chaoui",      detail: "Patient opéré · 2025",         lang: "en" },
        { quote: "Finally, after 22 years of wearing glasses, I can see clearly without any effort. Thank you for your efforts, and thank you to Dr. Kameche and the other doctors.", name: "Saida Azil",        detail: "Chirurgie réfractive · 2025", lang: "en" },
        { quote: "الحمد لله كنت أعاني من ضعف بصر شديد، لكن بعد إجرائي للعملية داخل عيادتكم عادت لي الحياة من جديد. ربي ينورها عليكم كيما نورتوها علينا.", name: "Badreddine Nihal",  detail: "Patient opéré · 2025",         lang: "ar" },
      ],
    },

    contact: {
      kicker: "· 05 — Rendez-vous",
      heading: { pre: "Offrons-vous ", line2pre: "une vue ", em: "plus claire", line2post: "." },
      bookingCta: {
        badge: "Réservation en ligne",
        headPre: "Réservez votre ",
        headEm: "rendez-vous",
        headPost: " en 4 étapes.",
        body: "Choisissez le service adapté à votre condition, sélectionnez une date qui vous convient, et téléchargez votre fiche de rendez-vous.",
        bullets: [
          "Planning vérifié de la clinique (Sam–Jeu)",
          "Moins de 2 minutes",
          "Fiche de rendez-vous PDF instantanée",
        ],
        cta: "Réserver un rendez-vous",
      },
      form: {
        name: "Nom complet",
        phone: "Téléphone",
        email: "Email",
        service: "Service",
        message: "Quelque chose à nous dire ?",
        submit: "Demander un rendez-vous",
        success: "Merci ! Nous reviendrons vers vous sous 24 heures.",
      },
      serviceOptions: [
        "SMILE PRO", "Femto-LASIK", "Chirurgie de la cataracte", "Kératocône",
        "Consultation glaucome", "Rétinopathie diabétique", "Sécheresse / Allergies",
        "Ophtalmologie pédiatrique", "Consultation générale", "Pas encore décidé",
      ],
      info: {
        callTitle: "Appelez-nous",
        callLines: ["+213 799 380 260", "+213 663 837 102", "Sam–Jeu · Matin & Après-midi"],
        visitTitle: "Visitez la clinique",
        visitLines: [
          "Bab Es-Sabet, Place de la Liberté",
          "Rue Caddery Omar n°4 — Blida",
          "Blida, Algérie",
        ],
        followTitle: "Suivez-nous",
        emergencyTitle: "Urgence",
        emergencyText: { pre: "Perte de vue soudaine, flashs ou traumatisme ? Appelez notre ligne prioritaire — ", phone: "+213 799 380 260", post: "." },
      },
    },

    footer: {
      tagline: "Centre d'ophtalmologie spécialisé à Blida — redonner la vue, redonner confiance.",
      cols: {
        care:   { title: "Soins",   items: ["SMILE PRO", "Femto-LASIK", "Cataracte", "Kératocône", "Glaucome"] },
        clinic: { title: "Clinique", items: ["À propos", "Le Médecin", "Patients", "Services"] },
        contact:{ title: "Contact", items: ["+213 799 380 260", "+213 663 837 102", "Bab Es-Sabet, Blida", "@ibsar_center"] },
      },
      copyright: "Centre Ibsar · Groupe d'Ophtalmologie, Blida. Tous droits réservés.",
      tail: { pre: "Développé par ", em: "ThriveDoc", post: " · 1er Partenaire Médical en Algérie" },
    },
  },

  // ----------------------------------------------------------------- ARABIC
  ar: {
    brand: { name: "مركز الإبصار", sub: "مجموعة طب وجراحة العيون · البليدة" },
    nav: {
      services: "الخدمات",
      doctor: "الطبيب",
      about: "التقديم",
      patients: "المرضى",
      appointment: "تحديد موعد",
      bookNow: "احجز الآن",
    },

    hero: {
      kicker: "سمايل برو · أحدث تقنيات تصحيح النظر",
      headlineWords: ["انظر", "إلى", "العالم", "من جديد."],
      emphasizedWord: "من جديد.",
      paragraph: {
        intro:
          "مركز الإبصار · مجموعة طب وجراحة العيون، البليدة. عيادة مختصة مجهزة بأحدث أجهزة التشخيص والعلاج — نقدم ",
        highlight: "سمايل برو",
        outro:
          "، والليزك، والعدسات الذكية المتطورة، ورعاية شاملة للعيون لكل أفراد الأسرة.",
      },
      cta: "احجز استشارة",
      cta2: "تصفح الخدمات",
      scroll: "اسحب",
      trust: ["سمايل برو", "الفيمتو ليزك", "العدسات الذكية", "طب الأطفال"],
    },

    marquee: [
      "سمايل برو",
      "الفيمتو ليزك",
      "جراحة الماء البيضاء",
      "القرنية المخروطية",
      "العدسات الذكية",
      "اعتلال الشبكية السكري",
      "ارتفاع ضغط العين",
      "جفاف العين والحساسية",
      "طب عيون الأطفال",
    ],

    services: {
      kicker: "· 01 — الخدمات",
      heading: { pre: "كل عين هي ", em: "كون", post: ".", line2: "ونعاملها على هذا الأساس." },
      intro:
        "تسعة أقسام متخصصة مجهزة بأحدث تقنيات التشخيص والجراحة — تحت سقف واحد هادئ في البليدة.",
      items: [
        { title: "سمايل برو",            tag: "تصحيح نظر متطور",      desc: "تصحيح بالليزر الفيمتوثاني، بدون شفرة وبدون رفرف، في أقل من 10 ثوانٍ للعين. تدخل دقيق وتعافي فائق السرعة." },
        { title: "الفيمتو ليزك",         tag: "جراحة انكسارية",       desc: "تصحيح ليزر مخصص لقصر وطول النظر واللابؤرية — رؤية أوضح من النظارات في صباح اليوم التالي." },
        { title: "جراحة الماء البيضاء",  tag: "عدسات ذكية متميزة",    desc: "استحلاب العدسة مع زرع عدسات توريك ومتعددة البؤر وعدسات EDOF مفصلة على احتياجاتك اليومية." },
        { title: "القرنية المخروطية",    tag: "ربط القرنية · ICRS",   desc: "ربط القرنية الموجه بالتضاريس وحلقات داخل القرنية لتثبيت شكلها وإعادة تشكيلها." },
        { title: "ارتفاع ضغط العين",     tag: "متابعة الضغط",         desc: "مراقبة العصب البصري بواسطة OCT والعلاج الدوائي والجراحة قليلة التوغل لحماية النظر مدى الحياة." },
        { title: "اعتلال الشبكية السكري", tag: "فحص الشبكية",         desc: "تصوير قاع العين وOCT وحقن مضادات VEGF لاكتشاف وعلاج المضاعفات السكرية قبل فقدان البصر." },
        { title: "جفاف العين والحساسية", tag: "علاج مريح",           desc: "تقييم تشخيصي شامل مع راحة فورية: دموع اصطناعية، IPL، نظافة الجفن، وبروتوكولات الحساسية." },
        { title: "طب عيون الأطفال",      tag: "رؤية الأطفال",         desc: "فحوصات مرحة وغير متعجلة للحول وكسل العين والانكسار — لبناء نظر سليم مدى الحياة." },
        { title: "استشارة عامة",         tag: "صباحًا ومساءً",         desc: "فحوصات شاملة للبالغين — انكسار، ضغط العين، تقييم الجزء الأمامي والخلفي." },
      ],
      learnMore: "اقرأ المزيد",
    },

    doctors: {
      kicker: "· 02 — الطبيب",
      heading: { pre: "اليد الثابتة", line2pre: "خلف ", em: "كل نظرة واضحة", line2post: "." },
      cta: "احجز في مركز الإبصار ←",
      stampL: "· طب العيون",
      stampR: "جراحة العيون",
      leadLabel: "الطبيب الرئيسي",
      name: "د. إبراهيم كاميش",
      bio:
        "كبير أطباء العيون في مركز الإبصار. أكثر من عقد من الخبرة في الجراحة الانكسارية وجراحة الماء البيضاء وأمراض الشبكية الطبية — قائد توجه العيادة نحو تقنيات سمايل برو والعدسات الذكية.",
      credentials: [
        { title: "أخصائي طب وجراحة العيون", detail: "انكسارية، ماء بيضاء، وأمراض شبكية طبية" },
        { title: "معتمد لتقنية سمايل برو", detail: "ليزر فيمتوثاني من أحدث جيل" },
        { title: "زرع العدسات الذكية",     detail: "توريك · متعددة البؤر · EDOF" },
        { title: "مقرها البليدة، الجزائر", detail: "نخدم المرضى من كل الولايات" },
      ],
    },

    about: {
      kicker: "· 03 — التقديم",
      heading: { pre: "عيادة ", em: "مصممة", line2: "حول المريض." },
      paragraph:
        "عيادة مختصة في جراحة العيون مجهزة بأحدث أجهزة التشخيص والعلاج. تقع في البليدة — باب السبت، ساحة الحرية — حيث نمزج بين أحدث التقنيات الجراحية والرعاية الدافئة دون استعجال.",
      points: [
        "أجهزة تشخيص من أحدث جيل (OCT، تضاريس القرنية، قياسات بيومترية)",
        "منصة سمايل برو للفيمتوثاني — تصحيح بدون رفرف",
        "عدسات داخل العين ذكية لجراحة ماء بيضاء مخصصة",
        "مواعيد في نفس اليوم · عيادات صباحية ومسائية",
      ],
    },

    stats: {
      heading: { pre: "أرقام ", em: "تليق", post: " بوعدنا." },
      items: [
        { value: 12, suffix: "+", label: "سنة من الممارسة المخلصة" },
        { value: 9,  suffix: "",  label: "خدمة متخصصة" },
        { value: 99, suffix: "%", label: "رضا المرضى" },
        { value: 10, suffix: "ث", label: "نبضة ليزر سمايل برو" },
      ],
    },

    testimonials: {
      kicker: "· 04 — قصص المرضى",
      heading: { pre: "اليوم الذي ", em: "رأوا فيه بوضوح", post: " من جديد." },
      items: [
        { quote: "الحمد لله و الشكر للطبيب كامش على العملية و حسن الاستقبال و التشخيص الدقيق بأحدث التقنيات و الحمد لله على النتيجة.", name: "خولة بفر",       detail: "مريض جراحة · 2025",    lang: "ar" },
        { quote: "The surgery went well. Staff were well trained and the service was excellent. Nothing to complain about. I highly recommend.", name: "آسيا شاوي",     detail: "مريض جراحة · 2025",    lang: "en" },
        { quote: "Finally, after 22 years of wearing glasses, I can see clearly without any effort. Thank you for your efforts, and thank you to Dr. Kameche and the other doctors.", name: "سعيدة عزيل",    detail: "جراحة انكسارية · 2025", lang: "en" },
        { quote: "الحمد لله كنت أعاني من ضعف بصر شديد، لكن بعد إجرائي للعملية داخل عيادتكم عادت لي الحياة من جديد. ربي ينورها عليكم كيما نورتوها علينا.", name: "بدر الدين نهال", detail: "مريض جراحة · 2025",    lang: "ar" },
      ],
    },

    contact: {
      kicker: "· 05 — تحديد موعد",
      heading: { pre: "لنمنحك ", line2pre: "رؤية ", em: "أوضح", line2post: "." },
      bookingCta: {
        badge: "حجز عبر الإنترنت",
        headPre: "احجز ",
        headEm: "موعدك",
        headPost: " في 4 خطوات.",
        body: "اختر الخدمة المناسبة لحالتك، حدد التاريخ الذي يناسبك، ثم حمّل ورقة موعدك جاهزة للطباعة.",
        bullets: [
          "جدول مواعيد العيادة موثّق (السبت–الخميس)",
          "أقل من دقيقتين",
          "ورقة موعد PDF فورية",
        ],
        cta: "احجز موعدك",
      },
      form: {
        name: "الاسم الكامل",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        service: "الخدمة",
        message: "هل من شيء تودّ إخبارنا به؟",
        submit: "اطلب موعدًا",
        success: "شكرًا لتواصلكم! سنرد عليكم خلال 24 ساعة.",
      },
      serviceOptions: [
        "سمايل برو", "الفيمتو ليزك", "جراحة الماء البيضاء", "القرنية المخروطية",
        "استشارة الجلوكوما", "اعتلال الشبكية السكري", "جفاف العين / الحساسية",
        "طب عيون الأطفال", "استشارة عامة", "لم أقرر بعد",
      ],
      info: {
        callTitle: "اتصل بنا",
        callLines: ["+213 799 380 260", "+213 663 837 102", "السبت–الخميس · صباحًا ومساءً"],
        visitTitle: "زر العيادة",
        visitLines: [
          "باب السبت، ساحة الحرية",
          "شارع قديري عمر رقم 4 — البليدة",
          "البليدة، الجزائر",
        ],
        followTitle: "تابعنا",
        emergencyTitle: "حالة طارئة",
        emergencyText: { pre: "فقدان نظر مفاجئ أو ومضات أو إصابة؟ اتصل بخطنا الطارئ — ", phone: "+213 799 380 260", post: "." },
      },
    },

    footer: {
      tagline: "عيادة مختصة في طب وجراحة العيون بالبليدة — نُعيد النظر، ونعيد الثقة.",
      cols: {
        care:   { title: "الرعاية", items: ["سمايل برو", "الفيمتو ليزك", "الماء البيضاء", "القرنية المخروطية", "الجلوكوما"] },
        clinic: { title: "العيادة", items: ["التقديم", "الطبيب", "المرضى", "الخدمات"] },
        contact:{ title: "الاتصال", items: ["+213 799 380 260", "+213 663 837 102", "باب السبت، البليدة", "@ibsar_center"] },
      },
      copyright: "مركز الإبصار · مجموعة طب وجراحة العيون، البليدة. جميع الحقوق محفوظة.",
      tail: { pre: "تطوير ", em: "ThriveDoc", post: " · أوّل شريك طبي في الجزائر" },
    },
  },
};
