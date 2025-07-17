export type TabsQueryFn = (
  query: chrome.tabs.QueryInfo,
  callback: (tabs: chrome.tabs.Tab[]) => void
) => void;
