"use server";

import { redirect } from "next/navigation";

export async function resetPasswordAction(formData: FormData) {
  const token = formData.get("token")?.toString();
  const newPassword = formData.get("password")?.toString();

  if (!token) {
    throw new Error("Missing reset token.");
  }

  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/auth/reset-password`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Reset failed (status ${res.status})`);
  }
}
