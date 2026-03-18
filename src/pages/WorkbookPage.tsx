// Workbook Page (/workbook) — standalone Offer 4 sales page for retarget/recovery
import { useEffect } from "react";
import { Check, Shield } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { WORKBOOK_PRICE, TESTIMONIALS } from "@/lib/data";
import { getStripeLink } from "@/lib/stripe";
import { trackPageView, trackEvent } from "@/lib/analytics";

const workbookFeatures = [
  "150+ exercises, quizzes, and group activities",
  "100+ financial terms decoded with plain-English definitions",
  "Real-world clause breakdown examples",
  "Contract vocabulary quick-reference guide",
  "Instant PDF delivery — start reading in 60 seconds",
];

const workbookFAQs = [
  {
    id: "standalone",
    question: "Can I use this without the main book?",
    answer:
      "Yes. The workbook is designed to stand alone as a practical toolkit. It includes all the key terms, exercises, and references you need. That said, it pairs powerfully with the main book for the full learning experience.",
  },
  {
    id: "need-book",
    question: "Do I need the book first?",
    answer:
      "Not required. The workbook is valuable on its own. But if you want the complete educational experience — the stories, frameworks, and deeper context — the Digital Starter bundle includes both for $44.",
  },
  {
    id: "instant",
    question: "Is delivery instant?",
    answer:
      "Yes. After purchase, you'll be redirected to a page where you can immediately download the workbook PDF.",
  },
];

// Use Monique's testimonial for workbook-specific proof
const workbookTestimonial = TESTIMONIALS.find((t) => t.id === "monique")!;

export function WorkbookPage() {
  useEffect(() => {
    trackPageView("workbook");
  }, []);

  function handleCTA() {
    trackEvent("cta_clicked", { phase: "workbook", label: "get_workbook" });
    const link = getStripeLink("workbook", false, "");
    if (link) {
      window.location.href = link;
    } else {
      alert("Stripe Payment Link not configured. Please set up your .env file.");
    }
  }

  return (
    <div className="min-h-screen bg-royal-900">
      {/* Hero */}
      <section className="px-6 py-24 md:px-16 md:py-32 bg-[radial-gradient(ellipse_at_top,_rgba(183,28,28,0.08)_0%,_transparent_60%)]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-crimson/70 mb-6">
              THE COMPANION WORKBOOK
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-ivory mb-6">
              The Companion Workbook That Makes the Book Actionable
            </h1>
            <p className="font-sans text-lg text-lavender max-w-2xl mx-auto mb-10">
              150+ exercises, quizzes, and activities. 100+ financial terms
              decoded. The practical toolkit for anyone who wants to understand
              what they&apos;re signing.
            </p>
            <button
              onClick={handleCTA}
              className="bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30"
            >
              Get the Workbook — ${WORKBOOK_PRICE}
            </button>
          </FadeIn>
        </div>
      </section>

      {/* What's Inside */}
      <section className="px-6 py-24 md:px-16">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ivory text-center mb-8">
              What&apos;s Inside
            </h2>
            <div className="space-y-4">
              {workbookFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-crimson mt-0.5 shrink-0" />
                  <span className="font-sans text-base text-lavender">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-16 md:px-16 bg-royal-700/30">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="font-serif text-2xl font-bold text-crimson mb-4">
              {workbookTestimonial.metric}
            </p>
            <p className="font-sans text-lg text-lavender italic mb-4">
              &ldquo;{workbookTestimonial.quote}&rdquo;
            </p>
            <p className="font-sans text-sm text-royal-300">
              {workbookTestimonial.name}, {workbookTestimonial.role}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA repeat */}
      <section className="px-6 py-16 md:px-16">
        <div className="max-w-md mx-auto text-center">
          <FadeIn>
            <button
              onClick={handleCTA}
              className="bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30 mb-3"
            >
              Get the Workbook — ${WORKBOOK_PRICE}
            </button>
            <p className="font-sans text-xs text-royal-300 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Instant delivery. 30-day guarantee.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 md:px-16">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-serif text-2xl font-bold text-ivory text-center mb-8">
              Questions
            </h2>
            <div className="space-y-4">
              {workbookFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                >
                  <p className="font-sans text-base font-medium text-ivory mb-2">
                    {faq.question}
                  </p>
                  <p className="font-sans text-sm text-lavender leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
