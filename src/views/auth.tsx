import { Button } from "~components/ui/button";
import { useState, useEffect } from "react";
import LoginVector from "assets/svg/LoginVector";

export function Auth() {
  const handleLogin = () => {
    chrome.tabs.create({ url: `${process.env.PLASMO_PUBLIC_SITE_URL}/login` });
  };

  const handleSignup = () => {
    chrome.tabs.create({ url: `${process.env.PLASMO_PUBLIC_SITE_URL}/signup` });
  };

  return (
    <div className="flex items-center justify-center flex-col mx-2 gap-4 p-4">
      <LoginVector width={150} height={150} />
      <h1 className="font-sans text-xl font-semibold text-center">
        Instant Scam-Site Detection
      </h1>
      <p className="font-sans text-md text-center">
        Real-time scanning, color-coded risk scores, and plain-language alerts
        keep you a step ahead of scammers.
      </p>
      <Button className="w-[90%] text-base" onClick={handleLogin}>
        Login
      </Button>
      <div className="flex items-center justify-center gap-1">
        <p className="font-sans text-base text-center">No Account yet?</p>
        <Button variant="link" className="p-0 text-base" onClick={handleSignup}>
          Signup
        </Button>
      </div>
    </div>
  );
}
