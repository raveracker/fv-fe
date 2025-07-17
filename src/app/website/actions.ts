"use server";

import { cookies } from "next/headers";
import type { ReviewResponse } from "~types/review";
import type { Website } from "~types/website";

export async function getWebsiteData(url: string): Promise<Website> {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Unauthorized: missing token");

  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/website/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Analysis failed (status ${res.status})`);
  }
  return res.json();
}

export async function fetchWebsiteReviews(
  id: string,
  page: number = 1,
  limit: number = 10
): Promise<ReviewResponse> {
  // 1) Grab your auth token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("Unauthorized: missing token");

  // 2) Build URL with pagination params
  const url = new URL(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/website/${encodeURIComponent(id)}`
  );
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  // 3) Perform the GET
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    cache: "no-store",
  });

  // 4) Error handling
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Fetch failed (${res.status}): ${errorBody}`);
  }

  return res.json();
}
