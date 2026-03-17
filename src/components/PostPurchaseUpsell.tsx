// Post-purchase upsell card — shown on thank-you page for digital-only buyers
import { getUpgradeLink } from "@/lib/stripe";
import { trackEvent } from "@/lib/analytics";

interface PostPurchaseUpsellProps {
  email?: string;
}

export function PostPurchaseUpsell({ email = "" }: PostPurchaseUpsellProps) {
  function handleClick() {
    trackEvent("cta_clicked", { phase: "post_purchase", label: "upgrade_complete" });
  }

  return (
    <div className="rounded-2xl border border-crimson/15 bg-crimson/[0.04] p-8 text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-crimson/70 mb-3">
        UPGRADE YOUR ORDER
      </p>
      <h3 className="font-serif text-2xl font-bold text-ivory mb-3">
        Upgrade to the Complete Package
      </h3>
      <p className="font-sans text-base text-lavender mb-6 max-w-md mx-auto">
        Add both physical books — the hardcover and workbook — shipped to your
        door for $90.
      </p>
      <a
        href={getUpgradeLink(email)}
        onClick={handleClick}
        className="inline-block bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30"
      >
        Add Both Physical Books — $90
      </a>
    </div>
  );
}
