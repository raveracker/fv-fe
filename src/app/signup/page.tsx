export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import SignupForm from "./signup-form";
import { signupAction } from "./actions";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <SignupForm action={signupAction} />
    </div>
  );
}
