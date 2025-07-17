"use client";

import { Alert, AlertDescription } from "~components/ui/alert";
import { Button } from "~components/ui/button";
import { Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { resendVerificationEmail } from "./actions";
import { toast } from "sonner";

interface Props {
  isVisible: boolean;
}

export default function EmailVerficationAlert({ isVisible }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleVerifyEmail = () => {
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

  if (!isVisible) return null;

  return (
    <Alert className="w-full border-amber-200 bg-amber-50 text-amber-800">
      <Mail className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex-1 pr-4">
          <span className="font-medium">Verify your email address</span>
          <p className="text-sm mt-1">
            We've sent a verification link to your email. Please check your
            inbox and click the link to verify your account.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleVerifyEmail}
            disabled={isLoading || isPending}
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isLoading ? "Sending..." : "Resend Email"}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
