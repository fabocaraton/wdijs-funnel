// Sticky bottom CTA bar — appears after scroll, label evolves with depth
import { useScrollPercentage } from "@/hooks/useScrollPosition";
import { DIGITAL_PRICE } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export function StickyCTA() {
  const scrollPct = useScrollPercentage();

  if (scrollPct < 8) return null;

  let label = "Watch the Breakdown";
  let href = "#vsl-video";
  let isScroll = true;

  if (scrollPct >= 70) {
    label = `Get the Digital Bundle — $${DIGITAL_PRICE}`;
    href = "/checkout";
    isScroll = false;
  } else if (scrollPct >= 40) {
    label = `Secure Your Copy — $${DIGITAL_PRICE}`;
    href = "/checkout";
    isScroll = false;
  } else if (scrollPct >= 15) {
    label = "Get the Book";
    href = "/checkout";
    isScroll = false;
  }

  function handleClick(e: React.MouseEvent) {
    trackEvent("cta_clicked", { phase: "sticky", label, scroll_pct: scrollPct });
    if (isScroll) {
      e.preventDefault();
      const el = document.getElementById("vsl-video");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-royal-900/95 backdrop-blur-lg border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <p className="hidden md:block font-sans text-sm text-royal-300">
          What Did I Just Sign? &middot; 30-day guarantee
        </p>
        <a
          href={href}
          onClick={handleClick}
          className="bg-crimson text-white font-sans font-bold rounded-lg px-6 py-3 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30 text-sm ml-auto"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
