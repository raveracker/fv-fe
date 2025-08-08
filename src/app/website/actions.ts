"use server";

import { cookies } from "next/headers";
import type { ReviewResponse } from "~types/review";
import type { Website } from "~types/website";

function normalizeUrl(input: string): string {
  // Require http/https and remove trailing slash(es)
  if (!/^https?:\/\//i.test(input)) {
    throw new Error('URL must start with http:// or https://')
  }

  try {
    const u = new URL(input)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      throw new Error('Only http/https are allowed')
    }
    // Drop trailing slashes from pathname (keep root as empty)
    const cleanPath = u.pathname.replace(/\/+$/, '')
    return `${u.protocol}//${u.host}${cleanPath}${u.search}`
  } catch {
    // Fallback: just strip trailing slash characters at the end
    return input.replace(/\/+$/, '')
  }
}

export async function getWebsiteData(urlInput: string): Promise<Website> {
  if (!urlInput) return undefined
  const url = normalizeUrl(urlInput)
  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/website/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  // 2) Build URL with pagination params
  const url = new URL(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/website/${encodeURIComponent(id)}`
  );
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  // 3) Perform the GET
  const res = await fetch(url.toString(), {
    method: "GET",
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
