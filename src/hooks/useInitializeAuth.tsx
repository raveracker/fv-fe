import { useEffect, useState } from "react";
import {
  getFromChromeStorage,
  getFromPageLocalStorage,
  setToChromeStorage,
} from "~helpers/storage";

type UseInitializeAuthResult = {
  token: string | null;
  isLoading: boolean;
};

export function useInitializeAuth(): UseInitializeAuthResult {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const chromeData = await getFromChromeStorage("token");
        const storedToken = chromeData?.token;

        if (storedToken) {
          setToken(storedToken);
        } else {
          const pageToken = await getFromPageLocalStorage("token");
          console.log(pageToken, "page token");

          if (pageToken) {
            await setToChromeStorage({ token: pageToken });
            setToken(pageToken);
          } else {
            console.log(
              "No token found in chrome storage or page localStorage"
            );
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return { token, isLoading };
}
