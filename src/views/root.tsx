import Logo from "assets/svg/Logo";

interface RootViewProps {
  children: React.ReactNode;
}

export function RootView({ children }: RootViewProps) {
  return (
    <div className="w-96 h-[460px] dark:bg-black-100">
      <div className="p-4 flex gap-2 items-center">
        <Logo width={30} height={30} />
        <h1 className="font-sans text-2xl font-semibold">Fraudvisor</h1>
      </div>
      {children}
    </div>
  );
}
