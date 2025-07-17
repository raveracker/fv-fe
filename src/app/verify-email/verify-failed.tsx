"use client";

import { Button } from "~components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~components/ui/card";
import { AlertCircle, Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { resendVerificationEmail } from "~app/account/actions";
import { WebsiteLogo } from "~app/components/logo";

export default function EmailVerifyFailed() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleResendEmail = () => {
    setIsLoading(true);
    startTransition(async () => {
      try {
        const result = await resendVerificationEmail();
        toast.success(result.message);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-6">
      <WebsiteLogo />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Email Verification Failed
          </CardTitle>
          <CardDescription>
            We couldn't verify your email address. This might be due to an
            expired or invalid verification link.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="dark:bg-black-100 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">Common issues:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• The verification link has expired</li>
              <li>• The link has already been used</li>
              <li>• The link was copied incorrectly</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleResendEmail}
              className="w-full"
              disabled={isLoading || isPending}
            >
              <Mail className="mr-2 h-4 w-4" />
              {isLoading ? "Sending..." : " Resend Verification Email"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
