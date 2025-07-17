"use client";

import { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { User, LogOut } from "lucide-react";
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
import type { UserData } from "~types/user";
import { logoutAction } from "./actions";
import { useRouter } from "next/navigation";

interface Props {
  user: UserData;
  onUpdate: (fd: FormData) => Promise<UserData>;
}

export default function ProfileSection({ user, onUpdate }: Props) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dirty, setDirty] = useState(false);
  const [isPending, start] = useTransition();

  useEffect(() => {
    const [first, ...rest] = user.name.split(" ");
    setFirstName(first);
    setLastName(rest.join(" "));
  }, [user.name]);

  useEffect(() => {
    setDirty(user.name !== `${firstName} ${lastName}`.trim());
  }, [firstName, lastName, user.name]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("firstName", firstName);
    fd.set("lastName", lastName);

    start(async () => {
      try {
        await onUpdate(fd);
        toast.success("Profile updated");
      } catch (err: any) {
        toast.error(err.message || "Update failed");
      }
    });
  }

  const handleLogout = async () => {
    const result = await logoutAction();
    if (result.success) {
      toast.success(result.message);
      router.push("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="justify-between flex">
          <div>
            <User className="inline mr-1" /> Profile Information
          </div>
          <Button className="gap-2" onClick={handleLogout}>
            Logout
            <LogOut size={18} />
          </Button>
        </CardTitle>
        <CardDescription>Update your personal info</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                disabled={isPending}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                disabled={isPending}
              />
            </div>
          </div>
          <Button type="submit" disabled={!dirty || isPending}>
            {isPending ? "Updating…" : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
