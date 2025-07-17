import { useAnalyzeCurrentTab } from "~hooks/useAnalyzeCurrentTab";
import { useInitializeAuth } from "~hooks/useInitializeAuth";
import { ThemeProvider } from "~lib/theme-provider";
import "~main.css";
import { Auth } from "~views/auth";
import { Loading } from "~views/loading";
import { RootView } from "~views/root";
import { WebsiteView } from "~views/website";

function IndexPopup() {
  const { isLoading, token } = useInitializeAuth();
  const { data, error, isWebsiteLoading } = useAnalyzeCurrentTab(token);

  if (isLoading || isWebsiteLoading) {
    return (
      <ThemeProvider syncSystem>
        <RootView>
          <Loading />
        </RootView>
      </ThemeProvider>
    );
  }

  if (!token) {
    return (
      <ThemeProvider syncSystem>
        <RootView>
          <Auth />
        </RootView>
      </ThemeProvider>
    );
  }

  if (!data) {
    return (
      <ThemeProvider syncSystem>
        <RootView>
          <div className="text-xl font-sans font-semibold">
            No data available
          </div>
        </RootView>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider syncSystem>
      <RootView>
        <WebsiteView data={data} />
      </RootView>
    </ThemeProvider>
  );
}

export default IndexPopup;
