type Variant = "A" | "B";

export function getVariant(testId: string): Variant {
  const key = `wdijs_ab_${testId}`;
  try {
    const stored = sessionStorage.getItem(key);
    if (stored === "A" || stored === "B") return stored;
  } catch {
    /* silent */
  }
  const variant: Variant = Math.random() < 0.5 ? "A" : "B";
  try {
    sessionStorage.setItem(key, variant);
  } catch {
    /* silent */
  }
  return variant;
}
