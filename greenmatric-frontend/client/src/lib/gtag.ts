declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// GA4 conversion event on a successful enquiry (no-op if GA isn't configured).
export function trackLead(context?: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", context ? { context } : {});
  }
}
