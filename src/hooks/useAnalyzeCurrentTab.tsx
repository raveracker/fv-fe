import { useEffect, useState } from "react";
import { analyzeCurrentTab } from "~helpers/analyzeCurrentTab";
import type { Website } from "~types/website";

export function useAnalyzeCurrentTab(token: string | null) {
  const [data, setData] = useState<Website | null>(null);
  const [isWebsiteLoading, setIsWebsiteLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!token) return;

    const run = async () => {
      setIsWebsiteLoading(true);
      setError(null);

      try {
        const website = await analyzeCurrentTab(token);
        if (website) setData(website);
      } catch (err) {
        setError(err);
      } finally {
        setIsWebsiteLoading(false);
      }
    };

    run();
  }, [token]);

  return { data, isWebsiteLoading, error };
}
