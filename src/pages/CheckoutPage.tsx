// Checkout Page (/checkout) — order summary, bump toggle, Stripe redirect
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, Lock, Shield, Zap, Check } from "lucide-react";
import { OrderBumpCard } from "@/components/OrderBumpCard";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import {
  SITE_NAME,
  OFFER_STACK,
  DIGITAL_PRICE,
  COMPLETE_PRICE,
  BUMP_PRICE,
} from "@/lib/data";
import { getStripeLink } from "@/lib/stripe";
import { trackEvent, trackPageView } from "@/lib/analytics";
import { insertRow } from "@/lib/supabase";

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const offerParam = searchParams.get("offer");
  const isComplete = offerParam === "complete";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hasBump, setHasBump] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);

  const basePrice = isComplete ? COMPLETE_PRICE : DIGITAL_PRICE;
  const total = isComplete ? COMPLETE_PRICE : hasBump ? DIGITAL_PRICE + BUMP_PRICE : DIGITAL_PRICE;

  useEffect(() => {
    trackPageView("checkout");
    trackEvent("checkout_started", { offer: isComplete ? "complete" : "digital" });
  }, [isComplete]);

  // Capture email on blur for abandoned checkout recovery
  function handleEmailBlur() {
    if (email && !emailCaptured) {
      setEmailCaptured(true);
      insertRow("lead_captures", { email, first_name: firstName || null, source: "checkout" });
      insertRow("abandoned_checkouts", {
        email,
        first_name: firstName || null,
        checkout_step: "email",
        offer_type: isComplete ? "complete-package" : "digital-starter",
      });
    }
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    // Save pending order
    insertRow("orders", {
      email,
      first_name: firstName,
      last_name: lastName || null,
      offer_type: isComplete ? "complete-package" : "digital-starter",
      includes_bump: hasBump,
      total_amount: total,
      status: "pending",
    });

    trackEvent("purchase_redirect", {
      offer: isComplete ? "complete" : "digital",
      has_bump: hasBump,
      total,
    });

    const link = getStripeLink(
      isComplete ? "complete" : "digital",
      hasBump,
      email
    );

    if (link) {
      window.location.href = link;
    } else {
      alert("Stripe Payment Link not configured. Please set up your .env file.");
    }
  }

  // Track abandoned checkout on unload
  useEffect(() => {
    function handleUnload() {
      if (email) {
        trackEvent("checkout_abandoned", { email, offer: isComplete ? "complete" : "digital" });
      }
    }
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [email, isComplete]);

  return (
    <div className="min-h-screen bg-royal-900">
      {/* Minimal header */}
      <header className="border-b border-white/[0.05] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-royal-300 hover:text-ivory transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm">Back</span>
          </a>
          <p className="font-serif text-sm font-bold text-ivory">{SITE_NAME}</p>
          <Lock className="w-4 h-4 text-royal-300" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn>
              <h2 className="font-serif text-2xl font-bold text-ivory mb-6">
                Order Summary
              </h2>
              <div className="space-y-3">
                {OFFER_STACK.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                    <span className="font-sans text-sm text-lavender">
                      {item.item}
                    </span>
                  </div>
                ))}
                {isComplete && (
                  <>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                      <span className="font-sans text-sm text-lavender">
                        Physical Hardcover Book (ships 5-7 days)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                      <span className="font-sans text-sm text-lavender">
                        Physical Workbook (ships 5-7 days)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                      <span className="font-sans text-sm text-lavender">
                        Free Standard Shipping
                      </span>
                    </div>
                  </>
                )}
              </div>
            </FadeIn>

            {/* Order Bump (only for digital) */}
            {!isComplete && (
              <FadeIn delay={100}>
                <OrderBumpCard
                  isSelected={hasBump}
                  onToggle={() => setHasBump(!hasBump)}
                />
              </FadeIn>
            )}

            {/* Trust Badges */}
            <FadeIn delay={200}>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/[0.05] p-3 text-center">
                  <Shield className="w-5 h-5 text-crimson mx-auto mb-1" />
                  <p className="font-sans text-[10px] text-royal-300">
                    30-Day Guarantee
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.05] p-3 text-center">
                  <Lock className="w-5 h-5 text-crimson mx-auto mb-1" />
                  <p className="font-sans text-[10px] text-royal-300">
                    Secure Checkout
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.05] p-3 text-center">
                  <Zap className="w-5 h-5 text-crimson mx-auto mb-1" />
                  <p className="font-sans text-[10px] text-royal-300">
                    Instant Delivery
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Checkout Form */}
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
                <h2 className="font-serif text-2xl font-bold text-ivory mb-2">
                  Complete Your Order
                </h2>
                <p className="font-sans text-sm text-lavender mb-8">
                  Instant digital delivery after payment.
                </p>

                <form onSubmit={handlePay} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-xs font-medium text-royal-300 mb-1 block">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-ivory placeholder:text-royal-300 focus:outline-none focus:border-crimson/30"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs font-medium text-royal-300 mb-1 block">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-ivory placeholder:text-royal-300 focus:outline-none focus:border-crimson/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-xs font-medium text-royal-300 mb-1 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleEmailBlur}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-ivory placeholder:text-royal-300 focus:outline-none focus:border-crimson/30"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Price summary */}
                  <div className="border-t border-white/[0.05] pt-4 mt-6 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-sans text-sm text-lavender">
                        {isComplete ? "The Complete Package" : "Digital Starter Bundle"}
                      </span>
                      <span className="font-sans text-sm text-lavender">
                        ${basePrice}
                      </span>
                    </div>
                    {hasBump && !isComplete && (
                      <div className="flex justify-between">
                        <span className="font-sans text-sm text-lavender">
                          Physical Hardcover Add-On
                        </span>
                        <span className="font-sans text-sm text-lavender">
                          ${BUMP_PRICE}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-white/[0.05] pt-2 flex justify-between">
                      <span className="font-sans text-base font-bold text-ivory">
                        Total
                      </span>
                      <span className="font-serif text-xl font-bold text-crimson">
                        ${total}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-400 hover:shadow-xl hover:shadow-crimson/30 flex items-center justify-center gap-2 mt-4"
                  >
                    <Lock className="w-4 h-4" />
                    Pay ${total} — Secure Checkout
                  </button>

                  <p className="font-sans text-xs text-royal-300 text-center">
                    You&apos;ll be redirected to Stripe for secure payment
                    processing. Apple Pay &amp; Google Pay available.
                  </p>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
