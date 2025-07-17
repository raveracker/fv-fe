export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import ResetPasswordFormClient from "./reset-password-form";
import { resetPasswordAction } from "./actions";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <ResetPasswordFormClient
        action={resetPasswordAction}
        token={token ?? null}
      />
    </div>
  );
}
