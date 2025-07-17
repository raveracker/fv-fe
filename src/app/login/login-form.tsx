"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { useState, startTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "~components/ui/button";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~components/ui/card";
import { WebsiteLogo } from "~app/components/logo";
import { loginAction } from "./actions";
import { getCredentials } from "~app/account/actions";

interface Props {
  action: (formData: FormData) => Promise<void>;
}

export default function LoginForm({ action }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { pending } = useFormStatus();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      loginAction(formData).catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "Login failed";
        toast.error(msg);
      });
      getCredentials().then((resp) =>
        localStorage.setItem("token", resp.token)
      );
    });
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <WebsiteLogo />
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center"></div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <input
              type="hidden"
              name="remember"
              value={remember ? "true" : "false"}
            />

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          {/* <div className="mt-6">
            <Button variant="outline" className="w-full gap-2">
              <Google />
              Continue with Google
            </Button>
          </div> */}
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
