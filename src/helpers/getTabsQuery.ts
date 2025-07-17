import type { TabsQueryFn } from "~types/getBrowser";

/**
 * Return a unified `tabs.query` function:
 *  - Firefox: `browser.tabs.query` (promise)
 *  - Chromium & Safari: `chrome.tabs.query` (callback)
 */
export function getTabsQuery(): Promise<chrome.tabs.Tab[]> | TabsQueryFn {
  // 1. If webextension-polyfill is present, prefer its promise API
  if (typeof browser !== "undefined" && browser.tabs?.query) {
    return browser.tabs.query.bind(browser.tabs);
  }

  // 2. Fallback to Chrome-style API in Chromium & (Safari WebExtension)
  if (typeof chrome !== "undefined" && chrome.tabs?.query) {
    return chrome.tabs.query.bind(chrome.tabs);
  }

  throw new Error("No supported tabs API found");
}
