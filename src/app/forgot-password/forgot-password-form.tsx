"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "~components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "~components/ui/card";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";
import { WebsiteLogo } from "~app/components/logo";
import ForgotPasswordEmailSent from "./forgot-password-email-sent";

interface Props {
  action: (formData: FormData) => Promise<void>;
}

export default function ForgotPasswordFormClient({ action }: Props) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const fd = new FormData();
    fd.set("email", email);

    startTransition(() => {
      action(fd)
        .then(() => setSuccess(true))
        .catch((err: any) => {
          toast.error(err.message);
        });
    });
  }

  function handleResend() {
    setSuccess(false);
    setEmail("");
  }

  if (success) {
    return (
      <ForgotPasswordEmailSent
        email={email}
        handleResend={handleResend}
        isPending={isPending}
      />
    );
  }

  return (
    <>
      <WebsiteLogo />
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-sm hover:underline"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
