import { Button } from "~components/ui/button";
import type { Website } from "~types/website";
import { ShieldX, ShieldAlert, ShieldCheck } from "lucide-react";
import {
  removeFromChromeStorage,
  removeFromPageLocalStorage,
} from "~helpers/storage";
import { redirect } from "next/navigation";

interface WebsiteViewProps {
  data: Website;
}

export function WebsiteView({ data }: WebsiteViewProps) {
  const handleLogout = async () => {
    try {
      await removeFromChromeStorage("token");
      await removeFromPageLocalStorage("token");
      chrome.tabs.create({
        url: `${process.env.PLASMO_PUBLIC_SITE_URL}/logout`,
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleShowMoreDetails = () => {
    redirect(`/website?url=${data.url}`);
  };

  const websiteStatusText = () => {
    if (data.isScam) {
      return "This webssite is a scam";
    }
    if (!data.isScam && data.rating < 5) {
      return "This website has bad reputation";
    }
    return "This website is secure";
  };

  const websiteStatusTextClass = () => {
    if (data.isScam) {
      return "text-error-dark";
    }
    if (!data.isScam && data.rating < 5) {
      return "text-warning-dark";
    }
    return "text-success-dark";
  };

  const websiteIcon = () => {
    if (data.isScam) {
      return <ShieldX className="text-error-dark" size={30} />;
    }
    if (!data.isScam && data.rating < 5) {
      return <ShieldAlert className="text-warning-dark" size={30} />;
    }
    return <ShieldCheck className="text-success-dark" size={30} />;
  };

  return (
    <div className="flex flex-col mx-2 gap-4 p-4">
      <div className="bg-grey w-full h-16 rounded-md flex items-center justify-center gap-2">
        {websiteIcon()}
        <h1
          className={`${websiteStatusTextClass()} text-2xl font-sans font-semibold`}
        >
          {websiteStatusText()}
        </h1>
      </div>
      <h1 className="text-xl font-sans font-semibold">Summary:</h1>
      <p className="font-sans text-md">{data.summary}</p>
      <Button className="text-base" onClick={handleShowMoreDetails}>
        Show More Details
      </Button>
      {/* <div className="flex items-center justify-center gap-1">
        <Button variant="link" className="p-0 text-base" onClick={handleLogout}>
          Logout
        </Button>
      </div> */}
    </div>
  );
}
