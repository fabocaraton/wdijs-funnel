// Order bump toggle card — physical hardcover add-on for checkout page
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface OrderBumpCardProps {
  isSelected: boolean;
  onToggle: () => void;
}

export function OrderBumpCard({ isSelected, onToggle }: OrderBumpCardProps) {
  function handleToggle() {
    trackEvent("order_bump_toggled", { added: !isSelected });
    onToggle();
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "w-full rounded-2xl p-6 text-left transition-all",
        isSelected
          ? "border-2 border-crimson bg-crimson/[0.06]"
          : "border border-dashed border-white/10 bg-white/[0.02] hover:border-white/20"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div
          className={cn(
            "w-6 h-6 rounded shrink-0 flex items-center justify-center mt-0.5 transition-all",
            isSelected ? "bg-crimson" : "border border-white/20"
          )}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-crimson" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-crimson">
              ONE-TIME ADD-ON
            </span>
          </div>
          <p className="font-serif text-lg font-bold text-ivory mb-1">
            Add the Physical Hardcover
          </p>
          <p className="font-sans text-sm text-lavender mb-3">
            Get the physical hardcover book shipped to your door. Instant digital
            access included — the hardcover ships in 5-7 business days.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-sm text-royal-300 line-through">
              $67
            </span>
            <span className="font-serif text-xl font-bold text-crimson">
              +$40
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
