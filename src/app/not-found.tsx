"use client";

import Link from "next/link";
import { Button } from "~components/ui/button";
import { Card, CardContent } from "~components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import NotFoundVector from "assets/svg/NotFound";
import { WebsiteLogo } from "~app/components/logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-5 to-blue-600 px-4 space-y-6">
      <WebsiteLogo />
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <NotFoundVector className="dark:fill-black-90 fill-white" />
          </div>

          <div className="mb-6">
            <div className="text-6xl font-bold mb-2">404</div>
            <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
            <p className="mb-6">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>

            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
