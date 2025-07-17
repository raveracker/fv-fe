"use server";

import { cookies } from "next/headers";

export async function signupAction(formData: FormData) {
  const firstName = formData.get("firstName")?.toString() ?? "";
  const lastName = formData.get("lastName")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";
  const agreeToTerms = formData.get("agreeToTerms") !== null;

  if (password !== confirmPassword) {
    throw new Error("Passwords don’t match."); // still throw for client to catch
  }
  if (!agreeToTerms) {
    throw new Error("You must agree to the Terms of Service.");
  }

  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email,
        password,
      }),
      cache: "no-store",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Signup failed (status ${res.status})`);
  }

  const cookieStore = await cookies();
  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
  cookieStore.set({ name: "token", value: data.token, ...opts });
  cookieStore.set({ name: "userId", value: data.user._id, ...opts });
  await verifyUserEmailAction(data.user._id, data.token);
}

export async function verifyUserEmailAction(
  userId: string,
  token: string
): Promise<{ message: string }> {
  if (!token) {
    throw new Error("Unauthorized: no token cookie set");
  }

  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/users/${userId}/verify`,
    {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Verify failed: ${res.status} – ${text}`);
  }

  return res.json();
}
