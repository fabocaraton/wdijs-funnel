// Social proof testimonials — metric-first cards
import { FadeIn } from "@/components/FadeIn";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="px-6 py-24 md:px-16 bg-royal-700/30">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-crimson/70 mb-4 text-center">
            WHAT READERS SAY
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ivory text-center mb-12">
            Real People. Real Results.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.id} delay={i * 80}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 hover:border-crimson/15 hover:bg-crimson/[0.03] transition-all">
                <p className="font-serif text-2xl font-bold text-crimson mb-4">
                  {t.metric}
                </p>
                <p className="font-sans text-base text-lavender italic mb-6 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center">
                    <span className="font-sans text-sm font-bold text-crimson">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ivory">
                      {t.name}
                    </p>
                    <p className="font-sans text-xs text-royal-300">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
