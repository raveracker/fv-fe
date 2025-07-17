// Storage utility functions for cross-browser extension compatibility

export interface StorageData {
  token?: string;
  user?: any;
  settings?: any;
  [key: string]: any;
}

/**
 * Get browser storage API with proper type handling
 */
const getBrowserStorage = () => {
  // Firefox uses browser.storage.local
  if (typeof browser !== "undefined" && browser.storage) {
    return browser.storage.local;
  }
  // Chrome, Edge, and other Chromium-based browsers use chrome.storage.local
  if (typeof chrome !== "undefined" && chrome.storage) {
    return chrome.storage.local;
  }
  throw new Error("Storage API not available");
};

/**
 * Get browser tabs API with proper type handling
 */
const getBrowserTabs = () => {
  if (typeof browser !== "undefined" && browser.tabs) {
    return browser.tabs;
  }
  if (typeof chrome !== "undefined" && chrome.tabs) {
    return chrome.tabs;
  }
  throw new Error("Tabs API not available");
};

/**
 * Get browser scripting API with proper type handling
 */
const getBrowserScripting = () => {
  if (typeof browser !== "undefined" && browser.scripting) {
    return browser.scripting;
  }
  if (typeof chrome !== "undefined" && chrome.scripting) {
    return chrome.scripting;
  }
  throw new Error("Scripting API not available");
};

/**
 * Execute script with proper browser compatibility
 */
const executeScript = async (target: any, func: Function, args: any[] = []) => {
  const scripting = getBrowserScripting();

  if (typeof browser !== "undefined") {
    // Firefox approach - use function as string
    const funcString = func.toString();
    return await (scripting as any).executeScript({
      target,
      func: funcString,
      args,
    });
  } else {
    // Chrome/Edge approach
    return await (scripting as any).executeScript({
      target,
      func,
      args,
    });
  }
};

/**
 * Get data from browser storage (works with Chrome, Firefox, Edge)
 */
export const getFromChromeStorage = async (
  keys: string | string[]
): Promise<any> => {
  try {
    const storage = getBrowserStorage();
    const result = await storage.get(keys);
    return result;
  } catch (error) {
    console.error("Error getting from browser storage:", error);
    return null;
  }
};

/**
 * Set data in browser storage (works with Chrome, Firefox, Edge)
 */
export const setToChromeStorage = async (data: StorageData): Promise<void> => {
  try {
    const storage = getBrowserStorage();
    await storage.set(data);
  } catch (error) {
    console.error("Error setting browser storage:", error);
  }
};

/**
 * Remove data from browser storage (works with Chrome, Firefox, Edge)
 */
export const removeFromChromeStorage = async (
  keys: string | string[]
): Promise<void> => {
  try {
    const storage = getBrowserStorage();
    await storage.remove(keys);
  } catch (error) {
    console.error("Error removing from browser storage:", error);
  }
};

/**
 * Get localStorage from the current active tab (cross-browser compatible)
 */
export const getFromPageLocalStorage = async (
  key: string
): Promise<string | null> => {
  try {
    const tabs = getBrowserTabs();
    const browserTabs = await tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!browserTabs[0]?.id) {
      console.log("No active tab found");
      return null;
    }

    // Check if we can access the tab
    const tab = browserTabs[0];
    if (
      !tab.url ||
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://") ||
      tab.url.startsWith("moz-extension://") ||
      tab.url.startsWith("edge://")
    ) {
      console.log(
        "Cannot access localStorage from browser:// or extension pages"
      );
      return null;
    }

    const results = await executeScript(
      { tabId: tab.id },
      function (storageKey) {
        return localStorage.getItem(storageKey);
      },
      [key]
    );

    return results[0]?.result || null;
  } catch (error) {
    console.error("Error getting from page localStorage:", error);
    // Check if it's a permission error
    if (error.message?.includes("Cannot access contents")) {
      console.log("Permission denied - cannot access page localStorage");
    }
    return null;
  }
};

/**
 * Set localStorage in the current active tab (cross-browser compatible)
 */
export const setToPageLocalStorage = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    const tabs = getBrowserTabs();
    const browserTabs = await tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!browserTabs[0]?.id) {
      return;
    }

    await executeScript(
      { tabId: browserTabs[0].id },
      function (storageKey, storageValue) {
        localStorage.setItem(storageKey, storageValue);
      },
      [key, value]
    );
  } catch (error) {
    console.error("Error setting page localStorage:", error);
  }
};

/**
 * Remove item from localStorage in the current active tab (cross-browser compatible)
 */
export const removeFromPageLocalStorage = async (
  key: string
): Promise<void> => {
  try {
    const tabs = getBrowserTabs();
    const browserTabs = await tabs.query({
      active: true,
      currentWindow: true,
    });
    console.log(browserTabs, "tabs");
    if (!browserTabs[0]?.id) {
      console.log("No active tab found");
      return;
    }

    const tab = browserTabs[0];
    // Only try to clear if it's not a browser:// or extension page
    if (
      !tab.url ||
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://") ||
      tab.url.startsWith("moz-extension://") ||
      tab.url.startsWith("edge://")
    ) {
      console.log(
        "Cannot access localStorage from browser:// or extension pages"
      );
      return;
    }

    await executeScript(
      { tabId: tab.id },
      function (storageKey) {
        console.log(storageKey, "storage key");
        localStorage.removeItem(storageKey);
        console.log(`Cleared ${storageKey} from page localStorage`);
      },
      [key]
    );

    console.log(`Successfully removed ${key} from page localStorage`);
  } catch (error) {
    console.error("Error removing from page localStorage:", error);
    if (error.message?.includes("Cannot access contents")) {
      console.log("Permission denied - cannot access page localStorage");
    }
  }
};

/**
 * Sync localStorage from page to browser storage (cross-browser compatible)
 */
export const syncLocalStorageToChrome = async (key: string): Promise<void> => {
  try {
    const pageValue = await getFromPageLocalStorage(key);
    if (pageValue) {
      await setToChromeStorage({ [key]: pageValue });
    }
  } catch (error) {
    console.error("Error syncing localStorage to browser storage:", error);
  }
};

/**
 * Sync browser storage to page localStorage (cross-browser compatible)
 */
export const syncChromeToLocalStorage = async (key: string): Promise<void> => {
  try {
    const browserData = await getFromChromeStorage(key);
    const browserValue = browserData[key];

    if (browserValue) {
      await setToPageLocalStorage(key, browserValue);
    }
  } catch (error) {
    console.error("Error syncing browser storage to localStorage:", error);
  }
};

/**
 * Clear all localStorage in the current active tab (cross-browser compatible)
 */
export const clearAllPageLocalStorage = async (): Promise<void> => {
  try {
    const tabs = getBrowserTabs();
    const browserTabs = await tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!browserTabs[0]?.id) {
      console.log("No active tab found");
      return;
    }

    const tab = browserTabs[0];
    // Only try to clear if it's not a browser:// or extension page
    if (
      !tab.url ||
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://") ||
      tab.url.startsWith("moz-extension://") ||
      tab.url.startsWith("edge://")
    ) {
      console.log(
        "Cannot access localStorage from browser:// or extension pages"
      );
      return;
    }

    await executeScript(
      { tabId: tab.id },
      function () {
        localStorage.clear();
        console.log("Cleared all localStorage");
      },
      []
    );

    console.log("Successfully cleared all page localStorage");
  } catch (error) {
    console.error("Error clearing page localStorage:", error);
    if (error.message?.includes("Cannot access contents")) {
      console.log("Permission denied - cannot access page localStorage");
    }
  }
};
