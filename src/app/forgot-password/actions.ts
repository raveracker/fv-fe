"use server";

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  if (!email) {
    throw new Error("Email is required.");
  }

  const res = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/v1/auth/forgot-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.message || `Failed to send reset link (status ${res.status})`
    );
  }
}
