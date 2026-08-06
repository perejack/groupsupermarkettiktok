declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GOOGLE_ADS_ID = "AW-18339005888";
export const GOOGLE_ADS_CONVERSION_SEND_TO = "AW-18339005888/1sv0CKXJ_9McEMCL3KhE";

/** Fire the Google Ads conversion event once per application confirmation. */
export function trackPurchaseConversion(applicationId?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const storageKey = applicationId
    ? `gs_ads_conversion_${applicationId}`
    : "gs_ads_conversion_fired";

  try {
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, new Date().toISOString());
  } catch {
    // ignore storage failures and still attempt to send
  }

  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
  });
}
