// FAQ accordion section — custom accordion with chevron rotation
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { FAQS } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    const isOpening = openId !== id;
    setOpenId(isOpening ? id : null);
    if (isOpening) {
      trackEvent("faq_opened", { question_id: id });
    }
  }

  return (
    <section className="px-6 py-24 md:px-16">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-crimson/70 mb-4 text-center">
            COMMON QUESTIONS
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ivory text-center mb-12">
            Everything You Need to Know
          </h2>
        </FadeIn>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeIn key={faq.id} delay={i * 60}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-sans text-base font-medium text-ivory pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-royal-300 shrink-0 transition-transform duration-300 ${
                      openId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="font-sans text-base leading-relaxed text-lavender px-6 pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
