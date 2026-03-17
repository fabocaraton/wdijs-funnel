// Stripe Payment Link redirect logic
// Uses pre-created Stripe Payment Links (no server needed)

export function getStripeLink(
  offer: string,
  hasBump: boolean,
  email: string
): string {
  let url = "";

  if (offer === "complete") {
    url = import.meta.env.VITE_STRIPE_LINK_COMPLETE || "";
  } else if (offer === "workbook") {
    url = import.meta.env.VITE_STRIPE_LINK_WORKBOOK || "";
  } else if (hasBump) {
    url = import.meta.env.VITE_STRIPE_LINK_DIGITAL_BUMP || "";
  } else {
    url = import.meta.env.VITE_STRIPE_LINK_DIGITAL || "";
  }

  // Append email for prefill
  if (email && url) {
    url += (url.includes("?") ? "&" : "?") + "prefilled_email=" + encodeURIComponent(email);
  }

  return url;
}

export function getUpgradeLink(email: string): string {
  let url = import.meta.env.VITE_STRIPE_LINK_UPGRADE || "";
  if (email && url) {
    url += (url.includes("?") ? "&" : "?") + "prefilled_email=" + encodeURIComponent(email);
  }
  return url;
}
