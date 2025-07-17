import "../main.css";
import { Providers } from "./providers";
import { Toaster } from "~components/ui/sonner";

export const metadata = {
  title: "Fraudvisor",
  description: "A AI based web extension to identify scammers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
