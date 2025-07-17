import Logo from "assets/svg/Logo";

export function WebsiteLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Logo />
      <h1 className="text-2xl font-semibold">Fraudvisor</h1>
    </div>
  );
}
