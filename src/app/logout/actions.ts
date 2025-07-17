"use server";

import { cookies } from "next/headers";
import { getCredentials } from "~app/account/actions";

export async function logoutAction(): Promise<{
  success: boolean;
  message: string;
}> {
  const { token } = await getCredentials();
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/auth/logout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, message: error.message || "Logout failed" };
    }

    const data = await res.json();
    cookieStore.delete("userId");
    cookieStore.delete("token");
    return { success: true, message: data.message };
  } catch (err) {
    return { success: false, message: "Unexpected error during logout" };
  }
}
