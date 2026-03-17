// Final CTA section — last-chance close with urgency
import { Shield } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { DIGITAL_PRICE } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export function FinalCTASection() {
  return (
    <section className="px-6 py-24 md:px-16 bg-[radial-gradient(ellipse_at_center,_rgba(183,28,28,0.06)_0%,_transparent_50%)]">
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ivory mb-6">
            Every Contract You Sign Without This Knowledge Is a{" "}
            <span className="text-crimson">
              Risk You Don&apos;t Need to Take.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="font-sans text-base text-lavender mb-8">
            ${DIGITAL_PRICE} today could save you thousands tomorrow. Instant
            delivery. 30-day money-back guarantee. Zero risk.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <a
            href="/checkout"
            onClick={() =>
              trackEvent("cta_clicked", {
                phase: "final_cta",
                label: "get_the_book",
              })
            }
            className="inline-block bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30 mb-4"
          >
            Get the Book — ${DIGITAL_PRICE}
          </a>
          <p className="font-sans text-xs text-royal-300 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Secure checkout powered by Stripe. 30-day guarantee.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
