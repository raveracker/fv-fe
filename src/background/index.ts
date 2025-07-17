import { getFromChromeStorage } from "~helpers/storage";
import { analyzeCurrentTab } from "~helpers/analyzeCurrentTab";

// Handle when a new tab is loaded or refreshed
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.active &&
    tab.url?.startsWith("http")
  ) {
    try {
      const chromeData = await getFromChromeStorage("token");
      await analyzeCurrentTab(chromeData.token);
    } catch (err) {
      console.error("Error in onUpdated:", err);
    }
  }
});

//Handle when the user switches tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const chromeData = await getFromChromeStorage("token");
    await analyzeCurrentTab(chromeData.token);
  } catch (err) {
    console.error("Error in OnActivated:", err);
  }
});
