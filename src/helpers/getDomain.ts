import type { TabsQueryFn } from "~types/getBrowser";
import { detectBrowser } from "./detectBrowser";
import { getTabsQuery } from "./getTabsQuery";

export async function getCurrentTabDomain(): Promise<string> {
  // (a) Know what browser we’re in (optional)
  const browserType = await detectBrowser();
  console.log(`Running under ${browserType}`);

  // (b) Grab the right tabs.query method
  const tabsQuery = getTabsQuery();

  // (c) Query the active tab
  let tabs;
  if (typeof tabsQuery === "function") {
    // Chrome-style callback
    tabs = await new Promise<chrome.tabs.Tab[]>((resolve, reject) => {
      (tabsQuery as TabsQueryFn)({ active: true, currentWindow: true }, (t) =>
        resolve(t)
      );
    });
  } else {
    // Promise-style (webextension-polyfill / Firefox)
    tabs = await (tabsQuery as unknown as typeof browser.tabs.query)({
      active: true,
      currentWindow: true,
    });
  }

  // (d) Pull out the hostname
  const url = tabs[0]?.url;
  if (!url) throw new Error("Could not get current tab URL");
  return new URL(url).hostname;
}
