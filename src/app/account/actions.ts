"use server";

import { cookies } from "next/headers";
import type { UserData } from "~types/user";

export async function getCredentials() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("token")?.value;

  if (!userId || !token) {
    throw new Error("Unauthorized: missing user credentials");
  }

  return { userId, token };
}

export async function getUserAction(): Promise<UserData> {
  const { userId, token } = await getCredentials();
  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/users/${encodeURIComponent(userId)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Fetch user failed (${res.status})`);
  return res.json();
}

export async function updateProfileAction(formData: FormData) {
  const { userId, token } = await getCredentials();
  const firstName = formData.get("firstName")?.toString() ?? "";
  const lastName = formData.get("lastName")?.toString() ?? "";

  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/users/${encodeURIComponent(userId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: `${firstName} ${lastName}` }),
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Update failed (status ${res.status})`);
  }
  return data;
}

export async function changePasswordAction(formData: FormData) {
  const { userId, token } = await getCredentials();
  const oldPassword = formData.get("currentPassword")?.toString() ?? "";
  const newPassword = formData.get("newPassword")?.toString() ?? "";
  const confirmPwd = formData.get("confirmPassword")?.toString() ?? "";

  if (newPassword !== confirmPwd) {
    throw new Error("Passwords do not match.");
  }
  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/users/${encodeURIComponent(userId)}/password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Change failed (status ${res.status})`);
  }
  return data;
}

export async function deleteAccountAction() {
  const { userId, token } = await getCredentials();
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/users/${encodeURIComponent(userId)}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Delete failed (status ${res.status})`);
  }
  cookieStore.delete("userId");
  cookieStore.delete("token");

  return data;
}

export async function resendVerificationEmail(): Promise<{ message: string }> {
  const { userId, token } = await getCredentials();
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
