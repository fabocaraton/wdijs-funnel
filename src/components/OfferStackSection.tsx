// Hormozi-style value stack with offer pricing
import { Check, Shield } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import {
  OFFER_STACK,
  TOTAL_PERCEIVED_VALUE,
  DIGITAL_PRICE,
  COMPLETE_PRICE,
} from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export function OfferStackSection() {
  return (
    <section className="px-6 py-24 md:px-16">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-crimson/70 mb-4 text-center">
            WHAT YOU GET
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ivory text-center mb-12">
            Everything Inside the Digital Bundle
          </h2>
        </FadeIn>

        {/* Main offer card */}
        <FadeIn delay={100}>
          <div className="rounded-2xl border border-crimson/15 bg-white/[0.02] p-8 md:p-10 mb-6">
            <div className="space-y-4 mb-8">
              {OFFER_STACK.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-crimson mt-0.5 shrink-0" />
                    <span className="font-sans text-base text-ivory">
                      {item.item}
                    </span>
                  </div>
                  <span className="font-sans text-sm text-royal-300 line-through whitespace-nowrap">
                    {item.perceivedValue}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.08] pt-8 text-center">
              <p className="font-sans text-sm text-royal-300 mb-2">
                Total Value:{" "}
                <span className="line-through">{TOTAL_PERCEIVED_VALUE}</span>
              </p>
              <p className="font-serif text-5xl font-black text-crimson mb-2">
                ${DIGITAL_PRICE}
              </p>
              <p className="font-sans text-xs text-royal-300 mb-6">
                One-time purchase. Instant delivery.
              </p>
              <a
                href="/checkout"
                onClick={() =>
                  trackEvent("cta_clicked", {
                    phase: "offer_stack",
                    label: "digital_starter",
                  })
                }
                className="inline-block bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30 mb-4"
              >
                Get the Digital Bundle — ${DIGITAL_PRICE}
              </a>
              <p className="font-sans text-xs text-royal-300 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                30-day money-back guarantee. No questions asked.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Secondary: Complete Package */}
        <FadeIn delay={200}>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
            <p className="font-sans text-base text-lavender mb-2">
              Want the physical copies too?
            </p>
            <p className="font-serif text-2xl font-bold text-ivory mb-3">
              The Complete Package — ${COMPLETE_PRICE}
            </p>
            <p className="font-sans text-sm text-lavender mb-6 max-w-lg mx-auto">
              Includes everything above PLUS the physical hardcover book and
              physical workbook shipped to your door. Instant digital access
              while your copies ship.
            </p>
            <a
              href="/checkout?offer=complete"
              onClick={() =>
                trackEvent("cta_clicked", {
                  phase: "offer_stack",
                  label: "complete_package",
                })
              }
              className="inline-block border border-white/10 text-lavender font-sans font-medium rounded-xl px-6 py-3 hover:border-crimson/30 hover:text-white transition-all"
            >
              Get the Complete Package — ${COMPLETE_PRICE}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
