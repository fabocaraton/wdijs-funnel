// Exit-intent modal — captures email with free chapter offer
import { useState } from "react";
import { Gift, X } from "lucide-react";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { trackEvent } from "@/lib/analytics";

export function ExitIntentModal() {
  const { showModal, closeModal } = useExitIntent(5000);
  const { submit, isLoading, isSuccess } = useFormSubmit("lead_captures");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  if (!showModal) return null;

  trackEvent("exit_intent_shown");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    await submit({ first_name: firstName, email, source: "exit-intent" });
    trackEvent("exit_intent_converted", { email });
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-royal-900 border border-crimson/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-royal-300 hover:text-ivory transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Gift className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ivory mb-2">
              Check Your Inbox
            </h3>
            <p className="font-sans text-sm text-lavender mb-6">
              Your free chapter is on the way.
            </p>
            <button
              onClick={closeModal}
              className="font-sans text-sm text-royal-300 hover:text-ivory transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center">
                <Gift className="w-6 h-6 text-crimson" />
              </div>
            </div>
            <h3 className="font-serif text-2xl font-bold text-ivory text-center mb-2">
              Wait — Before You Go
            </h3>
            <p className="font-sans text-sm text-lavender text-center mb-6">
              Get a free partial chapter from the What Did I Just Sign?
              Workbook. No purchase necessary.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-ivory placeholder:text-royal-300 focus:outline-none focus:border-crimson/30"
              />
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-ivory placeholder:text-royal-300 focus:outline-none focus:border-crimson/30"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-crimson text-white font-sans font-bold rounded-xl px-6 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30 disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Me the Free Chapter"}
              </button>
            </form>
            <p className="font-sans text-[10px] text-royal-300 text-center mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
