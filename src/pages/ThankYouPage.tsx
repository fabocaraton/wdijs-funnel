// Thank You Page (/thank-you) — post-purchase delivery + upsell
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, Download, Truck } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { PostPurchaseUpsell } from "@/components/PostPurchaseUpsell";
import { Footer } from "@/components/Footer";
import {
  SITE_NAME,
  DIGITAL_DOWNLOADS,
  WORKBOOK_DOWNLOADS,
  NEXT_STEPS,
} from "@/lib/data";
import { trackPageView } from "@/lib/analytics";

export function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const offer = searchParams.get("offer") || "digital";
  const hasBump = searchParams.get("bump") === "true";
  const email = searchParams.get("email") || "";

  const isWorkbookOnly = offer === "workbook";
  const isComplete = offer === "complete";
  const showPhysical = hasBump || isComplete;
  const showUpsell = offer === "digital" && !hasBump;

  const downloads = isWorkbookOnly ? WORKBOOK_DOWNLOADS : DIGITAL_DOWNLOADS;

  useEffect(() => {
    trackPageView("thank_you");
  }, []);

  return (
    <div className="min-h-screen bg-royal-900">
      {/* Minimal header */}
      <header className="border-b border-white/[0.05] px-6 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-sm font-bold text-ivory">{SITE_NAME}</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Success header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ivory mb-3">
              You&apos;re In. Here&apos;s Everything.
            </h1>
            <p className="font-sans text-base text-lavender">
              Your downloads are ready below.
              {email && ` A confirmation has been sent to ${email}.`}
            </p>
          </div>
        </FadeIn>

        {/* Download cards */}
        <div className="space-y-3 mb-10">
          {downloads.map((item, i) => (
            <FadeIn key={item.id} delay={i * 80}>
              <a
                href={item.downloadUrl}
                className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:border-crimson/15 hover:bg-crimson/[0.03] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-crimson" />
                </div>
                <div className="flex-1">
                  <p className="font-sans text-base font-medium text-ivory">
                    {item.title}
                  </p>
                  <p className="font-sans text-xs text-royal-300">
                    {item.description}
                  </p>
                </div>
                <span className="font-sans text-xs text-crimson font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Download
                </span>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Physical shipping info */}
        {showPhysical && (
          <FadeIn>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 mb-10 flex items-start gap-4">
              <Truck className="w-6 h-6 text-crimson shrink-0 mt-0.5" />
              <div>
                <p className="font-serif text-lg font-bold text-ivory mb-1">
                  Your Physical Copies Are On the Way
                </p>
                <p className="font-sans text-sm text-lavender">
                  Estimated delivery: 5-7 business days. You&apos;ll receive a
                  shipping confirmation email with tracking.
                </p>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Post-purchase upsell */}
        {showUpsell && (
          <FadeIn>
            <div className="mb-10">
              <PostPurchaseUpsell email={email} />
            </div>
          </FadeIn>
        )}

        {/* Next steps */}
        <FadeIn>
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-ivory mb-6 text-center">
              What to Do Next
            </h2>
            <div className="space-y-4">
              {NEXT_STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                    <span className="font-serif text-sm font-bold text-crimson">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-base font-semibold text-ivory">
                      {step.title}
                    </p>
                    <p className="font-sans text-sm text-lavender">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Author connect */}
        <FadeIn>
          <div className="text-center">
            <a
              href="https://charlesstewartiii.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-royal-300 hover:text-ivory transition-colors"
            >
              Connect with Charles at CharlesStewartIII.com &rarr;
            </a>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
