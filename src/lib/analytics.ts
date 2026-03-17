import { insertRow } from "@/lib/supabase";

// Generate a session ID that persists for the tab session
function getSessionId(): string {
  const key = "wdijs_session_id";
  try {
    let id = sessionStorage.getItem(key);
    if (id) return id;
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

const scrollMilestones = new Set<number>();

export function trackEvent(
  eventName: string,
  properties: Record<string, unknown> = {}
) {
  const sessionId = getSessionId();
  const pageUrl = window.location.pathname;

  // Console log in dev
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName}`, { sessionId, ...properties, pageUrl });
  }

  // Write to Supabase
  insertRow("analytics_events", {
    session_id: sessionId,
    event_name: eventName,
    properties,
    page_url: pageUrl,
  });

  // PostHog (if configured)
  const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
  if (posthogKey && typeof window !== "undefined" && (window as Record<string, unknown>).posthog) {
    (window as Record<string, unknown> & { posthog: { capture: (name: string, props: Record<string, unknown>) => void } }).posthog.capture(eventName, properties);
  }
}

export function trackPageView(pageName: string) {
  trackEvent("page_view", { page_name: pageName });
}

export function trackScrollDepth(percentage: number) {
  const milestones = [25, 50, 75, 90];
  for (const milestone of milestones) {
    if (percentage >= milestone && !scrollMilestones.has(milestone)) {
      scrollMilestones.add(milestone);
      trackEvent("scroll_depth", { depth: milestone });
    }
  }
}

export function getSessionId_public(): string {
  return getSessionId();
}
