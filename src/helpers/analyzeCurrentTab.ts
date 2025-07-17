import type { Website } from "~types/website";
import { getCurrentTabDomain } from "./getDomain";

export async function analyzeCurrentTab(
  token: string
): Promise<Website | undefined> {
  const domain = await getCurrentTabDomain();

  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      url: `https://${domain}`,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/website/analyze`,
      requestOptions
    );
    const website = await res.json();
    console.log("[analyzeCurrentTab] API Response:", website);
    return website;
  } catch (err) {
    console.error("[analyzeCurrentTab] Error:", err);
  }
}
