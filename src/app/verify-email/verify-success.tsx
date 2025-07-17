import { Button } from "~components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~components/ui/card";
import { WebsiteLogo } from "~app/components/logo";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EmailVerifySuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-6">
      <WebsiteLogo />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Email Verified Successfully!
          </CardTitle>
          <CardDescription>
            Your email address has been verified. You can now access all
            features of your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Continue to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
