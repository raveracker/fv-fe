/**
 * Optionally, sniff the browser name from UA or runtime API
 */
export async function detectBrowser(): Promise<
  "chromium" | "firefox" | "webkit"
> {
  // Firefox exposes a runtime.getBrowserInfo()
  if (
    typeof browser !== "undefined" &&
    typeof browser.runtime.getBrowserInfo === "function"
  ) {
    const info = await browser.runtime.getBrowserInfo();
    if (info.name.toLowerCase().includes("firefox")) {
      return "firefox";
    }
  }

  // Quick UA sniff for WebKit (Safari)
  if (
    navigator.userAgent.includes("Safari") &&
    !navigator.userAgent.includes("Chrome")
  ) {
    return "webkit";
  }

  // Otherwise assume Chromium (Chrome, Edge, Brave…)
  return "chromium";
}
