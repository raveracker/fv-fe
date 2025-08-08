import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/analyze");
}
