// Interactive Risk Snapshot quiz — 3 yes/no questions with dynamic result
import { useState } from "react";
import { CheckCircle, AlertTriangle, Shield } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { RISK_QUESTIONS, RISK_RESULTS } from "@/lib/data";
import { trackEvent, getSessionId_public } from "@/lib/analytics";
import { insertRow } from "@/lib/supabase";

const resultIconMap: Record<string, React.ReactNode> = {
  CheckCircle: <CheckCircle className="w-10 h-10 text-green-500" />,
  AlertTriangle: <AlertTriangle className="w-10 h-10 text-yellow-500" />,
  Shield: <Shield className="w-10 h-10 text-crimson" />,
};

export function RiskSnapshotSection() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [hasStarted, setHasStarted] = useState(false);

  const answeredCount = Object.values(answers).filter((a) => a !== null).length;
  const yesCount = Object.values(answers).filter((a) => a === true).length;
  const allAnswered = answeredCount === RISK_QUESTIONS.length;

  function getResult() {
    if (yesCount === 0) return RISK_RESULTS[0]; // low
    if (yesCount === 1) return RISK_RESULTS[1]; // moderate
    return RISK_RESULTS[2]; // high
  }

  function handleAnswer(questionId: string, answer: boolean) {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("risk_snapshot_started");
    }

    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Save to Supabase
    insertRow("micro_responses", {
      session_id: getSessionId_public(),
      question_id: questionId,
      answer: answer ? "yes" : "no",
    });

    // Check if all answered
    const newCount = Object.values(newAnswers).filter((a) => a !== null).length;
    if (newCount === RISK_QUESTIONS.length) {
      const score = Object.values(newAnswers).filter((a) => a === true).length;
      trackEvent("risk_snapshot_completed", { score });
      insertRow("risk_snapshots", {
        session_id: getSessionId_public(),
        score,
        answers: newAnswers,
      });
    }
  }

  const result = getResult();

  return (
    <section className="px-6 py-24 md:px-16 bg-royal-700/30">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-crimson/70 mb-4 text-center">
            QUICK ASSESSMENT
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ivory text-center mb-3">
            Your Contract Risk Snapshot
          </h2>
          <p className="font-sans text-base text-lavender text-center mb-12">
            Answer three quick questions. See where you stand.
          </p>
        </FadeIn>

        <div className="space-y-4 mb-8">
          {RISK_QUESTIONS.map((q, i) => (
            <FadeIn key={q.id} delay={i * 80}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="font-sans text-base text-ivory mb-4">
                  {i + 1}. {q.question}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    className={`px-6 py-2 rounded-lg font-sans font-semibold text-sm transition-all ${
                      answers[q.id] === true
                        ? "bg-crimson text-white"
                        : "bg-white/[0.05] text-lavender hover:bg-white/[0.1]"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    className={`px-6 py-2 rounded-lg font-sans font-semibold text-sm transition-all ${
                      answers[q.id] === false
                        ? "bg-white/10 text-white"
                        : "bg-white/[0.05] text-lavender hover:bg-white/[0.1]"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {allAnswered && (
          <FadeIn>
            <div className="rounded-2xl border border-crimson/20 bg-crimson/[0.04] p-8 text-center">
              <div className="flex justify-center mb-4">
                {resultIconMap[result.icon]}
              </div>
              <h3 className="font-serif text-2xl font-bold text-ivory mb-2">
                {result.label}
              </h3>
              <p className="font-sans text-base text-lavender mb-6">
                {result.message}
              </p>
              <a
                href="/checkout"
                onClick={() =>
                  trackEvent("cta_clicked", {
                    phase: "risk_snapshot",
                    label: result.cta,
                    score: yesCount,
                  })
                }
                className="inline-block bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30"
              >
                {result.cta}
              </a>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
