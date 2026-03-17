// Problem agitation section — 3 pain point cards
import { FileWarning, HelpCircle, AlertTriangle } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { PAIN_POINTS } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  FileWarning: <FileWarning className="w-8 h-8 text-crimson/60" />,
  HelpCircle: <HelpCircle className="w-8 h-8 text-crimson/60" />,
  AlertTriangle: <AlertTriangle className="w-8 h-8 text-crimson/60" />,
};

export function ProblemSection() {
  return (
    <section className="px-6 py-24 md:px-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-crimson/70 mb-4 text-center">
            THE PROBLEM
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ivory text-center mb-4">
            Most People Don&apos;t Lose Money Because They Made Bad Deals.
          </h2>
          <p className="font-serif text-3xl md:text-5xl font-bold text-crimson text-center mb-16">
            They Lose It Because They Didn&apos;t Understand the Deal.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <FadeIn key={point.id} delay={i * 120}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 hover:border-crimson/15 hover:bg-crimson/[0.03] transition-all">
                <div className="mb-4">{iconMap[point.icon]}</div>
                <h3 className="font-serif text-xl font-bold text-ivory mb-3">
                  {point.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-lavender">
                  {point.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
