"use server";

import { getCredentials } from "~app/account/actions";

export async function verifyEmail(verifyToken: string): Promise<string> {
  const { token } = await getCredentials();
  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/users/verify-email`,
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token: verifyToken }),
      redirect: "follow",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Verification failed (${res.status}): ${text}`);
  }

  return res.json();
}
