import Link from "next/link";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";

import { Button } from "~components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~components/ui/card";
import { Alert, AlertDescription } from "~components/ui/alert";
import { WebsiteLogo } from "~app/components/logo";

export default function ResetPasswordInvalid() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <WebsiteLogo />
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Reset Link Invalid
              </CardTitle>
              <CardDescription className="mt-2">
                The password reset link you clicked is either invalid, expired,
                or has already been used.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Password reset links expire after 24 hours for security reasons.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/forgot-password">
                  <Mail className="w-4 h-4 mr-2" />
                  Request New Reset Link
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* <div className="text-center text-sm text-gray-600">
          <p>
            Need help?{" "}
            <Link href="/support" className="text-blue-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}
