import { Button } from "~components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~components/ui/card";
import { WebsiteLogo } from "~app/components/logo";
import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function EmailVerifyLinkExpired() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-6">
      <WebsiteLogo />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <ShieldX className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Link Expired!
          </CardTitle>
          <CardDescription>
            This Link is expired. Either your email address has been already
            been verified or re-verify your email.
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
