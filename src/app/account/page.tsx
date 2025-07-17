import ProfileSection from "./profile-section";
import ChangePasswordSection from "./change-password";
import DeleteAccountSection from "./delete-account";
import {
  getUserAction,
  updateProfileAction,
  changePasswordAction,
  deleteAccountAction,
} from "./actions";
import type { UserData } from "~types/user";
import NotFound from "~app/not-found";
import EmailVerficationAlert from "./email-verification-alert";
import { WebsiteLogo } from "~app/components/logo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AccountSettingsPage() {
  let user: UserData;
  try {
    user = await getUserAction();
  } catch {
    return <NotFound />;
  }

  return (
    <>
      <div className="container max-w-4xl mx-auto py-8 space-y-6">
        <WebsiteLogo />
        <EmailVerficationAlert isVisible={!user.isVerified} />
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <ProfileSection user={user} onUpdate={updateProfileAction} />
        <ChangePasswordSection onChangePassword={changePasswordAction} />
        <DeleteAccountSection onDeleteAccount={deleteAccountAction} />
      </div>
    </>
  );
}
