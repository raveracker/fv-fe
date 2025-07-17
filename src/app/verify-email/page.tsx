import { verifyEmail } from "./actions";
import EmailVerifyFailed from "./verify-failed";
import EmailVerifySuccess from "./verify-success";
import EmailVerifyLinkExpired from "./verified-already";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { token } = await searchParams;
  if (!token) {
    return <EmailVerifyFailed />;
  }

  let message: string;
  try {
    message = await verifyEmail(token);
  } catch (err: any) {
    return <EmailVerifyLinkExpired />;
  }

  return <EmailVerifySuccess />;
}
