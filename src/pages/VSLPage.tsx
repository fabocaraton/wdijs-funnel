// VSL Page (/) — Main sales funnel page. No navigation. Zero escape routes.
import { useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { VSLVideoSection } from "@/components/VSLVideoSection";
import { ProblemSection } from "@/components/ProblemSection";
import { RiskSnapshotSection } from "@/components/RiskSnapshotSection";
import { OfferStackSection } from "@/components/OfferStackSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { StickyCTA } from "@/components/StickyCTA";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { Footer } from "@/components/Footer";
import { trackPageView, trackScrollDepth } from "@/lib/analytics";
import { useScrollPercentage } from "@/hooks/useScrollPosition";

export function VSLPage() {
  const scrollPct = useScrollPercentage();

  useEffect(() => {
    trackPageView("vsl");
  }, []);

  useEffect(() => {
    trackScrollDepth(scrollPct);
  }, [scrollPct]);

  return (
    <div className="min-h-screen bg-royal-900">
      <HeroSection />
      <VSLVideoSection />
      <ProblemSection />
      <RiskSnapshotSection />
      <OfferStackSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <StickyCTA />
      <ExitIntentModal />
    </div>
  );
}
