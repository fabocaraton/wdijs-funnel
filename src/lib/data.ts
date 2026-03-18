import type {
  SiteStat,
  PainPoint,
  OfferStackItem,
  Testimonial,
  FAQItem,
  RiskQuestion,
  RiskResult,
  Offer,
  DownloadItem,
  NextStep,
  NavigationItem,
} from "@/types";

// ── Site Identity ──
export const SITE_NAME = "What Did I Just Sign?";
export const SITE_AUTHOR = "Charles Stewart III";
export const SITE_TAGLINE =
  "The step-by-step system that teaches athletes, entertainers, entrepreneurs, and professionals how to read, question, and negotiate every agreement — before it costs them everything.";

// ── Hero Headlines (A/B tested) ──
export const HERO_HEADLINE_A = "Stop Signing Contracts You Don't Understand";
export const HERO_HEADLINE_B =
  "Every Signature Is a Financial Decision. Are You Making It Blind?";

// ── Trust Stats ──
export const STATS: SiteStat[] = [
  { id: "copies", number: "10K+", label: "Copies Sold" },
  { id: "rating", number: "4.9\u2605", label: "Reader Rating" },
  { id: "guarantee", number: "30-Day", label: "Money-Back Guarantee" },
  { id: "delivery", number: "Instant", label: "Digital Delivery" },
];

// ── Pain Points ──
export const PAIN_POINTS: PainPoint[] = [
  {
    id: "signed-blind",
    icon: "FileWarning",
    title: "You Signed It Without Reading It",
    description:
      "Most people skim contracts, trust the other party, and sign. By the time they realize what they agreed to, it\u2019s already binding.",
  },
  {
    id: "no-vocab",
    icon: "HelpCircle",
    title: "You Don\u2019t Know What the Words Mean",
    description:
      "Indemnification. Arbitration clauses. Non-compete riders. If you can\u2019t define them, you can\u2019t protect yourself from them.",
  },
  {
    id: "leaving-money",
    icon: "AlertTriangle",
    title: "You\u2019re Leaving Money on the Table",
    description:
      "Every contract is a negotiation. If you don\u2019t know what\u2019s negotiable, you\u2019re accepting terms that favor the other side \u2014 every time.",
  },
];

// ── Risk Snapshot Quiz ──
export const RISK_QUESTIONS: RiskQuestion[] = [
  {
    id: "q1",
    question:
      "Do you sign contracts without an independent legal review?",
  },
  {
    id: "q2",
    question:
      "Have you ever felt unsure about a specific word, clause, or sentence in a contract?",
  },
  {
    id: "q3",
    question:
      "Do you negotiate terms yourself \u2014 without professional guidance?",
  },
];

export const RISK_RESULTS: RiskResult[] = [
  {
    level: "low",
    label: "Low Risk",
    icon: "CheckCircle",
    message:
      "You\u2019re already cautious \u2014 this book will sharpen your edge even further.",
    cta: "Level Up Your Contract IQ",
  },
  {
    level: "moderate",
    label: "Moderate Risk",
    icon: "AlertTriangle",
    message:
      "You\u2019ve got some blind spots. This book will close them before they cost you.",
    cta: "Close Your Blind Spots",
  },
  {
    level: "high",
    label: "High Risk",
    icon: "Shield",
    message:
      "You\u2019re exposed. Every contract you sign without this knowledge is a gamble you don\u2019t need to take.",
    cta: "Protect Yourself Now",
  },
];

// ── Offer Stack (Digital Starter $44) ──
export const OFFER_STACK: OfferStackItem[] = [
  {
    id: "ebook",
    item: '\u201CWhat Did I Just Sign?\u201D \u2014 The Complete eBook',
    perceivedValue: "$47",
  },
  {
    id: "workbook",
    item: '\u201CWDIJS Workbook\u201D \u2014 Exercises & Templates (eBook)',
    perceivedValue: "$29",
  },
  {
    id: "vocab",
    item: "Contract Vocabulary Quick-Reference Guide",
    perceivedValue: "$27",
  },
  {
    id: "clauses",
    item: "Real-World Clause Breakdown Examples",
    perceivedValue: "$39",
  },
  {
    id: "podcast",
    item: "The Credentials Show \u2014 Exclusive Bonus Episode",
    perceivedValue: "$15",
  },
  {
    id: "terms",
    item: "100+ Financial Terms with Definitions & Examples",
    perceivedValue: "$47",
  },
  {
    id: "visuals",
    item: "25+ Visual Images Bringing Concepts to Life",
    perceivedValue: "$23",
  },
  {
    id: "exercises",
    item: "150+ Exercises, Quizzes & Group Activities",
    perceivedValue: "$20",
  },
];

export const TOTAL_PERCEIVED_VALUE = "$247";
export const DIGITAL_PRICE = 44;
export const COMPLETE_PRICE = 127;
export const BUMP_PRICE = 40;
export const WORKBOOK_PRICE = 19;

// ── Offers ──
export const OFFERS: Offer[] = [
  {
    id: "digital-starter",
    name: "The Digital Starter",
    price: DIGITAL_PRICE,
    description: "Instant digital access to everything.",
    perceivedValue: TOTAL_PERCEIVED_VALUE,
    items: OFFER_STACK.map((i) => i.item),
    isDefault: true,
  },
  {
    id: "complete-package",
    name: "The Complete Package",
    price: COMPLETE_PRICE,
    description:
      "Everything above PLUS the physical hardcover book and physical workbook shipped to your door. Instant digital access while your copies ship.",
    perceivedValue: "$497",
    items: [
      ...OFFER_STACK.map((i) => i.item),
      "Physical Hardcover Book (ships 5\u20137 days)",
      "Physical Workbook (ships 5\u20137 days)",
      "Free Standard Shipping",
    ],
  },
];

// ── Testimonials ──
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "adrienne",
    name: "Adrienne",
    role: "Founder, Prestige Luxe",
    metric: "Business Protected",
    quote:
      "This book changed how I approach every partnership agreement. I finally understand what I\u2019m signing before I sign it.",
  },
  {
    id: "tevin",
    name: "Tevin Allen",
    role: "Co-Founder, GoldFeet Global",
    metric: "Renegotiated Deals",
    quote:
      "Charles breaks it down in a way that doesn\u2019t make you feel stupid. I use this before every new business deal now.",
  },
  {
    id: "annie",
    name: "Annie Grant",
    role: "Book Coach & Business Strategist",
    metric: "Recommends to All Clients",
    quote:
      "Every entrepreneur I work with is getting a copy. This is the missing piece in financial literacy.",
  },
  {
    id: "shomriyah",
    name: "ShomriYah Yisrael",
    role: "Former Univ of Michigan Wide Receiver",
    metric: "Athlete Approved",
    quote:
      "I wish I had this book before I signed my first deal. It would have saved me from a lot of confusion and bad terms.",
  },
  {
    id: "monique",
    name: "Monique",
    role: "Co-Founder, Divine Luminance Juices",
    metric: "Uses Before Every Deal",
    quote:
      "The workbook alone is worth triple the price. I use it before every closing now.",
  },
  {
    id: "lashundra",
    name: "LaShundra Strother-Wiley",
    role: "Edward Jones, Certified Exit Planning Advisor",
    metric: "Industry Endorsed",
    quote:
      "Even as a financial professional, I found new angles in this book. It\u2019s that thorough.",
  },
];

// ── FAQ ──
export const FAQS: FAQItem[] = [
  {
    id: "beginners",
    question:
      "Is this book for beginners? I don\u2019t know anything about contracts.",
    answer:
      "Absolutely. This book was written specifically for people who have never studied law. Every concept is explained in plain English with real-world examples. If you can read this sentence, you can understand this book.",
  },
  {
    id: "worth",
    question: "Why is this worth $44?",
    answer:
      "One bad clause in one contract can cost you thousands \u2014 sometimes hundreds of thousands. This book costs less than a single hour with most attorneys, and you\u2019ll use what you learn for the rest of your career.",
  },
  {
    id: "payment-secure",
    question: "Is my payment secure?",
    answer:
      "Yes. All payments are processed through Stripe, the same payment infrastructure used by Amazon, Google, and Shopify. Your card information never touches our servers.",
  },
  {
    id: "instant-access",
    question: "Do I get instant access?",
    answer:
      "Yes. After purchase, you\u2019ll be redirected to a delivery page where you can immediately download all digital materials. You\u2019ll also receive a confirmation email with your download links.",
  },
  {
    id: "refund",
    question: "Is there a refund policy?",
    answer:
      "Yes. If the book doesn\u2019t change how you approach contracts within 30 days, email us and we\u2019ll refund your purchase. No questions, no hassle.",
  },
  {
    id: "who-is-charles",
    question: "Who is Charles Stewart III?",
    answer:
      "Charles is a dually licensed financial professional (Series 7 stockbroker and Series 65 wealth manager) affiliated with Pinnacle Investments, LLC. He works with athletes, entertainers, entrepreneurs, and salaried professionals \u2014 the exact people who need this book most.",
  },
  {
    id: "replace-lawyer",
    question: "Does this replace hiring a lawyer?",
    answer:
      "No \u2014 and it\u2019s not designed to. This book gives you the knowledge to understand what you\u2019re signing, ask better questions, and know when you DO need an attorney. It makes you a more informed participant in every deal.",
  },
  {
    id: "physical",
    question: "What if I want the physical book too?",
    answer:
      "You can add the physical hardcover during checkout for $40 more, or choose The Complete Package ($127) which includes both physical books plus all digital materials with instant access while your copies ship.",
  },
];

// ── Thank-You Page Downloads ──
export const DIGITAL_DOWNLOADS: DownloadItem[] = [
  {
    id: "book",
    title: "What Did I Just Sign? \u2014 The eBook",
    description: "PDF \u2014 Instant Download",
    downloadUrl: "#book-download",
    icon: "BookOpen",
  },
  {
    id: "workbook",
    title: "WDIJS Workbook \u2014 Exercises & Templates",
    description: "PDF \u2014 Instant Download",
    downloadUrl: "#workbook-download",
    icon: "FileText",
  },
  {
    id: "vocab",
    title: "Contract Vocabulary Quick-Reference Guide",
    description: "PDF \u2014 Instant Download",
    downloadUrl: "#vocab-download",
    icon: "List",
  },
  {
    id: "examples",
    title: "Real-World Clause Breakdown Examples",
    description: "PDF \u2014 Instant Download",
    downloadUrl: "#examples-download",
    icon: "FileSearch",
  },
  {
    id: "podcast",
    title: "The Credentials Show \u2014 Bonus Episode",
    description: "Audio \u2014 Stream or Download",
    downloadUrl: "#podcast-download",
    icon: "Headphones",
  },
];

export const WORKBOOK_DOWNLOADS: DownloadItem[] = [
  {
    id: "workbook",
    title: "WDIJS Workbook",
    description: "PDF \u2014 Instant Download",
    downloadUrl: "#workbook-download",
    icon: "FileText",
  },
  {
    id: "vocab",
    title: "Contract Vocabulary Quick-Reference Guide",
    description: "PDF \u2014 Instant Download",
    downloadUrl: "#vocab-download",
    icon: "List",
  },
];

export const NEXT_STEPS: NextStep[] = [
  {
    id: "read",
    title: "Read Chapter 1 tonight.",
    description:
      "It takes 15 minutes and changes how you see every agreement.",
  },
  {
    id: "use",
    title: "Use the workbook",
    description:
      "the next time you receive a contract. Walk through it clause by clause.",
  },
  {
    id: "listen",
    title: "Listen to the bonus episode",
    description:
      "of The Credentials Show for real-world contract stories and how to avoid common traps.",
  },
];

// ── Footer Links ──
export const FOOTER_LINKS: NavigationItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
  { label: "CharlesStewartIII.com", href: "https://charlesstewartiii.com", isExternal: true },
];

// ── Compliance Disclosure ──
export const COMPLIANCE_DISCLOSURE =
  "Charles Stewart III is a registered representative and investment adviser representative affiliated with Pinnacle Investments, LLC. Securities offered through Pinnacle Investments, LLC, member FINRA/SIPC. Advisory services offered through Pinnacle Investments, LLC, a registered investment adviser. This book and related materials are educational in nature and do not constitute legal, tax, or investment advice. Consult qualified professionals for advice specific to your situation.";
