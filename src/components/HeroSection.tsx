// Hero section — interrupt with headline, subheadline, CTA, trust stats
import { FadeIn } from "@/components/FadeIn";
import { SITE_AUTHOR, SITE_TAGLINE, STATS, HERO_HEADLINE_A, HERO_HEADLINE_B } from "@/lib/data";
import { getVariant } from "@/lib/abtest";
import { trackEvent } from "@/lib/analytics";

export function HeroSection() {
  const variant = getVariant("hero_headline");
  const headline = variant === "A" ? HERO_HEADLINE_A : HERO_HEADLINE_B;

  function handleWatchClick() {
    trackEvent("cta_clicked", { phase: "hero", label: "watch_breakdown" });
    const videoEl = document.getElementById("vsl-video");
    if (videoEl) videoEl.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative px-6 py-24 md:px-16 md:py-32 bg-[radial-gradient(ellipse_at_top,_rgba(183,28,28,0.08)_0%,_transparent_60%)]">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-crimson/70 mb-6">
            BY {SITE_AUTHOR.toUpperCase()}
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold text-ivory leading-tight mb-6">
            {headline}
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="font-sans text-lg md:text-xl text-lavender max-w-2xl mx-auto mb-10">
            {SITE_TAGLINE}
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={handleWatchClick}
              className="bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30"
            >
              Watch the Breakdown
            </button>
            <a
              href="/checkout"
              className="border border-white/10 text-lavender font-sans font-medium rounded-xl px-6 py-3 hover:border-crimson/30 hover:text-white transition-all"
            >
              Skip to checkout &rarr;
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="border-t border-white/5 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="font-serif text-2xl font-bold text-crimson">
                  {stat.number}
                </p>
                <p className="font-sans text-xs text-royal-300 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
