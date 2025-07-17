export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import LoginForm from "./login-form";
import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <LoginForm action={loginAction} />
    </div>
  );
}
