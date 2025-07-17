"use client";

import { useEffect } from "react";
import { logoutAction } from "./actions";

export default function LogoutPage() {
  useEffect(() => {
    logoutAction().then(() => {
      setTimeout(() => window.close(), 500);
    });
  }, []);

  return (
    <p style={{ padding: "1rem", textAlign: "center" }}>Logging you out…</p>
  );
}
