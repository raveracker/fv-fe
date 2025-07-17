"use client";

import { Button } from "~components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "~components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { WebsiteLogo } from "~app/components/logo";

interface ForgotPasswordEmailSentProps {
  email: string;
  isPending: boolean;
  handleResend: VoidFunction;
}

export default function ForgotPasswordEmailSent({
  email,
  handleResend,
  isPending,
}: ForgotPasswordEmailSentProps) {
  return (
    <>
      <WebsiteLogo />
      <Card>
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            We've sent a password reset link to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Resend Email"}
          </Button>
          <Button asChild className="w-full">
            <Link href="/login">Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
