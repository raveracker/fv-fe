"use client";

import Link from "next/link";
import { Button } from "~components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "~components/ui/card";
import { CheckCircle } from "lucide-react";
import { WebsiteLogo } from "~app/components/logo";

export default function PasswordResetSuccesful() {
  return (
    <div className="max-w-md w-full space-y-8 text-center">
      <WebsiteLogo />
      <Card>
        <CardHeader className="space-y-2">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Password Reset!</CardTitle>
          <CardDescription>Your password has been updated.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login">Continue to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
