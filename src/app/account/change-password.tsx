"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~components/ui/card";
import { Label } from "~components/ui/label";
import { Input } from "~components/ui/input";
import { Button } from "~components/ui/button";

interface Props {
  onChangePassword: (fd: FormData) => Promise<{ message: string }>;
}

export default function ChangePasswordSection({ onChangePassword }: Props) {
  const [current, setCurrent] = useState("");
  const [nPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isPending, start] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: any = {};
    if (nPassword !== confirm) errs.confirmPassword = "Passwords do not match";
    if (nPassword.length < 8) errs.newPassword = "At least 8 characters";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const fd = new FormData();
    fd.set("currentPassword", current);
    fd.set("newPassword", nPassword);
    fd.set("confirmPassword", confirm);

    start(async () => {
      try {
        const response = await onChangePassword(fd);
        setCurrent("");
        setNew("");
        setConfirm("");
        toast.success(response.message);
      } catch (err: any) {
        toast.error(err.message || "Password change failed");
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Lock className="inline mr-1" /> Change Password
        </CardTitle>
        <CardDescription>Keep your account secure</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.currentTarget.value)}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={nPassword}
              onChange={(e) => setNew(e.currentTarget.value)}
              disabled={isPending}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.currentTarget.value)}
              disabled={isPending}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Changing…" : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
