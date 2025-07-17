"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "~components/ui/button";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "~components/ui/card";
import { Lock, Eye, EyeOff } from "lucide-react";
import { WebsiteLogo } from "~app/components/logo";
import PasswordResetSuccesful from "./reset-password-success";
import ResetPasswordInvalid from "./reset-password-invalid";

interface Props {
  action: (form: FormData) => Promise<void>;
  token: string | null;
}

export default function ResetPasswordFormClient({ action, token }: Props) {
  const [pwd, setPwd] = useState("");
  const [cfm, setCfm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const validate = (pw: string) => {
    if (pw.length < 8) return "At least 8 characters.";
    if (!/[a-z]/.test(pw)) return "One lowercase letter required.";
    if (!/[A-Z]/.test(pw)) return "One uppercase letter required.";
    if (!/\d/.test(pw)) return "One number required.";
    return null;
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      toast.error("Missing password reset token");
      return;
    }
    const v = validate(pwd);
    if (v) {
      toast.error("Invalid Password Format");
      return;
    }
    if (pwd !== cfm) {
      toast.error("Password don't match");
      return;
    }

    const fd = new FormData();
    fd.set("token", token);
    fd.set("password", pwd);

    startTransition(() => {
      action(fd)
        .then(() => setSuccess(true))
        .catch((err: any) => {
          toast.error(err.message);
        });
    });
  }

  if (!token) {
    return <ResetPasswordInvalid />;
  }

  if (success) {
    return <PasswordResetSuccesful />;
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <WebsiteLogo />
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter a new, secure password.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New password */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  disabled={isPending}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPwd((v) => !v)}
                >
                  {showPwd ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showCfm ? "text" : "password"}
                  value={cfm}
                  onChange={(e) => setCfm(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  disabled={isPending}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowCfm((v) => !v)}
                >
                  {showCfm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Resetting…" : "Reset Password"}
            </Button>

            <div className="text-center">
              <Link href="/forgot-password" className="text-sm hover:underline">
                Need a new reset link?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
