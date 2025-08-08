// app/analyze/page.tsx (or wherever this page lives)
"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { Website } from "~types/website";
import { WebsiteLogo } from "~app/components/logo";
import { Button } from "~components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~components/ui/card";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import { getWebsiteData } from "~app/website/actions";
import { toOrigin } from "~helpers/url";

// IMPORTANT: import the server action (with 'use server' in its file)

export default function AnalyzePage() {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<Website | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isWebsiteLoading, setIsWebsiteLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const input = url.trim();
    if (!input) {
      toast.error("Please enter a website URL");
      return;
    }
    setIsWebsiteLoading(true);
    setError(null);
    const normalizedUrl = toOrigin(url)
    try {
      router.push(`/website?url=${normalizedUrl}`);
    } catch (err) {
      console.error(err);
      setError(err);
      toast.error("Something went wrong while analyzing the website.");
    } finally {
      setIsWebsiteLoading(false);
    }
  };

  const disabled = isWebsiteLoading || isPending;

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-6 relative">
      <WebsiteLogo />
      <div className="absolute top-4 right-8 cursor-pointer">
        <Link href="/account">
          <Settings />
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analyze Domain</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="website-url">Website URL</Label>
            <Input
              id="website-url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
              disabled={disabled}
            />
            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={disabled || !url.trim()}
              onClick={(e) => {
                // support both click and Enter submit
                if (!e.defaultPrevented) handleSubmit();
              }}
            >
              {disabled ? "Analyzing..." : "Analyze"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
