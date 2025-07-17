export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import ForgotPasswordForm from "./forgot-password-form";
import { forgotPasswordAction } from "./actions";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <ForgotPasswordForm action={forgotPasswordAction} />
      </div>
    </div>
  );
}
