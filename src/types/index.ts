// Site statistics displayed in trust strips
export interface SiteStat {
  id: string;
  number: string;
  label: string;
}

// Pain point cards in the Problem section
export interface PainPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// Offer stack line items
export interface OfferStackItem {
  id: string;
  item: string;
  perceivedValue: string;
}

// Testimonial cards
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  metric: string;
  quote: string;
}

// FAQ accordion items
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Risk snapshot quiz questions
export interface RiskQuestion {
  id: string;
  question: string;
}

// Risk snapshot result tiers
export interface RiskResult {
  level: "low" | "moderate" | "high";
  label: string;
  icon: string;
  message: string;
  cta: string;
}

// Offer configuration
export interface Offer {
  id: string;
  name: string;
  price: number;
  description: string;
  perceivedValue: string;
  items: string[];
  isDefault?: boolean;
}

// Download item on thank-you page
export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  icon: string;
}

// Next step item on thank-you page
export interface NextStep {
  id: string;
  title: string;
  description: string;
}

// Navigation item
export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Analytics event
export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, unknown>;
  pageUrl?: string;
}

// Lead capture form data
export interface LeadCapture {
  firstName?: string;
  email: string;
  source: "exit-intent" | "inline" | "footer" | "checkout";
}

// Order data
export interface OrderData {
  email: string;
  firstName: string;
  lastName?: string;
  offerType: "digital-starter" | "complete-package" | "workbook-digital" | "physical-bump-upgrade";
  includesBump: boolean;
  totalAmount: number;
}
